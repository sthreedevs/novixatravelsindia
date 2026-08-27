import React from "react";
import { DestinationPageClient } from "@/components/destination/DestinationPageClient";
import { getDestinationPageData } from "@/lib/services/destination.service.js";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { countryName } = await params;
  const decodedName = decodeURIComponent(countryName);
  const data = await getDestinationPageData(countryName);

  const title = `Places to visit in ${decodedName} | Novixa Travels India`;
  const description = `Explore the best places to visit, popular hotels, and travel packages in ${decodedName}. Book your next adventure with Novixa Travels India.`;

  const metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/destination/${countryName}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/destination/${countryName}`,
    }
  };

  if (data && data.destination && data.destination.thumbnail) {
    metadata.openGraph.images = [
      {
        url: data.destination.thumbnail,
        width: 800,
        height: 600,
        alt: data.destination.name,
      }
    ];
    metadata.twitter.images = [data.destination.thumbnail];
  }

  return metadata;
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
