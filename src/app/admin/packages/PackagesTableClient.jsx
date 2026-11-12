"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Pencil, Search, ArrowUpDown, Briefcase, Plus, Eye } from "lucide-react";
import DeletePackageButton from "./DeletePackageButton";
import { Input } from "@/components/ui/input";
import { STANDARD_TRAVEL_TYPES } from "./TravelTypeMultiSelect";

export default function PackagesTableClient({ initialPackages }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterTravelType, setFilterTravelType] = useState("all");

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get unique countries for the filter dropdown
  const uniqueCountries = useMemo(() => {
    if (!initialPackages) return [];
    const countries = new Set(initialPackages.map((pkg) => pkg.country).filter(Boolean));
    return Array.from(countries).sort();
  }, [initialPackages]);

  const filteredAndSortedPackages = useMemo(() => {
    let filtered = [...(initialPackages || [])];

    // Search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pkg) =>
          pkg.title?.toLowerCase().includes(lowerQuery) ||
          pkg.city?.toLowerCase().includes(lowerQuery) ||
          pkg.country?.toLowerCase().includes(lowerQuery) ||
          pkg.destinations?.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by Country
    if (filterCountry !== "all") {
      filtered = filtered.filter((pkg) => pkg.country === filterCountry);
    }

    // Filter by Travel Type
    if (filterTravelType !== "all") {
      filtered = filtered.filter((pkg) => {
        const types = [
          ...(Array.isArray(pkg.travelType) ? pkg.travelType : []),
          ...(Array.isArray(pkg.category) ? pkg.category : []),
        ].map((t) => t.toLowerCase());
        return types.includes(filterTravelType.toLowerCase());
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === "price") {
        aVal = Number((a.domesticPrice || "0").replace(/[^0-9]/g, ""));
        bVal = Number((b.domesticPrice || "0").replace(/[^0-9]/g, ""));
      }
      if (sortConfig.key === "duration") {
        aVal = (a.days || 0) + (a.nights || 0);
        bVal = (b.days || 0) + (b.nights || 0);
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [initialPackages, searchQuery, sortConfig, filterCountry, filterTravelType]);

  return (
    <div className="space-y-4">
      {/* Search & Filter Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3.5 justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800">
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search packages, destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9.5 w-full rounded-xl"
          />
        </div>

        {/* Filters and Sorting Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Travel Type Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-xs font-semibold text-gray-500 whitespace-nowrap">
              Travel Type:
            </label>
            <select
              value={filterTravelType}
              onChange={(e) => setFilterTravelType(e.target.value)}
              className="text-xs font-medium border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg py-1.5 px-2.5 focus:outline-none focus:ring-2 focus:ring-[#deb06c]"
            >
              <option value="all">All Types</option>
              {STANDARD_TRAVEL_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Country Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-xs font-semibold text-gray-500 whitespace-nowrap">
              Country:
            </label>
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="text-xs font-medium border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg py-1.5 px-2.5 focus:outline-none focus:ring-2 focus:ring-[#deb06c]"
            >
              <option value="all">All Countries</option>
              {uniqueCountries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <label className="text-xs font-semibold text-gray-500 whitespace-nowrap">
              Sort:
            </label>
            <select
              value={`${sortConfig.key}-${sortConfig.direction}`}
              onChange={(e) => {
                const [key, direction] = e.target.value.split("-");
                setSortConfig({ key, direction });
              }}
              className="text-xs font-medium border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg py-1.5 px-2.5 focus:outline-none focus:ring-2 focus:ring-[#deb06c]"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration-asc">Duration: Shortest</option>
              <option value="duration-desc">Duration: Longest</option>
            </select>
          </div>

          {/* Add Package Button */}
          <Link
            href="/admin/packages/new"
            className="inline-flex items-center gap-1.5 bg-[#deb06c] hover:bg-[#c99955] text-zinc-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm ml-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Package</span>
          </Link>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-zinc-900 shadow-sm rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
            <thead className="bg-gray-50 dark:bg-zinc-800/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Package Name</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Travel Types
                </th>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group"
                  onClick={() => handleSort("duration")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Duration</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Starting Price</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3.5 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
              {filteredAndSortedPackages.map((pkg) => {
                const types = [
                  ...(Array.isArray(pkg.travelType) && pkg.travelType.length > 0
                    ? pkg.travelType
                    : Array.isArray(pkg.category)
                    ? pkg.category.filter((c) => !c.toLowerCase().includes("star"))
                    : []),
                ];

                return (
                  <tr
                    key={pkg._id}
                    className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
                          <img
                            src={pkg.thumbnail || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png"}
                            alt=""
                            className="h-12 w-12 object-cover"
                          />
                        </div>
                        <div className="ml-3.5 max-w-[260px]">
                          <div
                            className="text-sm font-bold text-gray-900 dark:text-white truncate"
                            title={pkg.title}
                          >
                            {pkg.title}
                          </div>
                          <div
                            className="text-xs text-gray-500 dark:text-gray-400 truncate"
                            title={pkg.slug}
                          >
                            /{pkg.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Travel Types Badges */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {types.length > 0 ? (
                          types.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 inline-flex text-[11px] font-semibold rounded-md bg-[#fcf2df] text-[#8a5812] border border-[#edd7a6] dark:bg-[#deb06c]/15 dark:text-[#deb06c] dark:border-[#deb06c]/30"
                            >
                              {t}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-zinc-400 italic">None</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs font-semibold rounded-lg bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                        {pkg.country} {pkg.city ? `• ${pkg.city}` : ""}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-gray-600 dark:text-gray-300">
                      {pkg.days}D / {pkg.nights}N
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                      ₹{pkg.domesticPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-semibold space-x-3">
                      <Link
                        href={`/services/packages/${pkg.slug || pkg._id}`}
                        target="_blank"
                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                      <Link
                        href={`/admin/packages/${pkg._id}`}
                        className="text-[#8a5812] dark:text-[#deb06c] hover:underline inline-flex items-center gap-1"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Link>
                      <DeletePackageButton id={pkg._id.toString()} title={pkg.title} />
                    </td>
                  </tr>
                );
              })}

              {filteredAndSortedPackages.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No packages found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
