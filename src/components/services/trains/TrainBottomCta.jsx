"use client";

import React from "react";
import { Train, ArrowRight } from "lucide-react";

export default function TrainBottomCta({ data, onRequestQuote }) {
  const whatsappUrl = `https://wa.me/${data?.whatsAppNumber || "916397574309"}?text=Hello%20Novixa%20Travels,%20I%20would%20like%20to%20request%20a%20train%20quote.`;

  return (
    <section className="w-full bg-[#071324] border-t border-white/10 text-white py-6 sm:py-7">
      <div className="w-full px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 text-center lg:text-left">
          {/* Left: Train Icon + Caveat Script */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#deb06c]/15 border border-[#deb06c]/40 text-[#deb06c] flex items-center justify-center shrink-0">
              <Train className="w-5 h-5 text-[#deb06c]" />
            </div>
            <div
              className="font-handwriting text-2xl sm:text-3xl text-white tracking-wide whitespace-nowrap"
              style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
            >
              <span>{data?.scriptNote || "All Aboard for New Adventures ♡"}</span>
            </div>
          </div>

          {/* Center: Message */}
          <div className="max-w-xl text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {data?.message ||
              "Get in touch with us for personalized train travel solutions, group bookings or corporate travel."}
          </div>

          {/* Right: Gold Action Button */}
          <div className="shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 py-2.5 px-6 rounded-full bg-gradient-to-r from-[#deb06c] to-[#d49e52] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{data?.buttonText || "Request a Quote"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
