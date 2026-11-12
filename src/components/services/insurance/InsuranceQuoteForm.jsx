"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  ArrowRight,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";
import { submitEnquiry } from "@/lib/actions/enquiry";

export default function InsuranceQuoteForm({
  defaultDestination = "",
  defaultPlan = "",
}) {
  const [destination, setDestination] = useState(defaultDestination);
  const [travelDates, setTravelDates] = useState("");
  const [travellers, setTravellers] = useState("1");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    if (!mobileNumber.trim() && !emailAddress.trim()) {
      toast.warning("Please provide your contact number or email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitEnquiry("insurance", {
        destination: destination.trim(),
        destinationCountry: destination.trim(),
        travelDates,
        travellers,
        fullName: fullName.trim() || undefined,
        email: emailAddress.trim(),
        mobileNumber: mobileNumber.trim(),
        plan: defaultPlan || undefined,
      });

      if (res && res.success) {
        setSubmitted(true);
        toast.success(
          "Insurance enquiry received! Our insurance advisor will share top policy quotes shortly."
        );
      } else {
        toast.error(res?.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Insurance form error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        id="insurance-quote-form"
        className="w-full max-w-[390px] bg-white rounded-2xl shadow-2xl p-6 text-zinc-900 border border-zinc-100 flex flex-col items-center justify-center text-center py-12"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3 shadow-inner">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="font-serif font-bold text-xl text-[#0b1325] tracking-tight">
          Quote Request Received!
        </h3>
        <p className="text-xs text-zinc-500 mt-2 max-w-xs leading-relaxed">
          Thank you! Our travel insurance specialist will compare leading plans for{" "}
          <strong className="text-zinc-800">{destination || "your trip"}</strong>{" "}
          and connect with the best quotes via WhatsApp &amp; Email.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setDestination("");
            setTravelDates("");
            setTravellers("1");
            setEmailAddress("");
            setMobileNumber("");
          }}
          className="mt-6 text-xs text-[#b88636] font-semibold underline underline-offset-4 hover:text-[#996b24] cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div
      id="insurance-quote-form"
      className="w-full max-w-[390px] bg-white rounded-2xl shadow-2xl p-5 sm:p-6 text-zinc-900 border border-zinc-100 relative"
    >
      {/* Form Header */}
      <div className="mb-4 text-left">
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0b1325] tracking-tight">
          Get Travel Insurance
        </h3>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
          Share your travel details and we&apos;ll help you find the best plan for your trip.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Destination Field */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 mb-1">
            Destination
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <MapPin className="w-4 h-4 text-[#deb06c]" />
            </div>
            <input
              type="text"
              required
              placeholder="Destination (e.g. Dubai, Europe, USA)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#deb06c] focus:border-[#deb06c] transition-all"
            />
          </div>
        </div>

        {/* Travel Dates Field */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 mb-1">
            Travel Dates
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Calendar className="w-4 h-4 text-[#deb06c]" />
            </div>
            <input
              type="text"
              placeholder="Select dates (e.g. 15 Nov - 25 Nov)"
              value={travelDates}
              onChange={(e) => setTravelDates(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#deb06c] focus:border-[#deb06c] transition-all"
            />
          </div>
        </div>

        {/* Traveller(s) Selector */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 mb-1">
            Traveller(s)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Users className="w-4 h-4 text-[#deb06c]" />
            </div>
            <select
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#deb06c] focus:border-[#deb06c] transition-all appearance-none cursor-pointer"
            >
              <option value="1">1 Traveller (Solo)</option>
              <option value="2">2 Travellers (Couple / Duo)</option>
              <option value="3">3 Travellers (Family / Group)</option>
              <option value="4">4 Travellers</option>
              <option value="5+">5+ Travellers (Group)</option>
            </select>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 mb-1">
            Your Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <User className="w-4 h-4 text-[#deb06c]" />
            </div>
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#deb06c] focus:border-[#deb06c] transition-all"
            />
          </div>
        </div>

        {/* Contact Info (Side-by-side or stacked) */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Mail className="w-4 h-4 text-[#deb06c]" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#deb06c] focus:border-[#deb06c] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 mb-1">
            Mobile Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Phone className="w-4 h-4 text-[#deb06c]" />
            </div>
            <input
              type="tel"
              required
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#deb06c] focus:border-[#deb06c] transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#deb06c] to-[#d49e52] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-75"
        >
          <span>{isSubmitting ? "Submitting..." : "Get a Free Quote"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Privacy micro-note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 pt-1">
          <Lock className="w-3 h-3 text-zinc-400" />
          <span>Your information is safe with us.</span>
        </div>
      </form>
    </div>
  );
}
