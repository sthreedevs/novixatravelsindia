"use client";

import React from "react";
import Image from "next/image";

function HeroLeftContent({
  tag,
  title,
  titleHighlight,
  titleHighlightFont,
  titleClassName,
  highlightClassName,
  description,
  badges,
  scriptNote,
  scriptSuffix = "♡",
}) {
  return (
    <div className="space-y-4 max-w-xl relative">
      {/* Ambient cloud glow strictly behind text */}
      <div className="absolute -inset-6 -z-10 bg-gradient-to-r from-slate-950/40 via-slate-950/20 to-transparent rounded-3xl blur-2xl pointer-events-none" />

      {/* Category Tag */}
      {tag && (
        <div className="text-[#deb06c] text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
          {tag}
        </div>
      )}

      {/* Headline */}
      <h1
        className={
          titleClassName ||
          "text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-bold text-white tracking-tight leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
        }
      >
        <span className="font-luxury font-bold block">{title}</span>
        {titleHighlight && (
          <span
            className={
              highlightClassName ||
              (titleHighlightFont === "handwriting"
                ? "font-handwriting font-normal text-[#deb06c] text-5xl sm:text-6xl lg:text-[68px] xl:text-[76px] block -mt-1 sm:-mt-3"
                : "font-luxury italic font-normal text-[#deb06c] block")
            }
            style={
              titleHighlightFont === "handwriting"
                ? { fontFamily: '"Caveat", cursive, sans-serif' }
                : { fontFamily: '"Playfair Display", Georgia, serif' }
            }
          >
            {titleHighlight}
          </span>
        )}
      </h1>

      {/* Description */}
      {description && (
        <p className="text-white/95 text-sm sm:text-base leading-relaxed max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
          {description}
        </p>
      )}

      {/* Feature Badges in single horizontal row */}
      {badges && badges.length > 0 && (
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {badge.icon}
              <div className="text-white text-[11px] sm:text-xs leading-tight font-medium">
                {badge.line1 ? (
                  <>
                    <div>{badge.line1}</div>
                    {badge.line2 && <div>{badge.line2}</div>}
                  </>
                ) : (
                  <div>{badge.text}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Handwritten Script Flourish + Heart + Calligraphic Underline */}
      {scriptNote && (
        <div className="pt-2 inline-block">
          <div
            className="flex items-center gap-2 font-handwriting text-2xl sm:text-3xl lg:text-[34px] text-white tracking-wide"
            style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
          >
            <span>{scriptNote}</span>
            {scriptSuffix && <span className="text-[#deb06c] text-2xl font-bold">{scriptSuffix}</span>}
          </div>
          <svg
            className="w-48 sm:w-56 h-3 text-[#deb06c] mt-0.5"
            viewBox="0 0 200 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 9C50 3 150 2 198 8M120 7C140 10 160 11 180 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function ServiceHeroShell({
  tag,
  title,
  titleHighlight,
  titleHighlightFont = "serif", // "serif" | "handwriting"
  titleClassName,
  highlightClassName,
  description,
  bgImage,
  bgImageAlt = "Hero Background",
  bgPositionClass = "object-center",
  layoutVariant = "standard", // "standard" (6/6 grid) | "panoramic" (left text, open center, right form)
  badges = [],
  scriptNote,
  scriptSuffix,
  children,
}) {
  return (
    <section className="relative w-full overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 xl:pt-40 xl:pb-28 min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] xl:min-h-[700px] flex items-center">
      {/* Background Image & Non-intrusive Vignettes */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt={bgImageAlt}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${bgPositionClass}`}
          />
          {/* Left subtle shadow to guarantee text legibility while keeping center car & right sunset crisp */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[48%] bg-gradient-to-r from-[#07080c]/90 via-[#07080c]/60 via-35% to-transparent pointer-events-none" />
          {/* Top subtle navbar shadow */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#07080c]/80 via-[#07080c]/40 to-transparent pointer-events-none" />
          {/* Bottom subtle blend into background */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#07080c] to-transparent pointer-events-none" />
        </div>
      )}

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        {layoutVariant === "panoramic" ? (
          /* Panoramic 3-Zone Layout: Left Text | Open Center (Shows Vehicle/Focal Subject) | Right Form Card */
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
            {/* 1. LEFT ZONE: Unified Headline, Description, Badges */}
            <div className="w-full lg:w-[44%] xl:w-[40%]">
              <HeroLeftContent
                tag={tag}
                title={title}
                titleHighlight={titleHighlight}
                titleHighlightFont={titleHighlightFont}
                titleClassName={titleClassName}
                highlightClassName={highlightClassName}
                description={description}
                badges={badges}
                scriptNote={scriptNote}
                scriptSuffix={scriptSuffix}
              />
            </div>

            {/* 2. CENTER OPEN ZONE: Completely unoccupied so Toyota SUV on coastal road is visible */}
            <div className="hidden lg:block lg:flex-1 min-w-[40px] xl:min-w-[80px] pointer-events-none" />

            {/* 3. RIGHT ZONE: Compact Form Card */}
            {children && (
              <div className="w-full lg:w-[40%] xl:w-[36%] max-w-[420px] lg:ml-auto flex justify-center lg:justify-end">
                {children}
              </div>
            )}
          </div>
        ) : (
          /* Standard 2-Column Grid (used by Flights, etc.) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-6">
              <HeroLeftContent
                tag={tag}
                title={title}
                titleHighlight={titleHighlight}
                titleHighlightFont={titleHighlightFont}
                titleClassName={titleClassName}
                highlightClassName={highlightClassName}
                description={description}
                badges={badges}
                scriptNote={scriptNote}
                scriptSuffix={scriptSuffix}
              />
            </div>
            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
              {children}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
