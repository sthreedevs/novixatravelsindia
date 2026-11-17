"use server";

import { connectDB } from "@/lib/db/index.js";
import { Package } from "@/lib/models/package.model.js";
import { PackageTimeline } from "@/lib/models/packageTimeline.model.js";
import { Carousel } from "@/lib/models/carousel.model.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { getPackageDuration } from "@/lib/utils/packageDuration.js";

function parseFaqsData(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((f) => ({
        question: (f?.question || "").trim(),
        answer: (f?.answer || "").trim(),
      }))
      .filter((f) => f.question && f.answer);
  } catch {
    return [];
  }
}

export async function createPackage(formData) {
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
    const parseArray = (str) => str ? str.split(",").map((s) => s.trim()).filter(Boolean) : [];
    const tags = parseArray(formData.get("tags"));
    const inclusions = parseArray(formData.get("inclusions"));
    const exclusions = parseArray(formData.get("exclusions"));

    // Travel Type: multi-select array (can be JSON array string or comma separated)
    let travelType = [];
    const rawTravelType = formData.get("travelType");
    if (rawTravelType) {
      try {
        const parsed = JSON.parse(rawTravelType);
        if (Array.isArray(parsed)) travelType = parsed;
        else travelType = parseArray(rawTravelType);
      } catch {
        travelType = parseArray(rawTravelType);
      }
    }
    const category = travelType.length > 0 ? travelType : parseArray(formData.get("category"));

    // 3. Process Timelines
    const timelinesData = JSON.parse(formData.get("timelinesData") || "[]");
    const timelineIds = [];
    for (let i = 0; i < timelinesData.length; i++) {
      const tl = timelinesData[i];
      let image1Url = tl.image1;
      let image2Url = tl.image2;
      
      const file1 = formData.get(`timeline_${i}_image1`);
      if (file1 && file1.size > 0) {
        const up1 = await uploadOnCloudinary(file1);
        image1Url = up1?.secure_url || "";
      }
      
      const file2 = formData.get(`timeline_${i}_image2`);
      if (file2 && file2.size > 0) {
        const up2 = await uploadOnCloudinary(file2);
        image2Url = up2?.secure_url || "";
      }

      const newTl = await PackageTimeline.create({
        dayTitle: tl.dayTitle,
        description: tl.description,
        image1: image1Url,
        image2: image2Url,
      });
      timelineIds.push(newTl._id);
    }

    // 4. Process Section Showcase Images:
    // Why Choose Collage (3 Photos: Main, Top, Bottom) + Itinerary Feature Photo (1 Photo)
    let whyChooseMain = formData.get("existing_whyChoose_main") || "";
    let whyChooseTop = formData.get("existing_whyChoose_top") || "";
    let whyChooseBottom = formData.get("existing_whyChoose_bottom") || "";
    let itineraryImage = formData.get("existing_itineraryImage") || "";

    const fileWhyMain = formData.get("whyChoose_main");
    if (fileWhyMain && fileWhyMain.size > 0) {
      const up = await uploadOnCloudinary(fileWhyMain);
      whyChooseMain = up?.secure_url || whyChooseMain;
    }
    const fileWhyTop = formData.get("whyChoose_top");
    if (fileWhyTop && fileWhyTop.size > 0) {
      const up = await uploadOnCloudinary(fileWhyTop);
      whyChooseTop = up?.secure_url || whyChooseTop;
    }
    const fileWhyBottom = formData.get("whyChoose_bottom");
    if (fileWhyBottom && fileWhyBottom.size > 0) {
      const up = await uploadOnCloudinary(fileWhyBottom);
      whyChooseBottom = up?.secure_url || whyChooseBottom;
    }
    const fileItin = formData.get("itineraryImage_file");
    if (fileItin && fileItin.size > 0) {
      const up = await uploadOnCloudinary(fileItin);
      itineraryImage = up?.secure_url || itineraryImage;
    }

    // Maintain Carousel records for backward compatibility
    const sectionImages = [whyChooseMain, whyChooseTop, whyChooseBottom, itineraryImage].filter(Boolean);
    const carouselIds = [];
    for (let i = 0; i < sectionImages.length; i++) {
      const newC = await Carousel.create({
        title: "",
        description: "",
        buttonText: "",
        type: "package",
        image: sectionImages[i],
      });
      carouselIds.push(newC._id);
    }

    // 5. Create Package
    const duration = getPackageDuration({
      title: formData.get("title"),
      days: Number(formData.get("days")),
      nights: Number(formData.get("nights")),
      timeline: timelineIds,
    });

    const newPackage = await Package.create({
      title: formData.get("title"),
      city: formData.get("city"),
      destinations: formData.get("destinations"),
      country: formData.get("country"),
      description: formData.get("description"),
      days: duration.days,
      nights: duration.nights,
      domesticPrice: formData.get("domesticPrice"),
      internationalPrice: formData.get("internationalPrice"),
      showOnHome: formData.get("showOnHome") === "true",
      thumbnail: thumbnailUrl,
      tags,
      travelType,
      category,
      inclusions,
      exclusions,
      whyChooseImages: {
        main: whyChooseMain,
        top: whyChooseTop,
        bottom: whyChooseBottom,
      },
      itineraryImage: itineraryImage,
      faqs: parseFaqsData(formData.get("faqsData")),
      timeline: timelineIds,
      carouselData: carouselIds,
    });

    revalidatePath("/admin/packages");
    revalidatePath("/services/packages");
    revalidatePath("/");

    return { success: true, packageId: newPackage._id.toString() };
  } catch (error) {
    console.error("Create Package Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deletePackage(id) {
  try {
    await connectDB();
    const pkg = await Package.findById(id);
    if (!pkg) return { success: false, error: "Package not found" };

    // Delete associated timelines and carousels
    if (pkg.timeline && pkg.timeline.length > 0) {
      await PackageTimeline.deleteMany({ _id: { $in: pkg.timeline } });
    }
    if (pkg.carouselData && pkg.carouselData.length > 0) {
      await Carousel.deleteMany({ _id: { $in: pkg.carouselData } });
    }

    await Package.findByIdAndDelete(id);

    revalidatePath("/admin/packages");
    revalidatePath("/services/packages");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete Package Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePackage(id, formData) {
  try {
    await connectDB();
    const pkg = await Package.findById(id);
    if (!pkg) return { success: false, error: "Package not found" };

    // 1. Upload thumbnail
    const thumbnailFile = formData.get("thumbnail");
    let thumbnailUrl = pkg.thumbnail;
    if (formData.get("removeThumbnail") === "true") {
      thumbnailUrl = "";
    }
    if (thumbnailFile && thumbnailFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(thumbnailFile);
      thumbnailUrl = uploadRes?.secure_url || thumbnailUrl;
    }

    // 2. Extract arrays
    const parseArray = (str) => str ? str.split(",").map((s) => s.trim()).filter(Boolean) : [];
    const tags = parseArray(formData.get("tags"));
    const inclusions = parseArray(formData.get("inclusions"));
    const exclusions = parseArray(formData.get("exclusions"));

    // Travel Type: multi-select array (can be JSON array string or comma separated)
    let travelType = [];
    const rawTravelType = formData.get("travelType");
    if (rawTravelType) {
      try {
        const parsed = JSON.parse(rawTravelType);
        if (Array.isArray(parsed)) travelType = parsed;
        else travelType = parseArray(rawTravelType);
      } catch {
        travelType = parseArray(rawTravelType);
      }
    }
    const category = travelType.length > 0 ? travelType : parseArray(formData.get("category"));

    // 3. Process Timelines
    const timelinesData = JSON.parse(formData.get("timelinesData") || "[]");
    const timelineIds = [];
    for (let i = 0; i < timelinesData.length; i++) {
      const tl = timelinesData[i];
      let image1Url = tl.image1;
      let image2Url = tl.image2;
      
      const file1 = formData.get(`timeline_${i}_image1`);
      if (file1 && file1.size > 0) {
        const up1 = await uploadOnCloudinary(file1);
        image1Url = up1?.secure_url || image1Url;
      }
      
      const file2 = formData.get(`timeline_${i}_image2`);
      if (file2 && file2.size > 0) {
        const up2 = await uploadOnCloudinary(file2);
        image2Url = up2?.secure_url || image2Url;
      }

      if (tl._id) {
        // Update existing
        await PackageTimeline.findByIdAndUpdate(tl._id, {
          dayTitle: tl.dayTitle,
          description: tl.description,
          image1: image1Url,
          image2: image2Url,
        });
        timelineIds.push(tl._id);
      } else {
        // Create new
        const newTl = await PackageTimeline.create({
          dayTitle: tl.dayTitle,
          description: tl.description,
          image1: image1Url,
          image2: image2Url,
        });
        timelineIds.push(newTl._id);
      }
    }

    // Delete orphaned timelines
    const oldTlStr = pkg.timeline.map(t => t.toString());
    const newTlStr = timelineIds.map(t => t.toString());
    const tlToDelete = oldTlStr.filter(t => !newTlStr.includes(t));
    if (tlToDelete.length > 0) {
      await PackageTimeline.deleteMany({ _id: { $in: tlToDelete } });
    }

    // 4. Process Section Showcase Images:
    // Why Choose Collage (3 Photos: Main, Top, Bottom) + Itinerary Feature Photo (1 Photo)
    let whyChooseMain = formData.get("existing_whyChoose_main") ?? (pkg.whyChooseImages?.main || "");
    let whyChooseTop = formData.get("existing_whyChoose_top") ?? (pkg.whyChooseImages?.top || "");
    let whyChooseBottom = formData.get("existing_whyChoose_bottom") ?? (pkg.whyChooseImages?.bottom || "");
    let itineraryImage = formData.get("existing_itineraryImage") ?? (pkg.itineraryImage || "");

    if (formData.get("remove_whyChoose_main") === "true") whyChooseMain = "";
    if (formData.get("remove_whyChoose_top") === "true") whyChooseTop = "";
    if (formData.get("remove_whyChoose_bottom") === "true") whyChooseBottom = "";
    if (formData.get("remove_itineraryImage") === "true") itineraryImage = "";

    const fileWhyMain = formData.get("whyChoose_main");
    if (fileWhyMain && fileWhyMain.size > 0) {
      const up = await uploadOnCloudinary(fileWhyMain);
      whyChooseMain = up?.secure_url || whyChooseMain;
    }
    const fileWhyTop = formData.get("whyChoose_top");
    if (fileWhyTop && fileWhyTop.size > 0) {
      const up = await uploadOnCloudinary(fileWhyTop);
      whyChooseTop = up?.secure_url || whyChooseTop;
    }
    const fileWhyBottom = formData.get("whyChoose_bottom");
    if (fileWhyBottom && fileWhyBottom.size > 0) {
      const up = await uploadOnCloudinary(fileWhyBottom);
      whyChooseBottom = up?.secure_url || whyChooseBottom;
    }
    const fileItin = formData.get("itineraryImage_file");
    if (fileItin && fileItin.size > 0) {
      const up = await uploadOnCloudinary(fileItin);
      itineraryImage = up?.secure_url || itineraryImage;
    }

    // Maintain Carousel records for backward compatibility
    if (pkg.carouselData && pkg.carouselData.length > 0) {
      await Carousel.deleteMany({ _id: { $in: pkg.carouselData } });
    }
    const sectionImages = [whyChooseMain, whyChooseTop, whyChooseBottom, itineraryImage].filter(Boolean);
    const carouselIds = [];
    for (let i = 0; i < sectionImages.length; i++) {
      const newC = await Carousel.create({
        title: "",
        description: "",
        buttonText: "",
        type: "package",
        image: sectionImages[i],
      });
      carouselIds.push(newC._id);
    }

    // 5. Update Package
    const duration = getPackageDuration({
      title: formData.get("title"),
      days: Number(formData.get("days")),
      nights: Number(formData.get("nights")),
      timeline: timelineIds,
    });

    await Package.findByIdAndUpdate(id, {
      title: formData.get("title"),
      city: formData.get("city"),
      destinations: formData.get("destinations"),
      country: formData.get("country"),
      description: formData.get("description"),
      days: duration.days,
      nights: duration.nights,
      domesticPrice: formData.get("domesticPrice"),
      internationalPrice: formData.get("internationalPrice"),
      showOnHome: formData.get("showOnHome") === "true",
      thumbnail: thumbnailUrl,
      tags,
      travelType,
      category,
      inclusions,
      exclusions,
      whyChooseImages: {
        main: whyChooseMain,
        top: whyChooseTop,
        bottom: whyChooseBottom,
      },
      itineraryImage: itineraryImage,
      faqs: parseFaqsData(formData.get("faqsData")),
      timeline: timelineIds,
      carouselData: carouselIds,
    });

    revalidatePath("/admin/packages");
    revalidatePath(`/admin/packages/${id}`);
    revalidatePath("/services/packages");
    revalidatePath("/");
    revalidatePath(`/services/packages/${pkg.slug}`);
    revalidatePath(`/services/packages/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Update Package Error:", error);
    return { success: false, error: error.message };
  }
}
