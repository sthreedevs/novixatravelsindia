import React from "react";
import { notFound } from "next/navigation";
import { getDayTripById } from "@/lib/services/dayTrip.service.js";
import { getEnrichedDayTrip } from "@/data/services/day-trips.data.js";
import DayTripDetailPageClient from "@/components/services/day-trips/detail/DayTripDetailPageClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const rawTrip = await getDayTripById(id);
  const trip = getEnrichedDayTrip(rawTrip, id);

  if (!trip) {
    return {
      title: "Day Trip Not Found | Novixa Travels India",
      description: "The requested day trip could not be found.",
    };
  }

  const title = `${trip.title} - One Day Tour & Excursion | Novixa Travels India`;
  const description =
    trip.description ||
    `Experience ${trip.title} with private AC transport, expert local guides, and custom day itineraries.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/services/day-trips/${id}`,
      type: "article",
      images: trip.heroImage
        ? [
            {
              url: trip.heroImage,
              width: 1200,
              height: 630,
              alt: trip.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: trip.heroImage ? [trip.heroImage] : [],
    },
    alternates: {
      canonical: `/services/day-trips/${id}`,
    },
  };
}

export default async function DayTripDetailPage({ params }) {
  const { id } = await params;

  // 1. Attempt to fetch trip from database (by ObjectId or title/slug)
  const rawTrip = await getDayTripById(id);

  // 2. Enrich trip with full page specifications (itinerary, specs, gallery, highlights, info cards)
  const enrichedTrip = getEnrichedDayTrip(rawTrip, id);

  if (!enrichedTrip) {
    notFound();
  }

  return <DayTripDetailPageClient trip={enrichedTrip} />;
}
