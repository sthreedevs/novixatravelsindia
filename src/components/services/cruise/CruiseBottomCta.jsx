"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { cruiseBottomCtaData } from "@/data/services/cruise.data";

export default function CruiseBottomCta() {
  const scrollToForm = () => {
    const formElement = document.getElementById("cruise-quote-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const whatsappHref = `https://wa.me/${cruiseBottomCtaData.whatsAppNumber.replace(
    /[^0-9]/g,
    ""
  )}?text=${encodeURIComponent(cruiseBottomCtaData.whatsAppText)}`;

  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-16 lg:py-20">
      {/* Background Panoramic Cruise Sunset Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={cruiseBottomCtaData.bgImage}
          alt="Cruise Sunset Horizon"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Oceanic Deep Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030914]/95 via-[#061427]/85 to-[#030914]/90" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left: Ship Wheel Badge + Text */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Nautical Helm Gold Circular Badge */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center shrink-0 shadow-xl shadow-black/40">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7 sm:w-8 sm:h-8"
              >
                <circle cx="12" cy="12" r="8" />
                <path d="m12 2 1.5 2h-3L12 2Z" />
                <path d="m12 22 1.5-2h-3L12 22Z" />
                <path d="m2 12 2 1.5v-3L2 12Z" />
                <path d="m22 12-2 1.5v-3L22 12Z" />
                <path d="m5 5 2.5 1-1 2.5L5 5Z" />
                <path d="m19 19-2.5-1 1-2.5L19 19Z" />
                <path d="m19 5-1 2.5-2.5-1L19 5Z" />
                <path d="m5 19 1-2.5 2.5 1L5 19Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-tight">
                {cruiseBottomCtaData.title}
              </h2>
              <p className="text-zinc-200/90 text-xs sm:text-sm mt-1 max-w-xl">
                {cruiseBottomCtaData.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Two Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
            <button
              type="button"
              onClick={scrollToForm}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#deb06c] to-[#d49e52] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold text-xs sm:text-sm shadow-lg shadow-[#deb06c]/20 flex items-center gap-2 transition duration-200 cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition duration-200 hover:border-white/40"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
