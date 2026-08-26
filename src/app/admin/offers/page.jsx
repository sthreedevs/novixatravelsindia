import React from "react";
import { getOffers } from "@/lib/actions/admin/navbartop.actions";
import OffersTableClient from "./OffersTableClient";

export const metadata = {
  title: "Manage Offers Banner | Novixa Admin",
  description: "Manage promotional offers banner shown above the navigation bar",
};

export default async function OffersPage() {
  const offers = await getOffers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Offers Banner</h1>
          <p className="text-sm text-gray-500 mt-1">Manage the promotional strip that appears above the main navigation bar.</p>
        </div>
      </div>
      
      <OffersTableClient initialOffers={offers} />
    </div>
  );
}
