import { Package } from "@/lib/models/package.model.js";
import { Carousel } from "@/lib/models/carousel.model.js";
import { connectDB } from "@/lib/db/index.js";
import "@/lib/models/index.js"; // Ensure models are registered

export async function getPackageById(id) {
  if (id === 'add') {
    return null;
  }
  
  try {
    await connectDB();

    const packageData = await Package.findById(id)
      .populate("carouselData")
      .populate("timeline")
      .lean();

    if (!packageData) {
      return null;
    }

    return JSON.parse(JSON.stringify(packageData));
  } catch (error) {
    console.error("Error fetching package by ID:", error);
    return null;
  }
}

export async function getPackagesPageData() {
  await connectDB();

  const carouselData = await Carousel.find({ type: "packages" }).sort({ createdAt: -1 }).lean();
  
  const packages = await Package.find()
    .sort({ createdAt: -1 })
    .populate("carouselData")
    .populate("timeline")
    .lean();

  return JSON.parse(JSON.stringify({
    carouselData,
    packageData: packages,
  }));
}
