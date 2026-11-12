"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Car,
  User,
  Phone,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";
import { submitEnquiry } from "@/lib/actions/enquiry";

export default function CarRentalQuoteForm({ selectedRoute, onResetSelectedRoute }) {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState(selectedRoute || "");
  const [dateTime, setDateTime] = useState("");
  const [passengers, setPassengers] = useState("1-2 Passengers");
  const [serviceType, setServiceType] = useState("Car Rental (Self-Drive)");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (selectedRoute) {
      setToLocation(selectedRoute);
    }
  }, [selectedRoute]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromLocation.trim() || !toLocation.trim()) {
      toast.warning("Please enter both pickup and destination locations.");
      return;
    }
    if (!fullName.trim() || !phone.trim()) {
      toast.warning("Please enter your name and contact phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitEnquiry("transport", {
        fromLocation: fromLocation.trim(),
        toLocation: toLocation.trim(),
        dateTime,
        passengers,
        serviceType,
        carBusType: serviceType,
        fullName: fullName.trim(),
        phone: phone.trim(),
      });

      if (res && res.success) {
        toast.success(
          `Ride request submitted! Our team will contact you with ${serviceType} options shortly.`
        );
        setFromLocation("");
        setToLocation("");
        setDateTime("");
        setFullName("");
        setPhone("");
        if (onResetSelectedRoute) onResetSelectedRoute();
      } else {
        toast.error(res?.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Car rental form error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="car-quote-form"
      className="w-full max-w-[370px] lg:max-w-[380px] lg:ml-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-5 text-zinc-900 border border-zinc-100"
    >
      <h2 className="font-serif text-xl sm:text-[22px] font-bold text-zinc-900 tracking-tight leading-tight mb-0.5">
        Request a Ride / Transfer
      </h2>
      <p className="text-zinc-500 text-[11px] leading-snug mb-3.5">
        Tell us your travel details and we&apos;ll get back with the best
        options, fares and availability.
      </p>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* Row 1: From Location */}
        <div>
          <label className="block text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mb-0.5">
            From
          </label>
          <div className="relative flex items-center">
            <MapPin className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              required
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              placeholder="e.g. Delhi, Airport, Hotel"
              className="w-full pl-7 pr-2.5 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
        </div>

        {/* Row 2: To Location */}
        <div>
          <label className="block text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mb-0.5">
            To
          </label>
          <div className="relative flex items-center">
            <MapPin className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              required
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              placeholder="e.g. Agra, Jaipur, Hotel"
              className="w-full pl-7 pr-2.5 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
            />
          </div>
        </div>

        {/* Row 3: Date & Time + Passengers */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mb-0.5">
              Date &amp; Time
            </label>
            <div className="relative flex items-center">
              <CalendarIcon className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                onFocus={(e) => (e.target.type = "datetime-local")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                placeholder="Select Date & Time"
                className="w-full pl-7 pr-2 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mb-0.5">
              Passengers
            </label>
            <div className="relative flex items-center">
              <Users className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full pl-7 pr-2 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition appearance-none cursor-pointer"
              >
                <option value="1 Passenger">1 Passenger</option>
                <option value="2 Passengers">2 Passengers</option>
                <option value="3-4 Passengers">3-4 Passengers</option>
                <option value="5-7 Passengers (SUV)">5-7 Passengers (SUV)</option>
                <option value="8+ Passengers (Tempo)">8+ Passengers (Tempo)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 4: Service Type Dropdown */}
        <div>
          <label className="block text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mb-0.5">
            Service Type
          </label>
          <div className="relative flex items-center">
            <Car className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full pl-7 pr-2 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition appearance-none cursor-pointer"
            >
              <option value="Car Rental (Self-Drive)">
                Car Rental (Self-Drive)
              </option>
              <option value="Taxi Booking (City / Outstation)">
                Taxi Booking (City / Outstation)
              </option>
              <option value="Airport Transfer (Pickup / Drop)">
                Airport Transfer (Pickup / Drop)
              </option>
            </select>
          </div>
        </div>

        {/* Row 5: Contact Details (Name & Phone) */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mb-0.5">
              Your Name *
            </label>
            <div className="relative flex items-center">
              <User className="w-3.5 h-3.5 text-zinc-400 absolute left-2 pointer-events-none" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                className="w-full pl-6 pr-2 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mb-0.5">
              Phone / WhatsApp *
            </label>
            <div className="relative flex items-center">
              <Phone className="w-3.5 h-3.5 text-zinc-400 absolute left-2 pointer-events-none" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="w-full pl-6 pr-2 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:border-[#deb06c] focus:ring-1 focus:ring-[#deb06c] transition"
              />
            </div>
          </div>
        </div>

        {/* Row 6: Submit Button */}
        <div className="pt-1.5">
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#deb06c] hover:bg-[#d49e52] text-zinc-900 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Submit Request</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Microcopy below button */}
        <p className="text-center text-[10px] text-zinc-400 pt-0.5">
          Our team will get back to you within a few hours.
        </p>
      </form>
    </div>
  );
}
