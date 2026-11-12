import React from "react";
import {
  Ship,
  Compass,
  Award,
  ShieldCheck,
  Anchor,
  CalendarDays,
  FileCheck2,
  Headphones,
  Utensils,
  Star,
  Flower2,
  Camera,
  Waves,
} from "lucide-react";

// 1. Hero Section Data
export const cruiseHeroData = {
  tag: "LUXURY AT SEA",
  title: "Cruise Holidays",
  titleHighlight: "Sail Beyond Ordinary",
  titleHighlightFont: "handwriting",
  description:
    "Experience the perfect blend of luxury, adventure and relaxation with our handpicked cruise holidays. From stunning ocean views to world-class amenities, let us take you on a journey like no other.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332943/backgrounds/cuiseHero.png",
  bgPositionClass: "object-center",
  layoutVariant: "panoramic",
  badges: [
    {
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
          <Ship className="w-4 h-4 stroke-[2.4]" />
        </div>
      ),
      line1: "World-Class",
      line2: "Cruise Lines",
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
          <Compass className="w-4 h-4 stroke-[2.4]" />
        </div>
      ),
      line1: "Multiple",
      line2: "Destinations",
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
          <Award className="w-4 h-4 stroke-[2.4]" />
        </div>
      ),
      line1: "Premium",
      line2: "Experiences",
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
          <ShieldCheck className="w-4 h-4 stroke-[2.4]" />
        </div>
      ),
      line1: "End-to-End",
      line2: "Assistance",
    },
  ],
  scriptNote: "Same Ocean Different Stories",
  scriptSuffix: "♡",
};

// 2. Popular Cruise Destinations
export const popularCruiseDestinations = [
  {
    id: "dubai",
    name: "Dubai & Abu Dhabi",
    tag: "Dubai",
    desc: "Luxury, skyline and endless entertainment.",
    image:
      "https://images.unsplash.com/flagged/photo-1555457900-4f4cf4768371?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "singapore",
    name: "Singapore & Malaysia",
    tag: "Singapore",
    desc: "Modern cities, tropical islands and rich culture.",
    image:
      "https://images.unsplash.com/photo-1483070472046-4defb528eff3?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "thailand",
    name: "Thailand & Phuket",
    tag: "Thailand",
    desc: "Crystal clear waters and stunning islands.",
    image:
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "mediterranean",
    name: "Greece & Mediterranean",
    tag: "Mediterranean",
    desc: "Ancient history, charming ports and endless beauty.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "alaska",
    name: "Alaska",
    tag: "Alaska",
    desc: "Glaciers, wildlife and untouched nature.",
    image:
      "https://images.unsplash.com/photo-1752783728043-9fa933504c8e?w=900&auto=format&fit=crop&q=80",
  },
];

// 3. Why Choose Novixa Section Data
export const whyChooseCruiseData = {
  tag: "WHY CHOOSE NOVIXA",
  title: "Your Dream Cruise, Our Expertise",
  description:
    "We make your cruise holiday simple, seamless and unforgettable. From choosing the right cruise line to planning shore excursions, we handle it all — so you can just relax and enjoy.",
  ctaText: "Why Travel with Us",
  features: [
    {
      icon: <Anchor className="w-6 h-6 stroke-[2.2]" />,
      title: "Trusted Cruise Partners",
      desc: "We work with top global cruise lines for the best experiences and value.",
    },
    {
      icon: <Compass className="w-6 h-6 stroke-[2.2]" />,
      title: "Customized Itineraries",
      desc: "Tailor-made packages to match your travel style and budget.",
    },
    {
      icon: <FileCheck2 className="w-6 h-6 stroke-[2.2]" />,
      title: "Hassle-Free Planning",
      desc: "Visa, transfers, excursions and more — all taken care of for you.",
    },
    {
      icon: <Headphones className="w-6 h-6 stroke-[2.2]" />,
      title: "Dedicated Support",
      desc: "24/7 assistance, before, during and after your cruise journey.",
    },
  ],
};

// 4. Cruise Experiences Section Data
export const cruiseExperiencesData = {
  tag: "CRUISE EXPERIENCES",
  title: "More Than a Vacation, It's an Experience",
  subtitle:
    "From gourmet dining to exciting shore excursions, cruises offer something for everyone.",
  scriptText: "Relax Explore Create Memories",
  scriptSuffix: "♡",
  experiences: [
    {
      id: "dining",
      title: "Fine Dining & Nightlife",
      icon: <Utensils className="w-5 h-5 text-[#0c2340] stroke-[2]" />,
    },
    {
      id: "entertainment",
      title: "Entertainment & Shows",
      icon: <Star className="w-5 h-5 text-[#0c2340] stroke-[2]" />,
    },
    {
      id: "wellness",
      title: "Spa & Wellness",
      icon: <Flower2 className="w-5 h-5 text-[#0c2340] stroke-[2]" />,
    },
    {
      id: "excursions",
      title: "Shore Excursions",
      icon: <Camera className="w-5 h-5 text-[#0c2340] stroke-[2]" />,
    },
    {
      id: "pools",
      title: "Pools & Activities",
      icon: <Waves className="w-5 h-5 text-[#0c2340] stroke-[2]" />,
    },
  ],
  images: {
    pool: {
      url: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=900&auto=format&fit=crop&q=80",
      local: "/backgrounds/cruiseExpPool.jpg",
      alt: "Cruise Deck Pool at Sunset",
    },
    dining: {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=80",
      local: "/backgrounds/cruiseExpDining.jpg",
      alt: "Couple Dining on Cruise Deck Sunset",
    },
    dolphins: {
      url: "https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=900&auto=format&fit=crop&q=80",
      local: "/backgrounds/cruiseExpDolphins.jpg",
      alt: "Dolphins Swimming Ocean Sunset",
    },
  },
};

