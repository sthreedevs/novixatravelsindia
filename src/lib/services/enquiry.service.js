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
