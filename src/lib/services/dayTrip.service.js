import { DayTrip } from "@/lib/models/dayTrip.model.js";
import { connectDB } from "@/lib/db/index.js";
import "@/lib/models/index.js";
import mongoose from "mongoose";

export async function getDayTrips() {
  try {
    await connectDB();
    const dayTrips = await DayTrip.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(dayTrips));
  } catch (error) {
    console.error("Error fetching day trips:", error);
    return [];
  }
}

export async function getDayTripById(id) {
  if (!id || id === "add" || id === "new") return null;
  try {
    await connectDB();
    let dayTrip = null;
    if (mongoose.isValidObjectId(id)) {
      dayTrip = await DayTrip.findById(id).lean();
    }
    if (!dayTrip) {
      const allTrips = await DayTrip.find().lean();
      const cleanTarget = id.toLowerCase().replace(/[^a-z0-9]/g, "");

      dayTrip = allTrips.find((t) => {
        const cleanTitle = (t.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        return (
          cleanTitle === cleanTarget ||
          cleanTitle.includes(cleanTarget) ||
          cleanTarget.includes(cleanTitle)
        );
      });

      // If still not found, try matching primary location keywords
      if (!dayTrip) {
        if (/agra|taj/i.test(id)) {
          dayTrip = allTrips.find((t) => /agra|taj/i.test(t.title));
        } else if (/jaipur|pink/i.test(id)) {
          dayTrip = allTrips.find((t) => /jaipur|pink/i.test(t.title));
        } else if (/delhi/i.test(id)) {
          dayTrip = allTrips.find((t) => /delhi/i.test(t.title));
        }
      }
    }
    if (!dayTrip) return null;
    return JSON.parse(JSON.stringify(dayTrip));
  } catch (error) {
    console.error("Error fetching day trip by ID:", error);
    return null;
  }
}
