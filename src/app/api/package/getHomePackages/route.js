import { NextResponse } from "next/server";
import { Package } from "@/lib/models/package.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const packages = await Package.find({ showOnHome: true });
    return NextResponse.json({ success: true, data: packages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
