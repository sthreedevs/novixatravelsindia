"use client";

import React from "react";
import Image from "next/image";

export default function PassportWhyChoose({ data }) {
  return (
    <section className="relative w-full overflow-hidden min-h-[260px] sm:min-h-[280px] lg:min-h-[300px] flex items-center py-7 sm:py-8 lg:py-9">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.bgImage}
          alt="Why Choose Novixa Passport Services"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Navy Left Vignette strictly on left 50% so traveler and runway on right are bright and clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061224] via-[#07172f]/95 via-35% to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Text & Badges */}
          <div className="max-w-xl space-y-2">
            <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {data.tag || "WHY CHOOSE NOVIXA"}
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-[1.15] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {data.title || "Your Trusted Partner in Passport Services"}
            </h2>

            <p className="text-zinc-200 text-xs sm:text-[13px] leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] max-w-lg">
              {data.description ||
                "With years of travel expertise and a dedicated support team, we make your passport process quick, easy and reliable."}
            </p>

            {/* 4 Feature Badges in 2x2 Grid on Mobile, Single Row on Desktop */}
            <div className="pt-3 grid grid-cols-2 lg:flex lg:flex-nowrap items-center gap-x-4 sm:gap-x-6 gap-y-3 lg:gap-7">
              {data.badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="text-[#deb06c] shrink-0 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
                    {badge.icon}
                  </div>
                  <span className="text-white text-xs sm:text-[13px] font-medium leading-tight sm:whitespace-nowrap drop-shadow-sm">
                    {badge.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Floating Handwritten Script Flourish */}
          <div className="hidden lg:flex flex-col items-end justify-center pr-4 xl:pr-10 pointer-events-none">
            <div className="font-handwriting text-3xl xl:text-4xl text-white tracking-wide leading-tight text-right drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-end gap-1.5">
                <span>Your Passport</span>
                <span className="text-[#deb06c] text-2xl">♡</span>
              </div>
              <div className="text-white flex items-center justify-end gap-1.5 mt-0.5">
                <span className="text-[#deb06c]">Our Priority</span>
                <span className="text-lg">✈</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
