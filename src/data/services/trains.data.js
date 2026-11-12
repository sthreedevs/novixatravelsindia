import React from "react";
import {
  Train,
  ShieldCheck,
  MapPin,
  Headphones,
  Calendar,
  CreditCard,
  Mail,
  FileText,
  Search,
  Armchair,
  Users,
  Compass,
  CheckCircle2,
  Ticket,
  Clock,
} from "lucide-react";

// 1. Hero Section Data
export const trainHeroData = {
  tag: "TRAIN TRAVEL",
  title: "Explore India & Beyond",
  titleHighlight: "By Train",
  titleHighlightFont: "handwriting",
  description:
    "Comfortable journeys, breathtaking views and unforgettable experiences — all aboard. Discover the beauty of India and beyond with our train travel services.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332961/backgrounds/trainHero.png",
  bgPositionClass: "object-center",
  layoutVariant: "panoramic",
  scriptNote: "Scenic Routes ♡",
  scriptSuffix: "New Stories ✈",
  badges: [
    {
      icon: <Train className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Comfortable",
      line2: "& Safe Travel",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Affordable",
      line2: "Options",
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Pan-India",
      line2: "Coverage",
    },
    {
      icon: <Headphones className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Easy Booking",
      line2: "Support",
    },
  ],
};

// 2. Top Train Routes in India (5 Route Cards)
export const popularTrainRoutes = [
  {
    id: "delhi-agra",
    from: "Delhi",
    to: "Agra",
    title: "Delhi → Agra",
    desc: "Witness the timeless beauty of the Taj Mahal.",
    duration: "2h 40m",
    trainType: "Shatabdi Express",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "delhi-jammu",
    from: "Delhi",
    to: "Jammu (Katra)",
    title: "Delhi → Jammu (Katra)",
    desc: "The gateway to Vaishno Devi and Kashmir.",
    duration: "8h 20m",
    trainType: "Vande Bharat",
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "mumbai-goa",
    from: "Mumbai",
    to: "Goa",
    title: "Mumbai → Goa",
    desc: "Beach vibes, endless horizons.",
    duration: "8h 30m",
    trainType: "Konkan Railway",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "delhi-jaipur",
    from: "Delhi",
    to: "Jaipur",
    title: "Delhi → Jaipur",
    desc: "Royal heritage and vibrant culture.",
    duration: "5h 20m",
    trainType: "Shatabdi Express",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "chennai-coimbatore",
    from: "Chennai",
    to: "Coimbatore",
    title: "Chennai → Coimbatore",
    desc: "From city life to cool hill stations.",
    duration: "7h 45m",
    trainType: "Intercity Express",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80",
  },
];

// 3. Why Choose Novixa Panoramic Banner (6 Features)
export const trainWhyChooseData = {
  tag: "WHY CHOOSE NOVIXA",
  title: "Your Train Journey, Our Priority",
  description:
    "We make train travel simple, convenient and stress-free. From ticket booking to seat guidance, we're with you at every step of your journey.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/backgrounds/whyTrainBg.png",
  features: [
    {
      id: "confirmed",
      title: "Confirmed Ticket Booking",
      desc: "(Subject to availability)",
      icon: <Train className="w-5 h-5 text-[#deb06c]" />,
    },
    {
      id: "fare",
      title: "Best Fare Guarantee",
      desc: "& No Hidden Charges",
      icon: <ShieldCheck className="w-5 h-5 text-[#deb06c]" />,
    },
    {
      id: "seat",
      title: "Seat & Coach Preference",
      desc: "(AC / Sleeper / General)",
      icon: <Armchair className="w-5 h-5 text-[#deb06c]" />,
    },
    {
      id: "support",
      title: "24/7 Customer Support",
      desc: "Always here for you",
      icon: <Headphones className="w-5 h-5 text-[#deb06c]" />,
    },
    {
      id: "pan-india",
      title: "Pan-India Network",
      desc: "All major routes",
      icon: <MapPin className="w-5 h-5 text-[#deb06c]" />,
    },
    {
      id: "corporate",
      title: "Group & Corporate Bookings",
      desc: "Special rates available",
      icon: <Calendar className="w-5 h-5 text-[#deb06c]" />,
    },
  ],
};

