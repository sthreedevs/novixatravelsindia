"use client";
import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { Mail, Briefcase, Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function EnquiriesDashboardClient({ contacts, bookings }) {
  const [activeTab, setActiveTab] = useState("contacts");
  
  // Shared state for simple searching
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredContacts = useMemo(() => {
    let filtered = [...(contacts || [])];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.firstName?.toLowerCase().includes(q) ||
        c.lastName?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.enterYourMessage?.toLowerCase().includes(q)
      );
    }
    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key] || "";
      let bVal = b[sortConfig.key] || "";
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [contacts, searchQuery, sortConfig]);

  const filteredBookings = useMemo(() => {
    let filtered = [...(bookings || [])];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(b => 
        b.name?.toLowerCase().includes(q) ||
        b.email?.toLowerCase().includes(q) ||
        b.phone?.toLowerCase().includes(q) ||
        b.packageId?.title?.toLowerCase().includes(q)
      );
    }
    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key] || "";
      let bVal = b[sortConfig.key] || "";
      
      // Handle nested package title sort
      if (sortConfig.key === "packageName") {
        aVal = a.packageId?.title || "";
        bVal = b.packageId?.title || "";
      }

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [bookings, searchQuery, sortConfig]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Enquiries Management
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-zinc-900 p-1 rounded-lg w-fit">
        <button
          onClick={() => { setActiveTab("contacts"); setSearchQuery(""); setSortConfig({ key: "createdAt", direction: "desc" }); }}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "contacts" 
              ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm" 
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          <Mail className="w-4 h-4 mr-2" />
          Contact Forms
          <span className="ml-2 bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
            {contacts?.length || 0}
          </span>
        </button>
        <button
          onClick={() => { setActiveTab("bookings"); setSearchQuery(""); setSortConfig({ key: "createdAt", direction: "desc" }); }}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "bookings" 
              ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm" 
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          <Briefcase className="w-4 h-4 mr-2" />
          Package Bookings
          <span className="ml-2 bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
            {bookings?.length || 0}
          </span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800">
        <div className="relative w-full sm:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            type="text"
            placeholder={activeTab === "contacts" ? "Search names or emails..." : "Search names, emails, or packages..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Tables */}
      <div className="bg-white dark:bg-zinc-900 shadow rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === "contacts" ? (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
              <thead className="bg-gray-50 dark:bg-zinc-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group" onClick={() => handleSort("createdAt")}>
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group" onClick={() => handleSort("firstName")}>
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
                {filteredContacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(contact.createdAt), "MMM d, yyyy h:mm a")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {contact.firstName} {contact.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">{contact.email}</a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-md">
                      <p className="truncate" title={contact.enterYourMessage}>{contact.enterYourMessage}</p>
                    </td>
                  </tr>
                ))}
                {filteredContacts.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      No contact enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
              <thead className="bg-gray-50 dark:bg-zinc-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group" onClick={() => handleSort("createdAt")}>
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group" onClick={() => handleSort("name")}>
                    <div className="flex items-center space-x-1">
                      <span>Customer Details</span>
                      <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group" onClick={() => handleSort("packageName")}>
                    <div className="flex items-center space-x-1">
                      <span>Package</span>
                      <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Special Request
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(booking.createdAt), "MMM d, yyyy h:mm a")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">{booking.name}</div>
                      <div className="text-sm text-gray-500"><a href={`mailto:${booking.email}`} className="text-blue-600 hover:underline">{booking.email}</a></div>
                      <div className="text-sm text-gray-500"><a href={`tel:${booking.phone}`} className="text-blue-600 hover:underline">{booking.phone}</a></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#BFA181]">
                        {booking.packageId ? booking.packageId.title : "Custom / Unknown Package"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {booking.days}D / {booking.nights}N
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-md">
                      <p className="truncate" title={booking.specialRequest}>{booking.specialRequest || "-"}</p>
                    </td>
                  </tr>
                ))}
                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      No package booking enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
