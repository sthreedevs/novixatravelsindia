"use client";

import React, { useState } from "react";
import PackageDetailHero from "./PackageDetailHero";
import PackageWhyChooseSection from "./PackageWhyChooseSection";
import PackageItinerarySection from "./PackageItinerarySection";
import PackageMoreDestinationsSection from "./PackageMoreDestinationsSection";
import PackageEnquiryModal from "../PackageEnquiryModal";
import ServiceFaqSupportSection from "@/components/services/shared/ServiceFaqSupportSection";

export default function PackageDetailPageClient({ packageData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenQuote = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Hero Section + Floating Specs Capsule */}
      <PackageDetailHero
        packageData={packageData}
        onOpenQuote={handleOpenQuote}
      />

      {/* 2. Why Choose This Package: 5 Circular Badges + 3-Photo Gallery Collage */}
      <PackageWhyChooseSection whyChoose={packageData.whyChoose} />

      {/* 3. Detailed Itinerary + Package Includes & Pricing Card */}
      <PackageItinerarySection
        itinerary={packageData.itinerary}
        inclusions={packageData.inclusions}
        price={packageData.price}
        priceUnit={packageData.priceUnit}
        centerImage={packageData.itineraryImage}
        onOpenQuote={handleOpenQuote}
      />

      {/* 4. More Dream Destinations (Dynamic DB Packages) */}
      <PackageMoreDestinationsSection
        destinations={packageData.moreDestinations}
      />

      {/* 5. Dynamic Package FAQs & Support CTA (Shared ServiceFaqSupportSection — admin-managed only, no static FAQs) */}
      {Array.isArray(packageData.faqs) && packageData.faqs.length > 0 && (
        <ServiceFaqSupportSection
          tag="HELP & SUPPORT"
          title="Frequently Asked Questions"
          faqs={packageData.faqs}
          centerBannerImage={
            packageData.heroImage ||
            packageData.whyChoose?.gallery?.main ||
            "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332956/backgrounds/packageHero.png"
          }
          centerBannerScriptLine1="Curated Journeys ♡"
          centerBannerScriptLine2="Timeless Memories ✈"
          supportTitle="Still Have Questions?"
          supportSubtitle={`Chat with our travel specialists for personalized assistance on ${packageData.title}.`}
          whatsAppNumber="916397574309"
          whatsAppMessage={`Hello Novixa Travels, I have a question regarding the ${packageData.title} package.`}
          whatsAppText="Chat on WhatsApp"
          phoneNumber="+916397574309"
          displayPhone="+91 63975 74309"
          showCallButton={true}
          trustText="Tailor-Made Itineraries | Free Consultation"
        />
      )}

      {/* 6. Interactive Custom Quote Modal */}
      <PackageEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={{
          title: `${packageData.title} ${packageData.titleHighlight || ""}`.trim(),
          destination: packageData.specs?.destination || packageData.title,
        }}
      />
    </div>
  );
}
