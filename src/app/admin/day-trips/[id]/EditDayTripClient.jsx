"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateDayTrip } from "@/lib/actions/admin/dayTrips.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditDayTripClient({ dayTrip }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: dayTrip.title || "", 
    description: dayTrip.description || "", 
    domesticPrice: dayTrip.domesticPrice || "", 
    internationalPrice: dayTrip.internationalPrice || "", 
    descriptionList: dayTrip.descriptionList ? dayTrip.descriptionList.join(" || ") : "", 
    inclusionList: dayTrip.inclusionList ? dayTrip.inclusionList.join(" || ") : "", 
    exclusionList: dayTrip.exclusionList ? dayTrip.exclusionList.join(" || ") : "", 
    info: dayTrip.info ? dayTrip.info.join(" || ") : ""
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

      const res = await updateDayTrip(dayTrip._id, data);
      if (res.success) {
        toast.success("Day trip updated successfully!");
        router.push("/admin/day-trips");
      } else {
        toast.error(res.error || "Failed to update day trip");
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Day Trip</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Title *</label>
              <Input required name="title" value={formData.title} onChange={handleTextChange} />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea 
                required 
                name="description" 
                value={formData.description} 
                onChange={handleTextChange} 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-24"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Domestic Price *</label>
              <Input required name="domesticPrice" value={formData.domesticPrice} onChange={handleTextChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">International Price *</label>
              <Input required name="internationalPrice" value={formData.internationalPrice} onChange={handleTextChange} />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description List (Separate with ||)</label>
              <textarea 
                name="descriptionList" 
                value={formData.descriptionList} 
                onChange={handleTextChange} 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Inclusions (Separate with ||)</label>
              <textarea 
                name="inclusionList" 
                value={formData.inclusionList} 
                onChange={handleTextChange} 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Exclusions (Separate with ||)</label>
              <textarea 
                name="exclusionList" 
                value={formData.exclusionList} 
                onChange={handleTextChange} 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Info (Separate with ||)</label>
              <textarea 
                name="info" 
                value={formData.info} 
                onChange={handleTextChange} 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-20"
              />
            </div>

          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail Image (Upload to replace)</label>
            {dayTrip.thumbnail && (
              <img src={dayTrip.thumbnail} alt="" className="h-24 w-40 object-cover rounded mb-2 border border-gray-200" />
            )}
            <Input type="file" onChange={(e) => setThumbnail(e.target.files[0])} accept="image/*" />
          </div>
        </div>

        <div className="flex justify-end pt-4 pb-12">
          <Button type="submit" disabled={loading} className="bg-[#BFA181] hover:bg-[#a68c70] text-black px-8">
            {loading ? "Updating..." : "Update Day Trip"}
          </Button>
        </div>
      </form>
    </div>
  );
}
