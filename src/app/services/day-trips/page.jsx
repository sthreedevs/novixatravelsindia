import React from "react";
import { getDayTrips } from "@/lib/services/dayTrip.service.js";
import { getGuides } from "@/lib/services/guide.service.js";
import DayTripsClientPage from "@/components/services/day-trips/DayTripsClientPage";

export const metadata = {
  title: "Day Trips & Excursions | Novixa Travels India",
  description:
    "Discover curated day trips, same-day tours, and perfect single-day getaways across India with Novixa Travels India.",
  openGraph: {
    title: "Day Trips & Excursions | Novixa Travels India",
    description:
      "Discover curated day trips, same-day tours, and perfect single-day getaways across India with Novixa Travels India.",
    url: "/services/day-trips",
    type: "website",
  },
};

export default async function DayTripsPage() {
  // Fetch day trips dynamically from backend MongoDB database (similar to destination & packages)
  const [dayTripsData, guidesData] = await Promise.all([
    getDayTrips(),
    getGuides(),
  ]);

  return (
    <DayTripsClientPage
      initialTrips={dayTripsData}
      guides={guidesData}
    />
  );
}
