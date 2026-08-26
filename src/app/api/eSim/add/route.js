import { NextResponse } from "next/server";
import { ESimPlan as ESim } from "@/lib/models/eSim.model.js";
import { connectDB } from "@/lib/db/index.js";

function parseJsonArray(value) {
  if (typeof value === "string") {
    try { return JSON.parse(value); } 
    catch { return value.split(",").map(v => v.trim()); }
  }
  return value;
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { country, daysAndPrice, howToUse, support } = body;

    if (!country || !daysAndPrice) {
      return NextResponse.json({ error: "Country and Days/Price are required." }, { status: 400 });
    }

    const createdESim = await ESim.create({
      country,
      daysAndPrice,
      howToUse: parseJsonArray(howToUse),
      support: parseJsonArray(support)
    });

    return NextResponse.json(
      { success: true, message: "eSim created successfully", data: createdESim },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
