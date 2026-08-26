import React from "react";
import { PackagePageClient } from "@/components/packages/PackagePageClient";
import { getPackageBySlug } from "@/lib/services/package.service.js";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const packageData = await getPackageBySlug(slug);

  if (!packageData) {
    return {
      title: "Package Not Found",
    };
  }

  return {
    title: `${packageData.title} | Novixa Travels`,
    description: packageData.description || `Explore the best travel packages for ${packageData.title}.`,
  };
}

export default async function Package({ params }) {
  const { slug } = await params;

  // Fetch data on the server
  const packageData = await getPackageBySlug(slug);

  if (!packageData) {
    // If no package data, show 404 page
    notFound();
  }

  // Pass data to the interactive Client Component
  return <PackagePageClient packageData={packageData} />;
}