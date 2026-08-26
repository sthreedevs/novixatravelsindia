import mongoose from "mongoose";

const subscriberSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);
export const Subscriber = mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);
