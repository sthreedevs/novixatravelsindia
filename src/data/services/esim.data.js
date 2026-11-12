import React from "react";
import {
  Globe,
  Zap,
  Smartphone,
  ShieldCheck,
  Clock,
  CreditCard,
  QrCode,
  Signal,
  Headphones,
} from "lucide-react";

// 1. Hero Section Data
export const esimHeroData = {
  tag: "STAY CONNECTED WORLDWIDE",
  title: "eSIM for Your",
  titleHighlight: "Next Adventure",
  titleHighlightFont: "handwriting",
  description:
    "Get instant, hassle-free mobile data in 190+ countries. Stay connected with your loved ones, navigate with ease, and make the most of your journey — without the hassle of physical SIM cards.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332949/backgrounds/eSimHero.png",
  bgPositionClass: "object-center",
  layoutVariant: "panoramic",
  scriptNote: "No Roaming, No Extra Charges",
  scriptSuffix: "Just Travel ♡",
  badges: [
    {
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
          <Globe className="w-4 h-4 stroke-[2.4]" />
        </div>
      ),
      line1: "190+ Countries",
      line2: "Global Coverage",
      text: "190+ Countries Coverage",
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
          <Zap className="w-4 h-4 stroke-[2.4]" />
        </div>
      ),
      line1: "Instant Digital",
      line2: "QR Activation",
      text: "Instant Activation",
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
          <Smartphone className="w-4 h-4 stroke-[2.4]" />
        </div>
      ),
      line1: "No Physical",
      line2: "SIM Needed",
      text: "No Physical SIM Required",
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
          <ShieldCheck className="w-4 h-4 stroke-[2.4]" />
        </div>
      ),
      line1: "Zero Roaming",
      line2: "Extra Fees",
      text: "Secure & Reliable",
    },
  ],
};

// 2. Why Choose eSIM Data (Used with shared ServicePanoramicBanner)
export const esimWhyChoosePillars = [
  {
    icon: (
      <div className="w-7 h-7 flex items-center justify-center">
        <Globe className="w-7 h-7 text-[#deb06c] stroke-[2.2]" />
      </div>
    ),
    line1: "190+ Countries",
    line2: "Global Coverage",
  },
  {
    icon: (
      <div className="w-7 h-7 flex items-center justify-center">
        <Zap className="w-7 h-7 text-[#deb06c] fill-[#deb06c]" />
      </div>
    ),
    line1: "Instant Digital",
    line2: "QR Activation",
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
    line1: "Keep Your",
    line2: "WhatsApp Number",
  },
  {
    icon: (
      <div className="w-7 h-7 flex items-center justify-center">
        <Headphones className="w-7 h-7 text-[#deb06c] stroke-[2.4]" />
      </div>
    ),
    line1: "24/7 Dedicated",
    line2: "Travel Support",
  },
];

export const esimWhyChooseData = {
  tag: "WHY CHOOSE NOVIXA",
  title: "More Than Just Mobile Data",
  description:
    "An eSIM is the smarter, easier and more flexible way to stay connected while traveling — no physical SIM swaps, no hidden fees, and zero roaming charges.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332944/backgrounds/eSimBG.png",
  pillars: esimWhyChoosePillars,
};

// 3. Popular eSIM Destinations Data
export const esimDestinationsData = {
  eyebrow: "eSIM PLANS",
  title: "Popular eSIM Destinations",
  description:
    "Choose from our most popular destinations or get a custom plan for your specific country or region.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332944/backgrounds/eSimBG.png",
  scriptTop: "More Data",
  scriptBottom: "More Freedom ♡",
  cards: [
    {
      id: "dubai",
      destination: "Dubai",
      countryCode: "AE",
      specs: "4G/5G | 1GB - 20GB",
      pricePrefix: "From",
      price: "₹599",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&auto=format&fit=crop&q=80",
      buttonText: "View Plans →",
    },
    {
      id: "thailand",
      destination: "Thailand",
      countryCode: "TH",
      specs: "4G/5G | 1GB - 20GB",
      pricePrefix: "From",
      price: "₹599",
      image:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=900&auto=format&fit=crop&q=80",
      buttonText: "View Plans →",
    },
    {
      id: "europe",
      destination: "Europe",
      countryCode: "EU",
      specs: "4G/5G | 1GB - 20GB",
      pricePrefix: "From",
      price: "₹799",
      image:
        "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=900&auto=format&fit=crop&q=80",
      buttonText: "View Plans →",
    },
    {
      id: "usa",
      destination: "USA",
      countryCode: "US",
      specs: "4G/5G | 1GB - 20GB",
      pricePrefix: "From",
      price: "₹799",
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=900&auto=format&fit=crop&q=80",
      buttonText: "View Plans →",
    },
    {
      id: "singapore",
      destination: "Singapore",
      countryCode: "SG",
      specs: "4G/5G | 1GB - 20GB",
      pricePrefix: "From",
      price: "₹599",
      image:
        "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=900&auto=format&fit=crop&q=80",
      buttonText: "View Plans →",
    },
    {
      id: "global",
      destination: "Global",
      countryCode: "GLOBAL",
      specs: "4G/5G | 1GB - 20GB",
      pricePrefix: "From",
      price: "₹999",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=80",
      buttonText: "View Plans →",
    },
  ],
};

