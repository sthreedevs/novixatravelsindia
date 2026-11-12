import React from "react";
import {
  MapPin,
  Users,
  ShieldCheck,
  Headphones,
  Compass,
  Car,
  Star,
  Heart,
  Clock,
  Calendar,
  CheckCircle2,
} from "lucide-react";

// 1. Hero Section Data
export const dayTripsHeroData = {
  tag: "EXPLORE | RELAX | REPEAT",
  title: "Day Trips",
  titleHighlight: "Perfect Getaways",
  titleHighlightFont: "handwriting",
  description:
    "Short trips. Big experiences. Discover amazing destinations near and far with our carefully curated day trips.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332946/backgrounds/dayTripHero.png",
  badges: [
    {
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
          <Compass className="w-4 h-4 stroke-[2.4]" />
        </div>
      ),
      text: "Hidden Gems & Local Favorites",
      line1: "Hidden Gems",
      line2: "& Local Favorites",
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
          <Users className="w-4 h-4 stroke-[2.4]" />
        </div>
      ),
      text: "Small Groups & Private Tours",
      line1: "Small Groups",
      line2: "& Private Tours",
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
          <ShieldCheck className="w-4 h-4 stroke-[2.4]" />
        </div>
      ),
      text: "Safe & Reliable",
      line1: "Safe &",
      line2: "Reliable",
    },
    {
      icon: (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 flex items-center justify-center shrink-0 shadow-sm">
          <Headphones className="w-4 h-4 stroke-[2.4]" />
        </div>
      ),
      text: "24/7 Support",
      line1: "24/7",
      line2: "Support",
    },
  ],
  scriptNotes: [
    "Small Trips",
    "Big Memories ♡",
  ],
};

