"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import ServiceHeroShell from "@/components/services/shared/ServiceHeroShell";
import ServiceStepsSection from "@/components/services/shared/ServiceStepsSection";
import HomeTestimonialsSection from "@/components/services/shared/HomeTestimonialsSection";
import ServiceFaqSupportSection from "@/components/services/shared/ServiceFaqSupportSection";
import InsuranceQuoteForm from "@/components/services/insurance/InsuranceQuoteForm";
import InsuranceWhyChoose from "@/components/services/insurance/InsuranceWhyChoose";
import InsuranceDestinationsGrid from "@/components/services/insurance/InsuranceDestinationsGrid";
import InsurancePlansGrid from "@/components/services/insurance/InsurancePlansGrid";
import {
  insuranceHeroData,
  insuranceWhyChooseData,
  destinationInsuranceTypes,
  insuranceStepsData,
  insurancePlansData,
  insuranceFaqs,
  insuranceSupportData,
} from "@/data/services/insurance.data";

export default function TravelInsurancePage() {
  const [selectedDestination, setSelectedDestination] = useState("");

  const handleSelectDestination = (destTitle) => {
    setSelectedDestination(destTitle);
    const formEl = document.getElementById("insurance-quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    toast.info(`Selected ${destTitle}! Fill in your travel dates for a custom quote.`);
  };

  const handleSelectPlan = (planName) => {
    const formEl = document.getElementById("insurance-quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    toast.info(`Selected ${planName} Plan! Complete your trip details above.`);
  };

  const handleScrollToPlans = () => {
    const plansEl = document.getElementById("insurance-plans");
    if (plansEl) {
      plansEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Hero Section with Travel Insurance Quote Form */}
      <ServiceHeroShell {...insuranceHeroData}>
        <InsuranceQuoteForm
          defaultDestination={selectedDestination}
        />
      </ServiceHeroShell>

      {/* 2. Why Choose Novixa - Why Get Travel Insurance? (5 Feature Cards) */}
      <InsuranceWhyChoose
        data={insuranceWhyChooseData}
        onExploreCoverage={handleScrollToPlans}
      />

      {/* 3. Global Coverage - Insurance for Every Destination (5 Portrait Cards) */}
      <InsuranceDestinationsGrid
        destinations={destinationInsuranceTypes}
        onSelectDestination={handleSelectDestination}
        onViewAllPlans={handleScrollToPlans}
      />

      {/* 4. How It Works - Simple Steps to Stay Protected (Shared 4 Steps Flow) */}
      <ServiceStepsSection
        tag="HOW IT WORKS"
        title="Simple Steps to Stay Protected"
        subtitle="Getting travel insurance is quick and easy. Just follow these simple steps and travel with confidence."
        steps={insuranceStepsData}
      />

      {/* 5. Our Travel Insurance Plans - Basic, Standard (Most Popular), Premium */}
      <InsurancePlansGrid
        plans={insurancePlansData}
        onSelectPlan={handleSelectPlan}
      />

      {/* 6. What Our Customers Say (Home Page Testimonial Section) */}
      <HomeTestimonialsSection
        eyebrow="POLICYHOLDER STORIES"
        title="What Our Customers Say"
        subtitle="Real stories and experiences from happy travellers who protected their trips with Novixa."
        containerClassName="w-full px-4 lg:px-10"
        scriptLine1="Worry-Free Trips ♡"
        scriptLine2="Safe Journeys ✈"
      />

      {/* 7. Frequently Asked Questions, Center Visual Banner, & Support CTA (Shared Dark Component) */}
      <ServiceFaqSupportSection
        title="Frequently Asked Questions"
        faqs={insuranceFaqs}
        centerBannerImage={insuranceSupportData.centerBannerImage}
        centerBannerScriptLine1={insuranceSupportData.centerBannerScriptLine1}
        centerBannerScriptLine2={insuranceSupportData.centerBannerScriptLine2}
        supportTitle={insuranceSupportData.title}
        supportSubtitle={insuranceSupportData.subtitle}
        whatsAppNumber={insuranceSupportData.whatsAppNumber}
        whatsAppMessage={insuranceSupportData.whatsAppMessage}
        whatsAppText={insuranceSupportData.whatsAppText}
        phoneNumber={insuranceSupportData.phoneNumber}
        displayPhone={insuranceSupportData.displayPhone}
        trustText={insuranceSupportData.trustText}
      />
    </div>
  );
}
