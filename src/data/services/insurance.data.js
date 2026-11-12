import React from "react";
import {
  ShieldCheck,
  Stethoscope,
  CalendarX,
  Luggage,
  Headphones,
  HeartPulse,
  FileText,
  Search,
  CreditCard,
  Mail,
  Plane,
  Globe,
  Mountain,
  MapPin,
  Ship,
} from "lucide-react";

// 1. Hero Section Data
export const insuranceHeroData = {
  tag: "TRAVEL INSURANCE | STAY PROTECTED",
  title: "Travel Insurance",
  titleHighlight: "for a Worry-Free Journey",
  titleHighlightFont: "handwriting",
  description:
    "Unexpected things can happen, but your travel plans don't have to stop. Get comprehensive travel insurance for complete peace of mind, wherever you go.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332958/backgrounds/insuranceHero.png",
  bgPositionClass: "object-center",
  layoutVariant: "panoramic",
  scriptNote: "Travel Safe. Explore More. ✈",
  badges: [
    {
      icon: <Stethoscope className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Medical",
      line2: "Coverage",
    },
    {
      icon: <CalendarX className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Trip",
      line2: "Cancellation",
    },
    {
      icon: <Luggage className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Lost Baggage",
      line2: "Protection",
    },
    {
      icon: <Headphones className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "24/7",
      line2: "Assistance",
    },
  ],
};

// 2. Why Choose Novixa / Why Get Travel Insurance (5 Cards)
export const insuranceWhyChooseData = {
  tag: "WHY CHOOSE NOVIXA",
  title: "Why Get Travel Insurance?",
  description:
    "Travel is full of excitement, but it also comes with risks. Our travel insurance keeps you covered, so you can focus on making memories, not worrying about the unexpected.",
  features: [
    {
      id: "medical",
      title: "Medical Coverage",
      desc: "Covers unexpected medical expenses, doctor visits & hospitalization abroad.",
      icon: <HeartPulse className="w-6 h-6 text-[#deb06c]" />,
    },
    {
      id: "cancellation",
      title: "Trip Cancellation",
      desc: "Get reimbursed for non-refundable flight & hotel costs (in selected plans).",
      icon: <CalendarX className="w-6 h-6 text-[#deb06c]" />,
    },
    {
      id: "baggage",
      title: "Lost Baggage",
      desc: "Financial protection and support if your luggage is delayed, lost or damaged.",
      icon: <Luggage className="w-6 h-6 text-[#deb06c]" />,
    },
    {
      id: "assistance",
      title: "24/7 Assistance",
      desc: "Worldwide round-the-clock emergency assistance and claim guidance whenever you need it.",
      icon: <Headphones className="w-6 h-6 text-[#deb06c]" />,
    },
    {
      id: "plans",
      title: "Multiple Plans",
      desc: "Choose flexible coverage from budget, standard or premium plans tailored to your trip.",
      icon: <ShieldCheck className="w-6 h-6 text-[#deb06c]" />,
    },
  ],
};

// 3. Insurance for Every Destination (5 Portrait Cards)
export const destinationInsuranceTypes = [
  {
    id: "international",
    title: "International Travel",
    subtitle: "Worldwide coverage",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop&q=80",
    icon: <Plane className="w-4 h-4 text-white" />,
  },
  {
    id: "schengen",
    title: "Schengen Countries",
    subtitle: "Visa & travel cover",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
    icon: <Globe className="w-4 h-4 text-white" />,
  },
  {
    id: "adventure",
    title: "Adventure Travel",
    subtitle: "Trekking, sports & more",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
    icon: <Mountain className="w-4 h-4 text-white" />,
  },
  {
    id: "domestic",
    title: "Domestic Travel",
    subtitle: "India & beyond",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
    icon: <MapPin className="w-4 h-4 text-white" />,
  },
  {
    id: "cruise",
    title: "Cruise Travel",
    subtitle: "At sea & on land",
    image:
      "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=800&auto=format&fit=crop&q=80",
    icon: <Ship className="w-4 h-4 text-white" />,
  },
];