// 2. Popular Day Trips Data (8 Exact Mockup Cards)
export const popularDayTripsList = [
  {
    id: "agra",
    location: "Agra",
    title: "Agra Day Trip",
    highlights: "Taj Mahal | Agra Fort | Mehtab Bagh",
    duration: "One Day",
    type: "Private / Group",
    pricePrefix: "Starting from",
    price: "₹2,499",
    priceSuffix: "per person",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png",
    buttonText: "View Details →",
    description:
      "Witness the eternal splendour of the Taj Mahal at dawn, explore the majestic red sandstone palaces of Agra Fort, and take in sunset views across the Yamuna from Mehtab Bagh.",
    inclusions: [
      "AC private vehicle for round-trip transfers",
      "Experienced government-approved monument guide",
      "Taj Mahal & Agra Fort priority entry assistance",
      "Complimentary packaged drinking water",
      "All toll taxes, parking fees & state permits",
    ],
    exclusions: [
      "Monument entrance tickets (unless pre-booked)",
      "Meals & personal refreshments",
      "Camera fees & personal tips",
    ],
  },
  {
    id: "jaipur",
    location: "Jaipur",
    title: "Jaipur Day Trip",
    highlights: "Amber Fort | City Palace | Hawa Mahal",
    duration: "One Day",
    type: "Private / Group",
    pricePrefix: "Starting from",
    price: "₹2,999",
    priceSuffix: "per person",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png",
    buttonText: "View Details →",
    description:
      "Discover the regal heritage of Rajasthan's Pink City. Ascend the grand Amber Fort, marvel at the City Palace museums, and capture the iconic honeycomb facade of Hawa Mahal.",
    inclusions: [
      "Private air-conditioned car with seasoned driver",
      "Certified local tour guide throughout Jaipur",
      "Visits to Amber Fort, Jal Mahal & Hawa Mahal",
      "Mineral water bottles provided in vehicle",
      "All parking, highway tolls & driver allowances",
    ],
    exclusions: [
      "Monument entrance fees",
      "Lunch & personal shopping",
      "Elephant or jeep rides at Amber Fort",
    ],
  },
  {
    id: "rishikesh",
    location: "Rishikesh",
    title: "Rishikesh Day Trip",
    highlights: "River Rafting | Laxman Jhula | Triveni Ghat",
    duration: "One Day",
    type: "Private / Group",
    pricePrefix: "Starting from",
    price: "₹3,499",
    priceSuffix: "per person",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png",
    buttonText: "View Details →",
    description:
      "Embrace Uttarakhand's adventure and spiritual capital. Tackle the thrilling rapids of the holy Ganges, walk across Laxman Jhula, and immerse in the serene evening Ganga Aarti at Triveni Ghat.",
    inclusions: [
      "12km/16km thrilling White Water Rafting session",
      "Certified rafting instructor & grade-A safety gear",
      "Guided walk across iconic suspension bridges",
      "Evening Ganga Aarti coordination at Triveni Ghat",
      "Private transfers from Dehradun/Haridwar/Rishikesh",
    ],
    exclusions: [
      "Personal cliff jumping / zipline photos & videos",
      "Meals not specified in itinerary",
      "Temple donations",
    ],
  },
  {
    id: "jim-corbett",
    location: "Jim Corbett",
    title: "Jim Corbett Day Trip",
    highlights: "Safari | Nature Walk | Wildlife",
    duration: "One Day",
    type: "Private / Group",
    pricePrefix: "Starting from",
    price: "₹3,999",
    priceSuffix: "per person",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png",
    buttonText: "View Details →",
    description:
      "Embark on an exhilarating open-jeep jungle safari through India's oldest national park, home to the Royal Bengal tiger, wild Asian elephants, and over 600 bird species.",
    inclusions: [
      "Open 4x4 Gypsy Safari permit & booking",
      "Authorized forest guide & skilled wildlife driver",
      "Forest department entry permits & environmental cess",
      "Pick up and drop off from Ramnagar / Corbett hotels",
      "Wildlife photography observation stops",
    ],
    exclusions: [
      "Travel expenses reaching Ramnagar / Corbett gateway",
      "Camera equipment surcharges",
      "Meals and personal tips",
    ],
  },
  {
    id: "mussoorie",
    location: "Mussoorie",
    title: "Mussoorie Day Trip",
    highlights: "Kempty Falls | Local Sightseeing",
    duration: "One Day",
    type: "Private / Group",
    pricePrefix: "Starting from",
    price: "₹2,499",
    priceSuffix: "per person",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png",
    buttonText: "View Details →",
    description:
      "Escape to the Queen of the Hills. Refresh under the cascading waters of Kempty Falls, take in panoramic Himalayan views, and enjoy a stroll along the historic Mall Road.",
    inclusions: [
      "Dedicated hill vehicle with experienced mountain driver",
      "Sightseeing covering Kempty Falls & Company Garden",
      "Mall Road drop & pickup coordination",
      "All hill road tolls, green cess & parking fees",
      "Packaged mineral water",
    ],
    exclusions: [
      "Cable car / ropeway tickets at Gun Hill",
      "Lunch, snacks & cafe dining",
      "Activity tickets at Kempty Falls",
    ],
  },
  {
    id: "neemrana",
    location: "Neemrana",
    title: "Neemrana Day Trip",
    highlights: "Heritage Fort | Zip Line | Local Explore",
    duration: "One Day",
    type: "Private / Group",
    pricePrefix: "Starting from",
    price: "₹2,999",
    priceSuffix: "per person",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png",
    buttonText: "View Details →",
    description:
      "Journey to the spectacular 15th-century Neemrana Fort Palace built on the Aravalli hills. Enjoy vintage royal architecture, scenic courtyard views, and thrilling aerial zip-lining.",
    inclusions: [
      "Round-trip AC highway transfer from Delhi/NCR/Gurgaon",
      "Neemrana Fort Palace entry coordination",
      "Leisure time for palace photography & sightseeing",
      "Highway toll taxes & parking charges included",
      "Professional chauffeur services",
    ],
    exclusions: [
      "Fort buffet lunch ticket (optional add-on)",
      "Flying Fox Zip-lining adventure ticket",
      "Personal expenses",
    ],
  },
  {
    id: "mathura",
    location: "Mathura",
    title: "Mathura Vrindavan Day Trip",
    highlights: "Prem Mandir | Banke Bihari | Yamuna Ghat",
    duration: "One Day",
    type: "Private / Group",
    pricePrefix: "Starting from",
    price: "₹2,199",
    priceSuffix: "per person",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png",
    buttonText: "View Details →",
    description:
      "A blessed day excursion to the sacred heartlands of Braj Bhoomi. Seek darshan at Banke Bihari Temple, marvel at the Italian marble architecture of Prem Mandir, and experience Yamuna Aarti.",
    inclusions: [
      "AC sedan/SUV for Delhi-Mathura-Vrindavan round-trip",
      "Assistance for temple darshan timing & entry",
      "Visits to Shri Krishna Janmabhoomi & Prem Mandir",
      "All expressway tolls, parking fees & state tax",
      "Bottled water for all passengers",
    ],
    exclusions: [
      "VIP temple darshan passes (unless requested)",
      "Prasad, pooja items & local rickshaw transfers",
      "Meals & personal shopping",
    ],
  },
  {
    id: "corbett-national-park",
    location: "Corbett",
    title: "Jim Corbett National Park Day Trip",
    highlights: "Jungle Safari | Dhikala Zone | Nature",
    duration: "One Day",
    type: "Private / Group",
    pricePrefix: "Starting from",
    price: "₹3,499",
    priceSuffix: "per person",
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png",
    buttonText: "View Details →",
    description:
      "A deeper wilderness exploration in Corbett's renowned buffer zones. Traverse pristine grasslands, riverside tracks, and dense sal canopies with our expert naturalists.",
    inclusions: [
      "Morning / Afternoon safari shift booking",
      "Registered 4x4 safari vehicle & government guide",
      "Forest entry gate permits & paperwork",
      "Nature walk & birdwatching stops",
      "Safety gear & sanitized vehicle",
    ],
    exclusions: [
      "Personal transport to safari gate",
      "Camera & video equipment fees",
      "Gratuities & personal expenses",
    ],
  },
];

