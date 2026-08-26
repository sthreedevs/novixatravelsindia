"use client";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteDestination } from "@/lib/actions/admin/destinations.actions";
import { toast } from "react-toastify";

export default function DeleteDestinationButton({ id, title }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${title}? This cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await deleteDestination(id);
      if (res.success) {
        toast.success(`${title} deleted successfully`);
      } else {
        toast.error(res.error || "Failed to delete destination");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-900 dark:hover:text-red-400 inline-flex items-center disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4 mr-1" />
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
