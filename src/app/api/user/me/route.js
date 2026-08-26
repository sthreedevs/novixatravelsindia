import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/index.js";
import { verifyAuth } from "@/lib/utils/auth.js";

export async function GET(request) {
  try {
    await connectDB();
    const user = await verifyAuth(request);

    if (!user) {
      return NextResponse.json({ error: "User not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("Get User Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
