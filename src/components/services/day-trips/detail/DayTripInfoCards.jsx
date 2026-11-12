"use client";

import React from "react";
import { Check, X, Info } from "lucide-react";

export default function DayTripInfoCards({
  inclusions = [],
  exclusions = [],
  knowBeforeYouGo = [],
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-4 border-t border-stone-200">
      {/* 1. What's Included */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-stone-100">
            <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h4 className="text-base font-bold text-stone-900 font-serif">
              What&apos;s Included
            </h4>
          </div>

          <ul className="space-y-2.5">
            {inclusions.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-[13px] text-stone-600 leading-snug"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. Not Included */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-stone-100">
            <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
              <X className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h4 className="text-base font-bold text-stone-900 font-serif">
              Not Included
            </h4>
          </div>

          <ul className="space-y-2.5">
            {exclusions.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-[13px] text-stone-600 leading-snug"
              >
                <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Know Before You Go */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-stone-100">
            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h4 className="text-base font-bold text-stone-900 font-serif">
              Know Before You Go
            </h4>
          </div>

          <ul className="space-y-2.5">
            {knowBeforeYouGo.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-[13px] text-stone-600 leading-snug"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
