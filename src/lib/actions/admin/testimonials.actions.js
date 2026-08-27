"use server";

import { connectDB } from "@/lib/db/index.js";
import { Testimonial } from "@/lib/models/testimonial.model.js";
import { uploadOnCloudinary } from "@/lib/utils/cloudinary.js";
import { revalidatePath } from "next/cache";

export async function createTestimonial(formData) {
  try {
    await connectDB();

    const imageFile = formData.get("image");
    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(imageFile);
      imageUrl = uploadRes?.secure_url || "";
    }

    const newTestimonial = await Testimonial.create({
      name: formData.get("name"),
      designation: formData.get("designation"),
      review: formData.get("review"),
      image: imageUrl,
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");

    return { success: true, testimonialId: newTestimonial._id.toString() };
  } catch (error) {
    console.error("Create Testimonial Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateTestimonial(id, formData) {
  try {
    await connectDB();
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) return { success: false, error: "Testimonial not found" };

    const imageFile = formData.get("image");
    let imageUrl = testimonial.image;
    if (formData.get("removeImage") === "true") {
      imageUrl = "";
    }
    if (imageFile && imageFile.size > 0) {
      const uploadRes = await uploadOnCloudinary(imageFile);
      imageUrl = uploadRes?.secure_url || imageUrl;
    }

    await Testimonial.findByIdAndUpdate(id, {
      name: formData.get("name"),
      designation: formData.get("designation"),
      review: formData.get("review"),
      image: imageUrl,
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Update Testimonial Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteTestimonial(id) {
  try {
    await connectDB();
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) return { success: false, error: "Testimonial not found" };

    await Testimonial.findByIdAndDelete(id);

    revalidatePath("/admin/testimonials");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete Testimonial Error:", error);
    return { success: false, error: error.message };
  }
}
