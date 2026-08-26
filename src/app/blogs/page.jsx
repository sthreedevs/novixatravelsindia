import React from "react";
import { getBlogs } from "@/lib/services/blog.service.js";
import { BlogsPageClient } from "@/components/blogs/BlogsPageClient";

export const metadata = {
  title: "Blogs | Novixa Travels",
  description: "Read the latest travel blogs, tips, and destination guides from Novixa Travels.",
};

export default async function BlogsPage() {
  const blogsData = await getBlogs();

  return <BlogsPageClient initialBlogs={blogsData} />;
}
