import React from "react";
import {
  Hotel,
  Building2,
  ShieldCheck,
  Headphones,
  Star,
  MapPin,
  BadgePercent,
  Users,
  MessageSquareText,
  Search,
  FileText,
  CheckCircle2,
} from "lucide-react";

// Hero section data
export const hotelHeroData = {
  tag: "LUXURY | COMFORT | MEMORIES",
  title: "Hotels Across",
  titleHighlight: "the World",
  titleHighlightFont: "handwriting",
  description:
    "From luxury resorts to boutique stays, let us help you find the perfect hotel for your dream trip. Share your requirements and we'll get back with the best options.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332952/backgrounds/hotelsHero.png",
  bgPositionClass: "object-center",
  layoutVariant: "panoramic",
  badges: [
    {
      icon: <Hotel className="w-5 h-5 text-[#deb06c] shrink-0 stroke-[2]" />,
      line1: "Wide Range",
      line2: "of Hotels",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#deb06c] shrink-0 stroke-[2]" />,
      line1: "Trusted",
      line2: "Suppliers",
    },
    {
      icon: <Headphones className="w-5 h-5 text-[#deb06c] shrink-0 stroke-[2]" />,
      line1: "24/7",
      line2: "Support",
    },
    {
      icon: <Star className="w-5 h-5 text-[#deb06c] shrink-0 stroke-[2]" />,
      line1: "Personalized",
      line2: "Recommendations",
    },
  ],
  scriptNote: "Your Stay, Our Priority",
};

// Section 2: Popular Destinations
export const popularHotelDestinations = [
  {
    id: "dubai",
    name: "Dubai",
    subtitle: "Luxury & Business Stays",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "maldives",
    name: "Maldives",
    subtitle: "Overwater Villas & Resorts",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "bali",
    name: "Bali",
    subtitle: "Beach Resorts & Villas",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "thailand",
    name: "Thailand",
    subtitle: "Island Resorts & City Hotels",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "switzerland",
    name: "Switzerland",
    subtitle: "Alpine Stays & Luxury Hotels",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=900&auto=format&fit=crop&q=80",
  },
];

// Section 3: Featured Hotels (Handpicked Stays for You)
export const handpickedHotels = [
  {
    id: "burj-al-arab",
    name: "Burj Al Arab",
    location: "Dubai, UAE",
    rating: "5.0",
    reviewsCount: "120+ reviews",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "soneva-jani",
    name: "Soneva Jani",
    location: "Maldives",
    rating: "4.9",
    reviewsCount: "85+ reviews",
    category: "Resort",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "the-oberoi-bali",
    name: "The Oberoi Bali",
    location: "Bali, Indonesia",
    rating: "4.8",
    reviewsCount: "60+ reviews",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "taj-lake-palace",
    name: "Taj Lake Palace",
    location: "Udaipur, India",
    rating: "4.7",
    reviewsCount: "90+ reviews",
    category: "Heritage",
    image:
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "marina-bay-sands",
    name: "Marina Bay Sands",
    location: "Singapore",
    rating: "4.9",
    reviewsCount: "210+ reviews",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=900&auto=format&fit=crop&q=80",
  },
];

// Section 4: Why Book Hotels with Novixa?
export const whyBookNovixaData = {
  tag: "WHY CHOOSE NOVIXA",
  title: "Why Book Hotels with Novixa?",
  subtitle:
    "We make hotel booking simple, reliable and stress-free with personalized assistance at every step.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332944/backgrounds/ctaHotel.png",
  scriptText: "Your Perfect Stay",
  scriptTextLine2: "Awaits",
  features: [
    {
      id: "curated",
      title: "Curated Hotel Options",
      subtitle: "Based on Your Preferences",
      icon: <Building2 className="w-5 h-5 text-zinc-950 stroke-[2.4]" />,
    },
    {
      id: "rates",
      title: "Best Rates",
      subtitle: "from Trusted Suppliers",
      icon: <BadgePercent className="w-5 h-5 text-zinc-950 stroke-[2.4]" />,
    },
    {
      id: "exclusive",
      title: "Exclusive",
      subtitle: "Hotel Deals",
      icon: <Star className="w-5 h-5 text-zinc-950 stroke-[2.4]" />,
    },
    {
      id: "special",
      title: "Special Requests",
      subtitle: "(we'll do our best)",
      icon: <Users className="w-5 h-5 text-zinc-950 stroke-[2.4]" />,
    },
    {
      id: "support",
      title: "24/7",
      subtitle: "Travel Support",
      icon: <Headphones className="w-5 h-5 text-zinc-950 stroke-[2.4]" />,
    },
  ],
};

