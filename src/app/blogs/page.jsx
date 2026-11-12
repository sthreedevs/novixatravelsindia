import React from "react";
import { getBlogs } from "@/lib/services/blog.service.js";
import { BlogsPageClient } from "@/components/blogs/BlogsPageClient";

export const metadata = {
  title: "Travel Tips, Guides & Inspiration | Novixa Travels India",
  description:
    "Get expert travel tips, destination guides, visa updates, packing hacks and more. Plan smarter, travel better with Novixa Travels India.",
};

export default async function BlogsPage() {
  const blogsData = await getBlogs();

  return <BlogsPageClient initialBlogs={blogsData} />;
}