// 4. How It Works (4 Steps)
export const insuranceStepsData = [
  {
    num: "1",
    icon: <FileText className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Share Your Details",
    desc: "Tell us about your trip, destination and travel dates.",
  },
  {
    num: "2",
    icon: <Search className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Compare Plans",
    desc: "We'll suggest the best options based on your needs.",
  },
  {
    num: "3",
    icon: <CreditCard className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Make Payment",
    desc: "Secure and hassle-free online payment.",
  },
  {
    num: "4",
    icon: <Mail className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Get Your Policy",
    desc: "Receive your policy instantly via email.",
  },
];

// 5. Travel Insurance Plans (3 Cards matching design screenshot)
export const insurancePlansData = [
  {
    id: "basic",
    name: "Basic",
    popular: false,
    badge: null,
    desc: "Essential coverage for short trips and domestic travel.",
    features: [
      "Medical cover",
      "Trip cancellation",
      "Baggage loss",
    ],
    buttonText: "View Details →",
  },
  {
    id: "standard",
    name: "Standard",
    popular: true,
    badge: "Most Popular",
    desc: "Best value for most travelers with wider coverage.",
    features: [
      "Medical cover",
      "Trip interruption",
      "Baggage & delay",
    ],
    buttonText: "View Details →",
  },
  {
    id: "premium",
    name: "Premium",
    popular: false,
    badge: null,
    desc: "Complete protection for long trips and high-value travel.",
    features: [
      "Higher medical cover",
      "Adventure sports",
      "Personal liability",
    ],
    buttonText: "View Details →",
  },
];

// 6. Frequently Asked Questions
export const insuranceFaqs = [
  {
    id: "item-1",
    question: "What does travel insurance cover?",
    answer:
      "Travel insurance typically covers unexpected overseas medical expenses, emergency hospitalization, trip cancellation or interruption, flight delays, lost or delayed baggage, and emergency medical evacuation back home.",
  },
  {
    id: "item-2",
    question: "Is travel insurance mandatory?",
    answer:
      "Yes, for many destinations like Schengen countries (Europe), UAE (certain visa types), and various other international regions, having valid travel insurance with minimum prescribed medical coverage is an official entry and visa requirement. Even where not legally mandatory, it is strongly advised to prevent catastrophic medical bills abroad.",
  },
  {
    id: "item-3",
    question: "Can I buy insurance after booking my flight?",
    answer:
      "Yes, absolutely! You can purchase travel insurance anytime before your journey starts. However, we recommend purchasing it right after booking your flights or hotels so you get maximum trip cancellation coverage starting from day one.",
  },
  {
    id: "item-4",
    question: "Does it cover COVID-19 related issues?",
    answer:
      "Yes, our curated insurance plans provide comprehensive medical and trip disruption coverage for COVID-19 and other infectious diseases contracted during the covered trip dates.",
  },
  {
    id: "item-5",
    question: "How do I make a claim?",
    answer:
      "Filing a claim is simple and fully digital. You can reach the 24/7 international assistance helpline printed on your policy schedule, or file online with your hospital bills, flight disruption certificates, or police reports (for lost items). Most claims are settled swiftly through cashless hospitals or direct bank reimbursements.",
  },
  {
    id: "item-6",
    question: "What are the documents required?",
    answer:
      "To issue your policy, you only need basic travel details: destination country, travel dates, passport numbers, age/date of birth of travelers, and contact information. No medical check-up is required for standard international leisure travel plans.",
  },
];

// 7. Support & Center Banner Box Data (for shared ServiceFaqSupportSection)
export const insuranceSupportData = {
  title: "Travel Worry-Free",
  subtitle: "Get the right travel insurance plan for your next adventure.",
  centerBannerImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332958/backgrounds/insuranceCTA.png",
  centerBannerScriptLine1: "Travel ♡ With",
  centerBannerScriptLine2: "Confidence ✈",
  whatsAppNumber: "916397574309",
  whatsAppMessage: "Hello Novixa Travels, I need assistance choosing a travel insurance plan.",
  whatsAppText: "Chat on WhatsApp",
  phoneNumber: "+919876543210",
  displayPhone: "+91 98765 43210",
  trustText: "Quick support | Free consultation",
};
