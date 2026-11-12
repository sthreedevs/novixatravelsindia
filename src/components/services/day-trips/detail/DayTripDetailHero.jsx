"use client";

import React from "react";
import Image from "next/image";
import { Car, Users, Calendar, Settings, Star, ArrowRight } from "lucide-react";

export default function DayTripDetailHero({ trip, onEnquireClick }) {
  if (!trip) return null;

  const bgImage = trip.heroImage || trip.thumbnail || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332946/backgrounds/dayTripHero.png";

  const badges = [
    {
      icon: <Car className="w-5 h-5 sm:w-6 sm:h-6 text-[#deb06c] stroke-[1.8] shrink-0" />,
      line1: "Private AC",
      line2: "Transport",
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#deb06c] stroke-[1.8] shrink-0" />,
      line1: "Local Expert",
      line2: "Guide",
    },
    {
      icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#deb06c] stroke-[1.8] shrink-0" />,
      line1: "Flexible",
      line2: "Pickup",
    },
    {
      icon: <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-[#deb06c] stroke-[1.8] shrink-0" />,
      line1: "Customizable",
      line2: "Experience",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex items-center text-white">
      {/* 1. Background Image with Elegant Vignette Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={trip.title || "Day Trip"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle Dark Left Shadow for High Text Readability */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[62%] bg-gradient-to-r from-black/90 via-black/65 via-45% to-transparent pointer-events-none" />
        {/* Top Navbar Shadow */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        {/* Bottom subtle shadow blending into the specs bar */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      {/* 2. Main Content Aligned to Navbar Boundaries (px-4 sm:px-6 lg:px-10 xl:px-14) */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        <div className="max-w-2xl xl:max-w-3xl space-y-4 sm:space-y-5">
          {/* Headline: Serif Bold */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-serif font-bold text-white tracking-tight leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            {trip.title}
          </h1>

          {/* Subtitle / Flourish: Golden Cursive Script */}
          {trip.tagline && (
            <p
              className="font-handwriting text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] text-[#deb06c] font-normal leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
            >
              {trip.tagline}
            </p>
          )}

          {/* Description Paragraph */}
          {trip.description && (
            <p className="text-stone-200/95 text-sm sm:text-base leading-relaxed max-w-xl lg:max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] pt-1">
              {trip.description}
            </p>
          )}

          {/* 4 Feature Badges with Vertical Dividers (2x2 Grid on Mobile, Row on Desktop) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 pt-3 sm:pt-4">
            {badges.map((badge, idx) => (
              <div key={idx} className="flex items-center">
                <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 pr-2 sm:pr-6 lg:pr-8">
                  {badge.icon}
                  <div className="text-white text-xs sm:text-[13px] leading-tight font-medium">
                    <div>{badge.line1}</div>
                    <div>{badge.line2}</div>
                  </div>
                </div>
                {/* Subtle vertical divider between badges except the last */}
                {idx < badges.length - 1 && (
                  <div className="h-7 w-px bg-white/20 mr-4 sm:mr-6 lg:mr-8 hidden sm:block" />
                )}
              </div>
            ))}
          </div>

          {/* Guest Experience Rating (Stars + 4.9/5 Guest Experience) */}
          <div className="flex items-center gap-2 pt-2">
            <div className="flex items-center gap-0.5 text-[#deb06c]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#deb06c] text-[#deb06c]"
                />
              ))}
            </div>
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide drop-shadow-sm">
              {trip.rating || "4.9/5"} {trip.ratingCount || "Guest Experience"}
            </span>
          </div>

          {/* Single Enquire Button */}
          <div className="pt-2 sm:pt-3">
            <button
              type="button"
              onClick={onEnquireClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-3 rounded-full bg-gradient-to-r from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 font-bold text-sm shadow-lg shadow-black/30 hover:shadow-[#deb06c]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <span>Enquire About This Trip</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
