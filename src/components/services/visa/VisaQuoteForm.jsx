"use client";

import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  ArrowRight,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";
import { submitEnquiry } from "@/lib/actions/enquiry";

const ALLOWED_VISA_TYPES = new Set(["tourist", "business", "transit"]);

export default function VisaQuoteForm({ defaultCountry = "", defaultVisaType = "" }) {
  const [visaType, setVisaType] = useState(
    ALLOWED_VISA_TYPES.has(defaultVisaType) ? defaultVisaType : ""
  );
  const [destinationCountry, setDestinationCountry] = useState(defaultCountry);
  const [travelDate, setTravelDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (defaultCountry) {
      setDestinationCountry(defaultCountry);
    }
  }, [defaultCountry]);

  React.useEffect(() => {
    if (defaultVisaType && ALLOWED_VISA_TYPES.has(defaultVisaType)) {
      setVisaType(defaultVisaType);
    } else if (defaultVisaType) {
      setVisaType("");
    }
  }, [defaultVisaType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim()) {
      toast.warning("Please provide your name and mobile number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitEnquiry("visa", {
        destinationCountry: destinationCountry.trim(),
        visaType,
        travelDate,
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: emailAddress.trim(),
      });

      if (res && res.success) {
        setSubmitted(true);
        toast.success(
          "Visa enquiry received! Our visa concierge will review your travel details and connect shortly."
        );
      } else {
        toast.error(res?.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Visa form error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        id="visa-quote-form"
        className="w-full max-w-[390px] bg-white rounded-2xl shadow-2xl p-6 text-zinc-900 border border-zinc-100 flex flex-col items-center justify-center text-center py-12"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold font-serif text-zinc-900 mb-2">
          Enquiry Submitted!
        </h3>
        <p className="text-xs text-zinc-600 max-w-xs mb-6">
          Thank you, <span className="font-semibold">{fullName}</span>. Our visa specialist will contact you on <span className="font-semibold">{mobileNumber}</span> with document requirements for <span className="font-semibold">{destinationCountry || "your destination"}</span>.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFullName("");
            setMobileNumber("");
            setEmailAddress("");
            setDestinationCountry("");
            setTravelDate("");
          }}
          className="text-xs text-[#d49e52] hover:text-[#deb06c] font-semibold underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div
      id="visa-quote-form"
      className="w-full max-w-[390px] bg-white rounded-2xl shadow-2xl p-5 sm:p-5.5 text-zinc-900 border border-zinc-100 transition-all"
    >
      <div className="mb-3.5">
        <h2 className="font-serif text-xl sm:text-[22px] font-bold text-zinc-900 tracking-tight leading-tight">
          Apply for Your Visa
        </h2>
        <p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed mt-1">
          Tell us about your travel plans and we&apos;ll guide you with the right visa options and documentation process.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* 1. Select Visa Type */}
        <div>
          <div className="relative flex items-center">
            <Briefcase className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
            <select
              value={visaType}
              onChange={(e) => setVisaType(e.target.value)}
              className="w-full pl-10 pr-8 py-2 text-xs bg-zinc-50/80 border border-zinc-200 rounded-xl text-zinc-800 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Select Visa Type (Tourist / Business / Transit)
              </option>
              <option value="tourist">Tourist Visa</option>
              <option value="business">Business Visa</option>
              <option value="transit">Transit Visa</option>
            </select>
            <div className="pointer-events-none absolute right-3 text-zinc-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* 2. Destination Country */}
        <div>
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              required
              value={destinationCountry}
              onChange={(e) => setDestinationCountry(e.target.value)}
              placeholder="Destination Country (e.g. Dubai, Schengen, USA, UK, etc.)"
              className="w-full pl-10 pr-3.5 py-2 text-xs bg-zinc-50/80 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
        </div>

        {/* 3. Travel Date */}
        <div>
          <div className="relative flex items-center">
            <Calendar className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              placeholder="Travel Date (Select Date)"
              className="w-full pl-10 pr-3.5 py-2 text-xs bg-zinc-50/80 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
        </div>

        {/* 4. Full Name */}
        <div>
          <div className="relative flex items-center">
            <User className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full pl-10 pr-3.5 py-2 text-xs bg-zinc-50/80 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
        </div>

        {/* 5. Mobile Number & Email Address (Side by Side) */}
        <div className="grid grid-cols-2 gap-2">
          <div className="relative flex items-center">
            <Phone className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="tel"
              required
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Mobile Number"
              className="w-full pl-8 pr-2 py-2 text-xs bg-zinc-50/80 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
          <div className="relative flex items-center">
            <Mail className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-8 pr-2 py-2 text-xs bg-zinc-50/80 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-[#deb06c] to-[#d49e52] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 mt-1.5 disabled:opacity-75 cursor-pointer"
        >
          {isSubmitting ? (
            <span className="inline-block animate-spin mr-1">⏳</span>
          ) : (
            <>
              <span>Submit Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Privacy Note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-0.5">
          <Lock className="w-3 h-3 text-zinc-400 shrink-0" />
          <span>Your information is safe with us</span>
        </div>
      </form>
    </div>
  );
}
