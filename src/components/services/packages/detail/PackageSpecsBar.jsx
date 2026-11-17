"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { MapPin, Calendar, Users, Star, ChevronDown, X } from "lucide-react";

export default function PackageSpecsBar({ specs }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const destination = specs?.destination || "";
  const duration = specs?.duration || "";
  const bestFor = specs?.bestFor || "";
  const packageType = specs?.packageType || "";

  // Parse destinations into a clean array (e.g., "Kochi, Munnar, Thekkady, Alleppey")
  const destinations = useMemo(() => {
    if (Array.isArray(specs?.destinationsList) && specs.destinationsList.length > 0) {
      return specs.destinationsList;
    }
    const raw = destination || "";
    return raw
      .split(/[,•|/]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [specs?.destinationsList, destination]);

  const hasMultipleDestinations = destinations.length > 1;

  // Handle outside click to close dropdown (for mobile / tap interactions)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle desktop hover with graceful delay to prevent accidental closing
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 180);
  };

  if (!specs) return null;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl lg:rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-zinc-200/90 py-3.5 px-6 sm:px-8 relative z-30">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 items-center">
        {/* 1. Destination (Destinations Covered) */}
        <div
          ref={dropdownRef}
          onMouseEnter={hasMultipleDestinations ? handleMouseEnter : undefined}
          onMouseLeave={hasMultipleDestinations ? handleMouseLeave : undefined}
          className="relative flex items-center gap-3 lg:px-4 min-w-0"
        >
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 text-[#9e6714] shadow-xs">
            <MapPin className="w-4 h-4 text-[#9e6714]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              <span>{hasMultipleDestinations ? "Destinations" : "Destination"}</span>
              {hasMultipleDestinations && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-[#9e6714] border border-amber-300/60 leading-none">
                  {destinations.length}
                </span>
              )}
            </div>

            {hasMultipleDestinations ? (
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-expanded={isDropdownOpen}
                className="w-full flex items-center justify-between gap-1 text-xs sm:text-sm font-bold text-zinc-900 hover:text-[#9e6714] transition-colors text-left cursor-pointer py-0.5 group/btn"
              >
                <span className="truncate">
                  {destinations[0]}{" "}
                  <span className="text-[#9e6714] font-semibold">
                    +{destinations.length - 1} more
                  </span>
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#9e6714] shrink-0 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            ) : (
              <div
                className="text-xs sm:text-sm font-bold text-zinc-900 truncate"
                title={destinations[0] || destination}
              >
                {destinations[0] || destination}
              </div>
            )}
          </div>

          {/* Floating Dropdown Card Listing All Covered Destinations */}
          {hasMultipleDestinations && isDropdownOpen && (
            <div className="absolute left-0 lg:left-2 top-full mt-3 w-[280px] sm:w-[300px] bg-white/98 backdrop-blur-md rounded-2xl border border-amber-200/90 shadow-[0_20px_45px_rgba(0,0,0,0.16)] p-4 text-left z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Upward pointer caret */}
              <div className="absolute -top-1.5 left-7 w-3 h-3 bg-white border-t border-l border-amber-200/90 rotate-45" />

              {/* Popover Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-100/90 text-[#9e6714] flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-[#9e6714]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 leading-tight">
                      Destinations Covered
                    </h4>
                    <p className="text-[10px] text-zinc-500">
                      {destinations.length} destinations in this package
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(false);
                  }}
                  className="text-zinc-400 hover:text-zinc-600 p-1 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* List of All Destinations Covered */}
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-0.5">
                {destinations.map((city, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-amber-50/60 border border-amber-200/60 hover:bg-amber-100/60 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#9e6714] shrink-0" />
                    <span className="text-xs font-semibold text-zinc-900 truncate">
                      {city}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. Duration */}
        <div className="flex items-center gap-3 lg:px-4 lg:border-l lg:border-zinc-200/80 min-w-0">
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 text-[#9e6714] shadow-xs">
            <Calendar className="w-4 h-4 text-[#9e6714]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Duration
            </div>
            <div
              className="text-xs sm:text-sm font-bold text-zinc-900 truncate"
              title={duration}
            >
              {duration}
            </div>
          </div>
        </div>

        {/* 3. Best For */}
        <div className="flex items-center gap-3 lg:px-4 lg:border-l lg:border-zinc-200/80 min-w-0">
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 text-[#9e6714] shadow-xs">
            <Users className="w-4 h-4 text-[#9e6714]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Best For
            </div>
            <div
              className="text-xs sm:text-sm font-bold text-zinc-900 truncate"
              title={bestFor}
            >
              {bestFor}
            </div>
          </div>
        </div>

        {/* 4. Package Type */}
        <div className="flex items-center gap-3 lg:px-4 lg:border-l lg:border-zinc-200/80 min-w-0">
          <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 text-[#9e6714] shadow-xs">
            <Star className="w-4 h-4 text-[#9e6714] fill-[#9e6714]/20" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Package Type
            </div>
            <div
              className="text-xs sm:text-sm font-bold text-zinc-900 truncate"
              title={packageType}
            >
              {packageType}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
