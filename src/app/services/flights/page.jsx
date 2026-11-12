"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import ServiceHeroShell from "@/components/services/shared/ServiceHeroShell";
import ServicePanoramicBanner from "@/components/services/shared/ServicePanoramicBanner";
import ServiceStepsSection from "@/components/services/shared/ServiceStepsSection";
import HomeTestimonialsSection from "@/components/services/shared/HomeTestimonialsSection";
import ServiceFaqSupportSection from "@/components/services/shared/ServiceFaqSupportSection";
import ServiceDestinationGrid from "@/components/services/shared/ServiceDestinationGrid";
import FlightQuoteForm from "@/components/services/flights/FlightQuoteForm";
import AirlinePartnersBar from "@/components/services/flights/AirlinePartnersBar";
import {
  flightHeroData,
  flightWhyChooseData,
  flightStepsData,
  popularRoutes,
  flightFaqs,
  flightSupportData,
} from "@/data/services/flights.data";

export default function FlightBooking() {
  const [selectedCity, setSelectedCity] = useState("");

  const handleSelectRoute = (city) => {
    setSelectedCity(city);
    const formEl = document.getElementById("flight-quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    toast.info(`Selected ${city}! Complete dates above to get a quote.`);
  };

  const handleScrollToForm = () => {
    const formEl = document.getElementById("flight-quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Hero Section with Flight Quote Form */}
      <ServiceHeroShell {...flightHeroData}>
        <FlightQuoteForm
          selectedCity={selectedCity}
          onResetSelectedCity={() => setSelectedCity("")}
        />
      </ServiceHeroShell>

      {/* 2. Popular Routes Cards (2x2 on mobile, 4 columns on desktop) */}
      <ServiceDestinationGrid
        tag="POPULAR DESTINATIONS"
        title="Explore Top Flight Routes"
        description="From bustling cities to serene islands, find flights to your favourite destinations."
        viewAllLink="/destination"
        items={popularRoutes}
        onSelect={handleSelectRoute}
      />

      {/* 3. Why Choose Novixa Panoramic Banner */}
      <ServicePanoramicBanner {...flightWhyChooseData} />

      {/* 4. How It Works (2x2 on mobile, 4 columns on desktop) */}
      <ServiceStepsSection
        tag="HOW IT WORKS"
        title="Simple Steps to Book Your Flight"
        steps={flightStepsData}
      />

      {/* 5. Airline Partners Bar (Dark horizontal strip with 8 items) */}
      <AirlinePartnersBar />

      {/* 6. What Our Customers Say (Home Page Testimonial Section) */}
      <HomeTestimonialsSection
        eyebrow="CLIENT STORIES"
        title="What Our Customers Say"
        subtitle="Real stories and experiences from happy travellers who flew with Novixa Travels."
        containerClassName="w-full px-4 lg:px-10"
        scriptLine1="Smooth Flights ♡"
        scriptLine2="Happy Travellers ✈"
      />

      {/* 7. Frequently Asked Questions, Center Visual Banner, & Support CTA */}
      <ServiceFaqSupportSection
        title="Frequently Asked Questions"
        faqs={flightFaqs}
        centerBannerImage={flightSupportData.centerBannerImage}
        centerBannerScriptLine1={flightSupportData.centerBannerScriptLine1}
        centerBannerScriptLine2={flightSupportData.centerBannerScriptLine2}
        supportTitle={flightSupportData.title}
        supportSubtitle={flightSupportData.subtitle}
        whatsAppNumber={flightSupportData.whatsAppNumber}
        whatsAppMessage={flightSupportData.whatsAppMessage}
        whatsAppText={flightSupportData.whatsAppText}
        phoneNumber={flightSupportData.phoneNumber}
        displayPhone={flightSupportData.displayPhone}
        trustText={flightSupportData.trustText}
        containerClassName="w-full px-4 lg:px-10"
      />
    </div>
  );
}
