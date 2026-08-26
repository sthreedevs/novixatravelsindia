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

export async function getPackageBySlug(slug) {
  try {
    await connectDB();

    const packageData = await Package.findOne({ slug })
      .populate("carouselData")
      .populate("timeline")
      .lean();

    if (!packageData) {
      // Fallback to ID in case a URL still uses an ID
      return await getPackageById(slug);
    }

    return JSON.parse(JSON.stringify(packageData));
  } catch (error) {
    console.error("Error fetching package by slug:", error);
    // Fallback to ID on error just in case
    return await getPackageById(slug);
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

export async function getAllPackages() {
  try {
    await connectDB();
    const packages = await Package.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(packages));
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
}
