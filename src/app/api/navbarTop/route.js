import { NextResponse } from "next/server";
import { NavbarTop } from "@/lib/models/navbarTop.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const entries = await NavbarTop.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: entries }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
