"use client";

import React from "react";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { dayTripsBottomCtaData } from "@/data/services/day-trips.data";

export default function DayTripsBottomCta({ onBrowseAll }) {
  const {
    title,
    description,
    buttonText,
    scriptLine1,
    scriptLine2,
    scriptSuffix,
    bgImage,
  } = dayTripsBottomCtaData;

  const handleAction = () => {
    if (onBrowseAll) {
      onBrowseAll();
    } else {
      const el = document.getElementById("popular-day-trips");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#07080c] py-14 sm:py-16 border-t border-zinc-800/80">
      {/* Background Image & Vignette */}
      {bgImage && (
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <Image
            src={bgImage}
            alt="Ready for Day Trip"
            fill
            sizes="100vw"
            className="object-cover object-center"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080c] via-[#07080c]/80 to-[#07080c] pointer-events-none" />
        </div>
      )}

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
        {/* Left Column: Calendar Icon + Title + Description */}
        <div className="flex items-center gap-4 sm:gap-5 w-full lg:w-[45%]">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#deb06c]/15 border border-[#deb06c]/30 flex items-center justify-center text-[#deb06c] shrink-0 shadow-inner">
            <Calendar className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-[26px] font-serif font-bold text-white tracking-tight leading-tight">
              {title}
            </h3>
            {description && (
              <p className="text-xs sm:text-[13px] text-zinc-300/90 leading-relaxed mt-1 max-w-md">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Center: Cursive Flourish */}
        <div className="hidden lg:flex flex-col items-center justify-center text-center px-4">
          <div
            className="font-handwriting text-2xl xl:text-3xl text-white tracking-wide leading-tight -rotate-2"
            style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
          >
            <div>{scriptLine1}</div>
            <div className="text-[#deb06c]">
              <span>{scriptLine2}</span>
              {scriptSuffix && <span className="ml-1 text-white font-normal">{scriptSuffix}</span>}
            </div>
          </div>
        </div>

        {/* Right Column: Browse All Day Trips Button */}
        <div className="w-full lg:w-auto flex justify-start lg:justify-end shrink-0">
          <button
            type="button"
            onClick={handleAction}
            className="w-full sm:w-auto h-12 px-7 rounded-full bg-gradient-to-r from-[#e5b869] via-[#deb06c] to-[#c7984a] hover:brightness-105 active:scale-[0.98] text-zinc-950 font-bold text-xs sm:text-sm tracking-wide shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
