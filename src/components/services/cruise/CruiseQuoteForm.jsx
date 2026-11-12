"use client";

import React, { useState, useEffect } from "react";
import {
  Ship,
  MapPin,
  Calendar,
  Users,
  Compass,
  Phone,
  User,
  Lock,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";

export default function CruiseQuoteForm({ defaultDestination = "" }) {
  const [destination, setDestination] = useState(defaultDestination);
  const [departurePort, setDeparturePort] = useState("");
  const [duration, setDuration] = useState("5-7 Nights");
  const [travelers, setTravelers] = useState("2 Adults");
  const [cabinType, setCabinType] = useState("Balcony Stateroom");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defaultDestination) {
      setDestination(defaultDestination);
    }
  }, [defaultDestination]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      toast.warning("Please choose or enter your cruise destination.");
      return;
    }
    if (!phone.trim()) {
      toast.warning("Please enter your phone / WhatsApp number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("preferredCruiseDestination", destination);
      formData.append("preferredDepartureCity", departurePort || "Flexible");
      formData.append("numberOfNights", duration);
      formData.append("numberOfAdults", travelers);
      formData.append("cabinPreference", cabinType);
      formData.append("fullName", fullName);
      formData.append("phone", phone);

      const { submitEnquiry } = await import("@/lib/actions/enquiry.js");
      const result = await submitEnquiry("cruise", formData);

      if (result && result.success) {
        toast.success(
          "Cruise enquiry received! Our cruise specialist will connect with tailored sailings and rates shortly."
        );
        setFullName("");
        setPhone("");
        setDeparturePort("");
      } else {
        toast.error(result?.error || "Failed to submit cruise request. Please try again.");
      }
    } catch (err) {
      console.error("Cruise enquiry error:", err);
      toast.error("An error occurred while submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="cruise-quote-form"
      className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-5 sm:p-6 text-zinc-900 border border-zinc-100 transition-all relative z-10"
    >
      <div className="mb-3.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#deb06c]/15 text-[#9e712a] text-[10px] font-bold uppercase tracking-wider mb-1.5">
          <Ship className="w-3 h-3 text-[#deb06c]" />
          Instant Cruise Quotation
        </div>
        <h2 className="font-serif text-xl sm:text-[22px] font-bold text-zinc-900 tracking-tight leading-tight">
          Request a Cruise Quote
        </h2>
        <p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed mt-1">
          Tell us your sailing dreams and we&apos;ll handpick the best cruise lines,
          exclusive stateroom upgrades and rates for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* Cruise Destination / Region */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
            Cruise Destination / Region
          </label>
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Dubai, Singapore, Mediterranean, Alaska"
              className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
        </div>

        {/* Departure Port / Sailing Month */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
            Departure Port / Sailing Month
          </label>
          <div className="relative flex items-center">
            <Compass className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={departurePort}
              onChange={(e) => setDeparturePort(e.target.value)}
              placeholder="e.g. Singapore, Mumbai, Barcelona (or Nov 2026)"
              className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
        </div>

        {/* Duration & Travelers */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Sailing Duration
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full pl-8 pr-2 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition appearance-none cursor-pointer"
              >
                <option value="3-5 Nights">3-5 Nights</option>
                <option value="5-7 Nights">5-7 Nights</option>
                <option value="8-10 Nights">8-10 Nights</option>
                <option value="11-14 Nights">11-14 Nights</option>
                <option value="15+ Nights">15+ Nights (Grand Voyage)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Guests
            </label>
            <div className="relative flex items-center">
              <Users className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full pl-8 pr-2 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition appearance-none cursor-pointer"
              >
                <option value="1 Guest">1 Guest</option>
                <option value="2 Adults">2 Adults</option>
                <option value="2 Adults, 1 Child">2 Adults + 1 Kid</option>
                <option value="Family (4 Guests)">Family (4 Guests)</option>
                <option value="Group 5+ Guests">Group 5+ Guests</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cabin Preference */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
            Cabin Preference
          </label>
          <div className="relative flex items-center">
            <Ship className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <select
              value={cabinType}
              onChange={(e) => setCabinType(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition appearance-none cursor-pointer"
            >
              <option value="Interior Stateroom">Interior Stateroom (Value)</option>
              <option value="Ocean View Stateroom">Ocean View Stateroom</option>
              <option value="Balcony Stateroom">Balcony Stateroom (Most Popular)</option>
              <option value="Luxury Suite">Luxury Penthouse / Haven Suite</option>
            </select>
          </div>
        </div>

        {/* Contact Info: Name & Phone */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Your Name
            </label>
            <div className="relative flex items-center">
              <User className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              WhatsApp / Phone
            </label>
            <div className="relative flex items-center">
              <Phone className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91..."
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#deb06c] via-[#e5bd7e] to-[#deb06c] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold text-xs sm:text-sm rounded-full shadow-lg shadow-[#deb06c]/25 flex items-center justify-center gap-2 transition duration-200 disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? (
            <span>Securing Best Rates...</span>
          ) : (
            <>
              <span>Request a Cruise Quote</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 pt-1">
          <Lock className="w-3 h-3 text-[#deb06c]" />
          <span>Official Cruise Lines Partner • Best Price Guarantee</span>
        </div>
      </form>
    </div>
  );
}
