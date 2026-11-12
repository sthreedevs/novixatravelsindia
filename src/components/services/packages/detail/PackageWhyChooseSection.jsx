"use client";

import React from "react";
import Image from "next/image";
import { Home, UtensilsCrossed, Compass, Sun, Clock } from "lucide-react";

export default function PackageWhyChooseSection({ whyChoose }) {
  if (!whyChoose) return null;

  const { title, description, features, gallery } = whyChoose;

  const getFeatureIcon = (iconName) => {
    switch (iconName) {
      case "villa":
        return <Home className="w-5 h-5 text-zinc-800" />;
      case "dinner":
        return <UtensilsCrossed className="w-5 h-5 text-zinc-800" />;
      case "snorkel":
        return <Compass className="w-5 h-5 text-zinc-800" />;
      case "cruise":
        return <Sun className="w-5 h-5 text-zinc-800" />;
      case "itinerary":
      default:
        return <Clock className="w-5 h-5 text-zinc-800" />;
    }
  };

  return (
    <section className="w-full bg-white pt-16 sm:pt-20 lg:pt-24 pb-14 border-b border-zinc-200/70">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Description & 5 Circular Feature Badges */}
          <div className="lg:col-span-6 space-y-4">
            <h2
              className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-zinc-900 tracking-tight"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {title}
            </h2>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-xl">
              {description}
            </p>

            {/* 5 Circular Feature Badges in Single Horizontal Row */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-6 pb-2 text-center">
              {features?.map((feat, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="w-12 h-12 rounded-full border border-zinc-200 bg-zinc-50 group-hover:border-[#deb06c] group-hover:bg-[#deb06c]/10 flex items-center justify-center transition-all duration-200 shadow-sm mb-2">
                    {getFeatureIcon(feat.icon)}
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-zinc-800 leading-tight">
                    {feat.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3-Photo Gallery Collage */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-12 gap-3.5 sm:gap-4 h-[320px] sm:h-[380px]">
              {/* Left Tall Photo (Overwater Bungalows Aerial) */}
              <div className="col-span-7 relative rounded-2xl overflow-hidden shadow-md group">
                <Image
                  src={gallery?.main || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332952/backgrounds/hotelsHero.png"}
                  alt="Overwater Bungalows Aerial"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Right 2 Stacked Photos */}
              <div className="col-span-5 grid grid-rows-2 gap-3.5 sm:gap-4 h-full">
                {/* Top: Romantic Beach Dinner */}
                <div className="relative rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src={gallery?.top || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332956/backgrounds/hotelBgImage.png"}
                    alt="Romantic Beach Sunset Dinner"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom: Coral Reef Snorkeling */}
                <div className="relative rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src={gallery?.bottom || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332968/destinations/cruise-thailand.png"}
                    alt="Lagoon Snorkeling Experience"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

