import React from "react";
import AdminsTableClient from "./AdminsTableClient";
import { getAdmins } from "@/lib/actions/admin/admin.actions";

export const metadata = {
  title: "Manage Admins - Novixa Travels Admin",
  description: "Manage admin accounts",
};

export default async function AdminsPage() {
  const result = await getAdmins();
  const admins = result.success ? result.admins : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage Admins
        </h1>
      </div>

      <AdminsTableClient initialAdmins={admins} />
    </div>
  );
}
