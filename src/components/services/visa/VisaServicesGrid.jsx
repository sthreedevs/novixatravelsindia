"use client";

import React from "react";
import { ArrowRight, Plane, Briefcase, Route } from "lucide-react";

export default function VisaServicesGrid({
  data,
  onSelectCategory,
  onConsultationClick,
}) {
  const getIcon = (type) => {
    switch (type) {
      case "plane":
        return <Plane className="w-5 h-5 text-[#deb06c]" />;
      case "briefcase":
        return <Briefcase className="w-5 h-5 text-[#deb06c]" />;
      case "transit":
      default:
        return <Route className="w-5 h-5 text-[#deb06c]" />;
    }
  };

  return (
    <section className="bg-white text-zinc-900 py-7 sm:py-8 lg:py-9 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase">
              {data.tag || "OUR VISA SERVICES"}
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0b1325] leading-[1.16] tracking-tight">
              {data.title || "Visa Services for"}{" "}
              <span className="block text-[#0b1325] font-serif">
                {data.titleHighlight || "Every Journey"}
              </span>
            </h2>

            <p className="text-zinc-600 text-xs sm:text-[13px] leading-relaxed max-w-sm">
              {data.description ||
                "We provide end-to-end visa assistance for individuals, families and groups with a hassle-free experience."}
            </p>

            <div className="pt-1">
              <button
                onClick={onConsultationClick}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#deb06c] text-[#b88636] hover:bg-[#deb06c] hover:text-black font-semibold text-xs tracking-wide transition-all duration-300 shadow-xs cursor-pointer group"
              >
                <span>{data.ctaText || "Get a Free Consultation"}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right 3 Visa Category Cards Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {data.categories.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectCategory && onSelectCategory(item.id)}
                  className="bg-white border border-zinc-200/80 rounded-2xl p-3.5 sm:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#deb06c] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-start cursor-pointer group min-h-[190px]"
                >
                  {/* Two-tone Gold & Dark Circular Icon Badge */}
                  <div className="w-11 h-11 rounded-full bg-[#fde3b0] flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-[#fbd896] transition-all duration-300 shadow-xs">
                    <div className="w-8.5 h-8.5 rounded-full bg-[#0a1120] flex items-center justify-center">
                      {getIcon(item.iconType)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-xs sm:text-[13px] text-zinc-900 group-hover:text-[#b88636] transition-colors leading-snug mb-1">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] sm:text-[11px] text-zinc-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
