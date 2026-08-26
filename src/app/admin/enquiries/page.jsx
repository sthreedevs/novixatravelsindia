import React from "react";
import { getContactEnquiries, getBookingEnquiries } from "@/lib/services/enquiry.service";
import EnquiriesDashboardClient from "./EnquiriesDashboardClient";

export const metadata = {
  title: "Enquiries Dashboard | Admin",
};

export default async function AdminEnquiriesPage() {
  const [contacts, bookings] = await Promise.all([
    getContactEnquiries(),
    getBookingEnquiries()
  ]);

  return <EnquiriesDashboardClient contacts={contacts} bookings={bookings} />;
}
