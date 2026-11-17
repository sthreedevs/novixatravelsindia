"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, ChevronDown, ChevronsUpDown } from "lucide-react";

export default function PackageItinerarySection({
  itinerary = [],
  inclusions = [],
  exclusions = [],
  price = "1,25,000*",
  priceUnit = "per couple (approx.)",
  centerImage = "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332956/backgrounds/hotelBgImage.png",
  onOpenQuote,
}) {
  // Details are hidden first as requested; users can open any day to read
  const [openIndices, setOpenIndices] = useState([]);
  const [activeTab, setActiveTab] = useState("inclusions"); // "inclusions" | "exclusions"

  const toggleIndex = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const isAllExpanded =
    itinerary.length > 0 && openIndices.length === itinerary.length;

  const toggleAll = () => {
    if (isAllExpanded) {
      setOpenIndices([]);
    } else {
      setOpenIndices(itinerary.map((_, i) => i));
    }
  };

  const renderDescription = (desc) => {
    if (!desc) return null;
    const paragraphs = desc.split(/\n+/).filter(Boolean);
    if (paragraphs.length > 1) {
      return (
        <div className="space-y-2">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-zinc-300 text-xs sm:text-[13px] leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      );
    }
    return (
      <p className="text-zinc-300 text-xs sm:text-[13px] leading-relaxed whitespace-pre-line">
        {desc}
      </p>
    );
  };

  return (
    <section className="w-full bg-[#0b101b] py-14 sm:py-16 lg:py-20 border-t border-b border-zinc-800/80 text-white">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Detailed Itinerary Accordion */}
          <div className="lg:col-span-5 space-y-5">
            {/* Header + Expand All Toggle */}
            <div className="flex items-end justify-between gap-4 pb-3 border-b border-zinc-800/80">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#deb06c] block mb-1">
                  Day-By-Day Plan
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  Detailed Itinerary
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                  A perfect blend of relaxation, adventure and romance.
                </p>
              </div>

              {itinerary.length > 0 && (
                <button
                  type="button"
                  onClick={toggleAll}
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#deb06c] hover:text-[#f3cd85] bg-[#141d31] hover:bg-[#1a2640] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer border border-[#deb06c]/30 shadow-xs"
                  aria-label={isAllExpanded ? "Collapse all itinerary days" : "Expand all itinerary days"}
                >
                  <ChevronsUpDown className="w-3.5 h-3.5" />
                  <span>{isAllExpanded ? "Collapse All" : "Expand All"}</span>
                </button>
              )}
            </div>

            {/* Accordion List */}
            <div className="space-y-3 pt-1">
              {itinerary.map((item, idx) => {
                const isOpen = openIndices.includes(idx);
                const dayNumber = item.day || String(idx + 1).padStart(2, "0");

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl transition-all duration-300 border ${
                      isOpen
                        ? "bg-[#131d33] border-[#deb06c] shadow-lg shadow-black/40 ring-1 ring-[#deb06c]/30"
                        : "bg-[#101726] border-zinc-800/80 hover:border-[#deb06c]/50 hover:bg-[#131b2e]"
                    }`}
                  >
                    {/* Accordion Trigger Header */}
                    <button
                      type="button"
                      onClick={() => toggleIndex(idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 select-none cursor-pointer group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Day Number Badge */}
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs ${
                            isOpen
                              ? "bg-gradient-to-br from-[#c28f46] to-[#a3702a] text-white shadow-md shadow-[#deb06c]/20"
                              : "bg-[#162138] text-[#deb06c] border border-[#deb06c]/30 group-hover:bg-[#deb06c]/15"
                          }`}
                        >
                          {dayNumber}
                        </div>

                        {/* Title & Preview */}
                        <div className="min-w-0">
                          <h3
                            className={`text-sm sm:text-[14.5px] font-bold tracking-tight transition-colors line-clamp-1 ${
                              isOpen
                                ? "text-[#deb06c]"
                                : "text-zinc-100 group-hover:text-[#deb06c]"
                            }`}
                          >
                            {item.title}
                          </h3>
                          {!isOpen && (
                            <p className="text-[11.5px] text-zinc-400 line-clamp-1 mt-0.5">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Dropdown Chevron Indicator */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "bg-[#deb06c]/20 text-[#deb06c] rotate-180"
                            : "bg-zinc-800/80 text-zinc-400 group-hover:bg-[#deb06c]/20 group-hover:text-[#deb06c]"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4.5 pt-0.5 sm:px-5 sm:pb-5">
                            <div className="border-t border-zinc-800/80 pt-3.5 space-y-3">
                              {renderDescription(item.desc)}

                              {/* Optional Photos if attached to this day */}
                              {(item.image1 || item.image2) && (
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                  {item.image1 && (
                                    <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden border border-zinc-800 shadow-xs">
                                      <Image
                                        src={item.image1}
                                        alt={`${item.title} preview 1`}
                                        fill
                                        sizes="(max-width: 640px) 50vw, 25vw"
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                      />
                                    </div>
                                  )}
                                  {item.image2 && (
                                    <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden border border-zinc-800 shadow-xs">
                                      <Image
                                        src={item.image2}
                                        alt={`${item.title} preview 2`}
                                        fill
                                        sizes="(max-width: 640px) 50vw, 25vw"
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Center Photo + Package Includes & Excludes Card */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {/* Photo Card */}
              <div className="md:col-span-6 relative min-h-[320px] md:min-h-[480px] rounded-2xl overflow-hidden shadow-lg border border-zinc-800 group">
                <Image
                  src={centerImage || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332956/backgrounds/hotelBgImage.png"}
                  alt="Resort Luxury Stay"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white border border-[#deb06c]/30">
                    Handpicked Luxury Stay
                  </span>
                </div>
              </div>

              {/* Package Inclusions & Exclusions Card */}
              <div className="md:col-span-6 bg-[#101726] border border-zinc-800/90 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  {/* Segmented Tab Switcher: Inclusions vs Exclusions */}
                  <div className="flex items-center p-1 bg-[#0b101b] rounded-xl border border-zinc-800/90 mb-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab("inclusions")}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        activeTab === "inclusions"
                          ? "bg-[#deb06c] text-zinc-950 shadow-sm"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Includes ({inclusions.length})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("exclusions")}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        activeTab === "exclusions"
                          ? "bg-[#deb06c] text-zinc-950 shadow-sm"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Excludes ({exclusions.length})</span>
                    </button>
                  </div>

                  {/* Header for Active Tab */}
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-zinc-800">
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      {activeTab === "inclusions" ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-[#deb06c]" />
                          <span>Package Includes</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full bg-rose-400" />
                          <span>Package Excludes</span>
                        </>
                      )}
                    </h3>
                    <span className="text-[11px] text-zinc-400">
                      {activeTab === "inclusions"
                        ? `${inclusions.length} covered`
                        : `${exclusions.length} excluded`}
                    </span>
                  </div>

                  {/* Checklist List Container (fixed height ensures no layout shift between tabs) */}
                  <div className="min-h-[175px] max-h-[210px] overflow-y-auto pr-1">
                    {activeTab === "inclusions" ? (
                      <ul className="space-y-2.5">
                        {inclusions.map((inc, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                            <div className="w-4 h-4 rounded-full bg-[#deb06c]/15 flex items-center justify-center shrink-0 mt-0.5 border border-[#deb06c]/40">
                              <Check className="w-2.5 h-2.5 text-[#deb06c] stroke-[3]" />
                            </div>
                            <span className="font-medium leading-relaxed">{inc}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="space-y-2.5">
                        {exclusions.map((exc, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                            <div className="w-4 h-4 rounded-full bg-rose-500/15 flex items-center justify-center shrink-0 mt-0.5 border border-rose-500/30">
                              <X className="w-2.5 h-2.5 text-rose-400 stroke-[3]" />
                            </div>
                            <span className="font-medium leading-relaxed">{exc}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="bg-[#0b101b] rounded-xl p-4 text-center mt-5 border border-zinc-800 shadow-inner">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    Starting from
                  </div>
                  <div
                    className="text-2xl sm:text-3xl font-bold text-white mt-0.5"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    ₹ {price}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {priceUnit}
                  </div>

                  <button
                    type="button"
                    onClick={onOpenQuote}
                    className="w-full bg-[#deb06c] hover:bg-[#c99a53] text-zinc-950 font-bold rounded-full py-3 px-6 text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#deb06c]/10 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
