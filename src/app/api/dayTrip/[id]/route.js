import { NextResponse } from "next/server";
import { DayTrip } from "@/lib/models/dayTrip.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    if (id === 'add') {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const dayTrip = await DayTrip.findById(id);
    if (!dayTrip) return NextResponse.json({ error: "Day Trip not found." }, { status: 404 });

    return NextResponse.json({ success: true, data: dayTrip }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
