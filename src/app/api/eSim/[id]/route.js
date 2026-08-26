import { NextResponse } from "next/server";
import { ESimPlan as ESim } from "@/lib/models/eSim.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    if (id === 'add') {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const esim = await ESim.findById(id);
    if (!esim) {
      return NextResponse.json({ error: "eSim not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: esim }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
