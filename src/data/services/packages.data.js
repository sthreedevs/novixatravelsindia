export const packagesHeroData = {
  tag: "EXPLORE OUR",
  title: "Travel Packages",
  subtitle: "Find your perfect escape, crafted around your style and budget.",
  description:
    "From tropical beaches to iconic cities, from cultural journeys to adventure-filled getaways — explore our handpicked packages and start your next adventure with Novixa.",
  bgImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332956/backgrounds/packageHero.png",
};

export const filterOptions = {
  destinations: [
    "All Destinations",
    "Dubai",
    "Maldives",
    "Thailand",
    "Bali",
    "Switzerland",
    "Kashmir",
    "Rajasthan",
    "Vietnam",
    "Singapore",
    "Europe",
    "Kerala",
    "Goa",
    "Andaman",
  ],
  travelTypes: [
    "All Types",
    "Honeymoon",
    "Family",
    "Adventure",
    "Luxury",
    "Cultural",
    "International",
    "Domestic",
  ],
  budgets: [
    { label: "Select Budget", min: 0, max: Infinity },
    { label: "Under ₹25,000", min: 0, max: 25000 },
    { label: "₹25,000 - ₹50,000", min: 25000, max: 50000 },
    { label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
    { label: "Above ₹1,00,000", min: 100000, max: Infinity },
  ],
  durations: [
    { label: "Select Duration", minDays: 0, maxDays: Infinity },
    { label: "3 - 4 Days", minDays: 3, maxDays: 4 },
    { label: "5 - 6 Days", minDays: 5, maxDays: 6 },
    { label: "7 - 9 Days", minDays: 7, maxDays: 9 },
    { label: "10+ Days", minDays: 10, maxDays: Infinity },
  ],
  categories: [
    "All Packages",
    "Honeymoon",
    "Family",
    "Adventure",
    "Luxury",
    "International",
    "Domestic",
  ],
};

export const initialCuratedPackages = [
  {
    _id: "pkg-dubai-01",
    slug: "dubai-holiday",
    title: "Dubai Holiday",
    badge: "Luxury",
    duration: "4 Nights / 5 Days",
    days: 5,
    nights: 4,
    type: "International",
    destination: "Dubai",
    country: "United Arab Emirates",
    price: "34,999",
    rawPrice: 34999,
    categories: ["Luxury", "International", "Family"],
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-dubai.png",
    description: "Explore the futuristic skyline, luxury shopping, desert safari, and the iconic Burj Khalifa.",
    highlights: ["Burj Khalifa Level 124", "Desert Safari with BBQ", "Marina Dhow Cruise", "Luxury AC Transfers"],
  },
  {
    _id: "pkg-maldives-02",
    slug: "maldives-honeymoon",
    title: "Maldives Honeymoon",
    badge: "Honeymoon",
    duration: "5 Nights / 6 Days",
    days: 6,
    nights: 5,
    type: "International",
    destination: "Maldives",
    country: "Maldives",
    price: "1,25,000",
    rawPrice: 125000,
    categories: ["Honeymoon", "Luxury", "International"],
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332952/backgrounds/hotelsHero.png",
    description: "Indulge in private overwater villas, azure lagoons, seaplane transfers, and sunset cruises.",
    highlights: ["Overwater Villa Stay", "All-Inclusive Dining", "Seaplane Transfers", "Snorkeling Excursions"],
  },
  {
    _id: "pkg-thailand-03",
    slug: "thailand-escape",
    title: "Thailand Escape",
    badge: "Adventure",
    duration: "5 Nights / 6 Days",
    days: 6,
    nights: 5,
    type: "International",
    destination: "Thailand",
    country: "Thailand",
    price: "37,999",
    rawPrice: 37999,
    categories: ["Adventure", "International", "Honeymoon"],
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-thailand.png",
    description: "A thrilling tropical getaway across Phuket, Phi Phi Islands, and vibrant Bangkok street markets.",
    highlights: ["Phi Phi Speedboat Tour", "James Bond Island", "Bangkok Temple Tour", "Night Market Food Walk"],
  },
  {
    _id: "pkg-bali-04",
    slug: "bali-retreat",
    title: "Bali Retreat",
    badge: "Luxury",
    duration: "5 Nights / 6 Days",
    days: 6,
    nights: 5,
    type: "International",
    destination: "Bali",
    country: "Indonesia",
    price: "42,500",
    rawPrice: 42500,
    categories: ["Luxury", "Honeymoon", "International"],
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332944/backgrounds/ctaHotel.png",
    description: "Experience the serenity of Ubud rainforests, Nusa Penida coastal cliffs, and beachfront luxury villas.",
    highlights: ["Private Pool Villa", "Nusa Penida Day Tour", "Ubud Sacred Monkey Forest", "Uluwatu Sunset Dance"],
  },
  {
    _id: "pkg-switzerland-05",
    slug: "switzerland-explorer",
    title: "Switzerland Explorer",
    badge: "Luxury",
    duration: "6 Nights / 7 Days",
    days: 7,
    nights: 6,
    type: "International",
    destination: "Switzerland",
    country: "Switzerland",
    price: "89,999",
    rawPrice: 89999,
    categories: ["Luxury", "Family", "International"],
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332951/backgrounds/europeRailHero.png",
    description: "Journey through the snow-capped Swiss Alps, scenic Glacier Express trains, and crystal lakes.",
    highlights: ["Swiss Rail Pass Included", "Jungfraujoch Top of Europe", "Mount Titlis Cable Car", "Lake Lucerne Cruise"],
  },
  {
    _id: "pkg-kashmir-06",
    slug: "kashmir-getaway",
    title: "Kashmir Getaway",
    badge: "Family",
    duration: "4 Nights / 5 Days",
    days: 5,
    nights: 4,
    type: "Domestic",
    destination: "Kashmir",
    country: "India",
    price: "18,999",
    rawPrice: 18999,
    categories: ["Family", "Honeymoon", "Domestic"],
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332948/backgrounds/dayTrip.jpg",
    description: "Discover paradise on earth with luxury houseboat stays, Gulmarg snow meadows, and Pahalgam valleys.",
    highlights: ["Dal Lake Shikara Ride", "Gulmarg Gondola Ride", "Pahalgam Betaab Valley", "Deluxe Houseboat Stay"],
  },
  {
    _id: "pkg-rajasthan-07",
    slug: "rajasthan-heritage",
    title: "Rajasthan Heritage",
    badge: "Cultural",
    duration: "5 Nights / 6 Days",
    days: 6,
    nights: 5,
    type: "Domestic",
    destination: "Rajasthan",
    country: "India",
    price: "24,999",
    rawPrice: 24999,
    categories: ["Cultural", "Family", "Domestic"],
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332946/backgrounds/dayTripHero.png",
    description: "Immerse yourself in royal palaces, majestic forts, camel safaris, and colorful bazaars of Jaipur & Udaipur.",
    highlights: ["Jaipur Amer Fort Elephant Ride", "Udaipur Lake Pichola Boat Ride", "Jodhpur Mehrangarh Fort", "Heritage Haveli Stay"],
  },
  {
    _id: "pkg-vietnam-08",
    slug: "vietnam-discovery",
    title: "Vietnam Discovery",
    badge: "Adventure",
    duration: "6 Nights / 7 Days",
    days: 7,
    nights: 6,
    type: "International",
    destination: "Vietnam",
    country: "Vietnam",
    price: "39,999",
    rawPrice: 39999,
    categories: ["Adventure", "Cultural", "International"],
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332968/destinations/cruise-thailand.png",
    description: "Cruise through legendary Ha Long Bay emerald waters, historical Hanoi lanes, and the Golden Hand Bridge.",
    highlights: ["Overnight Ha Long Cruise", "Bana Hills Golden Bridge", "Hanoi Old Quarter Rickshaw", "Mekong Delta Discovery"],
  },

  // Additional packages loaded when clicking "Load More Packages"
  {
    _id: "pkg-singapore-09",
    slug: "singapore-family-fun",
    title: "Singapore Spectacular",
    badge: "Family",
    duration: "4 Nights / 5 Days",
    days: 5,
    nights: 4,
    type: "International",
    destination: "Singapore",
    country: "Singapore",
    price: "46,999",
    rawPrice: 46999,
    categories: ["Family", "Luxury", "International"],
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-singapore.png",
    description: "Futuristic city adventures including Marina Bay Sands, Universal Studios, and Gardens by the Bay.",
    highlights: ["Universal Studios Pass", "Gardens by the Bay Cloud Forest", "Night Safari Adventure", "Sentosa Cable Car"],
  },
  {
    _id: "pkg-kerala-10",
    slug: "kerala-backwater-bliss",
    title: "Kerala Backwater Bliss",
    badge: "Honeymoon",
    duration: "5 Nights / 6 Days",
    days: 6,
    nights: 5,
    type: "Domestic",
    destination: "Kerala",
    country: "India",
    price: "22,500",
    rawPrice: 22500,
    categories: ["Honeymoon", "Family", "Domestic"],
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332944/backgrounds/ctaHotel.png",
    description: "Cruise serene palm-fringed backwaters, tea plantations of Munnar, and pristine beaches of Kovalam.",
    highlights: ["Alleppey Houseboat Cruise", "Munnar Tea Gardens", "Thekkady Spice Plantation", "Kathakali Performance"],
  },
  {
    _id: "pkg-europe-11",
    slug: "grand-european-tour",
    title: "Grand European Highlights",
    badge: "Luxury",
    duration: "9 Nights / 10 Days",
    days: 10,
    nights: 9,
    type: "International",
    destination: "Europe",
    country: "Europe",
    price: "1,55,000",
    rawPrice: 155000,
    categories: ["Luxury", "Cultural", "International"],
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-europe.png",
    description: "The classic European journey covering Paris, Lucerne, Venice, Florence, and Rome in premier luxury.",
    highlights: ["Eiffel Tower Top Floor", "Venice Gondola Ride", "Colosseum Guided Entry", "Scenic Swiss Alps Train"],
  },
  {
    _id: "pkg-andaman-12",
    slug: "andaman-tropical-getaway",
    title: "Andaman Island Paradise",
    badge: "Adventure",
    duration: "5 Nights / 6 Days",
    days: 6,
    nights: 5,
    type: "Domestic",
    destination: "Andaman",
    country: "India",
    price: "31,999",
    rawPrice: 31999,
    categories: ["Adventure", "Honeymoon", "Domestic"],
    image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332952/backgrounds/hotelsHero.png",
    description: "Turquoise lagoons, white sand Radhanagar Beach, scuba diving reefs, and historical Cellular Jail.",
    highlights: ["Radhanagar Beach Sunset", "Scuba Diving / Snorkeling", "Havelock Island Cruise", "Light & Sound Show"],
  },
];


export const detailedPackageTemplates = {
  "maldives-honeymoon": {
    tag: "HONEYMOON PACKAGE",
    title: "Maldives",
    titleHighlight: "Romance in Paradise",
    subtitle:
      "Crystal clear waters, private villas, breathtaking sunsets and unforgettable moments — your dream honeymoon starts here.",
    heroImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332952/backgrounds/hotelsHero.png",
    heroBadges: [
      { text: "Flights Included", icon: "plane" },
      { text: "Luxury Resorts (4★ / 5★ Options)", icon: "resort" },
      { text: "Travel Insurance Optional", icon: "shield" },
      { text: "Customizable Itinerary", icon: "heart" },
    ],
    specs: {
      destination: "Maldives",
      duration: "5 Nights / 6 Days",
      bestFor: "Couples",
      packageType: "Honeymoon",
    },
    whyChoose: {
      title: "Why Choose This Package?",
      description:
        "The Maldives is not just a destination, it's an emotion. This honeymoon package is designed for couples who want privacy, luxury and unforgettable experiences.",
      features: [
        { icon: "villa", title: "Stay in Overwater Villas" },
        { icon: "dinner", title: "Private Beach Dinners" },
        { icon: "snorkel", title: "Snorkeling & Water Sports" },
        { icon: "cruise", title: "Sunset Cruise" },
        { icon: "itinerary", title: "Personalized Itinerary" },
      ],
      gallery: {
        main: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332952/backgrounds/hotelsHero.png",
        top: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332956/backgrounds/hotelBgImage.png",
        bottom: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332968/destinations/cruise-thailand.png",
      },
    },
    itinerary: [
      { day: "01", title: "Day 1 – Arrival in Maldives", desc: "Airport pickup & transfer to resort. Relax and unwind." },
      { day: "02", title: "Day 2 – Island Exploration", desc: "Enjoy water sports, snorkeling and beach time." },
      { day: "03", title: "Day 3 – Private Sandbank Experience", desc: "A romantic day at a secluded sandbank." },
      { day: "04", title: "Day 4 – Sunset Cruise", desc: "Witness the magical Maldivian sunset." },
      { day: "05", title: "Day 5 – Leisure Day", desc: "Spa, fine dining or optional excursions." },
      { day: "06", title: "Day 6 – Departure", desc: "Transfer to airport with beautiful memories." },
    ],
    inclusions: [
      "Round Trip Flights (DEL – Maldives)",
      "5 Nights Stay in 4★ / 5★ Resort",
      "Daily Breakfast & Dinner",
      "Airport Transfers",
      "Guided Excursions & Water Activities",
      "Travel Insurance (Optional)",
    ],
    price: "1,25,000*",
    priceUnit: "per couple (approx.)",
    bottomBanner: {
      title: "Need a Customized Honeymoon Plan?",
      subtitle: "Tell us your dream destination, budget and travel dates.",
      note: "Our travel experts will create a personalized itinerary just for you.",
    },
    moreDestinations: [
      { name: "Bali", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332944/backgrounds/ctaHotel.png", slug: "bali-retreat" },
      { name: "Thailand", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-thailand.png", slug: "thailand-escape" },
      { name: "Switzerland", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332951/backgrounds/europeRailHero.png", slug: "switzerland-explorer" },
      { name: "Dubai", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-dubai.png", slug: "dubai-holiday" },
    ],
  },
  "dubai-holiday": {
    tag: "LUXURY CITY GETAWAY",
    title: "Dubai",
    titleHighlight: "Futuristic Wonder",
    subtitle:
      "Towering skyscrapers, desert dunes, premier shopping, and bespoke Arabian nights.",
    heroImage: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-dubai.png",
    heroBadges: [
      { text: "Flights Included", icon: "plane" },
      { text: "Luxury 5★ Hotels", icon: "resort" },
      { text: "Desert Safari Included", icon: "shield" },
      { text: "Flexible Itinerary", icon: "heart" },
    ],
    specs: {
      destination: "Dubai",
      duration: "4 Nights / 5 Days",
      bestFor: "Families & Couples",
      packageType: "Luxury",
    },
    whyChoose: {
      title: "Why Choose This Package?",
      description:
        "Dubai combines futuristic engineering with luxury hospitality. From the Burj Khalifa to camel safaris across golden sand dunes.",
      features: [
        { icon: "villa", title: "Burj Khalifa Top Floor" },
        { icon: "dinner", title: "Marina Dhow Dinner Cruise" },
        { icon: "snorkel", title: "4x4 Desert Dune Bashing" },
        { icon: "cruise", title: "Aquaventure Waterpark" },
        { icon: "itinerary", title: "Private Chauffeur Transfers" },
      ],
      gallery: {
        main: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-dubai.png",
        top: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332956/backgrounds/hotelBgImage.png",
        bottom: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332944/backgrounds/ctaHotel.png",
      },
    },
    itinerary: [
      { day: "01", title: "Day 1 – Arrival & Marina Dhow Cruise", desc: "Private airport transfer followed by a luxury evening dinner cruise across Dubai Marina." },
      { day: "02", title: "Day 2 – Modern Dubai & Burj Khalifa", desc: "Dubai Frame, Museum of the Future, and Burj Khalifa 124th-floor panoramic sunset." },
      { day: "03", title: "Day 3 – Desert Safari with BBQ Dinner", desc: "Thrill-filled 4x4 dune bashing, camel rides, belly dance show, and Arabian BBQ buffet." },
      { day: "04", title: "Day 4 – Palm Jumeirah & Shopping", desc: "Explore Atlantis The Palm, Souk Madinat Jumeirah, and shopping at Dubai Mall." },
      { day: "05", title: "Day 5 – Departure", desc: "Private airport drop with memories of glamorous Dubai." },
    ],
    inclusions: [
      "Round Trip Flights (DEL – Dubai)",
      "4 Nights in 5★ Central Hotel",
      "Daily Buffet Breakfast",
      "Private Airport & Sightseeing Transfers",
      "Desert Safari with BBQ & Entertainment",
      "Burj Khalifa & Marina Cruise Tickets",
    ],
    price: "34,999*",
    priceUnit: "per person (approx.)",
    bottomBanner: {
      title: "Need a Customized Dubai Plan?",
      subtitle: "Tell us your travel dates, party size and preferences.",
      note: "Our luxury travel specialists will craft your perfect Dubai getaway.",
    },
    moreDestinations: [
      { name: "Maldives", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332952/backgrounds/hotelsHero.png", slug: "maldives-honeymoon" },
      { name: "Bali", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332944/backgrounds/ctaHotel.png", slug: "bali-retreat" },
      { name: "Thailand", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-thailand.png", slug: "thailand-escape" },
      { name: "Switzerland", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332951/backgrounds/europeRailHero.png", slug: "switzerland-explorer" },
    ],
  },
};

export function getEnrichedPackage(rawPackage, requestedSlug, otherDbPackages = []) {
  const normalizedSlug = requestedSlug?.toLowerCase() || "";

  // 1. If rawPackage exists from MongoDB, ALWAYS prioritize live dynamic DB data!
  if (rawPackage) {
    // Strip company name and common boilerplate suffixes cleanly
    const cleanRaw = (rawPackage.title || "")
      .replace(/–\s*Novixa Travels India/i, "")
      .replace(/-\s*Novixa Travels India/i, "")
      .replace(/\|\s*Novixa Travels India/i, "")
      .replace(/with Novixa Travels India/i, "")
      .replace(/by Novixa Travels India/i, "")
      .replace(/Novixa Travels India/i, "")
      .trim();

    let primaryTitle = cleanRaw;
    let highlightTitle = "";

    if (cleanRaw.includes("|")) {
      const parts = cleanRaw.split("|");
      primaryTitle = parts[0].trim();
      const sub = parts[1].trim();
      if (sub && sub.length <= 40) {
        highlightTitle = sub;
      }
    } else if (cleanRaw.includes("–") || cleanRaw.includes(" - ")) {
      const parts = cleanRaw.split(/–|\s-\s/);
      primaryTitle = parts[0].trim();
      const sub = parts.slice(1).join(" ").trim();
      if (sub && sub.length <= 40) {
        highlightTitle = sub;
      }
    }

    // Determine travel types (clean out any legacy star rating strings)
    const travelTypes = [
      ...(Array.isArray(rawPackage.travelType) && rawPackage.travelType.length > 0
        ? rawPackage.travelType
        : Array.isArray(rawPackage.category)
        ? rawPackage.category.filter((c) => !c.toLowerCase().includes("star"))
        : []),
    ];

    // Determine category tag
    let categoryTag = "HOLIDAY PACKAGE";
    if (travelTypes.length > 0) {
      const first = travelTypes[0];
      categoryTag = first.toUpperCase().includes("PACKAGE")
        ? first.toUpperCase()
        : `${first.toUpperCase()} PACKAGE`;
    } else if (rawPackage.destinations || rawPackage.city || rawPackage.country) {
      const place = (rawPackage.destinations || rawPackage.city || rawPackage.country).trim();
      categoryTag = `${place.toUpperCase()} PACKAGE`;
    }
    categoryTag = categoryTag.replace(/\s+/g, " ").trim();

    // Determine domestic vs international
    const isDomestic =
      rawPackage.country?.toLowerCase().includes("india") ||
      ["goa", "kashmir", "andaman", "kerala", "rajasthan", "himachal", "delhi", "mumbai"].some(
        (loc) =>
          rawPackage.destinations?.toLowerCase().includes(loc) ||
          rawPackage.city?.toLowerCase().includes(loc) ||
          rawPackage.country?.toLowerCase().includes(loc)
      );

    const packageTypeStr =
      travelTypes.length > 0
        ? travelTypes.join(", ")
        : isDomestic
        ? "Domestic Tour"
        : "International Tour";

    let bestFor = "Couples & Families";
    if (travelTypes.some((t) => t.toLowerCase().includes("honeymoon"))) {
      bestFor = "Couples";
    } else if (travelTypes.some((t) => t.toLowerCase().includes("adventure"))) {
      bestFor = "Adventure Seekers";
    } else if (travelTypes.some((t) => t.toLowerCase().includes("family"))) {
      bestFor = "Families";
    } else if (travelTypes.some((t) => t.toLowerCase().includes("luxury"))) {
      bestFor = "Luxury Travelers";
    }

    // Extract dynamic images from whyChooseImages, itineraryImage, carousels & timeline photos
    const galleryMain =
      rawPackage.whyChooseImages?.main ||
      rawPackage.carouselData?.[0]?.image ||
      rawPackage.thumbnail ||
      "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332952/backgrounds/hotelsHero.png";

    const galleryTop =
      rawPackage.whyChooseImages?.top ||
      rawPackage.carouselData?.[1]?.image ||
      rawPackage.timeline?.[0]?.image1 ||
      "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332956/backgrounds/hotelBgImage.png";

    const galleryBottom =
      rawPackage.whyChooseImages?.bottom ||
      rawPackage.carouselData?.[2]?.image ||
      rawPackage.timeline?.[1]?.image1 ||
      "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332968/destinations/cruise-thailand.png";

    const centerItineraryImage =
      rawPackage.itineraryImage ||
      rawPackage.carouselData?.[3]?.image ||
      galleryTop ||
      "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332956/backgrounds/hotelBgImage.png";

    // Dynamic "More Destinations" derived from other MongoDB packages
    const dynamicMoreDestinations =
      Array.isArray(otherDbPackages) && otherDbPackages.length > 0
        ? otherDbPackages.slice(0, 4).map((p) => {
            const pTravelType = [
              ...(Array.isArray(p.travelType) ? p.travelType : []),
              ...(Array.isArray(p.category) ? p.category : []),
            ].find((c) => !c.toLowerCase().includes("star"));

            return {
              name: p.destinations || p.city || p.country || p.title,
              tag: pTravelType ? `${pTravelType} Package` : "Holiday Package",
              image: p.thumbnail || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332952/backgrounds/hotelsHero.png",
              slug: p.slug || p._id.toString(),
            };
          })
        : [
            { name: "Maldives", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332952/backgrounds/hotelsHero.png", slug: "maldives-honeymoon" },
            { name: "Bali", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332944/backgrounds/ctaHotel.png", slug: "bali-retreat" },
            { name: "Thailand", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-thailand.png", slug: "thailand-escape" },
            { name: "Dubai", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-dubai.png", slug: "dubai-holiday" },
          ];

    return {
      _id: rawPackage._id,
      slug: rawPackage.slug || normalizedSlug,
      tag: categoryTag,
      title: primaryTitle,
      titleHighlight: highlightTitle,
      subtitle: rawPackage.description || "Discover bespoke luxury travel experiences crafted just for you.",
      heroImage: rawPackage.thumbnail || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332952/backgrounds/hotelsHero.png",
      heroBadges: [
        { text: "Flights Included", icon: "plane" },
        { text: "Luxury Accommodation", icon: "resort" },
        { text: "Travel Insurance Included", icon: "shield" },
        { text: "Customizable Itinerary", icon: "heart" },
      ],
      specs: {
        destination: rawPackage.destinations || rawPackage.city || rawPackage.country || "Worldwide",
        duration: `${rawPackage.nights || 4} Nights / ${rawPackage.days || 5} Days`,
        bestFor: bestFor,
        packageType: packageTypeStr,
      },
      whyChoose: {
        title: `Why Choose ${rawPackage.destinations || primaryTitle}?`,
        description: rawPackage.description || "Designed for travelers who want privacy, luxury, and unforgettable moments.",
        features: [
          { icon: "villa", title: "Luxury Accommodation" },
          { icon: "dinner", title: "Gourmet Dining Included" },
          { icon: "snorkel", title: "Curated Sightseeing" },
          { icon: "cruise", title: "Scenic Excursions" },
          { icon: "itinerary", title: "Personalized Itinerary" },
        ],
        gallery: {
          main: galleryMain,
          top: galleryTop,
          bottom: galleryBottom,
        },
      },
      itineraryImage: centerItineraryImage,
      itinerary: Array.isArray(rawPackage.timeline) && rawPackage.timeline.length > 0
        ? rawPackage.timeline.map((item, idx) => ({
            day: String(idx + 1).padStart(2, "0"),
            title: item.dayTitle || `Day ${idx + 1}`,
            desc: item.description || "Sightseeing and leisure activities.",
            image1: item.image1 || "",
            image2: item.image2 || "",
          }))
        : [
            { day: "01", title: "Day 1 – Arrival & Welcome", desc: "Airport pickup & transfer to hotel. Relax and unwind." },
            { day: "02", title: "Day 2 – City & Cultural Tour", desc: "Explore iconic landmarks and local attractions." },
            { day: "03", title: "Day 3 – Signature Excursion", desc: "A full day of curated experiences and sightseeing." },
            { day: "04", title: "Day 4 – Leisure & Shopping", desc: "Enjoy resort amenities, spa, or local shopping." },
            { day: "05", title: "Day 5 – Departure", desc: "Private airport transfer with fond memories." },
          ],
      inclusions: rawPackage.inclusions && rawPackage.inclusions.length > 0
        ? rawPackage.inclusions
        : [
            "Round Trip Flights / Transfers",
            `${rawPackage.nights || 4} Nights Luxury Stay`,
            "Daily Breakfast & Dinners",
            "Private Airport Transfers",
            "Guided Sightseeing Tours",
            "24/7 Dedicated Concierge Support",
          ],
      price: (rawPackage.domesticPrice || rawPackage.internationalPrice || "45,000").replace(/^₹\s*/, "") + "*",
      priceUnit: "per person (approx.)",
      bottomBanner: {
        title: `Need a Customized ${rawPackage.destinations || primaryTitle} Plan?`,
        subtitle: "Tell us your travel dates, party size and preferences.",
        note: "Our travel experts will create a personalized itinerary just for you.",
      },
      moreDestinations: dynamicMoreDestinations,
      faqs: Array.isArray(rawPackage.faqs)
        ? rawPackage.faqs
            .filter((f) => f && f.question?.trim() && f.answer?.trim())
            .map((f, idx) => ({
              id: f._id?.toString() || `pkg-faq-${idx}`,
              question: f.question.trim(),
              answer: f.answer.trim(),
            }))
        : [],
    };
  }

  // 2. Direct match in curated templates if rawPackage not in DB
  if (detailedPackageTemplates[normalizedSlug]) {
    return {
      ...detailedPackageTemplates[normalizedSlug],
      _id: `curated-${normalizedSlug}`,
      slug: normalizedSlug,
      faqs: [],
    };
  }

  // 3. Fallback to Maldives Honeymoon template so page never crashes
  return {
    ...detailedPackageTemplates["maldives-honeymoon"],
    _id: `fallback-${normalizedSlug}`,
    slug: normalizedSlug || "maldives-honeymoon",
    faqs: [],
  };
}
