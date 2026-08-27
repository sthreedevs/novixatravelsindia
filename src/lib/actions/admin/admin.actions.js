"use server";

import { connectDB } from "@/lib/db/index.js";
import { User } from "@/lib/models/user.model.js";
import bcrypt from "bcryptjs";

// Fetch all admins
export async function getAdmins() {
  try {
    await connectDB();
    // Find all users where isAdmin is true
    const admins = await User.find({ isAdmin: true })
      .select("-password -refreshToken") // Exclude sensitive info
      .sort({ createdAt: -1 })
      .lean();
    
    // Convert ObjectId to string for client component compatibility
    return {
      success: true,
      admins: JSON.parse(JSON.stringify(admins)),
    };
  } catch (error) {
    console.error("Error fetching admins:", error);
    return { success: false, error: "Failed to fetch admins" };
  }
}

// Add a new admin
export async function addAdmin({ name, email, password }) {
  try {
    await connectDB();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isAdmin) {
        return { success: false, error: "An admin with this email already exists" };
      }
      return { success: false, error: "A normal user with this email already exists" };
    }

    // The user model pre-save hook automatically hashes the password
    const newAdmin = new User({
      name,
      email,
      password,
      isAdmin: true,
    });

    await newAdmin.save();
    
    return { success: true };
  } catch (error) {
    console.error("Error adding admin:", error);
    return { success: false, error: "Failed to add admin" };
  }
}

// Delete an admin
export async function deleteAdmin(id) {
  try {
    await connectDB();
    
    const adminToDelete = await User.findById(id);
    if (!adminToDelete) {
      return { success: false, error: "Admin not found" };
    }

    // Protection rule: Do not allow deletion of super admin
    if (adminToDelete.email === "sthreedevs@gmail.com") {
      return { success: false, error: "Cannot delete the super admin account!" };
    }

    await User.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error("Error deleting admin:", error);
    return { success: false, error: "Failed to delete admin" };
  }
}
