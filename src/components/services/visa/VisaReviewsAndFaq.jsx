"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Star } from "lucide-react";

export default function VisaReviewsAndFaq({ reviews = [], faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-[#fcfcfd] text-zinc-900 py-10 sm:py-12 lg:py-14 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: What Our Clients Say (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#0b1325]">
                What Our Clients Say
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Real experiences. Happy travellers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 pt-2">
              {reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-zinc-200/80 rounded-2xl p-3.5 sm:p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Quote */}
                  <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                    &ldquo;{rev.text}&rdquo;
                  </p>

                  <div>
                    {/* User Info */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-zinc-200">
                        <Image
                          src={rev.avatar}
                          alt={rev.name}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div className="leading-tight">
                        <div className="font-sans font-bold text-xs text-zinc-900">
                          {rev.name}
                        </div>
                        <div className="text-[10px] text-zinc-400">
                          {rev.location}
                        </div>
                      </div>
                    </div>

                    {/* 5 Stars */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-[#deb06c] text-[#deb06c]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Frequently Asked Questions (lg:col-span-6) */}
          <div className="lg:col-span-6">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#0b1325] mb-4">
              Frequently Asked Questions
            </h2>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.id || idx}
                    className="border border-zinc-200/90 rounded-xl overflow-hidden bg-white shadow-xs transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between py-2.5 px-3.5 sm:py-3 sm:px-4 text-left font-semibold text-xs sm:text-[13px] text-zinc-800 hover:text-[#b88636] transition-colors cursor-pointer"
                    >
                      <span className="pr-3 leading-snug">{faq.question}</span>
                      <span className="shrink-0">
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5 text-[#deb06c]" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 text-zinc-400" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-3.5 sm:px-4 pb-3 pt-1 text-[11px] sm:text-xs text-zinc-500 leading-relaxed border-t border-zinc-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
