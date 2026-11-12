"use client";

import React, { useState, useEffect } from "react";
import SingleBlogHeroSection from "./SingleBlogHeroSection";
import BlogTableOfContents from "./BlogTableOfContents";
import BlogContentSections from "./BlogContentSections";
import BlogCommentsSection from "./BlogCommentsSection";
import RelatedBlogsSection from "./RelatedBlogsSection";
import { ChevronUp } from "lucide-react";

export function SingleBlogPageClient({ initialBlog, recentBlogs = [] }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.pageYOffset > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!initialBlog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-[#07080c] text-white">
        <h2 className="text-2xl font-serif font-bold mb-3">Story Not Found</h2>
        <p className="text-zinc-400 text-sm mb-6">
          The requested travel tale could not be found or may have been updated.
        </p>
      </div>
    );
  }

  const sections = Array.isArray(initialBlog.content) ? initialBlog.content : [];

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-[#deb06c] selection:text-black">
      {/* 1. Shared Dark Luxury Hero Section (Matching Reference Screenshot 1) */}
      <SingleBlogHeroSection blog={initialBlog} />

      {/* 2. Main Content Wrapper: Two-column layout with Table of Contents (Matching Reference Screenshot 2) */}
      <main className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
            {/* Left Column: Sticky Table of Contents on Desktop, Collapsible on Mobile */}
            <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 self-start z-20">
              <BlogTableOfContents sections={sections} />
            </aside>

            {/* Right Column: Structured Sections (with Title, Text, Optional Image, Tags, Share, Bio) */}
            <div className="lg:col-span-8 xl:col-span-9 min-w-0">
              <BlogContentSections blog={initialBlog} />

              {/* Dynamic Comments Section */}
              <BlogCommentsSection
                blogId={initialBlog._id || initialBlog.id}
                initialComments={initialBlog.comments || []}
              />
            </div>
          </div>

          {/* 3. Keep Exploring / Related Stories */}
          <RelatedBlogsSection blogs={recentBlogs} />
        </div>
      </main>

      {/* 4. Floating Back to Top Button (Matching Reference Screenshot 2) */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          title="Back to top"
          className="fixed bottom-6 right-20 sm:right-24 z-40 w-11 h-11 rounded-full bg-[#11131a] hover:bg-[#deb06c] text-[#deb06c] hover:text-black border border-zinc-700/80 hover:border-[#deb06c] shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.2]" />
        </button>
      )}
    </div>
  );
}

export default SingleBlogPageClient;
