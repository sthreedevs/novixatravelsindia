import React from "react";

const VisaChecklist = () => {
  const checklistCategories = [
    {
      title: "Tourist Visa",
      items: [
        "Valid Passport (must be valid for at least 6 months beyond the trip, with at least 2 blank pages)",
        "Completed Visa Application Form",
        "Passport-size Photo (1-2 recent photos meeting the country's requirements, face zoom, clean 35x45mm with white background, recent)",
        "Past 3-year Income Tax Returns",
        "Past 6-month Bank Statements",
        "Covering Letter",
        "Round-trip Flight Tickets",
        "Sponsor Details & Invitation Letter (if applicable)",
        "Hotel Booking Voucher (confirmed)",
        "Travel Health Insurance",
        "Travel Itinerary",
      ],
    },
    {
      title: "Business Visa",
      items: [
        "Valid Passport (must be valid for at least 6 months beyond the trip)",
        "Completed Visa Application Form",
        "Passport-size Photo (1-2 recent photos meeting the country's requirements, face zoom, clean 35x45mm with white background, recent)",
        "Business Invitation Letter from the company/organization in the destination country",
        "Letter from Your Employer (stating job title, length of employment, purpose of visit, confirming that you will return after the trip)",
        "Round-trip Flight Tickets",
        "Travel Itinerary",
        "Hotel Booking Voucher (confirmed)",
        "Recent 6-month Bank Statements",
        "Business Documents (if self-employed - business registration documents, tax documents, other proof of businness ownership.)",
        "Sponsor Details & Invitation Letter (if applicable)",
        "Travel Insurance",
      ],
    },
    {
      title: "Transit Visa",
      items: [
        "Valid Passport",
        "Completed Visa Application Form",
        "Confirmed Onward Ticket",
        "Visa for Final Destination (if required)",
        "Travel Itinerary",
        "Proof of Financial Means (if applicable)",
      ],
    },
  ];

  return (
    <div className="p-4 overflow-scroll no-scrollbar max-h-[60vh]">
      <h2 className="text-2xl font-bold mb-6">Required Document Checklist</h2>
      {checklistCategories.map((category, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            {category.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default VisaChecklist;
