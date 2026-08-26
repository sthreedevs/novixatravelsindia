import React from "react";
import GuideForm from "../GuideForm";
import { getGuide } from "@/lib/actions/admin/guides.actions";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Guide | Novixa Admin",
  description: "Edit tour guide details",
};

export default async function EditGuidePage({ params }) {
  const guide = await getGuide(params.id);

  if (!guide) {
    notFound();
  }

  return <GuideForm initialData={guide} />;
}
