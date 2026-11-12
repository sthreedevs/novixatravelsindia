import React from "react";
import {
  ShieldCheck,
  Clock,
  Headphones,
  Handshake,
  Plane,
  Briefcase,
  ClipboardList,
  FileCheck2,
  SendHorizontal,
  Compass,
  Award,
} from "lucide-react";

// 1. Hero Section Data
export const visaHeroData = {
  tag: "VISA SERVICES | GLOBAL ACCESS",
  title: "Your Visa,",
  titleHighlight: "Our Expertise",
  titleHighlightFont: "handwriting",
  description:
    "From tourist visas to business and transit visas, we handle the complete process so you can focus on what matters — your journey.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332966/backgrounds/visaHero.png",
  bgPositionClass: "object-center",
  layoutVariant: "panoramic",
  badges: [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "100% Genuine",
      line2: "Process",
    },
    {
      icon: <Clock className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Fast & Reliable",
      line2: "Service",
    },
    {
      icon: <Headphones className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Expert Guidance",
      line2: "at Every Step",
    },
    {
      icon: <Handshake className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "End-to-End",
      line2: "Support",
    },
  ],
  scriptNote: "More Destinations. More Possibilities.",
  scriptSuffix: "✈",
};

// 2. Our Visa Services Categories (3 Items)
export const visaServicesData = {
  tag: "OUR VISA SERVICES",
  title: "Visa Services for",
  titleHighlight: "Every Journey",
  description:
    "We provide end-to-end visa assistance for individuals, families and groups with a hassle-free experience.",
  ctaText: "Get a Free Consultation",
  categories: [
    {
      id: "tourist",
      iconType: "plane",
      title: "Tourist Visa",
      description:
        "Explore the world with ease. Get your tourist visa for your dream destination.",
    },
    {
      id: "business",
      iconType: "briefcase",
      title: "Business Visa",
      description:
        "For meetings, conferences and business trips. We handle it all.",
    },
    {
      id: "transit",
      iconType: "transit",
      title: "Transit Visa",
      description:
        "Smooth layovers and stopovers for passing through to your next destination.",
    },
  ],
};

// 3. Top Countries for Visa Assistance (6 Cards)
export const topVisaCountries = [
  {
    id: "uae",
    country: "UAE",
    flag: "🇦🇪",
    category: "Tourist / Business",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "usa",
    country: "USA",
    flag: "🇺🇸",
    category: "Tourist / Business / Transit",
    image:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "uk",
    country: "UK",
    flag: "🇬🇧",
    category: "Tourist / Business / Transit",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "schengen",
    country: "Schengen",
    flag: "🇪🇺",
    category: "Tourist / Business",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "australia",
    country: "Australia",
    flag: "🇦🇺",
    category: "Tourist / Transit",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "singapore",
    country: "Singapore",
    flag: "🇸🇬",
    category: "Tourist / Business",
    image:
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=700&auto=format&fit=crop&q=80",
  },
];

// 4. How It Works - 5 Connected Steps
export const visaStepsData = [
  {
    num: "1",
    icon: <ClipboardList className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Share Your Details",
    desc: "Tell us about your travel plans, destination and visa type.",
  },
  {
    num: "2",
    icon: <FileCheck2 className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Document Verification",
    desc: "We check your documents and ensure everything is in order.",
  },
  {
    num: "3",
    icon: <SendHorizontal className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Application Submission",
    desc: "We submit your application to the respective embassy or consulate.",
  },
  {
    num: "4",
    icon: <Compass className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Track Your Application",
    desc: "Get regular updates on the status of your visa.",
  },
  {
    num: "5",
    icon: <Award className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Get Your Visa",
    desc: "Receive your visa and start your journey!",
  },
];

