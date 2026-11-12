"use client";

import React from "react";
import { ArrowRight, Globe, RotateCw, Zap, FileText } from "lucide-react";

export default function PassportServicesGrid({
  data,
  onSelectService,
  onGetStarted,
}) {
  const getIcon = (type) => {
    switch (type) {
      case "globe":
        return <Globe className="w-4 h-4 sm:w-5 sm:h-6 text-[#deb06c]" />;
      case "reissue":
        return <RotateCw className="w-4 h-4 sm:w-5 sm:h-6 text-[#deb06c]" />;
      case "tatkal":
        return <Zap className="w-4 h-4 sm:w-5 sm:h-6 text-[#deb06c] fill-[#deb06c]" />;
      case "document":
      default:
        return <FileText className="w-4 h-4 sm:w-5 sm:h-6 text-[#deb06c]" />;
    }
  };

  return (
    <section className="bg-white text-zinc-900 py-7 sm:py-8 lg:py-9 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase">
              {data.tag || "OUR PASSPORT SERVICES"}
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0b1325] leading-[1.16] tracking-tight">
              {data.title || "We Handle Everything"}{" "}
              <span className="block text-[#0b1325] font-serif">
                {data.titleHighlight || "For You"}
              </span>
            </h2>

            <p className="text-zinc-600 text-xs sm:text-[13px] leading-relaxed max-w-sm">
              {data.description ||
                "From document verification to final submission, we manage the entire process so you don't have to."}
            </p>

            <div className="pt-1">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#deb06c] text-[#b88636] hover:bg-[#deb06c] hover:text-black font-semibold text-xs tracking-wide transition-all duration-300 shadow-xs cursor-pointer group"
              >
                <span>{data.ctaText || "Get Started Now"}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right 4 Service Cards Grid (2x2 on mobile, 4 columns on large screens) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3.5">
              {data.services.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectService && onSelectService(item.id)}
                  className="bg-white border border-zinc-200/80 rounded-2xl p-3.5 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-[#deb06c] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-start cursor-pointer group min-h-0 sm:min-h-[190px]"
                >
                  {/* Two-tone Gold & Navy Circular Icon Badge */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#fde3b0] flex items-center justify-center mb-2.5 sm:mb-3.5 group-hover:scale-105 group-hover:bg-[#fbd896] transition-all duration-300 shadow-xs shrink-0">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#0a1120] flex items-center justify-center">
                      {getIcon(item.iconType)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-xs sm:text-[15px] text-zinc-900 group-hover:text-[#b88636] transition-colors leading-snug mb-1">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] sm:text-xs text-zinc-500 leading-relaxed">
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
