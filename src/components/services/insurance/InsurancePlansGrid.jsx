"use client";

import React from "react";
import { Check, Luggage, ShieldCheck, Briefcase } from "lucide-react";

export default function InsurancePlansGrid({
  plans = [],
  onSelectPlan,
}) {
  const getPlanIcon = (id) => {
    switch (id) {
      case "basic":
        return <Luggage className="w-6 h-6 text-[#deb06c] stroke-[2]" />;
      case "standard":
        return <ShieldCheck className="w-6 h-6 text-[#deb06c] stroke-[2]" />;
      case "premium":
        return <Briefcase className="w-6 h-6 text-[#deb06c] stroke-[2]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#deb06c] stroke-[2]" />;
    }
  };

  return (
    <section id="insurance-plans" className="py-12 sm:py-14 lg:py-16 bg-[#07080c] text-white border-b border-white/5">
      <div className="w-full px-4 lg:px-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-left mb-6 sm:mb-8">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Our Travel Insurance Plans
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Choose the plan that fits your travel style and budget.
          </p>
        </div>

        {/* 3 Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-300 shadow-xl ${
                  isPopular
                    ? "bg-[#0d1526] border-2 border-[#deb06c] shadow-[0_0_25px_rgba(222,176,108,0.12)] md:-translate-y-1"
                    : "bg-[#0c0e15] border border-zinc-800/80 hover:border-zinc-700"
                }`}
              >
                {/* Most Popular Badge (Only on Standard) */}
                {plan.badge && (
                  <div className="absolute -top-3 right-6">
                    <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#deb06c] to-[#d49e52] text-zinc-950 font-bold text-[10px] tracking-wide shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Card Header: Icon on Left, Title + Subtitle on Right */}
                  <div className="flex items-start gap-3.5 sm:gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#142342] border border-[#deb06c]/30 text-[#deb06c] flex items-center justify-center shrink-0 shadow-sm">
                      {getPlanIcon(plan.id)}
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                        {plan.desc}
                      </p>
                    </div>
                  </div>

                  {/* 3 Checklist Features */}
                  <ul className="space-y-2 mb-6 pt-1">
                    {plan.features?.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-200">
                        <Check className="w-4 h-4 text-[#deb06c] shrink-0 stroke-[2.5]" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Left-Aligned Compact Pill Button */}
                <div>
                  <button
                    onClick={() => onSelectPlan && onSelectPlan(plan.name)}
                    className={`inline-flex items-center gap-1.5 py-2 px-5 rounded-full text-xs transition-all cursor-pointer ${
                      isPopular
                        ? "bg-gradient-to-r from-[#deb06c] to-[#d49e52] hover:brightness-105 active:scale-[0.99] text-zinc-950 font-bold shadow-md shadow-[#deb06c]/20"
                        : "border border-zinc-700 hover:border-[#deb06c] text-white hover:text-[#deb06c] bg-white/5 hover:bg-white/10 font-semibold"
                    }`}
                  >
                    <span>{plan.buttonText || "View Details →"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
