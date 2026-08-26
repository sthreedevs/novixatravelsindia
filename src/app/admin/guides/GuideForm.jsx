"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { createGuide, updateGuide } from "@/lib/actions/admin/guides.actions";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function GuideForm({ initialData = null }) {
  const router = useRouter();
  const isEditing = !!initialData;
  
  const [formData, setFormData] = useState({
    language: initialData?.language || "",
    domesticPrice: initialData?.domesticPrice || "",
    internationalPrice: initialData?.internationalPrice || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.language || !formData.domesticPrice || !formData.internationalPrice) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      let res;
      if (isEditing) {
        res = await updateGuide(initialData._id, formData);
      } else {
        res = await createGuide(formData);
      }
      
      if (res.success) {
        toast.success(`Guide ${isEditing ? 'updated' : 'created'} successfully`);
        router.push("/admin/guides");
        router.refresh();
      } else {
        toast.error(res.error || `Failed to ${isEditing ? 'update' : 'create'} guide`);
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
          href="/admin/guides" 
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-gray-600 dark:text-gray-400"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            {isEditing ? 'Edit Guide' : 'Add New Guide'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing ? 'Update guide pricing details.' : 'Add a new language and its pricing.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Language <span className="text-red-500">*</span>
          </label>
          <Input 
            name="language"
            placeholder="e.g. English, French, Spanish"
            value={formData.language}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Domestic Price <span className="text-red-500">*</span>
            </label>
            <Input 
              name="domesticPrice"
              placeholder="e.g. ₹2000 per day"
              value={formData.domesticPrice}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              International Price <span className="text-red-500">*</span>
            </label>
            <Input 
              name="internationalPrice"
              placeholder="e.g. $50 per day"
              value={formData.internationalPrice}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={() => router.push("/admin/guides")}
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
                {isEditing ? "Update Guide" : "Save Guide"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
