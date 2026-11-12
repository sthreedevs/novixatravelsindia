"use client";

import React from "react";
import Image from "next/image";

export default function ServicePartnersBar({
  tag,
  title = "Our Trusted Partners",
  subtitle = "We work with reputed embassies, consulates and service providers to ensure a smooth and secure visa process.",
  partners = [],
  showMore = true,
  moreText = "and more...",
  className = "",
}) {
  const colCount = partners.length + (showMore ? 1 : 0);

  // Dynamic grid classes based on total items
  const getGridColsClass = () => {
    if (colCount <= 6) {
      return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6";
    }
    if (colCount <= 8) {
      return "grid-cols-2 sm:grid-cols-4 lg:grid-cols-8";
    }
    return "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6";
  };

  return (
    <section className={`py-14 sm:py-16 bg-[#07080c] text-white ${className}`}>
      <div className="w-full px-4 lg:px-10">
        {/* Header */}
        <div className="text-left mb-5 sm:mb-6">
          {tag && (
            <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase block mb-1.5">
              {tag}
            </span>
          )}
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Dark Horizontal Strip with subtle vertical dividers */}
        <div className="bg-[#0c0e15] rounded-2xl p-4 sm:p-5 shadow-2xl border border-zinc-800/80">
          <div
            className={`grid ${getGridColsClass()} gap-y-4 lg:gap-y-0 lg:divide-x lg:divide-zinc-800/80 items-center`}
          >
            {partners.map((partner, idx) => (
              <div
                key={partner.name || idx}
                className="flex items-center justify-center px-3 sm:px-4 lg:px-5 h-14 group"
              >
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={partner.width || 120}
                    height={partner.height || 40}
                    className={`${
                      partner.className || "h-7 sm:h-8"
                    } w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
                  />
                ) : partner.customRender ? (
                  partner.customRender
                ) : (
                  <span className="font-semibold text-xs sm:text-sm text-zinc-300 group-hover:text-white transition-colors">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}

            {/* Optional "and more..." cell */}
            {showMore && (
              <div className="flex items-center justify-center px-3 sm:px-4 lg:px-5 h-14">
                <span className="text-xs sm:text-sm italic font-normal text-zinc-400 tracking-wide whitespace-nowrap">
                  {moreText}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
