"use server";

import { connectDB } from "@/lib/db/index.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";
import { sendCreatedEnquiry, sendEnquiryNotificationToAdmin } from "@/lib/utils/emailService.js";

// Import all models
import { PackageInfo } from "@/lib/models/serviceModels/packageInfo.model.js";
import { FlightInfo } from "@/lib/models/serviceModels/flightInfo.model.js";
import { HotelInfo } from "@/lib/models/serviceModels/hotelInfo.model.js";
import { TrainInfo } from "@/lib/models/serviceModels/trainInfo.model.js";
import { VisaInfo } from "@/lib/models/serviceModels/visaInfo.model.js";
import { TransportInfo } from "@/lib/models/serviceModels/transportInfo.model.js";
import { PassportInfo } from "@/lib/models/serviceModels/passportInfo.model.js";
import { InsuranceInfo } from "@/lib/models/serviceModels/insuranceInfo.model.js";
import { DayTripInfo } from "@/lib/models/serviceModels/dayTripInfo.model.js";
import { ESimInfo } from "@/lib/models/serviceModels/eSimInfo.model.js";
import { CruiseInfo } from "@/lib/models/serviceModels/cruiseInfo.model.js";
import { EuropeRailPass } from "@/lib/models/serviceModels/europeRailPass.model.js";
import { EuropeRailTicket } from "@/lib/models/serviceModels/europeRailTicket.model.js";

// Mapping from the `typeOfForm` (or `type`) string to the corresponding Mongoose Model
const ENQUIRY_MODELS = {
  package: PackageInfo,
  flight: FlightInfo,
  hotel: HotelInfo,
  train: TrainInfo,
  visa: VisaInfo,
  transport: TransportInfo,
  passport: PassportInfo,
  insurance: InsuranceInfo,
  dayTrip: DayTripInfo,
  eSim: ESimInfo,
  cruise: CruiseInfo,
  europeRailPass: EuropeRailPass,
  europeRailTicket: EuropeRailTicket,
};

export async function submitEnquiry(type, formData) {
  try {
    await connectDB();

    const Model = ENQUIRY_MODELS[type];
    if (!Model) {
      return { success: false, error: `Invalid enquiry type: ${type}` };
    }

    const data = {};
    const uploadedDocuments = [];

    // Parse formData fields
    for (const [key, value] of formData.entries()) {
      if (key === "documents" || key === "document") {
        if (value && value.size > 0) {
          const result = await uploadOnCloudinary(value);
          if (result && result.secure_url) {
            uploadedDocuments.push(result.secure_url);
          }
        }
      } else if (typeof value === "string") {
        data[key] = value;
      }
    }

    if (uploadedDocuments.length > 0) {
      data.documents = uploadedDocuments;
      // Some models use 'document' (singular) for a single file upload
      data.document = uploadedDocuments[0];
    }

    // Create the DB record
    const newEnquiry = await Model.create(data);

    // Send emails
    if (newEnquiry && data.email) {
      // Background email sending to avoid blocking response
      await sendCreatedEnquiry(data.email, newEnquiry._id).catch(console.error);
      await sendEnquiryNotificationToAdmin({
        enquiryType: `${type.charAt(0).toUpperCase() + type.slice(1)} Enquiry`,
        enquiryId: newEnquiry._id,
      }).catch(console.error);
    }

    return {
      success: true,
      message: `${type} Enquiry submitted successfully.`,
      // Return a plain object, because Mongoose documents can't be passed from Server Action
      data: JSON.parse(JSON.stringify(newEnquiry)),
    };
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return { success: false, error: error.message };
  }
}

export async function getAllEnquiries() {
  try {
    await connectDB();
    const allData = [];

    const promises = Object.keys(ENQUIRY_MODELS).map(async (key) => {
      const Model = ENQUIRY_MODELS[key];
      const records = await Model.find().lean();
      
      records.forEach((record) => {
        allData.push({
          type: key,
          ...record,
        });
      });
    });

    await Promise.all(promises);

    // Sort by date descending
    allData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return JSON.parse(JSON.stringify(allData));
  } catch (error) {
    console.error("Error fetching all enquiries:", error);
    return [];
  }
}
