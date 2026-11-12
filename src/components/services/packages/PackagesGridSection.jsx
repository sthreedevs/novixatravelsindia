"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, SlidersHorizontal, RefreshCw } from "lucide-react";
import { filterOptions } from "@/data/services/packages.data";
import PackageCardDesign from "./PackageCardDesign";

export default function PackagesGridSection({
  packages = [],
  activeCategory = "All Packages",
  setActiveCategory,
  sortBy = "recommended",
  setSortBy,
  onResetFilters,
  categories,
}) {
  const activeCategories = categories && categories.length > 0 ? categories : filterOptions.categories;
  const [visibleCount, setVisibleCount] = useState(8);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Close sort dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortOptions = [
    { id: "recommended", label: "Recommended" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "duration-short", label: "Duration: Short to Long" },
    { id: "duration-long", label: "Duration: Long to Short" },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.id === sortBy)?.label || "Recommended";

  const displayedPackages = packages.slice(0, visibleCount);
  const hasMore = visibleCount < packages.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <section id="packages-grid" className="w-full bg-[#f8f9fa] pt-16 sm:pt-20 lg:pt-24 pb-12 border-t border-zinc-200/70">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Filter Tabs & Sort Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
            {activeCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(8);
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#dfb26b] text-zinc-950 font-semibold shadow-sm ring-1 ring-[#cfa158]"
                      : "bg-white text-zinc-700 border border-zinc-200/90 hover:bg-zinc-50 hover:text-zinc-950 hover:border-zinc-300"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center justify-end gap-2 shrink-0 relative" ref={sortRef}>
            <span className="text-zinc-500 text-xs sm:text-sm">Sort by:</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSortOpen((prev) => !prev)}
                className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-full px-4 py-2 text-xs sm:text-sm text-zinc-800 font-medium flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <span>{currentSortLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${
                    isSortOpen ? "rotate-180 text-zinc-800" : ""
                  }`}
                />
              </button>

              {/* Sort Menu */}
              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-zinc-200 rounded-2xl shadow-xl p-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSortBy(opt.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-colors ${
                        sortBy === opt.id
                          ? "bg-[#dfb26b]/20 text-[#8a5812] font-semibold"
                          : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {sortBy === opt.id && <Check className="w-4 h-4 text-[#8a5812]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        {packages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {displayedPackages.map((pkg) => (
                <PackageCardDesign
                  key={pkg._id || pkg.slug}
                  packageData={pkg}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 border border-zinc-300 hover:border-zinc-500 bg-white hover:bg-zinc-50 text-zinc-800 text-sm font-semibold px-8 py-3 rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  <span>Load More Packages</span>
                  <ChevronDown className="w-4 h-4 text-zinc-600" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200 p-8 max-w-lg mx-auto shadow-sm my-6">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-[#dfb26b] mb-4">
              <SlidersHorizontal className="w-8 h-8 text-[#8a5812]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 mb-2">
              No matching packages found
            </h3>
            <p className="text-zinc-600 text-sm mb-6 max-w-sm mx-auto">
              We couldn&apos;t find any holiday packages matching your selected filters. Try adjusting your destination, budget, or travel type.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 bg-[#0c1222] hover:bg-[#1a233b] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
