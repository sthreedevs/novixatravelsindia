"use client";

import React from "react";
import Image from "next/image";
import { Anchor, Compass, FileCheck2, Headphones, ArrowRight } from "lucide-react";

export default function WhyChooseCruiseSection() {
  const scrollToForm = () => {
    const formElement = document.getElementById("cruise-quote-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const features = [
    {
      icon: <Anchor className="w-4 h-4 sm:w-5 sm:h-5 text-[#deb06c] stroke-[1.8]" />,
      title: "Trusted Cruise Partners",
      desc: "We work with top global cruise lines for the best experiences and value.",
    },
    {
      icon: <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#deb06c] stroke-[1.8]" />,
      title: "Customized Itineraries",
      desc: "Tailor-made packages to match your travel style and budget.",
    },
    {
      icon: <FileCheck2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#deb06c] stroke-[1.8]" />,
      title: "Hassle-Free Planning",
      desc: "Visa, transfers, excursions and more — all taken care of for you.",
    },
    {
      icon: <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-[#deb06c] stroke-[1.8]" />,
      title: "Dedicated Support",
      desc: "24/7 assistance, before, during and after your cruise journey.",
    },
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-20 overflow-hidden border-y border-[#deb06c]/20">
      {/* Background with user-provided whyCruiseBg.png */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332966/backgrounds/whyCruiseBg.png"
          alt="Why Choose Novixa Cruise"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft oceanic deep gradient: keeps left text crisp while letting right nautical helm show */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031326]/95 via-[#031326]/85 via-40% to-[#031326]/35" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column (Headline + Intro + Gold Border CTA) */}
          <div className="lg:col-span-4 space-y-3 lg:pr-4">
            <div className="text-[#deb06c] text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase">
              WHY CHOOSE NOVIXA
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.14]">
              Your Dream Cruise, <br className="hidden sm:inline" />
              Our Expertise
            </h2>
            <p className="text-white/85 text-xs sm:text-[13px] leading-relaxed max-w-sm pt-1 pb-2">
              We make your cruise holiday simple, seamless and unforgettable.
              From choosing the right cruise line to planning shore excursions,
              we handle it all — so you can just relax and enjoy.
            </p>
            <div>
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#deb06c] text-white hover:bg-[#deb06c] hover:text-black font-semibold text-xs sm:text-[13px] transition-all duration-200 cursor-pointer group"
              >
                <span>Why Travel with Us</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2] text-[#deb06c] group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right 4 Columns: 2x2 grid on mobile, 4 columns on desktop with vertical divider lines */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3.5 gap-y-6 sm:gap-5 lg:gap-0">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between py-1 lg:border-l lg:border-white/20 lg:pl-5 lg:pr-3"
              >
                <div>
                  {/* Thin Gold Circular Ring with Gold Outline Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#deb06c] flex items-center justify-center mb-2.5 sm:mb-3.5 text-[#deb06c] bg-transparent">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-[#deb06c] text-xs sm:text-[13.5px] mb-1 sm:mb-1.5 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-white/85 text-[10.5px] sm:text-xs leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
