import React from "react";
import { getHotelsPageData } from "@/lib/services/hotel.service.js";
import { HotelPageClient } from "@/components/hotels/HotelPageClient";

export const metadata = {
  title: "Hotels | Novixa Travels",
  description: "Book handpicked hotels for your vacation. We offer 3-star, 4-star, and 5-star hotels with secure booking and 24/7 support.",
};

export default async function HotelsPage() {
  const hotelPageData = await getHotelsPageData();

  return <HotelPageClient hotelPageData={hotelPageData} />;
}
