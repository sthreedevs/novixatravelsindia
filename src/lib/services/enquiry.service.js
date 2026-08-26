import { connectDB } from "@/lib/db/index.js";
import { ContactUs } from "@/lib/models/serviceModels/contactUs.model.js";
import { CustomizePackage } from "@/lib/models/customizePackage.model.js";
import { Package } from "@/lib/models/package.model.js";
import mongoose from "mongoose";

export async function getContactEnquiries() {
  try {
    await connectDB();
    const contacts = await ContactUs.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(contacts));
  } catch (error) {
    console.error("Error fetching contact enquiries:", error);
    return [];
  }
}

export async function getBookingEnquiries() {
  try {
    await connectDB();
    const bookings = await CustomizePackage.find()
      .populate({ path: 'packageId', model: Package, select: 'title' })
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    console.error("Error fetching booking enquiries:", error);
    return [];
  }
}

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

export async function getAllServiceEnquiries() {
  try {
    await connectDB();
    const [
      flights,
      trains,
      visas,
      passports,
      insurances,
      euRailPasses,
      euRailTickets,
      cruises,
      hotels,
      transports,
      dayTrips,
      esims
    ] = await Promise.all([
      FlightInfo.find().sort({ createdAt: -1 }).lean(),
      TrainInfo.find().sort({ createdAt: -1 }).lean(),
      VisaInfo.find().sort({ createdAt: -1 }).lean(),
      PassportInfo.find().sort({ createdAt: -1 }).lean(),
      InsuranceInfo.find().sort({ createdAt: -1 }).lean(),
      EuropeRailPass.find().sort({ createdAt: -1 }).lean(),
      EuropeRailTicket.find().sort({ createdAt: -1 }).lean(),
      CruiseInfo.find().sort({ createdAt: -1 }).lean(),
      HotelInfo.find().sort({ createdAt: -1 }).lean(),
      TransportInfo.find().sort({ createdAt: -1 }).lean(),
      DayTripInfo.find().sort({ createdAt: -1 }).lean(),
      ESimInfo.find().sort({ createdAt: -1 }).lean()
    ]);

    return JSON.parse(JSON.stringify({
      flights,
      trains,
      visas,
      passports,
      insurances,
      euRailPasses,
      euRailTickets,
      cruises,
      hotels,
      transports,
      dayTrips,
      esims
    }));
  } catch (error) {
    console.error("Error fetching service enquiries:", error);
    return null;
  }
}
