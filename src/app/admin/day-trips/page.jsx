import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getDayTrips } from "@/lib/services/dayTrip.service";
import { Button } from "@/components/ui/button";
import DayTripsTableClient from "./DayTripsTableClient";

export const metadata = {
  title: "Manage Day Trips | Admin",
};

export default async function AdminDayTripsPage() {
  const dayTrips = await getDayTrips();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Day Trips
        </h1>
        <Link href="/admin/day-trips/new">
          <Button className="bg-[#BFA181] hover:bg-[#a68c70] text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add Day Trip
          </Button>
        </Link>
      </div>

      <DayTripsTableClient initialDayTrips={dayTrips} />
    </div>
  );
}
