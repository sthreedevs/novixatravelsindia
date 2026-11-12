"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, MapPin } from "lucide-react";

export default function PopularDayTripsSection({
  trips = [],
  onSelectTrip,
  activeFilter = "",
}) {
  const filteredTrips = activeFilter.trim()
    ? trips.filter(
        (t) =>
          t.title.toLowerCase().includes(activeFilter.toLowerCase()) ||
          t.location.toLowerCase().includes(activeFilter.toLowerCase()) ||
          t.highlights.toLowerCase().includes(activeFilter.toLowerCase())
      )
    : trips;

  return (
    <section id="popular-day-trips" className="relative w-full bg-[#07080c] py-14 sm:py-16 lg:py-20 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          {/* Left Title & Subtitle */}
          <div className="space-y-2 max-w-2xl">
            <div className="text-[#deb06c] text-xs font-semibold tracking-[0.22em] uppercase">
              POPULAR DAY TRIPS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white font-serif tracking-tight leading-tight">
              Explore the Best Day Trips
            </h2>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-xl">
              From historical landmarks to scenic escapes, our day trips are designed to give you unforgettable experiences, all in a single day.
            </p>
          </div>

          {/* Right Cursive Flourish */}
          <div className="text-left md:text-right shrink-0">
            <div
              className="font-handwriting text-2xl sm:text-3xl lg:text-[34px] text-white tracking-wide leading-tight inline-block"
              style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
            >
              <div>Same City</div>
              <div className="flex items-center gap-2 justify-start md:justify-end text-[#deb06c]">
                <span>New Stories ♡</span>
                {/* Airplane doodle icon */}
                <svg
                  className="w-5 h-5 text-white/90 -rotate-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Cards Grid (4 columns on lg, 2 on sm, 1 on xs) */}
        {filteredTrips.length === 0 ? (
          <div className="py-12 text-center text-zinc-400 bg-[#0c0e15] rounded-2xl border border-zinc-800">
            <p className="text-sm">No day trips found matching &ldquo;{activeFilter}&rdquo;.</p>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              filteredTrips.length === 3
                ? "lg:grid-cols-3 max-w-6xl mx-auto"
                : "lg:grid-cols-3 xl:grid-cols-4"
            } gap-4 sm:gap-5 lg:gap-6 items-stretch`}
          >
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="group bg-[#0c0e15] border border-zinc-800/90 hover:border-[#deb06c]/60 rounded-2xl overflow-hidden p-3 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#deb06c]/5"
              >
                <div>
                  {/* Image Container with Location Badge */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
                    <Image
                      src={trip.image || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png"}
                      alt={trip.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png";
                      }}
                    />
                    {/* Subtle bottom gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e15]/80 via-transparent to-transparent pointer-events-none" />

                    {/* Location Badge on bottom-left */}
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1 border border-white/10 shadow-sm">
                      <MapPin className="w-3 h-3 text-[#deb06c]" />
                      <span>{trip.location}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="pt-3 space-y-1.5">
                    <Link
                      href={`/services/day-trips/${trip.slug || trip.id || trip._id}`}
                      className="block group-hover:text-[#deb06c] transition-colors"
                    >
                      <h3 className="text-white font-bold text-[15px] sm:text-base leading-snug font-sans">
                        {trip.title}
                      </h3>
                    </Link>

                    <p className="text-[11px] sm:text-xs text-zinc-400 font-medium leading-relaxed line-clamp-1">
                      {trip.highlights}
                    </p>

                    {/* Specs Row: Duration & Group Type */}
                    <div className="flex items-center gap-3.5 pt-1 text-[11px] text-zinc-300">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#deb06c]" />
                        <span>{trip.duration}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-zinc-700" />
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#deb06c]" />
                        <span>{trip.type}</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="pt-2 border-t border-zinc-800/80 flex items-baseline gap-1.5">
                      <span className="text-[11px] text-zinc-400">
                        {trip.pricePrefix}
                      </span>
                      <span className="text-white font-bold text-base sm:text-[17px] tracking-tight">
                        {trip.price}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {trip.priceSuffix}
                      </span>
                    </div>
                  </div>
                </div>

                {/* View Details Button / Link */}
                <div className="pt-3">
                  <Link
                    href={`/services/day-trips/${trip.slug || trip.id || trip._id}`}
                    className="w-full py-2 px-4 rounded-full border border-zinc-700/80 bg-zinc-900/60 text-zinc-200 text-xs font-semibold text-center hover:bg-gradient-to-r hover:from-[#deb06c] hover:via-[#d49e52] hover:to-[#c28f46] hover:text-zinc-950 hover:border-[#deb06c] transition-all duration-300 shadow-sm cursor-pointer block"
                  >
                    {trip.buttonText || "View Details →"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
