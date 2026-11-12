"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Hotel,
  IndianRupee,
  Lock,
  User,
  Phone,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";
import { submitEnquiry } from "@/lib/actions/enquiry";

export default function HotelQuoteForm({ defaultDestination = "" }) {
  const [destination, setDestination] = useState(defaultDestination);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");
  const [hotelType, setHotelType] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (defaultDestination) {
      setDestination(defaultDestination);
    }
  }, [defaultDestination]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      toast.warning("Please enter your travel destination.");
      return;
    }
    if (!fullName.trim() || !phone.trim()) {
      toast.warning("Please enter your name and contact phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitEnquiry("hotel", {
        destination: destination.trim(),
        checkInDate: checkIn || undefined,
        checkOutDate: checkOut || undefined,
        guests,
        budget,
        hotelType,
        fullName: fullName.trim(),
        phone: phone.trim(),
        specialRequests: specialRequests.trim(),
      });

      if (res && res.success) {
        toast.success(
          "Hotel enquiry received! Our concierge team will send personalized options shortly."
        );
        setDestination("");
        setCheckIn("");
        setCheckOut("");
        setGuests("");
        setBudget("");
        setHotelType("");
        setFullName("");
        setPhone("");
        setSpecialRequests("");
      } else {
        toast.error(res?.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Hotel form error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="hotel-quote-form"
      className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-5 sm:p-6 text-zinc-900 border border-zinc-100 transition-all"
    >
      <div className="mb-3.5">
        <h2 className="font-serif text-xl sm:text-[22px] font-bold text-zinc-900 tracking-tight leading-tight">
          Request a Hotel Quote
        </h2>
        <p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed mt-1">
          Tell us your travel details and we&apos;ll find the best hotel
          options, rates and availability for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* Destination */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
            Destination
          </label>
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="(e.g. Dubai, Maldives, Bali)"
              className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
        </div>

        {/* Check-in & Check-out Dates */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Check-in Date
            </label>
            <div className="relative flex items-center">
              <CalendarIcon className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                placeholder="Select date"
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Check-out Date
            </label>
            <div className="relative flex items-center">
              <CalendarIcon className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                placeholder="Select date"
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>
        </div>

        {/* Guests & Budget per night */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Guests
            </label>
            <div className="relative flex items-center">
              <Users className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="(Adults + Children)"
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Budget per night
            </label>
            <div className="relative flex items-center">
              <IndianRupee className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="(e.g. ₹5,000 - ₹20,000)"
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>
        </div>

        {/* Preferred Hotel Type */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
            Preferred Hotel Type
          </label>
          <div className="relative flex items-center">
            <Hotel className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <select
              value={hotelType}
              onChange={(e) => setHotelType(e.target.value)}
              className="w-full pl-9 pr-7 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition appearance-none cursor-pointer"
            >
              <option value="">(3★, 4★, 5★, Resort, Villa, etc.)</option>
              <option value="5-star">5★ Luxury Hotel</option>
              <option value="4-star">4★ Premium Hotel</option>
              <option value="3-star">3★ Comfort Hotel</option>
              <option value="resort">Luxury Beach / Island Resort</option>
              <option value="villa">Private Pool Villa</option>
              <option value="overwater">Overwater Villa (Maldives)</option>
              <option value="boutique">Heritage &amp; Boutique Stay</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-zinc-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
            Any special requests?
          </label>
          <input
            type="text"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="(e.g. sea view, close to beach, family friendly, etc.)"
            className="w-full px-3 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
          />
        </div>

        {/* Contact Details (Name & Phone) */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Your Name *
            </label>
            <div className="relative flex items-center">
              <User className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Phone / WhatsApp *
            </label>
            <div className="relative flex items-center">
              <Phone className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contact number"
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#deb06c] hover:bg-[#d49e52] text-zinc-950 font-semibold rounded-full py-3 text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group active:scale-[0.99] disabled:opacity-75"
          >
            <span>Get Personalized Hotel Options</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-1.5 pt-1 text-zinc-400 text-[11px]">
          <Lock className="w-3 h-3 text-zinc-400" />
          <span>Your details are safe with us</span>
        </div>
      </form>
    </div>
  );
}
