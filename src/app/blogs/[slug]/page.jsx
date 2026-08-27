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

  const title = `${blogData.title} | Novixa Travels India`;
  const description = blogData.description 
    ? (blogData.description.substring(0, 150) + "...") 
    : `Read ${blogData.title} on Novixa Travels India.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/blogs/${slug}`,
      type: "article",
      images: blogData.thumbnail ? [
        {
          url: blogData.thumbnail,
          width: 800,
          height: 600,
          alt: blogData.title,
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blogData.thumbnail ? [blogData.thumbnail] : [],
    },
    alternates: {
      canonical: `/blogs/${slug}`,
    }
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