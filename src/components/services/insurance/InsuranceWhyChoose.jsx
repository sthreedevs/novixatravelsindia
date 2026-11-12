"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function InsuranceWhyChoose({
  data,
  onExploreCoverage,
}) {
  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-[#07080c] text-white">
      <div className="w-full px-4 lg:px-10">
        {/* Header with Title + Description + Explore CTA Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-10 lg:mb-12">
          <div className="max-w-2xl">
            {data.tag && (
              <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase block mb-1.5">
                {data.tag}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              {data.title || "Why Get Travel Insurance?"}
            </h2>
            {data.description && (
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                {data.description}
              </p>
            )}
          </div>

          {onExploreCoverage && (
            <button
              onClick={onExploreCoverage}
              className="self-start md:self-auto py-2.5 px-5 rounded-full border border-[#deb06c]/50 hover:border-[#deb06c] text-[#deb06c] hover:bg-[#deb06c]/10 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Explore Coverage</span>
              <ArrowRight className="w-4 h-4 text-[#deb06c]" />
            </button>
          )}
        </div>

        {/* 5 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {data.features?.map((feature) => (
            <div
              key={feature.id}
              className="group bg-[#0c0e15] border border-zinc-800/80 hover:border-[#deb06c]/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Two-tone Gold Outer Ring + Dark Inner Circle Badge */}
                <div className="w-11 h-11 rounded-full p-[1.5px] bg-gradient-to-br from-[#deb06c] via-[#deb06c]/40 to-transparent mb-3.5 shadow-sm group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-[#0a1120] flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-sm sm:text-base text-white tracking-tight group-hover:text-[#deb06c] transition-colors mb-1.5">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
