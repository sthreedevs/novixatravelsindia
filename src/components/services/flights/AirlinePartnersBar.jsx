"use client";

import React from "react";
import ServicePartnersBar from "@/components/services/shared/ServicePartnersBar";
import { airlinePartners } from "@/data/services/flights.data";

export default function AirlinePartnersBar({
  title = "Our Trusted Airline Partners",
  subtitle = "We work with leading airlines to bring you the best travel options.",
  partners = airlinePartners,
  moreText = "& More...",
}) {
  return (
    <ServicePartnersBar
      title={title}
      subtitle={subtitle}
      partners={partners}
      moreText={moreText}
    />
  );
}
