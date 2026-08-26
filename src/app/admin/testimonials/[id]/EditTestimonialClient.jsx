"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateTestimonial } from "@/lib/actions/admin/testimonials.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditTestimonialClient({ testimonial }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: testimonial.name || "", 
    designation: testimonial.designation || "", 
    review: testimonial.review || ""
  });
  const [image, setImage] = useState(null);

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
      if (image) data.append("image", image);

      const res = await updateTestimonial(testimonial._id, data);
      if (res.success) {
        toast.success("Testimonial updated successfully!");
        router.push("/admin/testimonials");
      } else {
        toast.error(res.error || "Failed to update testimonial");
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
        <Link href="/admin/testimonials" className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Testimonial</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Reviewer Name *</label>
              <Input required name="name" value={formData.name} onChange={handleTextChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Designation *</label>
              <Input required name="designation" value={formData.designation} onChange={handleTextChange} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Review *</label>
              <textarea 
                required 
                name="review" 
                value={formData.review} 
                onChange={handleTextChange} 
                className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-32"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Reviewer Image (Upload to replace)</label>
            {testimonial.image && (
              <img src={testimonial.image} alt="" className="h-16 w-16 object-cover rounded-full mb-2 border border-gray-200" />
            )}
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
          </div>
        </div>

        <div className="flex justify-end pt-4 pb-12">
          <Button type="submit" disabled={loading} className="bg-[#BFA181] hover:bg-[#a68c70] text-black px-8">
            {loading ? "Updating..." : "Update Testimonial"}
          </Button>
        </div>
      </form>
    </div>
  );
}
