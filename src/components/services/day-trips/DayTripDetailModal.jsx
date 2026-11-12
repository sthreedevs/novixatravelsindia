"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  User,
  Calendar,
  Send,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";

export default function DayTripDetailModal({ trip, isOpen, onClose, fallbackTripId }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [guestCount, setGuestCount] = useState("2 Guests");
  const [specialNotes, setSpecialNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !trip) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      toast.warning("Please provide your name and contact number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      const parts = fullName.trim().split(" ");
      const firstName = parts[0] || fullName;
      const lastName = parts.slice(1).join(" ") || "Traveler";

      // 24-character hex check for MongoDB ObjectId
      const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);
      const dayTripId = isValidObjectId(trip?._id)
        ? trip._id
        : isValidObjectId(trip?.id)
        ? trip.id
        : (fallbackTripId || "6817b37381df43424be00735");

      formData.append("dayTrip", dayTripId);
      formData.append("tripId", dayTripId);
      formData.append("fullName", fullName.trim());
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone.trim());
      if (email.trim()) {
        formData.append("email", email.trim());
      }
      formData.append("destination", trip.location || "India");
      formData.append("tripTitle", trip.title || "Day Trip");
      formData.append("travelDate", travelDate ? new Date(travelDate).toISOString() : new Date().toISOString());
      formData.append("pickupLocation", trip.location || "Delhi");
      formData.append("dropLocation", trip.location || "Delhi");
      formData.append("paymentMethod", "Inquiry");
      formData.append("paymentStatus", "Pending");
      formData.append("numberOfAdults", guestCount.includes("1 Guest") ? "1" : "2");
      formData.append("numberOfChildren", "0");
      if (specialNotes.trim()) {
        formData.append("notes", specialNotes.trim());
        formData.append("emergencyContact", specialNotes.trim());
      }

      const { submitEnquiry } = await import("@/lib/actions/enquiry.js");
      const res = await submitEnquiry("dayTrip", formData);

      if (res && res.success) {
        toast.success(
          `Inquiry sent for ${trip.title}! Our destination specialist will contact you via WhatsApp shortly.`
        );
        setFullName("");
        setPhone("");
        setEmail("");
        setSpecialNotes("");
        onClose();
      } else {
        toast.error(res?.error || "Failed to send inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Day trip modal submission error:", err);
      toast.error("An error occurred while submitting your inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto no-scrollbar bg-[#0c0e15] border border-zinc-800 rounded-3xl shadow-2xl text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-[#deb06c] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Image Banner */}
        <div className="relative h-52 sm:h-64 w-full bg-zinc-900 overflow-hidden">
          <Image
            src={trip.image || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png"}
            alt={trip.title}
            fill
            unoptimized
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e15] via-[#0c0e15]/40 to-transparent" />

          {/* Destination Badge & Title on Image */}
          <div className="absolute bottom-4 left-4 sm:left-6 right-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#deb06c] text-xs font-semibold border border-[#deb06c]/30 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{trip.location}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {trip.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-1">
              {trip.highlights}
            </p>
          </div>
        </div>

        {/* Content Body: Two Columns (Trip Details + Quick Quote Form) */}
        <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Specs, Inclusions & Overview */}
          <div className="lg:col-span-7 space-y-5">
            {/* Quick Specs Badges */}
            <div className="flex flex-wrap items-center gap-3 py-2.5 px-4 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs text-zinc-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#deb06c]" />
                <span>{trip.duration}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-700" />
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#deb06c]" />
                <span>{trip.type}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-zinc-700" />
              <div className="text-white font-bold">
                {trip.price} <span className="text-zinc-400 font-normal">{trip.priceSuffix}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-[#deb06c] uppercase tracking-wider mb-1.5">
                Overview
              </h4>
              <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                {trip.description}
              </p>
            </div>

            {/* Inclusions */}
            {trip.inclusions && trip.inclusions.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-[#deb06c] uppercase tracking-wider mb-2">
                  What&apos;s Included
                </h4>
                <ul className="space-y-1.5">
                  {trip.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {trip.exclusions && trip.exclusions.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  What&apos;s Not Included
                </h4>
                <ul className="space-y-1.5">
                  {trip.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                      <XCircle className="w-3.5 h-3.5 text-rose-400/80 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Instant Booking Enquiry Form */}
          <div className="lg:col-span-5 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#deb06c] uppercase tracking-wider mb-1">
                <Send className="w-3 h-3" />
                <span>Instant Enquiry</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-white tracking-tight">
                Book This Day Trip
              </h3>
              <p className="text-zinc-400 text-[11px] leading-relaxed mt-0.5 mb-4">
                Fill your details to receive customized rates, pickup timing, and vehicle options.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#deb06c]" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full h-9 px-3 rounded-lg bg-[#0c0e15] border border-zinc-700/80 text-xs text-white placeholder:text-zinc-500 focus:outline-hidden focus:border-[#deb06c]"
                  />
                </div>

                {/* WhatsApp / Phone */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#deb06c]" />
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full h-9 px-3 rounded-lg bg-[#0c0e15] border border-zinc-700/80 text-xs text-white placeholder:text-zinc-500 focus:outline-hidden focus:border-[#deb06c]"
                  />
                </div>

                {/* Email (Optional) */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#deb06c]" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full h-9 px-3 rounded-lg bg-[#0c0e15] border border-zinc-700/80 text-xs text-white placeholder:text-zinc-500 focus:outline-hidden focus:border-[#deb06c]"
                  />
                </div>

                {/* Travel Date & Guests */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#deb06c]" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg bg-[#0c0e15] border border-zinc-700/80 text-xs text-white focus:outline-hidden focus:border-[#deb06c] cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#deb06c]" />
                      Guests
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full h-9 px-2 rounded-lg bg-[#0c0e15] border border-zinc-700/80 text-xs text-white focus:outline-hidden focus:border-[#deb06c] cursor-pointer"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3-4 Guests">3-4 Guests</option>
                      <option value="5-8 Guests">5-8 Guests</option>
                      <option value="8+ Large Group">8+ Group</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-10 px-4 rounded-full bg-gradient-to-r from-[#e5b869] via-[#deb06c] to-[#c7984a] hover:brightness-105 active:scale-[0.98] text-zinc-950 font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Request Day Trip Quote"}</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 text-center pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#deb06c]" />
                  <span>No upfront payment • Instant confirmation</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
