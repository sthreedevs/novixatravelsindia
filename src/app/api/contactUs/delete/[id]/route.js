import { NextResponse } from "next/server";
import { ContactUs } from "@/lib/models/serviceModels/contactUs.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const contactUs = await ContactUs.findByIdAndDelete(id);
    if (!contactUs) {
      return NextResponse.json({ error: "ContactUs not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "ContactUs deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("ContactUs DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
