"use server";

import { connectDB } from "@/lib/db/index.js";
import { Hotel } from "@/lib/models/hotel.model.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";
import { revalidatePath } from "next/cache";

export async function createHotel(formData) {
  try {
    await connectDB();

    // 1. Upload thumbnail
    const thumbnailFile = formData.get("thumbnail");
    let thumbnailUrl = "";
    if (thumbnailFile && thumbnailFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(thumbnailFile);
      thumbnailUrl = uploadRes?.secure_url || "";
    }

    // 2. Extract arrays
    const tagsStr = formData.get("tags") || "";
    const tags = tagsStr ? tagsStr.split(",").map((s) => s.trim()).filter(Boolean) : [];

    // 3. Create Hotel
    const newHotel = await Hotel.create({
      title: formData.get("title"),
      country: formData.get("country"),
      city: formData.get("city"),
      state: formData.get("state"),
      category: formData.get("category"),
      domesticPrice: formData.get("domesticPrice"),
      internationalPrice: formData.get("internationalPrice"),
      thumbnail: thumbnailUrl,
      tags,
    });

    revalidatePath("/admin/hotels");
    revalidatePath("/hotels");
    revalidatePath("/");

    return { success: true, hotelId: newHotel._id.toString() };
  } catch (error) {
    console.error("Create Hotel Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateHotel(id, formData) {
  try {
    await connectDB();
    const hotel = await Hotel.findById(id);
    if (!hotel) return { success: false, error: "Hotel not found" };

    // 1. Upload thumbnail
    const thumbnailFile = formData.get("thumbnail");
    let thumbnailUrl = hotel.thumbnail;
    if (thumbnailFile && thumbnailFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(thumbnailFile);
      thumbnailUrl = uploadRes?.secure_url || hotel.thumbnail;
    }

    // 2. Extract arrays
    const tagsStr = formData.get("tags") || "";
    const tags = tagsStr ? tagsStr.split(",").map((s) => s.trim()).filter(Boolean) : [];

    // 3. Update Hotel
    await Hotel.findByIdAndUpdate(id, {
      title: formData.get("title"),
      country: formData.get("country"),
      city: formData.get("city"),
      state: formData.get("state"),
      category: formData.get("category"),
      domesticPrice: formData.get("domesticPrice"),
      internationalPrice: formData.get("internationalPrice"),
      thumbnail: thumbnailUrl,
      tags,
    });

    revalidatePath("/admin/hotels");
    revalidatePath("/hotels");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Update Hotel Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteHotel(id) {
  try {
    await connectDB();
    const hotel = await Hotel.findById(id);
    if (!hotel) return { success: false, error: "Hotel not found" };

    await Hotel.findByIdAndDelete(id);

    revalidatePath("/admin/hotels");
    revalidatePath("/hotels");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete Hotel Error:", error);
    return { success: false, error: error.message };
  }
}
