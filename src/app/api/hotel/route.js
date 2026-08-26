import { NextResponse } from "next/server";
import { Hotel } from "@/lib/models/hotel.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: hotels }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
