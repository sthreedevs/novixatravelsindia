"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db/index.js";
import { NavbarTop } from "@/lib/models/navbarTop.model.js";

export async function getOffers() {
  try {
    await connectDB();
    const offers = await NavbarTop.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(offers));
  } catch (error) {
    console.error("Error fetching offers:", error);
    return [];
  }
}

export async function getOffer(id) {
  try {
    await connectDB();
    const offer = await NavbarTop.findById(id).lean();
    return JSON.parse(JSON.stringify(offer));
  } catch (error) {
    console.error("Error fetching offer:", error);
    return null;
  }
}

export async function createOffer(formData) {
  try {
    await connectDB();
    
    const newOffer = new NavbarTop({
      title: formData.title,
      description: formData.description,
      url: formData.url,
      isActive: formData.isActive,
      validTill: formData.validTill ? new Date(formData.validTill) : null,
    });
    
    await newOffer.save();
    revalidatePath("/admin/offers");
    revalidatePath("/"); // Revalidate public pages as well
    return { success: true };
  } catch (error) {
    console.error("Error creating offer:", error);
    return { success: false, error: "Failed to create offer banner" };
  }
}

export async function updateOffer(id, formData) {
  try {
    await connectDB();
    
    await NavbarTop.findByIdAndUpdate(id, {
      title: formData.title,
      description: formData.description,
      url: formData.url,
      isActive: formData.isActive,
      validTill: formData.validTill ? new Date(formData.validTill) : null,
    });
    
    revalidatePath("/admin/offers");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating offer:", error);
    return { success: false, error: "Failed to update offer banner" };
  }
}

export async function deleteOffer(id) {
  try {
    await connectDB();
    await NavbarTop.findByIdAndDelete(id);
    revalidatePath("/admin/offers");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting offer:", error);
    return { success: false, error: "Failed to delete offer banner" };
  }
}
