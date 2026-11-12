"use client";

import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import DayTripsHeroSection from "@/components/services/day-trips/DayTripsHeroSection";
import DayTripsSearchBar from "@/components/services/day-trips/DayTripsSearchBar";
import PopularDayTripsSection from "@/components/services/day-trips/PopularDayTripsSection";
import DayTripsWhyChooseSection from "@/components/services/day-trips/DayTripsWhyChooseSection";
import DayTripDetailModal from "@/components/services/day-trips/DayTripDetailModal";
import HomeTestimonialsSection from "@/components/services/shared/HomeTestimonialsSection";
import ServiceFaqSupportSection from "@/components/services/shared/ServiceFaqSupportSection";
import { dayTripsFaqData, dayTripsSupportData } from "@/data/services/day-trips.data";
import { transformDayTripData } from "@/lib/utils";

export default function DayTripsClientPage({ initialTrips = [] }) {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchDestination, setSearchDestination] = useState("");

  // Only show trips that are in the database
  const displayTrips = useMemo(() => {
    return transformDayTripData(initialTrips);
  }, [initialTrips]);

  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const handleSearch = ({ destination }) => {
    setSearchDestination(destination);
    const el = document.getElementById("popular-day-trips");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (destination) {
      toast.info(`Filtering day trips for "${destination}"`);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Hero Section: Standardized Luxury Height & Sky Flourish */}
      <DayTripsHeroSection />

      {/* 2. Floating Horizontal Search Bar */}
      <DayTripsSearchBar
        onSearch={handleSearch}
        searchDestination={searchDestination}
        setSearchDestination={setSearchDestination}
      />

      {/* 3. Popular Day Trips Grid (Strictly dynamic backend trips from DB) */}
      <PopularDayTripsSection
        trips={displayTrips}
        activeFilter={searchDestination}
        onSelectTrip={handleSelectTrip}
      />

      {/* 4. Why Choose Novixa: 5 Pillars with Gold Circular Medals */}
      <DayTripsWhyChooseSection />

      {/* 5. Shared Testimonials Section: What Our Customers Say (Same across all service pages) */}
      <HomeTestimonialsSection
        eyebrow="TRAVELER STORIES"
        title="What Our Customers Say"
        subtitle="Real stories and experiences from happy travellers who explored unforgettable day trips with Novixa."
        containerClassName="w-full px-4 lg:px-10"
        scriptLine1="Same City ♡"
        scriptLine2="New Stories ✈"
      />

      {/* 6. Shared FAQ + Concierge Support Section (Same 3-column CTA+FAQ across all service pages) */}
      <ServiceFaqSupportSection
        faqs={dayTripsFaqData}
        {...dayTripsSupportData}
      />

      {/* 7. Interactive Day Trip Details & Booking Modal */}
      <DayTripDetailModal
        trip={selectedTrip}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fallbackTripId={initialTrips?.[0]?._id}
      />
    </div>
  );
}
