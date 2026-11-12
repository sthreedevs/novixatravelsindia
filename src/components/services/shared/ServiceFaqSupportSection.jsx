"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Phone, ShieldCheck, MessageCircle } from "lucide-react";

export default function ServiceFaqSupportSection({
  title = "Frequently Asked Questions",
  tag,
  faqs = [],
  centerBannerImage,
  centerBannerImageFit = "object-cover",
  showCenterScript = true,
  centerBannerScriptLine1 = "More Passports ♡",
  centerBannerScriptLine2 = "More Stories ✈",
  supportTitle = "Still Have Questions?",
  supportSubtitle = "Chat with our travel experts for personalized assistance.",
  whatsAppNumber = "916397574309",
  whatsAppMessage = "Hello Novixa Travels, I have a question regarding your travel services.",
  whatsAppText = "Chat on WhatsApp",
  phoneNumber = "+919876543210",
  displayPhone = "+91 98765 43210",
  showCallButton = true,
  trustText = "Quick support | Free consultation",
  className = "",
  containerClassName = "w-full px-4 sm:px-6 lg:px-10 xl:px-14",
}) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
    whatsAppMessage
  )}`;
  const callUrl = `tel:${phoneNumber}`;

  return (
    <section
      className={`w-full bg-[#07080c] text-white py-8 sm:py-10 lg:py-12 border-t border-white/5 ${className}`}
    >
      <div className={containerClassName}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {/* 1. Left Column: FAQs Accordion (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {tag && (
              <span className="text-[#deb06c] text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase block mb-1">
                {tag}
              </span>
            )}
            <h2 className="font-serif text-xl sm:text-2xl lg:text-[28px] font-bold text-white tracking-tight leading-tight mb-3 sm:mb-3.5">
              {title}
            </h2>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.id || idx}
                    className={`rounded-xl overflow-hidden transition-all duration-300 border ${
                      isOpen
                        ? "bg-[#0d1424] border-[#deb06c]/60 shadow-[0_4px_16px_rgba(222,176,108,0.1)]"
                        : "bg-[#0c101d] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between py-2.5 px-3.5 sm:py-3 sm:px-4 text-left font-semibold text-xs sm:text-[13px] text-zinc-100 hover:text-[#deb06c] transition-colors cursor-pointer group"
                    >
                      <span className="pr-3 leading-snug">{faq.question}</span>
                      <span className="shrink-0">
                        {isOpen ? (
                          <div className="w-5 h-5 rounded-full bg-[#deb06c]/20 flex items-center justify-center">
                            <Minus className="w-3 h-3 text-[#deb06c]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center">
                            <Plus className="w-3 h-3 text-zinc-400 group-hover:text-white" />
                          </div>
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-3.5 sm:px-4 pb-3 pt-1 text-[11px] sm:text-xs text-zinc-300 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Center Column: Visual Banner with Script (lg:col-span-4) */}
          <div className="lg:col-span-4 min-h-[260px] sm:min-h-[280px] lg:min-h-[320px]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-white/10 flex items-center justify-center p-5 group">
              {centerBannerImage && (
                <Image
                  src={centerBannerImage}
                  alt={centerBannerScriptLine1 || "Travel Memories"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className={`${centerBannerImageFit} group-hover:scale-105 transition-transform duration-700`}
                />
              )}
              {/* Dark luxury vignette overlay */}
              <div
                className={`absolute inset-0 ${
                  centerBannerImageFit === "object-contain"
                    ? "bg-transparent"
                    : "bg-gradient-to-t from-black/85 via-black/45 to-black/35"
                } pointer-events-none`}
              />

              {/* Overlaid Script Flourish */}
              {showCenterScript && (centerBannerScriptLine1 || centerBannerScriptLine2) && (
                <div
                  className={`relative z-10 text-center font-handwriting text-2xl sm:text-3xl text-white tracking-wide leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] ${
                    centerBannerImageFit === "object-contain" ? "mt-auto pb-1" : ""
                  }`}
                  style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
                >
                  {centerBannerScriptLine1 && <div>{centerBannerScriptLine1}</div>}
                  {centerBannerScriptLine2 && (
                    <div className="text-[#deb06c]">
                      {centerBannerScriptLine2}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 3. Right Column: Still Have Questions / Support Box (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <div className="bg-[#0c101d] border border-white/10 rounded-2xl shadow-xl p-4 sm:p-5 flex flex-col justify-between text-center h-full relative overflow-hidden">
              {/* Subtle gold glow behind card */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#deb06c]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                  {supportTitle}
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 mb-3.5 leading-relaxed">
                  {supportSubtitle}
                </p>

                {/* WhatsApp Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-[#deb06c] to-[#d49e52] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold text-xs rounded-full flex items-center justify-center gap-2 shadow-md transition-all mb-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-zinc-950" />
                  <span>{whatsAppText}</span>
                </a>

                {/* Optional Call Us Button */}
                {showCallButton && (
                  <a
                    href={callUrl}
                    className="w-full py-2.5 px-4 border border-white/20 hover:border-[#deb06c] text-white hover:text-[#deb06c] font-semibold text-xs rounded-full flex items-center justify-center gap-2 transition-all bg-white/5 hover:bg-white/10 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#deb06c]" />
                    <span>Call Us</span>
                  </a>
                )}
              </div>

              {/* Micro-trust note */}
              <div className="relative z-10 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 pt-3 border-t border-white/5 mt-3">
                <ShieldCheck className="w-3 h-3 text-[#deb06c]" />
                <span>{trustText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
