import React from "react";
import { getTestimonialById } from "@/lib/services/testimonial.service";
import EditTestimonialClient from "./EditTestimonialClient";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Testimonial | Admin",
};

export default async function EditTestimonialPage({ params }) {
  const { id } = await params;
  
  const testimonial = await getTestimonialById(id);

  if (!testimonial) {
    notFound();
  }

  return <EditTestimonialClient testimonial={testimonial} />;
}
