import { NextResponse } from "next/server";
import { ESimPlan as ESim } from "@/lib/models/eSim.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const esims = await ESim.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: esims }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
