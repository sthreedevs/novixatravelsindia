"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Search, Plus, Trash2, Edit2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { deleteGuide } from "@/lib/actions/admin/guides.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function GuidesTableClient({ initialGuides }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this guide?")) return;
    
    setIsDeleting(true);
    try {
      const res = await deleteGuide(id);
      if (res.success) {
        toast.success("Guide deleted successfully");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to delete guide");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  const processedGuides = useMemo(() => {
    let filtered = [...(initialGuides || [])];
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.language?.toLowerCase().includes(lowerQuery)
      );
    }
    return filtered;
  }, [initialGuides, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800">
        <div className="relative flex-1 max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            type="text"
            placeholder="Search by language..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Link
          href="/admin/guides/new"
          className="flex items-center px-4 py-2 bg-[#BFA181] hover:bg-[#a68968] text-black font-medium rounded-md transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Guide
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
            <thead className="bg-gray-50 dark:bg-zinc-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domestic Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">International Price</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
              {processedGuides.map((guide) => (
                <tr key={guide._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium capitalize text-black dark:text-white">{guide.language}</div>
                    <div className="text-xs text-gray-500">Added {format(new Date(guide.createdAt), "MMM d, yyyy")}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {guide.domesticPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {guide.internationalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link 
                      href={`/admin/guides/${guide._id}`} 
                      className="text-blue-600 hover:text-blue-900 inline-flex items-center mr-4"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(guide._id)} 
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-900 inline-flex items-center disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {processedGuides.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                    No guides found. {searchQuery && "Try a different search term."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
