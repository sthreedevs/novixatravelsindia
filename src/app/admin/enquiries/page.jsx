import React from "react";
import EnquiriesClient from "./EnquiriesClient";
import { getAllEnquiries } from "@/lib/actions/enquiry.js";

export const metadata = {
  title: "Admin Enquiries | Novixa Travels",
};

export default async function EnquiriesPage() {
  const allEnquiries = await getAllEnquiries();

  return <EnquiriesClient initialData={allEnquiries} />;
}
