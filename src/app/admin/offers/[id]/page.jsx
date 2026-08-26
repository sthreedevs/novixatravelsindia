import React from "react";
import OfferForm from "../OfferForm";
import { getOffer } from "@/lib/actions/admin/navbartop.actions";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Offer Banner | Novixa Admin",
  description: "Edit promotional banner details",
};

export default async function EditOfferPage({ params }) {
  const offer = await getOffer(params.id);

  if (!offer) {
    notFound();
  }

  return <OfferForm initialData={offer} />;
}
