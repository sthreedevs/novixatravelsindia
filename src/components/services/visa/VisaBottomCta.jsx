"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, ShieldQuestion } from "lucide-react";

export default function VisaBottomCta({ data }) {
  const whatsappUrl = `https://wa.me/${data.whatsAppNumber || "916397574309"}?text=Hello%20Novixa%20Travels,%20I%20need%20help%20with%20my%20visa%20application.`;

  return (
    <section className="relative w-full overflow-hidden py-8 sm:py-10 bg-[#06101e] text-white">
      {/* Background Image with Dark Vignette */}
      {data.bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.bgImage}
            alt="Visa Assistance"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06101e] via-[#06101e]/85 to-[#06101e]/70" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left Side: Icon + Heading */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#deb06c]/15 border border-[#deb06c]/40 flex items-center justify-center text-[#deb06c] shrink-0 shadow-sm">
              <ShieldQuestion className="w-6 h-6 text-[#deb06c]" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight">
                {data.title || "Need Help with Your Visa?"}
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm mt-0.5">
                {data.subtitle ||
                  "Get expert guidance and hassle-free visa assistance."}
              </p>
            </div>
          </div>

          {/* Right Side: WhatsApp Button + Micro-text */}
          <div className="flex flex-col items-center sm:items-end">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-6 bg-gradient-to-r from-[#deb06c] to-[#d49e52] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-zinc-950" />
              <span>{data.whatsAppText || "Chat on WhatsApp"}</span>
            </a>
            <span className="text-[11px] text-zinc-400 mt-1.5 font-medium">
              {data.subText || "Quick support | Free consultation"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
