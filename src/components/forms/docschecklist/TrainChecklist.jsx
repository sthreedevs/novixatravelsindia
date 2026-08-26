const TrainChecklist = () => {
  const checklistCategories = [
    {
      title: "Any one of them",
      items: ["Aadhar Card", "Passport"],
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

export default TrainChecklist;
