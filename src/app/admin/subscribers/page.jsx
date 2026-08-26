import React from "react";
import { getAllSubscribers } from "@/lib/services/subscriber.service";
import SubscribersTableClient from "./SubscribersTableClient";

export const metadata = {
  title: "Manage Subscribers | Admin",
};

export default async function AdminSubscribersPage() {
  const subscribers = await getAllSubscribers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Newsletter Subscribers
        </h1>
      </div>

      <SubscribersTableClient initialSubscribers={subscribers} />
    </div>
  );
}
