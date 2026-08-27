"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateDestination } from "@/lib/actions/admin/destinations.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EditDestinationClient({ destination }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: destination.name || "", 
    country: destination.country || "", 
    continent: destination.continent || "", 
    tags: destination.tags ? destination.tags.join(", ") : "",
    isTrendingIndian: destination.isTrendingIndian || false, 
    isTrendingInternational: destination.isTrendingInternational || false,
    removeThumbnail: "false"
  });
  
  const [thumbnail, setThumbnail] = useState(null);
  
  const [descriptions, setDescriptions] = useState(destination.descriptions?.map(d => ({
    _id: d._id,
    title: d.title,
    description: d.description,
    image: d.image,
    file: null,
    highlights: d.highlights || []
  })) || []);

  const [carousels, setCarousels] = useState(destination.carouselData?.map(c => ({
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

  const handleDescChange = (index, field, value) => {
    const updated = [...descriptions];
    updated[index][field] = value;
    setDescriptions(updated);
  };

  const addHighlight = (descIndex) => {
    const updated = [...descriptions];
    updated[descIndex].highlights.push({ title: "", description: "" });
    setDescriptions(updated);
  };

  const removeHighlight = (descIndex, highlightIndex) => {
    const updated = [...descriptions];
    updated[descIndex].highlights.splice(highlightIndex, 1);
    setDescriptions(updated);
  };

  const handleHighlightChange = (descIndex, highlightIndex, field, value) => {
    const updated = [...descriptions];
    updated[descIndex].highlights[highlightIndex][field] = value;
    setDescriptions(updated);
  };
  
  const handleCarouselChange = (index, field, value) => {
    const updated = [...carousels];
    updated[index][field] = value;
    setCarousels(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.country) {
      return toast.error("Please provide Name and Country.");
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      
      if (thumbnail) data.append("thumbnail", thumbnail);
      if (formData.removeThumbnail === "true") data.append("removeThumbnail", "true");

      // Descriptions
      const descriptionsData = descriptions.map(d => ({
        _id: d._id, title: d.title, description: d.description, highlights: d.highlights, image: d.image
      }));
      data.append("descriptionsData", JSON.stringify(descriptionsData));
      
      descriptions.forEach((d, i) => {
        if (d.file) data.append(`description_${i}_image`, d.file);
      });

      // Carousels
      const carouselsData = carousels.map(c => ({
        _id: c._id, title: c.title, description: c.description, buttonText: c.buttonText, image: c.image
      }));
      data.append("carouselsData", JSON.stringify(carouselsData));
      
      carousels.forEach((c, i) => {
        if (c.file) data.append(`carousel_${i}_image`, c.file);
      });

      const res = await updateDestination(destination._id, data);
      
      if (res.success) {
        toast.success("Destination updated successfully!");
        router.push("/admin/destinations");
      } else {
        toast.error(res.error || "Failed to update destination");
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
        <Link href="/admin/destinations" className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Destination</h1>
      </div>

      <div className="space-y-8">
        
        <div className="my-2">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General Details</TabsTrigger>
            <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
        {/* Basic Info */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Destination Name *</label>
              <Input name="name" value={formData.name} onChange={handleTextChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country *</label>
              <Input name="country" value={formData.country} onChange={handleTextChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Continent *</label>
              <Input name="continent" value={formData.continent} onChange={handleTextChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated) *</label>
              <Input name="tags" value={formData.tags} onChange={handleTextChange} />
            </div>
          </div>
          
          <div className="flex items-center space-x-6 pt-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="isTrendingIndian" name="isTrendingIndian" checked={formData.isTrendingIndian} onChange={handleTextChange} className="rounded text-[#BFA181] focus:ring-[#BFA181]" />
              <label htmlFor="isTrendingIndian" className="text-sm font-medium">Trending Indian</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="isTrendingInternational" name="isTrendingInternational" checked={formData.isTrendingInternational} onChange={handleTextChange} className="rounded text-[#BFA181] focus:ring-[#BFA181]" />
              <label htmlFor="isTrendingInternational" className="text-sm font-medium">Trending International</label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail Image (Upload new to replace)</label>
            {destination.thumbnail && formData.removeThumbnail === "false" && (
              <div className="relative inline-block mb-2">
                <img src={destination.thumbnail} alt="thumbnail" className="h-20 w-20 object-cover rounded" />
                <button type="button" onClick={() => setFormData(p => ({...p, removeThumbnail: "true"}))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><Trash2 className="w-3 h-3" /></button>
              </div>
            )}
            <Input type="file" onChange={(e) => {setThumbnail(e.target.files[0]); setFormData(p => ({...p, removeThumbnail: "false"}));}} accept="image/*" />
          </div>
        </div>
        </TabsContent>

        <TabsContent value="descriptions">
        {/* Descriptions & Highlights */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Descriptions & Highlights</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => setDescriptions([...descriptions, { title: "", description: "", file: null, highlights: [] }])}>
              <Plus className="w-4 h-4 mr-1" /> Add Description
            </Button>
          </div>

          {descriptions.map((desc, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg space-y-4 relative border border-gray-200 dark:border-zinc-700">
              <button type="button" onClick={() => setDescriptions(descriptions.filter((_, i) => i !== index))} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </button>
              
              <h3 className="font-medium text-[#BFA181]">Description Block {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Section Title *</label>
                  <Input value={desc.title} onChange={(e) => handleDescChange(index, 'title', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <textarea value={desc.description} onChange={(e) => handleDescChange(index, 'description', e.target.value)} className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-24" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Image</label>
                  {desc.image && (
                    <div className="relative inline-block mb-1">
                      <img src={desc.image} alt="" className="h-12 w-12 object-cover rounded" />
                      <button type="button" onClick={() => handleDescChange(index, 'image', "")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  )}
                  <Input type="file" onChange={(e) => {handleDescChange(index, 'file', e.target.files[0]); handleDescChange(index, 'image', "");}} accept="image/*" />
                </div>
              </div>

              {/* Highlights Sub-form */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium">Highlights (Bullet Points)</label>
                  <Button type="button" variant="secondary" size="sm" onClick={() => addHighlight(index)} className="h-7 text-xs">
                    <Plus className="w-3 h-3 mr-1" /> Add Highlight
                  </Button>
                </div>
                <div className="space-y-3">
                  {desc.highlights.map((hl, hIndex) => (
                    <div key={hIndex} className="flex gap-2 items-start bg-white dark:bg-zinc-900 p-3 rounded border border-gray-200 dark:border-zinc-700 relative">
                      <div className="flex-1 space-y-2">
                        <Input value={hl.title} onChange={(e) => handleHighlightChange(index, hIndex, 'title', e.target.value)} placeholder="Highlight Title" className="h-8 text-sm" />
                        <Input value={hl.description} onChange={(e) => handleHighlightChange(index, hIndex, 'description', e.target.value)} placeholder="Highlight Description (optional)" className="h-8 text-sm" />
                      </div>
                      <button type="button" onClick={() => removeHighlight(index, hIndex)} className="text-red-400 hover:text-red-600 mt-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {desc.highlights.length === 0 && <p className="text-xs text-gray-500 italic">No highlights added to this section.</p>}
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
            <Button type="button" variant="outline" size="sm" onClick={() => setCarousels([...carousels, { title: "", description: "", buttonText: "", file: null }])}>
              <Plus className="w-4 h-4 mr-1" /> Add Slide
            </Button>
          </div>

          {carousels.map((c, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg space-y-4 relative">
              <button type="button" onClick={() => setCarousels(carousels.filter((_, i) => i !== index))} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </button>
              <h3 className="font-medium text-[#BFA181]">Slide {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  {c.image && (
                    <div className="relative inline-block mb-1">
                      <img src={c.image} alt="" className="h-12 w-12 object-cover rounded" />
                      <button type="button" onClick={() => handleCarouselChange(index, 'image', "")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  )}
                  <Input type="file" onChange={(e) => {handleCarouselChange(index, 'file', e.target.files[0]); handleCarouselChange(index, 'image', "");}} accept="image/*" />
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
            {loading ? "Updating..." : "Update Destination"}
          </Button>
        </div>
      </div>
    </div>
  );
}
