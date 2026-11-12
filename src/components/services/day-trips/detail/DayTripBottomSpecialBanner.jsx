"use client";

import React from "react";
import Image from "next/image";
import { Compass, ArrowRight } from "lucide-react";

export default function DayTripBottomSpecialBanner({
  destination = "Agra",
  onQuoteClick,
}) {
  const whatsAppNumber = "916397574309";
  const whatsAppMessage = encodeURIComponent(
    `Hello Novixa Travels, I would like to plan a custom day trip to ${destination}. Please share options and pricing.`
  );

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#07080c] text-white overflow-hidden">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332948/backgrounds/dayTrip.jpg"
          alt="Day Trip Special"
          fill
          unoptimized
          className="object-cover object-center opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080c] via-[#07080c]/85 to-[#07080c]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 text-center space-y-6">
        {/* Center Circular Icon */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center mx-auto shadow-xl shadow-[#deb06c]/20">
          <Compass className="w-7 h-7 stroke-[2.2]" />
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-white tracking-tight leading-tight">
          Make Your {destination} Day Trip Special
        </h2>

        {/* Subtitle */}
        <p className="text-zinc-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Let us customize your perfect experience — from private transfers to
          exclusive experiences, we&apos;ve got you covered.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onQuoteClick}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 text-xs sm:text-sm font-bold shadow-lg hover:shadow-[#deb06c]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span>Get a Custom Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`https://wa.me/${whatsAppNumber}?text=${whatsAppMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-xs sm:text-sm font-semibold text-white transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-[#25D366] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
