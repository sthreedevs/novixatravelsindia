import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema(
  {
    name: { type: String,requireed:true },
    designation: { type: String,requireed:true  },
    image: { type: String,requireed:true  },
    review: { type: String,requireed:true  },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
