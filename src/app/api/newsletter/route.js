import { NextResponse } from "next/server";
import { Newsletter } from "@/lib/models/newsletter.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const records = await Newsletter.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: records.length, data: records }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
