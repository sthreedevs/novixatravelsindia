"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Plane } from "lucide-react";
import { carSubServices } from "@/data/services/cars.data";

export default function VehicleSubServiceShowcase({ onSelectService }) {
  const { carRentals, taxiBooking, airportTransfers } = carSubServices;

  const handleCtaClick = (serviceName) => {
    const formEl = document.getElementById("car-quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (onSelectService) onSelectService(serviceName);
  };

  return (
    <div className="w-full space-y-16 sm:space-y-20 lg:space-y-24 pt-8 sm:pt-10 lg:pt-12 pb-6 sm:pb-8 lg:pb-10">
      {/* =========================================================================
          BLOCK 1: CAR RENTALS (Drive Your Own Adventure)
          CTA Block (Left Text at left:0 + Full Fleet Image) + Separate Category Card
      ========================================================================== */}
      <section id="car-rentals" className="w-full px-4 lg:px-10 scroll-mt-24">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-8">
          {/* 1. Main CTA Block: Text on left (left: 0), Fleet Image with soft left gradient dissolve */}
          <div className="w-full lg:flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
            {/* Left Text: starts flush at left 0, no enclosing card padding */}
            <div className="lg:col-span-5 space-y-3.5 pl-0 py-1">
              <span className="text-[11px] sm:text-xs font-semibold text-[#deb06c] tracking-[0.25em] uppercase block">
                {carRentals.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-bold text-white tracking-tight leading-[1.15]">
                {carRentals.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md">
                {carRentals.description}
              </p>

              {/* 3 Inline feature badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-0.5">
                {carRentals.badges.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#deb06c]/15 border border-[#deb06c]/30 flex items-center justify-center shrink-0">
                      {b.icon}
                    </div>
                    <div className="text-white text-xs leading-tight font-medium">
                      <div>{b.line1}</div>
                      <div className="text-zinc-400 text-[11px] font-normal">
                        {b.line2}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pill CTA button */}
              <div className="pt-1.5">
                <button
                  type="button"
                  onClick={() => handleCtaClick("Car Rental (Self-Drive)")}
                  className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#0c0e15] border border-[#deb06c]/50 hover:bg-[#deb06c] text-white hover:text-black transition-all duration-300 text-xs sm:text-sm font-semibold cursor-pointer shadow-lg group"
                >
                  <span>{carRentals.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#deb06c] group-hover:text-black transition-colors" />
                </button>
              </div>
            </div>

            {/* Middle/Right Image: Full width col-span-7 and height 340px */}
            <div className="lg:col-span-7 relative h-[260px] sm:h-[300px] lg:h-[340px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={carRentals.centerImage}
                alt="Car Rentals Fleet"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                priority
              />
              {/* Soft horizontal feathered gradient dissolve on the left */}
              <div className="absolute inset-y-0 left-0 w-28 sm:w-44 bg-gradient-to-r from-[#07080c] via-[#07080c]/60 to-transparent z-10 pointer-events-none" />
              <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#07080c] via-[#07080c]/50 to-transparent z-10 pointer-events-none" />

              {/* Script text over the sky */}
              <div className="absolute top-4 sm:top-5 left-8 sm:left-12 z-20 pointer-events-none font-handwriting text-2xl sm:text-3xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] leading-tight">
                <div>Your Ride,</div>
                <div>Your Journey</div>
                <svg
                  className="w-24 sm:w-28 h-3 text-[#deb06c] mt-0.5"
                  viewBox="0 0 140 12"
                  fill="none"
                >
                  <path
                    d="M2 9C35 3 105 2 138 8M80 7C95 10 110 11 125 8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 2. Separate Category Card on the Right: Height exactly matches CTA/Image (340px) */}
          <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0 bg-[#0c0e15] border border-zinc-800/90 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl flex flex-col justify-between h-auto lg:h-[340px]">
            <h3 className="font-serif text-sm sm:text-base font-bold text-white mb-3 lg:mb-2 tracking-tight">
              {carRentals.categoriesTitle}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:flex-col lg:justify-between lg:gap-0 flex-1">
              {carRentals.categories.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#deb06c]/10 border border-[#deb06c]/25 flex items-center justify-center shrink-0">
                    {cat.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-white leading-tight">
                      {cat.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-zinc-400 leading-tight mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOCK 2: TAXI BOOKING (Comfortable Rides, Anytime)
          REVERSED DESIGN: LEFT SIDE FULL PHOTO, RIGHT SIDE CONTENT
          Matching reference mockup exactly with crisp white category card
      ========================================================================== */}
      <section id="taxi-booking" className="w-full px-4 lg:px-10 scroll-mt-24">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-8">
          {/* Main Navy Card: Left side photo (full height, 0 padding), right side content */}
          <div className="w-full lg:flex-1 relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#060e1d] via-[#09182f] to-[#0c1f3d] shadow-2xl flex flex-col lg:flex-row items-stretch min-h-[340px] lg:h-[340px]">
            {/* 1. LEFT SIDE: Photo - fills 100% height from top to bottom, right edge dissolves into navy */}
            <div className="relative w-full lg:w-[48%] xl:w-[50%] h-[240px] sm:h-[280px] lg:h-full shrink-0 overflow-hidden">
              <Image
                src={taxiBooking.leftImage}
                alt="Taxi Service at Airport Terminal"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-left lg:object-[20%_center]"
                priority
              />
              {/* Soft horizontal feathered gradient dissolve on the RIGHT edge into the navy background */}
              <div className="hidden lg:block absolute inset-y-0 right-0 w-28 sm:w-40 bg-gradient-to-l from-[#09182f] via-[#09182f]/80 to-transparent z-10 pointer-events-none" />
              <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-[#060e1d] via-[#060e1d]/70 to-transparent z-10 pointer-events-none" />
            </div>

            {/* 2. RIGHT SIDE: Content */}
            <div className="w-full lg:flex-1 py-5 sm:py-6 px-5 sm:px-6 lg:pl-3 lg:pr-6 space-y-3.5 z-20 flex flex-col justify-center">
              <span className="text-[11px] sm:text-xs font-semibold text-[#deb06c] tracking-[0.25em] uppercase block">
                {taxiBooking.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[30px] xl:text-[32px] font-serif font-bold text-white tracking-tight leading-[1.15]">
                {taxiBooking.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md">
                {taxiBooking.description}
              </p>

              {/* 3 Badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-0.5">
                {taxiBooking.badges.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#deb06c]/20 border border-[#deb06c]/40 flex items-center justify-center shrink-0">
                      {b.icon}
                    </div>
                    <div className="text-white text-xs leading-tight font-medium">
                      <div>{b.line1}</div>
                      <div className="text-slate-300 text-[11px] font-normal">
                        {b.line2}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="pt-1.5">
                <button
                  type="button"
                  onClick={() => handleCtaClick("Taxi Booking (City / Outstation)")}
                  className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#060e1d] border border-[#deb06c]/60 hover:bg-[#deb06c] text-white hover:text-black transition-all duration-300 text-xs sm:text-sm font-semibold cursor-pointer shadow-lg group"
                >
                  <span>{taxiBooking.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#deb06c] group-hover:text-black transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Separate White Category Card on the Right (matches exact height 340px) */}
          <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0 bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl flex flex-col justify-between h-auto lg:h-[340px]">
            <h3 className="font-serif text-sm sm:text-base font-bold text-[#0a1830] mb-3 lg:mb-2 tracking-tight">
              {taxiBooking.categoriesTitle}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:flex-col lg:justify-between lg:gap-0 flex-1">
              {taxiBooking.categories.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#fef6ea] border border-[#deb06c]/30 flex items-center justify-center shrink-0">
                    {cat.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 leading-tight">
                      {cat.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-zinc-500 leading-tight mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOCK 3: AIRPORT TRANSFERS (Hassle-Free Airport Transfers)
          CTA Block (Left Text at left:0 + Full Passenger Image) + Separate Category Card
          Added generous spacing (pt-12 sm:pt-16 lg:pt-20) between Center and Bottom CTA
      ========================================================================== */}
      <section id="airport-transfers" className="w-full px-4 lg:px-10 scroll-mt-24">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-8">
          {/* 1. Main CTA Block: Text on left (left: 0), Passenger Image with soft left gradient dissolve */}
          <div className="w-full lg:flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
            {/* Left Text: starts flush at left 0, no enclosing card padding */}
            <div className="lg:col-span-5 space-y-3.5 pl-0 py-1">
              <span className="text-[11px] sm:text-xs font-semibold text-[#deb06c] tracking-[0.25em] uppercase block">
                {airportTransfers.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-bold text-white tracking-tight leading-[1.15]">
                {airportTransfers.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md">
                {airportTransfers.description}
              </p>

              {/* 4 Badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-0.5">
                {airportTransfers.badges.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#deb06c]/15 border border-[#deb06c]/30 flex items-center justify-center shrink-0">
                      {b.icon}
                    </div>
                    <div className="text-white text-xs leading-tight font-medium">
                      <div>{b.line1}</div>
                      <div className="text-zinc-400 text-[11px] font-normal">
                        {b.line2}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="pt-1.5">
                <button
                  type="button"
                  onClick={() => handleCtaClick("Airport Transfer (Pickup / Drop)")}
                  className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#0c0e15] border border-[#deb06c]/50 hover:bg-[#deb06c] text-white hover:text-black transition-all duration-300 text-xs sm:text-sm font-semibold cursor-pointer shadow-lg group"
                >
                  <span>{airportTransfers.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#deb06c] group-hover:text-black transition-colors" />
                </button>
              </div>
            </div>

            {/* Middle/Right Image: Full width col-span-7 and height 340px */}
            <div className="lg:col-span-7 relative h-[260px] sm:h-[300px] lg:h-[340px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={airportTransfers.centerImage}
                alt="Airport Transfer Passenger"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              {/* Soft horizontal feathered gradient dissolve on the left */}
              <div className="absolute inset-y-0 left-0 w-28 sm:w-44 bg-gradient-to-r from-[#07080c] via-[#07080c]/60 to-transparent z-10 pointer-events-none" />
              <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#07080c] via-[#07080c]/50 to-transparent z-10 pointer-events-none" />

              {/* Script text over the sky */}
              <div className="absolute top-4 sm:top-5 left-8 sm:left-12 z-20 pointer-events-none font-handwriting text-2xl sm:text-3xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] leading-tight">
                <div>From Airport</div>
                <div className="flex items-center gap-2">
                  <span>to Your Destination</span>
                  <Plane className="w-5 h-5 text-[#deb06c] rotate-45 shrink-0 inline-block" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Separate Category Card on the Right: Height matches CTA/Image (340px) */}
          <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0 bg-[#0c0e15] border border-zinc-800/90 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl flex flex-col justify-between h-auto lg:h-[340px]">
            <h3 className="font-serif text-sm sm:text-base font-bold text-white mb-3 lg:mb-2 tracking-tight">
              {airportTransfers.categoriesTitle}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:flex-col lg:justify-between lg:gap-0 flex-1">
              {airportTransfers.categories.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#deb06c]/10 border border-[#deb06c]/25 flex items-center justify-center shrink-0">
                    {cat.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-white leading-tight">
                      {cat.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-zinc-400 leading-tight mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
