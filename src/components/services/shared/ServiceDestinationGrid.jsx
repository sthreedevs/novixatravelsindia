"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, ChevronLeft, MapPin } from "lucide-react";

export default function ServiceDestinationGrid({
  tag = "POPULAR DESTINATIONS",
  title = "Explore Top Routes",
  description = "From bustling cities to serene islands, find the best options for your favourite destinations.",
  viewAllLink = "/destination",
  viewAllText = "View All Destinations",
  items = [],
  onSelect,
  variant = "standard", // "standard" (side-by-side) or "carousel" (full-width top header + horizontal landscape slider)
}) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // =========================================================================
  // VARIANT: CAROUSEL (Design 1: Full-width top header + landscape card slider)
  // Matches reference design screenshot with landscape cards, pin icon & right arrow
  // =========================================================================
  if (variant === "carousel") {
    return (
      <section className="py-12 md:py-16 w-full px-4 lg:px-10">
        {/* Full-width Header: Title & Subtitle on Left, View All link on Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[28px] font-serif font-bold text-white tracking-tight leading-tight">
              {title}
            </h2>
            {description && (
              <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors shrink-0 group"
            >
              <span>{viewAllText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* Horizontal Card Slider Container with Next Floating Button */}
        <div className="relative group/carousel">
          <div
            ref={scrollRef}
            className="flex items-center gap-4 sm:gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-3 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((route) => (
              <div
                key={route.city}
                onClick={() => onSelect && onSelect(route.city)}
                className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-[#deb06c]/60 transition-all duration-300 cursor-pointer shadow-lg w-[260px] sm:w-[280px] lg:w-[295px] xl:w-[310px] h-[165px] sm:h-[180px] lg:h-[185px] shrink-0 snap-start"
              >
                {/* Background Landscape Image */}
                {route.image && (
                  <Image
                    src={route.image}
                    alt={route.city}
                    fill
                    sizes="(max-width: 640px) 260px, 310px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Bottom Left Content: Pin Icon + City Name, Subtitle below */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 z-10">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-white shrink-0 fill-white/20" />
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight group-hover:text-[#deb06c] transition-colors">
                      {route.city}
                    </h3>
                  </div>
                  {route.price && (
                    <p className="text-xs text-zinc-300 font-normal mt-1 pl-5">
                      {route.price}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Floating Next Chevron Button on the Right */}
          <button
            type="button"
            onClick={() => handleScroll("next")}
            aria-label="Next destinations"
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-3 lg:translate-x-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-zinc-900 shadow-2xl items-center justify-center hover:scale-110 hover:bg-zinc-100 transition-all z-20 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-zinc-900 stroke-[2.5]" />
          </button>
        </div>
      </section>
    );
  }

  // =========================================================================
  // VARIANT: STANDARD (Side-by-side 2-column layout for flights)
  // =========================================================================
  return (
    <section className="py-12 md:py-16 w-full px-4 lg:px-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-6 lg:gap-8">
        {/* Left Column: Heading, description, and outline pill button */}
        <div className="w-full lg:w-[320px] xl:w-[350px] shrink-0 flex flex-col justify-between py-1">
          <div>
            {tag && (
              <span className="text-[11px] font-semibold text-[#deb06c] tracking-[0.2em] uppercase block mb-2">
                {tag}
              </span>
            )}
            <h2 className="text-2xl sm:text-[26px] lg:text-[27px] font-serif font-bold text-white tracking-tight leading-tight mb-2.5">
              {title}
            </h2>
            {description && (
              <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed max-w-[310px]">
                {description}
              </p>
            )}
          </div>

          {viewAllLink && (
            <div className="pt-5 lg:pt-0">
              <Link
                href={viewAllLink}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-[#deb06c] text-[#deb06c] hover:bg-[#deb06c] hover:text-black transition-all text-xs font-medium group w-fit"
              >
                <span>{viewAllText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: Cards */}
        <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-4 items-center">
          {items.slice(0, 4).map((route) => (
            <div
              key={route.city}
              onClick={() => onSelect && onSelect(route.city)}
              className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-[#deb06c]/50 transition-all duration-300 cursor-pointer shadow-md w-full sm:w-[170px] md:w-[190px] lg:w-[205px] h-[225px] sm:h-[220px] lg:h-[225px]"
            >
              {/* Background Image */}
              {route.image && (
                <Image
                  src={route.image}
                  alt={route.city}
                  fill
                  sizes="(max-width: 640px) 50vw, 205px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Bottom Content: City, Price, and Solid Gold Circle Button */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 flex items-end justify-between z-10">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight group-hover:text-[#deb06c] transition-colors">
                    {route.city}
                  </h3>
                  {route.price && (
                    <p className="text-[10px] sm:text-[11px] text-zinc-300 font-normal mt-0.5">
                      From {route.price}
                    </p>
                  )}
                </div>

                {/* Solid Warm Gold Circle with dark arrow */}
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#deb06c] text-zinc-950 flex items-center justify-center shrink-0 shadow transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
