import React from "react";
import { getBlogBySlug, getBlogs } from "@/lib/services/blog.service.js";
import { SingleBlogPageClient } from "@/components/blogs/SingleBlogPageClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blogData = await getBlogBySlug(slug);

  if (!blogData) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blogData.title} | Novixa Travels`,
    description: blogData.description || `Read ${blogData.title} on Novixa Travels.`,
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;

  const blogData = await getBlogBySlug(slug);
  
  if (!blogData) {
    notFound();
  }

  const allBlogs = await getBlogs();
  const recentBlogs = allBlogs?.filter((b) => b.slug !== slug)?.slice(0, 4);

  return <SingleBlogPageClient initialBlog={blogData} recentBlogs={recentBlogs} />;
}