"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Share2, Check, Copy, Tag, Sparkles } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function BlogContentSections({ blog }) {
  const [copied, setCopied] = useState(false);

  if (!blog) return null;

  const sections = Array.isArray(blog.content) ? blog.content : [];
  const tags = Array.isArray(blog.tags) ? blog.tags : [];
  const authorName = blog.author || "Novixa Travels India";
  const authorInitial = authorName.charAt(0).toUpperCase();

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareTitle = encodeURIComponent(blog.title || "Travel Story by Novixa Travels India");

  return (
    <div className="w-full space-y-12 lg:space-y-16">
      {/* 1. Featured Header Image (Matching Reference Screenshot 2) */}
      {blog.thumbnail && (
        <div className="relative aspect-[16/9] sm:aspect-[21/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800 shadow-[0_12px_40px_rgba(0,0,0,0.6)] group">
          <Image
            src={blog.thumbnail}
            alt={blog.title || "Featured Destination"}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 75vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-7 text-xs sm:text-sm text-zinc-300 font-medium flex items-center gap-2 drop-shadow-md">
            <Sparkles className="w-4 h-4 text-[#deb06c]" />
            <span>Featured Destination &amp; Experience</span>
          </div>
        </div>
      )}

      {/* 2. Structured Sections Loop (Section Title + Text Content + Optional Image) */}
      <div className="space-y-14 sm:space-y-16">
        {sections.map((section, idx) => {
          // Split multiline descriptions into structured paragraphs
          const paragraphs = (section.description || "")
            .split(/\r?\n/)
            .map((p) => p.trim())
            .filter(Boolean);

          return (
            <article
              key={section._id || idx}
              id={`section-${idx}`}
              className="scroll-mt-32 space-y-5 border-b border-zinc-800/80 pb-12 sm:pb-14 last:border-b-0"
            >
              {/* Section Header */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-bold text-white tracking-tight leading-snug">
                  {section.title}
                </h2>
              </div>

              {/* Text Content (Paragraphs and bullet lists) */}
              <div className="text-zinc-300 text-base sm:text-[17px] leading-relaxed space-y-4">
                {paragraphs.map((p, pIdx) => {
                  // If line starts with dash or bullet or numbered list
                  if (p.startsWith("- ") || p.startsWith("• ") || p.startsWith("* ")) {
                    return (
                      <div key={pIdx} className="flex items-start gap-3 pl-2 sm:pl-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#deb06c] mt-2.5 shrink-0" />
                        <p className="text-zinc-200">{p.replace(/^[-•*]\s*/, "")}</p>
                      </div>
                    );
                  }
                  return (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  );
                })}
              </div>

              {/* Optional Section Image */}
              {section.image && (
                <div className="pt-3">
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-xl bg-zinc-900 group">
                    <Image
                      src={section.image}
                      alt={section.title || "Section visual"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 75vw"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <p className="text-xs text-zinc-500 italic mt-2 text-center">
                    {section.title}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* 3. Article Footer: Tags Pill List */}
      {tags.length > 0 && (
        <div className="pt-6 border-t border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#deb06c]">
            <Tag className="w-4 h-4" />
            <span>Related Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#deb06c]/40 text-zinc-300 text-xs font-medium transition-colors"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 4. Social Sharing Bar */}
      <div className="bg-[#11131a] rounded-2xl border border-zinc-800 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-2.5">
          <Share2 className="w-5 h-5 text-[#deb06c]" />
          <div>
            <h4 className="text-sm font-bold text-white">Found this guide helpful?</h4>
            <p className="text-xs text-zinc-400">Share with fellow travelers and planning groups</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on WhatsApp"
            className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-[#25D366] text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200"
          >
            <FaWhatsapp className="w-4 h-4" />
          </a>

          {/* Twitter / X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on X"
            className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-black text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 border border-transparent hover:border-zinc-700"
          >
            <FaXTwitter className="w-4 h-4" />
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
            className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-[#1877F2] text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200"
          >
            <FaFacebookF className="w-3.5 h-3.5" />
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on LinkedIn"
            className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-[#0A66C2] text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200"
          >
            <FaLinkedinIn className="w-3.5 h-3.5" />
          </a>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            title="Copy link"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-zinc-800 hover:bg-[#deb06c] text-zinc-300 hover:text-black text-xs font-semibold transition-all duration-200 ml-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* 5. Author Bio Card */}
      <div className="bg-[#11131a] rounded-2xl border border-zinc-800 p-6 sm:p-7 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-lg">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#deb06c] to-[#8b6b35] text-black font-serif font-bold text-2xl flex items-center justify-center shrink-0 shadow-md">
          {authorInitial}
        </div>
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h3 className="text-lg font-bold text-white">{authorName}</h3>
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#deb06c] bg-[#deb06c]/10 border border-[#deb06c]/30 px-2.5 py-0.5 rounded-full w-fit mx-auto sm:mx-0">
              Official Travel Advisor
            </span>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
            Passionate travel curators at Novixa Travels India crafting bespoke itineraries, hotel recommendations, and seamless global travel experiences for individuals, couples, and families across the globe.
          </p>
        </div>
      </div>
    </div>
  );
}

