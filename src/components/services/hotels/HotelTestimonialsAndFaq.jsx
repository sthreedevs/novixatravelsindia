"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Plus, Minus } from "lucide-react";
import {
  hotelClientReviews,
  hotelFaqs,
} from "@/data/services/hotels.data";

export default function HotelTestimonialsAndFaq() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <section className="w-full bg-[#07080c] text-white py-14 sm:py-16 lg:py-20 border-b border-white/5">
      <div className="w-full px-4 lg:px-10 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-[#deb06c] text-[11px] font-bold tracking-[0.2em] uppercase block mb-1.5">
              FAQS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1.5">
              Everything you need to know about booking hotels with us.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            {hotelFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#0d1017] rounded-xl border border-white/10 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-white hover:text-[#deb06c] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-zinc-300">
                      {isOpen ? (
                        <Minus className="w-3 h-3" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-zinc-300 text-xs sm:text-[13px] leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
