import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllESims } from "@/lib/services/esim.service";
import { Button } from "@/components/ui/button";
import ESimsTableClient from "./ESimsTableClient";

export const metadata = {
  title: "Manage eSIM Plans | Admin",
};

export default async function AdminESimsPage() {
  const esims = await getAllESims();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          eSIM Plans
        </h1>
        <Link href="/admin/esims/new">
          <Button className="bg-[#BFA181] hover:bg-[#a68c70] text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add eSIM Plan
          </Button>
        </Link>
      </div>

      <ESimsTableClient initialESims={esims} />
    </div>
  );
}
