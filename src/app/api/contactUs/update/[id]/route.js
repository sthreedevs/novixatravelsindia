import { NextResponse } from "next/server";
import { ContactUs } from "@/lib/models/serviceModels/contactUs.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const contactUs = await ContactUs.findById(id);
    if (!contactUs) {
      return NextResponse.json({ error: "ContactUs not found" }, { status: 404 });
    }

    if (status) {
      contactUs.status = status;
    }

    const updated = await contactUs.save();

    return NextResponse.json(
      { success: true, message: "ContactUs updated successfully", data: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("ContactUs PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
