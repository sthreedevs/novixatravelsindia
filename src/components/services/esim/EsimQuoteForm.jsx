"use client";

import React, { useState, useEffect } from "react";
import {
  Smartphone,
  Globe,
  Wifi,
  User,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";

export default function EsimQuoteForm({ defaultDestination = "" }) {
  const [destination, setDestination] = useState(defaultDestination || "Dubai");
  const [dataPack, setDataPack] = useState("10GB • 15 Days Validity");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defaultDestination) {
      setDestination(defaultDestination);
    }
  }, [defaultDestination]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      toast.warning("Please choose your travel destination.");
      return;
    }
    if (!fullName.trim()) {
      toast.warning("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      toast.warning("Please enter your phone / WhatsApp number.");
      return;
    }
    if (!email.trim()) {
      toast.warning("Please enter your email address for QR delivery.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      const parts = fullName.trim().split(" ");
      const firstName = parts[0] || fullName;
      const lastName = parts.slice(1).join(" ") || "";

      formData.append("fullName", fullName.trim());
      formData.append("firstName", firstName);
      formData.append("lastName", lastName || "Traveler");
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("countryOfTravel", destination);
      formData.append("dataPack", dataPack);

      const { submitEnquiry } = await import("@/lib/actions/enquiry.js");
      const result = await submitEnquiry("eSim", formData);

      if (result && result.success) {
        toast.success(
          "eSIM request received! Our connectivity specialist will WhatsApp and email your activation package shortly."
        );
        setFullName("");
        setPhone("");
        setEmail("");
      } else {
        toast.error(result?.error || "Failed to submit eSIM request. Please try again.");
      }
    } catch (err) {
      console.error("eSIM enquiry error:", err);
      toast.error("An error occurred while submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="esim-quote-form"
      className="w-full max-w-[390px] sm:max-w-[410px] bg-white rounded-2xl shadow-2xl p-5 sm:p-6 text-zinc-900 border border-zinc-100 transition-all relative z-10"
    >
      {/* Header */}
      <div className="mb-3.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#deb06c]/15 text-[#9e712a] text-[10px] font-bold uppercase tracking-wider mb-1.5">
          <Smartphone className="w-3 h-3 text-[#deb06c]" />
          Instant Connectivity
        </div>
        <h2 className="font-serif text-xl sm:text-[22px] font-bold text-zinc-900 tracking-tight leading-tight">
          Request an eSIM Quote
        </h2>
        <p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed mt-1">
          Get high-speed data in 190+ countries. Zero roaming fees and instant QR delivery to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* Destination Selection */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1">
            <Globe className="w-3 h-3 text-[#deb06c]" />
            Travel Destination *
          </label>
          <div className="relative">
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="w-full h-9 px-3 rounded-lg bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-hidden focus:border-[#deb06c] focus:bg-white transition-colors"
            >
              <option value="Dubai">Dubai (UAE)</option>
              <option value="Thailand">Thailand</option>
              <option value="Europe">Europe (33 Countries)</option>
              <option value="USA">USA & Canada</option>
              <option value="Singapore">Singapore & Malaysia</option>
              <option value="Global">Global (140+ Countries)</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Bali / Indonesia">Bali / Indonesia</option>
              <option value="Japan">Japan</option>
              <option value="Turkey">Turkey</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Other">Other / Multi-Country</option>
            </select>
          </div>
        </div>

        {/* Data Pack & Validity */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1">
            <Wifi className="w-3 h-3 text-[#deb06c]" />
            Data Pack & Validity *
          </label>
          <select
            value={dataPack}
            onChange={(e) => setDataPack(e.target.value)}
            className="w-full h-9 px-3 rounded-lg bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-900 focus:outline-hidden focus:border-[#deb06c] focus:bg-white transition-colors"
          >
            <option value="5GB • 7 Days Validity">5GB • 7 Days Validity</option>
            <option value="10GB • 15 Days Validity">10GB • 15 Days Validity (Popular)</option>
            <option value="20GB • 30 Days Validity">20GB • 30 Days Validity (Best Value)</option>
            <option value="Unlimited Data • 10 Days">Unlimited Data • 10 Days</option>
            <option value="Custom Plan">Custom / Flexible Plan</option>
          </select>
        </div>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1">
            <User className="w-3 h-3 text-[#deb06c]" />
            Full Name *
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className="w-full h-9 px-3 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-hidden focus:border-[#deb06c] focus:bg-white transition-colors placeholder:text-zinc-400"
          />
        </div>

        {/* Phone / WhatsApp & Email in 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#deb06c]" />
              WhatsApp / Phone *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full h-9 px-3 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-hidden focus:border-[#deb06c] focus:bg-white transition-colors placeholder:text-zinc-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1">
              <Mail className="w-3 h-3 text-[#deb06c]" />
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full h-9 px-3 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-hidden focus:border-[#deb06c] focus:bg-white transition-colors placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 px-4 rounded-full bg-gradient-to-r from-[#deb06c] via-[#d49e52] to-[#c28f46] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
          >
            <span>{isSubmitting ? "Submitting Request..." : "Request eSIM Activation"}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-1 flex items-center justify-center gap-1 text-[10px] text-zinc-500 text-center">
          <ShieldCheck className="w-3 h-3 text-[#deb06c] shrink-0" />
          <span>Instant Email Delivery • Keep Your WhatsApp Number</span>
        </div>
      </form>
    </div>
  );
}
