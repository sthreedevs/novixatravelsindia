"use client";

import React from "react";
import { MapPin, Clock, Users, Navigation, Languages } from "lucide-react";

export default function DayTripSpecsBar({ specs }) {
  if (!specs) return null;

  const items = [
    {
      id: "destination",
      label: "Destination",
      value: specs.destination || "Agra",
      icon: <MapPin className="w-4 h-4 text-[#b37f28]" />,
    },
    {
      id: "duration",
      label: "Duration",
      value: specs.duration || "Full Day (approx. 10–12 hours)",
      icon: <Clock className="w-4 h-4 text-[#b37f28]" />,
    },
    {
      id: "tourType",
      label: "Tour Type",
      value: specs.tourType || "Private / Small Group",
      icon: <Users className="w-4 h-4 text-[#b37f28]" />,
    },
    {
      id: "pickup",
      label: "Pickup",
      value: specs.pickup || "Delhi or Agra",
      icon: <Navigation className="w-4 h-4 text-[#b37f28]" />,
    },
    {
      id: "language",
      label: "Language",
      value: specs.language || "English / Russian on request",
      icon: <Languages className="w-4 h-4 text-[#b37f28]" />,
    },
  ];

  return (
    <div className="relative z-20 -mt-6 sm:-mt-8 w-full px-4 sm:px-6 lg:px-10 xl:px-14">
      <div className="bg-white border border-stone-200/90 rounded-2xl md:rounded-full shadow-xl shadow-stone-900/5 px-5 py-4 sm:px-8 sm:py-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 items-center">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-start md:items-center gap-3 px-2 sm:px-4 ${
                idx === 4 ? "col-span-2 md:col-span-1 justify-center md:justify-start pt-1 md:pt-0" : ""
              } ${
                idx !== items.length - 1
                  ? "md:border-r md:border-stone-200"
                  : ""
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-[#fbf5eb] flex items-center justify-center shrink-0 mt-0.5 md:mt-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] sm:text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="block text-xs sm:text-[13px] font-bold text-stone-900 truncate">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
