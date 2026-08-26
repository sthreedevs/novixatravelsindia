import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: "BlogContent" }],
    tags: { type: [String], default: [] },
    author: { type: String, required: true },
    thumbnail: { type: String, required: true },
    readTime: { type: String, required: true },
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
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

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
