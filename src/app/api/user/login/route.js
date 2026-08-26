import { NextResponse } from "next/server";
import { User } from "@/lib/models/user.model.js";
import { connectDB } from "@/lib/db/index.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password } = body;

    if (!email && !password) {
      return NextResponse.json(
        { error: "email and password fields must be filled." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "password is incorrect" }, { status: 401 });
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const response = NextResponse.json(
      {
        success: true,
        message: "User logged in",
        user: loggedInUser,
        accessToken,
        refreshToken,
      },
      { status: 200 }
    );

    const options = {
      httpOnly: true,
      secure: true,
      path: "/",
    };

    response.cookies.set("accessToken", accessToken, options);
    response.cookies.set("refreshToken", refreshToken, options);

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
