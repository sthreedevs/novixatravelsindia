import React from "react";
import { getPackageBySlug, getAllPackages } from "@/lib/services/package.service.js";
import { getEnrichedPackage } from "@/data/services/packages.data.js";
import PackageDetailPageClient from "@/components/services/packages/detail/PackageDetailPageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let rawPackage = null;
  try {
    rawPackage = await getPackageBySlug(slug);
  } catch (err) {
    console.error("Error fetching package for metadata:", err);
  }

  const packageData = getEnrichedPackage(rawPackage, slug);

  const fullTitle = `${packageData.title} ${packageData.titleHighlight || ""} | Novixa Travels India`.trim();
  const description =
    packageData.subtitle ||
    `Explore bespoke travel packages for ${packageData.title} with luxury accommodations, private transfers, and curated itineraries.`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: `/services/packages/${slug}`,
      type: "website",
      images: packageData.heroImage
        ? [
            {
              url: packageData.heroImage,
              width: 1200,
              height: 630,
              alt: packageData.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: packageData.heroImage ? [packageData.heroImage] : [],
    },
    alternates: {
      canonical: `/services/packages/${slug}`,
    },
  };
}

export default async function PackageDetailPage({ params }) {
  const { slug } = await params;

  // 1. Fetch raw package from MongoDB (by slug or ID)
  let rawPackage = null;
  let allDbPackages = [];
  try {
    rawPackage = await getPackageBySlug(slug);
    allDbPackages = await getAllPackages();
  } catch (err) {
    console.error("Error fetching package in detail page:", err);
  }

  // 2. Filter other packages from DB for "More Destinations"
  const otherPackages = (allDbPackages || []).filter(
    (p) => p.slug !== slug && p._id?.toString() !== rawPackage?._id?.toString()
  );

  // 3. Enrich with structured design specs, timeline, dynamic images & travel types
  const packageData = getEnrichedPackage(rawPackage, slug, otherPackages);

  return <PackageDetailPageClient packageData={packageData} />;
}
