"use server";

import { connectDB } from "@/lib/db/index.js";
import { DayTrip } from "@/lib/models/dayTrip.model.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";
import { revalidatePath } from "next/cache";

function parseArrayField(formData, fieldName) {
  const str = formData.get(fieldName) || "";
  return str ? str.split("||").map((s) => s.trim()).filter(Boolean) : [];
}

export async function createDayTrip(formData) {
  try {
    await connectDB();

    const thumbnailFile = formData.get("thumbnail");
    let thumbnailUrl = "";
    if (thumbnailFile && thumbnailFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(thumbnailFile);
      thumbnailUrl = uploadRes?.secure_url || "";
    }

    const newDayTrip = await DayTrip.create({
      title: formData.get("title"),
      description: formData.get("description"),
      domesticPrice: formData.get("domesticPrice"),
      internationalPrice: formData.get("internationalPrice"),
      descriptionList: parseArrayField(formData, "descriptionList"),
      inclusionList: parseArrayField(formData, "inclusionList"),
      exclusionList: parseArrayField(formData, "exclusionList"),
      info: parseArrayField(formData, "info"),
      thumbnail: thumbnailUrl,
    });

    revalidatePath("/admin/day-trips");
    revalidatePath("/day-trips");
    revalidatePath("/");

    return { success: true, dayTripId: newDayTrip._id.toString() };
  } catch (error) {
    console.error("Create Day Trip Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateDayTrip(id, formData) {
  try {
    await connectDB();
    const dayTrip = await DayTrip.findById(id);
    if (!dayTrip) return { success: false, error: "Day Trip not found" };

    const thumbnailFile = formData.get("thumbnail");
    let thumbnailUrl = dayTrip.thumbnail;
    if (formData.get("removeThumbnail") === "true") {
      thumbnailUrl = "";
    }
    if (thumbnailFile && thumbnailFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(thumbnailFile);
      thumbnailUrl = uploadRes?.secure_url || dayTrip.thumbnail;
    }

    await DayTrip.findByIdAndUpdate(id, {
      title: formData.get("title"),
      description: formData.get("description"),
      domesticPrice: formData.get("domesticPrice"),
      internationalPrice: formData.get("internationalPrice"),
      descriptionList: parseArrayField(formData, "descriptionList"),
      inclusionList: parseArrayField(formData, "inclusionList"),
      exclusionList: parseArrayField(formData, "exclusionList"),
      info: parseArrayField(formData, "info"),
      thumbnail: thumbnailUrl,
    });

    revalidatePath("/admin/day-trips");
    revalidatePath("/day-trips");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Update Day Trip Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteDayTrip(id) {
  try {
    await connectDB();
    const dayTrip = await DayTrip.findById(id);
    if (!dayTrip) return { success: false, error: "Day Trip not found" };

    await DayTrip.findByIdAndDelete(id);

    revalidatePath("/admin/day-trips");
    revalidatePath("/day-trips");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete Day Trip Error:", error);
    return { success: false, error: error.message };
  }
}
