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

import { revalidatePath } from "next/cache";

export async function submitEnquiry(type, formDataOrObject) {
  try {
    await connectDB();

    const Model = ENQUIRY_MODELS[type];
    if (!Model) {
      return { success: false, error: `Invalid enquiry type: ${type}` };
    }

    const data = {};
    const uploadedDocuments = [];

    // Parse formData if it's a FormData instance, or read object keys
    if (formDataOrObject && typeof formDataOrObject.entries === "function") {
      for (const [key, value] of formDataOrObject.entries()) {
        if (key === "documents" || key === "document") {
          if (value && value.size > 0) {
            const result = await uploadOnCloudinary(value);
            if (result && result.secure_url) {
              uploadedDocuments.push(result.secure_url);
            }
          }
        } else if (typeof value === "string") {
          data[key] = value.trim();
        } else {
          data[key] = value;
        }
      }
    } else if (formDataOrObject && typeof formDataOrObject === "object") {
      Object.assign(data, formDataOrObject);
    }

    // Auto-normalize Full Name into firstName & lastName
    const rawName = data.fullName || data.name;
    if (rawName && (!data.firstName || data.firstName === "Valued")) {
      const parts = rawName.trim().split(" ");
      data.firstName = parts[0] || rawName;
      data.lastName = parts.slice(1).join(" ") || "Traveler";
    }
    if (!data.firstName) data.firstName = "Valued";
    if (!data.lastName) data.lastName = "Traveler";

    // Auto-normalize phone & mobileNumber
    const rawPhone = data.phone || data.mobileNumber || data.contactNumber;
    if (rawPhone) {
      data.phone = rawPhone;
      data.mobileNumber = rawPhone;
    }

    // Track whether the visitor explicitly provided a real email address
    const rawEmail = typeof (data.email || data.emailAddress) === "string"
      ? (data.email || data.emailAddress).trim()
      : "";
    const hasRealCustomerEmail = Boolean(rawEmail);
    if (rawEmail) {
      data.email = rawEmail;
      data.emailAddress = rawEmail;
    } else {
      delete data.email;
      delete data.emailAddress;
    }

    // Drop empty strings on optional Date fields so optional inputs don't store empty/invalid dates
    const dateKeys = [
      "departureDate",
      "arrivalDate",
      "returnDate",
      "travelDate",
      "checkInDate",
      "checkOutDate",
      "validFrom",
      "startDate",
      "endDate",
      "dob",
    ];
    for (const key of dateKeys) {
      if (data[key] === "" || data[key] === null || data[key] === undefined) {
        delete data[key];
      }
    }

    // Auto-normalize common location aliases before deriving departureCity / arrivalCity
    if (data.fromCity && !data.from) data.from = data.fromCity;
    if (data.fromLocation && !data.from) data.from = data.fromLocation;
    if (data.fromLocation && !data.pickUp) data.pickUp = data.fromLocation;
    if (data.from && !data.departureCity) data.departureCity = data.from;
    if (data.preferredDepartureCity && !data.departureCity) data.departureCity = data.preferredDepartureCity;

    if (data.toCity && !data.to) data.to = data.toCity;
    if (data.toLocation && !data.to) data.to = data.toLocation;
    if (data.toLocation && !data.dropOff) data.dropOff = data.toLocation;
    if (data.to && !data.arrivalCity) data.arrivalCity = data.to;

    if (data.preferredCruiseDestination) {
      if (!data.cruiseDestination) data.cruiseDestination = data.preferredCruiseDestination;
      if (!data.destination) data.destination = data.preferredCruiseDestination;
    }
    if (data.destinationCountry) {
      if (!data.country) data.country = data.destinationCountry;
      if (!data.destination) data.destination = data.destinationCountry;
    }
    if (data.countryOfTravel) {
      if (!data.destination) data.destination = data.countryOfTravel;
      if (!data.destinationCountry) data.destinationCountry = data.countryOfTravel;
    }

    if (data.destination) {
      if (!data.destinationCity) data.destinationCity = data.destination;
      if (!data.city) data.city = data.destination;
      if (!data.destinationCountry) data.destinationCountry = data.destination;
      if (!data.country) data.country = data.destination;
      if (!data.countryOfTravel) data.countryOfTravel = data.destination;
      if (!data.travelCountry) data.travelCountry = data.destination;
      if (!data.preferredCruiseDestination) data.preferredCruiseDestination = data.destination;
      if (!data.cruiseDestination) data.cruiseDestination = data.destination;
    }

    // Auto-normalize common dates
    if (data.travelDate) {
      if (!data.departureDate) data.departureDate = data.travelDate;
      if (!data.travelDates) data.travelDates = data.travelDate;
      if (!data.checkInDate) data.checkInDate = data.travelDate;
      if (!data.startDate) data.startDate = data.travelDate;
    } else if (data.departureDate) {
      data.travelDate = data.departureDate;
    }
    if (data.dateTime && !Number.isNaN(new Date(data.dateTime).getTime())) {
      if (!data.departureDate) data.departureDate = data.dateTime;
      if (!data.travelDate) data.travelDate = data.dateTime;
    }

    // Auto-normalize message/queries
    const rawMsg = data.message || data.specialRequests || data.query || data.enterYourMessage;
    if (rawMsg) {
      data.message = rawMsg;
    }

    if (uploadedDocuments.length > 0) {
      data.documents = uploadedDocuments;
      data.document = uploadedDocuments[0];
    }

    // Special auto-normalization for Day Trips
    if (type === "dayTrip") {
      if (!data.phone && data.phoneNumber) data.phone = data.phoneNumber;
      if (!data.mobileNumber && data.phone) data.mobileNumber = data.phone;
      if (!data.tripTitle && data.dayTripTitle) data.tripTitle = data.dayTripTitle;
      if (!data.notes && data.emergencyContact) data.notes = data.emergencyContact;
      if (!data.email) {
        const cleanPhone = (data.phone || "guest").replace(/[^a-zA-Z0-9]/g, "");
        data.email = `${cleanPhone}@novixatravels.in`;
      }
      if (!data.dropLocation) {
        data.dropLocation = data.pickupLocation || data.pickupCity || "Same as pickup";
      }
      if (!data.pickupLocation && data.pickupCity) {
        data.pickupLocation = data.pickupCity;
      }
      if (!data.paymentMethod) data.paymentMethod = "Custom Quote Requested";
      if (!data.paymentStatus) data.paymentStatus = "Pending Quote";
      if (data.tripId && !data.dayTrip) {
        const mongoose = (await import("mongoose")).default;
        if (mongoose.isValidObjectId(data.tripId)) {
          data.dayTrip = data.tripId;
        }
      }
      if (!data.travelDate && data.date && !Number.isNaN(new Date(data.date).getTime())) {
        data.travelDate = new Date(data.date);
      }
    }

    // Create the DB record
    const newEnquiry = await Model.create(data);

    // Send emails in background without blocking or bouncing synthetic fallback addresses
    if (newEnquiry) {
      if (hasRealCustomerEmail) {
        sendCreatedEnquiry(rawEmail, newEnquiry._id).catch(console.error);
      }
      if (process.env.ADMIN_EMAIL) {
        sendEnquiryNotificationToAdmin({
          enquiryType: `${type.charAt(0).toUpperCase() + type.slice(1)} Enquiry`,
          enquiryId: newEnquiry._id,
        }).catch(console.error);
      }
    }

    // Revalidate admin dashboard & enquiries page cache
    try {
      revalidatePath("/admin");
      revalidatePath("/admin/enquiries");
    } catch (_) {}

    return {
      success: true,
      message: `${type} Enquiry submitted successfully.`,
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
