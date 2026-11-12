"use client";

import React from "react";
import Image from "next/image";
import { packagesHeroData } from "@/data/services/packages.data";
import PackagesSearchBar from "./PackagesSearchBar";

export default function PackagesHeroSection({
  destination,
  setDestination,
  travelType,
  setTravelType,
  budget,
  setBudget,
  duration,
  setDuration,
  onSearch,
  destinationOptions,
}) {
  return (
    <section className="relative w-full overflow-visible pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 xl:pt-40 xl:pb-28">
      {/* Background Image & Luxury Vignettes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={packagesHeroData.bgImage}
          alt="Luxury Tropical Resort Overwater Bungalows"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Soft dark vignette on left so white text is crystal clear */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[52%] bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Top subtle navbar shadow */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/75 to-transparent pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Copy */}
          <div className="lg:col-span-7 space-y-4">
            {/* Category Tag */}
            <div className="inline-block">
              <span className="text-white text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                {packagesHeroData.tag}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-normal text-white tracking-tight leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {packagesHeroData.title}
            </h1>

            <p
              className="font-serif italic text-lg sm:text-xl lg:text-2xl text-amber-100/90 font-light leading-snug drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {packagesHeroData.subtitle}
            </p>

            <p className="text-zinc-200/90 text-sm sm:text-base leading-relaxed max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
              {packagesHeroData.description}
            </p>
          </div>

          {/* Right Column: Kept clear so the master artwork's airplane, polaroids & passport are displayed cleanly */}
          <div className="lg:col-span-5 min-h-[260px] sm:min-h-[320px] pointer-events-none" />
        </div>
      </div>

      {/* Floating Filter Capsule Bar locked to exact bottom edge (50% in hero, 50% in grid below) */}
      <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-30 px-4 sm:px-6 lg:px-10 xl:px-14">
        <PackagesSearchBar
          destination={destination}
          setDestination={setDestination}
          travelType={travelType}
          setTravelType={setTravelType}
          budget={budget}
          setBudget={setBudget}
          duration={duration}
          setDuration={setDuration}
          onSearch={onSearch}
          destinationOptions={destinationOptions}
        />
      </div>
    </section>
  );
}

