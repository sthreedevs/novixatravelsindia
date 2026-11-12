"use client";

import React from "react";
import ServicePartnersBar from "@/components/services/shared/ServicePartnersBar";
import { visaPartners } from "@/data/services/visa.data";

export default function VisaPartnersBar(props) {
  return (
    <ServicePartnersBar
      title="Our Trusted Partners"
      subtitle="We work with reputed embassies, consulates and service providers to ensure a smooth and secure visa process."
      partners={visaPartners}
      moreText="and more..."
      {...props}
    />
  );
}
