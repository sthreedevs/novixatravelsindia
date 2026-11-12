"use server";

import { connectDB } from "@/lib/db/index.js";
import { DayTrip } from "@/lib/models/dayTrip.model.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";
import { revalidatePath } from "next/cache";

function parseArrayField(formData, fieldName) {
  const str = formData.get(fieldName) || "";
  return str
    ? str
        .split("||")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
}

function parseJsonField(formData, fieldName, defaultValue = []) {
  try {
    const raw = formData.get(fieldName);
    if (!raw) return defaultValue;
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch (_) {
    return defaultValue;
  }
}

export async function createDayTrip(formData) {
  try {
    await connectDB();

    // 1. Single Main Image (Powers BOTH Card Thumbnail and Hero Banner)
    const mainImageFile = formData.get("image") || formData.get("thumbnail");
    let mainImageUrl = "";
    if (mainImageFile && typeof mainImageFile === "object" && mainImageFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(mainImageFile);
      mainImageUrl = uploadRes?.secure_url || "";
    } else if (typeof mainImageFile === "string" && mainImageFile) {
      mainImageUrl = mainImageFile;
    }

    // 2. Uploadable Highlights Photo Gallery (3 Photos)
    const gallery = [];
    for (let i = 0; i < 3; i++) {
      const title =
        formData.get(`galleryTitle_${i}`) ||
        formData.get(`galleryTitle${i}`) ||
        "";
      const file =
        formData.get(`galleryFile_${i}`) || formData.get(`galleryFile${i}`);
      const fallbackUrl =
        formData.get(`galleryUrl_${i}`) || formData.get(`galleryUrl${i}`) || "";

      let photoUrl = fallbackUrl;
      if (file && typeof file === "object" && file.size > 0) {
        const uploadRes = await uploadOnCloudinary(file);
        if (uploadRes?.secure_url) {
          photoUrl = uploadRes.secure_url;
        }
      }

      if (title || photoUrl) {
        gallery.push({
          title: title || `Highlight #${i + 1}`,
          image: photoUrl,
        });
      }
    }

    // If no gallery items uploaded via files, check if JSON string was passed
    if (gallery.length === 0) {
      const parsed = parseJsonField(formData, "gallery", []);
      if (Array.isArray(parsed) && parsed.length > 0) {
        gallery.push(...parsed);
      }
    }

    // 3. Itinerary
    const itinerary = parseJsonField(formData, "itinerary", []);

    // 4. Arrays
    const highlights = parseArrayField(formData, "highlights");
    const descriptionList = parseArrayField(formData, "descriptionList");
    const finalHighlights =
      highlights.length > 0 ? highlights : descriptionList;

    const newDayTrip = await DayTrip.create({
      title: formData.get("title"),
      destination: formData.get("destination") || "Agra",
      tagline: formData.get("tagline") || "",
      description: formData.get("description"),
      domesticPrice: formData.get("domesticPrice"),
      internationalPrice: formData.get("internationalPrice") || "35",

      // Specs
      duration:
        formData.get("duration") || "Full Day (approx. 10–12 hours)",
      tourType: formData.get("tourType") || "Private / Small Group",
      pickup: formData.get("pickup") || "Delhi or Agra",
      language:
        formData.get("language") || "English / Russian on request",
      rating: formData.get("rating") || "4.9/5",
      ratingCount: formData.get("ratingCount") || "Guest Experience",

      // Experience Section
      experienceTitle: formData.get("experienceTitle") || "",
      experienceLead: formData.get("experienceLead") || "",
      itinerarySubtitle:
        formData.get("itinerarySubtitle") ||
        "(Timings are indicative and can be customized)",

      itinerary,
      descriptionList: finalHighlights,
      highlights: finalHighlights,

      inclusionList: parseArrayField(formData, "inclusionList"),
      exclusionList: parseArrayField(formData, "exclusionList"),
      info: parseArrayField(formData, "info"),

      thumbnail: mainImageUrl,
      heroImage: mainImageUrl,
      gallery,
    });

    revalidatePath("/admin/day-trips");
    revalidatePath(`/admin/day-trips/${id}`);
    revalidatePath("/services/day-trips");
    revalidatePath(`/services/day-trips/${newDayTrip._id}`);
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

    // 1. Single Main Image (Powers BOTH Card Thumbnail and Hero Banner)
    let mainImageUrl = dayTrip.thumbnail || dayTrip.heroImage || "";
    if (
      formData.get("removeImage") === "true" ||
      formData.get("removeThumbnail") === "true"
    ) {
      mainImageUrl = "";
    }
    const mainImageFile = formData.get("image") || formData.get("thumbnail");
    if (mainImageFile && typeof mainImageFile === "object" && mainImageFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(mainImageFile);
      mainImageUrl = uploadRes?.secure_url || mainImageUrl;
    } else if (typeof mainImageFile === "string" && mainImageFile) {
      mainImageUrl = mainImageFile;
    }

    // 2. Uploadable Highlights Photo Gallery (3 Photos)
    const gallery = [];
    const existingGallery = Array.isArray(dayTrip.gallery)
      ? dayTrip.gallery
      : [];

    for (let i = 0; i < 3; i++) {
      const existingItem = existingGallery[i] || {};
      const title =
        formData.get(`galleryTitle_${i}`) ||
        formData.get(`galleryTitle${i}`) ||
        existingItem.title ||
        "";
      const file =
        formData.get(`galleryFile_${i}`) || formData.get(`galleryFile${i}`);
      const fallbackUrl =
        formData.get(`galleryUrl_${i}`) ||
        formData.get(`galleryUrl${i}`) ||
        existingItem.image ||
        "";

      let photoUrl = fallbackUrl;
      // If user uploaded a new file for this highlight photo
      if (file && typeof file === "object" && file.size > 0) {
        const uploadRes = await uploadOnCloudinary(file);
        if (uploadRes?.secure_url) {
          photoUrl = uploadRes.secure_url;
        }
      }

      if (title || photoUrl) {
        gallery.push({
          title: title || `Highlight #${i + 1}`,
          image: photoUrl,
        });
      }
    }

    if (gallery.length === 0) {
      const parsed = parseJsonField(formData, "gallery", dayTrip.gallery || []);
      if (Array.isArray(parsed) && parsed.length > 0) {
        gallery.push(...parsed);
      }
    }

    // 3. Itinerary
    const itinerary = parseJsonField(
      formData,
      "itinerary",
      dayTrip.itinerary || []
    );

    const highlights = parseArrayField(formData, "highlights");
    const descriptionList = parseArrayField(formData, "descriptionList");
    const finalHighlights =
      highlights.length > 0
        ? highlights
        : descriptionList.length > 0
        ? descriptionList
        : dayTrip.highlights || dayTrip.descriptionList || [];

    await DayTrip.findByIdAndUpdate(id, {
      title: formData.get("title"),
      destination: formData.get("destination") || dayTrip.destination || "Agra",
      tagline: formData.get("tagline") ?? dayTrip.tagline ?? "",
      description: formData.get("description"),
      domesticPrice: formData.get("domesticPrice"),
      internationalPrice: formData.get("internationalPrice") || "35",

      // Specs
      duration: formData.get("duration") || dayTrip.duration,
      tourType: formData.get("tourType") || dayTrip.tourType,
      pickup: formData.get("pickup") || dayTrip.pickup,
      language: formData.get("language") || dayTrip.language,
      rating: formData.get("rating") || dayTrip.rating || "4.9/5",
      ratingCount:
        formData.get("ratingCount") || dayTrip.ratingCount || "Guest Experience",

      // Experience Section
      experienceTitle: formData.get("experienceTitle") ?? dayTrip.experienceTitle,
      experienceLead: formData.get("experienceLead") ?? dayTrip.experienceLead,
      itinerarySubtitle:
        formData.get("itinerarySubtitle") || dayTrip.itinerarySubtitle,

      itinerary,
      descriptionList: finalHighlights,
      highlights: finalHighlights,

      inclusionList: parseArrayField(formData, "inclusionList"),
      exclusionList: parseArrayField(formData, "exclusionList"),
      info: parseArrayField(formData, "info"),

      thumbnail: mainImageUrl,
      heroImage: mainImageUrl,
      gallery,
    });

    revalidatePath("/admin/day-trips");
    revalidatePath(`/admin/day-trips/${id}`);
    revalidatePath("/services/day-trips");
    revalidatePath(`/services/day-trips/${id}`);
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
    revalidatePath(`/admin/day-trips/${id}`);
    revalidatePath("/services/day-trips");
    revalidatePath(`/services/day-trips/${id}`);
    revalidatePath("/day-trips");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete Day Trip Error:", error);
    return { success: false, error: error.message };
  }
}
