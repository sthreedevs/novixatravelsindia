"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import ServiceHeroShell from "@/components/services/shared/ServiceHeroShell";
import ServiceStepsSection from "@/components/services/shared/ServiceStepsSection";
import ServicePartnersBar from "@/components/services/shared/ServicePartnersBar";
import VisaQuoteForm from "@/components/services/visa/VisaQuoteForm";
import VisaServicesGrid from "@/components/services/visa/VisaServicesGrid";
import VisaTopCountriesGrid from "@/components/services/visa/VisaTopCountriesGrid";
import HomeTestimonialsSection from "@/components/services/shared/HomeTestimonialsSection";
import ServiceFaqSupportSection from "@/components/services/shared/ServiceFaqSupportSection";
import {
  visaHeroData,
  visaServicesData,
  topVisaCountries,
  visaStepsData,
  visaPartners,
  visaFaqs,
  visaSupportData,
} from "@/data/services/visa.data";

export default function VisaServicesPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedVisaType, setSelectedVisaType] = useState("");

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    const formEl = document.getElementById("visa-quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    toast.info(`Selected ${country}! Complete your dates and contact details.`);
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedVisaType(categoryId);
    const formEl = document.getElementById("visa-quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    toast.info("Selected visa category! Fill in your destination country.");
  };

  const handleScrollToForm = () => {
    const formEl = document.getElementById("visa-quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Hero Section with Visa Quote Form */}
      <ServiceHeroShell {...visaHeroData}>
        <VisaQuoteForm
          defaultCountry={selectedCountry}
          defaultVisaType={selectedVisaType}
        />
      </ServiceHeroShell>

      {/* 2. Our Visa Services - Visa Services for Every Journey (3 Categories) */}
      <VisaServicesGrid
        data={visaServicesData}
        onSelectCategory={handleSelectCategory}
        onConsultationClick={handleScrollToForm}
      />

      {/* 3. Popular Destinations - Visa Assistance for Top Countries (6 Country Portrait Cards) */}
      <VisaTopCountriesGrid
        countries={topVisaCountries}
        onSelectCountry={handleSelectCountry}
      />

      {/* 4. How It Works (Shared ServiceStepsSection in Dark) */}
      <ServiceStepsSection
        tag="HOW IT WORKS"
        title="Simple Steps to Get Your Visa"
        steps={visaStepsData}
      />

      {/* 5. Our Trusted Partners (Shared ServicePartnersBar with official SVGs) */}
      <ServicePartnersBar
        title="Our Trusted Partners"
        subtitle="We work with reputed embassies, consulates and service providers to ensure a smooth and secure visa process."
        partners={visaPartners}
        moreText="and more..."
      />

      {/* 6. What Our Customers Say (Home Page Testimonial Section) */}
      <HomeTestimonialsSection
        eyebrow="CLIENT STORIES"
        title="What Our Customers Say"
        subtitle="Real stories and experiences from happy travellers who obtained their visas with Novixa."
        containerClassName="w-full px-4 lg:px-10"
        scriptLine1="Fast Visas ♡"
        scriptLine2="Global Journeys ✈"
      />

      {/* 7. Frequently Asked Questions, Center Visual Banner, & Support CTA (Shared Dark Component) */}
      <ServiceFaqSupportSection
        title="Frequently Asked Questions"
        faqs={visaFaqs}
        centerBannerImage={visaSupportData.centerBannerImage}
        centerBannerScriptLine1={visaSupportData.centerBannerScriptLine1}
        centerBannerScriptLine2={visaSupportData.centerBannerScriptLine2}
        supportTitle={visaSupportData.title}
        supportSubtitle={visaSupportData.subtitle}
        whatsAppNumber={visaSupportData.whatsAppNumber}
        whatsAppMessage={visaSupportData.whatsAppMessage}
        whatsAppText={visaSupportData.whatsAppText}
        phoneNumber={visaSupportData.phoneNumber}
        displayPhone={visaSupportData.displayPhone}
        trustText={visaSupportData.trustText}
      />
    </div>
  );
}
