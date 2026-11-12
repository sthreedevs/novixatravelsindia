"use client";

import React, { useState, useRef } from "react";
import { MapPin, Calendar as CalendarIcon, Users, ArrowRight } from "lucide-react";

export default function DayTripsSearchBar({
  onSearch,
  searchDestination = "",
  setSearchDestination,
}) {
  const [destination, setDestination] = useState(searchDestination);
  const [travelDate, setTravelDate] = useState("");
  const [people, setPeople] = useState("");
  const destInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const peopleSelectRef = useRef(null);

  const handleDestinationChange = (val) => {
    setDestination(val);
    if (setSearchDestination) {
      setSearchDestination(val);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        destination,
        travelDate,
        people,
      });
    }
  };

  return (
    <section className="w-full bg-[#07080c] py-6 sm:py-8 lg:py-9 relative z-20 border-b border-white/5">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 sm:gap-3.5 lg:gap-4"
        >
          {/* Pill 1: Destination */}
          <div
            onClick={() => destInputRef.current?.focus()}
            className="flex-1 bg-white rounded-full px-5 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center gap-3.5 cursor-text transition-all hover:shadow-md hover:border-slate-200 min-h-[54px]"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-slate-900 fill-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">
                Destination
              </span>
              <input
                ref={destInputRef}
                type="text"
                value={destination}
                onChange={(e) => handleDestinationChange(e.target.value)}
                placeholder="( e.g. Delhi, Agra, Jaipur )"
                className="w-full bg-transparent text-[11px] text-slate-700 font-medium placeholder:text-slate-400 focus:outline-hidden leading-tight mt-0.5 truncate"
              />
            </div>
          </div>

          {/* Pill 2: Travel Date */}
          <div
            onClick={() => {
              if (dateInputRef.current?.showPicker) {
                dateInputRef.current.showPicker();
              } else {
                dateInputRef.current?.focus();
              }
            }}
            className="flex-1 bg-white rounded-full px-5 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center gap-3.5 cursor-pointer transition-all hover:shadow-md hover:border-slate-200 min-h-[54px]"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <CalendarIcon className="w-4 h-4 text-slate-700 stroke-[2]" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">
                Travel Date
              </span>
              <div className="relative">
                <span className="block text-[11px] text-slate-400 font-medium leading-tight mt-0.5 truncate">
                  {travelDate
                    ? new Date(travelDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "( Select Date)"}
                </span>
                <input
                  ref={dateInputRef}
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Pill 3: No. of People */}
          <div
            onClick={() => peopleSelectRef.current?.focus()}
            className="flex-1 bg-white rounded-full px-5 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center gap-3.5 cursor-pointer transition-all hover:shadow-md hover:border-slate-200 min-h-[54px]"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-slate-900 fill-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">
                No. of People
              </span>
              <select
                ref={peopleSelectRef}
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="w-full bg-transparent text-[11px] text-slate-600 font-medium focus:outline-hidden leading-tight mt-0.5 cursor-pointer appearance-none"
              >
                <option value="">( 1, 2, 3+)</option>
                <option value="1 Person">1 Person</option>
                <option value="2 People">2 People</option>
                <option value="3-4 People">3 - 4 People</option>
                <option value="5-8 People">5 - 8 People (Group)</option>
                <option value="8+ People">8+ People (Large Group)</option>
              </select>
            </div>
          </div>

          {/* Action Button: Find Day Trips → */}
          <div className="shrink-0 flex items-center">
            <button
              type="submit"
              className="w-full md:w-auto h-[54px] px-8 sm:px-9 rounded-full bg-gradient-to-r from-[#f5c77e] to-[#deb06c] hover:brightness-105 active:scale-[0.98] text-slate-950 font-bold text-xs sm:text-[13px] tracking-wide shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Find Day Trips</span>
              <ArrowRight className="w-4 h-4 stroke-[2.4]" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
