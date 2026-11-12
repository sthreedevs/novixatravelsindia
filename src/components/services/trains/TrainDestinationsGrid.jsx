"use client";

import React from "react";
import Image from "next/image";

export default function TrainDestinationsGrid({
  destinations = [],
  onSelectDestination,
}) {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#07080c] text-white">
      <div className="w-full px-4 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-8 sm:mb-10 lg:mb-12 text-left">
          <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase block mb-1.5">
            POPULAR DESTINATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            Must-Visit by Train
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
            Experience India&apos;s rich culture, diverse landscapes and iconic destinations by train.
          </p>
        </div>

        {/* 6 Destination Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination && onSelectDestination(dest.city)}
              className="group cursor-pointer flex flex-col transition-all duration-300"
            >
              {/* Image Card */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-2.5 border border-zinc-800/80 group-hover:border-[#deb06c] transition-colors shadow-md">
                <Image
                  src={dest.image}
                  alt={dest.city}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* City Title & Description */}
              <div className="text-left px-1">
                <h3 className="font-serif font-bold text-sm sm:text-base text-white tracking-tight group-hover:text-[#deb06c] transition-colors">
                  {dest.city}
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-tight">
                  {dest.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
