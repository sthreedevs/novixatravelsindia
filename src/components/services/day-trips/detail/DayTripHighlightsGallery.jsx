"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function DayTripHighlightsGallery({
  highlights = [],
  gallery = [],
}) {
  return (
    <div className="space-y-6 pt-6 border-t border-stone-200">
      <div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mb-4">
          Highlights &amp; Attractions
        </h3>

        {/* Checklist Badges */}
        {highlights.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white border border-[#deb06c]/40 text-xs sm:text-[15px] font-medium text-slate-800 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-[#b37f28] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3 Photos Grid */}
      {gallery.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {gallery.map((photo, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-sm"
            >
              <Image
                src={photo.image || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png"}
                alt={photo.title || "Trip highlight"}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png";
                }}
              />
              {/* Gradient overlay for bottom title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Title label at bottom */}
              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <span className="block text-xs sm:text-sm font-bold tracking-wide drop-shadow-sm truncate">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
