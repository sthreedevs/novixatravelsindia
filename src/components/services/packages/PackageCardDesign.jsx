"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Plane, ArrowRight } from "lucide-react";

export default function PackageCardDesign({ packageData }) {
  const {
    _id,
    slug,
    title,
    badge,
    duration,
    type,
    price,
    image,
  } = packageData;

  const targetLink = `/services/packages/${slug || _id}`;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Top Image Section - Clickable */}
      <Link
        href={targetLink}
        className="relative h-52 w-full overflow-hidden bg-zinc-100 block cursor-pointer"
      >
        <Image
          src={image || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png"}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Subtle Dark Gradient at bottom of image for tag pop */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* Floating Category Tag at bottom-left */}
        {badge && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-block bg-[#fcf2df] text-[#8a5812] border border-[#edd7a6] text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
              {badge}
            </span>
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title - Clickable */}
          <Link href={targetLink} className="block cursor-pointer">
            <h3
              className="font-serif text-lg sm:text-[19px] font-bold text-zinc-900 group-hover:text-[#c28f46] transition-colors line-clamp-2 leading-snug"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {title}
            </h3>
          </Link>

          {/* Specs: Duration & Type */}
          <div className="flex items-center gap-4 text-xs text-zinc-600 mt-2">
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Plane className="w-3.5 h-3.5 text-zinc-400 shrink-0 rotate-[-20deg]" />
              <span>{type}</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-4 pt-3 border-t border-zinc-100">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
              Starting from
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span
                className="font-serif text-xl sm:text-[22px] font-bold text-zinc-950"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                ₹ {price}
              </span>
              <span className="text-xs text-zinc-500 font-normal">per person</span>
            </div>
          </div>

          {/* View Details Action Button - Directly links to specific page */}
          <div className="mt-3.5">
            <Link
              href={targetLink}
              className="w-full bg-[#0c1222] hover:bg-[#1a233b] text-white rounded-full py-2.5 px-4 text-center text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow hover:brightness-110 active:scale-[0.99] cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
