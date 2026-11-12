import React from "react";
import {
  Car,
  ShieldCheck,
  UserCheck,
  Headphones,
  CalendarCheck,
  Clock,
  MapPin,
  Plane,
  Crown,
  Users,
  Compass,
  Briefcase,
  Heart,
  Luggage,
} from "lucide-react";

export const carHeroData = {
  tag: "CAR RENTALS | TAXI BOOKING | AIRPORT TRANSFERS",
  title: "Travel Your Way",
  titleHighlight: "with Comfort & Ease",
  titleHighlightFont: "handwriting",
  description:
    "From self-drive cars to chauffeur-driven vehicles, from city taxis to airport transfers — we make your journey smooth, safe and hassle-free.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332938/backgrounds/carrentalHero.png",
  bgPositionClass: "object-center",
  layoutVariant: "panoramic",
  badges: [
    {
      icon: <Car className="w-6 h-6 text-[#deb06c] shrink-0" />,
      line1: "Well-Maintained",
      line2: "Vehicles",
    },
    {
      icon: <UserCheck className="w-6 h-6 text-[#deb06c] shrink-0" />,
      line1: "Professional",
      line2: "Drivers",
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#deb06c] shrink-0" />,
      line1: "24/7",
      line2: "Support",
    },
    {
      icon: <CalendarCheck className="w-6 h-6 text-[#deb06c] shrink-0" />,
      line1: "Flexible",
      line2: "Booking",
    },
  ],
};

// 3 quick service overview navigation pills
export const quickServicePills = [
  {
    id: "car-rentals",
    title: "Car Rentals",
    desc: "Explore more with the freedom to drive.",
    cta: "View Car Rental Options",
    icon: <Car className="w-6 h-6 text-[#deb06c]" />,
  },
  {
    id: "taxi-booking",
    title: "Taxi Booking",
    desc: "Comfortable rides for your city & outstation needs.",
    cta: "View Taxi Options",
    icon: <Clock className="w-6 h-6 text-[#deb06c]" />,
  },
  {
    id: "airport-transfers",
    title: "Airport Transfers",
    desc: "On-time pickups & drop-offs, every time.",
    cta: "View Transfer Options",
    icon: <Plane className="w-6 h-6 text-[#deb06c]" />,
  },
];

// 3 detailed showcase blocks matching Design 1
export const carSubServices = {
  carRentals: {
    tag: "CAR RENTALS",
    title: "Drive Your Own Adventure",
    description:
      "Choose from a wide range of well-maintained cars for self-drive rentals. Perfect for city trips, road trips and exploring new destinations at your own pace.",
    badges: [
      {
        icon: <Car className="w-4 h-4 text-[#deb06c]" />,
        line1: "Multiple",
        line2: "Car Categories",
      },
      {
        icon: <CalendarCheck className="w-4 h-4 text-[#deb06c]" />,
        line1: "Easy",
        line2: "Booking Process",
      },
      {
        icon: <Headphones className="w-4 h-4 text-[#deb06c]" />,
        line1: "24/7",
        line2: "Roadside Assistance",
      },
    ],
    ctaText: "View Car Rental Options",
    centerImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332943/backgrounds/ctaCarTop.png",
    scriptText: "Your Ride, Your Journey",
    categoriesTitle: "Our Car Categories",
    categories: [
      {
        title: "Economy Cars",
        subtitle: "(4 Seater)",
        icon: <Car className="w-4 h-4 text-[#deb06c]" />,
      },
      {
        title: "SUVs",
        subtitle: "(5–7 Seater)",
        icon: <Compass className="w-4 h-4 text-[#deb06c]" />,
      },
      {
        title: "Luxury Cars",
        subtitle: "(For Special Occasions)",
        icon: <Crown className="w-4 h-4 text-[#deb06c]" />,
      },
      {
        title: "Tempo Traveller",
        subtitle: "(8–17 Seater)",
        icon: <Users className="w-4 h-4 text-[#deb06c]" />,
      },
    ],
  },

  taxiBooking: {
    tag: "TAXI BOOKING",
    title: "Comfortable Rides, Anytime",
    description:
      "Need a quick ride in the city or a reliable cab for your outstation journey? We provide safe, comfortable and affordable taxi services with professional drivers.",
    badges: [
      {
        icon: <ShieldCheck className="w-4 h-4 text-[#deb06c]" />,
        line1: "Fixed Fare",
        line2: "(no hidden charges)",
      },
      {
        icon: <Car className="w-4 h-4 text-[#deb06c]" />,
        line1: "Clean & Comfortable",
        line2: "Vehicles",
      },
      {
        icon: <Headphones className="w-4 h-4 text-[#deb06c]" />,
        line1: "24/7",
        line2: "Customer Support",
      },
    ],
    ctaText: "View Taxi Options",
    leftImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332942/backgrounds/ctaCarCenter.png",
    categoriesTitle: "Popular Taxi Services",
    categories: [
      {
        title: "City Rides",
        subtitle: "(Local & Hourly)",
        icon: <MapPin className="w-4 h-4 text-[#deb06c]" />,
      },
      {
        title: "Outstation Cabs",
        subtitle: "(One Way / Round Trip)",
        icon: <Compass className="w-4 h-4 text-[#deb06c]" />,
      },
      {
        title: "Corporate Travel",
        subtitle: "(Business Meetings / Events)",
        icon: <Briefcase className="w-4 h-4 text-[#deb06c]" />,
      },
      {
        title: "Special Occasions",
        subtitle: "(Weddings / Family Trips)",
        icon: <Heart className="w-4 h-4 text-[#deb06c]" />,
      },
    ],
  },

  airportTransfers: {
    tag: "AIRPORT TRANSFERS",
    title: "Hassle-Free Airport Transfers",
    description:
      "Start and end your journey with ease. Our airport transfer service ensures on-time pickup, comfortable travel and support from arrival to departure.",
    badges: [
      {
        icon: <Clock className="w-4 h-4 text-[#deb06c]" />,
        line1: "On-Time Pickup",
        line2: "& Drop",
      },
      {
        icon: <Plane className="w-4 h-4 text-[#deb06c]" />,
        line1: "Flight Tracking",
        line2: "(Real-time)",
      },
      {
        icon: <UserCheck className="w-4 h-4 text-[#deb06c]" />,
        line1: "Professional",
        line2: "Drivers",
      },
      {
        icon: <Users className="w-4 h-4 text-[#deb06c]" />,
        line1: "Meet & Greet",
        line2: "(Available)",
      },
    ],
    ctaText: "View Transfer Options",
    centerImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332940/backgrounds/ctaCarBottom.png",
    scriptText: "From Airport to Your Destination",
    categoriesTitle: "Transfer Options",
    categories: [
      {
        title: "Airport to Hotel",
        subtitle: "(One Way / Round Trip)",
        icon: <Car className="w-4 h-4 text-[#deb06c]" />,
      },
      {
        title: "Hotel to Airport",
        subtitle: "(Departure Transfer)",
        icon: <Plane className="w-4 h-4 text-[#deb06c]" />,
      },
      {
        title: "Inter-City Transfers",
        subtitle: "(Within India)",
        icon: <Compass className="w-4 h-4 text-[#deb06c]" />,
      },
      {
        title: "Group Transfers",
        subtitle: "(For Families & Corporate)",
        icon: <Users className="w-4 h-4 text-[#deb06c]" />,
      },
    ],
  },
};

