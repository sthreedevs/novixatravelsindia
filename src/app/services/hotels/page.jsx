"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import ServiceHeroShell from "@/components/services/shared/ServiceHeroShell";
import ServiceStepsSection from "@/components/services/shared/ServiceStepsSection";
import HomeTestimonialsSection from "@/components/services/shared/HomeTestimonialsSection";
import ServiceFaqSupportSection from "@/components/services/shared/ServiceFaqSupportSection";
import HotelQuoteForm from "@/components/services/hotels/HotelQuoteForm";
import HotelsByDestination from "@/components/services/hotels/HotelsByDestination";
import FeaturedHotelsSection from "@/components/services/hotels/FeaturedHotelsSection";
import WhyBookHotelsSection from "@/components/services/hotels/WhyBookHotelsSection";
import {
  hotelHeroData,
  hotelStepsData,
  hotelFaqs,
  hotelSupportData,
} from "@/data/services/hotels.data";

export default function HotelsPage() {
  const [selectedDestination, setSelectedDestination] = useState("");

  const handleSelectDestination = (destinationName) => {
    setSelectedDestination(destinationName);
    toast.info(`Selected ${destinationName}! Complete your travel dates above.`);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Hero Section: Hotels Across the World with Request a Hotel Quote form */}
      <ServiceHeroShell {...hotelHeroData}>
        <HotelQuoteForm defaultDestination={selectedDestination} />
      </ServiceHeroShell>

      {/* 2. Popular Destinations: Hotels by Destination (5 vertical cards) */}
      <HotelsByDestination onSelectDestination={handleSelectDestination} />

      {/* 3. Featured Hotels: Handpicked Stays for You (Burj Al Arab, Soneva Jani, etc.) */}
      <FeaturedHotelsSection />

      {/* 4. Why Choose Novixa: Why Book Hotels with Novixa? (Bedroom backdrop with 5 feature items) */}
      <WhyBookHotelsSection />

      {/* 5. How It Works (Shared ServiceStepsSection reused from Flights) */}
      <ServiceStepsSection
        tag="HOW IT WORKS"
        title="Simple Steps to Book Your Hotel"
        steps={hotelStepsData}
      />

      {/* 6. What Our Customers Say (Home Page Testimonial Section) */}
      <HomeTestimonialsSection
        eyebrow="GUEST STORIES"
        title="What Our Customers Say"
        subtitle="Real stories and experiences from happy travellers who booked their stays with Novixa."
        containerClassName="w-full px-4 lg:px-10"
        scriptLine1="Dream Stays ♡"
        scriptLine2="Happy Guests ✈"
      />

      {/* 7. Frequently Asked Questions, Center Visual Banner, & Support CTA */}
      <ServiceFaqSupportSection
        title="Frequently Asked Questions"
        faqs={hotelFaqs}
        centerBannerImage={hotelSupportData.centerBannerImage}
        centerBannerScriptLine1={hotelSupportData.centerBannerScriptLine1}
        centerBannerScriptLine2={hotelSupportData.centerBannerScriptLine2}
        supportTitle={hotelSupportData.title}
        supportSubtitle={hotelSupportData.subtitle}
        whatsAppNumber={hotelSupportData.whatsAppNumber}
        whatsAppMessage={hotelSupportData.whatsAppMessage}
        whatsAppText={hotelSupportData.whatsAppText}
        phoneNumber={hotelSupportData.phoneNumber}
        displayPhone={hotelSupportData.displayPhone}
        trustText={hotelSupportData.trustText}
        containerClassName="w-full px-4 lg:px-10"
      />
    </div>
  );
}
