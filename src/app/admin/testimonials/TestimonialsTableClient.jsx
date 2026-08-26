"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Pencil, Search, ArrowUpDown } from "lucide-react";
import DeleteTestimonialButton from "./DeleteTestimonialButton";
import { Input } from "@/components/ui/input";

export default function TestimonialsTableClient({ initialTestimonials }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSorted = useMemo(() => {
    let filtered = [...(initialTestimonials || [])];
    
    // Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        t => 
          t.name?.toLowerCase().includes(lowerQuery) || 
          t.designation?.toLowerCase().includes(lowerQuery) ||
          t.review?.toLowerCase().includes(lowerQuery)
      );
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
  }, [initialTestimonials, searchQuery, sortConfig]);

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
            placeholder="Search by name, designation, or review..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Sorting Controls */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
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
                    <span>Reviewer Name</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Review Content
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
              {filteredAndSorted.map((testimonial) => (
                <tr key={testimonial._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 relative rounded-full overflow-hidden bg-gray-100">
                        <img 
                          src={testimonial.image || "/placeholder.jpg"} 
                          alt="" 
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                      <div className="ml-4 max-w-[200px]">
                        <div className="text-sm font-medium text-gray-900 dark:text-white capitalize truncate" title={testimonial.name}>
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-500 capitalize truncate" title={testimonial.designation}>
                          {testimonial.designation}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-lg">
                    <p className="line-clamp-2" title={testimonial.review}>{testimonial.review}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <Link href={`/admin/testimonials/${testimonial._id}`} className="text-[#BFA181] hover:text-[#a68c70] inline-flex items-center">
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                    <DeleteTestimonialButton id={testimonial._id.toString()} name={testimonial.name} />
                  </td>
                </tr>
              ))}
              {filteredAndSorted.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    No testimonials found matching your criteria.
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
