"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Search, Plus, Trash2, Edit2, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { deleteOffer } from "@/lib/actions/admin/navbartop.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function OffersTableClient({ initialOffers }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this offer banner?")) return;
    
    setIsDeleting(true);
    try {
      const res = await deleteOffer(id);
      if (res.success) {
        toast.success("Offer banner deleted successfully");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to delete offer banner");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  const processedOffers = useMemo(() => {
    let filtered = [...(initialOffers || [])];
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title?.toLowerCase().includes(lowerQuery) || 
        item.description?.toLowerCase().includes(lowerQuery)
      );
    }
    return filtered;
  }, [initialOffers, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800">
        <div className="relative flex-1 max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            type="text"
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Link
          href="/admin/offers/new"
          className="flex items-center px-4 py-2 bg-[#BFA181] hover:bg-[#a68968] text-black font-medium rounded-md transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Offer
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
            <thead className="bg-gray-50 dark:bg-zinc-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer Details</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Till</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
              {processedOffers.map((offer) => {
                const isExpired = offer.validTill && new Date(offer.validTill) < new Date();
                
                return (
                  <tr key={offer._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-black dark:text-white">{offer.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md truncate" title={offer.description}>
                        {offer.description}
                      </div>
                      <div className="text-xs text-blue-500 mt-1 truncate max-w-md">
                        <a href={offer.url} target="_blank" rel="noopener noreferrer">{offer.url}</a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {offer.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle className="w-3 h-3 mr-1" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                          <XCircle className="w-3 h-3 mr-1" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {offer.validTill ? (
                        <div className={isExpired ? "text-red-500 font-medium" : ""}>
                          {format(new Date(offer.validTill), "MMM d, yyyy h:mm a")}
                          {isExpired && <span className="ml-2 text-xs">(Expired)</span>}
                        </div>
                      ) : (
                        <span className="text-gray-400">No expiration</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Link 
                        href={`/admin/offers/${offer._id}`} 
                        className="text-blue-600 hover:text-blue-900 inline-flex items-center mr-4"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(offer._id)} 
                        disabled={isDeleting}
                        className="text-red-600 hover:text-red-900 inline-flex items-center disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {processedOffers.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                    No offers found. {searchQuery && "Try a different search term."}
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
