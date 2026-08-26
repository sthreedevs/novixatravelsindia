import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/index.js";
// Important: Mongoose model import might have different exported name, so we use wildcard or assume default
import * as Models from "@/lib/models/serviceModels/transportInfo.model.js";
const Model = Object.values(Models)[0];

export async function GET(request) {
  try {
    await connectDB();
    const records = await Model.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: records.length, data: records }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}