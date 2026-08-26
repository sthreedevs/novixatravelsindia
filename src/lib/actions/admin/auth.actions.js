"use server";

import { connectDB } from "@/lib/db/index.js";
import { User } from "@/lib/models/user.model.js";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function adminLogin(email, password) {
  try {
    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, error: "Invalid credentials" };
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return { success: false, error: "Invalid credentials" };
    }

    if (!user.isAdmin) {
      return { success: false, error: "Not authorized as admin" };
    }

    // Generate JWT token using jose (edge compatible)
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET || "secret");
    
    const token = await new SignJWT({ 
        _id: user._id.toString(), 
        email: user.email, 
        isAdmin: true 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "strict",
    });

    return { success: true };
  } catch (error) {
    console.error("Admin login error:", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return { success: true };
}
