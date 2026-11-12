"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import ServiceHeroShell from "@/components/services/shared/ServiceHeroShell";
import EsimQuoteForm from "@/components/services/esim/EsimQuoteForm";
import ServicePanoramicBanner from "@/components/services/shared/ServicePanoramicBanner";
import PopularEsimDestinationsSection from "@/components/services/esim/PopularEsimDestinationsSection";
import ServiceStepsSection from "@/components/services/shared/ServiceStepsSection";
import HomeTestimonialsSection from "@/components/services/shared/HomeTestimonialsSection";
import ServiceFaqSupportSection from "@/components/services/shared/ServiceFaqSupportSection";
import {
  esimHeroData,
  esimWhyChooseData,
  esimStepsData,
  esimFaqData,
  esimSupportData,
} from "@/data/services/esim.data";

export default function EsimPage() {
  const [selectedDestination, setSelectedDestination] = useState("");

  const handleSelectDestination = (card) => {
    const dest = typeof card === "string" ? card : (card?.destination || "");
    setSelectedDestination(dest);
    const formEl = document.getElementById("esim-quote-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (dest) {
      toast.info(`Selected ${dest}! Complete details above to get your quote.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Hero Section: Unified Height & Luxury Aesthetic with eSIM Quote Form */}
      <ServiceHeroShell {...esimHeroData}>
        <EsimQuoteForm defaultDestination={selectedDestination} />
      </ServiceHeroShell>

      {/* 2. Why Choose Novixa Panoramic Banner (Shared Component) */}
      <ServicePanoramicBanner {...esimWhyChooseData} className="mt-0 mb-0" />

      {/* 3. Popular eSIM Destinations (6 Cards: Dubai, Thailand, Europe, USA, Singapore, Global) */}
      <PopularEsimDestinationsSection
        onSelectDestination={handleSelectDestination}
      />

      {/* 4. How It Works (Shared ServiceStepsSection) */}
      <ServiceStepsSection
        tag="HOW IT WORKS"
        title="Get Connected in 4 Easy Steps"
        subtitle="Book your eSIM in minutes and start using it instantly."
        steps={esimStepsData}
      />

      {/* 5. What Our Customers Say (Home Page Testimonial Section) */}
      <HomeTestimonialsSection
        eyebrow="TRAVELER STORIES"
        title="What Our Customers Say"
        subtitle="Real stories and experiences from happy travellers who stayed connected globally with Novixa eSIM."
        containerClassName="w-full px-4 lg:px-10"
        scriptLine1="Stay Connected ♡"
        scriptLine2="Global Roaming ✈"
      />

      {/* 6. Frequently Asked Questions & Concierge Support (Shared ServiceFaqSupportSection with eSimCTA.png) */}
      <ServiceFaqSupportSection
        faqs={esimFaqData}
        {...esimSupportData}
      />
    </div>
  );
}
