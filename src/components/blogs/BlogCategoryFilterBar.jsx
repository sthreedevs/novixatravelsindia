"use client";

import React from "react";
import { Sparkles, Tag } from "lucide-react";

export default function BlogCategoryFilterBar({
  categories = ["all"],
  activeCategory = "all",
  onSelectCategory,
}) {
  if (!Array.isArray(categories) || categories.length <= 1) {
    return null;
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pt-8 sm:pt-10 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((catKey) => {
            const isAll = catKey === "all";
            const label = isAll ? "All Blogs" : catKey;
            const isActive =
              activeCategory === catKey ||
              (isAll && (!activeCategory || activeCategory === "all"));

            return (
              <button
                key={catKey}
                type="button"
                onClick={() => onSelectCategory(catKey)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#ffe7b8] via-[#deb06c] to-[#b37f28] text-zinc-950 font-bold shadow-lg shadow-[#deb06c]/20 scale-[1.02]"
                    : "bg-zinc-900/90 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 shadow-xs hover:bg-zinc-800"
                }`}
              >
                {isAll ? (
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-zinc-950" />
                ) : (
                  <Tag
                    className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                      isActive ? "text-zinc-950" : "text-[#deb06c]"
                    }`}
                  />
                )}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
