import { Testimonial } from "@/lib/models/testimonial.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function getAllTestimonials() {
  await connectDB();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(testimonials));
}

export async function getTestimonialById(id) {
  if (id === 'add' || id === 'new') return null;
  try {
    await connectDB();
    const testimonial = await Testimonial.findById(id).lean();
    if (!testimonial) return null;
    return JSON.parse(JSON.stringify(testimonial));
  } catch (error) {
    console.error("Error fetching testimonial by ID:", error);
    return null;
  }
}
