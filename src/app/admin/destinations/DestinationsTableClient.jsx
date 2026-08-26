"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Pencil, Search, ArrowUpDown } from "lucide-react";
import DeleteDestinationButton from "./DeleteDestinationButton";
import { Input } from "@/components/ui/input";

export default function DestinationsTableClient({ initialDestinations }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [filterContinent, setFilterContinent] = useState("all");

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const uniqueContinents = useMemo(() => {
    if (!initialDestinations) return [];
    const continents = new Set(initialDestinations.map(d => d.continent).filter(Boolean));
    return Array.from(continents).sort();
  }, [initialDestinations]);

  const filteredAndSortedDestinations = useMemo(() => {
    let filtered = [...(initialDestinations || [])];
    
    // Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        d => 
          d.name?.toLowerCase().includes(lowerQuery) || 
          d.country?.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Filter
    if (filterContinent !== "all") {
      filtered = filtered.filter(d => d.continent === filterContinent);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [initialDestinations, searchQuery, sortConfig, filterContinent]);

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
            placeholder="Search by name or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Filters and Sorting Controls */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500 whitespace-nowrap">Continent:</label>
            <select 
              value={filterContinent} 
              onChange={(e) => setFilterContinent(e.target.value)}
              className="text-sm border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#BFA181]"
            >
              <option value="all">All Continents</option>
              {uniqueContinents.map(c => (
                <option key={c} value={c} className="capitalize">{c}</option>
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
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="country-asc">Country: A to Z</option>
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
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Destination Name</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group"
                  onClick={() => handleSort("country")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Location</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trending
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
              {filteredAndSortedDestinations.map((dest) => (
                <tr key={dest._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 relative rounded overflow-hidden bg-gray-100">
                        <img 
                          src={dest.thumbnail || "/placeholder.jpg"} 
                          alt="" 
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                      <div className="ml-4 max-w-[250px]">
                        <div className="text-sm font-medium text-gray-900 dark:text-white capitalize truncate" title={dest.name}>
                          {dest.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white capitalize">{dest.country}</div>
                    <div className="text-sm text-gray-500 capitalize">{dest.continent}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {dest.tags?.slice(0, 3).map((tag, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-300">
                          {tag}
                        </span>
                      ))}
                      {dest.tags?.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-300">
                          +{dest.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {dest.isTrendingIndian && (
                        <span className="px-2 inline-flex text-[10px] leading-4 font-semibold rounded-full bg-green-100 text-green-800">
                          Indian
                        </span>
                      )}
                      {dest.isTrendingInternational && (
                        <span className="px-2 inline-flex text-[10px] leading-4 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Intl
                        </span>
                      )}
                      {!dest.isTrendingIndian && !dest.isTrendingInternational && (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <Link href={`/admin/destinations/${dest._id}`} className="text-[#BFA181] hover:text-[#a68c70] inline-flex items-center">
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                    <DeleteDestinationButton id={dest._id.toString()} title={dest.name} />
                  </td>
                </tr>
              ))}
              {filteredAndSortedDestinations.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    No destinations found matching your criteria.
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
