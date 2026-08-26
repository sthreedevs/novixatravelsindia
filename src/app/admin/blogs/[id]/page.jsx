import React from "react";
import { getBlogBySlug } from "@/lib/services/blog.service";
import EditBlogClient from "./EditBlogClient";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Blog | Admin",
};

export default async function EditBlogPage({ params }) {
  const { id } = await params;
  
  const blog = await getBlogBySlug(id);

  if (!blog) {
    notFound();
  }

  return <EditBlogClient blog={blog} />;
}
