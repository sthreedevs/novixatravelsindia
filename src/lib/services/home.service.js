import { Destination } from "@/lib/models/destination.model.js";
import { Package } from "@/lib/models/package.model.js";
import { Testimonial } from "@/lib/models/testimonial.model.js";
import { Carousel } from "@/lib/models/carousel.model.js";
import { Blog } from "@/lib/models/blog.model.js";
import { connectDB } from "@/lib/db/index.js";

// Ensure all models are registered
import "@/lib/models/index.js";

export async function getTrendingIndian() {
  await connectDB();
  const destinations = await Destination.find({ isTrendingIndian: true })
    .populate("descriptions")
    .populate("carouselData")
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(destinations));
}

export async function getTrendingInternational() {
  await connectDB();
  const destinations = await Destination.find({ isTrendingInternational: true })
    .populate("descriptions")
    .populate("carouselData")
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(destinations));
}

export async function getHomePackages() {
  await connectDB();
  const packages = await Package.find()
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();
  return JSON.parse(JSON.stringify(packages));
}

export async function getTestimonials() {
  await connectDB();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(testimonials));
}

export async function getHomeCarousel() {
  await connectDB();
  const carousel = await Carousel.find({ type: "home" }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(carousel));
}

export async function getEtiBlogs() {
  await connectDB();
  const blogs = await Blog.find({ author: "ETI" })
    .populate("content")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  return JSON.parse(JSON.stringify(blogs));
}
