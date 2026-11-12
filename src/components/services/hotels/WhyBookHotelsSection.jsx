"use client";

import React from "react";
import Image from "next/image";
import { whyBookNovixaData } from "@/data/services/hotels.data";

export default function WhyBookHotelsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white text-zinc-900 border-y border-zinc-200 py-6 sm:py-8 lg:py-8">
      {/* Edge-to-Edge Panoramic Background: ctaHotel.png */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={whyBookNovixaData.bgImage}
          alt="Luxury hotel bedroom suite"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        {/* Left white gradient to create clean, luminous backdrop for text and 5 feature items */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[60%] xl:w-[58%] bg-gradient-to-r from-white via-white/98 via-75% to-transparent" />
      </div>

      {/* Handwriting Script Flourish positioned precisely in the upper-left soft wall area matching design */}
      <div className="hidden lg:block absolute left-[43%] sm:left-[44%] lg:left-[45%] xl:left-[46%] top-[8%] lg:top-[9%] xl:top-[10%] z-20 pointer-events-none transform -rotate-[10deg] select-none">
        <div
          className="font-handwriting text-xl lg:text-[24px] xl:text-[27px] text-[#1a2d42] font-semibold leading-[1.08] tracking-wide"
          style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
        >
          <div>Your Perfect Stay</div>
          <div className="flex items-center gap-1.5 pl-3">
            <span>Awaits</span>
            <span className="text-[#1a2d42] text-xl font-bold">♡</span>
          </div>
        </div>
        <svg
          className="w-28 lg:w-34 h-2 text-[#1a2d42] mt-0.5 opacity-85"
          viewBox="0 0 160 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 9C40 3 120 2 158 8M90 7C110 10 130 11 150 8"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Content Layout */}
      <div className="relative z-10 w-full px-4 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        {/* Left Column: Heading + 5 Features in 3Xn Grid */}
        <div className="w-full lg:w-[60%] xl:w-[58%] space-y-5">
          <div>
            <span className="text-[#b58838] text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase block mb-1">
              {whyBookNovixaData.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-zinc-950 tracking-tight leading-tight">
              {whyBookNovixaData.title}
            </h2>
            <p className="text-zinc-600 text-xs sm:text-[13px] leading-relaxed mt-1.5 max-w-xl">
              {whyBookNovixaData.subtitle}
            </p>
          </div>

          {/* 5 Feature Items in 3Xn Grid */}
          <div className="grid grid-cols-3 gap-x-2.5 sm:gap-x-4 md:gap-x-6 gap-y-4 sm:gap-y-5 pt-1">
            {whyBookNovixaData.features.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-start"
              >
                {/* Circular Metallic Gold Medal Badge with high contrast black icon */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] border border-[#d8a64a] flex items-center justify-center shadow-md mb-2 hover:scale-105 transition-transform shrink-0">
                  <div className="text-zinc-950 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] sm:text-xs md:text-[13px] font-bold text-zinc-950 leading-tight">
                    {feature.title}
                  </h4>
                  <p className="text-[9px] sm:text-[10px] md:text-[11px] text-zinc-500 leading-snug mt-0.5">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Mobile Image Only) */}
        <div className="w-full lg:hidden flex flex-col items-center">
          <div className="relative w-full h-[200px] rounded-2xl overflow-hidden mb-2 border border-zinc-200">
            <Image
              src={whyBookNovixaData.bgImage}
              alt="Luxury bedroom"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div
            className="font-handwriting text-2xl text-[#1a2d42] font-normal leading-tight tracking-wide transform -rotate-3"
            style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
          >
            Your Perfect Stay Awaits ♡
          </div>
        </div>
      </div>
    </section>
  );
}
