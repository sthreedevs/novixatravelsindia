"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function ServiceCtaBanner({
  title = "Ready to Plan Your Next Trip?",
  description = "Get in touch with our travel experts and book your service today.",
  whatsAppText = "Chat on WhatsApp",
  whatsAppLink = "https://wa.me/916397574309?text=Hello%20Novixa%20Travels,%20I%20would%20like%20to%20request%20a%20quote.",
  formScrollText = "or fill the enquiry form on our website",
  onFormScroll,
}) {
  const handleScroll = () => {
    if (onFormScroll) {
      onFormScroll();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="py-14 bg-[#0a0d14] border-t border-zinc-800">
      <div className="w-full px-4 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {title}
          </h3>
          {description && (
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {whatsAppLink && (
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#deb06c] hover:bg-[#d49e52] text-zinc-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition"
            >
              <MessageCircle className="w-4 h-4 fill-zinc-900" />
              <span>{whatsAppText}</span>
            </a>
          )}

          {formScrollText && (
            <button
              type="button"
              onClick={handleScroll}
              className="text-xs text-zinc-400 hover:text-[#deb06c] underline underline-offset-4 transition cursor-pointer"
            >
              {formScrollText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
