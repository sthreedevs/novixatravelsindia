"use client";
import React, { useEffect, useState } from "react";

const travelTips = [
  "Pack light and smart to make your trip easier.",
  "Always keep digital and physical copies of important documents.",
  "Learn a few local phrases before visiting a new country.",
  "Travel insurance is a must — don’t skip it.",
  "Hydrate well, especially on long flights.",
  "Respect local customs and dress codes.",
  "Use offline maps when exploring new places.",
  "Keep emergency numbers and local embassy info handy.",
  "Roll your clothes instead of folding to save luggage space.",
  "Carry a universal adapter for international trips.",
  "Use packing cubes to stay organized.",
  "Notify your bank before traveling to avoid card blocks.",
  "Research local scams and stay alert in crowded areas.",
  "Book accommodations near public transport for easy access.",
  "Try local street food — it's often the most authentic.",
  "Keep some local currency even if you use cards.",
  "Bring a power bank to keep devices charged on the go.",
  "Double-check visa and entry requirements for each destination.",
  "Respect nature and follow eco-friendly travel practices.",
  "Always smile — it’s the universal language!",
];

const Loader = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % travelTips.length);
    }, 3000); // change tip every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-gold text-center px-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gold mb-6"></div>
      <h1 className="text-2xl font-semibold">
        Loading your travel experience...
      </h1>
      <p className="mt-4 text-sm max-w-md italic opacity-80 transition-opacity duration-500">
        {travelTips[currentTipIndex]}
      </p>
    </div>
  );
};

export default Loader;
