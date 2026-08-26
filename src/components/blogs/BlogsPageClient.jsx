"use client";
import React, { useState, useMemo } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export const BlogsPageClient = ({ initialBlogs }) => {
  const [blogs] = useState(initialBlogs || []);
  const [activeTag, setActiveTag] = useState(null);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    blogs.forEach((blog) => blog.tags?.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet);
  }, [blogs]);

  const filtered = activeTag
    ? blogs.filter((b) => b.tags?.includes(activeTag))
    : blogs;

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <button
          className={`px-4 py-1 rounded-full border ${
            !activeTag ? "bg-neutral-50/20 text-white" : ""
          }`}
          onClick={() => setActiveTag(null)}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-1 rounded-full border ${
              activeTag === tag ? "bg-neutral-50/20 text-white" : ""
            }`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <HoverEffect items={filtered} />
    </section>
  );
};
