"use client";

import React from "react";
import Image from "next/image";
import { Hotel, ArrowRight, MessageCircle } from "lucide-react";
import { hotelBottomCtaData } from "@/data/services/hotels.data";

export default function HotelBottomCta() {
  const handleScrollToForm = () => {
    const el = document.getElementById("hotel-quote-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-16 lg:py-20 bg-[#07080c]">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hotelBottomCtaData.bgImage}
          alt="Luxury Resort Sunset"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/85" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          {/* Left Title & Icon */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#deb06c]/15 border border-[#deb06c]/30 flex items-center justify-center text-[#deb06c] shrink-0 shadow-inner">
              <Hotel className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight leading-tight">
                {hotelBottomCtaData.title}
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm mt-1 leading-relaxed">
                {hotelBottomCtaData.subtitle}
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Gold Quote Button */}
            <button
              type="button"
              onClick={handleScrollToForm}
              className="px-6 py-3.5 rounded-full bg-[#deb06c] hover:bg-[#d49e52] text-zinc-950 font-semibold text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Request a Hotel Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Green WhatsApp Button */}
            <a
              href={`https://wa.me/${hotelBottomCtaData.whatsappNumber?.replace(/[^0-9]/g, "")}?text=Hi%20Novixa,%20I%20would%20like%20to%20enquire%20about%20hotel%20booking.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <div className="text-left leading-tight">
                <span className="font-semibold block text-xs">Chat on WhatsApp</span>
                <span className="text-[10px] text-white/90 block">Get quick assistance</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
