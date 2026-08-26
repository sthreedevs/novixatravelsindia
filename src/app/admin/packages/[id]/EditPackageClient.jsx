"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updatePackage } from "@/lib/actions/admin/packages.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EditPackageClient({ pkg }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: pkg.title || "", 
    city: pkg.city || "", 
    destinations: pkg.destinations || "", 
    country: pkg.country || "", 
    description: pkg.description || "",
    days: pkg.days || "", 
    nights: pkg.nights || "", 
    domesticPrice: pkg.domesticPrice || "", 
    internationalPrice: pkg.internationalPrice || "",
    showOnHome: pkg.showOnHome || false, 
    tags: pkg.tags ? pkg.tags.join(", ") : "", 
    category: pkg.category ? pkg.category.join(", ") : "", 
    inclusions: pkg.inclusions ? pkg.inclusions.join(", ") : "", 
    exclusions: pkg.exclusions ? pkg.exclusions.join(", ") : ""
  });
  
  const [thumbnail, setThumbnail] = useState(null);
  
  const [timelines, setTimelines] = useState(pkg.timeline?.map(t => ({
    _id: t._id,
    dayTitle: t.dayTitle,
    description: t.description,
    image1: t.image1,
    image2: t.image2,
    file1: null,
    file2: null,
  })) || []);

  const [carousels, setCarousels] = useState(pkg.carouselData?.map(c => ({
    _id: c._id,
    title: c.title,
    description: c.description,
    buttonText: c.buttonText,
    image: c.image,
    file: null,
  })) || []);

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

    if (!formData.title || !formData.country || !formData.destinations) {
      return toast.error("Please provide Title, Country, and Destinations.");
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      
      if (thumbnail) data.append("thumbnail", thumbnail);

      // We pass the JSON structure back so the action knows what to update/create
      const timelinesData = timelines.map(tl => ({
        _id: tl._id, dayTitle: tl.dayTitle, description: tl.description
      }));
      data.append("timelinesData", JSON.stringify(timelinesData));
      
      timelines.forEach((tl, i) => {
        if (tl.file1) data.append(`timeline_${i}_image1`, tl.file1);
        if (tl.file2) data.append(`timeline_${i}_image2`, tl.file2);
      });

      const carouselsData = carousels.map(c => ({
        _id: c._id, title: c.title, description: c.description, buttonText: c.buttonText
      }));
      data.append("carouselsData", JSON.stringify(carouselsData));
      
      carousels.forEach((c, i) => {
        if (c.file) data.append(`carousel_${i}_image`, c.file);
      });

      const res = await updatePackage(pkg._id, data);
      
      if (res.success) {
        toast.success("Package updated successfully!");
        router.push("/admin/packages");
      } else {
        toast.error(res.error || "Failed to update package");
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Package</h1>
      </div>

      <div className="space-y-8">
        
        {/* Basic Info */}
        <div className="my-2">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General Details</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <Input name="title" value={formData.title} onChange={handleTextChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Country *</label>
                  <Input name="country" value={formData.country} onChange={handleTextChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City / Region</label>
                  <Input name="city" value={formData.city} onChange={handleTextChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Destinations (String) *</label>
                  <Input name="destinations" value={formData.destinations} onChange={handleTextChange} />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Days *</label>
                    <Input type="number" name="days" value={formData.days} onChange={handleTextChange} />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Nights *</label>
                    <Input type="number" name="nights" value={formData.nights} onChange={handleTextChange} />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Domestic Price *</label>
                    <Input name="domesticPrice" value={formData.domesticPrice} onChange={handleTextChange} />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Intl Price *</label>
                    <Input name="internationalPrice" value={formData.internationalPrice} onChange={handleTextChange} />
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
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                  <Input name="tags" value={formData.tags} onChange={handleTextChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category (comma separated)</label>
                  <Input name="category" value={formData.category} onChange={handleTextChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Inclusions (comma separated)</label>
                  <Input name="inclusions" value={formData.inclusions} onChange={handleTextChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Exclusions (comma separated)</label>
                  <Input name="exclusions" value={formData.exclusions} onChange={handleTextChange} />
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
                <label className="block text-sm font-medium mb-1">Thumbnail Image (Upload new to replace)</label>
                {pkg.thumbnail && (
                  <img src={pkg.thumbnail} alt="thumbnail" className="h-20 w-20 object-cover rounded mb-2" />
                )}
                <Input type="file" onChange={(e) => setThumbnail(e.target.files[0])} accept="image/*" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itinerary">
        {/* Timeline */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Itinerary Timeline</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => setTimelines([...timelines, { dayTitle: "", description: "", file1: null, file2: null }])}>
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
                  <Input value={tl.dayTitle} onChange={(e) => handleTimelineChange(index, 'dayTitle', e.target.value)} />
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
                  {tl.image1 && <img src={tl.image1} alt="" className="h-12 w-12 object-cover rounded mb-1" />}
                  <Input type="file" onChange={(e) => handleTimelineChange(index, 'file1', e.target.files[0])} accept="image/*" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image 2</label>
                  {tl.image2 && <img src={tl.image2} alt="" className="h-12 w-12 object-cover rounded mb-1" />}
                  <Input type="file" onChange={(e) => handleTimelineChange(index, 'file2', e.target.files[0])} accept="image/*" />
                </div>
              </div>
            </div>
          ))}
        </div>
        </TabsContent>

        <TabsContent value="gallery">
        {/* Carousel */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Gallery Carousel</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => setCarousels([...carousels, { title: "", description: "", buttonText: "", file: null }])}>
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
                  <label className="block text-sm font-medium mb-1">Image</label>
                  {c.image && <img src={c.image} alt="" className="h-12 w-12 object-cover rounded mb-1" />}
                  <Input type="file" onChange={(e) => handleCarouselChange(index, 'file', e.target.files[0])} accept="image/*" />
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
            {loading ? "Updating..." : "Update Package"}
          </Button>
        </div>
      </div>
    </div>
  );
}
