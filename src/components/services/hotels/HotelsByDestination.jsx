"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { MapPin, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { popularHotelDestinations } from "@/data/services/hotels.data";

export default function HotelsByDestination({ onSelectDestination }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 260;
      scrollContainerRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-[#07080c] text-white py-14 sm:py-16 lg:py-20 border-b border-white/5">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
          {/* Left Text Column */}
          <div className="w-full lg:w-[28%] xl:w-[26%] shrink-0 space-y-4">
            <span className="text-[#deb06c] text-xs font-semibold tracking-[0.25em] uppercase block">
              Popular Destinations
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Hotels by Destination
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Explore handpicked hotels in the world&apos;s most sought-after
              destinations.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="#hotel-quote-form"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-xs font-semibold hover:border-[#deb06c] hover:text-[#deb06c] hover:bg-white/5 transition-all shadow-sm group"
              >
                <span>View All Destinations</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Mobile scroll buttons */}
              <div className="flex lg:hidden items-center gap-1.5 ml-auto">
                <button
                  type="button"
                  onClick={() => scroll("prev")}
                  aria-label="Previous destination"
                  className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("next")}
                  aria-label="Next destination"
                  className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Cards Slider / Row */}
          <div className="w-full lg:w-[72%] xl:w-[74%] min-w-0">
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-3.5 sm:gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory"
            >
              {popularHotelDestinations.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => {
                    if (onSelectDestination) {
                      onSelectDestination(dest.name);
                    }
                    const formElement = document.getElementById("hotel-quote-form");
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="group relative w-[170px] sm:w-[195px] lg:w-[190px] xl:w-[205px] h-[270px] sm:h-[295px] lg:h-[310px] rounded-2xl overflow-hidden shrink-0 snap-start cursor-pointer border border-white/10 hover:border-[#deb06c]/50 shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 640px) 170px, 210px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-black/40 to-transparent pointer-events-none" />

                  {/* Content pinned to bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 text-white z-10">
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#deb06c] shrink-0" />
                      <h3 className="font-bold text-sm sm:text-base tracking-tight leading-none group-hover:text-[#deb06c] transition-colors">
                        {dest.name}
                      </h3>
                    </div>
                    <p className="text-white/80 text-[11px] leading-tight line-clamp-2">
                      {dest.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