// 3. Why Choose Novixa Section Data
export const dayTripsWhyChooseData = {
  tag: "WHY CHOOSE NOVIXA",
  title: "Your Day Trip, Our Priority",
  subtitle:
    "We make sure your short escapes are just as special as your big journeys.",
  pillars: [
    {
      id: "curated",
      title: "Curated",
      subtitle: "Itineraries",
      icon: <Star className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    },
    {
      id: "guides",
      title: "Experienced",
      subtitle: "Local Guides",
      icon: <ShieldCheck className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    },
    {
      id: "transport",
      title: "Comfortable",
      subtitle: "Transportation",
      icon: <Car className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    },
    {
      id: "booking",
      title: "Hassle-Free",
      subtitle: "Booking",
      icon: <Headphones className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    },
    {
      id: "memories",
      title: "Memorable",
      subtitle: "Experiences",
      icon: <Heart className="w-6 h-6 text-zinc-950 stroke-[2.2]" />,
    },
  ],
};

// 4. Testimonials Data (Exact matching reviews from mockup)
export const dayTripsReviewsData = {
  title: "What Our Travelers Say",
  subtitle: "Real experiences. Happy travellers.",
  viewAllLink: "/reviews",
  reviews: [
    {
      id: "review-1",
      name: "Rohan S.",
      location: "Delhi",
      avatar: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png",
      rating: 5,
      review:
        "Our Agra day trip was perfectly planned. The guide was knowledgeable and the experience was truly memorable!",
    },
    {
      id: "review-2",
      name: "Ananya M.",
      location: "Gurgaon",
      avatar: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png",
      rating: 5,
      review:
        "Everything was well organized. From pickup to drop, it was smooth and stress-free. Highly recommend Novixa for day trips!",
    },
    {
      id: "review-3",
      name: "Arjun P.",
      location: "Noida",
      avatar: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png",
      rating: 5,
      review:
        "The Rishikesh trip was an amazing experience. River rafting was so much fun. Great service and support from the team!",
    },
  ],
};

// 5. Bottom Call-To-Action Banner Data
export const dayTripsBottomCtaData = {
  title: "Ready for a Day Trip?",
  description:
    "Discover new places, create beautiful memories and explore the world — one day at a time.",
  buttonText: "Browse All Day Trips →",
  scriptLine1: "Make Your",
  scriptLine2: "Next Day Trip",
  scriptSuffix: "Special ♡",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332948/backgrounds/dayTrip.jpg",
};

// 6. Shared FAQ Data for Day Trips
export const dayTripsFaqData = [
  {
    id: "what-is-day-trip",
    question: "What is included in a Novixa Day Trip?",
    answer:
      "All Novixa Day Trips include a dedicated air-conditioned vehicle (Sedan, MUV, or Tempo Traveler), verified professional chauffeur, all highway tolls, parking fees, state taxes, and complimentary mineral water. Guided tour options and entrance tickets can be arranged upon request.",
  },
  {
    id: "pickup-drop",
    question: "Do you offer doorstep pickup and drop?",
    answer:
      "Yes, absolutely. We provide point-to-point doorstep pickup and drop-off from your home, hotel, railway station, or airport at your preferred departure timing.",
  },
  {
    id: "customization",
    question: "Can I customize the day trip itinerary and stops?",
    answer:
      "Yes! Our day trips are 100% private and customizable. You can adjust departure times, add sightseeing stops, choose preferred dining spots, and pace the tour according to your comfort.",
  },
  {
    id: "guide-service",
    question: "Can I request a certified local language guide?",
    answer:
      "Yes, certified Government of India approved guides fluent in English, Hindi, German, French, Spanish, and other foreign languages are available on request for monument visits.",
  },
  {
    id: "booking-cancellation",
    question: "What is the cancellation and rescheduling policy?",
    answer:
      "We offer flexible cancellation and free rescheduling up to 24 hours before your scheduled departure time with no penalties. Instant customer assistance is available on WhatsApp 24/7.",
  },
];

