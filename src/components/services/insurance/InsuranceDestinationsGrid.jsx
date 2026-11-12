"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function InsuranceDestinationsGrid({
  destinations = [],
  onSelectDestination,
  onViewAllPlans,
}) {
  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-[#051426] text-white border-y border-white/5">
      <div className="w-full px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-8 xl:gap-10">
          {/* Left Column: Heading, Description & View All Plans button */}
          <div className="w-full lg:w-[27%] xl:w-[25%] flex flex-col justify-center shrink-0">
            <span className="text-[#deb06c] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase block mb-2">
              GLOBAL COVERAGE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-serif font-bold text-white tracking-tight leading-[1.15] mb-3">
              Insurance for Every Destination
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300/85 leading-relaxed mb-6 max-w-sm">
              From a quick weekend getaway to a long international trip, we&apos;ve got you covered — across the globe.
            </p>

            {onViewAllPlans && (
              <div>
                <button
                  onClick={onViewAllPlans}
                  className="inline-flex items-center gap-2 py-2.5 px-6 rounded-full border border-[#deb06c] text-[#deb06c] hover:bg-[#deb06c] hover:text-zinc-950 font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
                >
                  <span>View All Plans</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: 5 Portrait Cards in a Single Row */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                onClick={() => onSelectDestination && onSelectDestination(dest.title)}
                className="group relative rounded-2xl overflow-hidden h-[260px] sm:h-[280px] lg:h-[295px] xl:h-[310px] border border-white/20 hover:border-[#deb06c] transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-end p-3.5 sm:p-4"
              >
                {/* Background Image */}
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 15vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                {/* Bottom Content */}
                <div className="relative z-10">
                  {/* Circular Icon Badge */}
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-sm mb-2 group-hover:border-[#deb06c] transition-colors">
                    {dest.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-sm sm:text-[15px] text-white tracking-tight leading-snug group-hover:text-[#deb06c] transition-colors">
                    {dest.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-[11px] sm:text-xs text-zinc-300/80 font-normal mt-0.5 leading-tight">
                    {dest.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
