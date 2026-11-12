"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { esimTestimonialsData } from "@/data/services/esim.data";

export default function EsimTestimonialsSection() {
  const { eyebrow, title, description, ctaText, reviews } = esimTestimonialsData;

  return (
    <section className="relative w-full bg-[#07080c] py-10 sm:py-12 lg:py-14">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-10">
          {/* Left Column: Heading, Subtitle & CTA */}
          <div className="w-full lg:w-[32%] xl:w-[30%] shrink-0 space-y-4">
            {eyebrow && (
              <div className="text-[#deb06c] text-xs font-semibold tracking-[0.2em] uppercase">
                {eyebrow}
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-bold text-white font-serif tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-md">
              {description}
            </p>
            <div className="pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-xs sm:text-[13px] font-medium hover:border-[#deb06c] hover:text-[#deb06c] transition-all duration-300"
              >
                {ctaText}
              </button>
            </div>
          </div>

          {/* Right Column: 3 Testimonial Cards in a row */}
          <div className="w-full lg:w-[68%] xl:w-[70%]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Top Quote & Avatar */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Avatar circle */}
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-amber-200 to-amber-500 shrink-0 border border-amber-300/60 shadow-xs flex items-center justify-center text-zinc-950 font-bold text-xs">
                      {rev.avatar ? (
                        <Image
                          src={rev.avatar}
                          alt={rev.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      ) : (
                        <span>{rev.name.charAt(0)}</span>
                      )}
                    </div>

                    {/* Review text */}
                    <p className="text-zinc-700 text-xs leading-relaxed italic">
                      &ldquo;{rev.review}&rdquo;
                    </p>
                  </div>

                  {/* Author info & 5 stars */}
                  <div className="pt-2 border-t border-zinc-100 flex flex-col items-start gap-1">
                    <div className="text-zinc-950 font-bold text-xs sm:text-[13px] leading-tight">
                      {rev.name}
                    </div>
                    <div className="text-zinc-400 text-[11px] font-medium">
                      {rev.location}
                    </div>
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 pt-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
