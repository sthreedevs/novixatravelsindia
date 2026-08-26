import React from "react";
import { getDayTripById } from "@/lib/services/dayTrip.service";
import EditDayTripClient from "./EditDayTripClient";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Day Trip | Admin",
};

export default async function EditDayTripPage({ params }) {
  const { id } = await params;
  
  const dayTrip = await getDayTripById(id);

  if (!dayTrip) {
    notFound();
  }

  return <EditDayTripClient dayTrip={dayTrip} />;
}
