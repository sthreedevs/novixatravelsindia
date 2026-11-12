"use client";

import React from "react";
import BlogCard from "./BlogCard";
import { Compass } from "lucide-react";

export default function BlogGridSection({ blogs = [], onResetFilter }) {
  if (blogs.length === 0) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-16 sm:py-20 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#deb06c]/15 border border-[#deb06c]/40 text-[#deb06c] flex items-center justify-center mx-auto shadow-inner shadow-[#deb06c]/10">
            <Compass className="w-6 h-6 stroke-[1.8]" />
          </div>
          <h3 className="text-xl font-serif font-bold text-white">
            No articles found in this category
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We are constantly publishing new destination guides and travel advice.
            Try selecting a different category or view all blogs.
          </p>
          <button
            type="button"
            onClick={onResetFilter}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all cursor-pointer"
          >
            Show All Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog._id || blog.slug || blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

