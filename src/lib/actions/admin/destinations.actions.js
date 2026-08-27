"use server";

import { connectDB } from "@/lib/db/index.js";
import { Destination } from "@/lib/models/destination.model.js";
import { DestinationDescription } from "@/lib/models/destinationDescription.model.js";
import { Carousel } from "@/lib/models/carousel.model.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";
import { revalidatePath } from "next/cache";

export async function createDestination(formData) {
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

    // 3. Process Descriptions
    const descriptionsData = JSON.parse(formData.get("descriptionsData") || "[]");
    const descriptionIds = [];
    
    for (let i = 0; i < descriptionsData.length; i++) {
      const desc = descriptionsData[i];
      let imgUrl = desc.image || "";
      
      const file = formData.get(`description_${i}_image`);
      if (file && file.size > 0) {
        const up = await uploadOnCloudinary(file);
        imgUrl = up?.secure_url || "";
      }

      const newDesc = await DestinationDescription.create({
        title: desc.title,
        description: desc.description,
        highlights: desc.highlights || [], // Array of { title, description }
        image: imgUrl,
      });
      descriptionIds.push(newDesc._id);
    }

    // 4. Process Carousels
    const carouselsData = JSON.parse(formData.get("carouselsData") || "[]");
    const carouselIds = [];
    
    for (let i = 0; i < carouselsData.length; i++) {
      const c = carouselsData[i];
      let imgUrl = c.image || "";
      
      const file = formData.get(`carousel_${i}_image`);
      if (file && file.size > 0) {
        const up = await uploadOnCloudinary(file);
        imgUrl = up?.secure_url || "";
      }

      const newC = await Carousel.create({
        title: c.title,
        description: c.description,
        buttonText: c.buttonText,
        type: "destination",
        image: imgUrl,
      });
      carouselIds.push(newC._id);
    }

    // 5. Create Destination
    const newDestination = await Destination.create({
      name: formData.get("name"),
      country: formData.get("country"),
      continent: formData.get("continent"),
      isTrendingIndian: formData.get("isTrendingIndian") === "true",
      isTrendingInternational: formData.get("isTrendingInternational") === "true",
      thumbnail: thumbnailUrl,
      tags,
      descriptions: descriptionIds,
      carouselData: carouselIds,
    });

    revalidatePath("/admin/destinations");
    revalidatePath("/destinations");
    revalidatePath("/");

    return { success: true, destinationId: newDestination._id.toString() };
  } catch (error) {
    console.error("Create Destination Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateDestination(id, formData) {
  try {
    await connectDB();
    const dest = await Destination.findById(id);
    if (!dest) return { success: false, error: "Destination not found" };

    // 1. Upload thumbnail
    const thumbnailFile = formData.get("thumbnail");
    let thumbnailUrl = dest.thumbnail;
    if (formData.get("removeThumbnail") === "true") {
      thumbnailUrl = "";
    }
    if (thumbnailFile && thumbnailFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(thumbnailFile);
      thumbnailUrl = uploadRes?.secure_url || dest.thumbnail;
    }

    // 2. Extract arrays
    const tagsStr = formData.get("tags") || "";
    const tags = tagsStr ? tagsStr.split(",").map((s) => s.trim()).filter(Boolean) : [];

    // 3. Process Descriptions
    const descriptionsData = JSON.parse(formData.get("descriptionsData") || "[]");
    const descriptionIds = [];
    
    for (let i = 0; i < descriptionsData.length; i++) {
      const desc = descriptionsData[i];
      let imgUrl = desc.image || "";
      
      const file = formData.get(`description_${i}_image`);
      if (file && file.size > 0) {
        const up = await uploadOnCloudinary(file);
        imgUrl = up?.secure_url || imgUrl;
      }

      if (desc._id) {
        await DestinationDescription.findByIdAndUpdate(desc._id, {
          title: desc.title,
          description: desc.description,
          highlights: desc.highlights || [],
          image: imgUrl,
        });
        descriptionIds.push(desc._id);
      } else {
        const newDesc = await DestinationDescription.create({
          title: desc.title,
          description: desc.description,
          highlights: desc.highlights || [],
          image: imgUrl,
        });
        descriptionIds.push(newDesc._id);
      }
    }

    // Delete orphaned descriptions
    const oldDescStr = dest.descriptions.map(d => d.toString());
    const newDescStr = descriptionIds.map(d => d.toString());
    const descToDelete = oldDescStr.filter(d => !newDescStr.includes(d));
    if (descToDelete.length > 0) {
      await DestinationDescription.deleteMany({ _id: { $in: descToDelete } });
    }

    // 4. Process Carousels
    const carouselsData = JSON.parse(formData.get("carouselsData") || "[]");
    const carouselIds = [];
    
    for (let i = 0; i < carouselsData.length; i++) {
      const c = carouselsData[i];
      let imgUrl = c.image || "";
      
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
          type: "destination",
          image: imgUrl,
        });
        carouselIds.push(c._id);
      } else {
        const newC = await Carousel.create({
          title: c.title,
          description: c.description,
          buttonText: c.buttonText,
          type: "destination",
          image: imgUrl,
        });
        carouselIds.push(newC._id);
      }
    }

    // Delete orphaned carousels
    const oldCStr = dest.carouselData.map(c => c.toString());
    const newCStr = carouselIds.map(c => c.toString());
    const cToDelete = oldCStr.filter(c => !newCStr.includes(c));
    if (cToDelete.length > 0) {
      await Carousel.deleteMany({ _id: { $in: cToDelete } });
    }

    // 5. Update Destination
    await Destination.findByIdAndUpdate(id, {
      name: formData.get("name"),
      country: formData.get("country"),
      continent: formData.get("continent"),
      isTrendingIndian: formData.get("isTrendingIndian") === "true",
      isTrendingInternational: formData.get("isTrendingInternational") === "true",
      thumbnail: thumbnailUrl,
      tags,
      descriptions: descriptionIds,
      carouselData: carouselIds,
    });

    revalidatePath("/admin/destinations");
    revalidatePath("/destinations");
    revalidatePath("/");
    revalidatePath(`/destinations/${dest.name.replace(/\s+/g, '-').toLowerCase()}`);

    return { success: true };
  } catch (error) {
    console.error("Update Destination Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteDestination(id) {
  try {
    await connectDB();
    const dest = await Destination.findById(id);
    if (!dest) return { success: false, error: "Destination not found" };

    if (dest.descriptions && dest.descriptions.length > 0) {
      await DestinationDescription.deleteMany({ _id: { $in: dest.descriptions } });
    }
    if (dest.carouselData && dest.carouselData.length > 0) {
      await Carousel.deleteMany({ _id: { $in: dest.carouselData } });
    }

    await Destination.findByIdAndDelete(id);

    revalidatePath("/admin/destinations");
    revalidatePath("/destinations");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete Destination Error:", error);
    return { success: false, error: error.message };
  }
}
