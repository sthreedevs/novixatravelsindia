import React from "react";
import { notFound } from "next/navigation";
import { getHomeCarouselById } from "@/lib/services/home.service";
import HomeCarouselForm from "../HomeCarouselForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Home Hero Slide | Novixa Admin",
};

export default async function EditHomeCarouselPage({ params }) {
  const { id } = await params;
  const slide = await getHomeCarouselById(id);

  if (!slide) {
    notFound();
  }

  return <HomeCarouselForm initialData={slide} />;
}

