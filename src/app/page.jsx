import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BadgeDollarSign,
  MousePointer,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import MouseImageTrail from "@/components/ui/MouseImageTrail";
import { toTitleCase } from "@/lib/utils";
import Carousel from "@/components/common/Carousel";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import {
  getTrendingIndian,
  getTrendingInternational,
  getHomePackages,
  getTestimonials,
  getHomeCarousel,
  getEtiBlogs,
} from "@/lib/services/home.service.js";

// Import the extracted Client Components
import {
  TrendingPackages,
  DestinationCard,
  TestimonialCard,
  BlogCarousel,
} from "@/components/home/HomeClientComponents";

const whyChooseUs = [
  {
    title: "Competitive Prices",
    description:
      "Get the best travel deals at unbeatable prices, ensuring great value for your money.",
    icon: <BadgeDollarSign size={24} />,
  },
  {
    title: "Secure Booking",
    description:
      "Book your trips with confidence, thanks to our secure and encrypted payment system.",
    icon: <ShieldCheck size={24} />,
  },
  {
    title: "Seamless Experience",
    description:
      "Enjoy a smooth and hassle-free booking process across all your devices.",
    icon: <Smartphone size={24} />,
  },
  {
    title: "Trusted",
    description:
      "Get the best travel deals at unbeatable prices, ensuring great value for your money.",
    icon: <BadgeDollarSign size={24} />,
  },
];

const gallery = [
  "https://picsum.photos/800/600?random=1",
  "https://picsum.photos/800/600?random=2",
  "https://picsum.photos/800/600?random=3",
  "https://picsum.photos/800/600?random=4",
  "https://picsum.photos/800/600?random=5",
  "https://picsum.photos/800/600?random=6",
  "https://picsum.photos/800/600?random=7",
  "https://picsum.photos/800/600?random=8",
  "https://picsum.photos/800/600?random=9",
  "https://picsum.photos/800/600?random=10",
];

export default async function Home() {
  // Fetch all required data concurrently on the server
  const [
    carouselData,
    trendingIndian,
    trendingInternational,
    packages,
    testimonials,
    blogs,
  ] = await Promise.all([
    getHomeCarousel(),
    getTrendingIndian(),
    getTrendingInternational(),
    getHomePackages(),
    getTestimonials(),
    getEtiBlogs(),
  ]);

  return (
    <div className="w-full py-20 overflow-hidden">
      {/* hero section */}
      <Carousel data={carouselData} />
      
      <div className="my-5">
        <h1 className="text-3xl md:text-5xl mb-10 font-medium text-center">
          Trending International Destinations
        </h1>
        <div className="mx-2 md:mx-auto max-w-7xl p-2 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {trendingInternational?.map((dest) => (
            <DestinationCard key={dest._id} data={dest} />
          ))}
        </div>
      </div>
      <div className="my-5">
        <h1 className="text-3xl md:text-5xl mb-10 font-medium text-center">
          Trending Indian Destinations
        </h1>
        <div className="mx-2 md:mx-auto max-w-7xl p-2 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {trendingIndian?.map((dest) => (
            <DestinationCard key={dest._id} data={dest} />
          ))}
        </div>
      </div>
      {/* Pacakges */}
      <h1 className="text-3xl md:text-5xl mb-10 font-medium text-center">
        Popular Packages
      </h1>
      <TrendingPackages packages={packages} />
      {/* gallery */}
      <MouseImageTrail
        renderImageBuffer={50}
        rotationRange={25}
        images={gallery}
      >
        <section className="grid h-screen w-full place-content-center">
          <p className="flex items-center gap-2 text-3xl font-bold uppercase">
            <MousePointer />
            <span>Gallery</span>
          </p>
        </section>
      </MouseImageTrail>

      <h1 className="text-3xl md:text-5xl mb-10 font-medium text-center">
        Travel Tales Hub by NTI
      </h1>
      <BlogCarousel blogs={blogs} />

      {/* why choose us */}
      <div className="my-10">
        <h1 className="text-3xl md:text-5xl font-medium mx-auto text-center mb-10">
          Why Choose Us
        </h1>
        <div className="mx-2 md:mx-auto max-w-7xl flex gap-4">
          <div className="flex-1 hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* <!-- Ping animation --> */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 opacity-75 animate-ping scale-100"></span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 opacity-75 animate-ping scale-100"></span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 opacity-75 animate-ping scale-100"></span>
              {/* <!-- Center icon --> */}
              <div className="relative z-10 flex items-center justify-center w-full h-full rounded-full bg-white shadow-md">
                {/* <!-- Replace this with your SVG --> */}
                <Image src="/logo.png" alt="logo" width={384} height={384} className="h-96 w-auto" />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-2 mx-2">
            {whyChooseUs?.map((card) => (
              <div key={card.title} className="p-4 space-y-1 border rounded-md">
                {card?.icon}
                <h1 className="text-2xl font-medium">{card?.title}</h1>
                <p className="text-zinc-400">{card?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* testimonials */}
      <div className="my-5">
        <h1 className="text-3xl md:text-5xl mb-10 font-medium text-center">
          What Our Customers Say
        </h1>
        <div className="flex gap-2 py-10 overflow-x-scroll no-scrollbar">
          {testimonials?.map((data, idx) => (
            <TestimonialCard index={idx} key={data._id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
