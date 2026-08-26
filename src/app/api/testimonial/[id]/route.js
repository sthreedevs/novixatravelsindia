import { NextResponse } from "next/server";
import { Testimonial } from "@/lib/models/testimonial.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: testimonial }, { status: 200 });
  } catch (error) {
    console.error("Testimonial GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
