import mongoose from "mongoose";

const navbarTopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    validTill: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
export const NavbarTop = mongoose.models.NavbarTop || mongoose.model("NavbarTop", navbarTopSchema);
