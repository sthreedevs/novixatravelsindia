"use client";

import React, { useState } from "react";
import {
  Calendar,
  Users,
  MapPin,
  Compass,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  X,
  Phone,
  User,
} from "lucide-react";
import { toast } from "react-toastify";

export default function DayTripBookingCard({ trip }) {
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState("2 Adults");
  const [pickupCity, setPickupCity] = useState("Delhi");
  const [tourType, setTourType] = useState("Private Tour");

  // Contact Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!phoneNumber.trim()) {
      toast.error("Please enter your WhatsApp / phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("tripId", trip?._id || trip?.id || "day-trip");
      formData.append("tripTitle", trip?.title || "Day Trip");
      formData.append("fullName", fullName.trim());
      formData.append("phoneNumber", phoneNumber.trim());
      formData.append("phone", phoneNumber.trim());
      formData.append("pickupLocation", pickupCity);
      formData.append("tourType", tourType);
      formData.append(
        "date",
        travelDate || new Date().toISOString().split("T")[0]
      );
      formData.append(
        "numberOfAdults",
        travelers.match(/\d+/) ? travelers.match(/\d+/)[0] : "2"
      );
      formData.append("numberOfChildren", "0");
      formData.append(
        "emergencyContact",
        `Pickup: ${pickupCity} | Tour: ${tourType} | Notes: Custom Day Trip Quote Request`
      );
      formData.append(
        "notes",
        `Pickup: ${pickupCity} | Tour: ${tourType} | Travelers: ${travelers}`
      );

      const { submitEnquiry } = await import("@/lib/actions/enquiry.js");
      const res = await submitEnquiry("dayTrip", formData);

      if (res && res.success) {
        toast.success(
          `Thank you, ${fullName}! Your quote request for ${trip?.title || "Day Trip"} has been submitted.`
        );
        setIsModalOpen(false);
        setFullName("");
        setPhoneNumber("");
      } else {
        toast.error(res?.error || "Failed to submit quote request. Please try again.");
      }
    } catch (err) {
      console.error("Day trip booking card submission error:", err);
      toast.error("An error occurred while submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Responsive Luxury Quote Card (Centered on Mobile, Slim & Sticky on Desktop) */}
      <div
        id="day-trip-quote-card"
        className="w-full max-w-md sm:max-w-[400px] lg:max-w-[360px] bg-[#faf8f5] border border-[#e8dfd1] rounded-2xl p-5 sm:p-5 lg:p-4.5 shadow-xl shadow-stone-900/5 transition-all mx-auto lg:ml-auto"
      >
        {/* Header with Title & Starting Price */}
        <div className="pb-3.5 border-b border-[#e8dfd1]">
          <h3 className="text-xl sm:text-[22px] font-serif font-bold text-slate-900 leading-tight">
            Plan Your Day Trip
          </h3>

          <div className="mt-2">
            <span className="text-[11px] text-slate-500 font-medium block">
              Starting from
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl sm:text-[26px] font-bold font-serif text-slate-900 tracking-tight">
                {trip?.startingPrice || "₹2,499"}
              </span>
              <span className="text-xs text-slate-500 font-medium">per person</span>
            </div>
            <span className="text-[10px] text-slate-400 block -mt-0.5">
              (indicative price)
            </span>
            <p className="text-xs sm:text-[11px] text-slate-500 leading-relaxed sm:leading-snug mt-1.5">
              Final quote depends on pickup city, travel date, group size, transport and inclusions.
            </p>
          </div>
        </div>

        {/* 4 Touch-Friendly Inputs */}
        <form onSubmit={handleOpenModal} className="pt-4 sm:pt-3.5 space-y-3 sm:space-y-3">
          {/* 1. Select Travel Date */}
          <div>
            <label className="flex items-center gap-1.5 text-xs sm:text-xs font-semibold text-slate-700 mb-1.5 sm:mb-1">
              <Calendar className="w-3.5 h-3.5 text-slate-700" />
              <span>Select Travel Date</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full h-11 sm:h-9 bg-white border border-stone-300 rounded-xl sm:rounded-lg px-3 text-sm sm:text-xs text-slate-800 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* 2. Number of Travelers */}
          <div>
            <label className="flex items-center gap-1.5 text-xs sm:text-xs font-semibold text-slate-700 mb-1.5 sm:mb-1">
              <Users className="w-3.5 h-3.5 text-slate-700" />
              <span>Number of Travelers</span>
            </label>
            <div className="relative">
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full h-11 sm:h-9 bg-white border border-stone-300 rounded-xl sm:rounded-lg px-3 text-sm sm:text-xs text-slate-800 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition-all cursor-pointer appearance-none pr-8"
              >
                <option value="2 Adults">2 Adults</option>
                <option value="1 Adult">1 Adult (Solo)</option>
                <option value="3 Adults">3 Adults</option>
                <option value="4-6 Adults">4–6 Adults (Family)</option>
                <option value="7+ Adults">7+ Adults (Group)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 sm:top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 3. Pickup Location */}
          <div>
            <label className="flex items-center gap-1.5 text-xs sm:text-xs font-semibold text-slate-700 mb-1.5 sm:mb-1">
              <MapPin className="w-3.5 h-3.5 text-slate-700" />
              <span>Pickup Location</span>
            </label>
            <div className="relative">
              <select
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
                className="w-full h-11 sm:h-9 bg-white border border-stone-300 rounded-xl sm:rounded-lg px-3 text-sm sm:text-xs text-slate-800 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition-all cursor-pointer appearance-none pr-8"
              >
                <option value="Delhi">Delhi</option>
                <option value="Gurgaon / Noida">Gurgaon / Noida</option>
                <option value="Agra">Agra</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Other">Other Location</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 sm:top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* 4. Private or Group Tour */}
          <div>
            <label className="flex items-center gap-1.5 text-xs sm:text-xs font-semibold text-slate-700 mb-1.5 sm:mb-1">
              <Compass className="w-3.5 h-3.5 text-slate-700" />
              <span>Private or Group Tour</span>
            </label>
            <div className="relative">
              <select
                value={tourType}
                onChange={(e) => setTourType(e.target.value)}
                className="w-full h-11 sm:h-9 bg-white border border-stone-300 rounded-xl sm:rounded-lg px-3 text-sm sm:text-xs text-slate-800 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition-all cursor-pointer appearance-none pr-8"
              >
                <option value="Private Tour">Private Tour</option>
                <option value="Small Group Tour">Small Group Tour</option>
                <option value="Luxury Custom Tour">Luxury Custom Tour</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 sm:top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full h-12 sm:h-10 mt-2 rounded-full bg-gradient-to-r from-[#e7bc78] via-[#deb06c] to-[#c99849] hover:brightness-105 active:scale-[0.98] text-zinc-950 font-bold text-sm sm:text-xs shadow-md shadow-[#deb06c]/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Get My Custom Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 3 Trust Bullets */}
        <div className="space-y-2 sm:space-y-1.5 pt-4 sm:pt-3.5 mt-3 border-t border-[#e8dfd1]">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#b37f28] shrink-0" />
            <span>No payment required to enquire</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#b37f28] shrink-0" />
            <span>Transparent inclusions</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#b37f28] shrink-0" />
            <span>Confirmation subject to availability</span>
          </div>
        </div>
      </div>

      {/* 2-Step Contact Modal for Enquiry Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm sm:max-w-md w-full p-5 sm:p-6 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200 mx-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 cursor-pointer"
            >
              <X className="w-5 h-5 sm:w-4 sm:h-4" />
            </button>

            <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900 mb-1 pr-6">
              Where should we send your quote?
            </h4>
            <p className="text-xs sm:text-sm text-stone-500 mb-4 leading-relaxed">
              We will prepare your custom pricing for {trip?.title || "this trip"} and WhatsApp you directly.
            </p>

            <form onSubmit={handleFinalSubmit} className="space-y-3.5 sm:space-y-3">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 sm:h-10 pl-10 pr-3 bg-white border border-stone-300 rounded-xl sm:rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full h-11 sm:h-10 pl-10 pr-3 bg-white border border-stone-300 rounded-xl sm:rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 sm:h-11 mt-4 rounded-full bg-gradient-to-r from-[#e7bc78] via-[#deb06c] to-[#c99849] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                    <span>Submitting Quote...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm &amp; Send Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
