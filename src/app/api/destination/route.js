import { NextResponse } from "next/server";
import { Destination } from "@/lib/models/destination.model.js";
import { DestinationDescription } from "@/lib/models/destinationDescription.model.js";
import { Carousel } from "@/lib/models/carousel.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const destinations = await Destination.find({})
      .populate("descriptions")
      .populate("carouselData");
    return NextResponse.json({ success: true, data: destinations }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
