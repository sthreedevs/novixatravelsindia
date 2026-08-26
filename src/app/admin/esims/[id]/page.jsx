import React from "react";
import { getESimById } from "@/lib/services/esim.service";
import EditESimClient from "./EditESimClient";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit eSIM Plan | Admin",
};

export default async function EditESimPage({ params }) {
  const { id } = await params;
  
  const esim = await getESimById(id);

  if (!esim) {
    notFound();
  }

  return <EditESimClient esim={esim} />;
}
