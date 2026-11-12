"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Pencil, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { deleteHomeCarousel } from "@/lib/actions/admin/homeCarousel.actions";

export default function HomeCarouselListClient({ initialSlides = [] }) {
  const router = useRouter();
  const [slides, setSlides] = useState(initialSlides);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (slide, index) => {
    if (!window.confirm(`Are you sure you want to delete Slide #${index + 1}?`)) {
      return;
    }

    setDeletingId(slide._id);
    try {
      const res = await deleteHomeCarousel(slide._id);
      if (res.success) {
        setSlides((prev) => prev.filter((item) => item._id !== slide._id));
        toast.success("Hero slide deleted successfully");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to delete slide");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center space-y-4">
        <ImageIcon className="w-10 h-10 text-zinc-400 mx-auto" />
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            No Hero Carousel Slides Found
          </h3>
          <p className="text-sm text-zinc-500 mt-1">
            Add slides to showcase full-width travel banners on your homepage.
          </p>
        </div>
        <Link
          href="/admin/home-carousel/new"
          className="inline-flex items-center gap-2 bg-[#deb06c] hover:bg-[#c99955] text-zinc-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add First Slide</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {slides.map((slide, idx) => (
        <div
          key={slide._id}
          className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
        >
          {/* Visual Banner Preview */}
          <div className="relative h-52 w-full bg-zinc-900 overflow-hidden">
            <img
              src={slide.image || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332976/placeholder.png"}
              alt={slide.title || `Slide ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-white text-[11px] font-bold">
                Slide #{idx + 1}
              </span>
            </div>

            <div className="absolute bottom-3 left-4 right-4 text-white">
              <h3 className="text-sm font-bold truncate">
                {slide.title || "(No Headline)"}
              </h3>
              <p className="text-xs text-zinc-300 truncate mt-0.5">
                {slide.description || "(No Subtitle)"}
              </p>
            </div>
          </div>

          {/* Actions Footer */}
          <div className="p-4 flex items-center justify-between gap-3 border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 mt-auto">
            <span className="text-[11px] text-zinc-500">
              {slide.updatedAt
                ? `Updated ${new Date(slide.updatedAt).toLocaleDateString()}`
                : "Active on Homepage"}
            </span>

            <div className="flex items-center gap-3">
              <Link
                href={`/admin/home-carousel/${slide._id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8a5812] dark:text-[#deb06c] hover:underline"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit</span>
              </Link>

              <button
                type="button"
                onClick={() => handleDelete(slide, idx)}
                disabled={deletingId === slide._id}
                className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-800 dark:hover:text-red-400 disabled:opacity-50 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{deletingId === slide._id ? "Deleting..." : "Delete"}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

