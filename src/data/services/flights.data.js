import React from "react";
import {
  Plane,
  ShieldCheck,
  Headphones,
  HeartHandshake,
  MessageSquareText,
  Search,
  FileText,
} from "lucide-react";

// Hero data config
export const flightHeroData = {
  tag: "DOMESTIC & INTERNATIONAL",
  title: "Fly to Your",
  titleHighlight: "Next Destination",
  description:
    "From budget-friendly fares to premium airlines, we help you find the best flight options for your journey.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332950/backgrounds/flightHero.png",
  scriptNote: "Your Journey, Our Priority",
  badges: [
    {
      icon: <Plane className="w-6 h-6 text-[#deb06c] -rotate-45 shrink-0" />,
      line1: "Best Fare",
      line2: "Options",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#deb06c] shrink-0" />,
      line1: "Trusted",
      line2: "Airlines",
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#deb06c] shrink-0" />,
      line1: "24/7",
      line2: "Support",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#deb06c] shrink-0" />,
      line1: "Personalized",
      line2: "Assistance",
    },
  ],
};

// Popular destinations data
export const popularRoutes = [
  {
    city: "Dubai",
    price: "₹12,999*",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&auto=format&fit=crop&q=80",
  },
  {
    city: "Singapore",
    price: "₹18,999*",
    image:
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=900&auto=format&fit=crop&q=80",
  },
  {
    city: "Bangkok",
    price: "₹16,999*",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=900&auto=format&fit=crop&q=80",
  },
  {
    city: "New York",
    price: "₹52,999*",
    image:
      "https://images.unsplash.com/photo-1541336032412-2048a678540d?w=900&auto=format&fit=crop&q=80",
  },
];

