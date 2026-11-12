"use client";

import React, { useState, useMemo } from "react";
import BlogHeroSection from "./BlogHeroSection";
import BlogCategoryFilterBar from "./BlogCategoryFilterBar";
import BlogGridSection from "./BlogGridSection";
import BlogNewsletterCTA from "./BlogNewsletterCTA";

export function BlogsPageClient({ initialBlogs = [] }) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Dynamically extract unique categories/tags from all database blogs
  const categories = useMemo(() => {
    const tagMap = new Map();

    initialBlogs.forEach((blog) => {
      if (Array.isArray(blog?.tags)) {
        blog.tags.forEach((tag) => {
          if (!tag) return;
          const clean = tag.trim();
          if (clean && clean.length <= 25) {
            const key = clean.toLowerCase();
            if (!tagMap.has(key)) {
              tagMap.set(key, clean);
            }
          }
        });
      }
    });

    const dynamicTags = Array.from(tagMap.values());
    return ["all", ...dynamicTags];
  }, [initialBlogs]);

  // Filter blogs according to active dynamic category tag
  const filteredBlogs = useMemo(() => {
    if (!activeCategory || activeCategory === "all") {
      return initialBlogs;
    }

    const target = activeCategory.toLowerCase();
    return initialBlogs.filter((blog) => {
      const tags = Array.isArray(blog?.tags)
        ? blog.tags.map((t) => (t || "").toLowerCase().trim())
        : [];
      return tags.includes(target);
    });
  }, [initialBlogs, activeCategory]);

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Dramatic Dark Luxury Travel Hero Section */}
      <BlogHeroSection />

      {/* 2. Dynamic Horizontal Category Filter Pills Bar */}
      <BlogCategoryFilterBar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 3. 3-Column Dynamic Blog Cards Grid */}
      <BlogGridSection
        blogs={filteredBlogs}
        onResetFilter={() => setActiveCategory("all")}
      />

      {/* 4. Full-Width Stay Updated Newsletter CTA Banner */}
      <BlogNewsletterCTA />
    </div>
  );
}

export default BlogsPageClient;
