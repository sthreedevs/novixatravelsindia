import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/index.js";
import * as Models from "@/lib/models/serviceModels/europeRailTicket.model.js";
const Model = Object.values(Models)[0];

export async function GET(request, { params }) {
  try {
    await connectDB();
    const record = await Model.findById((await params).id);
    if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: record }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}