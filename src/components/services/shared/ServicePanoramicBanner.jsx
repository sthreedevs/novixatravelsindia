"use client";

import React from "react";
import Image from "next/image";

export default function ServicePanoramicBanner({
  tag = "WHY CHOOSE NOVIXA",
  title,
  description,
  bgImage,
  bgImageAlt = "Panoramic Banner Background",
  bgPositionClass = "object-[70%_center] lg:object-center",
  pillars = [],
  scriptNote,
  className = "",
}) {
  return (
    <section className={`relative w-full overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-14 md:pt-20 md:pb-14 ${className || "mt-10 md:mt-14 mb-0"} border-y border-white/10`}>
      {/* Full-width Background Image edge-to-edge */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt={bgImageAlt}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${bgPositionClass}`}
          />
        </div>
      )}

      {/* Smooth dark oceanic navy gradient on the left half for crystal-clear readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#031326] via-[#051c38]/95 via-35% md:via-40% to-transparent pointer-events-none" />

      {/* Inner Content Container: Aligned to bottom (items-end) */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
        {/* Left Column: Heading & Description */}
        <div className="shrink-0 max-w-sm lg:max-w-md">
          {tag && (
            <span className="text-[11px] sm:text-xs font-semibold text-[#deb06c] tracking-[0.22em] uppercase block mb-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
              {tag}
            </span>
          )}
          {title && (
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-serif font-bold text-white tracking-tight leading-tight mb-2.5 whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-xs sm:text-[13px] text-zinc-200/90 leading-relaxed max-w-[360px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              {description}
            </p>
          )}

          {scriptNote && (
            <div className="pt-2 font-handwriting text-xl text-[#deb06c]">
              {scriptNote}
            </div>
          )}
        </div>

        {/* Right Column: Inline Pillars aligned to bottom (items-end) */}
        {pillars && pillars.length > 0 && (
          <div className="flex-1 max-w-3xl xl:max-w-4xl grid grid-cols-2 sm:grid-cols-4 items-end sm:divide-x sm:divide-white/20 lg:ml-8 xl:ml-12 lg:self-end pb-0.5">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start justify-end px-3 sm:px-5 lg:px-7 py-1"
              >
                <div className="mb-2.5 sm:mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
                  {pillar.icon}
                </div>
                <div className="text-xs sm:text-[13px] font-semibold text-white leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                  <span>{pillar.line1}</span>
                  <br />
                  <span>{pillar.line2}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
