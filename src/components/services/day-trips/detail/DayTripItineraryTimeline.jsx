"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

export default function DayTripItineraryTimeline({
  experience,
  itinerary = [],
  itinerarySubtitle = "(Timings are indicative and can be customized)",
}) {
  const containerRef = useRef(null);
  const firstDotRef = useRef(null);
  const lastDotRef = useRef(null);

  const [lineStyle, setLineStyle] = useState({ top: 10, height: 0 });
  const [activeStep, setActiveStep] = useState(0);

  // Measure exact vertical distance from center of first dot to center of last dot
  useEffect(() => {
    const measure = () => {
      if (containerRef.current && firstDotRef.current && lastDotRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const firstDotRect = firstDotRef.current.getBoundingClientRect();
        const lastDotRect = lastDotRef.current.getBoundingClientRect();

        const top = firstDotRect.top - containerRect.top + firstDotRect.height / 2;
        const bottom = lastDotRect.top - containerRect.top + lastDotRect.height / 2;
        const height = Math.max(0, bottom - top);

        setLineStyle({ top, height });
      }
    };

    measure();
    window.addEventListener("resize", measure);
    const timeout = setTimeout(measure, 150);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(timeout);
    };
  }, [itinerary]);

  // Scroll Progress across the itinerary section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 45%"],
  });

  // Track active step as scroll progresses
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (itinerary.length > 1) {
      const stepIndex = Math.min(
        Math.floor(latest * itinerary.length + 0.15),
        itinerary.length - 1
      );
      setActiveStep(stepIndex);
    }
  });

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* 1. Overview Experience Header */}
      {experience && (
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-bold text-slate-900 tracking-tight leading-tight mb-3.5">
            {experience.title || "Your Day Trip Experience"}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            {experience.leadParagraph}
          </p>
        </div>
      )}

      {/* 2. Suggested Itinerary */}
      <div>
        <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 mb-7 sm:mb-9">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Itinerary
          </h3>
          <span className="text-sm sm:text-base text-slate-500 font-sans font-normal">
            {itinerarySubtitle}
          </span>
        </div>

        {/* Vertical Timeline with Scroll-Driven Connected Dots */}
        <div ref={containerRef} className="relative">
          {/* Continuous Inactive Background Track (Connects all dots without gaps) */}
          {lineStyle.height > 0 && (
            <div
              style={{
                top: `${lineStyle.top}px`,
                height: `${lineStyle.height}px`,
              }}
              className="absolute left-[7px] w-[2px] bg-stone-200 z-0"
            />
          )}

          {/* Active Scroll-Driven Fill Line (Animates down as user scrolls) */}
          {lineStyle.height > 0 && (
            <motion.div
              style={{
                top: `${lineStyle.top}px`,
                height: `${lineStyle.height}px`,
                scaleY: scrollYProgress,
                transformOrigin: "top",
              }}
              className="absolute left-[7px] w-[2px] bg-gradient-to-b from-[#deb06c] via-[#deb06c] to-[#b37f28] z-0"
            />
          )}

          {/* Itinerary Rows */}
          {itinerary.map((step, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === itinerary.length - 1;
            const isDotActive = activeStep >= idx;

            return (
              <div
                key={idx}
                className={`relative flex items-start gap-4 sm:gap-6 group ${
                  !isLast ? "pb-7 sm:pb-9" : ""
                }`}
              >
                {/* Track & Circular Bullet Node Column */}
                <div className="relative flex flex-col items-center shrink-0 w-4 pt-1">
                  {/* Circular Bullet Node */}
                  <div
                    ref={isFirst ? firstDotRef : isLast ? lastDotRef : null}
                    className={`w-4 h-4 rounded-full border-[2.5px] bg-white z-10 shrink-0 transition-all duration-300 flex items-center justify-center ${
                      isDotActive
                        ? "border-[#deb06c] shadow-[0_0_10px_rgba(222,176,108,0.5)] scale-110"
                        : "border-slate-900 group-hover:border-[#b37f28] group-hover:scale-110"
                    }`}
                  >
                    {isDotActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#deb06c]" />
                    )}
                  </div>
                </div>

                {/* Time Column (Compact on mobile, generous on tablet/desktop) */}
                <div className="shrink-0 w-22 sm:w-32 md:w-36 pt-0.5">
                  <span
                    className={`text-xs sm:text-base font-semibold tracking-tight block whitespace-nowrap transition-colors duration-200 ${
                      isDotActive
                        ? "text-slate-900"
                        : "text-slate-600"
                    }`}
                  >
                    {step.time}
                  </span>
                </div>

                {/* Title & Description Column */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <h4
                    className={`text-base sm:text-lg lg:text-xl font-serif font-bold leading-snug transition-colors duration-200 ${
                      isDotActive ? "text-slate-900" : "text-slate-800"
                    }`}
                  >
                    {step.title}
                  </h4>
                  {step.description && (
                    <p className="text-sm sm:text-[15px] text-slate-600 mt-1.5 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
