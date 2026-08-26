import { NextResponse } from "next/server";
import { Carousel } from "@/lib/models/carousel.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const carousels = await Carousel.find({ type: "homepage" }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: carousels.length, data: carousels }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
