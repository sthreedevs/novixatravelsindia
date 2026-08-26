import { DayTrip } from "@/lib/models/dayTrip.model.js";
import { connectDB } from "@/lib/db/index.js";
import "@/lib/models/index.js";

export async function getDayTrips() {
  await connectDB();
  const dayTrips = await DayTrip.find().sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(dayTrips));
}

export async function getDayTripById(id) {
  if (id === 'add' || id === 'new') return null;
  try {
    await connectDB();
    const dayTrip = await DayTrip.findById(id).lean();
    if (!dayTrip) return null;
    return JSON.parse(JSON.stringify(dayTrip));
  } catch (error) {
    console.error("Error fetching day trip by ID:", error);
    return null;
  }
}
