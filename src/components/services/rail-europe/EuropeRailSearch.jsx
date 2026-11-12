"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-toastify";

export default function EuropeRailSearch({ onSearch }) {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState("3+");
  const [tripType, setTripType] = useState("round-trip");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromCity.trim() || !toCity.trim()) {
      toast.warning("Please enter both departure and destination stations.");
      return;
    }

    if (onSearch) {
      onSearch({
        fromCity: fromCity.trim(),
        toCity: toCity.trim(),
        travelDate,
        travelers,
        tripType,
      });
    }
  };

  return (
    <section className="w-full bg-[#f8f9fc] border-b border-slate-200/80 py-8 sm:py-10 text-zinc-900 relative z-20">
      <div className="w-full px-4 lg:px-10">
        {/* Header matching Image 1 */}
        <div className="mb-6 text-left">
          <span className="text-[#c8923a] text-xs font-bold tracking-[0.18em] uppercase block mb-1">
            Plan Your Europe Rail Journey
          </span>
          <p className="text-xs sm:text-sm text-slate-600">
            Tell us your travel details and we&apos;ll suggest the best rail routes, passes and itineraries for you.
          </p>
        </div>

        {/* 6 Form Columns Grid matching Image 1 (5 Cards + 1 Gold Pill Button) */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 items-center"
        >
          {/* 1. From Card */}
          <div className="bg-white border border-slate-200/90 hover:border-[#deb06c] rounded-xl shadow-sm hover:shadow-md transition-all p-2.5 px-3.5 flex items-center gap-3 min-h-[58px]">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <MapPin className="w-4 h-4 text-slate-700" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-[11px] font-bold text-slate-800 leading-tight">
                From
              </label>
              <input
                type="text"
                required
                placeholder="(e.g. Delhi)"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="text-xs text-slate-700 placeholder:text-slate-400 bg-transparent border-0 p-0 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* 2. To Card */}
          <div className="bg-white border border-slate-200/90 hover:border-[#deb06c] rounded-xl shadow-sm hover:shadow-md transition-all p-2.5 px-3.5 flex items-center gap-3 min-h-[58px]">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <MapPin className="w-4 h-4 text-slate-700" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-[11px] font-bold text-slate-800 leading-tight">
                To
              </label>
              <input
                type="text"
                required
                placeholder="(e.g. Paris)"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="text-xs text-slate-700 placeholder:text-slate-400 bg-transparent border-0 p-0 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* 3. Travel Date Card (Native Date Picker) */}
          <div className="bg-white border border-slate-200/90 hover:border-[#deb06c] rounded-xl shadow-sm hover:shadow-md transition-all p-2.5 px-3.5 flex items-center gap-3 min-h-[58px] cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <CalendarIcon className="w-4 h-4 text-slate-700" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-[11px] font-bold text-slate-800 leading-tight">
                Travel Date
              </label>
              <input
                type="text"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                onFocus={(e) => {
                  e.target.type = "date";
                  try {
                    e.target.showPicker?.();
                  } catch (err) {}
                }}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                onClick={(e) => {
                  e.target.type = "date";
                  try {
                    e.target.showPicker?.();
                  } catch (err) {}
                }}
                placeholder="(Select Date)"
                min={new Date().toISOString().split("T")[0]}
                className="text-xs text-slate-700 placeholder:text-slate-400 bg-transparent border-0 p-0 focus:outline-none w-full cursor-pointer [color-scheme:light]"
              />
            </div>
          </div>

          {/* 4. Travelers Card */}
          <div className="bg-white border border-slate-200/90 hover:border-[#deb06c] rounded-xl shadow-sm hover:shadow-md transition-all p-2.5 px-3.5 flex items-center gap-3 min-h-[58px]">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Users className="w-4 h-4 text-slate-700" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-[11px] font-bold text-slate-800 leading-tight">
                Travelers
              </label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="text-xs text-slate-700 bg-transparent border-0 p-0 focus:outline-none w-full appearance-none cursor-pointer"
              >
                <option value="1">(1 Traveler)</option>
                <option value="2">(2 Travelers)</option>
                <option value="3+">(1, 2, 3+)</option>
                <option value="family">(Family 4+)</option>
                <option value="group">(Group 5+)</option>
              </select>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 pointer-events-none" />
          </div>

          {/* 5. Trip Type Card */}
          <div className="bg-white border border-slate-200/90 hover:border-[#deb06c] rounded-xl shadow-sm hover:shadow-md transition-all p-2.5 px-3.5 flex items-center gap-3 min-h-[58px]">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <label className="text-[11px] font-bold text-slate-800 leading-tight">
                Trip Type
              </label>
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="text-xs text-slate-700 bg-transparent border-0 p-0 focus:outline-none w-full appearance-none cursor-pointer"
              >
                <option value="round-trip">(One Way / Round Trip)</option>
                <option value="one-way">(One Way)</option>
                <option value="eurail-pass">(Eurail Global Pass)</option>
                <option value="custom-multi-city">(Custom Multi-City)</option>
              </select>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 pointer-events-none" />
          </div>

          {/* 6. Gold Pill Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full h-[58px] px-6 bg-[#f0bb62] hover:bg-[#deb06c] active:scale-[0.99] text-zinc-950 font-bold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Get Best Options</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
