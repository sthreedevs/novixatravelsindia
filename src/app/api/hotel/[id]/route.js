import { NextResponse } from "next/server";
import { Hotel } from "@/lib/models/hotel.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    // Safety check for dynamic routing overlap
    if (id === 'add' || id === 'getHotelsPageData') {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: hotel }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
