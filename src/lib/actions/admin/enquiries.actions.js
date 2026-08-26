"use server";

import { connectDB } from "@/lib/db/index.js";
import { ContactUs } from "@/lib/models/serviceModels/contactUs.model.js";
import { CustomizePackage } from "@/lib/models/customizePackage.model.js";
import { FlightInfo } from "@/lib/models/serviceModels/flightInfo.model.js";
import { TrainInfo } from "@/lib/models/serviceModels/trainInfo.model.js";
import { VisaInfo } from "@/lib/models/serviceModels/visaInfo.model.js";
import { PassportInfo } from "@/lib/models/serviceModels/passportInfo.model.js";
import { InsuranceInfo } from "@/lib/models/serviceModels/insuranceInfo.model.js";
import { EuropeRailPass } from "@/lib/models/serviceModels/europeRailPass.model.js";
import { EuropeRailTicket } from "@/lib/models/serviceModels/europeRailTicket.model.js";
import { CruiseInfo } from "@/lib/models/serviceModels/cruiseInfo.model.js";
import { HotelInfo } from "@/lib/models/serviceModels/hotelInfo.model.js";
import { TransportInfo } from "@/lib/models/serviceModels/transportInfo.model.js";
import { DayTripInfo } from "@/lib/models/serviceModels/dayTripInfo.model.js";
import { ESimInfo } from "@/lib/models/serviceModels/eSimInfo.model.js";
import { revalidatePath } from "next/cache";

const typeToModelMap = {
  "contact": ContactUs,
  "booking": CustomizePackage,
  "flight": FlightInfo,
  "train": TrainInfo,
  "visa": VisaInfo,
  "passport": PassportInfo,
  "insurance": InsuranceInfo,
  "eurail_pass": EuropeRailPass,
  "eurail_ticket": EuropeRailTicket,
  "cruise": CruiseInfo,
  "hotel": HotelInfo,
  "transport": TransportInfo,
  "daytrip": DayTripInfo,
  "esim": ESimInfo,
};

export async function deleteEnquiry(id, type) {
  try {
    await connectDB();
    const Model = typeToModelMap[type];
    
    if (!Model) {
      return { success: false, error: "Invalid enquiry type" };
    }

    const enquiry = await Model.findById(id);
    if (!enquiry) {
      return { success: false, error: "Enquiry not found" };
    }

    await Model.findByIdAndDelete(id);
    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (error) {
    console.error(`Delete Enquiry Error (${type}):`, error);
    return { success: false, error: error.message };
  }
}
