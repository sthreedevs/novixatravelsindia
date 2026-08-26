"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Pencil, Search, ArrowUpDown } from "lucide-react";
import DeletePackageButton from "./DeletePackageButton";
import { Input } from "@/components/ui/input";

export default function PackagesTableClient({ initialPackages }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [filterCountry, setFilterCountry] = useState("all");

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
    const countries = new Set(initialPackages.map(pkg => pkg.country).filter(Boolean));
    return Array.from(countries).sort();
  }, [initialPackages]);

  const filteredAndSortedPackages = useMemo(() => {
    let filtered = [...(initialPackages || [])];
    
    // Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        pkg => 
          pkg.title?.toLowerCase().includes(lowerQuery) || 
          pkg.city?.toLowerCase().includes(lowerQuery) || 
          pkg.country?.toLowerCase().includes(lowerQuery)
      );
    }
    // Filter by Country
    if (filterCountry !== "all") {
      filtered = filtered.filter(pkg => pkg.country === filterCountry);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (sortConfig.key === "price") {
        // domesticPrice is string, convert to number
        aVal = Number(a.domesticPrice || 0);
        bVal = Number(b.domesticPrice || 0);
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
  }, [initialPackages, searchQuery, sortConfig]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800">
        
        {/* Search */}
        <div className="relative w-full sm:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            type="text"
            placeholder="Search by name or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Filters and Sorting Controls */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500 whitespace-nowrap">Country:</label>
            <select 
              value={filterCountry} 
              onChange={(e) => setFilterCountry(e.target.value)}
              className="text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#BFA181]"
            >
              <option value="all">All Countries</option>
              {uniqueCountries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500 whitespace-nowrap">Sort:</label>
            <select 
              value={`${sortConfig.key}-${sortConfig.direction}`} 
              onChange={(e) => {
                const [key, direction] = e.target.value.split("-");
                setSortConfig({ key, direction });
              }}
              className="text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#BFA181]"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration-asc">Duration: Shortest</option>
              <option value="duration-desc">Duration: Longest</option>
            </select>
          </div>

        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
            <thead className="bg-gray-50 dark:bg-zinc-800/50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Package Name</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group"
                  onClick={() => handleSort("duration")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Duration</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
              {filteredAndSortedPackages.map((pkg) => (
                <tr key={pkg._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 relative rounded overflow-hidden">
                        <img 
                          src={pkg.thumbnail || "/placeholder.jpg"} 
                          alt="" 
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                      <div className="ml-4 max-w-[250px]">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate" title={pkg.title}>
                          {pkg.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate" title={pkg.slug}>
                          {pkg.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {pkg.country} - {pkg.city}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {pkg.days}D / {pkg.nights}N
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ₹{pkg.domesticPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <Link href={`/admin/packages/${pkg._id}`} className="text-[#BFA181] hover:text-[#a68c70] inline-flex items-center">
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                    <DeletePackageButton id={pkg._id.toString()} title={pkg.title} />
                  </td>
                </tr>
              ))}
              {filteredAndSortedPackages.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
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
