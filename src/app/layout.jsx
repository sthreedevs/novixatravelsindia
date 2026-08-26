import { Providers } from "@/components/Providers";
import { ClientLayout } from "@/components/ClientLayout";
import { getAllDestinations } from "@/lib/services/destination.service.js";
import { getAllPackages } from "@/lib/services/package.service.js";
import { getActiveOffers } from "@/lib/services/navbarTop.service.js";
import "./globals.css";

export const metadata = {
  title: "EaseTravels India",
  description: "Your trusted travel partner in India",
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
      </body>
    </html>
  );
}
