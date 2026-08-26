"use client";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteSubscriber } from "@/lib/actions/admin/subscribers.actions";
import { toast } from "react-toastify";

export default function DeleteSubscriberButton({ id, email }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${email}?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await deleteSubscriber(id);
      if (res.success) {
        toast.success(`Subscriber deleted successfully`);
      } else {
        toast.error(res.error || "Failed to delete subscriber");
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
