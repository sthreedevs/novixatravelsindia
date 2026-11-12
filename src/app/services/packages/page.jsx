import React from "react";
import { getAllPackages } from "@/lib/services/package.service.js";
import PackagesClientPage from "@/components/services/packages/PackagesClientPage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Travel Packages | Bespoke Holiday Experiences | Novixa Travels India",
  description:
    "Explore handpicked travel packages, luxury honeymoons, family vacations, and adventure getaways crafted around your style and budget with Novixa Travels India.",
  openGraph: {
    title: "Travel Packages | Bespoke Holiday Experiences | Novixa Travels India",
    description:
      "Explore handpicked travel packages, luxury honeymoons, family vacations, and adventure getaways crafted around your style and budget with Novixa Travels India.",
    url: "/services/packages",
    type: "website",
  },
};

export default async function PackagesPage() {
  // Fetch packages strictly from MongoDB database
  let packagesData = [];
  try {
    packagesData = await getAllPackages();
  } catch (err) {
    console.error("Error fetching packages in PackagesPage:", err);
  }

  return <PackagesClientPage dbPackages={packagesData} />;
}
