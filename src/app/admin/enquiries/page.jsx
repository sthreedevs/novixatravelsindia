import React from "react";
import { getContactEnquiries, getBookingEnquiries, getAllServiceEnquiries } from "@/lib/services/enquiry.service";
import EnquiriesDashboardClient from "./EnquiriesDashboardClient";

export const metadata = {
  title: "Enquiries Dashboard | Admin",
};

export default async function AdminEnquiriesPage() {
  const [contacts, bookings, services] = await Promise.all([
    getContactEnquiries(),
    getBookingEnquiries(),
    getAllServiceEnquiries()
  ]);

  return <EnquiriesDashboardClient contacts={contacts} bookings={bookings} services={services || {}} />;
}
