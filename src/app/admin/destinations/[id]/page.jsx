import React from "react";
import { getDestinationById } from "@/lib/services/destination.service";
import EditDestinationClient from "./EditDestinationClient";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Destination | Admin",
};

export default async function EditDestinationPage({ params }) {
  const { id } = await params;
  
  const destination = await getDestinationById(id);

  if (!destination) {
    notFound();
  }

  return <EditDestinationClient destination={destination} />;
}