// 4 Popular Destinations matching 4-column grid
export const popularCarDestinations = [
  {
    city: "Delhi",
    price: "City Rides & Airport Transfers",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&auto=format&fit=crop&q=80",
  },
  {
    city: "Agra",
    price: "Day Trips & Sightseeing",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&auto=format&fit=crop&q=80",
  },
  {
    city: "Jaipur",
    price: "Heritage Tours",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=900&auto=format&fit=crop&q=80",
  },
  {
    city: "Goa",
    price: "Beach Getaways",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&auto=format&fit=crop&q=80",
  },
  {
    city: "Dubai",
    price: "International Transfers",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&auto=format&fit=crop&q=80",
  },
];

// Customer reviews matching Design 1
export const carReviews = [
  {
    quote:
      "Booked a car rental for our Goa trip. The vehicle was in excellent condition and the driver was very polite.",
    name: "Priya S.",
    route: "Mumbai",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Used their taxi service for a Delhi city tour. Comfortable ride, no hassle at all. Highly recommend!",
    name: "Rohit M.",
    route: "Delhi",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Airport transfer was on time and super smooth. The meet & greet service was a great experience.",
    name: "Neha T.",
    route: "Bangalore",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
];

// FAQ items matching Design 1
export const carFaqs = [
  {
    question: "How can I book a car rental?",
    answer:
      "You can submit a request using our online form above, select your desired car type and dates, and our team will get back to you with confirmed availability and transparent rates.",
  },
  {
    question: "Do you provide outstation taxis?",
    answer:
      "Yes, we provide both one-way and round-trip outstation cabs with experienced, background-verified drivers and 24/7 on-road support.",
  },
  {
    question: "Is airport pickup and drop available?",
    answer:
      "Absolutely. We offer dedicated airport transfer services with real-time flight tracking, on-time guarantee, and optional meet & greet assistance.",
  },
  {
    question: "What are the payment options?",
    answer:
      "We accept all major credit/debit cards, UPI, net banking, and verified bank transfers through secure 100% encrypted payment gateways.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, flexible modifications and cancellations are supported according to our customer-friendly rental policies. Contact our 24/7 support anytime.",
  },
];

// Support & FAQ Center Data for ServiceFaqSupportSection
export const carSupportData = {
  title: "Need Help With Your Ride?",
  subtitle: "Chat with our transport coordinator for outstation taxis, airport cabs, and luxury rentals.",
  centerBannerImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332942/backgrounds/ctaCarCenter.png",
  centerBannerScriptLine1: "More Miles ♡",
  centerBannerScriptLine2: "More Journeys ✈",
  whatsAppNumber: "916397574309",
  whatsAppMessage: "Hello Novixa Travels, I need assistance with booking a car rental or transfer.",
  whatsAppText: "Chat on WhatsApp",
  phoneNumber: "+919876543210",
  displayPhone: "+91 98765 43210",
  trustText: "Verified drivers | Transparent pricing",
};

