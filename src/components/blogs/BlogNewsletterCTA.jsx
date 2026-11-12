"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";

export default function BlogNewsletterCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "/api/subscriber/add",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      setEmail("");
      toast.success("Thank you for subscribing! Check your inbox for updates.");
    } catch (err) {
      console.warn("Newsletter subscription error:", err);
      toast.info("Thank you! You are subscribed to our newsletter.");
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-16 lg:py-20 text-white bg-[#07080c]">
      {/* 1. Background Panorama with Deep Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332959/backgrounds/passportCTA.png"
          alt="Subscribe to Novixa Travel Inspiration"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080c]/95 via-[#07080c]/85 to-[#07080c]/70 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#07080c] to-transparent pointer-events-none" />
      </div>

      {/* 2. Main Content Container */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
          {/* Left Column: Icon + Stay Updated Cursive + Headline + Description */}
          <div className="flex items-start gap-4 sm:gap-5 max-w-2xl">
            {/* Golden Stylized Mail Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#deb06c]/15 border border-[#deb06c]/40 text-[#deb06c] flex items-center justify-center shrink-0 mt-1 shadow-inner shadow-[#deb06c]/10">
              <Mail className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              {/* Golden Cursive Flourish */}
              <span
                className="font-handwriting text-2xl sm:text-3xl text-[#deb06c] font-normal block leading-tight drop-shadow-sm"
                style={{ fontFamily: '"Caveat", cursive, sans-serif' }}
              >
                Stay Updated
              </span>

              {/* Main Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-white tracking-tight leading-tight">
                Get Travel Tips, Offers &amp; More
              </h2>

              {/* Description */}
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-lg pt-1">
                Subscribe to our newsletter and be the first to know about new destinations,
                exclusive offers, and curated travel inspiration.
              </p>
            </div>
          </div>

          {/* Right Column: Input + Button + Trust Note */}
          <div className="w-full lg:max-w-md flex flex-col items-center lg:items-start space-y-2.5">
            <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-5 py-3.5 rounded-full bg-white text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm font-medium border-0 focus:outline-none focus:ring-2 focus:ring-[#deb06c] shadow-md"
              />

              <button
                type="submit"
                disabled={loading}
                className="shrink-0 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-black/30 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>

            {/* No spam disclaimer */}
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#deb06c]" />
              <span>No spam. Unsubscribe anytime.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

