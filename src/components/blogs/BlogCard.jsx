"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Clock } from "lucide-react";

export default function BlogCard({ blog }) {
  if (!blog) return null;

  const linkHref = `/blogs/${blog.slug || blog._id || blog.id}`;
  const thumbnail = blog.thumbnail || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png";

  // Dynamic Category Badge from DB tags
  const categoryBadge =
    Array.isArray(blog.tags) && blog.tags.length > 0
      ? String(blog.tags[0]).toUpperCase()
      : "TRAVEL BLOG";

  // Dynamic Description / Excerpt from DB
  const rawDesc =
    blog.description ||
    (Array.isArray(blog.content) && blog.content[0]?.description) ||
    "Read full travel guide and expert advice from Novixa Travels India.";
  // Strip any raw HTML tags if present in description
  const cleanDesc =
    typeof rawDesc === "string"
      ? rawDesc.replace(/<[^>]*>/g, "").trim()
      : "";

  // Dynamic Formatted Date from DB createdAt
  let formattedDate = "Recent Article";
  if (blog.createdAt) {
    try {
      const d = new Date(blog.createdAt);
      formattedDate = d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (_) {}
  }

  return (
    <article className="group bg-[#11131a] rounded-2xl overflow-hidden border border-zinc-800/90 hover:border-[#deb06c]/50 shadow-md hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* 1. Card Thumbnail Image with Floating Category Pill */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
        <Link href={linkHref} className="block w-full h-full">
          <Image
            src={thumbnail}
            alt={blog.title || "Travel Blog"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          {/* Subtle gradient overlay at bottom for badge contrast */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </Link>

        {/* Floating Category Badge */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <span className="inline-block bg-zinc-950/85 backdrop-blur-md text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#deb06c] px-3 py-1 rounded-full shadow-sm border border-white/10">
            {categoryBadge}
          </span>
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
        <div>
          {/* Title */}
          <h3 className="font-serif font-bold text-lg sm:text-[19px] text-white group-hover:text-[#deb06c] leading-snug line-clamp-2 transition-colors mb-2.5">
            <Link href={linkHref} className="hover:underline">
              {blog.title}
            </Link>
          </h3>

          {/* Description / Excerpt */}
          <p className="text-zinc-400 text-xs sm:text-[13.5px] leading-relaxed line-clamp-3 mb-6">
            {cleanDesc}
          </p>
        </div>

        {/* Bottom Meta Row: Date, Read Time & Read More */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 mt-auto">
          {/* Published Date & Read Time */}
          <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>{formattedDate}</span>
            </div>
            {blog.readTime && (
              <div className="hidden sm:flex items-center gap-1 text-zinc-500 text-[11px]">
                <Clock className="w-3 h-3 text-zinc-500 shrink-0" />
                <span>{blog.readTime}</span>
              </div>
            )}
          </div>

          {/* Read More Link */}
          <Link
            href={linkHref}
            className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-bold text-[#deb06c] group-hover:text-white transition-colors"
          >
            <span>Read More</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