// Why choose us pillars
export const whyChoosePillars = [
  {
    icon: (
      <div className="w-7 h-7 flex items-center justify-center">
        <Plane className="w-7 h-7 text-[#deb06c] fill-[#deb06c] -rotate-45" />
      </div>
    ),
    line1: "Multiple",
    line2: "Airline Options",
  },
  {
    icon: (
      <div className="w-7 h-7 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-[#deb06c]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"
            fill="#deb06c"
          />
          <text
            x="12"
            y="14.5"
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            fontFamily="system-ui, -apple-system, sans-serif"
            fill="#04152a"
          >
            ₹
          </text>
        </svg>
      </div>
    ),
    line1: "Best Price",
    line2: "Guarantee",
  },
  {
    icon: (
      <div className="w-7 h-7 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-[#deb06c]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"
            fill="#deb06c"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="#04152a"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    line1: "Secure & Easy",
    line2: "Booking Process",
  },
  {
    icon: (
      <div className="w-7 h-7 flex items-center justify-center">
        <Headphones className="w-7 h-7 text-[#deb06c] stroke-[2.4]" />
      </div>
    ),
    line1: "24/7",
    line2: "Travel Support",
  },
];

export const flightWhyChooseData = {
  tag: "WHY CHOOSE NOVIXA",
  title: "More Than Just Flights",
  description:
    "We do the research, compare the options and find the best flights for your trip — so you don't have to.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332966/backgrounds/whyFlightBg.png",
  pillars: whyChoosePillars,
};

// How it works steps
export const flightStepsData = [
  {
    num: "1",
    icon: <MessageSquareText className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Share Your Requirements",
    desc: "Tell us your destination, dates, budget & preferences.",
  },
  {
    num: "2",
    icon: <Search className="w-6 h-6 text-zinc-950 stroke-[2.4]" />,
    title: "We Search & Compare",
    desc: "Our travel experts check the best flights across multiple airlines.",
  },
  {
    num: "3",
    icon: <FileText className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Get Personalized Options",
    desc: "We send you the best fared options with details.",
  },
  {
    num: "4",
    icon: <Plane className="w-6 h-6 text-zinc-950 fill-zinc-950 -rotate-45" />,
    title: "Confirm & Fly",
    desc: "You book, we assist and you're ready to go!",
  },
];

// Airline partners (dark-mode optimized SVGs)
export const airlinePartners = [
  {
    name: "Emirates",
    logo: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332931/airlines/emirates-v2.svg",
    width: 120,
    height: 45,
    className: "h-9 sm:h-10 lg:h-11",
  },
  {
    name: "Qatar Airways",
    logo: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332934/airlines/qatar-v2.svg",
    width: 130,
    height: 45,
    className: "h-7 sm:h-8 lg:h-9",
  },
  {
    name: "IndiGo",
    logo: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332931/airlines/indigo-v2.svg",
    width: 130,
    height: 40,
    className: "h-6 sm:h-7 lg:h-8",
  },
  {
    name: "Air India",
    logo: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332931/airlines/air-india-v2.svg",
    width: 140,
    height: 45,
    className: "h-7 sm:h-8 lg:h-9",
  },
  {
    name: "Lufthansa",
    logo: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332933/airlines/lufthansa-v2.svg",
    width: 140,
    height: 40,
    className: "h-7 sm:h-8 lg:h-9",
  },
  {
    name: "Singapore Airlines",
    logo: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332934/airlines/singapore-v2.svg",
    width: 140,
    height: 45,
    className: "h-9 sm:h-10 lg:h-11",
  },
  {
    name: "United Airlines",
    logo: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332935/airlines/united-v2.svg",
    width: 130,
    height: 40,
    className: "h-6 sm:h-7 lg:h-8",
  },
];

// Testimonials
export const clientReviews = [
  {
    quote:
      "Novixa made my Dubai trip super easy! Best rates and excellent support throughout the journey.",
    name: "Ananya S.",
    route: "Delhi → Dubai",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Got the best flight deal to Bangkok with hassle-free booking. Highly recommended!",
    name: "Rohit M.",
    route: "Delhi → Bangkok",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Professional, responsive and very helpful. Booked my international flight without any stress.",
    name: "Priya K.",
    route: "Mumbai → Singapore",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
];

// FAQ items
export const flightFaqs = [
  {
    question: "What are the payment options?",
    answer:
      "We accept all major credit/debit cards, net banking, UPI, and bank transfers. Secure payment gateways ensure your transactions are 100% safe.",
  },
  {
    question: "Can I reschedule or cancel my flight?",
    answer:
      "Yes, you can reschedule or cancel flights based on the airline's cancellation policy. Our 24/7 support team will assist you with the modifications and refund processes.",
  },
  {
    question: "Do you provide visa assistance?",
    answer:
      "Yes, Novixa offers end-to-end visa assistance for international travel alongside your flight bookings to make your trip effortless.",
  },
  {
    question: "Are group bookings available?",
    answer:
      "Yes, we specialize in corporate and family group flight bookings with special negotiated group fares and flexible terms.",
  },
  {
    question: "How do I get the best flight deals?",
    answer:
      "Submit an inquiry with your planned travel dates and flexibility. Our flight specialists scan multiple global distribution systems to find exclusive unlisted discounts.",
  },
];

// Support & FAQ Center Data for ServiceFaqSupportSection
export const flightSupportData = {
  title: "Need Help With Flights?",
  subtitle: "Chat with our flight concierge for customized routes, group fares, and instant booking assistance.",
  centerBannerImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332966/backgrounds/whyFlightBg.png",
  centerBannerScriptLine1: "Best Fares ♡",
  centerBannerScriptLine2: "Smooth Flights ✈",
  whatsAppNumber: "916397574309",
  whatsAppMessage: "Hello Novixa Travels, I need assistance with booking a flight.",
  whatsAppText: "Chat on WhatsApp",
  phoneNumber: "+919876543210",
  displayPhone: "+91 98765 43210",
  trustText: "24/7 Flight Support | Instant ticketing assistance",
};

