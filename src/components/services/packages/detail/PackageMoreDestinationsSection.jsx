"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PackageMoreDestinationsSection({ destinations = [] }) {
  const displayDestinations =
    destinations.length > 0
      ? destinations
      : [
          { name: "Bali", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332944/backgrounds/ctaHotel.png", slug: "bali-retreat" },
          { name: "Thailand", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-thailand.png", slug: "thailand-escape" },
          { name: "Switzerland", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332951/backgrounds/europeRailHero.png", slug: "switzerland-explorer" },
          { name: "Dubai", tag: "Honeymoon Package", image: "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332970/destinations/esim-dubai.png", slug: "dubai-holiday" },
        ];

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24 text-white bg-[#070b14]">
      {/* Background Artwork */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332954/backgrounds/packageBg.png"
          alt="More Dream Destinations Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Elegant overlay to let the background artwork show while keeping text & cards razor-sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/70 via-[#070b14]/45 to-[#070b14]/85 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Section Heading */}
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#deb06c] block mb-1.5">
            Discover More
          </span>
          <h2
            className="text-2xl sm:text-3xl font-normal text-white tracking-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            More Dream Destinations
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm mt-1">
            Explore our handpicked travel packages to other breathtaking locations.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayDestinations.map((dest, idx) => (
            <Link
              key={idx}
              href={`/services/packages/${dest.slug || "maldives-honeymoon"}`}
              className="relative h-48 sm:h-52 rounded-2xl overflow-hidden shadow-lg group border border-white/15 block bg-black/30 backdrop-blur-xs hover:border-[#deb06c]/60 transition-all duration-300"
            >
              <Image
                src={dest.image || "https://res.cloudinary.com/di9q2cpeu/image/upload/v1794332952/backgrounds/hotelsHero.png"}
                alt={dest.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Text Bottom Left */}
              <div className="absolute bottom-3.5 left-4 z-10">
                <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[#deb06c] transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-zinc-300 font-medium">
                  {dest.tag || "Holiday Package"}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Link Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/services/packages"
            className="inline-flex items-center gap-2 border border-zinc-400 hover:border-[#deb06c] text-white hover:text-[#deb06c] bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full px-8 py-3 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md cursor-pointer"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
