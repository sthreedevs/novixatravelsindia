import { NextResponse } from "next/server";
import { HomeDestination } from "@/lib/models/homeDestinations.model.js";
import { Destination } from "@/lib/models/destination.model.js";
import { connectDB } from "@/lib/db/index.js";

const normalizeIds = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val; 
  if (typeof val === "string") {
    try {
      return JSON.parse(val); 
    } catch {
      return val.split(",").map((id) => id.trim());
    }
  }
  return [];
};

export async function GET(request) {
  try {
    await connectDB();
    const doc = await HomeDestination.findOne()
      .populate("domestic")
      .populate("international");

    return NextResponse.json({
      success: true,
      data: doc || { domestic: [], international: [] },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const domestic = normalizeIds(body.domestic);
    const international = normalizeIds(body.international);

    let doc = await HomeDestination.findOne();
    if (!doc) {
      doc = new HomeDestination({ domestic, international });
    } else {
      doc.domestic = domestic;
      doc.international = international;
    }

    await doc.save();

    return NextResponse.json({ success: true, data: doc }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
