"use client";

import React from "react";
import { dayTripsWhyChooseData } from "@/data/services/day-trips.data";

export default function DayTripsWhyChooseSection() {
  const { tag, title, subtitle, pillars } = dayTripsWhyChooseData;

  return (
    <section className="relative w-full bg-[#0c0e15] border-y border-zinc-800/80 py-12 sm:py-16 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 xl:gap-12">
        {/* Left Column: Heading & Subtitle */}
        <div className="w-full xl:w-[35%] shrink-0 space-y-2">
          {tag && (
            <span className="text-[#deb06c] text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase block">
              {tag}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-white tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed max-w-md">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Column: 5 Pillars with Gold Circular Medals */}
        <div className="w-full xl:w-[65%] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800/80 pt-2 xl:pt-0">
          {pillars.map((item, idx) => (
            <div
              key={item.id}
              className={`flex flex-col items-start sm:items-center text-left sm:text-center ${
                idx !== 0 ? "sm:pl-4 lg:pl-5" : ""
              } pt-3 sm:pt-0`}
            >
              {/* Metallic Gold Medal */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] flex items-center justify-center shrink-0 shadow-md mb-2.5 sm:mb-3">
                {item.icon}
              </div>

              {/* Title & Subtitle */}
              <div className="text-xs sm:text-[13px] font-semibold text-white leading-tight">
                <div>{item.title}</div>
                <div className="text-zinc-400 font-normal">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
