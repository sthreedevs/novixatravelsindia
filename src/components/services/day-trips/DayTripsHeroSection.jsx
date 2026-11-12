"use client";

import React from "react";
import ServiceHeroShell from "@/components/services/shared/ServiceHeroShell";
import { dayTripsHeroData } from "@/data/services/day-trips.data";

export default function DayTripsHeroSection() {
  return (
    <ServiceHeroShell
      {...dayTripsHeroData}
      scriptNote={dayTripsHeroData.scriptNotes?.[0] || "Small Trips"}
      scriptSuffix="Big Memories ♡"
    >
      {/* Right Column: Cursive Sky Flourish with Airplane Doodle */}
      <div className="w-full flex justify-center lg:justify-end">
        <div className="text-left lg:text-right inline-block">
          <div
            className="font-handwriting text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-white tracking-wide space-y-0.5 leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
          >
            <div>Small Trips</div>
            <div className="flex items-center gap-2 text-[#deb06c] justify-start lg:justify-end">
              <span>Big Memories ♡</span>
              <svg
                className="w-5 h-5 text-white/90 -rotate-12 inline-block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </ServiceHeroShell>
  );
}