// 4. How It Works Steps (for shared ServiceStepsSection)
export const esimStepsData = [
  {
    num: "1",
    icon: <Clock className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Choose Your Plan",
    desc: "Select your destination, data plan and validity.",
  },
  {
    num: "2",
    icon: <CreditCard className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Make Payment",
    desc: "Secure and flexible payment options.",
  },
  {
    num: "3",
    icon: <QrCode className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Scan QR Code",
    desc: "Receive your eSIM details via email.",
  },
  {
    num: "4",
    icon: <Signal className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Start Using",
    desc: "Activate and enjoy instant connectivity.",
  },
];

// 5. Testimonials Data
export const esimTestimonialsData = {
  eyebrow: "WHAT OUR TRAVELERS SAY",
  title: "Real Stories, Real Connections",
  description:
    "See how our eSIM services have made travel easier for countless explorers around the world.",
  ctaText: "View All Reviews →",
  reviews: [
    {
      id: "priya",
      name: "Priya S.",
      location: "Dubai",
      avatar: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332969/destinations/esim-avatar-priya.png",
      rating: 5,
      review:
        "Super easy to activate and worked perfectly in Dubai. No more worrying about roaming charges!",
    },
    {
      id: "rohit",
      name: "Rohit M.",
      location: "Europe",
      avatar: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-avatar-rohit.png",
      rating: 5,
      review:
        "Used it for my Europe trip. Great speed and coverage across multiple countries. Highly recommend!",
    },
    {
      id: "ananya",
      name: "Ananya T.",
      location: "Thailand",
      avatar: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332969/destinations/esim-avatar-ananya.png",
      rating: 5,
      review:
        "Best travel eSIM service! Its super convenient and saved me a lot of money. Will definitely use again!",
    },
  ],
};

// 6. Frequently Asked Questions & Concierge Support (for shared ServiceFaqSupportSection)
export const esimFaqData = [
  {
    id: "what-is-esim",
    question: "What is an eSIM and how does it work?",
    answer:
      "An eSIM (embedded SIM) is a digital SIM built directly into your smartphone. It allows you to activate a high-speed cellular data plan without having to insert a physical plastic SIM card.",
  },
  {
    id: "compatible-devices",
    question: "Which devices support Novixa eSIM?",
    answer:
      "Most modern smartphones support eSIM, including Apple iPhone (XS and newer), Samsung Galaxy (S20 and newer), Google Pixel (3 and newer), plus many iPads and smartwatches.",
  },
  {
    id: "keep-whatsapp",
    question: "Can I keep my WhatsApp number and personal SIM active?",
    answer:
      "Yes, absolutely! Your dual-SIM phone allows your existing physical SIM to remain active for calls and SMS, while the Novixa eSIM provides seamless, cost-effective high-speed data.",
  },
  {
    id: "activation-process",
    question: "How do I activate the eSIM on my phone?",
    answer:
      "Immediately after completing your booking, you will receive a QR code via email. Simply go to your phone settings (Cellular / Mobile Data), choose 'Add eSIM', and scan the QR code to connect.",
  },
  {
    id: "roaming-charges",
    question: "Are there any hidden roaming charges?",
    answer:
      "No hidden fees or recurring charges. Novixa eSIM packages are prepaid data packs with transparent pricing. You only pay for the data bundle and validity you select.",
  },
  {
    id: "country-coverage",
    question: "What happens if I travel across multiple countries?",
    answer:
      "We offer regional and global eSIM plans covering over 190+ countries. For multi-country trips like Europe or Asia, our regional packs switch networks seamlessly across borders.",
  },
];

export const esimSupportData = {
  tag: "HELP & SUPPORT",
  title: "Frequently Asked Questions",
  centerBannerImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332945/backgrounds/eSimCTA.png",
  centerBannerImageFit: "object-contain",
  showCenterScript: false,
  centerBannerScriptLine1: "",
  centerBannerScriptLine2: "",
  supportTitle: "Need eSIM Assistance?",
  supportSubtitle:
    "Speak directly with our digital connectivity team for device compatibility check, custom regional plans, or setup help.",
  whatsAppNumber: "916397574309",
  whatsAppMessage:
    "Hello Novixa Travels, I need assistance with an international eSIM plan for my upcoming trip.",
  whatsAppText: "Chat on WhatsApp",
  phoneNumber: "+916397574309",
  displayPhone: "+91 63975 74309",
  showCallButton: true,
  trustText: "Instant QR Delivery | 24/7 Global Support",
};
