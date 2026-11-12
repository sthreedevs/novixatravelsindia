"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Plus, X, Briefcase } from "lucide-react";

export const STANDARD_TRAVEL_TYPES = [
  "Honeymoon",
  "Family",
  "Adventure",
  "Luxury",
  "Cultural",
];

export default function TravelTypeMultiSelect({
  value = [],
  onChange,
  label = "Travel Type *",
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const containerRef = useRef(null);

  const selectedList = Array.isArray(value) ? value : [];

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (type) => {
    if (selectedList.includes(type)) {
      onChange(selectedList.filter((item) => item !== type));
    } else {
      onChange([...selectedList, type]);
    }
  };

  const handleRemove = (type, e) => {
    e?.stopPropagation();
    onChange(selectedList.filter((item) => item !== type));
  };

  const handleAddCustom = (e) => {
    e?.preventDefault();
    const trimmed = customInput.trim();
    if (trimmed && !selectedList.includes(trimmed)) {
      onChange([...selectedList, trimmed]);
      setCustomInput("");
    }
  };

  return (
    <div className="space-y-1.5" ref={containerRef}>
      <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Dropdown Trigger Box */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-full min-h-[42px] px-3.5 py-2 rounded-lg border text-left text-sm flex items-center justify-between gap-2 transition-colors cursor-pointer ${
            isOpen
              ? "border-[#deb06c] ring-2 ring-[#deb06c]/20 bg-white dark:bg-zinc-800"
              : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 hover:border-zinc-400 dark:hover:border-zinc-600"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Briefcase className="w-4 h-4 text-[#deb06c] shrink-0" />
            <span className="text-zinc-700 dark:text-zinc-300 truncate">
              {selectedList.length === 0
                ? "Select Travel Type(s)..."
                : `${selectedList.length} travel type${
                    selectedList.length > 1 ? "s" : ""
                  } selected`}
            </span>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#deb06c]" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-2.5 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider px-2 py-1">
              Select One or More Travel Types
            </div>

            <div className="space-y-1 my-1">
              {STANDARD_TRAVEL_TYPES.map((type) => {
                const isSelected = selectedList.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleToggle(type)}
                    className={`w-full px-3 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#fcf2df] text-[#8a5812] dark:bg-[#deb06c]/20 dark:text-[#deb06c] font-semibold"
                        : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span>{type}</span>
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#deb06c] border-[#deb06c] text-zinc-950"
                          : "border-zinc-400 dark:border-zinc-600 bg-transparent"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Add Custom Type */}
            <div className="mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustom();
                  }
                }}
                placeholder="Custom type (e.g. Wellness)..."
                className="flex-1 px-2.5 py-1 text-xs rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:outline-none focus:border-[#deb06c]"
              />
              <button
                type="button"
                onClick={handleAddCustom}
                disabled={!customInput.trim()}
                className="px-2.5 py-1 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-[#deb06c] hover:text-black text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selected Tags Display */}
      {selectedList.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {selectedList.map((type) => (
            <span
              key={type}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#fcf2df] text-[#8a5812] border border-[#edd7a6] dark:bg-[#deb06c]/15 dark:text-[#deb06c] dark:border-[#deb06c]/30"
            >
              <span>{type}</span>
              <button
                type="button"
                onClick={(e) => handleRemove(type, e)}
                className="hover:text-red-600 transition-colors cursor-pointer"
                aria-label={`Remove ${type}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

