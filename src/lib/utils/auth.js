import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { connectDB } from "../db/index.js";

/**
 * Validates the JWT from Next.js request cookies or headers.
 * @param {Request} request 
 * @returns {Promise<Object|null>} Returns the user document if valid, null otherwise.
 */
export const verifyAuth = async (request) => {
  try {
    await connectDB();
    
    // Check cookies first
    let token = null;
    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split('; ').map(c => c.split('='))
      );
      token = cookies.accessToken || cookies.refreshToken;
    }

    // Fallback to Authorization header
    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.replace("Bearer ", "");
      }
    }

    if (!token) return null;

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || process.env.REFRESH_TOKEN_SECRET);
    
    if (!decodedToken) return null;

    const user = await User.findById(decodedToken?._id).select("-password -refreshtoken");
    return user;
  } catch (error) {
    console.error("Auth Verification Error:", error);
    return null;
  }
};
