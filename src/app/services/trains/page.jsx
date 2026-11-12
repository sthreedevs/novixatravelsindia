"use client";

import React, { useState } from "react";
import ServiceHeroShell from "@/components/services/shared/ServiceHeroShell";
import ServiceStepsSection from "@/components/services/shared/ServiceStepsSection";
import HomeTestimonialsSection from "@/components/services/shared/HomeTestimonialsSection";
import ServiceFaqSupportSection from "@/components/services/shared/ServiceFaqSupportSection";
import RailQuoteModal from "@/components/services/shared/RailQuoteModal";
import TrainHorizontalSearch from "@/components/services/trains/TrainHorizontalSearch";
import TrainRoutesGrid from "@/components/services/trains/TrainRoutesGrid";
import TrainWhyChoose from "@/components/services/trains/TrainWhyChoose";
import TrainDestinationsGrid from "@/components/services/trains/TrainDestinationsGrid";
import {
  trainHeroData,
  popularTrainRoutes,
  trainWhyChooseData,
  trainDestinations,
  trainStepsData,
  trainFaqs,
  trainSupportData,
} from "@/data/services/trains.data";

export default function TrainBookingPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState({});

  const handleSearch = (searchData) => {
    setQuoteInitialData({
      from: searchData.fromCity || "",
      to: searchData.toCity || "",
      travelDate: searchData.travelDate || "",
      travelClass: searchData.travelClass || "all",
    });
    setQuoteModalOpen(true);
  };

  const handleSelectRoute = (route) => {
    const parts = String(route?.title || "").split(/\s*(?:to|→|-|–)\s*/i).filter(Boolean);
    setQuoteInitialData({
      from: parts[0] || "",
      to: parts[1] || route?.title || "",
      notes: route?.trainType ? `Preferred route: ${route.title} (${route.trainType})` : `Preferred route: ${route?.title}`,
    });
    setQuoteModalOpen(true);
  };

  const handleSelectDestination = (city) => {
    setQuoteInitialData({
      from: "",
      to: city || "",
      notes: `Train enquiry for destination: ${city}`,
    });
    setQuoteModalOpen(true);
  };

  const handleScrollToSearch = () => {
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Hero Section: Explore India & Beyond By Train */}
      <ServiceHeroShell {...trainHeroData} />

      {/* 2. Horizontal Search Bar: Find Your Perfect Train Journey */}
      <TrainHorizontalSearch onSearch={handleSearch} />

      {/* 3. Top Train Routes in India (5 Landscape Cards) */}
      <TrainRoutesGrid
        routes={popularTrainRoutes}
        onSelectRoute={handleSelectRoute}
      />

      {/* 4. Why Choose Novixa: Your Train Journey, Our Priority (Panoramic 6 Features) */}
      <TrainWhyChoose
        data={trainWhyChooseData}
        onCtaClick={handleScrollToSearch}
      />

      {/* 5. Popular Destinations: Must-Visit by Train (6 Cards) */}
      <TrainDestinationsGrid
        destinations={trainDestinations}
        onSelectDestination={handleSelectDestination}
      />

      {/* 6. How It Works: How to Book Your Train Ticket? (Shared 4 Steps Flow) */}
      <ServiceStepsSection
        tag="HOW IT WORKS"
        title="How to Book Your Train Ticket?"
        subtitle="Quick and easy steps to plan your journey."
        steps={trainStepsData}
      />

      {/* 7. What Our Customers Say (Home Page Testimonial Section) */}
      <HomeTestimonialsSection
        eyebrow="CLIENT STORIES"
        title="What Our Customers Say"
        subtitle="Real stories and experiences from happy travellers who explored India by train."
        containerClassName="w-full px-4 lg:px-10"
        scriptLine1="Smooth Journeys ♡"
        scriptLine2="Happy Travellers ✈"
      />

      {/* 8. Frequently Asked Questions, Center Visual Banner, & Support CTA (Shared Dark Component) */}
      <ServiceFaqSupportSection
        title="Frequently Asked Questions"
        faqs={trainFaqs}
        centerBannerImage={trainSupportData.centerBannerImage}
        centerBannerScriptLine1={trainSupportData.centerBannerScriptLine1}
        centerBannerScriptLine2={trainSupportData.centerBannerScriptLine2}
        supportTitle={trainSupportData.title}
        supportSubtitle={trainSupportData.subtitle}
        whatsAppNumber={trainSupportData.whatsAppNumber}
        whatsAppMessage={trainSupportData.whatsAppMessage}
        whatsAppText={trainSupportData.whatsAppText}
        phoneNumber={trainSupportData.phoneNumber}
        displayPhone={trainSupportData.displayPhone}
        trustText={trainSupportData.trustText}
      />

      <RailQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        mode="train"
        initialData={quoteInitialData}
      />
    </div>
  );
}
