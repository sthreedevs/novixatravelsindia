"use client";

import React, { useState, useEffect } from "react";
import { ListOrdered, ChevronDown, ChevronRight } from "lucide-react";

export default function BlogTableOfContents({ sections = [] }) {
  const [activeId, setActiveId] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((_, idx) => {
      const el = document.getElementById(`section-${idx}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  if (!sections || sections.length === 0) return null;

  const handleScrollTo = (e, idx) => {
    e.preventDefault();
    const el = document.getElementById(`section-${idx}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(`section-${idx}`);
      setIsMobileOpen(false);
    }
  };

  return (
    <nav className="w-full" aria-label="Table of contents">
      {/* Mobile Collapsible TOC Drawer/Pill */}
      <div className="lg:hidden mb-8 bg-[#11131a] border border-zinc-800 rounded-2xl p-4 shadow-lg">
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-2.5">
            <ListOrdered className="w-4 h-4 text-[#deb06c]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#deb06c]">
              Table of Contents ({sections.length} Sections)
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
              isMobileOpen ? "rotate-180 text-[#deb06c]" : ""
            }`}
          />
        </button>

        {isMobileOpen && (
          <ul className="mt-4 pt-3 border-t border-zinc-800/80 space-y-2.5 max-h-72 overflow-y-auto pr-2">
            {sections.map((section, idx) => {
              const isActive = activeId === `section-${idx}`;
              return (
                <li key={section._id || idx}>
                  <a
                    href={`#section-${idx}`}
                    onClick={(e) => handleScrollTo(e, idx)}
                    className={`block text-xs sm:text-sm py-1 transition-colors ${
                      isActive
                        ? "text-[#deb06c] font-semibold pl-2 border-l-2 border-[#deb06c]"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {section.title}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Desktop Sticky Table of Contents Card (Matching Reference Screenshot 1 & 2) */}
      <div className="hidden lg:block w-full bg-[#11131a]/95 backdrop-blur-md rounded-2xl border border-zinc-800/90 p-5 xl:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800/80">
          <ListOrdered className="w-4 h-4 text-[#deb06c]" />
          <h2 className="text-xs font-bold tracking-[0.2em] text-[#deb06c] uppercase">
            Table of Contents
          </h2>
        </div>

        <ul className="space-y-1.5 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 no-scrollbar">
          {sections.map((section, idx) => {
            const isActive = activeId === `section-${idx}`;
            return (
              <li key={section._id || idx} className="text-left">
                <a
                  href={`#section-${idx}`}
                  onClick={(e) => handleScrollTo(e, idx)}
                  className={`group flex items-start gap-2.5 text-xs sm:text-[13px] leading-snug p-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-[#deb06c] font-semibold bg-[#181a24] border-l-2 border-[#deb06c] shadow-xs"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                  }`}
                >
                  {isActive ? (
                    <ChevronDown className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#deb06c]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-zinc-600 group-hover:text-zinc-400" />
                  )}
                  <span className="line-clamp-2">{section.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

