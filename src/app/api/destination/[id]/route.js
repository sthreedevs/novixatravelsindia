import { NextResponse } from "next/server";
import { Destination } from "@/lib/models/destination.model.js";
import { DestinationDescription } from "@/lib/models/destinationDescription.model.js";
import { Carousel } from "@/lib/models/carousel.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    // Check if it's the specific word instead of mongo ID due to route mapping overlapping
    if (id === 'add' || id === 'addDescription' || id === 'addCarousel' || id === 'getTrendingIndian' || id === 'getTrendingInternational') {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const destination = await Destination.findById(id)
      .populate("descriptions")
      .populate("carouselData");

    if (!destination) {
      return NextResponse.json({ error: "Destination not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: destination }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
