"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function TrainWhyChoose({ data, onCtaClick }) {
  // Map features by ID for precise column placement matching the design
  const featureMap = (data.features || []).reduce((acc, f) => {
    acc[f.id] = f;
    return acc;
  }, {});

  const col1Top = featureMap["confirmed"];
  const col1Bottom = featureMap["pan-india"];

  const col2Top = featureMap["fare"];
  const col2Bottom = featureMap["corporate"];

  const col3 = featureMap["seat"];
  const col4 = featureMap["support"];

  const renderFeatureItem = (item) => {
    if (!item) return null;
    return (
      <div className="flex flex-col items-center text-center group py-2">
        {/* Circular Gold Outline Icon */}
        <div className="w-12 h-12 rounded-full border border-[#deb06c] flex items-center justify-center bg-black/30 backdrop-blur-xs mb-2.5 group-hover:scale-105 transition-transform shadow-md">
          {item.icon}
        </div>
        <h3 className="font-serif font-bold text-xs sm:text-sm text-white tracking-tight leading-snug mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {item.title}
        </h3>
        <p className="text-[10px] sm:text-[11px] text-zinc-300 leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {item.desc}
        </p>
      </div>
    );
  };

  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-16 lg:py-20 bg-[#07080c] text-white">
      {/* Background Image - High Clarity & Visibility */}
      {data.bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.bgImage}
            alt="Why Choose Novixa Train Travel"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center opacity-95"
          />
          {/* Subtle Left-Only Shadow for Text Legibility while keeping Center & Right Window fully clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#040814]/95 via-[#040814]/75 via-35% md:via-30% to-transparent pointer-events-none" />
          {/* Subtle top & bottom edges to seamlessly blend with page */}
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#07080c] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#07080c] to-transparent pointer-events-none" />
        </div>
      )}

      <div className="w-full px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Heading, Description & Action Button */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center">
            {data.tag && (
              <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase block mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                {data.tag}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              {data.title || "Your Train Journey, Our Priority"}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] max-w-md">
              {data.description}
            </p>

            <div>
              <button
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 py-2 px-5 rounded-full border border-[#deb06c] text-[#deb06c] hover:bg-[#deb06c] hover:text-zinc-950 font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-md group"
              >
                <span>Why Travel with Us</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Columns (Free-floating without lines) */}
          <div className="lg:col-span-8 xl:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch">
            {/* Column 1: Confirmed Ticket Booking (top) & Pan-India Network (bottom) */}
            <div className="flex flex-col justify-between gap-6 sm:gap-8">
              {renderFeatureItem(col1Top)}
              {renderFeatureItem(col1Bottom)}
            </div>

            {/* Column 2: Best Fare Guarantee (top) & Group & Corporate Bookings (bottom) */}
            <div className="flex flex-col justify-between gap-6 sm:gap-8">
              {renderFeatureItem(col2Top)}
              {renderFeatureItem(col2Bottom)}
            </div>

            {/* Column 3: Seat & Coach Preference */}
            <div className="flex flex-col justify-start">
              {renderFeatureItem(col3)}
            </div>

            {/* Column 4: 24/7 Customer Support */}
            <div className="flex flex-col justify-start">
              {renderFeatureItem(col4)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

