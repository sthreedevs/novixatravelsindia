"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export default function ServiceTestimonialsAndFaq({
  reviews = [],
  faqs = [],
  reviewsTitle = "What Our Clients Say",
  reviewsSubtitle = "Real stories. Happy travellers.",
  faqTitle = "Frequently Asked Questions",
  faqSubtitle = "Everything you need to know about our services.",
}) {
  const [openFaq, setOpenFaq] = useState(0);
  const hasReviews = Boolean(reviews && reviews.length > 0);

  return (
    <section className="py-14 sm:py-16 lg:py-20 w-full px-4 lg:px-10">
      <div className={`grid grid-cols-1 ${hasReviews ? "lg:grid-cols-12 gap-12" : "max-w-4xl mx-auto"} items-start`}>
        {/* Left Column: Testimonials (if present) */}
        {hasReviews && (
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {reviewsTitle}
              </h2>
              {reviewsSubtitle && (
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  {reviewsSubtitle}
                </p>
              )}
            </div>

          <div className="space-y-4">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow"
              >
                <p className="text-xs sm:text-sm text-zinc-300 italic mb-4 leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {rev.avatar && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-700 shrink-0">
                        <Image
                          src={rev.avatar}
                          alt={rev.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {rev.name}
                      </h4>
                      {rev.route && (
                        <p className="text-[11px] text-zinc-400">{rev.route}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-[#deb06c]">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#deb06c]" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}

        {/* Right Column: FAQs */}
        <div className={`${hasReviews ? "lg:col-span-6" : "w-full"} space-y-6`}>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {faqTitle}
            </h2>
            {faqSubtitle && (
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                {faqSubtitle}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-zinc-200 hover:text-[#deb06c] transition"
                  >
                    <span>{faq.question}</span>
                    <span className="text-[#deb06c] shrink-0 font-bold text-lg">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-3">
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
