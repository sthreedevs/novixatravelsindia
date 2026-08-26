import React from "react";
import { getDayTrips } from "@/lib/services/dayTrip.service.js";
import { getGuides } from "@/lib/services/guide.service.js";
import { DayTripsPageClient } from "@/components/dayTrips/DayTripsPageClient";

export const metadata = {
  title: "Day Trips | Novixa Travels",
  description: "Curated day trips for curious travelers. Discover more in less time.",
};

export default async function DayTripsPage() {
  const [dayTripsData, initialGuides] = await Promise.all([
    getDayTrips(),
    getGuides()
  ]);

  return <DayTripsPageClient dayTripsData={dayTripsData} initialGuides={initialGuides} />;
}
