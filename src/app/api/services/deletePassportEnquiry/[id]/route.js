import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/index.js";
import * as Models from "@/lib/models/serviceModels/passportInfo.model.js";
const Model = Object.values(Models)[0];

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await Model.findByIdAndDelete((await params).id);
    return NextResponse.json({ success: true, message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}