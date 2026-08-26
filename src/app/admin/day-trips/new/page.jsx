"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createDayTrip } from "@/lib/actions/admin/dayTrips.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewDayTripPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "", 
    description: "", 
    domesticPrice: "", 
    internationalPrice: "", 
    descriptionList: "", 
    inclusionList: "", 
    exclusionList: "", 
    info: ""
  });
  const [thumbnail, setThumbnail] = useState(null);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (thumbnail) data.append("thumbnail", thumbnail);

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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/day-trips" className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Day Trip</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Title *</label>
              <Input required name="title" value={formData.title} onChange={handleTextChange} placeholder="E.g. Full Day Paris Tour" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea 
                required 
                name="description" 
                value={formData.description} 
                onChange={handleTextChange} 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-24"
                placeholder="Brief description of the day trip..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Domestic Price *</label>
              <Input required name="domesticPrice" value={formData.domesticPrice} onChange={handleTextChange} placeholder="5000" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">International Price *</label>
              <Input required name="internationalPrice" value={formData.internationalPrice} onChange={handleTextChange} placeholder="100" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description List (Separate with ||)</label>
              <textarea 
                name="descriptionList" 
                value={formData.descriptionList} 
                onChange={handleTextChange} 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-20"
                placeholder="Item 1 || Item 2 || Item 3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Inclusions (Separate with ||)</label>
              <textarea 
                name="inclusionList" 
                value={formData.inclusionList} 
                onChange={handleTextChange} 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-20"
                placeholder="Transport || Guide || Lunch"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Exclusions (Separate with ||)</label>
              <textarea 
                name="exclusionList" 
                value={formData.exclusionList} 
                onChange={handleTextChange} 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-20"
                placeholder="Personal Expenses || Entry Fees"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Info (Separate with ||)</label>
              <textarea 
                name="info" 
                value={formData.info} 
                onChange={handleTextChange} 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-20"
                placeholder="Duration: 8 hours || Starting Point: Hotel Lobby"
              />
            </div>

          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail Image *</label>
            <Input type="file" required onChange={(e) => setThumbnail(e.target.files[0])} accept="image/*" />
          </div>
        </div>

        <div className="flex justify-end pt-4 pb-12">
          <Button type="submit" disabled={loading} className="bg-[#BFA181] hover:bg-[#a68c70] text-black px-8">
            {loading ? "Creating..." : "Create Day Trip"}
          </Button>
        </div>
      </form>
    </div>
  );
}
