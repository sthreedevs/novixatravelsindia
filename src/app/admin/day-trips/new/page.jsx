"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createDayTrip } from "@/lib/actions/admin/dayTrips.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Clock,
  Compass,
  MapPin,
  CheckCircle2,
  Image as ImageIcon,
  UploadCloud,
} from "lucide-react";
import Link from "next/link";

export default function NewDayTripPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    tagline: "",
    description: "",
    domesticPrice: "2499",
    internationalPrice: "35",

    // Specs Bar
    duration: "Full Day (approx. 10–12 hours)",
    tourType: "Private / Small Group",
    pickup: "Delhi or Agra",
    language: "English / Russian on request",
    rating: "4.9/5",
    ratingCount: "Guest Experience",

    // Experience Section
    experienceTitle: "",
    experienceLead: "",
    itinerarySubtitle: "(Timings are indicative and can be customized)",

    // Lists (|| separated)
    highlights: "",
    inclusionList: "",
    exclusionList: "",
    info: "",
  });

  // Dynamic Itinerary Builder
  const [itinerary, setItinerary] = useState([
    {
      time: "06:00 – 09:00",
      title: "Pickup & Scenic Drive",
      description: "Comfortable air-conditioned private vehicle with experienced chauffeur.",
    },
    {
      time: "09:00 – 12:00",
      title: "Main Monument Guided Exploration",
      description: "Detailed guided visit with an expert local licensed storyteller guide.",
    },
    {
      time: "12:30 – 14:00",
      title: "Authentic Local Lunch Break",
      description: "Enjoy traditional regional cuisine at a curated heritage dining venue.",
    },
    {
      time: "14:30 – 17:00",
      title: "Afternoon Sightseeing & Local Crafts",
      description: "Visit historic fortresses and witness centuries-old artisanal craftsmanship.",
    },
    {
      time: "17:30 – 19:30",
      title: "Evening Leisure & Return Transfer",
      description: "Relaxed scenic drive back to your hotel or airport with wonderful memories.",
    },
  ]);

  // Gallery 3 Photos (File + Title + Preview)
  const [gallery, setGallery] = useState([
    { title: "Main Monument", file: null, preview: "", url: "" },
    { title: "Historic Fortress", file: null, preview: "", url: "" },
    { title: "Artisan Craftsmanship", file: null, preview: "", url: "" },
  ]);

  // Single Main Trip Image (Card & Hero Banner)
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Main Image Change
  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  // Itinerary Handlers
  const handleItineraryChange = (index, field, value) => {
    setItinerary((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const addItineraryStep = () => {
    setItinerary((prev) => [
      ...prev,
      {
        time: "15:00 – 17:00",
        title: "New Itinerary Stop",
        description: "Guided visit and exploration with private assistance.",
      },
    ]);
  };

  const removeItineraryStep = (index) => {
    if (itinerary.length <= 1) {
      toast.info("Please keep at least one itinerary step.");
      return;
    }
    setItinerary((prev) => prev.filter((_, i) => i !== index));
  };

  // Gallery Handlers
  const handleGalleryTitleChange = (index, value) => {
    setGallery((prev) => {
      const updated = [...prev];
      updated[index].title = value;
      return updated;
    });
  };

  const handleGalleryFileChange = (index, file) => {
    if (!file) return;
    setGallery((prev) => {
      const updated = [...prev];
      updated[index].file = file;
      updated[index].preview = URL.createObjectURL(file);
      return updated;
    });
  };

  const handleGalleryUrlChange = (index, value) => {
    setGallery((prev) => {
      const updated = [...prev];
      updated[index].url = value;
      if (!updated[index].file) {
        updated[index].preview = value;
      }
      return updated;
    });
  };

  const removeGalleryFile = (index) => {
    setGallery((prev) => {
      const updated = [...prev];
      updated[index].file = null;
      updated[index].preview = updated[index].url || "";
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a title for the day trip.");
      return;
    }
    if (!mainImage) {
      toast.error("Please select a Main Trip Image.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append structured itinerary as JSON
      data.append("itinerary", JSON.stringify(itinerary));

      // Append Single Main Image for both Thumbnail & Hero
      data.append("thumbnail", mainImage);
      data.append("image", mainImage);

      // Append Uploadable Gallery Photos
      gallery.forEach((item, idx) => {
        data.append(`galleryTitle_${idx}`, item.title || `Highlight #${idx + 1}`);
        if (item.file) {
          data.append(`galleryFile_${idx}`, item.file);
        } else if (item.url) {
          data.append(`galleryUrl_${idx}`, item.url);
        }
      });

      const res = await createDayTrip(data);
      if (res.success) {
        toast.success("Day trip created successfully!");
        router.push("/admin/day-trips");
      } else {
        toast.error(res.error || "Failed to create day trip");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center space-x-4 border-b border-gray-200 dark:border-zinc-800 pb-4">
        <Link
          href="/admin/day-trips"
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-serif text-gray-900 dark:text-white">
            Create New Day Trip
          </h1>
          <p className="text-xs text-gray-500">
            Configure dynamic content, specs bar, interactive itinerary, uploadable photos, and pricing.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Basic Information */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3">
            <Compass className="w-5 h-5 text-[#BFA181]" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              1. Basic Overview &amp; Header
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Trip Title *
              </label>
              <Input
                required
                name="title"
                value={formData.title}
                onChange={handleTextChange}
                placeholder="e.g. Agra Day Trip"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Destination City *
              </label>
              <Input
                required
                name="destination"
                value={formData.destination}
                onChange={handleTextChange}
                placeholder="e.g. Agra, Jaipur, Delhi, Varanasi"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Cursive Subtitle / Tagline
              </label>
              <Input
                name="tagline"
                value={formData.tagline}
                onChange={handleTextChange}
                placeholder="e.g. Discover the timeless beauty of the Taj Mahal"
              />
              <span className="text-[11px] text-gray-400 mt-1 block">
                Rendered as an elegant gold cursive flourish beneath the main title.
              </span>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Hero Description *
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleTextChange}
                rows={3}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-[#BFA181]"
                placeholder="Explore the Taj Mahal, Agra Fort and local marble craftsmanship with a carefully planned one-day experience from Delhi or Agra."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Starting Domestic Price (₹) *
              </label>
              <Input
                required
                name="domesticPrice"
                value={formData.domesticPrice}
                onChange={handleTextChange}
                placeholder="2499"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                International Price ($)
              </label>
              <Input
                name="internationalPrice"
                value={formData.internationalPrice}
                onChange={handleTextChange}
                placeholder="35"
              />
            </div>
          </div>
        </div>

        {/* 2. Key Specs Bar */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3">
            <Clock className="w-5 h-5 text-[#BFA181]" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              2. Key Specs Bar (5 Attributes)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Duration
              </label>
              <Input
                name="duration"
                value={formData.duration}
                onChange={handleTextChange}
                placeholder="Full Day (approx. 10–12 hours)"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Tour Type
              </label>
              <Input
                name="tourType"
                value={formData.tourType}
                onChange={handleTextChange}
                placeholder="Private / Small Group"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Pickup Location
              </label>
              <Input
                name="pickup"
                value={formData.pickup}
                onChange={handleTextChange}
                placeholder="Delhi or Agra"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Languages
              </label>
              <Input
                name="language"
                value={formData.language}
                onChange={handleTextChange}
                placeholder="English / Russian on request"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Rating
              </label>
              <Input
                name="rating"
                value={formData.rating}
                onChange={handleTextChange}
                placeholder="4.9/5"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Rating Tag
              </label>
              <Input
                name="ratingCount"
                value={formData.ratingCount}
                onChange={handleTextChange}
                placeholder="Guest Experience"
              />
            </div>
          </div>
        </div>

        {/* 3. Experience Overview */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              3. Experience Overview Section
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Experience Section Title
              </label>
              <Input
                name="experienceTitle"
                value={formData.experienceTitle}
                onChange={handleTextChange}
                placeholder="e.g. Your Agra Experience"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Experience Lead Paragraph
              </label>
              <textarea
                name="experienceLead"
                value={formData.experienceLead}
                onChange={handleTextChange}
                rows={3}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-[#BFA181]"
                placeholder="A perfect blend of history, culture and craftsmanship — this day trip lets you explore one of the world's most iconic destinations with ease, comfort and expert guidance."
              />
            </div>
          </div>
        </div>

        {/* 4. Interactive Itinerary Builder */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#BFA181]" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                4. Suggested Itinerary Timeline (Connected Dots)
              </h2>
            </div>
            <Button
              type="button"
              onClick={addItineraryStep}
              variant="outline"
              size="sm"
              className="border-[#BFA181] text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Stop</span>
            </Button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Itinerary Subtitle
            </label>
            <Input
              name="itinerarySubtitle"
              value={formData.itinerarySubtitle}
              onChange={handleTextChange}
              placeholder="(Timings are indicative and can be customized)"
            />
          </div>

          <div className="space-y-4">
            {itinerary.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30 space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#b37f28] tracking-wider uppercase">
                    Stop #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItineraryStep(idx)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove stop"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1">
                      Time Range
                    </label>
                    <Input
                      value={step.time}
                      onChange={(e) =>
                        handleItineraryChange(idx, "time", e.target.value)
                      }
                      placeholder="e.g. 09:00 – 11:00"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-gray-500 mb-1">
                      Stop Title
                    </label>
                    <Input
                      value={step.title}
                      onChange={(e) =>
                        handleItineraryChange(idx, "title", e.target.value)
                      }
                      placeholder="e.g. Taj Mahal Guided Visit"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1">
                    Stop Description
                  </label>
                  <textarea
                    value={step.description}
                    onChange={(e) =>
                      handleItineraryChange(idx, "description", e.target.value)
                    }
                    rows={2}
                    className="w-full p-2.5 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-[#BFA181]"
                    placeholder="Explore the world-famous monument with an expert local guide."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Highlights, Inclusions, Exclusions, Know Before You Go */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3">
            <CheckCircle2 className="w-5 h-5 text-[#BFA181]" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              5. Highlights &amp; Inclusions Lists (Separate items with ||)
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Highlights Checklist (Separate with ||)
              </label>
              <textarea
                name="highlights"
                value={formData.highlights}
                onChange={handleTextChange}
                rows={2}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm"
                placeholder="Taj Mahal || Agra Fort || Expert Local Guide || Private AC Transport || Flexible Pace"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                What&apos;s Included (Separate with ||)
              </label>
              <textarea
                name="inclusionList"
                value={formData.inclusionList}
                onChange={handleTextChange}
                rows={2}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm"
                placeholder="Private / shared AC transport || Local expert guide || Monument assistance & entry support"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Not Included (Separate with ||)
              </label>
              <textarea
                name="exclusionList"
                value={formData.exclusionList}
                onChange={handleTextChange}
                rows={2}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm"
                placeholder="Meals (unless specified) || Monument tickets (if not included) || Personal expenses"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Know Before You Go (Separate with ||)
              </label>
              <textarea
                name="info"
                value={formData.info}
                onChange={handleTextChange}
                rows={2}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm"
                placeholder="Carry a valid ID proof || Wear comfortable shoes || Follow monument dress code || Opening times may vary"
              />
            </div>
          </div>
        </div>

        {/* 6. Media & Photos (Single Main Image + Uploadable Highlight Photos) */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3">
            <ImageIcon className="w-5 h-5 text-[#BFA181]" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              6. Photos &amp; Media Uploads
            </h2>
          </div>

          {/* Part A: Single Main Trip Image (Powers Card Image AND Hero Image) */}
          <div className="p-5 rounded-2xl bg-gray-50/70 dark:bg-zinc-800/40 border border-gray-200 dark:border-zinc-800 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Main Trip Image (Card &amp; Hero Banner) *
                </label>
                <p className="text-xs text-gray-500 mt-0.5">
                  This single image powers both the listing card thumbnail and the detail page panoramic hero background.
                </p>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-50 dark:bg-zinc-800 text-[#b37f28] font-bold uppercase tracking-wider shrink-0">
                Powers Card &amp; Hero
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              {mainImagePreview && (
                <div className="h-28 w-44 relative rounded-xl overflow-hidden border border-stone-200 shrink-0 shadow-sm">
                  <Image
                    src={mainImagePreview}
                    alt="Main trip preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}
              <div className="w-full">
                <Input
                  type="file"
                  required
                  onChange={handleMainImageChange}
                  accept="image/*"
                  className="cursor-pointer file:cursor-pointer"
                />
                <span className="text-[11px] text-gray-400 mt-1.5 block">
                  PNG, JPG, or WEBP up to 10MB. Automatically uploaded and optimized on Cloudinary.
                </span>
              </div>
            </div>
          </div>

          {/* Part B: 3 Uploadable Highlight Photos */}
          <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Highlights Photo Gallery (3 Uploadable Photos)
                </h3>
                <p className="text-xs text-gray-500">
                  Upload 3 photos representing the key attractions of the day trip.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#b37f28] uppercase tracking-wider">
                        Photo #{idx + 1}
                      </span>
                      {item.file && (
                        <button
                          type="button"
                          onClick={() => removeGalleryFile(idx)}
                          className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                          title="Clear selected file"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>

                    {/* Image Preview */}
                    {item.preview ? (
                      <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-stone-200 bg-stone-100">
                        <Image
                          src={item.preview}
                          alt={`Highlight preview ${idx + 1}`}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-[4/3] w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/60 flex flex-col items-center justify-center p-3 text-center text-gray-400">
                        <UploadCloud className="w-7 h-7 mb-1 stroke-1" />
                        <span className="text-[11px]">No photo chosen</span>
                      </div>
                    )}

                    {/* Photo Title / Caption */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                        Photo Caption
                      </label>
                      <Input
                        value={item.title}
                        onChange={(e) =>
                          handleGalleryTitleChange(idx, e.target.value)
                        }
                        placeholder={`e.g. Photo ${idx + 1} Caption`}
                      />
                    </div>

                    {/* File Upload Input */}
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                        Upload Photo File
                      </label>
                      <Input
                        type="file"
                        onChange={(e) =>
                          handleGalleryFileChange(idx, e.target.files?.[0])
                        }
                        accept="image/*"
                        className="cursor-pointer text-xs"
                      />
                    </div>

                    {/* Fallback URL (Optional) */}
                    <div>
                      <label className="block text-[10px] font-medium text-gray-400 mb-1">
                        Or Image URL (Optional)
                      </label>
                      <Input
                        value={item.url}
                        onChange={(e) =>
                          handleGalleryUrlChange(idx, e.target.value)
                        }
                        placeholder="https://images.unsplash.com/..."
                        className="text-xs h-8"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link href="/admin/day-trips">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#BFA181] hover:bg-[#a68c70] text-black font-bold px-8 py-2.5 rounded-full cursor-pointer shadow-md"
          >
            {loading ? "Creating Day Trip..." : "Create Day Trip"}
          </Button>
        </div>
      </form>
    </div>
  );
}
