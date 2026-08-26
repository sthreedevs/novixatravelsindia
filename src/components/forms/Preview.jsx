import { format } from "date-fns";
import React from "react";

const Preview = ({ data }) => {
  const { files = [], formData = {} } = data;

  const renderFormData = () => {
    return Object.entries(formData).map(([key, value]) => {
      if (value && typeof value === "object" && value.from && value.to) {
        // Display date range
        return (
          <div key={key} className="flex flex-col">
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              From:{" "}
              {value.from instanceof Date
                ? format(value.from, "yyyy-MM-dd")
                : value.from}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              To:{" "}
              {value.to instanceof Date
                ? format(value.to, "yyyy-MM-dd")
                : value.to}
            </p>
          </div>
        );
      }

      return (
        <div key={key} className="flex flex-col">
          <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {value || "-"}
          </p>
        </div>
      );
    });
  };

  const renderFileUploads = () => {
    return files.length > 0 ? (
      files.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-zinc-900 text-zinc-200 p-2 rounded"
        >
          <span className="truncate">
            {file.name} ({Math.round(file.size / 1024)} KB)
          </span>
        </div>
      ))
    ) : (
      <p className="text-zinc-600 dark:text-zinc-400">No files uploaded.</p>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 bg-black border border-neutral-700 rounded-lg p-6 text-white">
      <h2 className="text-xl font-bold text-zinc-200">
        Preview Your Information
      </h2>
      <div className="mt-4 space-y-4 overflow-y-auto no-scrollbar max-h-80 p-2">
        {renderFormData()}
        <div>
          <h3 className="text-lg font-semibold text-zinc-300">
            Uploaded Files
          </h3>
          <div className="flex flex-col space-y-2">{renderFileUploads()}</div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
