"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ArrowRight } from "lucide-react";
import { moreDayTripsList } from "@/data/services/day-trips.data";

export default function ExploreMoreDayTripsSection({ currentTripId = "" }) {
  // Filter out current trip if it matches
  const displayTrips = moreDayTripsList.filter(
    (t) => t.slug !== currentTripId && t.id !== currentTripId
  );

  return (
    <section className="w-full bg-[#fbf9f5] py-14 sm:py-16 lg:py-20 border-t border-stone-200">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-[#b37f28] text-xs font-bold tracking-[0.2em] uppercase">
              EXPLORE MORE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight mt-1">
              More Popular Day Trips
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Discover other exciting one-day adventures nearby.
            </p>
          </div>

          <Link
            href="/services/day-trips"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-800 hover:text-[#b37f28] transition-colors shrink-0"
          >
            <span>View All Day Trips</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayTrips.map((trip) => (
            <div
              key={trip.id}
              className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#deb06c]/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={trip.image || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png"}
                    alt={trip.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 space-y-3">
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#b37f28] transition-colors font-serif">
                    {trip.title}
                  </h3>

                  {/* Specs */}
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#b37f28]" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-stone-300" />
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#b37f28]" />
                      <span>{trip.type}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-stone-100 flex items-baseline gap-1.5">
                    <span className="text-xs text-stone-500">
                      {trip.pricePrefix}
                    </span>
                    <span className="text-base font-bold text-stone-900 font-serif">
                      {trip.price}
                    </span>
                    <span className="text-xs text-stone-500">
                      {trip.priceSuffix}
                    </span>
                  </div>
                </div>
              </div>

              {/* View Details Link */}
              <div className="p-4 sm:p-5 pt-0">
                <Link
                  href={`/services/day-trips/${trip.slug || trip.id}`}
                  className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:border-[#deb06c] bg-stone-50 hover:bg-[#deb06c] hover:text-zinc-950 text-xs sm:text-sm font-bold text-stone-800 transition-all duration-200 text-center flex items-center justify-center gap-1.5 group-hover:bg-gradient-to-r group-hover:from-[#ffe7b8] group-hover:via-[#deb06c] group-hover:to-[#b37f28]"
                >
                  <span>View Trip</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
