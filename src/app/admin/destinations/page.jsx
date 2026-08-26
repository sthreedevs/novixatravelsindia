import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllDestinations } from "@/lib/services/destination.service";
import { Button } from "@/components/ui/button";
import DestinationsTableClient from "./DestinationsTableClient";

export const metadata = {
  title: "Manage Destinations | Admin",
};

export default async function AdminDestinationsPage() {
  const destinations = await getAllDestinations();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Destinations
        </h1>
        <Link href="/admin/destinations/new">
          <Button className="bg-[#BFA181] hover:bg-[#a68c70] text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add Destination
          </Button>
        </Link>
      </div>

      <DestinationsTableClient initialDestinations={destinations} />
    </div>
  );
}
