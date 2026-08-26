import { NextResponse } from "next/server";
import { Package } from "@/lib/models/package.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function GET(request) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const isTrendingIndian = searchParams.get("isTrendingIndian");
    const isTrendingInternational = searchParams.get("isTrendingInternational");
    
    let query = {};
    if (isTrendingIndian === 'true') {
        query.isTrendingIndian = true;
    }
    if (isTrendingInternational === 'true') {
        query.isTrendingInternational = true;
    }

    const packages = await Package.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: packages.length, data: packages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
