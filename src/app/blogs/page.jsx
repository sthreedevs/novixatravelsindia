"use client";
import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeTag, setActiveTag] = useState(null);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    blogs.forEach((blog) => blog.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet);
  }, [blogs]);

  const filtered = activeTag
    ? blogs.filter((b) => b.tags.includes(activeTag))
    : blogs;

  const fetchData = async () => {
    const response = await axios.get("/api/blog");
    const data = response.data;
    setBlogs(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

export default Blogs;
