import { NextResponse } from "next/server";
import { Carousel } from "@/lib/models/carousel.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { type } = await params;
    
    if (!type) {
        return NextResponse.json({ error: "Carousel type is required." }, { status: 400 });
    }

    const carousels = await Carousel.find({ type }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: carousels }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
