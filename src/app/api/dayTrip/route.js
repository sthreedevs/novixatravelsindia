import { NextResponse } from "next/server";
import { DayTrip } from "@/lib/models/dayTrip.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const dayTrips = await DayTrip.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: dayTrips }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
