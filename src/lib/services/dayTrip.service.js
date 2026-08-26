import { DayTrip } from "@/lib/models/dayTrip.model.js";
import { connectDB } from "@/lib/db/index.js";
import "@/lib/models/index.js";

export async function getDayTrips() {
  await connectDB();
  const dayTrips = await DayTrip.find().sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(dayTrips));
}
