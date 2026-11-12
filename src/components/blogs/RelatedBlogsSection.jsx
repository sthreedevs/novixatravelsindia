"use client";

import React from "react";
import BlogCard from "./BlogCard";
import { Sparkles } from "lucide-react";

export default function RelatedBlogsSection({ blogs = [] }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-zinc-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-[#deb06c] text-xs font-bold uppercase tracking-[0.25em] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#deb06c]" />
            <span>MORE TRAVEL STORIES</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mt-1">
            Keep Exploring
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {blogs.slice(0, 3).map((blog) => (
          <BlogCard key={blog._id || blog.slug} blog={blog} />
        ))}
      </div>
    </section>
  );
}

