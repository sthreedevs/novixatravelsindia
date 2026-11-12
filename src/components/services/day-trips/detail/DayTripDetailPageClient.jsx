"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import DayTripDetailHero from "./DayTripDetailHero";
import DayTripSpecsBar from "./DayTripSpecsBar";
import DayTripItineraryTimeline from "./DayTripItineraryTimeline";
import DayTripHighlightsGallery from "./DayTripHighlightsGallery";
import DayTripInfoCards from "./DayTripInfoCards";
import DayTripBookingCard from "./DayTripBookingCard";
import ExploreMoreDayTripsSection from "./ExploreMoreDayTripsSection";

export default function DayTripDetailPageClient({ trip }) {
  const handleScrollToQuote = () => {
    const el = document.getElementById("day-trip-quote-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (!trip) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#07080c] text-white">
        <p className="text-stone-400">Day trip details not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-900 selection:bg-[#deb06c] selection:text-black pb-20 lg:pb-0">
      {/* 1. Dark Luxury Hero Section with breadcrumbs, title, cursive flourish, badges & rating */}
      <DayTripDetailHero
        trip={trip}
        onEnquireClick={handleScrollToQuote}
      />

      {/* 2. Floating 5-Column Key Specs Bar (Destination, Duration, Tour Type, Pickup, Language) */}
      <DayTripSpecsBar specs={trip.specs} />

      {/* 3. Main Content Section (Responsive Grid: Sits right after Itinerary on mobile, 2-column sticky on desktop) */}
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pt-10 sm:pt-14 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* 1. Suggested Itinerary & Overview (Order 1 on mobile, Left col row 1 on desktop) */}
          <div className="order-1 lg:col-span-8 lg:row-start-1 lg:col-start-1">
            <DayTripItineraryTimeline
              experience={trip.experience}
              itinerary={trip.itinerary}
              itinerarySubtitle={trip.itinerarySubtitle}
            />
          </div>

          {/* 2. Responsive Enquiry Card (Order 2 on mobile: sits right after itinerary where user decision intent is highest; Right col sticky spanning rows 1 & 2 on desktop) */}
          <div className="order-2 lg:col-span-4 lg:row-start-1 lg:row-span-2 lg:col-start-9 relative">
            <div className="lg:sticky lg:top-24 xl:top-28 w-full flex justify-center lg:justify-end">
              <DayTripBookingCard trip={trip} />
            </div>
          </div>

          {/* 3. Highlights Checklist & Photos Gallery (Order 3 on mobile, Left col row 2 on desktop) */}
          <div className="order-3 lg:col-span-8 lg:row-start-2 lg:col-start-1">
            <DayTripHighlightsGallery
              highlights={trip.highlightsChecklist}
              gallery={trip.gallery}
            />
          </div>
        </div>

        {/* 4. Full Width 3-Column Info Cards (What's Included, Not Included, Know Before You Go) */}
        <div className="mt-12 sm:mt-16">
          <DayTripInfoCards
            inclusions={trip.inclusions}
            exclusions={trip.exclusions}
            knowBeforeYouGo={trip.knowBeforeYouGo}
          />
        </div>
      </section>

      {/* 4. Explore More Day Trips (Jaipur, Mathura Vrindavan, Rishikesh) */}
      <ExploreMoreDayTripsSection currentTripId={trip.slug || trip.id} />

      {/* 5. Mobile Floating Bottom Bar (Sticky High-Conversion Bar on Phones) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 py-2.5 px-4 sm:px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] lg:hidden flex items-center justify-between">
        <div className="min-w-0 pr-3">
          <span className="block text-[10px] text-stone-500 font-medium uppercase tracking-wider">
            Starting from
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold font-serif text-stone-900 tracking-tight">
              {trip?.startingPrice || "₹2,499"}
            </span>
            <span className="text-[11px] text-stone-500 font-medium">/ person</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleScrollToQuote}
          className="shrink-0 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 font-bold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Get Quote</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
