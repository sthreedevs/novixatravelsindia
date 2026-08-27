import { Providers } from "@/components/Providers";
import { ClientLayout } from "@/components/ClientLayout";
import { getAllDestinations } from "@/lib/services/destination.service.js";
import { getAllPackages } from "@/lib/services/package.service.js";
import { getActiveOffers } from "@/lib/services/navbarTop.service.js";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://novixatravelsindia.com"),
  title: {
    default: "Novixa Travels India | Your Trusted Travel Partner",
    template: "%s | Novixa Travels India",
  },
  description: "Discover the best travel packages, destinations, and day trips across India and the world with Novixa Travels India. We provide unforgettable experiences.",
  keywords: ["travel", "india tours", "vacation packages", "novixa travels", "holiday packages", "travel agency india", "custom tours"],
  openGraph: {
    title: "Novixa Travels India | Your Trusted Travel Partner",
    description: "Discover the best travel packages, destinations, and day trips across India and the world with Novixa Travels India.",
    url: "https://novixatravelsindia.com",
    siteName: "Novixa Travels India",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novixa Travels India | Your Trusted Travel Partner",
    description: "Discover the best travel packages, destinations, and day trips across India and the world with Novixa Travels India.",
  },
  alternates: {
    canonical: "/",
  },
  // Geo-tagging for local SEO
  other: {
    "geo.region": "IN",
    "geo.placename": "New Delhi",
    "geo.position": "28.6139;77.2090",
    "ICBM": "28.6139, 77.2090",
  }
};

export default async function RootLayout({ children }) {
  const [initialDestinations, initialPackages, initialOffers] = await Promise.all([
    getAllDestinations(),
    getAllPackages(),
    getActiveOffers()
  ]);

  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout 
            initialDestinations={initialDestinations}
            initialPackages={initialPackages}
            initialOffers={initialOffers}
          >
            {children}
          </ClientLayout>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