// 5. Testimonials Data
export const cruiseReviewsData = [
  {
    name: "Priya S.",
    location: "Dubai",
    rating: 5,
    quote:
      "The cruise trip was beyond my expectations. Everything was well planned and the experience was magical!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Aman K.",
    location: "Singapore",
    rating: 5,
    quote:
      "Amazing service and great support from the Novixa team. Highly recommended for cruise holidays!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Neha R.",
    location: "Mediterranean",
    rating: 5,
    quote:
      "From booking to excursions, everything was smooth. The cruise was a dream come true!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Rohit M.",
    location: "Alaska",
    rating: 5,
    quote:
      "Best travel decision ever! The views, food and experience were simply amazing.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
];

// 5. SEO-Friendly Frequently Asked Questions
export const cruiseFaqData = [
  {
    id: "cruise-faq-1",
    question: "What is included in a luxury cruise package with Novixa?",
    answer:
      "Our cruise holiday packages typically include luxury stateroom accommodations, gourmet all-inclusive meals across main dining rooms and buffet restaurants, world-class theatrical entertainment and live shows, access to onboard pools, fitness centers, sports courts, and all mandatory port taxes. We can also customize your booking with round-trip flights, pre- and post-cruise luxury hotel stays, port transfers, and curated shore excursions.",
  },
  {
    id: "cruise-faq-2",
    question: "Which cruise destinations are best for first-time travelers?",
    answer:
      "For first-time cruisers from India, Singapore & Southeast Asia sailings (Genting Dream, Royal Caribbean) and Dubai & Arabian Gulf voyages (MSC Cruises, Costa) are ideal. They feature convenient short flight durations, relaxed visa requirements, and exciting 3 to 5-night itineraries. For experienced travelers seeking grand landscapes, Mediterranean and Alaska cruises offer once-in-a-lifetime coastal scenery.",
  },
  {
    id: "cruise-faq-3",
    question: "Do I need a passport and visa for an international cruise?",
    answer:
      "Yes, a valid passport with at least 6 months validity from your travel date is mandatory for all international sailings. Visa requirements depend on your ports of call (e.g., Singapore eVisa, Schengen Tourist Visa for Mediterranean sailings, or US Visa for Alaska). Novixa provides complete end-to-end visa assistance and documentation guidance for all cruise itineraries.",
  },
  {
    id: "cruise-faq-4",
    question: "Are Indian, vegetarian, and Jain meal options available on board?",
    answer:
      "Yes, absolutely. Leading global cruise lines feature dedicated Indian culinary stations, pure vegetarian options, and Jain meals prepared in compliance with dietary preferences. Halal and special dietary needs (gluten-free, vegan) can also be arranged in advance through our concierge team.",
  },
  {
    id: "cruise-faq-5",
    question: "How far in advance should I book my cruise vacation?",
    answer:
      "We recommend booking 3 to 6 months in advance for popular regions like Singapore, Dubai, and the Mediterranean to secure premium balcony staterooms, early-bird rates, and cabin upgrades. For peak travel seasons (Diwali, Christmas, New Year) and Alaska glacier sailings, booking 6 to 9 months ahead is strongly advised.",
  },
  {
    id: "cruise-faq-6",
    question: "Can Novixa arrange private shore excursions and transfers?",
    answer:
      "Yes. In addition to securing the best stateroom fares, Novixa arranges private guided shore excursions, seamless airport-to-pier transfers, travel insurance, and city tours at every port of call to deliver a worry-free travel experience.",
  },
];

// 6. Support & Center Banner Box Data (for shared ServiceFaqSupportSection)
export const cruiseSupportData = {
  tag: "HELP & SUPPORT",
  title: "Frequently Asked Questions",
  centerBannerImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332943/backgrounds/cuiseHero.png",
  centerBannerScriptLine1: "Same Ocean ♡",
  centerBannerScriptLine2: "Different Stories ⛵",
  supportTitle: "Planning a Cruise?",
  supportSubtitle:
    "Speak directly with our cruise specialists for personalized itineraries, group discounts & cabin upgrades.",
  whatsAppNumber: "916397574309",
  whatsAppMessage:
    "Hello Novixa Travels, I would like expert assistance in planning my luxury cruise holiday.",
  whatsAppText: "Chat on WhatsApp",
  phoneNumber: "+916397574309",
  displayPhone: "+91 63975 74309",
  showCallButton: true,
  trustText: "Official Cruise Line Partner | Free Consultation",
};

// 7. Bottom Banner Data
export const cruiseBottomCtaData = {
  title: "Ready to Set Sail?",
  subtitle:
    "Get a personalized cruise quote and start your journey to the most beautiful destinations in the world.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332943/backgrounds/cuiseHero.png",
  whatsAppNumber: "+916397574309",
  whatsAppText: "Hello Novixa, I would like to request a quote for a luxury cruise holiday.",
};
