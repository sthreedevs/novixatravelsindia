import React from "react";
import { DestinationPageClient } from "@/components/destination/DestinationPageClient";
import { getDestinationPageData } from "@/lib/services/destination.service.js";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { countryName } = await params;
  return {
    title: `Places to visit in ${decodeURIComponent(countryName)}`,
    description: `Explore the best places to visit, popular hotels, and travel packages in ${decodeURIComponent(countryName)}.`,
  };
}

export default async function Country({ params }) {
  const { countryName } = await params;

  // Fetch data on the server
  const data = await getDestinationPageData(countryName);

  if (!data) {
    // If no destination data, show 404 page
    notFound();
  }

  // Pass data to the interactive Client Component
  return <DestinationPageClient data={data} countryName={countryName} />;
}
