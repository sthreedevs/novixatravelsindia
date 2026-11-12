"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function ServiceStepsSection({
  tag = "HOW IT WORKS",
  title = "Simple Steps to Book",
  subtitle,
  steps = [],
}) {
  return (
    <section className="pt-8 sm:pt-10 md:pt-12 pb-16 md:pb-20 w-full bg-[#07080c] text-white">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Left-aligned Header */}
        <div className="max-w-2xl mb-8 sm:mb-10 lg:mb-12">
          {tag && (
            <span className="text-[11px] sm:text-xs font-semibold text-[#deb06c] tracking-[0.22em] uppercase block mb-2">
              {tag}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Steps Grid: 2x2 grid on mobile/tablet, 4 or 5 columns on desktop based on steps.length */}
        <div
          className={`grid grid-cols-2 ${
            steps.length === 5
              ? "sm:grid-cols-3 lg:grid-cols-5 gap-x-3 sm:gap-x-5 lg:gap-x-6"
              : "lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-10"
          } gap-y-8 sm:gap-y-10 relative`}
        >
          {steps.map((step, idx) => (
            <div
              key={step.num || idx}
              className="relative flex flex-col items-center text-center"
            >
              {/* Icon Circle with bottom-left Number Badge */}
              <div className="relative mb-3.5 sm:mb-5">
                {/* Soft golden circular badge */}
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[#f8d99f] to-[#deb06c] flex items-center justify-center shadow-[0_4px_16px_rgba(222,176,108,0.25)]">
                  {step.icon}
                </div>

                {/* Step number on the bottom-left: Gold circle with bold dark number */}
                <span className="absolute -bottom-1 -left-1 w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#deb06c] text-zinc-950 font-bold text-[10px] sm:text-[11px] flex items-center justify-center border-2 border-[#07080c] shadow-sm">
                  {step.num}
                </span>
              </div>

              {/* Right Arrow: exactly centered halfway between this column and next column (only on desktop lg:) */}
              {idx < steps.length - 1 && (
                <div
                  className="hidden lg:flex items-center justify-center absolute top-7 sm:top-8 -translate-y-1/2 translate-x-1/2 pointer-events-none"
                  style={{ right: steps.length === 5 ? "-12px" : "-20px" }}
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.2] text-zinc-400" />
                </div>
              )}

              {/* Title & Description (Center-aligned) */}
              <h3 className="font-serif font-bold text-sm sm:text-base lg:text-[17px] text-white mb-1 leading-snug">
                {step.title}
              </h3>
              <p className="text-[11px] sm:text-xs lg:text-[13px] text-zinc-400 leading-relaxed max-w-[170px] sm:max-w-[210px] lg:max-w-[250px] mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
