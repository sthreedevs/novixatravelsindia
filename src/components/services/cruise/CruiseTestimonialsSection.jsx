"use client";

import React from "react";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { cruiseReviewsData } from "@/data/services/cruise.data";

export default function CruiseTestimonialsSection() {
  return (
    <section className="w-full bg-[#fbfbfb] text-zinc-900 py-16 sm:py-20 lg:py-24 border-b border-zinc-200">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0c1f3d] tracking-tight leading-tight">
              What Our Clients Say
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-medium mt-1">
              Real experiences. Happy travelers.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-800 hover:text-[#b37f28] transition duration-200 self-start sm:self-end"
          >
            <span>View All Reviews</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cruiseReviewsData.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Quote Text */}
              <p className="text-zinc-700 text-xs sm:text-[13px] leading-relaxed italic mb-5">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-3 border-t border-zinc-100">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-zinc-900 text-xs sm:text-sm">
                    {review.name}
                  </div>
                  <div className="text-[11px] text-zinc-500">{review.location}</div>
                  <div className="flex items-center gap-0.5 mt-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
