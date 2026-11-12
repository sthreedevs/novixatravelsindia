"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

export default function SingleBlogHeroSection({ blog }) {
  if (!blog) return null;

  const bgImage = blog.thumbnail || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332946/backgrounds/dayTripHero.png";

  // Dynamic Formatted Date
  let formattedDate = "Recent Article";
  if (blog.createdAt) {
    try {
      const d = new Date(blog.createdAt);
      formattedDate = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (_) {}
  }

  // Primary Tag
  const primaryTag =
    Array.isArray(blog.tags) && blog.tags.length > 0
      ? blog.tags[0]
      : "Travel Guide";

  // Dynamic Subtitle / Excerpt (first content section intro if present)
  const excerpt =
    blog.description ||
    (Array.isArray(blog.content) && blog.content[0]?.description
      ? blog.content[0].description.slice(0, 200).trim() + "..."
      : "Discover comprehensive insights, local tips, and curated recommendations from our destination experts.");

  // Clean author name
  const authorName = blog.author || "Novixa Travels India";
  const authorInitial = authorName.charAt(0).toUpperCase();

  return (
    <section className="relative w-full overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 xl:pt-40 xl:pb-28 min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex items-center text-white">
      {/* 1. Panoramic Background Image & Signature Vignette Overlays (Matching ServiceHeroShell) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={blog.title || "Blog cover"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft dark vignette on left so white text is crystal clear */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[62%] bg-gradient-to-r from-[#07080c]/95 via-[#07080c]/80 via-45% to-transparent pointer-events-none" />
        {/* Top subtle navbar shadow */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07080c]/85 via-[#07080c]/40 to-transparent pointer-events-none" />
        {/* Bottom subtle blend into background */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#07080c] to-transparent pointer-events-none" />
      </div>

      {/* 2. Main Content Container (Aligned with Site Navbar: px-4 sm:px-6 lg:px-10 xl:px-14) */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-10">
          {/* Left Column: Headlines & Copy (Exact Service Hero Style) */}
          <div className="max-w-3xl space-y-4 sm:space-y-5 relative">
            {/* Ambient cloud glow behind text */}
            <div className="absolute -inset-6 -z-10 bg-gradient-to-r from-slate-950/60 via-slate-950/25 to-transparent rounded-3xl blur-2xl pointer-events-none" />

            {/* Back Button */}
            <div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs sm:text-sm font-medium text-white/90 hover:text-white backdrop-blur-md transition-all shadow-md group"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#deb06c] group-hover:-translate-x-1 transition-transform" />
                <span>Back to Blogs</span>
              </Link>
            </div>

            {/* Category Tag */}
            <div className="text-[#deb06c] text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              {primaryTag}
            </div>

            {/* Headline (Matching ServiceHeroShell font & styling) */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[60px] font-bold text-white tracking-tight leading-[1.08] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {blog.title}
            </h1>

            {/* Subtitle / Excerpt */}
            {excerpt && (
              <p className="text-white/95 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-2xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] pt-1">
                {excerpt}
              </p>
            )}

            {/* Bottom Meta Bar (Date, Read Time, and Author Pill placed together) */}
            <div className="pt-5 border-t border-white/15 flex flex-wrap items-center gap-3.5 sm:gap-5 text-xs sm:text-sm text-zinc-300">
              {/* Published Date */}
              <span className="inline-flex items-center gap-1.5 text-zinc-300/90 font-medium">
                <Calendar className="w-4 h-4 text-[#deb06c]" />
                <span>{formattedDate}</span>
              </span>

              {/* Read Time */}
              {blog.readTime && (
                <span className="inline-flex items-center gap-1.5 text-zinc-300/90 font-medium">
                  <Clock className="w-4 h-4 text-[#deb06c]" />
                  <span>{blog.readTime.toLowerCase().includes("min") ? blog.readTime : `${blog.readTime} min read`}</span>
                </span>
              )}

              {/* Author Pill - Next to Read Time */}
              <div className="flex items-center gap-3 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 w-fit shadow-xs">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#deb06c] to-[#9c753b] text-black font-bold text-xs flex items-center justify-center shrink-0 shadow-inner">
                  {authorInitial}
                </div>
                <div className="text-left leading-tight pr-1">
                  <p className="text-xs sm:text-[13px] font-semibold text-white tracking-wide">
                    {authorName}
                  </p>
                  <p className="text-[10px] text-[#deb06c] font-medium">
                    Travel Advisory &amp; Destination Expert
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Handwritten Script Flourish (Matching ServiceHeroShell & EuropeRailHero) */}
          <div
            className="hidden lg:flex flex-col items-end pr-2 xl:pr-6 select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] -rotate-3 text-right"
            style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
          >
            <div className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] text-white leading-tight font-normal">
              <div>Travel Guide</div>
              <div className="text-[#deb06c]">Curated for You ♡</div>
            </div>
            {/* Playful cursive underline */}
            <svg
              className="w-40 sm:w-48 h-3 text-[#deb06c] mt-1"
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 9C50 3 150 2 198 8M120 7C140 10 160 11 180 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
