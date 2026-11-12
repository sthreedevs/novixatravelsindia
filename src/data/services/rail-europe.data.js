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
  Globe,
  Award,
  Camera,
  BookOpen,
} from "lucide-react";

// 1. Hero Section Data
export const railEuropeHeroData = {
  tag: "EUROPE RAIL TRAVEL",
  title: "Explore Europe",
  titleHighlight: "by Train",
  titleHighlightFont: "handwriting",
  description:
    "Hop on to a European adventure with our expertly planned rail journeys. From charming towns to world-famous cities, experience Europe at a slower, more beautiful pace — by train.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332951/backgrounds/europeRailHero.png",
  bgPositionClass: "object-center",
  layoutVariant: "panoramic",
  scriptNote: "One Pass",
  scriptSuffix: "Many Countries ♡\nCountless Memories ✈",
  badges: [
    {
      icon: <Compass className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Flexible",
      line2: "Itineraries",
    },
    {
      icon: <Armchair className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Comfortable",
      line2: "& Scenic Routes",
    },
    {
      icon: <Globe className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Multiple",
      line2: "Countries",
    },
    {
      icon: <Ticket className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Rail Passes",
      line2: "& Bookings",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#deb06c] shrink-0" />,
      line1: "Visa Support",
      line2: "(Optional)",
    },
  ],
};

// 2. Popular Europe Rail Routes (6 Route Cards)
export const popularEuropeRailRoutes = [
  {
    id: "paris-zurich",
    from: "Paris",
    to: "Zurich",
    title: "Paris → Zurich",
    desc: "Romantic cities, scenic landscapes and Swiss charm.",
    duration: "7N/8D",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "amsterdam-brussels",
    from: "Amsterdam",
    to: "Brussels",
    title: "Amsterdam → Brussels",
    desc: "Canals, culture and chocolate delights.",
    duration: "5N/6D",
    image:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "rome-florence-venice",
    from: "Rome",
    to: "Venice",
    title: "Rome → Florence → Venice",
    desc: "History, art and timeless beauty.",
    duration: "8N/9D",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "munich-salzburg-vienna",
    from: "Munich",
    to: "Vienna",
    title: "Munich → Salzburg → Vienna",
    desc: "Castles, mountains and imperial charm.",
    duration: "6N/7D",
    image:
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "zurich-interlaken",
    from: "Zurich",
    to: "Interlaken",
    title: "Zurich → Interlaken",
    desc: "Alpine views and adventure vibes.",
    duration: "5N/6D",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "london-paris-brussels",
    from: "London",
    to: "Brussels",
    title: "London → Paris → Brussels",
    desc: "Three countries, endless experiences.",
    duration: "9N/10D",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80",
  },
];

// 3. Why Choose Novixa for Europe Rail (5 Features)
export const europeRailWhyChooseData = {
  tag: "WHY CHOOSE NOVIXA FOR EUROPE RAIL?",
  title: "Why Choose Novixa for Europe Rail?",
  description:
    "We make your European rail journey simple, stress-free and truly memorable. From choosing the right pass to planning your route, we handle it all — so you can just enjoy the ride.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332954/backgrounds/europeRailBg.png",
  features: [
    {
      id: "pass-guidance",
      title: "Rail Pass Guidance",
      desc: "(Interrail / Eurail)",
      icon: <Train className="w-5 h-5 text-[#deb06c]" />,
    },
    {
      id: "visa-assistance",
      title: "Visa Assistance",
      desc: "(Optional)",
      icon: <ShieldCheck className="w-5 h-5 text-[#deb06c]" />,
    },
    {
      id: "custom-itineraries",
      title: "Customized Itineraries",
      desc: "(As per your interests)",
      icon: <BookOpen className="w-5 h-5 text-[#deb06c]" />,
    },
    {
      id: "flexible-booking",
      title: "Flexible Booking",
      desc: "& Support",
      icon: <Camera className="w-5 h-5 text-[#deb06c]" />,
    },
    {
      id: "expert-consultants",
      title: "Expert Travel",
      desc: "Consultants",
      icon: <Award className="w-5 h-5 text-[#deb06c]" />,
    },
  ],
};

// 4. Featured Europe Rail Packages (4 Tier Cards)
export const featuredRailPackages = [
  {
    id: "paris-zurich-lucerne",
    title: "Paris → Zurich – Lucerne",
    duration: "7N/8D",
    countries: "3 Countries",
    price: "1,45,000",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "amsterdam-brussels-paris",
    title: "Amsterdam – Brussels – Paris",
    duration: "6N/7D",
    countries: "3 Countries",
    price: "1,32,000",
    image:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "rome-florence-venice-pkg",
    title: "Rome – Florence – Venice",
    duration: "8N/9D",
    countries: "3 Countries",
    price: "1,68,000",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "switzerland-rail-explorer",
    title: "Switzerland Rail Explorer",
    duration: "7N/8D",
    countries: "3 Countries",
    price: "1,75,000",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop&q=80",
  },
];

