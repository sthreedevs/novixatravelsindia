"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Briefcase,
  Calendar,
  Search,
  ChevronDown,
  Check,
} from "lucide-react";
import { filterOptions } from "@/data/services/packages.data";

export default function PackagesSearchBar({
  onFilterChange,
  destination,
  setDestination,
  travelType,
  setTravelType,
  budget,
  setBudget,
  duration,
  setDuration,
  onSearch,
  destinationOptions,
}) {
  const activeDestinations = destinationOptions || filterOptions.destinations;
  const [openDropdown, setOpenDropdown] = useState(null); // 'destination' | 'travelType' | 'budget' | 'duration' | null
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const handleDestinationSelect = (dest) => {
    setDestination(dest === "All Destinations" ? "" : dest);
    setOpenDropdown(null);
    if (onFilterChange) onFilterChange({ destination: dest === "All Destinations" ? "" : dest });
  };

  const handleTravelTypeSelect = (type) => {
    setTravelType(type === "All Types" ? "" : type);
    setOpenDropdown(null);
    if (onFilterChange) onFilterChange({ travelType: type === "All Types" ? "" : type });
  };

  const handleBudgetSelect = (b) => {
    setBudget(b.label === "Select Budget" ? null : b);
    setOpenDropdown(null);
    if (onFilterChange) onFilterChange({ budget: b.label === "Select Budget" ? null : b });
  };

  const handleDurationSelect = (d) => {
    setDuration(d.label === "Select Duration" ? null : d);
    setOpenDropdown(null);
    if (onFilterChange) onFilterChange({ duration: d.label === "Select Duration" ? null : d });
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-6xl mx-auto bg-[#070b14]/95 backdrop-blur-md border border-[#deb06c]/70 rounded-2xl lg:rounded-full p-2 sm:p-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.65)] relative z-30"
    >
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-1.5 lg:gap-0">
        {/* 1. Destination */}
        <div className="relative flex-1 px-3 sm:px-4 py-2 sm:py-1">
          <button
            type="button"
            onClick={() => toggleDropdown("destination")}
            className="w-full flex items-center justify-between gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Clean gold icon */}
              <MapPin className="w-5 h-5 text-[#f0c27b] fill-[#f0c27b]/15 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-white text-xs sm:text-[13px] font-semibold tracking-wide">
                  Destination
                </div>
                <div className="text-zinc-400 text-[11px] sm:text-xs truncate border-b border-zinc-700/80 pb-0.5 mt-0.5 group-hover:border-[#f0c27b]/70 transition-colors">
                  {destination || "Select Destination"}
                </div>
              </div>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                openDropdown === "destination" ? "rotate-180 text-[#f0c27b]" : ""
              }`}
            />
          </button>

          {/* Destination Dropdown */}
          {openDropdown === "destination" && (
            <div className="absolute left-0 lg:left-2 top-full mt-2 w-64 max-h-64 overflow-y-auto bg-[#0d1424] border border-[#233554] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-3 py-1">
                Select Destination
              </div>
              {activeDestinations.map((dest) => {
                const isSelected =
                  (!destination && dest === "All Destinations") || destination === dest;
                return (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => handleDestinationSelect(dest)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#deb06c]/20 text-[#deb06c] font-semibold"
                        : "text-zinc-200 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{dest}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#deb06c]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-[1px] h-8 bg-zinc-700/60 my-auto shrink-0" />

        {/* 2. Travel Type */}
        <div className="relative flex-1 px-3 sm:px-4 py-2 sm:py-1">
          <button
            type="button"
            onClick={() => toggleDropdown("travelType")}
            className="w-full flex items-center justify-between gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Briefcase className="w-5 h-5 text-[#f0c27b] shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-white text-xs sm:text-[13px] font-semibold tracking-wide">
                  Travel Type
                </div>
                <div className="text-zinc-400 text-[11px] sm:text-xs truncate border-b border-zinc-700/80 pb-0.5 mt-0.5 group-hover:border-[#f0c27b]/70 transition-colors">
                  {travelType || "All Types"}
                </div>
              </div>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                openDropdown === "travelType" ? "rotate-180 text-[#f0c27b]" : ""
              }`}
            />
          </button>

          {/* Travel Type Dropdown */}
          {openDropdown === "travelType" && (
            <div className="absolute left-0 lg:left-2 top-full mt-2 w-56 max-h-64 overflow-y-auto bg-[#0d1424] border border-[#233554] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-3 py-1">
                Select Travel Type
              </div>
              {filterOptions.travelTypes.map((type) => {
                const isSelected = (!travelType && type === "All Types") || travelType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTravelTypeSelect(type)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#deb06c]/20 text-[#deb06c] font-semibold"
                        : "text-zinc-200 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{type}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#deb06c]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-[1px] h-8 bg-zinc-700/60 my-auto shrink-0" />

        {/* 3. Budget */}
        <div className="relative flex-1 px-3 sm:px-4 py-2 sm:py-1">
          <button
            type="button"
            onClick={() => toggleDropdown("budget")}
            className="w-full flex items-center justify-between gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-[#f0c27b] font-bold text-lg leading-none w-5 text-center shrink-0">
                ₹
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-white text-xs sm:text-[13px] font-semibold tracking-wide">
                  Budget
                </div>
                <div className="text-zinc-400 text-[11px] sm:text-xs truncate border-b border-zinc-700/80 pb-0.5 mt-0.5 group-hover:border-[#f0c27b]/70 transition-colors">
                  {budget?.label || "Select Budget"}
                </div>
              </div>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                openDropdown === "budget" ? "rotate-180 text-[#f0c27b]" : ""
              }`}
            />
          </button>

          {/* Budget Dropdown */}
          {openDropdown === "budget" && (
            <div className="absolute left-0 lg:left-2 top-full mt-2 w-60 max-h-64 overflow-y-auto bg-[#0d1424] border border-[#233554] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-3 py-1">
                Select Budget Range
              </div>
              {filterOptions.budgets.map((b) => {
                const isSelected =
                  (!budget && b.label === "Select Budget") || budget?.label === b.label;
                return (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => handleBudgetSelect(b)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#deb06c]/20 text-[#deb06c] font-semibold"
                        : "text-zinc-200 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{b.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#deb06c]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-[1px] h-8 bg-zinc-700/60 my-auto shrink-0" />

        {/* 4. Duration */}
        <div className="relative flex-1 px-3 sm:px-4 py-2 sm:py-1">
          <button
            type="button"
            onClick={() => toggleDropdown("duration")}
            className="w-full flex items-center justify-between gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Calendar className="w-5 h-5 text-[#f0c27b] shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-white text-xs sm:text-[13px] font-semibold tracking-wide">
                  Duration
                </div>
                <div className="text-zinc-400 text-[11px] sm:text-xs truncate border-b border-zinc-700/80 pb-0.5 mt-0.5 group-hover:border-[#f0c27b]/70 transition-colors">
                  {duration?.label || "Select Duration"}
                </div>
              </div>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                openDropdown === "duration" ? "rotate-180 text-[#f0c27b]" : ""
              }`}
            />
          </button>

          {/* Duration Dropdown */}
          {openDropdown === "duration" && (
            <div className="absolute left-0 lg:left-2 top-full mt-2 w-56 max-h-64 overflow-y-auto bg-[#0d1424] border border-[#233554] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-3 py-1">
                Select Duration
              </div>
              {filterOptions.durations.map((d) => {
                const isSelected =
                  (!duration && d.label === "Select Duration") || duration?.label === d.label;
                return (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => handleDurationSelect(d)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#deb06c]/20 text-[#deb06c] font-semibold"
                        : "text-zinc-200 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{d.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#deb06c]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 5. Find Packages Button */}
        <div className="px-1.5 py-1.5 shrink-0">
          <button
            type="button"
            onClick={onSearch}
            className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#f0c27b] hover:bg-[#e6b567] text-zinc-950 font-semibold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[2.4]" />
            <span>Find Packages</span>
          </button>
        </div>
      </div>
    </div>
  );
}
