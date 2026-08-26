import { NavbarTop } from "@/lib/models/navbarTop.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function getActiveOffers() {
  try {
    await connectDB();
    const offers = await NavbarTop.find({ isActive: true }).lean();
    return JSON.parse(JSON.stringify(offers));
  } catch (error) {
    console.error("Error fetching active offers:", error);
    return [];
  }
}
