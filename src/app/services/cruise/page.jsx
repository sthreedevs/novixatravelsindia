"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import ServiceHeroShell from "@/components/services/shared/ServiceHeroShell";
import CruiseQuoteForm from "@/components/services/cruise/CruiseQuoteForm";
import CruiseDestinationsSection from "@/components/services/cruise/CruiseDestinationsSection";
import WhyChooseCruiseSection from "@/components/services/cruise/WhyChooseCruiseSection";
import CruiseExperiencesSection from "@/components/services/cruise/CruiseExperiencesSection";
import HomeTestimonialsSection from "@/components/services/shared/HomeTestimonialsSection";
import ServiceFaqSupportSection from "@/components/services/shared/ServiceFaqSupportSection";
import {
  cruiseHeroData,
  cruiseFaqData,
  cruiseSupportData,
} from "@/data/services/cruise.data";

export default function CruisePage() {
  const [selectedDestination, setSelectedDestination] = useState("");

  const handleSelectDestination = (destName) => {
    setSelectedDestination(destName);
    toast.info(`Selected ${destName}! Review options and request your quote.`);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Hero Section: Cruise Holidays Sail Beyond Ordinary + Compact Luxury Quote Form */}
      <ServiceHeroShell {...cruiseHeroData}>
        <CruiseQuoteForm defaultDestination={selectedDestination} />
      </ServiceHeroShell>

      {/* 2. Popular Cruise Destinations: Explore the World by Sea (5 Cards) */}
      <CruiseDestinationsSection onSelectDestination={handleSelectDestination} />

      {/* 3. Why Choose Novixa: Your Dream Cruise, Our Expertise (Midnight Navy with 4 Features) */}
      <WhyChooseCruiseSection />

      {/* 4. Cruise Experiences: More Than a Vacation, It's an Experience (5 Badges + 3 Tilted Photos) */}
      <CruiseExperiencesSection />

      {/* 5. What Our Customers Say (Home Page Testimonial Section) */}
      <HomeTestimonialsSection
        eyebrow="VOYAGER STORIES"
        title="What Our Customers Say"
        subtitle="Real stories and experiences from happy travellers who sailed the world with Novixa."
        containerClassName="w-full px-4 lg:px-10"
        scriptLine1="Smooth Sailing ♡"
        scriptLine2="Happy Voyagers ✈"
      />

      {/* 6. Frequently Asked Questions & Concierge Support (Shared ServiceFaqSupportSection) */}
      <ServiceFaqSupportSection
        faqs={cruiseFaqData}
        {...cruiseSupportData}
      />
    </div>
  );
}
