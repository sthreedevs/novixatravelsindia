"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { toTitleCase } from "@/lib/utils";

export const TestimonialCard = ({ index, data }) => (
  <div
    style={{ marginTop: index % 2 == 0 ? "80px" : "" }}
    className="bg-zinc-100 border border-gray-200 shadow-md h-fit min-w-xs max-w-sm rounded-xl p-6 animate-scroll"
  >
    <div className="flex items-center gap-4 mb-4">
      <Image
        src={data.image || "/placeholder.jpg"}
        alt={data.name || "Testimonial"}
        width={48}
        height={48}
        className="rounded-full object-cover"
      />
      <div>
        <h4 className="text-md font-semibold text-gray-800">{data.name}</h4>
        <p className="text-sm text-gray-500">{data.designation}</p>
      </div>
    </div>
    <p className="text-gray-700 text-sm italic leading-relaxed line-clamp-4">
      “{data.review}”
    </p>
  </div>
);

export const DestinationCard = ({ data }) => {
  return (
    <Link href={`/destination/${data.name}`}>
      <div className="relative max-w-md border-2 border-opacity-50 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out transform-gpu hover:-translate-y-2">
        <div className="relative overflow-hidden rounded-lg border-2 border-opacity-30 h-72">
          <Image
            src={data.thumbnail || "/placeholder.jpg"}
            alt={data.name || "Destination"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transform hover:scale-110 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-between p-4 transition-opacity duration-300 hover:bg-opacity-20">
            <h1 className="text-2xl font-semibold tracking-wide leading-tight text-white">
              {toTitleCase(data.name)}
            </h1>
            <div className="flex gap-2 flex-wrap">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium border border-opacity-50 rounded-full hover:shadow-md hover:scale-110 transition-all duration-300 ease-in-out text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const TrendingPackages = ({ packages = [] }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.clientWidth * 0.7;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-black text-white py-16">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#4a4032]/90 hover:bg-[#6b604e] p-3 rounded-full shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory px-2 md:px-6"
        >
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="flex-shrink-0 bg-[#141414] rounded-3xl w-[80%] sm:w-[280px] md:w-[320px] lg:w-[350px] shadow-md border border-gray-800 hover:scale-[1.03] transition-transform duration-300 ease-in-out snap-start"
            >
              <div className="relative w-full h-56">
                <Image
                  src={pkg.thumbnail || "/placeholder.jpg"}
                  alt={pkg.title || "Package"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-t-3xl object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-[#bba477] mb-3 capitalize">
                  {pkg.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                  {pkg.description}
                </p>
                <div className="flex justify-between border-t border-b border-gray-700 py-3 mb-5 text-[#bba477] font-semibold text-sm md:text-base">
                  <span>{pkg.nights} Nights</span>
                  <span>{pkg.days} Days</span>
                </div>
                <p className="text-[#bba477] font-semibold mb-4 text-lg">
                 Starting From ₹{pkg.domesticPrice}
                </p>
                <Link
                  href={`/services/packages/${pkg.slug || pkg._id}`}
                  className="block bg-[#bba477] hover:bg-[#cbb982] text-black font-semibold rounded-xl px-6 py-2 w-full text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#4a4032]/90 hover:bg-[#6b604e] p-3 rounded-full shadow-lg"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export const BlogCarousel = ({ blogs = [] }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount =
      direction === "left"
        ? -scrollRef.current.clientWidth
        : scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="bg-black text-white py-10">
      <div className="relative max-w-7xl mx-auto px-4">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full z-10"
        >
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide scrollbar-none"
        >
          {blogs?.map((blog, idx) => (
            <div
              key={idx}
              className="min-w-[320px] md:min-w-[600px] relative rounded-xl overflow-hidden group"
            >
              <Image
                src={blog?.thumbnail || "/placeholder.jpg"}
                alt={blog?.title || "Blog Post"}
                width={600}
                height={400}
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                <p className="text-yellow-300 font-semibold mb-2">
                  By {blog?.author || "ETI"}
                </p>
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  {blog?.title}
                </h3>
                <Link
                  href={`/blogs/${blog?.slug || blog?._id}`}
                  className="flex items-center gap-2 text-yellow-200 font-semibold hover:text-yellow-400 transition-colors"
                >
                  View Tale <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full z-10"
        >
          <ArrowRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </section>
  );
};
