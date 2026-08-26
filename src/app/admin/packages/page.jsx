import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllPackages } from "@/lib/services/package.service";
import { Button } from "@/components/ui/button";
import PackagesTableClient from "./PackagesTableClient";

export const metadata = {
  title: "Manage Packages | Admin",
};

export default async function AdminPackagesPage() {
  const packages = await getAllPackages();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Packages
        </h1>
        <Link href="/admin/packages/new">
          <Button className="bg-[#BFA181] hover:bg-[#a68c70] text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add Package
          </Button>
        </Link>
      </div>

      <PackagesTableClient initialPackages={packages} />
    </div>
  );
}
