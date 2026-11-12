"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { ArrowLeft, Save, UploadCloud, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  createHomeCarousel,
  updateHomeCarousel,
} from "@/lib/actions/admin/homeCarousel.actions";

export default function HomeCarouselForm({ initialData = null }) {
  const router = useRouter();
  const isEditing = Boolean(initialData?._id);

  const [formData, setFormData] = useState({
    title: initialData?.title ?? "Welcome To Novixa Travels India",
    description: initialData?.description ?? '"Where Comfort Meets Every Budget"',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.image || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(initialData?.image || "");
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile, initialData?.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing && !imageFile) {
      toast.error("Please select an image for the hero slide.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (imageFile) {
        data.append("image", imageFile);
      }

      const res = isEditing
        ? await updateHomeCarousel(initialData._id, data)
        : await createHomeCarousel(data);

      if (res.success) {
        toast.success(
          `Hero slide ${isEditing ? "updated" : "added"} successfully!`
        );
        router.push("/admin/home-carousel");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to save carousel slide");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/home-carousel"
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isEditing ? "Edit Home Hero Slide" : "Add Home Hero Slide"}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Upload high-resolution landscape images and customize overlay text shown on the homepage hero.
          </p>
        </div>
      </div>

      {/* Live Homepage Hero Preview */}
      <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Live Hero Banner Preview
          </span>
          <span className="text-[11px] text-zinc-400">Recommended aspect: 16:9 widescreen</span>
        </div>

        <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt={formData.title || "Hero Preview"}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-center p-6 text-center">
                <div className="max-w-2xl">
                  {formData.title && (
                    <h2 className="text-xl sm:text-3xl font-bold text-white leading-tight">
                      {formData.title}
                    </h2>
                  )}
                  {formData.description && (
                    <p className="text-xs sm:text-base text-zinc-200 mt-2">
                      {formData.description}
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-zinc-400 space-y-2 p-6">
              <ImageIcon className="w-10 h-10 mx-auto text-zinc-600" />
              <p className="text-xs">Select an image below to preview the hero slide</p>
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-zinc-100">
            Hero Image {!isEditing && <span className="text-red-500">*</span>}
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-[#deb06c] transition-colors cursor-pointer bg-zinc-50 dark:bg-zinc-800/40 text-sm text-zinc-600 dark:text-zinc-300">
              <UploadCloud className="w-4 h-4 text-[#deb06c]" />
              <span>
                {imageFile
                  ? imageFile.name
                  : isEditing
                  ? "Choose new image to replace current banner"
                  : "Click to upload hero image (JPG, PNG, WebP)"}
              </span>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Headline Title
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Welcome To Novixa Travels India"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Subtitle / Tagline
            </label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder='"Where Comfort Meets Every Budget"'
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-zinc-800">
          <Link
            href="/admin/home-carousel"
            className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#deb06c] hover:bg-[#c99955] text-zinc-950 font-bold px-6 py-2.5 rounded-xl shadow-sm cursor-pointer inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>
              {loading
                ? isEditing
                  ? "Updating..."
                  : "Uploading..."
                : isEditing
                ? "Update Slide"
                : "Add Hero Slide"}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}

