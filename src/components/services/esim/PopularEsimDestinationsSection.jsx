"use client";

import React from "react";
import Image from "next/image";
import { esimDestinationsData } from "@/data/services/esim.data";

export default function PopularEsimDestinationsSection({ onSelectDestination }) {
  const { eyebrow, title, description, bgImage, scriptTop, scriptBottom, cards } =
    esimDestinationsData;

  return (
    <section className="relative w-full bg-[#07080c] py-10 sm:py-12 lg:py-14 overflow-hidden">
      {/* Background World Map Texture */}
      {bgImage && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={bgImage}
            alt="Global Network Map"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07080c] via-[#07080c]/50 to-[#07080c] pointer-events-none" />
        </div>
      )}

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          {/* Left Title & Subtitle */}
          <div className="space-y-2 max-w-2xl">
            {eyebrow && (
              <div className="text-[#deb06c] text-xs font-semibold tracking-[0.2em] uppercase">
                {eyebrow}
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white font-serif tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          {/* Right Cursive Flourish */}
          <div className="text-left md:text-right shrink-0">
            <div
              className="font-handwriting text-2xl sm:text-3xl lg:text-[34px] text-white tracking-wide leading-tight inline-block"
              style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
            >
              <div>{scriptTop}</div>
              <div className="flex items-center gap-2 justify-start md:justify-end text-[#deb06c]">
                <span>{scriptBottom}</span>
                {/* Airplane doodle icon */}
                <svg
                  className="w-5 h-5 text-white/90 -rotate-12"
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

        {/* 6 Destination Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-stretch">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group bg-[#0c0e15] border border-zinc-800/90 hover:border-[#deb06c]/60 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#deb06c]/5"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
                  <Image
                    src={card.image}
                    alt={card.destination}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e15]/70 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="pt-2.5 space-y-0.5">
                  <h3 className="text-white font-bold text-sm sm:text-[15px] leading-tight font-sans group-hover:text-[#deb06c] transition-colors">
                    {card.destination}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-sky-400 font-semibold tracking-tight">
                    {card.specs}
                  </p>
                  <div className="pt-1 flex items-baseline gap-1">
                    <span className="text-[11px] text-zinc-400">
                      {card.pricePrefix}
                    </span>
                    <span className="text-white font-bold text-sm sm:text-[15px]">
                      {card.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* View Plans Button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => onSelectDestination && onSelectDestination(card)}
                  className="w-full py-1.5 px-3 rounded-full border border-zinc-700/80 bg-zinc-900/60 text-zinc-200 text-[11px] sm:text-xs font-semibold text-center hover:bg-gradient-to-r hover:from-[#deb06c] hover:via-[#d49e52] hover:to-[#c28f46] hover:text-zinc-950 hover:border-[#deb06c] transition-all duration-300 shadow-sm cursor-pointer"
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
