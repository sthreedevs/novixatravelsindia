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

  const title = `${packageData.title} | Novixa Travels India`;
  const description = packageData.description 
    ? (packageData.description.substring(0, 150) + "...") 
    : `Explore the best travel packages for ${packageData.title}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/services/packages/${slug}`,
      images: packageData.thumbnail ? [
        {
          url: packageData.thumbnail,
          width: 800,
          height: 600,
          alt: packageData.title,
        }
      ] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: packageData.thumbnail ? [packageData.thumbnail] : [],
    },
    alternates: {
      canonical: `/services/packages/${slug}`,
    }
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