"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, Loader2, Calendar, Users, Baby, MapPin, Phone, Mail, User, Plane } from "lucide-react";
import { toast } from "react-toastify";

export default function PackageEnquiryModal({
  isOpen,
  onClose,
  selectedPackage,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    departureDate: "",
    arrivalDate: "",
    numberOfAdult: "2",
    numberOfChild: "0",
    hotelCategory: "4 Star",
    wantToIncludeFlight: "No",
    budgetPerPerson: "₹25,000 - ₹50,000",
    nationality: "Indian",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({
        ...prev,
        to: selectedPackage.title || selectedPackage.destination || "",
      }));
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPackage, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone || !formData.email) {
      toast.error("Please fill in your name, email, and phone number.");
      return;
    }

    setLoading(true);
    try {
      const { submitEnquiry } = await import("@/lib/actions/enquiry.js");
      const res = await submitEnquiry("package", {
        firstName: formData.firstName,
        lastName: formData.lastName || "Traveler",
        email: formData.email,
        phone: formData.phone,
        from: formData.wantToIncludeFlight === "Yes" && formData.from.trim() ? formData.from.trim() : "India",
        to: formData.to || selectedPackage?.title || "Custom Package",
        nationality: formData.nationality || "Indian",
        numberOfAdult: formData.numberOfAdult || "2",
        numberOfChild: formData.numberOfChild || "0",
        hotelCategory: formData.hotelCategory || "4 Star",
        wantToIncludeFlight: formData.wantToIncludeFlight || "No",
        departureDate: formData.departureDate ? new Date(formData.departureDate) : new Date(),
        arrivalDate: formData.arrivalDate
          ? new Date(formData.arrivalDate)
          : new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        budgetPerPerson: formData.budgetPerPerson || "Standard",
        whoIsTraveling: `${formData.numberOfAdult} Adults, ${formData.numberOfChild} Children`,
      });

      if (res?.success) {
        setSubmitted(true);
        toast.success("Enquiry received! Our luxury travel concierge will reach out within 2 hours.");
      } else {
        toast.error(res?.error || "Failed to submit enquiry. Please try again or WhatsApp us directly.");
      }
    } catch (err) {
      console.error("Error submitting package enquiry:", err);
      toast.error("Something went wrong. Please connect with our team on WhatsApp!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0c1322] border border-[#1e2a42] rounded-3xl shadow-2xl p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Success Screen */
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3
              className="font-serif text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Enquiry Submitted!
            </h3>
            <p className="text-zinc-300 text-sm max-w-sm mx-auto">
              Thank you, <span className="text-[#deb06c] font-semibold">{formData.firstName}</span>. Our bespoke travel designers are customizing your itinerary and will reach out shortly.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-[#deb06c] hover:bg-[#d49e52] text-zinc-950 font-bold px-8 py-3 rounded-full text-sm shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center text-xs text-[#deb06c] uppercase tracking-wider font-semibold mb-1">
                <span>Bespoke Travel Experience</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-normal text-white tracking-tight"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {selectedPackage ? `Enquire for ${selectedPackage.title}` : "Get a Custom Travel Plan"}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Tell us your preferences and our travel designers will craft an exclusive itinerary tailored to your budget.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul"
                      className="w-full bg-[#131d33] border border-zinc-700/80 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#deb06c] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Sharma"
                    className="w-full bg-[#131d33] border border-zinc-700/80 rounded-xl py-2.5 px-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#deb06c] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#131d33] border border-zinc-700/80 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#deb06c] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rahul@example.com"
                      className="w-full bg-[#131d33] border border-zinc-700/80 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#deb06c] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Destination & Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Destination / Package
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      name="to"
                      value={formData.to}
                      onChange={handleChange}
                      placeholder="e.g. Dubai or Maldives"
                      className="w-full bg-[#131d33] border border-zinc-700/80 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#deb06c] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Approx. Departure Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="date"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleChange}
                      className="w-full bg-[#131d33] border border-zinc-700/80 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#deb06c] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Travelers (Adults & Children) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Number of Adults
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <select
                      name="numberOfAdult"
                      value={formData.numberOfAdult}
                      onChange={handleChange}
                      className="w-full bg-[#131d33] border border-zinc-700/80 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#deb06c] transition-colors"
                    >
                      <option value="1">1 Adult (Solo)</option>
                      <option value="2">2 Adults (Couple)</option>
                      <option value="3">3 Adults</option>
                      <option value="4">4 Adults</option>
                      <option value="5+">5+ Adults (Group)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Number of Children
                  </label>
                  <div className="relative">
                    <Baby className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <select
                      name="numberOfChild"
                      value={formData.numberOfChild}
                      onChange={handleChange}
                      className="w-full bg-[#131d33] border border-zinc-700/80 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#deb06c] transition-colors"
                    >
                      <option value="0">0 Children</option>
                      <option value="1">1 Child</option>
                      <option value="2">2 Children</option>
                      <option value="3">3 Children</option>
                      <option value="4+">4+ Children</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 5: Hotel Preference & Estimated Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Hotel Preference
                  </label>
                  <select
                    name="hotelCategory"
                    value={formData.hotelCategory}
                    onChange={handleChange}
                    className="w-full bg-[#131d33] border border-zinc-700/80 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#deb06c] transition-colors"
                  >
                    <option value="3 Star">3 Star (Comfort)</option>
                    <option value="4 Star">4 Star (Premium)</option>
                    <option value="5 Star">5 Star (Ultra Luxury)</option>
                    <option value="Boutique / Heritage">Boutique / Heritage Villa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Estimated Budget Per Person
                  </label>
                  <select
                    name="budgetPerPerson"
                    value={formData.budgetPerPerson}
                    onChange={handleChange}
                    className="w-full bg-[#131d33] border border-zinc-700/80 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#deb06c] transition-colors"
                  >
                    <option value="Under ₹25,000">Under ₹25,000</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                    <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                    <option value="₹2,00,000+">₹2,00,000+ (Exclusive Bespoke)</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Include Flight Option */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Want to Include Flights?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, wantToIncludeFlight: "Yes" }))
                      }
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                        formData.wantToIncludeFlight === "Yes"
                          ? "bg-[#deb06c]/15 border-[#deb06c] text-[#deb06c] shadow-sm"
                          : "bg-[#131d33] border-zinc-700/80 text-zinc-300 hover:border-zinc-500"
                      }`}
                    >
                      <Plane className="w-4 h-4 shrink-0" />
                      <span>Yes, Include Flights</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, wantToIncludeFlight: "No" }))
                      }
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                        formData.wantToIncludeFlight === "No"
                          ? "bg-[#deb06c]/15 border-[#deb06c] text-[#deb06c] shadow-sm"
                          : "bg-[#131d33] border-zinc-700/80 text-zinc-300 hover:border-zinc-500"
                      }`}
                    >
                      <span>No, Package Only</span>
                    </button>
                  </div>
                </div>

                {formData.wantToIncludeFlight === "Yes" && (
                  <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Departure City (for Flights)
                    </label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#deb06c]" />
                      <input
                        type="text"
                        name="from"
                        value={formData.from}
                        onChange={handleChange}
                        placeholder="e.g. New Delhi, Mumbai, Bengaluru"
                        className="w-full bg-[#131d33] border border-[#deb06c]/50 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#deb06c] transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#deb06c] hover:bg-[#d49e52] text-zinc-950 font-bold py-3.5 px-6 rounded-full text-sm shadow-xl flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Travel Enquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

