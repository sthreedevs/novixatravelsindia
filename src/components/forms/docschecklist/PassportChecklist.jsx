const PassportChecklist = () => {
  const checklistCategories = [
    {
      title: "Fresh Application",
      items: [
        "Proof of Address (e.g., Aadhaar Card, Electricity Bill, Water Bill, Telephone Bill, Rent Agreement, Voter ID, Gas Connection Bill, Bank Passbook, Spouse’s Passport, Parent’s Passport for minors)",
        "Proof of Date of Birth (e.g., Birth Certificate, Aadhaar Card, PAN Card, School Leaving Certificate, Matriculation Certificate)",
        "Identity Proof (e.g., Aadhaar Card, PAN Card, Voter ID, Driving License)",
        "Recent Passport-Sized Photographs (4.5 cm x 3.5 cm, white background)",
        "Annexure F (Declaration by applicant, if applicable)",
        "Annexure G (For minors, if applicable)",
      ],
    },
    {
      title: "Tatkal Application",
      items: [
        "Proof of Address (e.g., Aadhaar Card, Electricity Bill, Water Bill, Telephone Bill, Rent Agreement, Voter ID, Gas Connection Bill, Bank Passbook, Spouse’s Passport, Parent’s Passport for minors)",
        "Proof of Date of Birth (e.g., Birth Certificate, Aadhaar Card, PAN Card, School Leaving Certificate, Matriculation Certificate)",
        "Identity Proof (e.g., Aadhaar Card, PAN Card, Voter ID, Driving License)",
        "Recent Passport-Sized Photographs (4.5 cm x 3.5 cm, white background)",
        "Annexure E (Tatkal declaration)",
        "Verification Certificate (Annexure F) or three documents from specified list (e.g., Aadhaar, Voter ID, PAN, Bank Passbook)",
      ],
    },
    {
      title: "Re-Issue",
      items: [
        "Proof of Address (e.g., Aadhaar Card, Electricity Bill, Water Bill, Telephone Bill, Rent Agreement, Voter ID, Gas Connection Bill, Bank Passbook, Spouse’s Passport, Parent’s Passport for minors)",
        "Proof of Date of Birth (e.g., Birth Certificate, Aadhaar Card, PAN Card, School Leaving Certificate, Matriculation Certificate)",
        "Identity Proof (e.g., Aadhaar Card, PAN Card, Voter ID, Driving License)",
        "Recent Passport-Sized Photographs (4.5 cm x 3.5 cm, white background)",
        "Original Previous Passport (for verification or cancellation)",
        "Self-attested photocopy of first and last pages of previous passport",
      ],
    },
    {
      title: "Correction",
      items: [
        "Proof of Address (e.g., Aadhaar Card, Electricity Bill, Water Bill, Telephone Bill, Rent Agreement, Voter ID, Gas Connection Bill, Bank Passbook, Spouse’s Passport, Parent’s Passport for minors)",
        "Proof of Date of Birth (e.g., Birth Certificate, Aadhaar Card, PAN Card, School Leaving Certificate, Matriculation Certificate)",
        "Identity Proof (e.g., Aadhaar Card, PAN Card, Voter ID, Driving License)",
        "Recent Passport-Sized Photographs (4.5 cm x 3.5 cm, white background)",
        "Original Previous Passport",
        "Marriage Certificate or Divorce Decree (for name change due to marriage/divorce)",
        "Gazette Notification or Court Order (for other name changes)",
      ],
    },
    {
      title: "Lost/Damage",
      items: [
        "Proof of Address (e.g., Aadhaar Card, Electricity Bill, Water Bill, Telephone Bill, Rent Agreement, Voter ID, Gas Connection Bill, Bank Passbook, Spouse’s Passport, Parent’s Passport for minors)",
        "Proof of Date of Birth (e.g., Birth Certificate, Aadhaar Card, PAN Card, School Leaving Certificate, Matriculation Certificate)",
        "Identity Proof (e.g., Aadhaar Card, PAN Card, Voter ID, Driving License)",
        "Recent Passport-Sized Photographs (4.5 cm x 3.5 cm, white background)",
        "Original Previous Passport (if available)",
        "Police Report (FIR copy for lost passport)",
        "Annexure F (Affidavit for lost/damaged passport)",
      ],
    },
    {
      title: "Special Cases (If Applicable)",
      items: [
        "Proof of Address (e.g., Aadhaar Card, Electricity Bill, Water Bill, Telephone Bill, Rent Agreement, Voter ID, Gas Connection Bill, Bank Passbook, Spouse’s Passport, Parent’s Passport for minors)",
        "Proof of Date of Birth (e.g., Birth Certificate, Aadhaar Card, PAN Card, School Leaving Certificate, Matriculation Certificate)",
        "Identity Proof (e.g., Aadhaar Card, PAN Card, Voter ID, Driving License)",
        "Recent Passport-Sized Photographs (4.5 cm x 3.5 cm, white background)",
        "Annexure C/D (For minors, declaration by parents/guardians)",
        "Annexure H (For government servants or PSU employees seeking NOC)",
        "Annexure I (Prior intimation letter for government servants)",
        "Annexure J (Specimen verification certificate for Tatkal or other cases)",
        "Annexure K (Specimen affidavit for change in name/date of birth)",
      ],
    },
  ];

  return (
    <div className="p-4  overflow-scroll no-scrollbar max-h-[60vh]">
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

export default PassportChecklist;
