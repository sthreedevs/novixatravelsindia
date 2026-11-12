import React from "react";
import {
  ShieldCheck,
  Clock,
  Handshake,
  Headphones,
  Users,
  BadgeCheck,
  Bell,
  Globe,
  RotateCw,
  Zap,
  FileText,
  ClipboardList,
  FileCheck2,
  SendHorizontal,
  Compass,
  Award,
} from "lucide-react";

// 1. Hero Section Data
export const passportHeroData = {
  tag: "PASSPORT SERVICES",
  title: "Your Passport to",
  titleHighlight: "New Destinations",
  titleHighlightFont: "handwriting",
  description:
    "Get your passport hassle-free with Novixa Travels India. We make the application process simple, smooth and stress-free so you can focus on what matters — your journey.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332959/backgrounds/passportHero.png",
  bgPositionClass: "object-center",
  layoutVariant: "panoramic",
  badges: [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Official &",
      line2: "Secure Process",
    },
    {
      icon: <Clock className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Fast & Reliable",
      line2: "Assistance",
    },
    {
      icon: <Handshake className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "End-to-End",
      line2: "Support",
    },
    {
      icon: <Headphones className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Expert Guidance",
      line2: "at Every Step",
    },
  ],
  scriptNote: "Because Every Journey Begins with a Passport",
  scriptSuffix: "✈",
};

// 2. Our Passport Services Section Data
export const passportServicesData = {
  tag: "OUR PASSPORT SERVICES",
  title: "We Handle Everything",
  titleHighlight: "For You",
  description:
    "From document verification to final submission, we manage the entire process so you don't have to.",
  ctaText: "Get Started Now",
  services: [
    {
      id: "new-passport",
      iconType: "globe",
      title: "New Passport Application",
      description: "For first-time applicants (18+ years).",
    },
    {
      id: "reissue",
      iconType: "reissue",
      title: "Reissue of Passport",
      description: "For expired, lost, damaged or name change.",
    },
    {
      id: "tatkal",
      iconType: "tatkal",
      title: "Tatkal Service",
      description: "Need it urgently? We help with faster processing.",
    },
    {
      id: "guidance",
      iconType: "document",
      title: "Document Guidance",
      description: "Complete support for required documents and form filling.",
    },
  ],
};

// 3. Why Choose Novixa Section Data
export const passportWhyChooseData = {
  tag: "WHY CHOOSE NOVIXA",
  title: "Your Trusted Partner in Passport Services",
  description:
    "With years of travel expertise and a dedicated support team, we make your passport process quick, easy and reliable.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332959/backgrounds/passportCTA.png",
  badges: [
    {
      icon: <Users className="w-6 h-6 text-[#deb06c]" />,
      title: "Experienced Team",
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-[#deb06c]" />,
      title: "100% Genuine Process",
    },
    {
      icon: <Bell className="w-6 h-6 text-[#deb06c]" />,
      title: "Transparent Updates",
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#deb06c]" />,
      title: "Customer Support",
    },
  ],
  scriptFlourishLine1: "Your Passport ♡",
  scriptFlourishLine2: "Our Priority",
};

// 4. How It Works - Steps Data for Shared ServiceStepsSection
export const passportStepsData = [
  {
    num: "1",
    icon: <ClipboardList className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Share Your Details",
    desc: "Fill out the enquiry form with your basic information.",
  },
  {
    num: "2",
    icon: <FileCheck2 className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Document Verification",
    desc: "We'll guide you on the required documents and form filling process.",
  },
  {
    num: "3",
    icon: <SendHorizontal className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Application Submission",
    desc: "Our team will submit your application to the relevant authority.",
  },
  {
    num: "4",
    icon: <Compass className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Track Your Application",
    desc: "Stay updated with real-time status and progress.",
  },
  {
    num: "5",
    icon: <Award className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Get Your Passport",
    desc: "Receive your passport at your doorstep (or collect as per choice).",
  },
];

// 5. Frequently Asked Questions
export const passportFaqData = [
  {
    id: "item-1",
    question: "What documents are required for a new passport?",
    answer:
      "Standard required documents include Proof of Date of Birth (Birth Certificate or 10th Class Marksheet), Photo ID & Address Proof (Aadhaar Card, Voter ID, or Utility Bill), and Passport size photographs as per specifications.",
  },
  {
    id: "item-2",
    question: "How long does it take to get a passport?",
    answer:
      "Normal passport processing generally takes 15 to 30 working days following appointment and police verification. With Tatkal urgent processing, it can be issued within 1 to 3 working days.",
  },
  {
    id: "item-3",
    question: "Can you help with Tatkal passport service?",
    answer:
      "Yes, absolutely. We prioritize urgent Tatkal applications, securing fastest available appointment slots at Passport Seva Kendra (PSK) and pre-verifying all Annexures to avoid delays.",
  },
  {
    id: "item-4",
    question: "What if my passport is lost or damaged?",
    answer:
      "If lost, you will need to lodge a police complaint (FIR) first. We will help prepare Annexure F, affidavit, and complete the reissue application under the lost/damaged category.",
  },
  {
    id: "item-5",
    question: "Do you provide home delivery of the passport?",
    answer:
      "The Ministry of External Affairs dispatches all printed passports via India Post Speed Post directly to your registered residential address. We provide live dispatch and consignment tracking until it safely reaches you.",
  },
];

// 6. Support & Center Banner Box Data
export const passportSupportData = {
  title: "Still Have Questions?",
  subtitle: "Chat with our travel experts for personalized assistance.",
  centerBannerImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332959/backgrounds/passportPage.jpg",
  centerBannerScriptLine1: "More Passports ♡",
  centerBannerScriptLine2: "More Stories ✈",
  whatsAppNumber: "916397574309",
  phoneNumber: "+919876543210",
  displayPhone: "+91 98765 43210",
};
