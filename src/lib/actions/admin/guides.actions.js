"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db/index.js";
import { Guide } from "@/lib/models/guide.model.js";

export async function getGuides() {
  try {
    await connectDB();
    const guides = await Guide.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(guides));
  } catch (error) {
    console.error("Error fetching guides:", error);
    return [];
  }
}

export async function getGuide(id) {
  try {
    await connectDB();
    const guide = await Guide.findById(id).lean();
    return JSON.parse(JSON.stringify(guide));
  } catch (error) {
    console.error("Error fetching guide:", error);
    return null;
  }
}

export async function createGuide(formData) {
  try {
    await connectDB();
    
    const newGuide = new Guide({
      language: formData.language,
      domesticPrice: formData.domesticPrice,
      internationalPrice: formData.internationalPrice,
    });
    
    await newGuide.save();
    revalidatePath("/admin/guides");
    return { success: true };
  } catch (error) {
    console.error("Error creating guide:", error);
    return { 
      success: false, 
      error: error.code === 11000 ? "A guide with this language already exists." : "Failed to create guide" 
    };
  }
}

export async function updateGuide(id, formData) {
  try {
    await connectDB();
    
    await Guide.findByIdAndUpdate(id, {
      language: formData.language,
      domesticPrice: formData.domesticPrice,
      internationalPrice: formData.internationalPrice,
    });
    
    revalidatePath("/admin/guides");
    return { success: true };
  } catch (error) {
    console.error("Error updating guide:", error);
    return { 
      success: false, 
      error: error.code === 11000 ? "A guide with this language already exists." : "Failed to update guide" 
    };
  }
}

export async function deleteGuide(id) {
  try {
    await connectDB();
    await Guide.findByIdAndDelete(id);
    revalidatePath("/admin/guides");
    return { success: true };
  } catch (error) {
    console.error("Error deleting guide:", error);
    return { success: false, error: "Failed to delete guide" };
  }
}
