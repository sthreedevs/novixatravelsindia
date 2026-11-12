"use client";

import React, { useState } from "react";
import { User, Phone, Mail, Shield, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { submitEnquiry } from "@/lib/actions/enquiry";

export default function PassportQuoteForm({ defaultService = "" }) {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [serviceType, setServiceType] = useState(defaultService);
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (defaultService) {
      setServiceType(defaultService);
    }
  }, [defaultService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim()) {
      toast.warning("Please provide your name and mobile number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitEnquiry("passport", {
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: emailAddress.trim(),
        serviceType: serviceType || "New Passport Application",
        query: query.trim(),
      });

      if (res && res.success) {
        setSubmitted(true);
        toast.success(
          "Passport application enquiry received! Our advisor will contact you shortly."
        );
      } else {
        toast.error(res?.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Passport form error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        id="passport-quote-form"
        className="w-full max-w-[390px] bg-white rounded-2xl shadow-2xl p-6 text-zinc-900 border border-zinc-100 flex flex-col items-center justify-center text-center py-12"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold font-serif text-zinc-900 mb-2">
          Request Submitted!
        </h3>
        <p className="text-xs text-zinc-600 max-w-xs mb-6">
          Thank you, <span className="font-semibold">{fullName}</span>. Our passport specialist will call you on <span className="font-semibold">{mobileNumber}</span> with document checklists and appointment guidance.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFullName("");
            setMobileNumber("");
            setEmailAddress("");
            setQuery("");
          }}
          className="text-xs text-[#d49e52] hover:text-[#deb06c] font-semibold underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div
      id="passport-quote-form"
      className="w-full max-w-[390px] bg-white rounded-2xl shadow-2xl p-5 sm:p-6 text-zinc-900 border border-zinc-100 transition-all"
    >
      <div className="mb-4">
        <h2 className="font-serif text-xl sm:text-[22px] font-bold text-zinc-900 tracking-tight leading-tight">
          Apply for Your Passport
        </h2>
        <p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed mt-1">
          Share your details and we&apos;ll guide you through the complete process.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Full Name */}
        <div>
          <div className="relative flex items-center">
            <User className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-zinc-50/80 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <div className="relative flex items-center">
            <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
            <input
              type="tel"
              required
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Mobile Number"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-zinc-50/80 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <div className="relative flex items-center">
            <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-zinc-50/80 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
        </div>

        {/* Service Type */}
        <div>
          <div className="relative flex items-center">
            <Shield className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 text-xs bg-zinc-50/80 border border-zinc-200 rounded-xl text-zinc-800 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Service Type (New Passport / Reissue / Tatkal / Lost / Damaged)
              </option>
              <option value="new-passport">New Passport Application (Fresh)</option>
              <option value="reissue">Reissue of Passport (Expired / Renewal)</option>
              <option value="tatkal">Tatkal Urgent Service</option>
              <option value="lost-damaged">Lost / Damaged Passport Assistance</option>
              <option value="name-address-change">Name / Address Change in Passport</option>
              <option value="document-guidance">Document Guidance & Verification</option>
            </select>
            <div className="pointer-events-none absolute right-3 text-zinc-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Your Query (Optional) */}
        <div>
          <textarea
            rows={2}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Your Query (Optional)"
            className="w-full px-3.5 py-2 text-xs bg-zinc-50/80 border border-zinc-200 rounded-xl text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-gradient-to-r from-[#deb06c] to-[#d49e52] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 mt-2 disabled:opacity-75 cursor-pointer"
        >
          {isSubmitting ? (
            <span className="inline-block animate-spin mr-1">⏳</span>
          ) : (
            <>
              <span>Submit Request</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Privacy Note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1">
          <Lock className="w-3 h-3 text-zinc-400 shrink-0" />
          <span>Your information is safe with us</span>
        </div>
      </form>
    </div>
  );
}
