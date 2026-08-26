import { NextResponse } from "next/server";
import { ContactUs } from "@/lib/models/serviceModels/contactUs.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const records = await ContactUs.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: records }, { status: 200 });
  } catch (error) {
    console.error("ContactUs GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
