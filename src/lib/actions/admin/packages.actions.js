"use server";

import { connectDB } from "@/lib/db/index.js";
import { Package } from "@/lib/models/package.model.js";
import { PackageTimeline } from "@/lib/models/packageTimeline.model.js";
import { Carousel } from "@/lib/models/carousel.model.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

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
    const category = parseArray(formData.get("category"));
    const inclusions = parseArray(formData.get("inclusions"));
    const exclusions = parseArray(formData.get("exclusions"));

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

    // 4. Process Carousels
    const carouselsData = JSON.parse(formData.get("carouselsData") || "[]");
    const carouselIds = [];
    for (let i = 0; i < carouselsData.length; i++) {
      const c = carouselsData[i];
      let imgUrl = c.image;
      
      const file = formData.get(`carousel_${i}_image`);
      if (file && file.size > 0) {
        const up = await uploadOnCloudinary(file);
        imgUrl = up?.secure_url || "";
      }

      const newC = await Carousel.create({
        title: c.title,
        description: c.description,
        buttonText: c.buttonText,
        type: c.type || "package",
        image: imgUrl,
      });
      carouselIds.push(newC._id);
    }

    // 5. Create Package
    const newPackage = await Package.create({
      title: formData.get("title"),
      city: formData.get("city"),
      destinations: formData.get("destinations"),
      country: formData.get("country"),
      description: formData.get("description"),
      days: Number(formData.get("days")),
      nights: Number(formData.get("nights")),
      domesticPrice: formData.get("domesticPrice"),
      internationalPrice: formData.get("internationalPrice"),
      showOnHome: formData.get("showOnHome") === "true",
      thumbnail: thumbnailUrl,
      tags,
      category,
      inclusions,
      exclusions,
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
    if (thumbnailFile && thumbnailFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(thumbnailFile);
      thumbnailUrl = uploadRes?.secure_url || pkg.thumbnail;
    }

    // 2. Extract arrays
    const parseArray = (str) => str ? str.split(",").map((s) => s.trim()).filter(Boolean) : [];
    const tags = parseArray(formData.get("tags"));
    const category = parseArray(formData.get("category"));
    const inclusions = parseArray(formData.get("inclusions"));
    const exclusions = parseArray(formData.get("exclusions"));

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

    // 4. Process Carousels
    const carouselsData = JSON.parse(formData.get("carouselsData") || "[]");
    const carouselIds = [];
    for (let i = 0; i < carouselsData.length; i++) {
      const c = carouselsData[i];
      let imgUrl = c.image;
      
      const file = formData.get(`carousel_${i}_image`);
      if (file && file.size > 0) {
        const up = await uploadOnCloudinary(file);
        imgUrl = up?.secure_url || imgUrl;
      }

      if (c._id) {
        await Carousel.findByIdAndUpdate(c._id, {
          title: c.title,
          description: c.description,
          buttonText: c.buttonText,
          type: c.type || "package",
          image: imgUrl,
        });
        carouselIds.push(c._id);
      } else {
        const newC = await Carousel.create({
          title: c.title,
          description: c.description,
          buttonText: c.buttonText,
          type: c.type || "package",
          image: imgUrl,
        });
        carouselIds.push(newC._id);
      }
    }

    // Delete orphaned carousels
    const oldCStr = pkg.carouselData.map(c => c.toString());
    const newCStr = carouselIds.map(c => c.toString());
    const cToDelete = oldCStr.filter(c => !newCStr.includes(c));
    if (cToDelete.length > 0) {
      await Carousel.deleteMany({ _id: { $in: cToDelete } });
    }

    // 5. Update Package
    await Package.findByIdAndUpdate(id, {
      title: formData.get("title"),
      city: formData.get("city"),
      destinations: formData.get("destinations"),
      country: formData.get("country"),
      description: formData.get("description"),
      days: Number(formData.get("days")),
      nights: Number(formData.get("nights")),
      domesticPrice: formData.get("domesticPrice"),
      internationalPrice: formData.get("internationalPrice"),
      showOnHome: formData.get("showOnHome") === "true",
      thumbnail: thumbnailUrl,
      tags,
      category,
      inclusions,
      exclusions,
      timeline: timelineIds,
      carouselData: carouselIds,
    });

    revalidatePath("/admin/packages");
    revalidatePath("/services/packages");
    revalidatePath("/");
    revalidatePath(`/services/packages/${pkg.slug}`);

    return { success: true };
  } catch (error) {
    console.error("Update Package Error:", error);
    return { success: false, error: error.message };
  }
}
