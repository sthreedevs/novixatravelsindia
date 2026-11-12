"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function EuropeRailBottomCta({ data }) {
  const whatsAppLink = `https://wa.me/${data?.whatsAppNumber || "916397574309"}?text=${encodeURIComponent(
    data?.whatsAppMessage || "Hello Novixa Travels, I would like to get a quote for a Europe Rail trip."
  )}`;

  return (
    <section className="w-full py-12 sm:py-14 lg:py-16 bg-[#07080c] text-white">
      <div className="w-full px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-[#071324] border border-white/10 p-6 sm:p-8 lg:p-12 shadow-2xl">
          {/* Background Image */}
          {data?.bgImage && (
            <div className="absolute inset-0 z-0">
              <Image
                src={data.bgImage}
                alt="European Rail Adventure"
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover object-center opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071324] via-[#071324]/85 to-[#071324]/70" />
            </div>
          )}

          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#deb06c]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase block mb-2">
                {data?.tag || "YOUR EUROPEAN RAIL ADVENTURE AWAITS"}
              </span>

              <h2
                className="font-handwriting text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight tracking-wide mb-3"
                style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
              >
                <span className="text-[#deb06c]">{data?.titleHighlight || "Ready to Explore Europe?"}</span>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg">
                {data?.subtitle ||
                  "Let's plan your perfect rail journey — with the right routes, passes and a travel experience you'll never forget."}
              </p>
            </div>

            {/* Right Action & Trust Badge */}
            <div className="flex flex-col items-center lg:items-end shrink-0">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#deb06c] to-[#d49e52] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold text-sm shadow-xl transition-all cursor-pointer whitespace-nowrap mb-3"
              >
                <span>{data?.buttonText || "Get a Free Quote →"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-[#deb06c]" />
                <span>{data?.trustText || "Personalized Itineraries | End-to-End Support"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
