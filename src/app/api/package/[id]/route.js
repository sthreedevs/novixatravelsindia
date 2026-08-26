import { NextResponse } from "next/server";
import { Package } from "@/lib/models/package.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    if (id === 'add') {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const packageData = await Package.findById(id);
    if (!packageData) return NextResponse.json({ error: "Package not found." }, { status: 404 });

    return NextResponse.json({ success: true, data: packageData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
