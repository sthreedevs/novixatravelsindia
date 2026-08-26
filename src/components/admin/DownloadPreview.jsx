import React from "react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const DownloadPreview = ({ data, setOpen }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No data to preview.</p>;
  }

  const headers = Object.keys(data[0]);

  const handleDownloadCSV = () => {
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((field) => `"${row[field] ?? ""}"`).join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    data.forEach((entry, index) => {
      const startY = index === 0 ? 20 : doc.lastAutoTable.finalY + 10 || 20;
      doc.text(`Entry ${index + 1}`, 14, startY);

      let y = startY + 6;

      Object.entries(entry).forEach(([key, value]) => {
        doc.text(`${key}: ${value ?? ""}`, 14, y);
        y += 7;
      });

      // Add page if getting close to bottom
      if (y > 270 && index !== data.length - 1) {
        doc.addPage();
      }
    });

    doc.save("data.pdf");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="p-4 border h-90 md:min-w-md lg:min-w-lg rounded-md shadow max-w-md bg-neutral-950 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 items-center md:justify-end">
          <Button onClick={handleDownloadCSV}>Download CSV</Button>
          <Button onClick={handleDownloadPDF}>Download PDF</Button>
          <Button onClick={() => setOpen(null)}>
            <X size={16} />
          </Button>
        </div>
        <div className="w-full text-left border-collapse mb-4 overflow-y-scroll  no-scrollbar">
          {data.map((row, i) => (
            <div key={i} className="even:bg-gray-50">
              {headers.map((key, j) => {
                if (key === "documents") {
                  return (
                    <div key={j} className="p-2 border-b">
                      {row[key].map((doc, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <strong>{key}:</strong> {doc.name ?? ""}
                          <a
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline cursor-pointer"
                          >
                            View Document
                          </a>
                        </div>
                      ))}
                    </div>
                  );
                } else {
                  return (
                    <div key={j} className="p-2 border-b">
                      <strong>{key}:</strong> {row[key] ?? ""}
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadPreview;
