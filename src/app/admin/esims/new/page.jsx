"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createESim } from "@/lib/actions/admin/esims.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewESimPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    planName: "", dataMB: "", validityDays: "", dataSpeed: "", 
    operatorName: "", fupLimit: "", dataGB: "", country: ""
  });

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

      const res = await createESim(data);
      if (res.success) {
        toast.success("eSIM plan created successfully!");
        router.push("/admin/esims");
      } else {
        toast.error(res.error || "Failed to create eSIM plan");
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
        <Link href="/admin/esims" className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New eSIM Plan</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Plan Name *</label>
              <Input required name="planName" value={formData.planName} onChange={handleTextChange} placeholder="E.g. Europe 30 Days" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country *</label>
              <Input required name="country" value={formData.country} onChange={handleTextChange} placeholder="Global / Europe" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Operator Name</label>
              <Input name="operatorName" value={formData.operatorName} onChange={handleTextChange} placeholder="Singtel / Orange" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Data Amount (MB) *</label>
              <Input required name="dataMB" value={formData.dataMB} onChange={handleTextChange} placeholder="5000" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Data Amount (GB)</label>
              <Input name="dataGB" value={formData.dataGB} onChange={handleTextChange} placeholder="5" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Validity (Days) *</label>
              <Input required name="validityDays" value={formData.validityDays} onChange={handleTextChange} placeholder="30" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Data Speed *</label>
              <Input required name="dataSpeed" value={formData.dataSpeed} onChange={handleTextChange} placeholder="4G/5G" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">FUP Limit</label>
              <Input name="fupLimit" value={formData.fupLimit} onChange={handleTextChange} placeholder="E.g. Throttled to 128kbps after 5GB" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 pb-12">
          <Button type="submit" disabled={loading} className="bg-[#BFA181] hover:bg-[#a68c70] text-black px-8">
            {loading ? "Creating..." : "Create Plan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
