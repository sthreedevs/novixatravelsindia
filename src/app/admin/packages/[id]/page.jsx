import React from "react";
import { getPackageById } from "@/lib/services/package.service";
import EditPackageClient from "./EditPackageClient";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Package | Admin",
};

export default async function EditPackagePage({ params }) {
  const { id } = await params;
  
  const pkg = await getPackageById(id);

  if (!pkg) {
    notFound();
  }

  return <EditPackageClient pkg={pkg} />;
}
