"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

import axios from "axios";

const NotificationBar = () => {
  const [offers, setOffers] = useState([]); // State to hold an array of offers

  const fetchData = async () => {
    const response = await axios.get("/api/navbarTop");
    setOffers(
      response.data.data?.filter((offer) => offer?.isActive === true) // Filter for active offers
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = (index) => {
    setOffers((prevOffers) => prevOffers.filter((_, i) => i !== index)); // Remove offer from the list
  };

  const updateCountdown = (validTill) => {
    const now = new Date();
    const distance = new Date(validTill) - now;

    if (distance <= 0) {
      return "Expired";
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOffers((prevOffers) =>
        prevOffers.map((offer) => ({
          ...offer,
          countdown: updateCountdown(offer.validTill),
        }))
      );
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  if (!offers.length) return null;

  return (
    <div className="w-full bg-gradient-to-r from-[#BFA181] via-[#b58b5f] to-[#BFA181] text-black px-4 py-2 divide-y-2 divide-black text-sm">
      {offers.map((data, index) => {
        // Default countdown if the offer doesn't have a countdown value yet
        const countdown = data.countdown || updateCountdown(data.validTill);

        if (!data || !data?.isActive) return null;

        return (
          <div
            key={index}
            className="w-full flex flex-col md:flex-row items-center justify-between"
          >
            {/* Countdown */}
            <div className="min-w-[120px] font-medium">⏳ {countdown}</div>

            {/* Offer Message */}
            <Link
              href={data.url}
              className="flex-1 text-center flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 cursor-pointer hover:underline"
            >
              <span className="font-semibold">{data.title}</span>
              <span className="opacity-90">{data.description}</span>
            </Link>

            {/* Close Button */}
            <button
              onClick={() => handleClose(index)}
              className="ml-4 p-1 hover:bg-white/20 rounded transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationBar;
