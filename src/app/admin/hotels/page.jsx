import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllHotels } from "@/lib/services/hotel.service";
import { Button } from "@/components/ui/button";
import HotelsTableClient from "./HotelsTableClient";

export const metadata = {
  title: "Manage Hotels | Admin",
};

export default async function AdminHotelsPage() {
  const hotels = await getAllHotels();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Hotels
        </h1>
        <Link href="/admin/hotels/new">
          <Button className="bg-[#BFA181] hover:bg-[#a68c70] text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add Hotel
          </Button>
        </Link>
      </div>

      <HotelsTableClient initialHotels={hotels} />
    </div>
  );
}
