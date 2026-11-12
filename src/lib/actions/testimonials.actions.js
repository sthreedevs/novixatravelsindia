"use server";

import { connectDB } from "@/lib/db/index.js";
import { Testimonial } from "@/lib/models/testimonial.model.js";

// Ensure all models are registered
import "@/lib/models/index.js";

export async function getPublicTestimonials() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(testimonials));
  } catch (error) {
    console.error("Error fetching public testimonials:", error);
    return [];
  }
}
