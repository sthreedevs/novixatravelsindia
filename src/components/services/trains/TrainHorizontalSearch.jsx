"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar as CalendarIcon,
  Armchair,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-toastify";

export default function TrainHorizontalSearch({ onSearch }) {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelClass, setTravelClass] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromCity.trim() || !toCity.trim()) {
      toast.warning("Please enter both origin and destination stations.");
      return;
    }

    if (onSearch) {
      onSearch({
        fromCity: fromCity.trim(),
        toCity: toCity.trim(),
        travelDate,
        travelClass,
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto -mt-10 sm:-mt-12 lg:-mt-14 relative z-20 px-4">
      <div className="bg-[#0c101d] border border-zinc-800/90 rounded-2xl shadow-2xl p-5 sm:p-6 lg:p-7 backdrop-blur-xl">
        {/* Header */}
        <div className="mb-5 text-left">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight">
            Find Your Perfect Train Journey
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Tell us your travel details, and we&apos;ll suggest the best train options for you.
          </p>
        </div>

        {/* Horizontal Form Fields */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 items-end"
        >
          {/* 1. From Field */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              From
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <MapPin className="w-4 h-4 text-[#deb06c]" />
              </div>
              <input
                type="text"
                required
                placeholder="From (e.g. Delhi)"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="w-full pl-10 pr-4 h-[42px] bg-[#07080c] border border-zinc-800 rounded-full text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#deb06c] focus:border-[#deb06c] transition-all"
              />
            </div>
          </div>

          {/* 2. To Field */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              To
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <MapPin className="w-4 h-4 text-[#deb06c]" />
              </div>
              <input
                type="text"
                required
                placeholder="To (e.g. Mumbai)"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="w-full pl-10 pr-4 h-[42px] bg-[#07080c] border border-zinc-800 rounded-full text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#deb06c] focus:border-[#deb06c] transition-all"
              />
            </div>
          </div>

          {/* 3. Travel Date (Same native input behavior as Flight form) */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Travel Date
            </label>
            <div className="relative flex items-center">
              <CalendarIcon className="w-4 h-4 text-[#deb06c] absolute left-3.5 pointer-events-none" />
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
                placeholder="Select Date"
                min={new Date().toISOString().split("T")[0]}
                className="w-full pl-10 pr-4 h-[42px] bg-[#07080c] border border-zinc-800 focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] rounded-full text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-all cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>

          {/* 4. Class Selector */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Class
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Armchair className="w-4 h-4 text-[#deb06c]" />
              </div>
              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="w-full pl-10 pr-9 h-[42px] bg-[#07080c] border border-zinc-800 rounded-full text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#deb06c] focus:border-[#deb06c] transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Classes</option>
                <option value="1A">AC First Class (1A)</option>
                <option value="2A">AC 2 Tier (2A)</option>
                <option value="3A">AC 3 Tier (3A)</option>
                <option value="CC">AC Chair Car (CC)</option>
                <option value="EC">Exec Chair Car (EC)</option>
                <option value="SL">Sleeper Class (SL)</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 5. Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full h-[42px] px-4 bg-gradient-to-r from-[#deb06c] to-[#d49e52] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>Get Best Options</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

