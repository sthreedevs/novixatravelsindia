"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { popularCruiseDestinations } from "@/data/services/cruise.data";

export default function CruiseDestinationsSection({ onSelectDestination }) {
  const handleCardClick = (tag) => {
    if (onSelectDestination) {
      onSelectDestination(tag);
    }
    const formElement = document.getElementById("cruise-quote-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="w-full bg-[#fbfaf6] text-zinc-900 py-6 sm:py-8 lg:py-8 border-b border-[#e7eaf0]">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <div className="text-[#deb06c] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-1.5">
              POPULAR CRUISE DESTINATIONS
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0c2340] tracking-tight leading-[1.12]">
              Explore the World by Sea
            </h2>
            <p className="text-[#285074] text-xs sm:text-[13px] leading-relaxed max-w-xl mt-2">
              From tropical islands to historic cities, our cruise holidays take you
              to some of the most breathtaking destinations across the globe.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleCardClick("All Destinations")}
            className="self-start md:self-end shrink-0 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#deb06c] text-[#0c2340] text-xs sm:text-[13px] font-semibold hover:bg-[#deb06c] hover:text-black transition duration-200 cursor-pointer"
          >
            <span>View All Cruises</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>

        {/* 5 Destination Cards (2Xn on Mobile, 5 Cols on Desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-4 xl:gap-4.5 items-stretch">
          {popularCruiseDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#e5e9f0] shadow-[0_3px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Photo with 184:127 aspect ratio */}
                <div className="relative aspect-[184/127] w-full overflow-hidden bg-zinc-100">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Location Badge Pill Overlay matching design */}
                  <div className="absolute bottom-1.5 left-1.5 sm:bottom-2.5 sm:left-2.5 z-10 inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9.5px] sm:text-[11px] font-medium tracking-wide shadow-sm pointer-events-none">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white shrink-0" />
                    <span>{dest.tag}</span>
                  </div>
                </div>

                {/* Compact Card Content */}
                <div className="p-2.5 sm:p-3.5 xl:p-4 flex flex-col">
                  <h3 className="font-serif font-bold text-[#0c2340] text-[12.5px] sm:text-[14.5px] xl:text-[15px] leading-snug tracking-tight mb-1 text-left group-hover:text-[#deb06c] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-[#285074] text-[10px] sm:text-[11px] xl:text-[11.5px] leading-relaxed mb-2 sm:mb-3 min-h-[26px] sm:min-h-[36px] text-left">
                    {dest.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="px-2.5 pb-2.5 sm:px-3.5 sm:pb-3.5 xl:px-4 xl:pb-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleCardClick(dest.tag)}
                  className="self-start inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#deb06c] text-[#0c2340] text-[10px] sm:text-[11px] xl:text-[11.5px] font-semibold hover:bg-[#deb06c] hover:text-black transition-all duration-200 group/btn cursor-pointer whitespace-nowrap"
                >
                  <span>Explore Cruises</span>
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2] group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
