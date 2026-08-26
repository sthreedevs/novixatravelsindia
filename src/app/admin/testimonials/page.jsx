import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllTestimonials } from "@/lib/services/testimonial.service";
import { Button } from "@/components/ui/button";
import TestimonialsTableClient from "./TestimonialsTableClient";

export const metadata = {
  title: "Manage Testimonials | Admin",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Testimonials
        </h1>
        <Link href="/admin/testimonials/new">
          <Button className="bg-[#BFA181] hover:bg-[#a68c70] text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </Button>
        </Link>
      </div>

      <TestimonialsTableClient initialTestimonials={testimonials} />
    </div>
  );
}
