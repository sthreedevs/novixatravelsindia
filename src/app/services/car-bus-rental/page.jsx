"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import ServiceHeroShell from "@/components/services/shared/ServiceHeroShell";
import ServiceDestinationGrid from "@/components/services/shared/ServiceDestinationGrid";
import HomeTestimonialsSection from "@/components/services/shared/HomeTestimonialsSection";
import ServiceFaqSupportSection from "@/components/services/shared/ServiceFaqSupportSection";
import CarRentalQuoteForm from "@/components/services/cars/CarRentalQuoteForm";
import QuickServicePills from "@/components/services/cars/QuickServicePills";
import VehicleSubServiceShowcase from "@/components/services/cars/VehicleSubServiceShowcase";
import {
  carHeroData,
  popularCarDestinations,
  carFaqs,
  carSupportData,
} from "@/data/services/cars.data";

export default function CarBusRentalPage() {
  const [selectedRoute, setSelectedRoute] = useState("");

  const handleSelectRoute = (city) => {
    setSelectedRoute(city);
    const formEl = document.getElementById("car-quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    toast.info(`Selected ${city}! Complete pickup details above to get a quote.`);
  };

  const handleScrollToForm = () => {
    const formEl = document.getElementById("car-quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Hero Section with Request a Ride / Transfer Form */}
      <ServiceHeroShell {...carHeroData}>
        <CarRentalQuoteForm
          selectedRoute={selectedRoute}
          onResetSelectedRoute={() => setSelectedRoute("")}
        />
      </ServiceHeroShell>

      {/* 2. 3 Quick Service Overview Navigation Pills (Car Rentals | Taxi Booking | Airport Transfers) */}
      <QuickServicePills />

      {/* 3. Detailed Sub-Service Blocks (Car Rentals, Taxi Booking, Airport Transfers) */}
      <VehicleSubServiceShowcase />

      {/* 4. Popular Destinations for Car Rentals, Taxis & Transfers (Horizontal Slider Design) */}
      <ServiceDestinationGrid
        variant="carousel"
        title="Popular Destinations for Car Rentals, Taxis & Transfers"
        description="Explore our most popular routes and destinations for a seamless travel experience."
        viewAllLink="/destination"
        items={popularCarDestinations}
        onSelect={handleSelectRoute}
      />

      {/* 5. What Our Customers Say (Home Page Testimonial Section) */}
      <HomeTestimonialsSection
        eyebrow="RIDER STORIES"
        title="What Our Customers Say"
        subtitle="Real stories and experiences from happy travellers who booked car rentals and transfers with Novixa."
        containerClassName="w-full px-4 lg:px-10"
        scriptLine1="Smooth Rides ♡"
        scriptLine2="Happy Travellers ✈"
      />

      {/* 6. Frequently Asked Questions, Center Visual Banner, & Support CTA */}
      <ServiceFaqSupportSection
        title="Frequently Asked Questions"
        faqs={carFaqs}
        centerBannerImage={carSupportData.centerBannerImage}
        centerBannerScriptLine1={carSupportData.centerBannerScriptLine1}
        centerBannerScriptLine2={carSupportData.centerBannerScriptLine2}
        supportTitle={carSupportData.title}
        supportSubtitle={carSupportData.subtitle}
        whatsAppNumber={carSupportData.whatsAppNumber}
        whatsAppMessage={carSupportData.whatsAppMessage}
        whatsAppText={carSupportData.whatsAppText}
        phoneNumber={carSupportData.phoneNumber}
        displayPhone={carSupportData.displayPhone}
        trustText={carSupportData.trustText}
        containerClassName="w-full px-4 lg:px-10"
      />
    </div>
  );
}
