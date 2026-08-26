"use client";
import React from "react";
import {
  FaPlane,
  FaGlobe,
  FaHotel,
  FaPassport,
  FaCarSide,
  FaUsers,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Grid } from "@/components/ui/grid";
import { WorldMap } from "@/components/ui/world-map";
import { motion } from "motion/react";

const visiondata = [
  {
    icon: <FaPlane size={24} />,
    text: "Hassle-Free Travel",
    desc: "From flights to hotels & visas, we handle it all.",
  },
  {
    icon: <FaGlobe size={24} />,
    text: "Global Destinations",
    desc: "From Paris to Bali, we bring the world closer.",
  },
  {
    icon: <FaHotel size={24} />,
    text: "Personalized Plans",
    desc: "Custom itineraries tailored to your preferences.",
  },
];

const expertisedata = [
  {
    icon: <FaPlane size={24} />,
    text: "Seamless Flight & Hotel Bookings",
    desc: "Competitive real-time booking options.",
  },
  {
    icon: <FaGlobe size={24} />,
    text: "International & Domestic Packages",
    desc: "Explore exotic locations worldwide.",
  },
  {
    icon: <FaPassport size={24} />,
    text: "Visa & Travel Assistance",
    desc: "Get help with Schengen, UK, USA & more visas.",
  },
  {
    icon: <FaCarSide size={24} />,
    text: "Reliable Transfers & Rentals",
    desc: "Safe & comfortable transportation options.",
  },
  {
    icon: <FaUsers size={24} />,
    text: "Corporate & Group Travel",
    desc: "Custom packages for businesses & groups.",
  },
  {
    icon: <FaUmbrellaBeach size={24} />,
    text: "Luxury & Honeymoon Packages",
    desc: "Exclusive getaways with premium services.",
  },
];

const AboutUs = () => {
  return (
    <div className="py-20">
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 relative">
        <div className="mb-4 sm:mb-8">
          <h2 className="text-center text-3xl md:text-5xl font-bold text-black dark:text-white">
            Our Story
          </h2>
          <p className="text-center text-2xl md:text-5xl font-normal text-neutral-700 dark:text-neutral-200 max-w-2xl mt-2 mx-auto">
            The Heart of Novixa Travels India
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl text-center">
          <p className="text-sm leading-relaxed sm:text-lg">
            Welcome to Novixa Travels India, a journey of passion and dedication
            brought to life by two brothers,
            <strong> Mr. Harsh Kumar and Mr. Tarun Kumar.</strong> Our story
            began with a shared love for travel and the desire to simplify it.
            We realized that while the world offers a treasure trove of
            experiences, planning a trip can often be complex. Our mission was
            simple: to make travel{" "}
            <strong>
              effortless, personalized, and truly memorable for everyone, no
              matter where their adventure begins or ends.{" "}
            </strong>
            Founded on <strong>March 14, 2023</strong>, Novixa Travels India was
            born with a simple vision: to make travel{" "}
            <strong>effortless, personalized, and accessible</strong> for
            everyone.
          </p>
        </div>
      </BackgroundLines>

      {/* Our Expertise */}
      <div className="py-16 px-6 sm:px-12 lg:px-24 ">
        <div className="my-10">
          <h2 className="text-center text-3xl md:text-5xl font-bold text-black dark:text-white">
            Our Expertise
          </h2>
          <p className="text-center text-2xl md:text-5xl font-normal text-neutral-700 dark:text-neutral-200 max-w-2xl mt-2 mx-auto">
            More Than Just a Travel Agency
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-2 max-w-7xl mx-auto">
          {expertisedata.map((feature, idx) => (
            <div
              key={idx}
              className="relative max-w-sm bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden mb-4"
            >
              <Grid size={20} />
              {feature.icon}
              <p className="my-4 text-xl font-bold text-neutral-800 dark:text-white relative z-20">
                {feature.text}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-base font-normal relative z-20">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Vision */}
      <div className="mb-10 px-6">
        <div className="mb-10">
          <h2 className="text-center text-3xl md:text-5xl font-bold text-black dark:text-white">
            Our Vision for Your Journey
          </h2>
          <p className="text-center text-2xl md:text-5xl font-normal text-neutral-700 dark:text-neutral-200 max-w-2xl mt-2 mx-auto">
            Making Every Journey Special
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-2 max-w-7xl mx-auto">
          {visiondata.map((feature) => (
            <div
              key={feature.text}
              className="relative max-w-sm bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
            >
              <Grid size={20} />
              {feature.icon}
              <p className="my-4 text-xl font-bold text-neutral-800 dark:text-white relative z-20">
                {feature.text}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-base font-normal relative z-20">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className=" dark:bg-black bg-white w-full">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
            Remote{" "}
            <span className="text-neutral-400">
              {"Connectivity".split("").map((word, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </p>
          <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
            Break free from traditional boundaries. Work from anywhere, at the
            comfort of your own studio apartment. Perfect for Nomads and
            Travellers.
          </p>
        </div>
        <WorldMap
          lineColor="#BFA181"
          dots={[
            {
              start: { lat: 28.6139, lng: 77.209 }, // Alaska (Fairbanks)
              end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // Alaska (Fairbanks)
              end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // Brazil (Brasília)
              end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 28.6139, lng: 77.209 }, // New Delhi
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: 55.7558, lng: 37.6173 }, // Moscow, Russia
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi, India
              end: { lat: 33.6844, lng: 73.0479 }, // Islamabad, Pakistan
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi, India
              end: { lat: 13.7563, lng: 100.5018 }, // Bangkok, Thailand
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AboutUs;
