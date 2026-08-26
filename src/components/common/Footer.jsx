"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaPhone,
  FaWhatsapp,
  FaComments,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { useSelector } from "react-redux";

const footerData = {
  travelWithUs: [
    { label: "Flights", path: "/services/flights" },
    { label: "Trains", path: "/services/trains" },
    { label: "Rentals/Transfer", path: "/services/car-bus-rental" },
    { label: "Hotels", path: "/services/hotels" },
  ],
  other: [
    { label: "Cruise", path: "/services/cruise" },
    { label: "Rail Europe", path: "/services/rail-europe" },
    { label: "Day Trip", path: "/services/car-bus-rental" },
    { label: "E-Sim", path: "/services/e-sim" },
  ],
  contactUs: [
    { label: "Contact Form", href: "/contact" },
    { label: "Info@novixatravelsindia.com", href: "" },
    { label: "+91 8171244835 / +91 6397574309", href: "tel:+918171244835" },
    { label: "+91 6397574309 (Whatsapp)", href: "https://wa.me/+916397574309" },
  ],
  bottomLinks: [
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms of Service", path: "/terms-conditions" },
  ],
};

const socialIcons = [
  {
    Icon: FaFacebookF,
    href: "https://www.facebook.com/share/1EfaRZtrNB/",
  },
  { Icon: FaXTwitter, href: "https://x.com/novixatravels" },
  { Icon: FaPinterestP, href: "https://pin.it/1ubi7OPiR" },
  { Icon: FaInstagram, href: "https://www.instagram.com/novixatravelsindia" },
  { Icon: FaYoutube, href: "https://www.youtube.com/@novixatravelsindia" },
  {
    Icon: FaLinkedinIn,
    href: "https://www.linkedin.com/company/easetravelsindia/",
  },
];

