"use client";

import React from "react";
import Image from "next/image";
import { cruiseExperiencesData } from "@/data/services/cruise.data";

export default function CruiseExperiencesSection() {
  const { tag, title, subtitle, experiences } = cruiseExperiencesData;

  return (
    <section className="w-full bg-[#fbfaf6] text-zinc-900 py-10 sm:py-12 lg:py-14 border-b border-[#e7eaf0] overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Heading, Subtitle & 5 Horizontal Experience Circular Badges */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <div className="text-[#deb06c] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-1.5">
                {tag}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0c2340] tracking-tight leading-[1.14]">
                More Than a Vacation, <br className="hidden sm:inline" />
                It&apos;s an Experience
              </h2>
              <p className="text-[#285074] text-xs sm:text-[13px] leading-relaxed max-w-md mt-2">
                {subtitle}
              </p>
            </div>

            {/* 5 Horizontal Circular Badges in ONE LINE across all screens */}
            <div className="grid grid-cols-5 pt-3 sm:pt-4 max-w-full sm:max-w-xl">
              {experiences.map((item, idx) => (
                <div
                  key={item.id}
                  className={`flex flex-col items-center text-center px-0.5 xs:px-1 sm:px-2.5 lg:px-3 ${
                    idx < experiences.length - 1 ? "border-r border-zinc-200" : ""
                  }`}
                >
                  <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#faeede] flex items-center justify-center mb-1.5 sm:mb-2 text-[#0c2340] shrink-0 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
                    {item.icon}
                  </div>
                  <span className="text-[#0c2340] text-[9px] xs:text-[10px] sm:text-[11px] lg:text-[11.5px] font-semibold leading-[1.15] sm:leading-tight text-center max-w-[65px] xs:max-w-[72px] sm:max-w-[85px]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Exact Tilted Polaroids Collage & Caveat Script Flourish Asset */}
          <div className="lg:col-span-6 relative flex items-center justify-end pt-4 sm:pt-0">
            <div className="relative w-full aspect-[1048/466] max-w-[560px] lg:max-w-[620px] ml-auto">
              <Image
                src="https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332938/backgrounds/cruiseExperiencesCollage.png"
                alt="Cruise Experiences Relax Explore Create Memories"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-right"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