// 5. Trusted Partners Bar (Matching flights pattern with SVGs)
export const visaPartners = [
  {
    name: "VFS.GLOBAL",
    logo: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332973/partners/vfs-global.svg",
    width: 150,
    height: 40,
    className: "h-7 sm:h-8",
  },
  {
    name: "TLScontact",
    logo: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332973/partners/tlscontact.svg",
    width: 140,
    height: 38,
    className: "h-6 sm:h-7",
  },
  {
    name: "BLS INTERNATIONAL",
    logo: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332972/partners/bls-international.svg",
    width: 150,
    height: 40,
    className: "h-7 sm:h-8",
  },
  {
    name: "eVisa",
    logo: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332972/partners/evisa.svg",
    width: 130,
    height: 38,
    className: "h-7 sm:h-8",
  },
  {
    name: "IATA Accredited",
    logo: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332973/partners/iata.svg",
    width: 150,
    height: 40,
    className: "h-7 sm:h-8",
  },
];

// 6. Client Reviews
export const visaReviews = [
  {
    name: "Ananya S.",
    location: "Delhi",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    text: "Novixa made my Dubai visa process so simple and stress-free. Highly recommended!",
    rating: 5,
  },
  {
    name: "Rohit M.",
    location: "Mumbai",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    text: "Very professional and supportive team. Got my Schengen visa without any hassle.",
    rating: 5,
  },
  {
    name: "Priya K.",
    location: "Bangalore",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    text: "Excellent service and quick response. Helped me with my transit visa.",
    rating: 5,
  },
];

// 7. Frequently Asked Questions
export const visaFaqs = [
  {
    id: "item-1",
    question: "What documents are required for a tourist visa?",
    answer:
      "Basic documents typically include a valid original passport (minimum 6 months validity), recent passport-size photographs as per specifications, return flight tickets, confirmed hotel bookings, proof of funds (recent bank statements), and a day-by-day travel itinerary.",
  },
  {
    id: "item-2",
    question: "How long does the visa process take?",
    answer:
      "Processing time depends on the destination embassy. E-visas (e.g. Dubai, Singapore, Vietnam) are generally issued in 2 to 5 working days. Regular sticker visas (e.g. Schengen, UK, USA) typically require 10 to 20 working days post biometrics.",
  },
  {
    id: "item-3",
    question: "Can you help with urgent visa services?",
    answer:
      "Yes! Where express or priority visa processing is officially supported by the embassy or consulate (e.g. Dubai, UK priority), our team secures express appointment slots and expedites documentation.",
  },
  {
    id: "item-4",
    question: "Do you provide assistance for visa interview?",
    answer:
      "Yes, we offer mock interview sessions, question prep guides, and file organization for countries that mandate in-person visa interviews (such as the USA).",
  },
  {
    id: "item-5",
    question: "What is the visa fee and payment process?",
    answer:
      "Visa fees consist of government embassy consular fees and our transparent service fee. All payments can be made securely online with complete receipts provided.",
  },
];

// 8. Bottom CTA & Support Box Data (for shared ServiceFaqSupportSection)
export const visaSupportData = {
  title: "Need Help with Your Visa?",
  subtitle: "Get expert guidance and hassle-free visa assistance.",
  centerBannerImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332962/backgrounds/visaPage.jpg",
  centerBannerScriptLine1: "Your Visa ♡",
  centerBannerScriptLine2: "Our Expertise ✈",
  whatsAppNumber: "916397574309",
  whatsAppMessage: "Hello Novixa Travels, I need help with my visa application.",
  whatsAppText: "Chat on WhatsApp",
  phoneNumber: "+919876543210",
  displayPhone: "+91 98765 43210",
  trustText: "Quick support | Free consultation",
};

// 9. Legacy Bottom CTA Data (if needed)
export const visaCtaData = {
  title: "Need Help with Your Visa?",
  subtitle: "Get expert guidance and hassle-free visa assistance.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332966/backgrounds/whyFlightBg.png",
  whatsAppNumber: "916397574309",
  whatsAppText: "Chat on WhatsApp",
  subText: "Quick support | Free consultation",
};