const Footer = ({ initialPackages }) => {
  const [email, setEmail] = useState("");
  const { data = [] } = useSelector((state) => state.destination);

  const destinations = Array.from(
    new Map(data.map((item) => [item.continent.toLowerCase(), item])).values(),
  ).slice(0, 4);

  const topFourPackages = initialPackages?.slice(0, 4) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/subscriber/add",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setEmail("");
      toast.info("Success! Check your mailbox.");
    } catch (error) {
      toast.warning("Oops! Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 text-zinc-800 dark:text-zinc-200 ">
      {/* Logo and Newsletter Section */}
      <div className="w-full py-4 lg:py-4 sm:px-12 xl:px-20 sm:mx-auto flex flex-col xl:flex-row gap-6 sm:gap-4 items-center">
        <div className="flex-1 flex flex-col sm:flex-row justify-between sm:items-center mx-2 w-full">
          <div className="flex-[0.6] flex flex-row items-center gap-6 sm:gap-4">
            <Image
              src="/logo.png"
              width={96}
              height={96}
              className="size-24 sm:size-18 rounded-full border-2 border-zinc-300 dark:border-zinc-600 shadow-md"
              alt="Novixa Travels India Logo"
              style={{ height: "auto" }}
            />
            <div className="space-y-1">
              <h3 className="text-lg font-bold sm:text-[22px]">
                Novixa Travels India
              </h3>
              <h6 className="text-xs">Where Comfort Meets Every Budget</h6>
            </div>
          </div>
          <div className="w-full h-[1px] bg-zinc-400 dark:bg-zinc-600 my-4 block sm:hidden"></div>
          <div className="flex-[0.4] sm:py-4 mx-2 sm:mx-10">
            <h2 className="text-2xl font-semibold mb-1 sm:flex sm:text-lg pl-2">
              We Accept
            </h2>
            <div className="flex space-x-2 justify-start sm:space-x-1">
              <Image src="/footer/upi.svg" alt="UPI" width={80} height={32} className="h-8 rounded-sm" style={{ width: "auto" }} />
              <Image
                src="/footer/mc.png"
                alt="MasterCard"
                width={80}
                height={32}
                className="h-8 rounded-sm"
                style={{ width: "auto" }}
              />
              <Image
                src="/footer/amx.png"
                alt="American"
                width={80}
                height={32}
                className="h-8 rounded-sm"
                style={{ width: "auto" }}
              />
              <Image
                src="/footer/visa.png"
                alt="Visa"
                width={80}
                height={32}
                className="h-8 rounded-sm"
                style={{ width: "auto" }}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-zinc-400 dark:bg-zinc-600 my-2 block sm:hidden"></div>
        {/* Newsletter */}
        <div className="flex-1 mx-2 w-full px-4 xl:px-1 xl:max-w-2xl">
          <p className="mb-1 text-zinc-700 text-xs sm:text-base dark:text-zinc-300">
            Stay updated with our latest travel deals and destinations.
            <br />
            Subscribe to our newsletter.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 sm:items-center"
          >
            <Input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full sm:w-96 text-zinc-800 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 bg-white dark:bg-zinc-700 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600"
              placeholder="your@email.com"
            />
            <Button
              type="submit"
              className=" px-4 py-2 rounded-md transition-colors duration-200"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-full h-[1px] bg-zinc-400 dark:bg-zinc-600 mb-6"></div>

      {/* Footer Links */}
      <div className="w-full px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-6">
          {/* Destinations */}
          <div>
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-4 text-xl">
              Destinations
            </h3>
            <ul className="space-y-2">
              {destinations.map(({ name, _id }, index) => (
                <li key={index}>
                  <Link
                    href={`/destination/${name}`}
                    className="text-zinc-700 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-[#BFA181] hover:underline transition-colors duration-200"
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Travel Packages */}
          <div>
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-4 text-xl">
              Top Travel Packages
            </h3>
            <ul className="space-y-2">
              {topFourPackages.map(({ title, _id, slug }, index) => (
                <li key={index}>
                  <Link
                    href={`/services/packages/${slug || _id}`}
                    className="text-zinc-700 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-[#BFA181] hover:underline transition-colors duration-200"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Services */}
          <div>
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-4 text-xl">
              Travel Services
            </h3>
            <ul className="space-y-2">
              {footerData.travelWithUs.map(({ label, path }, index) => (
                <li key={index}>
                  <Link
                    href={path}
                    className="text-zinc-700 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-[#BFA181] hover:underline transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Others */}
          <div>
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-4 text-xl">
              Others
            </h3>
            <ul className="space-y-2">
              {footerData.other.map(({ label, path }, index) => (
                <li key={index}>
                  <Link
                    href={path}
                    className="text-zinc-700 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-[#BFA181] hover:underline transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-4 text-xl">
              Contact Us
            </h3>
            <ul className="space-y-2 text-wrap overflow-hidden">
              <li>
                <Link
                  href={"/contact-us"}
                  className="text-zinc-700 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-[#BFA181] hover:underline transition-colors duration-200"
                >
                  Contact Form
                </Link>
              </li>
              <li>
                <a
                  href="mailto:Info@novixatravelsindia.com"
                  className="text-zinc-700 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-[#BFA181] hover:underline transition-colors duration-200"
                >
                  Info@novixatravelsindia.com
                </a>
              </li>
              <li className="text-zinc-700 dark:text-zinc-300">
                <a
                  href="tel:+916397574309"
                  className="hover:text-blue-500 dark:hover:text-[#BFA181] hover:underline transition-colors duration-200 text-sm"
                >
                  +91 6397574309
                </a>
                <span className="text-sm"> / </span>
                <a
                  href="tel:+918171244835"
                  className="hover:text-blue-500 dark:hover:text-[#BFA181] hover:underline transition-colors duration-200 text-sm"
                >
                  +91 8171244835
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/916397574309"
                  className="text-zinc-700 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-[#BFA181] hover:underline transition-colors duration-200"
                  target="_blank"
                >
                  +91 6397574309 (Whatsapp)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="max-w-full h-[1px] bg-zinc-400 dark:bg-zinc-600 mt-6"></div>

      {/* Foolow links sections */}
      <div className="py-4 flex flex-col justify-between items-center">
        <div className="flex space-x-2 sm:space-x-4">
          {socialIcons.map(({ Icon, href }, index) => (
            <a
              key={index}
              href={href}
              className="group rounded-full bg-zinc-100 dark:bg-zinc-800 p-3  transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-zinc-600 dark:text-zinc-300 text-xl">
                <Icon />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-full h-[1px] bg-zinc-400 dark:bg-zinc-600 "></div>
      {/* Bottom Section */}
      <div className="w-full px-6 sm:px-12 lg:px-20 text-center text-sm py-6 ">
        <p className="text-zinc-700 dark:text-zinc-300">
          © 2025 Novixa Travel India. All rights reserved.
        </p>
        <div className="mt-2">
          {footerData.bottomLinks.map(({ label, path }, index) => (
            <React.Fragment key={index}>
              <Link
                href={path}
                className="text-zinc-700 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-[#BFA181] hover:underline mx-2 transition-colors duration-200"
              >
                {label}
              </Link>
              {index < footerData.bottomLinks.length - 1 && " | "}
            </React.Fragment>
          ))}
        </div>
      </div>
      <FloatingContactButtons />
    </div>
  );
};

const FloatingContactButtons = () => {
  const [hovered, setHovered] = useState(false);

  const buttonBase =
    "p-4 rounded-full shadow-lg transition transform hover:scale-110";
  const wrapperBase = "fixed bottom-4 right-4 flex flex-col items-end z-50";

  return (
    <div
      className={wrapperBase}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
    >
      {/* Toggle Icon or label */}
      <div className="bg-gray-700 text-white p-4 rounded-full cursor-pointer mb-2">
        <FaComments size={20} />
      </div>

      {/* Collapsible Buttons */}
      <div
        className={`flex flex-col space-y-3 transition-all duration-300 ${
          hovered ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <a
          href="tel:+916397574309"
          className={`bg-blue-600 text-white ${buttonBase}`}
        >
          <FaPhone size={20} />
        </a>
        <a
          href="https://wa.me/916397574309"
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-green-500 text-white ${buttonBase}`}
        >
          <FaWhatsapp size={20} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
