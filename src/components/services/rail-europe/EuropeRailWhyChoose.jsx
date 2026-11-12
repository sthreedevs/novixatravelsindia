"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function EuropeRailWhyChoose({ data, onCtaClick }) {
  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-16 lg:py-20 bg-[#07080c] text-white">
      {/* Background Image - High Clarity & Visibility */}
      {data?.bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.bgImage}
            alt="Why Choose Novixa for Europe Rail"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center opacity-95"
          />
          {/* Subtle Left-Only Shadow for Text Legibility while keeping Center & Right Window fully clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#040814]/95 via-[#040814]/75 via-35% md:via-30% to-transparent pointer-events-none" />
          {/* Subtle top & bottom edges to seamlessly blend with page */}
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#07080c] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#07080c] to-transparent pointer-events-none" />
        </div>
      )}

      <div className="w-full px-4 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Heading, Description & Action Button */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center">
            {data?.tag && (
              <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase block mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                {data.tag}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              {data?.title || "Why Choose Novixa for Europe Rail?"}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] max-w-md">
              {data?.description}
            </p>

            <div>
              <button
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 py-2 px-5 rounded-full border border-[#deb06c] text-[#deb06c] hover:bg-[#deb06c] hover:text-zinc-950 font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-md group"
              >
                <span>Why Travel with Us</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: 5 Features in 3Xn grid on mobile, 5 cols on desktop */}
          <div className="lg:col-span-8 xl:col-span-8 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-x-2 sm:gap-x-4 lg:gap-x-3 gap-y-4 sm:gap-y-5 items-start">
            {data?.features?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center group py-1 sm:py-2"
              >
                {/* Circular Gold Outline Icon */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-[#deb06c] flex items-center justify-center bg-black/40 backdrop-blur-xs mb-1.5 sm:mb-2.5 group-hover:scale-105 transition-transform shadow-md shrink-0 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
                  {item.icon}
                </div>
                <h3 className="font-serif font-bold text-[11px] sm:text-xs md:text-sm text-white tracking-tight leading-snug mb-0.5 sm:mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {item.title}
                </h3>
                <p className="text-[9.5px] sm:text-[10.5px] md:text-[11px] text-zinc-300 leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
