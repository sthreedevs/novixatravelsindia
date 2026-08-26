import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getBlogs } from "@/lib/services/blog.service";
import { Button } from "@/components/ui/button";
import BlogsTableClient from "./BlogsTableClient";

export const metadata = {
  title: "Manage Blogs | Admin",
};

export default async function AdminBlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Blogs
        </h1>
        <Link href="/admin/blogs/new">
          <Button className="bg-[#BFA181] hover:bg-[#a68c70] text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Button>
        </Link>
      </div>

      <BlogsTableClient initialBlogs={blogs} />
    </div>
  );
}
