import { NextResponse } from "next/server";
import { ESimPlan as ESim } from "@/lib/models/eSim.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const esim = await ESim.findByIdAndDelete(id);
    if (!esim) {
      return NextResponse.json({ error: "eSim not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "eSim deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