// 5. Frequently Asked Questions (Europe Rail)
export const europeRailFaqs = [
  {
    id: "item-1",
    question: "What is the difference between Eurail Pass and point-to-point tickets?",
    answer:
      "A Eurail Pass allows unlimited train travel across 33 participating European countries within your chosen duration, offering total flexibility. Point-to-point tickets are reserved for specific trains on fixed dates and times, which can be ideal for shorter single-journey itineraries.",
  },
  {
    id: "item-2",
    question: "Do I need seat reservations with my Europe Rail Pass?",
    answer:
      "While many regional trains do not require advance reservations, high-speed trains (like Eurostar, TGV, Frecciarossa) and overnight sleeper trains require mandatory seat reservations. Novixa pre-books your mandatory seats alongside your pass so you never get stuck.",
  },
  {
    id: "item-3",
    question: "Can Novixa assist with Schengen visa requirements for Europe rail travel?",
    answer:
      "Yes, absolutely. We provide complete Schengen visa documentation support, including confirmed hotel reservations, train itineraries, flight tickets, and cover letters tailored specifically to your multi-country train route.",
  },
  {
    id: "item-4",
    question: "Can I customize the route, duration, and hotel stopovers?",
    answer:
      "Yes! Every package can be 100% customized to your preferences. Whether you want an extra night in Interlaken, scenic panoramic train upgrades (like Glacier Express or Bernina Express), or boutique hotels near central train stations, we tailor it all.",
  },
  {
    id: "item-5",
    question: "What luggage allowances are there on European trains?",
    answer:
      "Unlike airlines, European trains do not have strict luggage weight limits or excess baggage fees. You can typically bring two large bags plus hand luggage per person, and luggage racks are readily available above seats and near carriage entrances.",
  },
];

// 6. Support & FAQ Center Data
export const europeRailSupportData = {
  title: "Need Help With Europe Rail?",
  subtitle: "Chat with our Europe train experts for customized pass guidance and booking.",
  centerBannerImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332954/backgrounds/europeRailBg.png",
  centerBannerScriptLine1: "One Pass ♡",
  centerBannerScriptLine2: "Countless Memories ✈",
  whatsAppNumber: "916397574309",
  whatsAppMessage: "Hello Novixa Travels, I need assistance with Europe rail booking.",
  whatsAppText: "Chat on WhatsApp",
  phoneNumber: "+919876543210",
  displayPhone: "+91 98765 43210",
  trustText: "Official Eurail Assistance | Fast response",
};

// 7. Bottom Conversion Banner Data
export const europeRailBottomCtaData = {
  tag: "YOUR EUROPEAN RAIL ADVENTURE AWAITS",
  titleHighlight: "Ready to Explore Europe?",
  subtitle:
    "Let's plan your perfect rail journey — with the right routes, passes and a travel experience you'll never forget.",
  buttonText: "Get a Free Quote →",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332948/backgrounds/europeRailCTA.png",
  whatsAppNumber: "916397574309",
  whatsAppMessage: "Hello Novixa Travels, I would like to get a quote for a Europe Rail trip.",
  trustText: "Personalized Itineraries | End-to-End Support",
};

// 8. Testimonials Data (8 Real Customer Reviews from DB)
export const europeRailTestimonials = [
  {
    _id: "68265d239175105d8a7af73a",
    name: "Madhura Kalekar",
    designation: "Traveller",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1747344674/yyolno5e25xcgays3wpq.jpg",
    review: "We recently booked our international trip through Novixa Travels India, and it was nothing short of amazing! Everything was perfectly planned — from the accommodations, flights, transfers and guided tours. We truly enjoyed every moment and felt completely taken care of throughout the journey. A big thank you to the Novixa team for making our vacation so smooth and memorable.",
  },
  {
    _id: "68265eb69175105d8a7af748",
    name: "Adarsh Sinha",
    designation: "Artist",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1747345078/tqc4xxdonnebki9fckpd.png",
    review: "I booked my rail journey with Novixa Travels India, and I must say, the entire experience was incredibly smooth and well-organized. From the moment I made the booking to the time I reached my destination, their team ensured everything was taken care of with great attention and professionalism.",
  },
  {
    _id: "68265fe49175105d8a7af759",
    name: "Nitin Sharma",
    designation: "Traveller",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1747345379/c1tgyffom81oc2o8yjz9.webp",
    review: "Our holiday with Novixa Travels India was an unforgettable experience! Right from the planning stage to the return journey, everything was handled with such professionalism and care. The hotel, transport, and local coordination were all top-notch. What really stood out was their constant support.",
  },
  {
    _id: "682661129175105d8a7af78c",
    name: "Mithilesh Kumar",
    designation: "Teacher",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1747345682/pvxiqezbupik35fmq8yu.webp",
    review: "The entire process was incredibly smooth and hassle-free. Their team guided me through each step with complete clarity and professionalism. What I appreciated most was their quick response and personalized assistance, making what is usually stressful feel easy and efficient.",
  },
  {
    _id: "682662029175105d8a7af793",
    name: "Rinku Agarwal",
    designation: "Traveller",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1787789549/aka4hvqp70qv10qis8vl.webp",
    review: "The booking process was quick, transparent, and completely stress-free. They gave me the best available options based on my preferences and helped me choose the most convenient and cost-effective journey. What really impressed me was their 24/7 support and prompt communication.",
  },
  {
    _id: "688b3c391ae54593ac485fa2",
    name: "Utkarsh Agrawal",
    designation: "Student",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1753955385/csvuuq9tnssyjfrxuvfr.webp",
    review: "Pura process bhot smooth aur stress-free tha. Team ne har step pe clear information di, documents ka kaam bilkul perfect kiya. Har step pe proper guidance mili. Highly recommend their service to everyone.",
  },
  {
    _id: "696ea013a33fe586533f5ca7",
    name: "Nitin",
    designation: "Traveller",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1768857618/zfozajboi3qpwlhunxx5.jpg",
    review: "We booked our recent trip from Novixa Travels India and their service is best. The price was also very budget friendly, they provide better services in our budget. Planning was very smooth from booking to activities. Everything was well planned.",
  },
  {
    _id: "6ad855b3ac7d082f5c48fba7",
    name: "Vipul Jangid",
    designation: "Traveller",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1792562611/c56vaukrhy1li4hziqmu.jpg",
    review: "Novixa Travels India provided us great service, the team was very professional and prompt in all coordination. Thank you for making our trip seamless!",
  },
];

