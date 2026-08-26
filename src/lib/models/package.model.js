import mongoose from "mongoose";

const packageSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    city: { type: String, lowercase: true },
    destinations: { type: String, required: true },
    country: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    days: { type: Number, required: true },
    nights: { type: Number, required: true },
    tags: [{ type: String, required: true }],
    category: [{ type: String, required: true }],
    domesticPrice: { type: String, required: true },
    internationalPrice: { type: String, required: true },
    carouselData: [{ type: mongoose.Schema.Types.ObjectId, ref: "Carousel" }],
    timeline: [
      { type: mongoose.Schema.Types.ObjectId, ref: "PackageTimeline" },
    ],
    showOnHome: { type: Boolean, default: false },
    inclusions:[{ type: String,  trim: true}],
    exclusions:[{ type: String,  trim: true }],
  },
  {
    timestamps: true,
  }
);

packageSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = this.title
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }
  next();
});

export const Package = mongoose.models.Package || mongoose.model("Package", packageSchema);
