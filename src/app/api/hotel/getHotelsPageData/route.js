import { NextResponse } from "next/server";
import { Hotel } from "@/lib/models/hotel.model.js";
import { Carousel } from "@/lib/models/carousel.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const carouselData = await Carousel.find({ type: "hotel" }).sort({ createdAt: -1 });
    const hotelData = await Hotel.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, message: "Hotel page data fetched successfully", data: { carouselData, hotelData } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
