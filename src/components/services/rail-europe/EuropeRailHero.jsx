"use client";

import React from "react";
import Image from "next/image";

export default function EuropeRailHero({ data }) {
  return (
    <section className="relative w-full overflow-hidden min-h-[520px] lg:min-h-[580px] xl:min-h-[620px] flex items-center pt-24 pb-12 sm:pb-16 text-white">
      {/* 1. Background Image - Full Panoramic Red European Train */}
      {data?.bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.bgImage}
            alt="Europe Rail Travel"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle Left Shadow for Text Legibility while keeping Mountains, Train & Lake 100% visible */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[58%] bg-gradient-to-r from-black/85 via-black/55 to-transparent pointer-events-none" />
          {/* Subtle top navbar shadow */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/75 to-transparent pointer-events-none" />
          {/* Subtle bottom shadow */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>
      )}

      {/* 2. Top-Right Handwriting Flourish (Positioned aligned to right: px-4 lg:px-10) */}
      <div
        className="absolute top-20 sm:top-24 lg:top-28 right-3 sm:right-6 lg:right-10 z-20 text-right select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] -rotate-3"
        style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
      >
        <div className="text-[13px] sm:text-xl md:text-2xl lg:text-[34px] text-white leading-[1.15] sm:leading-tight font-normal">
          <div>One Pass</div>
          <div>Many Countries</div>
          <div>Countless Memories ♡</div>
        </div>
        {/* Playful cursive arrow/plane underline */}
        <div className="flex justify-end mt-0.5 sm:mt-1 text-white/90">
          <svg className="w-20 sm:w-28 md:w-36 lg:w-40 h-2.5 sm:h-3.5 lg:h-4" viewBox="0 0 150 16" fill="none">
            <path
              d="M4 10C40 4 90 4 145 9M125 5L146 9L130 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* 3. Hero Content (Headline, Description, Single-Row 5 Badges - Aligned to Navbar px-4 lg:px-10) */}
      <div className="w-full px-4 lg:px-10 relative z-10">
        <div className="max-w-2xl">
          {/* Tag */}
          <span className="text-[#deb06c] text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase block mb-2 drop-shadow-sm">
            {data?.tag || "EUROPE RAIL TRAVEL"}
          </span>

          {/* Headline */}
          <h1 className="tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            <span className="font-serif font-bold text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] text-white block leading-[1.05]">
              {data?.title || "Explore Europe"}
            </span>
            <span
              className="font-handwriting font-normal text-[#deb06c] text-5xl sm:text-6xl lg:text-[72px] xl:text-[80px] block -mt-1 sm:-mt-2"
              style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
            >
              {data?.titleHighlight || "by Train"}
            </span>
          </h1>

          {/* Bold Sub-headline */}
          <p className="text-white font-semibold text-sm sm:text-base tracking-wide mt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Scenic routes. Iconic cities. Unforgettable journeys.
          </p>

          {/* Description */}
          <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed max-w-xl mt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {data?.description ||
              "Hop on to a European adventure with our expertly planned rail journeys. From charming towns to world-famous cities, experience Europe at a slower, more beautiful pace — by train."}
          </p>

          {/* 4. Single Horizontal Row of 5 Badges (along bottom left) */}
          {data?.badges && data.badges.length > 0 && (
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 sm:gap-4 lg:gap-5 mt-7 pt-1">
              {data.badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-black/45 border border-[#deb06c]/70 flex items-center justify-center text-[#deb06c] shrink-0 shadow-sm backdrop-blur-xs">
                    {badge.icon}
                  </div>
                  <div className="text-white text-[11px] leading-tight font-medium drop-shadow-sm">
                    <div>{badge.line1}</div>
                    <div className="text-zinc-300">{badge.line2}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