// 4. Must-Visit Destinations by Train (6 Cards)
export const trainDestinations = [
  {
    id: "delhi",
    city: "Delhi",
    desc: "Capital of India",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "agra",
    city: "Agra",
    desc: "Home of the Taj Mahal",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "jaipur",
    city: "Jaipur",
    desc: "The Pink City",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "varanasi",
    city: "Varanasi",
    desc: "Spiritual Vibes",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "udaipur",
    city: "Udaipur",
    desc: "City of Lakes",
    image:
      "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "goa",
    city: "Goa",
    desc: "Beach Paradise",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=80",
  },
];

// 5. How to Book Your Train Ticket (4 Steps Flow)
export const trainStepsData = [
  {
    num: "1",
    icon: <FileText className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Share Your Travel Details",
    desc: "Tell us your origin, destination and preferred journey date.",
  },
  {
    num: "2",
    icon: <Search className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Get Best Options & Quote",
    desc: "We check real-time availability and recommend the best train & class.",
  },
  {
    num: "3",
    icon: <CreditCard className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Confirm & Book",
    desc: "Instant booking confirmation with secure and hassle-free payment.",
  },
  {
    num: "4",
    icon: <Mail className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Receive E-Ticket & Travel",
    desc: "Get your confirmed IRCTC e-ticket via WhatsApp & email and board smoothly.",
  },
];

// 6. Frequently Asked Questions
export const trainFaqs = [
  {
    id: "item-1",
    question: "Can I choose my seat while booking a train ticket?",
    answer:
      "While Indian Railways allocates specific berth numbers upon final chart preparation, our specialists record your exact berth preferences (such as Lower Berth, Upper Berth, Side Lower, or Window Seat) and submit them with the booking.",
  },
  {
    id: "item-2",
    question: "Do you support Tatkal and Premium Tatkal bookings?",
    answer:
      "Yes! We provide dedicated Tatkal booking assistance when booking windows open at 10:00 AM (for AC classes) and 11:00 AM (for Sleeper classes) to maximize your chances of confirmed ticket allocation.",
  },
  {
    id: "item-3",
    question: "How will I receive my train ticket?",
    answer:
      "As soon as your booking is processed, your official IRCTC e-ticket with PNR number, coach, berth details, and QR code is delivered instantly to your WhatsApp and email address.",
  },
  {
    id: "item-4",
    question: "What happens if my ticket is Waitlisted (WL) or RAC?",
    answer:
      "We provide continuous PNR tracking and live confirmation probability updates. If your waitlist does not confirm before chart preparation, refund guidelines are handled transparently as per official IRCTC policy.",
  },
  {
    id: "item-5",
    question: "Can you arrange group bookings or corporate train travel?",
    answer:
      "Yes, absolutely. For family tours, wedding groups, pilgrimages, or corporate retreats, we arrange bulk seat reservations and dedicated assistance across Vande Bharat, Rajdhani, Shatabdi, and express trains.",
  },
];

// 7. Bottom Support CTA Data
export const trainSupportData = {
  title: "Need Help With Train Booking?",
  subtitle: "Chat with our train reservation experts for instant confirmation guidance.",
  centerBannerImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/backgrounds/whyTrainBg.png",
  centerBannerScriptLine1: "Scenic Routes ♡",
  centerBannerScriptLine2: "New Stories ✈",
  whatsAppNumber: "916397574309",
  whatsAppMessage: "Hello Novixa Travels, I need assistance with train ticket booking.",
  whatsAppText: "Chat on WhatsApp",
  phoneNumber: "+919876543210",
  displayPhone: "+91 98765 43210",
  trustText: "IRCTC assistance | Fast response",
};

// 8. Conversion Strip Banner Data
export const trainCtaStripData = {
  scriptNote: "All Aboard for New Adventures ♡",
  message:
    "Get in touch with us for personalized train travel solutions, group bookings or corporate travel.",
  buttonText: "Request a Quote →",
  whatsAppNumber: "916397574309",
};
