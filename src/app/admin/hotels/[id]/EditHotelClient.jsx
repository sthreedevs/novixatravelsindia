"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateHotel } from "@/lib/actions/admin/hotels.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditHotelClient({ hotel }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: hotel.title || "", 
    country: hotel.country || "", 
    city: hotel.city || "", 
    state: hotel.state || "", 
    category: hotel.category || "", 
    domesticPrice: hotel.domesticPrice || "", 
    internationalPrice: hotel.internationalPrice || "", 
    tags: hotel.tags ? hotel.tags.join(", ") : ""
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

      const res = await updateHotel(hotel._id, data);
      if (res.success) {
        toast.success("Hotel updated successfully!");
        router.push("/admin/hotels");
      } else {
        toast.error(res.error || "Failed to update hotel");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/hotels" className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Hotel</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Hotel Title *</label>
              <Input required name="title" value={formData.title} onChange={handleTextChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country *</label>
              <Input required name="country" value={formData.country} onChange={handleTextChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <Input required name="city" value={formData.city} onChange={handleTextChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <Input name="state" value={formData.state} onChange={handleTextChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <Input required name="category" value={formData.category} onChange={handleTextChange} />
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
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <Input name="tags" value={formData.tags} onChange={handleTextChange} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail Image (Upload to replace)</label>
            {hotel.thumbnail && (
              <img src={hotel.thumbnail} alt="" className="h-24 w-40 object-cover rounded mb-2 border border-gray-200" />
            )}
            <Input type="file" onChange={(e) => setThumbnail(e.target.files[0])} accept="image/*" />
          </div>
        </div>

        <div className="flex justify-end pt-4 pb-12">
          <Button type="submit" disabled={loading} className="bg-[#BFA181] hover:bg-[#a68c70] text-black px-8">
            {loading ? "Updating..." : "Update Hotel"}
          </Button>
        </div>
      </form>
    </div>
  );
}
