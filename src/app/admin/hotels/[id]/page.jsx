import React from "react";
import { getHotelById } from "@/lib/services/hotel.service";
import EditHotelClient from "./EditHotelClient";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Hotel | Admin",
};

export default async function EditHotelPage({ params }) {
  const { id } = await params;
  
  const hotel = await getHotelById(id);

  if (!hotel) {
    notFound();
  }

  return <EditHotelClient hotel={hotel} />;
}
