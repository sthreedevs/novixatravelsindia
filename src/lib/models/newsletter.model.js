import mongoose from "mongoose";

const newsLetterSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    link:{
      type: String,
      required: true,
    },

  },
  { timestamps: true }
  
);

export const Newsletter = mongoose.models.Newsletter || mongoose.model("Newsletter", newsLetterSchema);
