import { NextResponse } from "next/server";
import { ContactUs } from "@/lib/models/serviceModels/contactUs.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const contactUs = await ContactUs.create({
      name,
      email,
      phone,
      message,
    });

    return NextResponse.json(
      { success: true, message: "ContactUs submitted successfully", data: contactUs },
      { status: 201 }
    );
  } catch (error) {
    console.error("ContactUs POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
