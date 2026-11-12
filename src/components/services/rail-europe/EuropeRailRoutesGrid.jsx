"use client";

import React from "react";
import Image from "next/image";
import { Clock, ArrowRight, MapPin } from "lucide-react";

export default function EuropeRailRoutesGrid({ routes = [], onSelectRoute }) {
  return (
    <section className="w-full py-10 sm:py-12 lg:py-14 bg-[#07080c] text-white">
      <div className="w-full px-4 lg:px-10">
        {/* Header Row with Top-Right Handwriting Flourish */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div className="max-w-2xl">
            <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase block mb-1.5">
              Popular Europe Rail Routes
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Iconic Journeys Across Europe
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
              From the romantic cities of France to the historic towns of Central Europe, our rail packages cover the best of Europe.
            </p>
          </div>

          {/* Caveat Cursive Flourish on Top Right */}
          <div
            className="font-handwriting text-2xl sm:text-3xl text-zinc-300 md:text-right shrink-0 select-none drop-shadow-sm -rotate-2"
            style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
          >
            <div>More Cities ♡</div>
            <div className="text-[#deb06c]">More Stories ✈</div>
          </div>
        </div>

        {/* Compact 6X1 Grid on Desktop (6 Columns across in a single row) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 xl:gap-4">
          {routes.map((route) => (
            <div
              key={route.id}
              className="group bg-[#0c101d] border border-zinc-800/90 hover:border-[#deb06c]/60 rounded-xl overflow-hidden transition-all duration-300 flex flex-col shadow-md hover:shadow-xl hover:shadow-[#deb06c]/5"
            >
              {/* Compact Image Container with Aspect Ratio [4/3] */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                <Image
                  src={route.image}
                  alt={route.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c101d] via-transparent to-transparent opacity-80" />

                {/* Floating Map Pin Badge */}
                <div className="absolute bottom-2 left-2 w-6 h-6 rounded-full bg-black/65 backdrop-blur-xs flex items-center justify-center text-[#deb06c] border border-white/10 shadow-sm">
                  <MapPin className="w-3 h-3" />
                </div>
              </div>

              {/* Compact Content Box */}
              <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xs sm:text-[13px] text-white group-hover:text-[#deb06c] transition-colors leading-snug line-clamp-1">
                    {route.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-zinc-400 mt-1 leading-snug line-clamp-2 min-h-[30px]">
                    {route.desc}
                  </p>
                </div>

                {/* Duration & Compact View Package Button */}
                <div className="pt-2 mt-2 border-t border-zinc-800/60">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-300 font-medium mb-2">
                    <Clock className="w-3 h-3 text-[#deb06c] shrink-0" />
                    <span>{route.duration}</span>
                  </div>

                  <button
                    onClick={() => onSelectRoute && onSelectRoute(route)}
                    className="w-full py-1.5 px-2 rounded-full border border-zinc-700 hover:border-[#deb06c] text-white hover:text-[#deb06c] text-[10px] sm:text-[11px] font-semibold transition-all duration-300 flex items-center justify-center gap-1 group/btn cursor-pointer whitespace-nowrap bg-white/5 hover:bg-white/10"
                  >
                    <span>View Package</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
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
