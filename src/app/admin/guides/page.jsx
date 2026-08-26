import React from "react";
import { getGuides } from "@/lib/actions/admin/guides.actions";
import GuidesTableClient from "./GuidesTableClient";

export const metadata = {
  title: "Manage Guides | Novixa Admin",
  description: "Manage tour guides",
};

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Guides</h1>
          <p className="text-sm text-gray-500 mt-1">Manage languages and pricing for tour guides.</p>
        </div>
      </div>
      
      <GuidesTableClient initialGuides={guides} />
    </div>
  );
}
