"use client";

import React from "react";
import Image from "next/image";

export default function BlogHeroSection() {
  return (
    <section className="relative w-full overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex items-center text-white">
      {/* 1. Panoramic Background Image with Vignette Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332946/backgrounds/dayTripHero.png"
          alt="Travel Blog Novixa Travels India"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark Left Vignette for Ultra Sharp Typography Readability */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[65%] bg-gradient-to-r from-black/90 via-black/65 via-50% to-transparent pointer-events-none" />
        {/* Top Navbar Shadow */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        {/* Bottom subtle shadow blending into dark page */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07080c] to-transparent pointer-events-none" />
      </div>

      {/* 2. Content Container Aligned to Navbar Boundaries */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left Column: Headline, Flourish & Description */}
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            {/* Tagline */}
            <span className="text-[#deb06c] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase block">
              TRAVEL BLOG
            </span>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              Travel Tips, Guides &amp;{" "}
              <span
                className="font-handwriting block sm:inline text-4xl sm:text-6xl lg:text-7xl text-[#deb06c] font-normal tracking-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
              >
                Inspiration
              </span>
            </h1>

            {/* Description */}
            <p className="text-stone-200/90 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] pt-1">
              Get expert travel tips, destination guides, visa updates, packing hacks and more.
              Plan smarter, travel better with Novixa Travels India.
            </p>
          </div>

          {/* Right Column: Hand-drawn Cursive Flourish Quote */}
          <div className="hidden md:flex flex-col items-end pr-4 lg:pr-8 select-none">
            <div
              className="text-right leading-tight -rotate-3 text-[#ffe7b8] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
            >
              <div className="text-3xl lg:text-4xl">Better</div>
              <div className="text-2xl lg:text-3xl text-white/95 pl-4">Tips</div>
              <div className="text-3xl lg:text-4xl text-[#deb06c]">Bigger</div>
              <div className="text-2xl lg:text-3xl text-white/95 flex items-center justify-end gap-1.5">
                <span>Journeys</span>
                <span className="text-xl">✈</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

