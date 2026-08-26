import { Providers } from "@/components/Providers";
import { ClientLayout } from "@/components/ClientLayout";
import "./globals.css";

export const metadata = {
  title: "EaseTravels India",
  description: "Your trusted travel partner in India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
