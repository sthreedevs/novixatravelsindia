"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function PackagesBottomCtaBanner({ onOpenEnquiry }) {
  const whatsappNumber = "919876543210"; // Novixa concierge line
  const whatsappMessage = encodeURIComponent(
    "Hi Novixa Travels! I'm exploring your Holiday Packages and would love a customized quote tailored to my travel style and budget."
  );

  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-16 lg:py-20 bg-[#060c18]">
      {/* Background Image & Rich Night Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332956/backgrounds/hotelBgImage.png"
          alt="Luxury Resort Night Ambience"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040914]/95 via-[#07152b]/90 to-[#040914]/95 pointer-events-none" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-10">
          {/* Left Side: Icon Badge + Copy */}
          <div className="flex items-start sm:items-center gap-5 sm:gap-6">
            {/* Circular Gold Globe & Airplane Badge */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#deb06c]/50 bg-[#deb06c]/10 flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(222,176,108,0.25)]">
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9 text-[#deb06c]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Globe */}
                <circle cx="12" cy="12" r="8" />
                <path d="M4 12h16" />
                <path d="M12 4a12 12 0 0 1 0 16" />
                <path d="M12 4a12 12 0 0 0 0 16" />
                {/* Looping Airplane */}
                <path
                  d="M2 17c4-5 12-7 18-3"
                  strokeWidth="1.8"
                  strokeDasharray="2 2"
                />
                <path
                  d="M20 14l2 1-1 2-2-1z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Text Hierarchy */}
            <div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Not sure where to go?
              </h2>
              <p className="text-zinc-200 text-sm sm:text-base font-medium mt-1">
                Let us create a personalized travel plan just for you.
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
                Your dream destination is just a message away.
              </p>
            </div>
          </div>

          {/* Right Side: Dual Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3.5 w-full sm:w-auto">
            {/* Custom Quote Gold Button */}
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#deb06c] hover:bg-[#d49e52] text-zinc-950 font-bold px-7 py-3.5 rounded-full text-sm shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* WhatsApp Chat Button */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-7 py-3.5 rounded-full text-sm shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <FaWhatsapp className="w-4 h-4 text-white text-base" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

