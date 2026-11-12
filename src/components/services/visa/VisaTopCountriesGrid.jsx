"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function VisaTopCountriesGrid({
  countries,
  onSelectCountry,
  viewAllLink = "/destination",
}) {
  return (
    <section className="bg-[#07080c] text-white py-10 sm:py-12 lg:py-14 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title on Left & View All button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase block mb-1">
              POPULAR DESTINATIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-tight">
              Visa Assistance for Top Countries
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              From popular tourist destinations to business and transit visas, we cover a wide range of countries.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#deb06c] text-[#deb06c] hover:bg-[#deb06c] hover:text-black font-semibold text-xs tracking-wide transition-all duration-300 shadow-xs cursor-pointer group"
            >
              <span>View All Countries</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 6 Country Portrait Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {countries.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCountry && onSelectCountry(item.country)}
              className="relative aspect-[3/4.4] min-h-[210px] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-lg hover:border-[#deb06c]/60 hover:shadow-[0_4px_20px_rgba(222,176,108,0.15)] transition-all duration-300"
            >
              {/* Landmark Image */}
              <Image
                src={item.image}
                alt={`${item.country} Visa`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Bottom Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 via-50% to-transparent pointer-events-none" />

              {/* Bottom Card Content */}
              <div className="absolute inset-x-0 bottom-0 p-3 z-10 flex flex-col justify-end">
                {/* Circular Flag Badge */}
                <div className="w-6 h-6 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-xs shadow-xs mb-1.5 backdrop-blur-xs">
                  <span>{item.flag}</span>
                </div>

                {/* Country Name */}
                <h3 className="font-sans font-bold text-sm text-white group-hover:text-[#deb06c] transition-colors leading-snug">
                  {item.country}
                </h3>

                {/* Visa Categories */}
                <p className="text-[10px] text-zinc-300 leading-tight mt-0.5 font-medium">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
