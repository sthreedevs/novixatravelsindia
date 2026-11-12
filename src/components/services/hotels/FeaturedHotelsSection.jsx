"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Star, ArrowRight, ChevronRight } from "lucide-react";
import { handpickedHotels } from "@/data/services/hotels.data";

export default function FeaturedHotelsSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-16 lg:py-20 border-b border-white/5 bg-[#051324]">
      {/* Background Image with Deep Navy Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332956/backgrounds/hotelBgImage.png"
          alt="Featured Luxury Hotels Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Horizontal gradient: deeper on left for text readability, atmospheric in center/right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031326]/95 via-[#061d36]/80 via-40% to-[#031326]/75 pointer-events-none" />
        {/* Subtle top & bottom blending */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#07080c] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#07080c] to-transparent pointer-events-none" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
          {/* Left Text Column */}
          <div className="w-full lg:w-[28%] xl:w-[26%] shrink-0 space-y-4">
            <span className="text-[#deb06c] text-xs font-semibold tracking-[0.25em] uppercase block drop-shadow-sm">
              Featured Hotels
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
              Handpicked Stays for You
            </h2>
            <p className="text-zinc-200/90 text-xs sm:text-sm leading-relaxed max-w-sm drop-shadow-sm">
              Here are some of our most popular hotel options. Get in touch for
              availability, rates and more details.
            </p>
            <div className="pt-2">
              <a
                href="#hotel-quote-form"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#deb06c] text-[#deb06c] bg-black/40 hover:bg-[#deb06c] hover:text-zinc-950 text-xs font-semibold transition-all shadow-md group backdrop-blur-sm"
              >
                <span>Request a Hotel Quote</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Carousel with Floating Arrow */}
          <div className="w-full lg:w-[72%] xl:w-[74%] min-w-0 relative">
            <div
              ref={scrollRef}
              className="flex items-center gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory"
            >
              {handpickedHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="group bg-white text-zinc-900 rounded-2xl overflow-hidden w-[240px] sm:w-[260px] lg:w-[265px] xl:w-[275px] shrink-0 snap-start shadow-2xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Image */}
                  <div className="relative h-[145px] sm:h-[155px] w-full overflow-hidden bg-zinc-100">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      sizes="(max-width: 640px) 240px, 280px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm sm:text-base text-zinc-900 leading-tight">
                        {hotel.name}
                      </h3>
                      <p className="text-zinc-500 text-xs font-normal">
                        {hotel.location}
                      </p>
                    </div>

                    {/* Rating row */}
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                      <Star className="w-3.5 h-3.5 text-[#deb06c] fill-[#deb06c]" />
                      <span className="font-bold text-zinc-900">
                        {hotel.rating}
                      </span>
                      <span className="text-zinc-500 text-[11px]">
                        ({hotel.reviewsCount})
                      </span>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                      <a
                        href="#hotel-quote-form"
                        className="text-xs text-zinc-600 hover:text-zinc-950 font-medium flex items-center gap-1 group-hover:underline"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </a>
                      <span className="text-[10px] text-zinc-800 bg-[#f4efe6] border border-[#e8decb] px-2.5 py-0.5 rounded-md font-medium capitalize shadow-2xs">
                        {hotel.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Circular Next Arrow floating on right */}
            <button
              type="button"
              onClick={() => scroll("next")}
              aria-label="Next hotels"
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white text-zinc-900 items-center justify-center shadow-2xl hover:bg-[#deb06c] hover:scale-110 transition-all z-20 focus:outline-none border border-zinc-200"
            >
              <ChevronRight className="w-5 h-5 text-zinc-900" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