// 7. Shared Concierge Support & Center Visual Data for Day Trips
export const dayTripsSupportData = {
  tag: "HELP & SUPPORT",
  title: "Frequently Asked Questions",
  centerBannerImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332948/backgrounds/dayTrip.jpg",
  centerBannerImageFit: "object-cover",
  showCenterScript: true,
  centerBannerScriptLine1: "Small Trips ♡",
  centerBannerScriptLine2: "Big Memories ✈",
  supportTitle: "Need Custom Excursion?",
  supportSubtitle:
    "Speak directly with our excursion concierges to tailor private luxury day tours, group tempos, or specialized itineraries.",
  whatsAppNumber: "916397574309",
  whatsAppMessage:
    "Hello Novixa Travels, I would like to inquire about booking a custom day trip.",
  whatsAppText: "Chat on WhatsApp",
  phoneNumber: "+916397574309",
  displayPhone: "+91 63975 74309",
  showCallButton: true,
  trustText: "Doorstep Pickup | Instant WhatsApp Support",
};

// 8. Explore More Day Trips (Matching DayTripPage.jpeg mockup)
export const moreDayTripsList = [
  {
    id: "jaipur",
    slug: "jaipur-day-trip",
    title: "Jaipur Day Trip",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    duration: "Full Day",
    type: "Private / Group",
    pricePrefix: "Starting from",
    price: "₹2,499",
    priceSuffix: "per person",
  },
  {
    id: "mathura",
    slug: "mathura-vrindavan-day-trip",
    title: "Mathura Vrindavan Day Trip",
    image: "https://images.unsplash.com/photo-1545126178-862d26fb5fd4?auto=format&fit=crop&w=800&q=80",
    duration: "Full Day",
    type: "Private / Group",
    pricePrefix: "Starting from",
    price: "₹2,199",
    priceSuffix: "per person",
  },
  {
    id: "rishikesh",
    slug: "rishikesh-day-trip",
    title: "Rishikesh Day Trip",
    image: "https://images.unsplash.com/photo-1600100397608-f010f443b740?auto=format&fit=crop&w=800&q=80",
    duration: "Full Day",
    type: "Private / Group",
    pricePrefix: "Starting from",
    price: "₹3,499",
    priceSuffix: "per person",
  },
];

