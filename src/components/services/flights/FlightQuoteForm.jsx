"use client";

import React, { useState } from "react";
import {
  Plane,
  MapPin,
  Calendar as CalendarIcon,
  User,
  Phone,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";
import { submitEnquiry } from "@/lib/actions/enquiry";

export default function FlightQuoteForm({ selectedCity, onResetSelectedCity }) {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState(selectedCity || "");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengersClass, setPassengersClass] = useState("1 Adult, Economy");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if selectedCity changes from parent
  React.useEffect(() => {
    if (selectedCity) {
      setToCity(selectedCity);
    }
  }, [selectedCity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromCity.trim() || !toCity.trim()) {
      toast.warning("Please enter departure and destination cities.");
      return;
    }
    if (!fullName.trim() || !phone.trim()) {
      toast.warning("Please enter your name and contact phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitEnquiry("flight", {
        from: fromCity.trim(),
        to: toCity.trim(),
        departureDate,
        returnDate,
        passengersClass,
        fullName: fullName.trim(),
        phone: phone.trim(),
        specialRequests: specialRequests.trim(),
      });

      if (res && res.success) {
        toast.success(
          "Flight quote request submitted! Our travel specialists will get back to you shortly."
        );
        setFromCity("");
        setToCity("");
        setDepartureDate("");
        setReturnDate("");
        setFullName("");
        setPhone("");
        setSpecialRequests("");
        if (onResetSelectedCity) onResetSelectedCity();
      } else {
        toast.error(res?.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Flight form error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="flight-quote-form"
      className="w-full max-w-[430px] lg:ml-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-7 text-zinc-900 border border-zinc-100"
    >
      <h2 className="font-serif text-2xl font-bold text-zinc-900 tracking-tight mb-1">
        Request a Flight Quote
      </h2>
      <p className="text-zinc-500 text-xs leading-normal mb-5">
        Tell us your travel details and we&apos;ll get back with the best
        options, fares and availability.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Row 1: From & To */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              From
            </label>
            <div className="relative flex items-center">
              <Plane className="w-3.5 h-3.5 text-zinc-500 absolute left-3 pointer-events-none -rotate-45" />
              <input
                type="text"
                required
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                placeholder="Departure City"
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              To
            </label>
            <div className="relative flex items-center">
              <MapPin className="w-3.5 h-3.5 text-zinc-500 absolute left-3 pointer-events-none" />
              <input
                type="text"
                required
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                placeholder="Destination City"
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Departure Date & Return Date */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Departure Date
            </label>
            <div className="relative flex items-center">
              <CalendarIcon className="w-3.5 h-3.5 text-zinc-500 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                placeholder="Select Date"
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
              Return Date
            </label>
            <div className="relative flex items-center">
              <CalendarIcon className="w-3.5 h-3.5 text-zinc-500 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                placeholder="Select Date"
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>
        </div>

        {/* Row 3: Passengers & Class */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
            Passengers &amp; Class
          </label>
          <div className="relative flex items-center">
            <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={passengersClass}
              onChange={(e) => setPassengersClass(e.target.value)}
              placeholder="1 Adult, Economy"
              className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
        </div>

        {/* Row 4: Contact Details (Name & Phone) */}
        <div className="grid grid-cols-2 gap-3">
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
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
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
                className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>
        </div>

        {/* Row 5: Any Special Requests? */}
        <div>
          <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
            Any Special Requests? (Optional)
          </label>
          <textarea
            rows={2}
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="e.g. Non-stop, specific airline, window seat etc."
            className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition resize-none h-16"
          />
        </div>

        {/* Row 5: Submit Button */}
        <div className="pt-1">
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#deb06c] hover:bg-[#d49e52] text-zinc-900 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Submit Flight Request</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Row 6: Security Note */}
        <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          <span>Your details are safe with us</span>
        </div>
      </form>
    </div>
  );
}
