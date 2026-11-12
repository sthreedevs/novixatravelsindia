import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getHomeCarousel } from "@/lib/services/home.service";
import HomeCarouselListClient from "./HomeCarouselListClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Home Hero Carousel | Novixa Admin",
  description: "Manage hero carousel images, titles, and subtitles shown on the homepage",
};

export default async function AdminHomeCarouselPage() {
  const slides = await getHomeCarousel();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Home Hero Carousel
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add, edit, or delete the hero carousel banners shown on the homepage ({slides.length} active slide{slides.length === 1 ? "" : "s"}).
          </p>
        </div>

        <Link
          href="/admin/home-carousel/new"
          className="inline-flex items-center gap-2 bg-[#deb06c] hover:bg-[#c99955] text-zinc-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Slide</span>
        </Link>
      </div>

      <HomeCarouselListClient initialSlides={slides} />
    </div>
  );
}

