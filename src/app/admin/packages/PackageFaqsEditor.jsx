"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, HelpCircle, ArrowUp, ArrowDown } from "lucide-react";

/**
 * Shared dynamic FAQ builder for Package creation and editing in the Admin Panel.
 * FAQs added here are rendered dynamically on the specific package page via the shared FAQ+CTA component.
 */
export default function PackageFaqsEditor({ faqs = [], onChange }) {
  const handleAddFaq = () => {
    onChange([...faqs, { question: "", answer: "" }]);
  };

  const handleFieldChange = (index, field, value) => {
    const updated = faqs.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const handleRemoveFaq = (index) => {
    onChange(faqs.filter((_, idx) => idx !== index));
  };

  const handleMove = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= faqs.length) return;
    const updated = [...faqs];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    onChange(updated);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#deb06c]" />
            <span>Package Frequently Asked Questions (FAQs)</span>
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Only FAQs added here will appear on this specific package page (no static FAQs are shown).
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddFaq}
          className="cursor-pointer border-[#deb06c] text-[#8a5812] hover:bg-[#deb06c]/10 shrink-0"
        >
          <Plus className="w-4 h-4 mr-1" /> Add FAQ
        </Button>
      </div>

      {faqs.length === 0 ? (
        <div className="text-center py-10 px-4 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl space-y-3">
          <HelpCircle className="w-8 h-8 text-zinc-400 mx-auto" />
          <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            No FAQs added for this package yet.
          </div>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Click &quot;Add FAQ&quot; to add package-specific questions and answers. Leave empty if this package should not display an FAQ section.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddFaq}
            className="cursor-pointer border-[#deb06c] text-[#8a5812] hover:bg-[#deb06c]/10"
          >
            <Plus className="w-4 h-4 mr-1" /> Add First FAQ
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-5 bg-gray-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-3.5 relative"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#fcf2df] text-[#8a5812] text-xs font-bold">
                  FAQ #{index + 1}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMove(index, -1)}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 1)}
                    disabled={index === faqs.length - 1}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(index)}
                    className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                    title="Remove FAQ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Question *
                </label>
                <Input
                  value={faq.question || ""}
                  onChange={(e) => handleFieldChange(index, "question", e.target.value)}
                  placeholder="e.g. What is the best time to book this package?"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                  Answer *
                </label>
                <textarea
                  value={faq.answer || ""}
                  onChange={(e) => handleFieldChange(index, "answer", e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm h-24 focus:outline-none focus:border-[#deb06c]"
                  placeholder="Provide a detailed answer for travelers viewing this package..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

