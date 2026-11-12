"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plane, Building, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import PackageSpecsBar from "./PackageSpecsBar";

export default function PackageDetailHero({ packageData, onOpenQuote }) {
  const {
    tag,
    title,
    titleHighlight,
    subtitle,
    heroImage,
    specs,
  } = packageData;

  return (
    <section className="relative w-full overflow-visible pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 xl:pt-40 xl:pb-28 min-h-[560px] sm:min-h-[600px] lg:min-h-[640px] flex flex-col justify-between">
      {/* Background Image & Non-intrusive Vignettes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={heroImage || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332952/backgrounds/hotelsHero.png"}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Soft dark vignette on left so white text is crystal clear */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[58%] bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none" />

        {/* Top subtle navbar shadow */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/75 to-transparent pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10 flex-1 flex items-center">
        <div className="max-w-2xl space-y-4">
          {/* Eyebrow Tag */}
          {tag && (
            <div className="inline-block">
              <span className="text-white text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                {tag}
              </span>
            </div>
          )}

          {/* Heading with Cursive Flourish */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-normal text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            <span
              className="block font-bold"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {title}
            </span>
            {titleHighlight && (
              <span
                className="block text-[#deb06c] text-2xl sm:text-3xl lg:text-4xl font-normal mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
              >
                {titleHighlight}
              </span>
            )}
          </h1>

          {/* Subtitle / Description */}
          {subtitle && (
            <p className="text-zinc-200/90 text-sm sm:text-base leading-relaxed max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
              {subtitle}
            </p>
          )}

          {/* 4 Feature Badges Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 pb-2 text-xs sm:text-sm text-zinc-100 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#deb06c] shrink-0 rotate-[-20deg]" />
              <span>Flights Included</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-[#deb06c] shrink-0" />
              <span>Luxury Resorts (4★ / 5★ Options)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#deb06c] shrink-0" />
              <span>Travel Insurance Optional</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#deb06c] shrink-0 fill-[#deb06c]/20" />
              <span>Customizable Itinerary</span>
            </div>
          </div>

          {/* Dual Action CTA Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center gap-2 bg-[#deb06c] hover:bg-[#d49e52] text-zinc-950 font-bold px-7 py-3 rounded-full text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-4 h-4 stroke-[2.4]" />
            </button>

            <Link
              href="/services/packages"
              className="inline-flex items-center justify-center gap-1.5 border border-white/50 hover:border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full text-xs sm:text-sm transition-all duration-200 shadow-md backdrop-blur-sm"
            >
              <span>View All Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Floating 4-Column Key Specs Bar (Locked to exact bottom edge, 50% in hero, 50% in grid below) */}
      <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-30 px-4 sm:px-6 lg:px-10 xl:px-14">
        <PackageSpecsBar specs={specs} />
      </div>
    </section>
  );
}

