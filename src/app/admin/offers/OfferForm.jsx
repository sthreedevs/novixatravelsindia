"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { createOffer, updateOffer } from "@/lib/actions/admin/navbartop.actions";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { format } from "date-fns";

export default function OfferForm({ initialData = null }) {
  const router = useRouter();
  const isEditing = !!initialData;
  
  // Format initial validTill date for datetime-local input if it exists
  const initialValidTill = initialData?.validTill 
    ? new Date(initialData.validTill).toISOString().slice(0, 16) 
    : "";

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    url: initialData?.url || "",
    isActive: initialData?.isActive ?? true,
    validTill: initialValidTill,
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.url) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      let res;
      if (isEditing) {
        res = await updateOffer(initialData._id, formData);
      } else {
        res = await createOffer(formData);
      }
      
      if (res.success) {
        toast.success(`Offer banner ${isEditing ? 'updated' : 'created'} successfully`);
        router.push("/admin/offers");
        router.refresh();
      } else {
        toast.error(res.error || `Failed to ${isEditing ? 'update' : 'create'} offer banner`);
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/offers" 
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-gray-600 dark:text-gray-400"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            {isEditing ? 'Edit Offer Banner' : 'Add New Offer Banner'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing ? 'Update the details of this promotional strip.' : 'Create a new promotional strip to show above the navbar.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <Input 
              name="title"
              placeholder="e.g. FLASH SALE!"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <Input 
              name="description"
              placeholder="e.g. Get 20% off on all European packages"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL Link <span className="text-red-500">*</span>
            </label>
            <Input 
              name="url"
              placeholder="e.g. /packages/europe-tour"
              value={formData.url}
              onChange={handleChange}
              required
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">The link users will be taken to when they click the banner.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-200 dark:border-zinc-800 mt-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Valid Till (Expiration Date)
              </label>
              <Input 
                type="datetime-local"
                name="validTill"
                value={formData.validTill}
                onChange={handleChange}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty for a banner that never expires automatically.</p>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#BFA181] bg-gray-100 border-gray-300 rounded focus:ring-[#BFA181] focus:ring-2 dark:bg-zinc-800 dark:border-zinc-700"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Banner is Active (Visible)
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end mt-6">
          <button
            type="button"
            onClick={() => router.push("/admin/offers")}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 mr-3 dark:bg-zinc-800 dark:text-gray-300 dark:border-zinc-700 dark:hover:bg-zinc-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center px-4 py-2 text-sm font-medium text-black bg-[#BFA181] border border-transparent rounded-md hover:bg-[#a68968] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BFA181] disabled:opacity-50"
          >
            {isLoading ? "Saving..." : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? "Update Banner" : "Save Banner"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
