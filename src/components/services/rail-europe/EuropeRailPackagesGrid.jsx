"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

export default function EuropeRailPackagesGrid({ packages = [], onSelectPackage, onViewAll }) {
  return (
    <section className="w-full py-14 sm:py-16 lg:py-20 bg-[#07080c] text-white">
      <div className="w-full px-4 lg:px-10">
        {/* Header Row with Right "View All Rail Packages" Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase block mb-2">
              Europe Rail Packages
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Featured Rail Packages
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              Curated itineraries, handpicked routes and unforgettable experiences across Europe.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#deb06c] to-[#d49e52] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <span>View All Rail Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Package Cards: 2xN Grid on Mobile, 4 Cols on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-[#0c101d] border border-zinc-800/80 hover:border-[#deb06c]/50 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-[#deb06c]/5"
            >
              <div>
                {/* Image Container with Aspect Ratio [4/3] */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c101d] via-transparent to-transparent opacity-80" />

                  {/* Floating Map Pin Badge */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-[#deb06c] border border-white/10 shadow-md">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-2.5 sm:p-4 lg:p-5 flex flex-col">
                  <h3 className="font-serif font-bold text-[12.5px] sm:text-base text-white group-hover:text-[#deb06c] transition-colors leading-snug line-clamp-2">
                    {pkg.title}
                  </h3>
                  <div className="text-[10px] sm:text-[11px] font-medium text-zinc-400 mt-1 sm:mt-1.5 flex flex-wrap items-center gap-1 sm:gap-1.5">
                    <span>{pkg.duration}</span>
                    <span>•</span>
                    <span className="text-[#deb06c] truncate max-w-full">{pkg.countries}</span>
                  </div>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="p-2.5 sm:p-4 lg:p-5 pt-0 sm:pt-0 lg:pt-0">
                <div className="pt-2 sm:pt-3 border-t border-zinc-800/60">
                  <div className="mb-2 sm:mb-3">
                    <span className="text-xs sm:text-base lg:text-lg font-bold text-[#deb06c] tracking-tight">
                      ₹ {pkg.price}
                    </span>
                    <span className="text-[9.5px] sm:text-[11px] text-zinc-400 ml-1">
                      per person
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectPackage && onSelectPackage(pkg)}
                    className="w-full inline-flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-full border border-zinc-700 hover:border-[#deb06c] text-white hover:text-[#deb06c] text-[10.5px] sm:text-xs font-semibold transition-all duration-300 cursor-pointer group/btn"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
