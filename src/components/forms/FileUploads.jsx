"use client";
import React, { useState } from "react";
import { X } from "lucide-react"; // Optional: for remove icon

const FileUploads = ({ data, setData }) => {
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    const existingFiles = data.files || [];
    setData({ ...data, files: [...existingFiles, ...newFiles] });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleRemove = (index) => {
    const updatedFiles = [...(data.files || [])];
    updatedFiles.splice(index, 1);
    setData({ ...data, files: updatedFiles });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className={`min-h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition ${
          dragging
            ? "border-blue-400 bg-blue-50 dark:bg-blue-900"
            : "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black"
        } p-6`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleInputChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer text-center">
          <p className="text-lg font-semibold">
            {dragging ? "Drop files here..." : "Drag and drop files or click to select"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Supports multiple files</p>
        </label>
      </div>

      {data.files?.length > 0 && (
        <div className="mt-4 grid gap-2">
          {data.files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 dark:bg-neutral-800 px-4 py-2 rounded-md"
            >
              <span className="text-sm truncate max-w-[80%]">{file.name}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploads;
