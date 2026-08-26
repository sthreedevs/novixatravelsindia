import { NextResponse } from "next/server";
import { User } from "@/lib/models/user.model.js";
import { connectDB } from "@/lib/db/index.js";
import { verifyAuth } from "@/lib/utils/auth.js";

export async function POST(request) {
  try {
    await connectDB();
    const user = await verifyAuth(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await User.findByIdAndUpdate(
      user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    const response = NextResponse.json(
      { success: true, message: "user logged out successfully" },
      { status: 200 }
    );

    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
