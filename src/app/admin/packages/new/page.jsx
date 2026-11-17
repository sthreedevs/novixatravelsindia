"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createPackage } from "@/lib/actions/admin/packages.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Trash2, Image as ImageIcon, Calendar, Layers, HelpCircle } from "lucide-react";
import Link from "next/link";
import TravelTypeMultiSelect from "../TravelTypeMultiSelect";
import PackageFaqsEditor from "../PackageFaqsEditor";

export default function NewPackagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    country: "",
    city: "",
    destinations: "",
    description: "",
    days: "",
    nights: "",
    domesticPrice: "",
    internationalPrice: "",
    showOnHome: false,
    tags: "",
    inclusions: "",
    exclusions: "",
  });

  const [travelType, setTravelType] = useState(["Honeymoon"]);
  const [thumbnail, setThumbnail] = useState(null);

  const [timelines, setTimelines] = useState([
    { dayTitle: "Day 1: Arrival & Welcome", description: "", image1: null, image2: null },
  ]);
  const [faqs, setFaqs] = useState([]);

  // Section Photos: 3 for "Why Choose" collage + 1 for "Detailed Itinerary"
  const [whyChooseImages, setWhyChooseImages] = useState({
    main: null,
    top: null,
    bottom: null,
  });
  const [itineraryImage, setItineraryImage] = useState(null);

  const handleTextChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      // Auto-extract days and nights if typing title and fields are empty
      if (name === "title" && (!prev.days || !prev.nights)) {
        const nMatch = value.match(/(\d+)\s*(?:nights?|n\b)/i);
        const dMatch = value.match(/(\d+)\s*(?:days?|d\b)/i);
        if (!prev.nights && nMatch) {
          next.nights = nMatch[1];
        }
        if (!prev.days && dMatch) {
          next.days = dMatch[1];
        }
      }
      return next;
    });
  };

  const handleTimelineChange = (index, field, value) => {
    const updated = [...timelines];
    updated[index][field] = value;
    setTimelines(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title?.trim()) {
      return toast.error("Please provide a Package Title.");
    }
    if (!formData.country?.trim() || !formData.destinations?.trim()) {
      return toast.error("Please provide Country and Destinations.");
    }
    if (!thumbnail) {
      return toast.error("Please upload a Thumbnail image.");
    }
    if (!travelType || travelType.length === 0) {
      return toast.error("Please select at least one Travel Type.");
    }
    if (!formData.days || Number(formData.days) <= 0) {
      return toast.error("Please enter a valid number of Days (greater than 0).");
    }
    if (!formData.nights || Number(formData.nights) <= 0) {
      return toast.error("Please enter a valid number of Nights (greater than 0).");
    }

    const hasIncompleteFaq = faqs.some(
      (f) => (f.question?.trim() && !f.answer?.trim()) || (!f.question?.trim() && f.answer?.trim())
    );
    if (hasIncompleteFaq) {
      return toast.error("Please fill in both Question and Answer for each FAQ, or remove incomplete FAQs.");
    }

    setLoading(true);

    try {
      const data = new FormData();

      // Append basic form fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append travelType as JSON array and synchronized category
      data.append("travelType", JSON.stringify(travelType));
      data.append("category", travelType.join(", "));

      // Append thumbnail
      if (thumbnail) data.append("thumbnail", thumbnail);

      // Append 3 Why Choose section photos
      if (whyChooseImages.main) data.append("whyChoose_main", whyChooseImages.main);
      if (whyChooseImages.top) data.append("whyChoose_top", whyChooseImages.top);
      if (whyChooseImages.bottom) data.append("whyChoose_bottom", whyChooseImages.bottom);

      // Append 1 Detailed Itinerary section photo
      if (itineraryImage) data.append("itineraryImage_file", itineraryImage);

      // Append timelines
      const timelinesData = timelines.map((tl) => ({
        dayTitle: tl.dayTitle,
        description: tl.description,
      }));
      data.append("timelinesData", JSON.stringify(timelinesData));

      // Append dynamic FAQs
      data.append("faqsData", JSON.stringify(faqs));

      timelines.forEach((tl, i) => {
        if (tl.image1) data.append(`timeline_${i}_image1`, tl.image1);
        if (tl.image2) data.append(`timeline_${i}_image2`, tl.image2);
      });

      const res = await createPackage(data);
      if (res.success) {
        toast.success("Package created successfully!");
        router.push("/admin/packages");
      } else {
        toast.error(res.error || "Failed to create package");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/packages"
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create New Travel Package
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Add bespoke holiday packages with rich itineraries, pricing, and travel types.
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#deb06c] hover:bg-[#c99955] text-zinc-950 font-bold px-6 shadow-md cursor-pointer"
        >
          {loading ? "Creating..." : "Save & Publish Package"}
        </Button>
      </div>

      <div className="space-y-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>General & Travel Type</span>
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Itinerary Timeline ({timelines.length})</span>
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span>Section Photos (4)</span>
            </TabsTrigger>
            <TabsTrigger value="faqs" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>FAQs ({faqs.length})</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: GENERAL DETAILS */}
          <TabsContent value="general">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Package Overview
                </h2>
                <span className="text-xs text-zinc-500">* Required fields</span>
              </div>

              {/* Title & Destinations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Package Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleTextChange}
                    placeholder="e.g. 4 Nights 5 Days Goa Tour Package | Beach Holiday"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Destinations / Sightseeing Points <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="destinations"
                    value={formData.destinations}
                    onChange={handleTextChange}
                    placeholder="e.g. North Goa, Baga Beach, Fort Aguada"
                  />
                </div>
              </div>

              {/* Country & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleTextChange}
                    placeholder="e.g. India, UAE, Maldives, Switzerland"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City / Region</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleTextChange}
                    placeholder="e.g. Goa, Dubai, Male"
                  />
                </div>
              </div>

              {/* Travel Type Multi-Select (BIND WITH TRAVEL TYPE) */}
              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-zinc-800/40 border border-amber-200/60 dark:border-zinc-700">
                <TravelTypeMultiSelect
                  value={travelType}
                  onChange={setTravelType}
                  label="Travel Type(s) (Select multiple to bind with this package)"
                  required
                />
                <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 mt-2">
                  Bind this package with travel styles like <strong>Honeymoon</strong>, <strong>Family</strong>, <strong>Adventure</strong>, <strong>Luxury</strong>, or <strong>Cultural</strong>. Users filter by these types on the packages directory.
                </p>
              </div>

              {/* Days, Nights, Domestic Price, Intl Price */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Days <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    name="days"
                    min="1"
                    required
                    value={formData.days}
                    onChange={handleTextChange}
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nights <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    name="nights"
                    min="1"
                    required
                    value={formData.nights}
                    onChange={handleTextChange}
                    placeholder="4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Domestic Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="domesticPrice"
                    value={formData.domesticPrice}
                    onChange={handleTextChange}
                    placeholder="e.g. 14,500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Intl Price (₹ or $)</label>
                  <Input
                    name="internationalPrice"
                    value={formData.internationalPrice}
                    onChange={handleTextChange}
                    placeholder="e.g. 18,000"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Package Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleTextChange}
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-28 focus:outline-none focus:border-[#deb06c]"
                  placeholder="A romantic beach holiday blending serenity, seaside sunsets, and luxury resorts..."
                />
              </div>

              {/* Inclusions, Exclusions & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Inclusions (comma separated)</label>
                  <Input
                    name="inclusions"
                    value={formData.inclusions}
                    onChange={handleTextChange}
                    placeholder="Hotel, Breakfast, Airport Transfers, Sightseeing, Taxes"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Exclusions (comma separated)</label>
                  <Input
                    name="exclusions"
                    value={formData.exclusions}
                    onChange={handleTextChange}
                    placeholder="Flights, Personal expenses, Water sports"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Search Tags (comma separated)</label>
                  <Input
                    name="tags"
                    value={formData.tags}
                    onChange={handleTextChange}
                    placeholder="Beach, Couple, Sunset, Cruise"
                  />
                </div>
              </div>

              {/* Thumbnail & Trending Checkbox */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Thumbnail Image <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="file"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    accept="image/*"
                    className="cursor-pointer file:cursor-pointer"
                  />
                </div>

                <div className="flex items-center space-x-3 pt-6">
                  <input
                    type="checkbox"
                    id="showOnHome"
                    name="showOnHome"
                    checked={formData.showOnHome}
                    onChange={handleTextChange}
                    className="h-4 w-4 rounded text-[#deb06c] focus:ring-[#deb06c] cursor-pointer"
                  />
                  <label htmlFor="showOnHome" className="text-sm font-medium cursor-pointer">
                    Feature on Homepage (Trending Packages)
                  </label>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: ITINERARY TIMELINE */}
          <TabsContent value="itinerary">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Detailed Day-by-Day Itinerary
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Each day expands as an interactive accordion item on the package detail page.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setTimelines([
                      ...timelines,
                      {
                        dayTitle: `Day ${timelines.length + 1}: Sightseeing Tour`,
                        description: "",
                        image1: null,
                        image2: null,
                      },
                    ])
                  }
                  className="cursor-pointer border-[#deb06c] text-[#8a5812] hover:bg-[#deb06c]/10"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Day {timelines.length + 1}
                </Button>
              </div>

              {timelines.map((tl, index) => (
                <div
                  key={index}
                  className="p-5 bg-gray-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-4 relative"
                >
                  {timelines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setTimelines(timelines.filter((_, i) => i !== index))}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      title="Remove Day"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#fcf2df] text-[#8a5812] text-xs font-bold">
                    Day {index + 1}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                        Day Title *
                      </label>
                      <Input
                        value={tl.dayTitle}
                        onChange={(e) => handleTimelineChange(index, "dayTitle", e.target.value)}
                        placeholder={`Day ${index + 1}: Arrival / Sightseeing / Departure`}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                        Detailed Day Description *
                      </label>
                      <textarea
                        value={tl.description}
                        onChange={(e) => handleTimelineChange(index, "description", e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-28 focus:outline-none focus:border-[#deb06c]"
                        placeholder="Describe the day's schedule, pickup timings, points of interest, meals, and leisure activities..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                        Photo 1 (Optional)
                      </label>
                      <Input
                        type="file"
                        onChange={(e) => handleTimelineChange(index, "image1", e.target.files[0])}
                        accept="image/*"
                        className="cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                        Photo 2 (Optional)
                      </label>
                      <Input
                        type="file"
                        onChange={(e) => handleTimelineChange(index, "image2", e.target.files[0])}
                        accept="image/*"
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 3: SECTION PHOTOS (3 for Why Choose + 1 for Itinerary) */}
          <TabsContent value="photos">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-8">
              {/* SECTION A: 3 PHOTOS FOR "WHY CHOOSE" COLLAGE */}
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#deb06c]"></span>
                    <span>1. Why Choose Us Section – 3 Collage Photos</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    These 3 photos form the side-by-side showcase collage directly next to the 5 feature badges.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Photo 1: Left Main Large */}
                  <div className="p-4 bg-gray-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#8a5812] uppercase tracking-wider">
                        Photo 1: Main Left
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#fcf2df] text-[#8a5812] font-semibold">
                        Tall Image
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Primary tall vertical photo displayed on the left side of the collage.
                    </p>
                    <Input
                      type="file"
                      onChange={(e) =>
                        setWhyChooseImages((prev) => ({ ...prev, main: e.target.files[0] }))
                      }
                      accept="image/*"
                      className="cursor-pointer"
                    />
                  </div>

                  {/* Photo 2: Top Right */}
                  <div className="p-4 bg-gray-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#8a5812] uppercase tracking-wider">
                        Photo 2: Top Right
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#fcf2df] text-[#8a5812] font-semibold">
                        Top Row
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Landscape photo stacked at the top-right of the collage.
                    </p>
                    <Input
                      type="file"
                      onChange={(e) =>
                        setWhyChooseImages((prev) => ({ ...prev, top: e.target.files[0] }))
                      }
                      accept="image/*"
                      className="cursor-pointer"
                    />
                  </div>

                  {/* Photo 3: Bottom Right */}
                  <div className="p-4 bg-gray-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#8a5812] uppercase tracking-wider">
                        Photo 3: Bottom Right
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#fcf2df] text-[#8a5812] font-semibold">
                        Bottom Row
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Landscape photo stacked at the bottom-right of the collage.
                    </p>
                    <Input
                      type="file"
                      onChange={(e) =>
                        setWhyChooseImages((prev) => ({ ...prev, bottom: e.target.files[0] }))
                      }
                      accept="image/*"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION B: 1 PHOTO FOR "DETAILED ITINERARY" CARD */}
              <div className="space-y-4 pt-2">
                <div className="border-b pb-3">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#deb06c]"></span>
                    <span>2. Detailed Itinerary Section – 1 Showcase Photo</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    This photo is displayed on the prominent card next to Package Inclusions and Starting Price.
                  </p>
                </div>

                <div className="max-w-md p-4 bg-gray-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#8a5812] uppercase tracking-wider">
                      Itinerary Card Photo
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#fcf2df] text-[#8a5812] font-semibold">
                      Side Feature Card
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    Resort stay / destination photo displayed alongside &quot;Package Includes&quot; &amp; the &quot;Enquire Now&quot; button.
                  </p>
                  <Input
                    type="file"
                    onChange={(e) => setItineraryImage(e.target.files[0])}
                    accept="image/*"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: PACKAGE FAQS */}
          <TabsContent value="faqs">
            <PackageFaqsEditor faqs={faqs} onChange={setFaqs} />
          </TabsContent>
        </Tabs>

        {/* Submit Bar */}
        <div className="flex justify-end pt-4 pb-12">
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#deb06c] hover:bg-[#c99955] text-zinc-950 font-bold px-8 py-3 rounded-full shadow-lg text-sm transition-transform active:scale-95 cursor-pointer"
          >
            {loading ? "Creating Package..." : "Create Package"}
          </Button>
        </div>
      </div>
    </div>
  );
}
