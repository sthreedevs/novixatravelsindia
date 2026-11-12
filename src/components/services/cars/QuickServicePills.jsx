"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { quickServicePills } from "@/data/services/cars.data";

export default function QuickServicePills({ items = quickServicePills }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-6 sm:py-8 w-full px-4 lg:px-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="group p-5 sm:p-6 rounded-2xl bg-[#0c0e15] border border-zinc-800/80 hover:border-[#deb06c]/50 transition-all duration-300 cursor-pointer shadow-lg flex items-center gap-4"
          >
            {/* Icon circle */}
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#deb06c]/40 transition-all">
              {item.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#deb06c] transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                {item.desc}
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#deb06c] font-medium mt-2 group-hover:translate-x-0.5 transition-transform">
                <span>{item.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
