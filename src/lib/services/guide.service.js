import { Guide } from "@/lib/models/guide.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function getGuides() {
  try {
    await connectDB();
    const guides = await Guide.find().lean();
    return JSON.parse(JSON.stringify(guides));
  } catch (error) {
    console.error("Error fetching guides:", error);
    return [];
  }
}
