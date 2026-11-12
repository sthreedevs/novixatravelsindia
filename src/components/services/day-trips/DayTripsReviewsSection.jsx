"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { dayTripsReviewsData } from "@/data/services/day-trips.data";

export default function DayTripsReviewsSection({ onOpenReviews }) {
  const { title, subtitle, viewAllLink, reviews } = dayTripsReviewsData;

  return (
    <section className="relative w-full bg-[#07080c] py-14 sm:py-16 lg:py-20 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#deb06c] hover:text-[#e5b869] transition-colors shrink-0 group"
            >
              <span>View All Reviews</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* 3 Featured Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#0c0e15] border border-zinc-800/90 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between hover:border-[#deb06c]/40 transition-all duration-300"
            >
              {/* Review Text */}
              <div className="space-y-4">
                <p className="text-zinc-300 text-xs sm:text-[13px] italic leading-relaxed">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              {/* Author & Star Rating */}
              <div className="pt-5 mt-5 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0">
                    <Image
                      src={rev.avatar || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png"}
                      alt={rev.name}
                      fill
                      unoptimized
                      sizes="40px"
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-white text-xs sm:text-sm font-bold leading-tight">
                      {rev.name}
                    </h4>
                    <p className="text-zinc-400 text-[11px] leading-tight mt-0.5">
                      {rev.location}
                    </p>
                  </div>
                </div>

                {/* 5 Stars */}
                <div className="flex items-center gap-0.5 text-[#deb06c]">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#deb06c]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
