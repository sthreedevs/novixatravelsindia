"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createPackage } from "@/lib/actions/admin/packages.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function NewPackagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "", city: "", destinations: "", country: "", description: "",
    days: "", nights: "", domesticPrice: "", internationalPrice: "",
    showOnHome: false, tags: "", category: "", inclusions: "", exclusions: ""
  });
  const [thumbnail, setThumbnail] = useState(null);
  
  const [timelines, setTimelines] = useState([
    { dayTitle: "", description: "", image1: null, image2: null }
  ]);
  const [carousels, setCarousels] = useState([]);

  const handleTextChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTimelineChange = (index, field, value) => {
    const updated = [...timelines];
    updated[index][field] = value;
    setTimelines(updated);
  };
  
  const handleCarouselChange = (index, field, value) => {
    const updated = [...carousels];
    updated[index][field] = value;
    setCarousels(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !thumbnail) {
      return toast.error("Please provide Title, Location, and Thumbnail.");
    }

    setLoading(true);

    try {
      const data = new FormData();
      // append basic info
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      
      // append thumbnail
      if (thumbnail) data.append("thumbnail", thumbnail);

      // append timelines
      // We pass the string data and append files separately
      const timelinesData = timelines.map(tl => ({
        dayTitle: tl.dayTitle, description: tl.description
      }));
      data.append("timelinesData", JSON.stringify(timelinesData));
      
      timelines.forEach((tl, i) => {
        if (tl.image1) data.append(`timeline_${i}_image1`, tl.image1);
        if (tl.image2) data.append(`timeline_${i}_image2`, tl.image2);
      });

      // append carousels
      const carouselsData = carousels.map(c => ({
        title: c.title, description: c.description, buttonText: c.buttonText
      }));
      data.append("carouselsData", JSON.stringify(carouselsData));
      
      carousels.forEach((c, i) => {
        if (c.image) data.append(`carousel_${i}_image`, c.image);
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
      <div className="flex items-center space-x-4">
        <Link href="/admin/packages" className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Package</h1>
      </div>

      <div className="space-y-8">
        <div className="my-2">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General Details</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">General Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Package Title *</label>
                  <Input name="title" value={formData.title} onChange={handleTextChange} placeholder="e.g. Majestic Kerala" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location *</label>
                  <Input name="location" value={formData.location} onChange={handleTextChange} placeholder="e.g. Kerala, India" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Map URL</label>
                  <Input name="mapUrl" value={formData.mapUrl} onChange={handleTextChange} placeholder="Google Maps embed URL" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Domestic Price *</label>
                    <Input name="domesticPrice" value={formData.domesticPrice} onChange={handleTextChange} placeholder="e.g. 15000" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Intl Price *</label>
                    <Input name="internationalPrice" value={formData.internationalPrice} onChange={handleTextChange} placeholder="e.g. 200" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleTextChange} 
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-32"
                  placeholder="Package overview..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                  <Input name="tags" value={formData.tags} onChange={handleTextChange} placeholder="Nature, Hills, Couple" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category (comma separated)</label>
                  <Input name="category" value={formData.category} onChange={handleTextChange} placeholder="Honeymoon, Family" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Inclusions (comma separated)</label>
                  <Input name="inclusions" value={formData.inclusions} onChange={handleTextChange} placeholder="Hotel, Breakfast" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Exclusions (comma separated)</label>
                  <Input name="exclusions" value={formData.exclusions} onChange={handleTextChange} placeholder="Flights, Personal expenses" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="showOnHome" 
                  name="showOnHome"
                  checked={formData.showOnHome} 
                  onChange={handleTextChange}
                  className="rounded text-[#BFA181] focus:ring-[#BFA181]" 
                />
                <label htmlFor="showOnHome" className="text-sm font-medium">Show on Home Page (Trending)</label>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Thumbnail Image *</label>
                <Input type="file" onChange={(e) => setThumbnail(e.target.files[0])} accept="image/*" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itinerary">
            {/* Timeline (Itinerary) */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Itinerary Timeline</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => setTimelines([...timelines, { dayTitle: "", description: "", image1: null, image2: null }])}>
              <Plus className="w-4 h-4 mr-1" /> Add Day
            </Button>
          </div>

          {timelines.map((tl, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg space-y-4 relative">
              <button 
                type="button" 
                onClick={() => setTimelines(timelines.filter((_, i) => i !== index))}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <h3 className="font-medium text-[#BFA181]">Day {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Day Title *</label>
                  <Input value={tl.dayTitle} onChange={(e) => handleTimelineChange(index, 'dayTitle', e.target.value)} placeholder="Arrival in City" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea 
                    value={tl.description} 
                    onChange={(e) => handleTimelineChange(index, 'description', e.target.value)} 
                    className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image 1</label>
                  <Input type="file" onChange={(e) => handleTimelineChange(index, 'image1', e.target.files[0])} accept="image/*" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image 2</label>
                  <Input type="file" onChange={(e) => handleTimelineChange(index, 'image2', e.target.files[0])} accept="image/*" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="gallery">
        {/* Carousel Images */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Gallery Carousel</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => setCarousels([...carousels, { title: "", description: "", buttonText: "", image: null }])}>
              <Plus className="w-4 h-4 mr-1" /> Add Slide
            </Button>
          </div>

          {carousels.map((c, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg space-y-4 relative">
              <button 
                type="button" 
                onClick={() => setCarousels(carousels.filter((_, i) => i !== index))}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <h3 className="font-medium text-[#BFA181]">Slide {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Image *</label>
                  <Input type="file" onChange={(e) => handleCarouselChange(index, 'image', e.target.files[0])} accept="image/*" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input value={c.title} onChange={(e) => handleCarouselChange(index, 'title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input value={c.description} onChange={(e) => handleCarouselChange(index, 'description', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Button Text</label>
                  <Input value={c.buttonText} onChange={(e) => handleCarouselChange(index, 'buttonText', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
    </div>

        <div className="flex justify-end pt-4 pb-12">
          <Button type="button" onClick={handleSubmit} disabled={loading} className="bg-[#BFA181] hover:bg-[#a68c70] text-black px-8">
            {loading ? "Creating..." : "Create Package"}
          </Button>
        </div>
      </div>
    </div>
  );
}