// 9. Detailed Day Trips (Full Page Specification matching DayTripPage.jpeg)
export const detailedDayTripsData = {
  "agra-day-trip": {
    id: "agra-day-trip",
    slug: "agra-day-trip",
    title: "Agra Day Trip",
    destination: "Agra",
    tagline: "Discover the timeless beauty of the Taj Mahal",
    category: "PRIVATE & GROUP DAY TOUR",
    description:
      "Explore the Taj Mahal, Agra Fort and local marble craftsmanship with a carefully planned one-day experience from Delhi or Agra.",
    heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=85",
    rating: "4.9/5",
    ratingCount: "Guest Experience",
    startingPrice: "₹2,499",
    priceNumber: 2499,
    priceSuffix: "per person",
    indicativeNote: "(indicative price)",
    quoteDisclaimer:
      "Final quote depends on pickup city, travel date, group size, transport and inclusions.",
    badges: [
      { id: "transport", text: "Private AC Transport", icon: "Car" },
      { id: "guide", text: "Local Expert Guide", icon: "User" },
      { id: "pickup", text: "Flexible Pickup", icon: "MapPin" },
      { id: "custom", text: "Customizable Experience", icon: "Settings" },
    ],
    specs: {
      destination: "Agra",
      duration: "Full Day (approx. 10–12 hours)",
      tourType: "Private / Small Group",
      pickup: "Delhi or Agra",
      language: "English / Russian on request",
    },
    experience: {
      title: "Your Agra Experience",
      leadParagraph:
        "A perfect blend of history, culture and craftsmanship — this day trip lets you explore one of the world's most iconic destinations with ease, comfort and expert guidance.",
    },
    itinerarySubtitle: "(Timings are indicative and can be customized)",
    itinerary: [
      {
        time: "06:00 – 09:00",
        title: "Pickup from Delhi or Agra & drive to Agra",
        description:
          "Comfortable AC vehicle with scenic drive (approx. 3–4 hours from Delhi).",
      },
      {
        time: "09:00 – 11:00",
        title: "Taj Mahal Guided Visit",
        description:
          "Explore the world-famous Taj Mahal with an expert local guide.",
      },
      {
        time: "11:00 – 12:30",
        title: "Lunch Break",
        description:
          "Enjoy a delicious lunch at a local restaurant (meal at own cost unless confirmed).",
      },
      {
        time: "12:30 – 14:00",
        title: "Agra Fort Visit",
        description:
          "Discover the rich history and stunning architecture of Agra Fort.",
      },
      {
        time: "14:00 – 15:00",
        title: "Optional Local Marble Handicraft Stop",
        description:
          "See skilled artisans at work and shop for authentic marble souvenirs.",
      },
      {
        time: "15:00 – 19:00",
        title: "Return Transfer",
        description: "Head back to Delhi or Agra with beautiful memories.",
      },
    ],
    highlightsChecklist: [
      "Taj Mahal",
      "Agra Fort",
      "Expert Local Guide",
      "Private Air-Conditioned Transport (option)",
      "Flexible Pace",
    ],
    gallery: [
      {
        title: "Taj Mahal",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Agra Fort",
        image: "https://images.unsplash.com/photo-1598324789736-4861f89564a0?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Marble Craftsmanship",
        image: "https://images.unsplash.com/photo-1592635196078-9fe3d54f2377?auto=format&fit=crop&w=800&q=80",
      },
    ],
    inclusions: [
      "Private / shared AC transport (as per option)",
      "Local expert guide",
      "Monument assistance & entry support (as per selection)",
      "Complimentary bottled water in vehicle",
      "All toll taxes, parking & fuel charges",
    ],
    exclusions: [
      "Meals (unless specified)",
      "Monument tickets (if not included)",
      "Personal expenses (shopping, tips, etc.)",
      "Camera fees inside monuments",
    ],
    knowBeforeYouGo: [
      "Carry a valid ID proof",
      "Wear comfortable shoes",
      "Follow monument rules & dress code",
      "Opening times may vary (especially Taj Mahal - closed on Fridays)",
    ],
    bottomBanner: {
      title: "Make Your Agra Day Trip Special",
      subtitle:
        "Let us customize your perfect experience — from private transfers to exclusive experiences, we've got you covered.",
    },
  },

  "jaipur-day-trip": {
    id: "jaipur-day-trip",
    slug: "jaipur-day-trip",
    title: "Jaipur Day Trip",
    destination: "Jaipur",
    tagline: "Discover the Pink City's Royal Heritage & Palaces",
    category: "PRIVATE & GROUP DAY TOUR",
    description:
      "Explore the majestic Amber Fort, City Palace museum, and the iconic facade of Hawa Mahal with seamless chauffeur-driven day transfers.",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85",
    rating: "4.9/5",
    ratingCount: "Guest Experience",
    startingPrice: "₹2,499",
    priceNumber: 2499,
    priceSuffix: "per person",
    indicativeNote: "(indicative price)",
    quoteDisclaimer:
      "Final quote depends on pickup city, travel date, group size, transport and inclusions.",
    badges: [
      { id: "transport", text: "Private AC Transport", icon: "Car" },
      { id: "guide", text: "Local Expert Guide", icon: "User" },
      { id: "pickup", text: "Flexible Pickup", icon: "MapPin" },
      { id: "custom", text: "Customizable Experience", icon: "Settings" },
    ],
    specs: {
      destination: "Jaipur",
      duration: "Full Day (approx. 12–14 hours)",
      tourType: "Private / Small Group",
      pickup: "Delhi, Gurgaon or Jaipur",
      language: "English / Hindi on request",
    },
    experience: {
      title: "Your Jaipur Experience",
      leadParagraph:
        "Step into the royal era of the Kachwaha Rajputs with an immersive day journey through Jaipur's hilltop fortresses, royal courtyards, and colorful bazaar artisan quarters.",
    },
    itinerarySubtitle: "(Timings are indicative and can be customized)",
    itinerary: [
      {
        time: "05:30 – 10:00",
        title: "Morning Drive to Jaipur via Expressway",
        description:
          "Enjoy a swift, comfortable expressway ride from Delhi NCR with a breakfast stop.",
      },
      {
        time: "10:30 – 12:30",
        title: "Amber Fort Guided Exploration",
        description:
          "Ascend the iconic fortress, Sheesh Mahal (Mirror Palace) and grand courtyards.",
      },
      {
        time: "12:30 – 13:30",
        title: "Jal Mahal Photo Stop & Traditional Rajasthani Lunch",
        description:
          "Capture the water palace and savor authentic Dal Baati Churma or multi-cuisine lunch.",
      },
      {
        time: "13:30 – 15:30",
        title: "City Palace & Jantar Mantar Observatory",
        description:
          "Walk through the royal museum corridors and UNESCO astronomical sundials.",
      },
      {
        time: "15:30 – 16:30",
        title: "Hawa Mahal & Johari Bazaar Walk",
        description:
          "Photograph the palace of winds and browse block prints, blue pottery & gems.",
      },
      {
        time: "16:30 – 21:00",
        title: "Return Drive to Delhi NCR",
        description: "Relax on your return transfer with doorstep drop-off.",
      },
    ],
    highlightsChecklist: [
      "Amber Fort & Sheesh Mahal",
      "City Palace & Museum",
      "Hawa Mahal Photostop",
      "Private AC Chauffeur Driven Vehicle",
      "Local Artisan Workshops",
    ],
    gallery: [
      {
        title: "Amber Fort",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Hawa Mahal",
        image: "https://images.unsplash.com/photo-1603258849040-3b8c6a0b12fd?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Jal Mahal",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
      },
    ],
    inclusions: [
      "Dedicated air-conditioned car with seasoned chauffeur",
      "Authorized Government-licensed local Jaipur guide",
      "Doorstep pickup & drop-off across Delhi NCR or Jaipur",
      "All expressway tolls, state entry permits & parking",
      "Complimentary packaged water bottles",
    ],
    exclusions: [
      "Monument entry fees & audio guide sets",
      "Meals, snacks & drinks",
      "Optional elephant or jeep ride up Amber Fort",
      "Personal shopping souvenirs",
    ],
    knowBeforeYouGo: [
      "Valid Government photo ID is required for monument entry",
      "Dress comfortably and wear walking shoes for stone fort paths",
      "Amber Fort elephant rides run only until noon",
    ],
    bottomBanner: {
      title: "Make Your Jaipur Day Trip Special",
      subtitle:
        "Let us customize your perfect royal getaway — from private luxury sedans to specialized heritage guides.",
    },
  },

  "delhi-sightseeing-tour": {
    id: "delhi-sightseeing-tour",
    slug: "delhi-sightseeing-tour",
    title: "Delhi Sightseeing Tour",
    destination: "Delhi",
    tagline: "Discover the Soul of India's Historic Capital",
    category: "PRIVATE & GROUP DAY TOUR",
    description:
      "Experience the captivating contrast between Old and New Delhi — from Mughal Red Fort and Chandni Chowk to India Gate and Qutub Minar.",
    heroImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=85",
    rating: "4.9/5",
    ratingCount: "Guest Experience",
    startingPrice: "₹2,500",
    priceNumber: 2500,
    priceSuffix: "per person",
    indicativeNote: "(indicative price)",
    quoteDisclaimer:
      "Final quote depends on pickup location, travel date, group size, vehicle and inclusions.",
    badges: [
      { id: "transport", text: "Private AC Transport", icon: "Car" },
      { id: "guide", text: "Local Expert Guide", icon: "User" },
      { id: "pickup", text: "Flexible Pickup", icon: "MapPin" },
      { id: "custom", text: "Customizable Experience", icon: "Settings" },
    ],
    specs: {
      destination: "Delhi",
      duration: "Full Day (approx. 8–10 hours)",
      tourType: "Private / Small Group",
      pickup: "Any Hotel / Airport in Delhi NCR",
      language: "English / Hindi / Foreign on request",
    },
    experience: {
      title: "Your Delhi Experience",
      leadParagraph:
        "From ancient stepwells and spiritual sanctums to wide British-colonial boulevards and towering UNESCO minarets, experience Delhi's rich tapestry in comfort.",
    },
    itinerarySubtitle: "(Timings are indicative and can be customized)",
    itinerary: [
      {
        time: "09:00 – 10:30",
        title: "Old Delhi, Jama Masjid & Chandni Chowk",
        description:
          "Visit India's largest historic mosque and take an exhilarating rickshaw glide through ancient spice markets.",
      },
      {
        time: "10:30 – 11:30",
        title: "Red Fort & Raj Ghat Photostop",
        description:
          "Witness the sandstone citadel of Mughal emperors and the tranquil memorial of Mahatma Gandhi.",
      },
      {
        time: "11:30 – 13:00",
        title: "Agrasen Ki Baoli & Bangla Sahib Gurudwara",
        description:
          "Explore a dramatic 14th-century stepwell and experience the peaceful Sikh temple and community kitchen.",
      },
      {
        time: "13:00 – 14:00",
        title: "Lunch Break at Pandara Road / Connaught Place",
        description:
          "Savor famous North Indian delicacies or international cuisine at leisure.",
      },
      {
        time: "14:00 – 15:30",
        title: "India Gate & Rashtrapati Bhavan Drive-Past",
        description:
          "Cruise through the grand ceremonial boulevard of Kartavya Path and the President's Estate.",
      },
      {
        time: "15:30 – 17:30",
        title: "Humayun's Tomb & Qutub Minar Complex",
        description:
          "Marvel at the precursor to the Taj Mahal and the world's tallest brick minaret.",
      },
      {
        time: "17:30 – 18:30",
        title: "Lotus Temple (Bahá'í House of Worship) & Return Drop",
        description:
          "Admire the flower-shaped marble temple before a relaxing transfer back to your hotel.",
      },
    ],
    highlightsChecklist: [
      "Qutub Minar & Humayun's Tomb",
      "India Gate & Rashtrapati Bhavan",
      "Old Delhi & Chandni Chowk",
      "Bangla Sahib & Agrasen Ki Baoli",
      "Chauffeur Driven AC Sedan/MUV",
    ],
    gallery: [
      {
        title: "Qutub Minar",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "India Gate",
        image: "https://images.unsplash.com/photo-1592635196078-9fe3d54f2377?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Humayun's Tomb",
        image: "https://images.unsplash.com/photo-1598324789736-4861f89564a0?auto=format&fit=crop&w=800&q=80",
      },
    ],
    inclusions: [
      "Dedicated AC vehicle with professional chauffeur",
      "Hotel or Airport pickup & drop-off within Delhi NCR",
      "Toll charges, parking fees & fuel allowance",
      "Complimentary water bottles & on-board amenities",
    ],
    exclusions: [
      "Monument tickets (can be added on request)",
      "Meals and refreshments",
      "Optional cycle-rickshaw charges in Chandni Chowk",
      "Tips for chauffeur and guide",
    ],
    knowBeforeYouGo: [
      "Red Fort is closed on Mondays; Lotus Temple is closed on Mondays",
      "Modest attire covering shoulders and knees is recommended for places of worship",
    ],
    bottomBanner: {
      title: "Make Your Delhi Day Trip Special",
      subtitle:
        "Let us customize your perfect Delhi city tour — from private photography tours to tailored heritage walks.",
    },
  },
};

