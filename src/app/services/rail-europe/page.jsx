"use client";

import React, { useState } from "react";
import EuropeRailHero from "@/components/services/rail-europe/EuropeRailHero";
import EuropeRailSearch from "@/components/services/rail-europe/EuropeRailSearch";
import EuropeRailRoutesGrid from "@/components/services/rail-europe/EuropeRailRoutesGrid";
import EuropeRailWhyChoose from "@/components/services/rail-europe/EuropeRailWhyChoose";
import EuropeRailPackagesGrid from "@/components/services/rail-europe/EuropeRailPackagesGrid";
import HomeTestimonialsSection from "@/components/services/shared/HomeTestimonialsSection";
import ServiceFaqSupportSection from "@/components/services/shared/ServiceFaqSupportSection";
import RailQuoteModal from "@/components/services/shared/RailQuoteModal";
import {
  railEuropeHeroData,
  popularEuropeRailRoutes,
  europeRailWhyChooseData,
  featuredRailPackages,
  europeRailFaqs,
  europeRailSupportData,
  europeRailTestimonials,
} from "@/data/services/rail-europe.data";

export default function EuropeRailPage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialData, setQuoteInitialData] = useState({});

  const handleSearch = (searchData) => {
    const isPass = searchData.tripType === "eurail-pass";
    setQuoteInitialData({
      subType: isPass ? "pass" : "ticket",
      from: searchData.fromCity || "",
      to: searchData.toCity || "",
      travelDate: searchData.travelDate || "",
      travelers: searchData.travelers || "2",
      tripType: searchData.tripType || "round-trip",
      passType: isPass ? "Eurail Global Pass" : "",
      countries: isPass && searchData.toCity ? searchData.toCity : "",
    });
    setQuoteModalOpen(true);
  };

  const handleSelectRoute = (route) => {
    const parts = String(route?.title || "").split(/\s*(?:to|→|-|–)\s*/i).filter(Boolean);
    setQuoteInitialData({
      subType: "ticket",
      from: parts[0] || "",
      to: parts[1] || route?.title || "",
      notes: `Popular Europe route: ${route?.title} (${route?.duration || ""})`,
    });
    setQuoteModalOpen(true);
  };

  const handleSelectPackage = (pkg) => {
    setQuoteInitialData({
      subType: "pass",
      passType: pkg?.title || "Eurail Pass Package",
      countries: pkg?.countries || "Europe",
      notes: `Featured rail package: ${pkg?.title} (${pkg?.duration || ""})`,
    });
    setQuoteModalOpen(true);
  };

  const handleScrollToSearch = () => {
    window.scrollTo({ top: 580, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Hero Section: 100% Matching Image 1 (Full Train View, Top-Right Script Flourish, Bottom-Left 5 Badges) */}
      <EuropeRailHero data={railEuropeHeroData} />

      {/* 2. Separate Search & Planning Bar: 100% Matching Image 1 (5 White Card Boxes + Gold Button) */}
      <EuropeRailSearch onSearch={handleSearch} />

      {/* 3. Popular Europe Rail Routes (6 Route Cards Grid) */}
      <EuropeRailRoutesGrid
        routes={popularEuropeRailRoutes}
        onSelectRoute={handleSelectRoute}
      />

      {/* 4. Why Choose Novixa for Europe Rail? (5 Free-Floating Features) */}
      <EuropeRailWhyChoose
        data={europeRailWhyChooseData}
        onCtaClick={handleScrollToSearch}
      />

      {/* 5. Featured Europe Rail Packages (4 Tier Cards) */}
      <EuropeRailPackagesGrid
        packages={featuredRailPackages}
        onSelectPackage={handleSelectPackage}
        onViewAll={handleScrollToSearch}
      />

      {/* 6. What Our Customers Say (Home Page Testimonial Section) */}
      <HomeTestimonialsSection
        eyebrow="CLIENT EXPERIENCES"
        title="What Our Customers Say"
        subtitle="Real stories and experiences from happy travellers who explored with Novixa Travels."
        initialTestimonials={europeRailTestimonials}
        containerClassName="w-full px-4 lg:px-10"
        scriptLine1="More Smiles ♡"
        scriptLine2="More Stories ✈"
      />

      {/* 7. Frequently Asked Questions & WhatsApp Concierge Support */}
      <ServiceFaqSupportSection
        title="Frequently Asked Questions"
        faqs={europeRailFaqs}
        centerBannerImage={europeRailSupportData.centerBannerImage}
        centerBannerScriptLine1={europeRailSupportData.centerBannerScriptLine1}
        centerBannerScriptLine2={europeRailSupportData.centerBannerScriptLine2}
        supportTitle={europeRailSupportData.title}
        supportSubtitle={europeRailSupportData.subtitle}
        whatsAppNumber={europeRailSupportData.whatsAppNumber}
        whatsAppMessage={europeRailSupportData.whatsAppMessage}
        whatsAppText={europeRailSupportData.whatsAppText}
        phoneNumber={europeRailSupportData.phoneNumber}
        displayPhone={europeRailSupportData.displayPhone}
        trustText={europeRailSupportData.trustText}
        containerClassName="w-full px-4 lg:px-10"
      />

      <RailQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        mode="europeRail"
        initialData={quoteInitialData}
      />
    </div>
  );
}
