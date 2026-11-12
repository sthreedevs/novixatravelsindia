"use server";

import { connectDB } from "@/lib/db/index.js";
import { Carousel } from "@/lib/models/carousel.model.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

async function verifyAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) {
    throw new Error("Unauthorized: Admin session required");
  }
  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET || "secret");
  const { payload } = await jwtVerify(token, secret);
  if (!payload?.isAdmin) {
    throw new Error("Unauthorized: Admin privileges required");
  }
  return payload;
}

export async function createHomeCarousel(formData) {
  try {
    await verifyAdminSession();
    await connectDB();

    const imageFile = formData.get("image");
    if (!imageFile || imageFile.size === 0) {
      return { success: false, error: "Please select a banner image to upload." };
    }

    const uploadRes = await uploadOnCloudinary(imageFile);
    if (!uploadRes?.secure_url) {
      return { success: false, error: "Image upload failed. Please try again." };
    }

    const title = (formData.get("title") || "").toString().trim();
    const description = (formData.get("description") || "").toString().trim();

    const created = await Carousel.create({
      image: uploadRes.secure_url,
      title,
      description,
      type: "home",
    });

    revalidatePath("/admin/home-carousel");
    revalidatePath("/");

    return { success: true, id: created._id.toString() };
  } catch (error) {
    console.error("Create Home Carousel Error:", error);
    return { success: false, error: error.message || "Failed to create carousel slide" };
  }
}

export async function updateHomeCarousel(id, formData) {
  try {
    await verifyAdminSession();
    await connectDB();

    const existing = await Carousel.findOne({ _id: id, type: "home" });
    if (!existing) {
      return { success: false, error: "Carousel slide not found" };
    }

    let imageUrl = existing.image || "";
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(imageFile);
      if (!uploadRes?.secure_url) {
        return { success: false, error: "Image upload failed. Please try again." };
      }
      imageUrl = uploadRes.secure_url;
    }

    if (!imageUrl) {
      return { success: false, error: "Slide image is required." };
    }

    const title = (formData.get("title") || "").toString().trim();
    const description = (formData.get("description") || "").toString().trim();

    await Carousel.findByIdAndUpdate(id, {
      image: imageUrl,
      title,
      description,
      type: "home",
    });

    revalidatePath("/admin/home-carousel");
    revalidatePath(`/admin/home-carousel/${id}`);
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Update Home Carousel Error:", error);
    return { success: false, error: error.message || "Failed to update carousel slide" };
  }
}

export async function deleteHomeCarousel(id) {
  try {
    await verifyAdminSession();
    await connectDB();

    const existing = await Carousel.findOne({ _id: id, type: "home" });
    if (!existing) {
      return { success: false, error: "Carousel slide not found" };
    }

    await Carousel.findByIdAndDelete(id);

    revalidatePath("/admin/home-carousel");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete Home Carousel Error:", error);
    return { success: false, error: error.message || "Failed to delete carousel slide" };
  }
}

