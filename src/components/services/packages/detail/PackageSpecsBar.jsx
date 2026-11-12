"use client";

import React from "react";
import { MapPin, Calendar, Users, Star } from "lucide-react";

export default function PackageSpecsBar({ specs }) {
  if (!specs) return null;

  const { destination, duration, bestFor, packageType } = specs;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl lg:rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-zinc-200/90 py-3.5 px-6 sm:px-8 relative z-30">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 items-center">
        {/* 1. Destination */}
        <div className="flex items-center gap-3 lg:px-4">
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 text-[#9e6714]">
            <MapPin className="w-4 h-4 text-[#9e6714]" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Destination
            </div>
            <div className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
              {destination}
            </div>
          </div>
        </div>

        {/* 2. Duration */}
        <div className="flex items-center gap-3 lg:px-4 lg:border-l lg:border-zinc-200/80">
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 text-[#9e6714]">
            <Calendar className="w-4 h-4 text-[#9e6714]" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Duration
            </div>
            <div className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
              {duration}
            </div>
          </div>
        </div>

        {/* 3. Best For */}
        <div className="flex items-center gap-3 lg:px-4 lg:border-l lg:border-zinc-200/80">
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 text-[#9e6714]">
            <Users className="w-4 h-4 text-[#9e6714]" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Best For
            </div>
            <div className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
              {bestFor}
            </div>
          </div>
        </div>

        {/* 4. Package Type */}
        <div className="flex items-center gap-3 lg:px-4 lg:border-l lg:border-zinc-200/80">
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 text-[#9e6714]">
            <Star className="w-4 h-4 text-[#9e6714] fill-[#9e6714]/20" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Package Type
            </div>
            <div className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
              {packageType}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

