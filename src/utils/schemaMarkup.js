/**
 * Structured Data Schemas (JSON-LD)
 * Schema.org markup for better SEO and search engine understanding
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Novixa Travels India",
  description:
    "Novixa Travels India is a comprehensive travel agency offering visa assistance, flights, trains, hotels, tour packages, and more.",
  url: "https://www.novixatravelsindia.com",
  logo: "https://www.novixatravelsindia.com/logo.png",
  image: "https://www.novixatravelsindia.com/og-image.jpg",
  telephone: "+91-XXXXXXXXXX", // Update with actual number
  email: "contact@novixatravelsindia.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Your Street Address",
    addressLocality: "Your City",
    addressRegion: "Your State",
    postalCode: "XXXXX",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/novixatravelsindia",
    "https://www.twitter.com/novixatravels",
    "https://www.instagram.com/novixatravelsindia",
    "https://www.linkedin.com/company/novixatravelsindia",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: "+91-XXXXXXXXXX",
    email: "contact@novixatravelsindia.com",
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Novixa Travels India",
  image: "https://www.novixatravelsindia.com/logo.png",
  description:
    "Premier travel agency in India offering comprehensive travel solutions",
  telephone: "+91-XXXXXXXXXX",
  email: "contact@novixatravelsindia.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Your Street Address",
    addressLocality: "Your City",
    addressRegion: "Your State",
    postalCode: "XXXXX",
    addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "₹₹",
};

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const serviceSchema = (serviceName, description, price = null) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: serviceName,
  description: description,
  provider: {
    "@type": "TravelAgency",
    name: "Novixa Travels India",
    url: "https://www.novixatravelsindia.com",
  },
  ...(price && { offers: { "@type": "Offer", priceCurrency: "INR", price: price } }),
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const productSchema = (product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.image,
  offers: {
    "@type": "Offer",
    price: product.price,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: product.rating
    ? {
        "@type": "AggregateRating",
        ratingValue: product.rating.value,
        reviewCount: product.rating.count,
      }
    : undefined,
});

export const eventSchema = (event) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: event.name,
  description: event.description,
  startDate: event.startDate,
  endDate: event.endDate,
  eventLocation: {
    "@type": "Place",
    name: event.location,
  },
  organizer: {
    "@type": "Organization",
    name: "Novixa Travels India",
    url: "https://www.novixatravelsindia.com",
  },
});

export const articleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    "@type": "Organization",
    name: "Novixa Travels India",
  },
  publisher: {
    "@type": "Organization",
    name: "Novixa Travels India",
    logo: {
      "@type": "ImageObject",
      url: "https://www.novixatravelsindia.com/logo.png",
    },
  },
});

export const reviewSchema = (review) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  reviewRating: {
    "@type": "Rating",
    ratingValue: review.rating,
    bestRating: "5",
    worstRating: "1",
  },
  reviewBody: review.text,
  author: {
    "@type": "Person",
    name: review.author,
  },
  datePublished: review.date,
});

export const aggregateRatingSchema = (rating) => ({
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  ratingValue: rating.value,
  ratingCount: rating.count,
  reviewCount: rating.reviewCount,
  bestRating: "5",
  worstRating: "1",
});
