import { NextResponse } from "next/server";
import { User } from "@/lib/models/user.model.js";
import { connectDB } from "@/lib/db/index.js";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "name, email and password fields must be filled." },
        { status: 400 }
      );
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return NextResponse.json(
        { error: "user already exist" },
        { status: 409 }
      );
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
      return NextResponse.json(
        { error: "Something went wrong while creating a user" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "user created successfully", data: createdUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
