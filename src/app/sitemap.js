import { Package } from "@/lib/models/package.model.js";
import { Destination } from "@/lib/models/destination.model.js";
import { Blog } from "@/lib/models/blog.model.js";
import { connectDB } from "@/lib/db/index.js";

export default async function sitemap() {
  const baseUrl = "https://novixatravelsindia.com";

  await connectDB();

  // Fetch all slugs/paths from DB
  const packages = await Package.find({ isActive: true }).select("slug updatedAt");
  const destinations = await Destination.find().select("name updatedAt");
  const blogs = await Blog.find({ isPublished: true }).select("slug updatedAt");

  // Static routes
  const routes = [
    "",
    "/about-us",
    "/contact-us",
    "/blogs",
    "/services/packages",
    "/services/day-trips",
    "/services/car-bus-rental",
    "/services/cruise",
    "/services/e-sim",
    "/services/flights",
    "/services/hotels",
    "/services/insurance",
    "/services/passport",
    "/services/rail-europe",
    "/services/trains",
    "/services/visa",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Map dynamic entities
  const packageRoutes = packages.map((pkg) => ({
    url: `${baseUrl}/services/packages/${pkg.slug}`,
    lastModified: pkg.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const destinationRoutes = destinations.map((dest) => ({
    url: `${baseUrl}/destination/${encodeURIComponent(dest.name)}`,
    lastModified: dest.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...packageRoutes, ...destinationRoutes, ...blogRoutes];
}
