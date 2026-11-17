"use client";

import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import PackagesHeroSection from "./PackagesHeroSection";
import PackagesGridSection from "./PackagesGridSection";
import PackagesBottomCtaBanner from "./PackagesBottomCtaBanner";
import PackageEnquiryModal from "./PackageEnquiryModal";
import { getPackageDuration } from "@/lib/utils/packageDuration";

export default function PackagesClientPage({ dbPackages = [] }) {
  // Filter & Search states
  const [destination, setDestination] = useState("");
  const [travelType, setTravelType] = useState("");
  const [budget, setBudget] = useState(null);
  const [duration, setDuration] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Packages");
  const [sortBy, setSortBy] = useState("recommended");

  // Modal states
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Strictly transform packages present in MongoDB database
  const allAvailablePackages = useMemo(() => {
    if (!Array.isArray(dbPackages) || dbPackages.length === 0) {
      return [];
    }

    return dbPackages.map((pkg) => {
      const rawPrice =
        parseInt(
          (pkg.domesticPrice || pkg.internationalPrice || "0").replace(/[^0-9]/g, "")
        ) || 0;

      const isDomestic =
        pkg.country?.toLowerCase().includes("india") ||
        ["goa", "kashmir", "andaman", "kerala", "rajasthan", "himachal", "uttarakhand", "delhi", "mumbai"].some(
          (loc) =>
            pkg.destinations?.toLowerCase().includes(loc) ||
            pkg.city?.toLowerCase().includes(loc) ||
            pkg.country?.toLowerCase().includes(loc)
        );

      const cleanTravelTypes = [
        ...(Array.isArray(pkg.travelType) && pkg.travelType.length > 0
          ? pkg.travelType
          : Array.isArray(pkg.category)
          ? pkg.category.filter((c) => !c.toLowerCase().includes("star"))
          : []),
      ];

      const primaryBadge =
        cleanTravelTypes.length > 0
          ? cleanTravelTypes[0]
          : isDomestic
          ? "Domestic"
          : "International";

      const destinationName =
        pkg.destinations || pkg.city || pkg.country || "India";

      const { days: resolvedDays, nights: resolvedNights } = getPackageDuration(pkg);

      return {
        _id: pkg._id.toString(),
        slug: pkg.slug || pkg._id.toString(),
        title: pkg.title,
        badge: primaryBadge,
        travelType: cleanTravelTypes,
        duration: `${resolvedNights} Nights / ${resolvedDays} Days`,
        days: resolvedDays,
        nights: resolvedNights,
        type: isDomestic ? "Domestic" : "International",
        destination: destinationName,
        country: pkg.country || destinationName,
        price: (pkg.domesticPrice || pkg.internationalPrice || "25,000").replace(/^₹\s*/, ""),
        rawPrice,
        categories: [
          ...cleanTravelTypes,
          isDomestic ? "Domestic" : "International",
        ],
        image: pkg.thumbnail || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png",
        description:
          pkg.description || "Curated bespoke holiday experience with Novixa Travels.",
        highlights:
          pkg.inclusions || ["Luxury Accommodation", "Guided Sightseeing", "Private Transfers"],
      };
    });
  }, [dbPackages]);

  // Dynamically derive destination options from DB packages
  const dynamicDestinations = useMemo(() => {
    const set = new Set(["All Destinations"]);
    allAvailablePackages.forEach((pkg) => {
      if (pkg.destination) {
        // If package has multiple destinations separated by commas, add each individually
        const parts = pkg.destination.split(/[,•|/]/).map((p) => p.trim()).filter(Boolean);
        parts.forEach((p) => set.add(p));
      }
      if (pkg.country) set.add(pkg.country.trim());
    });
    // Add popular standards if set has few entries
    if (set.size < 4) {
      ["Dubai", "Maldives", "Thailand", "Bali", "Switzerland", "Goa", "Kashmir", "Andaman", "Kerala"].forEach((d) =>
        set.add(d)
      );
    }
    return Array.from(set);
  }, [allAvailablePackages]);

  // Dynamically derive category filter tabs from DB packages
  const dynamicCategories = useMemo(() => {
    const defaultTabs = ["All Packages", "Domestic", "International"];
    const catsFromDb = new Set();
    allAvailablePackages.forEach((pkg) => {
      if (pkg.badge) catsFromDb.add(pkg.badge);
      if (Array.isArray(pkg.categories)) {
        pkg.categories.forEach((c) => catsFromDb.add(c));
      }
    });
    return Array.from(new Set([...defaultTabs, ...catsFromDb])).filter(Boolean);
  }, [allAvailablePackages]);

  // Reactive filtering
  const filteredPackages = useMemo(() => {
    let result = [...allAvailablePackages];

    // 1. Category Filter Pill
    if (activeCategory && activeCategory !== "All Packages") {
      result = result.filter((pkg) => {
        const catMatch = pkg.categories?.some(
          (c) => c.toLowerCase() === activeCategory.toLowerCase()
        );
        const badgeMatch =
          pkg.badge?.toLowerCase() === activeCategory.toLowerCase();
        const typeMatch =
          pkg.type?.toLowerCase() === activeCategory.toLowerCase();
        return catMatch || badgeMatch || typeMatch;
      });
    }

    // 2. Destination filter
    if (destination) {
      const destLower = destination.toLowerCase();
      result = result.filter(
        (pkg) =>
          pkg.destination?.toLowerCase().includes(destLower) ||
          pkg.country?.toLowerCase().includes(destLower) ||
          pkg.title?.toLowerCase().includes(destLower)
      );
    }

    // 3. Travel Type filter
    if (travelType) {
      const typeLower = travelType.toLowerCase();
      result = result.filter(
        (pkg) =>
          pkg.badge?.toLowerCase().includes(typeLower) ||
          pkg.travelType?.some((t) => t.toLowerCase() === typeLower) ||
          pkg.type?.toLowerCase().includes(typeLower) ||
          pkg.categories?.some((c) => c.toLowerCase().includes(typeLower))
      );
    }

    // 4. Budget filter
    if (budget && (budget.min > 0 || budget.max < Infinity)) {
      result = result.filter(
        (pkg) => pkg.rawPrice >= budget.min && pkg.rawPrice <= budget.max
      );
    }

    // 5. Duration filter
    if (duration && (duration.minDays > 0 || duration.maxDays < Infinity)) {
      result = result.filter(
        (pkg) => pkg.days >= duration.minDays && pkg.days <= duration.maxDays
      );
    }

    // 6. Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.rawPrice - b.rawPrice);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.rawPrice - a.rawPrice);
    } else if (sortBy === "duration-short") {
      result.sort((a, b) => a.days - b.days);
    } else if (sortBy === "duration-long") {
      result.sort((a, b) => b.days - a.days);
    }

    return result;
  }, [allAvailablePackages, activeCategory, destination, travelType, budget, duration, sortBy]);

  const handleSearch = () => {
    const el = document.getElementById("packages-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    const filterParts = [];
    if (destination) filterParts.push(destination);
    if (travelType) filterParts.push(travelType);
    if (budget) filterParts.push(budget.label);
    if (duration) filterParts.push(duration.label);

    if (filterParts.length > 0) {
      toast.info(`Filtering for ${filterParts.join(" • ")}`);
    } else {
      toast.info("Showing all packages");
    }
  };

  const handleResetFilters = () => {
    setDestination("");
    setTravelType("");
    setBudget(null);
    setDuration(null);
    setActiveCategory("All Packages");
    setSortBy("recommended");
    toast.success("Filters reset to default.");
  };

  const handleOpenGeneralEnquiry = () => {
    setSelectedPackage(null);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Hero Section: Ocean resort background + Floating Search Capsule */}
      <PackagesHeroSection
        destination={destination}
        setDestination={setDestination}
        travelType={travelType}
        setTravelType={setTravelType}
        budget={budget}
        setBudget={setBudget}
        duration={duration}
        setDuration={setDuration}
        onSearch={handleSearch}
        destinationOptions={dynamicDestinations}
      />

      {/* 2. Packages Grid Section: Strictly DB packages with direct redirect on View Details */}
      <PackagesGridSection
        packages={filteredPackages}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onResetFilters={handleResetFilters}
        categories={dynamicCategories}
      />

      {/* 3. Bottom Banner: "Not sure where to go?" with Custom Quote & WhatsApp */}
      <PackagesBottomCtaBanner onOpenEnquiry={handleOpenGeneralEnquiry} />

      {/* 4. Interactive Bespoke Package Enquiry Modal */}
      <PackageEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  );
}
