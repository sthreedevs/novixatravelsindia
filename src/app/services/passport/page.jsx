"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import ServiceHeroShell from "@/components/services/shared/ServiceHeroShell";
import ServiceStepsSection from "@/components/services/shared/ServiceStepsSection";
import HomeTestimonialsSection from "@/components/services/shared/HomeTestimonialsSection";
import ServiceFaqSupportSection from "@/components/services/shared/ServiceFaqSupportSection";
import PassportQuoteForm from "@/components/services/passport/PassportQuoteForm";
import PassportServicesGrid from "@/components/services/passport/PassportServicesGrid";
import PassportWhyChoose from "@/components/services/passport/PassportWhyChoose";
import {
  passportHeroData,
  passportServicesData,
  passportWhyChooseData,
  passportStepsData,
  passportFaqData,
  passportSupportData,
} from "@/data/services/passport.data";

export default function PassportServicePage() {
  const [selectedService, setSelectedService] = useState("");

  const handleSelectService = (serviceId) => {
    setSelectedService(serviceId);
    const formEl = document.getElementById("passport-quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    toast.info("Selected service! Complete your details above to submit.");
  };

  const handleScrollToForm = () => {
    const formEl = document.getElementById("passport-quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Hero Section with Passport Quote Form */}
      <ServiceHeroShell {...passportHeroData}>
        <PassportQuoteForm defaultService={selectedService} />
      </ServiceHeroShell>

      {/* 2. Our Passport Services - We Handle Everything For You (4 Services Grid) */}
      <PassportServicesGrid
        data={passportServicesData}
        onSelectService={handleSelectService}
        onGetStarted={handleScrollToForm}
      />

      {/* 3. Why Choose Novixa Panoramic Banner with Traveler */}
      <PassportWhyChoose data={passportWhyChooseData} />

      {/* 4. How It Works (Shared ServiceStepsSection - 5 Steps Flow) */}
      <ServiceStepsSection
        tag="HOW IT WORKS"
        title="Simple Steps to Get Your Passport"
        steps={passportStepsData}
      />

      {/* 5. What Our Customers Say (Home Page Testimonial Section) */}
      <HomeTestimonialsSection
        eyebrow="APPLICANT STORIES"
        title="What Our Customers Say"
        subtitle="Real stories from applicants who experienced seamless, stress-free passport services with Novixa."
        containerClassName="w-full px-4 lg:px-10"
        scriptLine1="Fast Passports ♡"
        scriptLine2="Happy Travellers ✈"
      />

      {/* 6. Frequently Asked Questions, Center Visual Banner, & Support CTA (Shared Dark Component) */}
      <ServiceFaqSupportSection
        title="Frequently Asked Questions"
        faqs={passportFaqData}
        centerBannerImage={passportSupportData.centerBannerImage}
        centerBannerScriptLine1={passportSupportData.centerBannerScriptLine1}
        centerBannerScriptLine2={passportSupportData.centerBannerScriptLine2}
        supportTitle={passportSupportData.title}
        supportSubtitle={passportSupportData.subtitle}
        whatsAppNumber={passportSupportData.whatsAppNumber}
        whatsAppMessage="Hello Novixa Travels, I have a question regarding passport services."
        phoneNumber={passportSupportData.phoneNumber}
        displayPhone={passportSupportData.displayPhone}
      />
    </div>
  );
}
