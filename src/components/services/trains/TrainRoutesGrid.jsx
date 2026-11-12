"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Clock, Train, ArrowRight } from "lucide-react";

export default function TrainRoutesGrid({ routes = [], onSelectRoute }) {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#07080c] text-white">
      <div className="w-full px-4 lg:px-10">
        {/* Header with Title + Top-Right Caveat Script */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 lg:mb-12">
          <div className="max-w-2xl">
            <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase block mb-1.5">
              POPULAR TRAIN ROUTES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Top Train Routes in India
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              Discover some of the most loved train journeys, from iconic cities to scenic landscapes.
            </p>
          </div>

          {/* Top-Right Script Flourish */}
          <div
            className="hidden md:flex flex-col items-end font-handwriting text-2xl lg:text-3xl text-white tracking-wide"
            style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
          >
            <span>Iconic Routes ♡</span>
            <span className="text-[#deb06c] -mt-1">Memorable Journeys ✈</span>
          </div>
        </div>

        {/* 5 Route Cards in 2Xn Grid on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-4.5 items-stretch">
          {routes.map((route) => (
            <div
              key={route.id}
              onClick={() => onSelectRoute && onSelectRoute(route)}
              className="group bg-[#0c0e15] border border-zinc-800/80 hover:border-[#deb06c]/60 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={route.image}
                    alt={route.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e15] via-transparent to-transparent opacity-80" />
                </div>

                {/* Card Body */}
                <div className="p-2.5 sm:p-4">
                  {/* Route Title with MapPin */}
                  <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5 text-white group-hover:text-[#deb06c] transition-colors">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#deb06c] shrink-0" />
                    <h3 className="font-serif font-bold text-xs sm:text-base tracking-tight leading-tight line-clamp-1">
                      {route.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[10px] sm:text-xs text-zinc-400 leading-snug sm:leading-relaxed mb-2 sm:mb-4 line-clamp-2 min-h-[26px] sm:min-h-[32px]">
                    {route.desc}
                  </p>

                  {/* Duration & Train Type Pills */}
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-300 pt-2 sm:pt-3 border-t border-zinc-800/80 mb-2 sm:mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#deb06c] shrink-0" />
                      <span>{route.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-400">
                      <Train className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#deb06c] shrink-0" />
                      <span className="truncate max-w-[60px] sm:max-w-[100px]">{route.trainType}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Trains Action */}
              <div className="px-2.5 sm:px-4 pb-2.5 sm:pb-4 pt-0">
                <div className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold text-[#deb06c] group-hover:text-white transition-colors">
                  <span>View Trains</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
