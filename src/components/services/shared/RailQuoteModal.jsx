"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Train,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import { submitEnquiry } from "@/lib/actions/enquiry";

/**
 * Shared quote-capture modal for /services/trains and /services/rail-europe.
 * Collects contact details and prefilled journey/pass data and persists to MongoDB via submitEnquiry.
 */
export default function RailQuoteModal({
  isOpen,
  onClose,
  mode = "train",
  initialData = {},
}) {
  const [railMode, setRailMode] = useState("ticket");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [passType, setPassType] = useState("");
  const [countries, setCountries] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelClass, setTravelClass] = useState("all");
  const [tripType, setTripType] = useState("round-trip");
  const [travelers, setTravelers] = useState("2");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    setRailMode(initialData.subType === "pass" ? "pass" : "ticket");
    setFrom(initialData.from || "");
    setTo(initialData.to || "");
    setPassType(initialData.passType || "");
    setCountries(initialData.countries || "");
    setTravelDate(initialData.travelDate || "");
    setTravelClass(initialData.travelClass || "all");
    setTripType(initialData.tripType || "round-trip");
    setTravelers(initialData.travelers || "2");
    setNotes(initialData.notes || "");
  }, [isOpen, initialData]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEuropePass = mode === "europeRail" && railMode === "pass";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      toast.warning("Please enter your full name and contact phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      let enquiryType = "train";
      let payload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        ...(email.trim() ? { email: email.trim() } : {}),
        ...(travelDate ? { travelDate } : {}),
        numberOfAdults: travelers,
        ...(notes.trim() ? { message: notes.trim() } : {}),
      };

      if (mode === "train") {
        enquiryType = "train";
        payload = {
          ...payload,
          from: from.trim() || "Flexible",
          to: to.trim() || "Flexible",
          travelClass,
          numberOfPassengers: travelers,
        };
      } else if (isEuropePass) {
        enquiryType = "europeRailPass";
        payload = {
          ...payload,
          passType: passType.trim() || "Eurail Global Pass",
          country: countries.trim() || (from && to ? `${from} - ${to}` : "Europe Multi-Country"),
          ...(travelDate ? { validFrom: travelDate } : {}),
        };
      } else {
        enquiryType = "europeRailTicket";
        payload = {
          ...payload,
          from: from.trim() || "Flexible",
          to: to.trim() || "Flexible",
          tripType,
        };
      }

      const res = await submitEnquiry(enquiryType, payload);
      if (res && res.success) {
        setSubmitted(true);
        toast.success(
          mode === "train"
            ? "Train quote request submitted! Our rail specialist will contact you shortly."
            : "Europe Rail request submitted! Our rail specialist will share routes, passes and fares shortly."
        );
      } else {
        toast.error(res?.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      console.error("Rail quote submission error:", err);
      toast.error("An error occurred while submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0c101d] border border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-7 text-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Quote Request Received!
            </h3>
            <p className="text-sm text-zinc-300 max-w-sm mx-auto">
              Thank you, <span className="text-[#deb06c] font-semibold">{fullName}</span>. Our rail concierge will reach out on{" "}
              <span className="font-semibold">{phone}</span> with the best schedules and fares.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#deb06c] hover:bg-[#d49e52] text-zinc-950 font-bold px-8 py-2.5 rounded-full text-sm transition cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 pr-8">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#deb06c]/15 text-[#deb06c] text-[10px] font-bold uppercase tracking-wider mb-2">
                <Train className="w-3 h-3" />
                {mode === "train" ? "Train Concierge Booking" : "Europe Rail Specialist"}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                {mode === "train"
                  ? "Request Train Ticket Quote"
                  : isEuropePass
                  ? "Request Eurail Pass / Package Quote"
                  : "Request Europe Rail Ticket Quote"}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Confirm your contact details below to receive seat availability, timings, and lowest fares.
              </p>
            </div>

            {mode === "europeRail" && (
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#07080c] border border-zinc-800 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => setRailMode("ticket")}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    railMode === "ticket"
                      ? "bg-[#deb06c] text-zinc-950"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Point-to-Point Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setRailMode("pass")}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    railMode === "pass"
                      ? "bg-[#deb06c] text-zinc-950"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Eurail Pass / Package
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {isEuropePass ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                      Pass / Package Name
                    </label>
                    <input
                      type="text"
                      value={passType}
                      onChange={(e) => setPassType(e.target.value)}
                      placeholder="e.g. Eurail Global Pass"
                      className="w-full px-3 py-2.5 bg-[#07080c] border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#deb06c]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                      Countries / Region
                    </label>
                    <input
                      type="text"
                      value={countries}
                      onChange={(e) => setCountries(e.target.value)}
                      placeholder="e.g. Switzerland, France, Italy"
                      className="w-full px-3 py-2.5 bg-[#07080c] border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#deb06c]"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                      From Station / City
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-[#deb06c] absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder={mode === "train" ? "e.g. Delhi" : "e.g. Paris"}
                        className="w-full pl-8 pr-3 py-2.5 bg-[#07080c] border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#deb06c]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                      To Station / City
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-[#deb06c] absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder={mode === "train" ? "e.g. Mumbai" : "e.g. London"}
                        className="w-full pl-8 pr-3 py-2.5 bg-[#07080c] border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#deb06c]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Travel Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-[#deb06c] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="date"
                      value={travelDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-2.5 bg-[#07080c] border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#deb06c] [color-scheme:dark]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Travelers
                  </label>
                  <div className="relative">
                    <Users className="w-3.5 h-3.5 text-[#deb06c] absolute left-3 top-3 pointer-events-none" />
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 bg-[#07080c] border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#deb06c]"
                    >
                      <option value="1">1 Traveler</option>
                      <option value="2">2 Travelers</option>
                      <option value="3+">3-4 Travelers</option>
                      <option value="family">Family (4+)</option>
                      <option value="group">Group (5+)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#deb06c] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-8 pr-3 py-2.5 bg-[#07080c] border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#deb06c]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#deb06c] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-8 pr-3 py-2.5 bg-[#07080c] border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#deb06c]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#deb06c] absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-8 pr-3 py-2.5 bg-[#07080c] border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#deb06c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Additional Notes / Class Preferences
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Preferred train name, timing, coach class, or special requests..."
                  className="w-full px-3 py-2 bg-[#07080c] border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#deb06c] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#deb06c] to-[#d49e52] hover:brightness-105 text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-60 cursor-pointer"
              >
                <span>{isSubmitting ? "Submitting Request..." : "Submit Rail Quote Request"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#deb06c]" />
                <span>Dedicated Rail Specialist • Best Route &amp; Fare Assistance</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

