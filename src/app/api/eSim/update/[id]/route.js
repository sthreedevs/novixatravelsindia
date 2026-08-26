import { NextResponse } from "next/server";
import { ESimPlan as ESim } from "@/lib/models/eSim.model.js";
import { connectDB } from "@/lib/db/index.js";

function parseJsonArray(value) {
  if (!value) return undefined;
  if (typeof value === "string") {
    try { return JSON.parse(value); } 
    catch { return value.split(",").map(v => v.trim()); }
  }
  return value;
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const esim = await ESim.findById(id);
    if (!esim) {
      return NextResponse.json({ error: "eSim not found" }, { status: 404 });
    }

    esim.country = body.country ?? esim.country;
    esim.daysAndPrice = body.daysAndPrice ?? esim.daysAndPrice;
    
    if (body.howToUse) esim.howToUse = parseJsonArray(body.howToUse);
    if (body.support) esim.support = parseJsonArray(body.support);

    await esim.save();

    return NextResponse.json(
      { success: true, message: "eSim updated successfully", data: esim },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
