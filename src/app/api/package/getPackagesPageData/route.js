import { NextResponse } from "next/server";
import { Package } from "@/lib/models/package.model.js";
import { Carousel } from "@/lib/models/carousel.model.js";
import { PackageTimeline } from "@/lib/models/packageTimeline.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    
    const carouselData = await Carousel.find({ type: "packages" }).sort({ createdAt: -1 });
    
    const packages = await Package.find()
      .sort({ createdAt: -1 })
      .populate("carouselData")
      .populate("timeline");

    return NextResponse.json({
      success: true,
      message: "Packages page data fetched successfully",
      data: {
        carouselData,
        packageData: packages,
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