// Section 5: Shared How It Works Steps (matches ServiceStepsSection schema)
export const hotelStepsData = [
  {
    num: "1",
    icon: <MessageSquareText className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Share Your Requirements",
    desc: "Tell us your destination, dates, budget & preferences.",
  },
  {
    num: "2",
    icon: <Search className="w-6 h-6 text-zinc-950 stroke-[2.4]" />,
    title: "We Find the Best Options",
    desc: "Our team checks availability and rates with top hotels.",
  },
  {
    num: "3",
    icon: <FileText className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Get Personalized Quote",
    desc: "Receive multiple options with complete details.",
  },
  {
    num: "4",
    icon: <CheckCircle2 className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    title: "Confirm & Enjoy",
    desc: "You book, we assist and you're ready to go!",
  },
];

// Section 6: Client Reviews & FAQs
export const hotelClientReviews = [
  {
    id: 1,
    name: "Ananya S.",
    location: "Delhi → Dubai",
    rating: 5,
    text: "Novixa made my Dubai trip super easy! Got the best hotel options and great rates. Highly recommend!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Rohit M.",
    location: "Mumbai → Bali",
    rating: 5,
    text: "Very professional and helpful team. Found us a beautiful resort in Bali. Will definitely book again.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Priya K.",
    location: "Bangalore → Maldives",
    rating: 5,
    text: "Excellent service and personalized recommendations. Our stay was perfect!",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  },
];

export const hotelFaqs = [
  {
    question: "How do I book a hotel with Novixa?",
    answer:
      "Simply fill out the form above with your destination, dates, and preferences, or message us on WhatsApp. Our travel specialists will find the best options and get back to you with custom rates.",
  },
  {
    question: "Can I get custom hotel options for my trip?",
    answer:
      "Yes! Whether you're looking for family-friendly suites, private pool villas, overwater bungalows, or boutique business hotels, we curate options precisely tailored to your needs.",
  },
  {
    question: "Are hotel bookings refundable?",
    answer:
      "Cancellation policies vary depending on the hotel and tariff chosen. We clearly highlight flexible and free cancellation options before you confirm any booking.",
  },
  {
    question: "Do you also help with transfers and tours?",
    answer:
      "Absolutely. We can bundle your hotel stay with airport transfers, private chauffeur cars, guided city tours, and day trips for a completely seamless trip.",
  },
  {
    question: "What is the typical response time?",
    answer:
      "Our hotel concierge team typically responds within 30 to 60 minutes during business hours with initial availability and custom quotes.",
  },
];

// Section 7: Bottom CTA Banner Data
export const hotelBottomCtaData = {
  title: "Looking for a Hotel?",
  subtitle: "Share your details and let us find the perfect stay for you.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332956/backgrounds/hotelBgImage.png",
  whatsappNumber: "+919876543210",
};

// Section 8: Support & FAQ Center Data for ServiceFaqSupportSection
export const hotelSupportData = {
  title: "Need Help With Your Stay?",
  subtitle: "Chat with our hotel concierge for bespoke stays, group rates, and special requests.",
  centerBannerImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332944/backgrounds/ctaHotel.png",
  centerBannerScriptLine1: "More Luxury ♡",
  centerBannerScriptLine2: "More Comfort ✈",
  whatsAppNumber: "916397574309",
  whatsAppMessage: "Hello Novixa Travels, I need assistance with booking a hotel.",
  whatsAppText: "Chat on WhatsApp",
  phoneNumber: "+919876543210",
  displayPhone: "+91 98765 43210",
  trustText: "Verified luxury properties | Best rate guarantee",
};

