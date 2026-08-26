import { NextResponse } from "next/server";
import { Testimonial } from "@/lib/models/testimonial.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: testimonials }, { status: 200 });
  } catch (error) {
    console.error("Testimonial GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