// Helper: Normalize any day trip (from DB or slug) into the full page data structure
export function getEnrichedDayTrip(rawTrip, fallbackSlug = "agra-day-trip") {
  const target = rawTrip || fallbackSlug;
  if (!target) return detailedDayTripsData["agra-day-trip"];

  // 1. If it's a string slug matching our detailed dataset
  if (typeof target === "string") {
    const slug = target.toLowerCase();
    if (detailedDayTripsData[slug]) return detailedDayTripsData[slug];
    if (slug.includes("jaipur") || slug.includes("pink")) return detailedDayTripsData["jaipur-day-trip"];
    if (slug.includes("delhi")) return detailedDayTripsData["delhi-sightseeing-tour"];
    if (slug.includes("agra") || slug.includes("taj")) return detailedDayTripsData["agra-day-trip"];
    return detailedDayTripsData["agra-day-trip"];
  }

  // 2. If it's a MongoDB DayTrip document
  const title = (target.title || "").trim();
  const dest = (target.destination || "").trim().toLowerCase();
  const titleLower = title.toLowerCase();

  let baseTemplate = detailedDayTripsData["agra-day-trip"];

  if (dest.includes("jaipur") || titleLower.includes("jaipur") || titleLower.includes("pink")) {
    baseTemplate = detailedDayTripsData["jaipur-day-trip"];
  } else if (dest.includes("delhi") || titleLower.includes("delhi")) {
    baseTemplate = detailedDayTripsData["delhi-sightseeing-tour"];
  } else if (dest.includes("agra") || titleLower.includes("agra") || titleLower.includes("taj")) {
    baseTemplate = detailedDayTripsData["agra-day-trip"];
  }

  // Format price
  let formattedPrice = baseTemplate.startingPrice;
  if (target.domesticPrice) {
    const raw = String(target.domesticPrice).trim();
    if (raw.startsWith("₹")) {
      formattedPrice = raw;
    } else {
      const num = Number(raw.replace(/[^0-9.]/g, ""));
      formattedPrice = !isNaN(num) && num > 0 ? `₹${num.toLocaleString("en-IN")}` : `₹${raw}`;
    }
  }

  // Dynamic Highlights: Database highlights / descriptionList take precedence, fallback to static checklist
  let highlights = baseTemplate.highlightsChecklist;
  if (Array.isArray(target.highlights) && target.highlights.length > 0) {
    highlights = target.highlights;
  } else if (Array.isArray(target.descriptionList) && target.descriptionList.length > 0) {
    highlights = target.descriptionList;
  }

  // Dynamic Itinerary: Database itinerary takes precedence! Fallback to static baseTemplate itinerary if missing
  let itinerary = baseTemplate.itinerary;
  if (Array.isArray(target.itinerary) && target.itinerary.length > 0) {
    itinerary = target.itinerary;
  }

  // Dynamic Specs: Database fields take precedence, fallback to static template
  const destinationName = target.destination?.trim() || baseTemplate.destination || "Day Trip";
  const specs = {
    destination: target.destination?.trim() || target.specs?.destination || baseTemplate.specs?.destination || destinationName,
    duration: target.duration?.trim() || target.specs?.duration || baseTemplate.specs?.duration || "Full Day (approx. 10–12 hours)",
    tourType: target.tourType?.trim() || target.specs?.tourType || baseTemplate.specs?.tourType || "Private / Small Group",
    pickup: target.pickup?.trim() || target.specs?.pickup || baseTemplate.specs?.pickup || "Delhi or Agra",
    language: target.language?.trim() || target.specs?.language || baseTemplate.specs?.language || "English / Russian on request",
  };

  // Dynamic Experience: Database fields take precedence, fallback to static template
  const experience = {
    title: target.experienceTitle?.trim() || target.experience?.title || `Your ${destinationName} Experience`,
    leadParagraph: target.experienceLead?.trim() || target.experience?.leadParagraph || target.description?.trim() || baseTemplate.experience?.leadParagraph,
  };

  // Dynamic Gallery: Database gallery takes precedence, fallback to static template
  let gallery = baseTemplate.gallery;
  if (
    Array.isArray(target.gallery) &&
    target.gallery.length > 0 &&
    target.gallery.some((item) => item && (item.image || item.url))
  ) {
    gallery = target.gallery.map((item, idx) => ({
      title: item.title?.trim() || `Highlight #${idx + 1}`,
      image: item.image || item.url || baseTemplate.gallery?.[idx]?.image || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png",
    }));
  }

  // Dynamic Images: Database thumbnail / heroImage take precedence, fallback to static template
  const heroImage =
    target.heroImage?.trim() ||
    target.thumbnail?.trim() ||
    baseTemplate.heroImage;
  const thumbnail =
    target.thumbnail?.trim() ||
    target.heroImage?.trim() ||
    baseTemplate.thumbnail;

  return {
    ...baseTemplate,
    id: target._id?.toString() || target.id || baseTemplate.id,
    _id: target._id?.toString() || target.id,
    slug: target.slug || target._id?.toString() || baseTemplate.slug,
    title: target.title?.trim() || baseTemplate.title,
    destination: destinationName,
    tagline: target.tagline?.trim() || baseTemplate.tagline || `Discover the iconic heritage of ${destinationName}`,
    description: target.description?.trim() || baseTemplate.description,
    heroImage,
    thumbnail,
    rating: target.rating?.trim() || baseTemplate.rating || "4.9/5",
    ratingCount: target.ratingCount?.trim() || baseTemplate.ratingCount || "Guest Experience",
    startingPrice: formattedPrice,
    specs,
    experience,
    itinerarySubtitle:
      target.itinerarySubtitle?.trim() ||
      baseTemplate.itinerarySubtitle ||
      "(Timings are indicative and can be customized)",
    inclusions:
      Array.isArray(target.inclusionList) && target.inclusionList.length > 0
        ? target.inclusionList
        : baseTemplate.inclusions,
    exclusions:
      Array.isArray(target.exclusionList) && target.exclusionList.length > 0
        ? target.exclusionList
        : baseTemplate.exclusions,
    knowBeforeYouGo:
      Array.isArray(target.info) && target.info.length > 0
        ? target.info
        : baseTemplate.knowBeforeYouGo,
    highlightsChecklist: highlights,
    gallery,
    itinerary,
  };
}


