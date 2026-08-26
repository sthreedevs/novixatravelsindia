"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

import {
  BadgeDollarSign,
  MousePointer,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import MouseImageTrail from "@/components/ui/MouseImageTrail";
import axios from "axios";
import { toTitleCase } from "@/lib/utils";
import Carousel from "@/components/common/Carousel";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

// const partners = [
//   {
//     name: "TikTok",
//     image: "https://appwrite.io/images/logos/trusted-by/tiktok.svg",
//   },
//   {
//     name: "Bosch",
//     image: "https://appwrite.io/images/logos/trusted-by/bosch.svg",
//   },
//   {
//     name: "Deloitte",
//     image: "https://appwrite.io/images/logos/trusted-by/deloitte.svg",
//   },
//   {
//     name: "Intel",
//     image: "https://appwrite.io/images/logos/trusted-by/intel.svg",
//   },
//   {
//     name: "American Airlines",
//     image: "https://appwrite.io/images/logos/trusted-by/american-airlines.svg",
//   },
//   {
//     name: "Nestlé",
//     image: "https://appwrite.io/images/logos/trusted-by/nestle.svg",
//   },
//   {
//     name: "Decathlon",
//     image: "https://appwrite.io/images/logos/trusted-by/decathlon.svg",
//   },
// ];

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

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const [packages, setPackages] = useState([]);
  const [trendingIndian, setTrendingIndian] = useState([]);
  const [trendingInternational, setTrendingInternational] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const fetchData = async () => {
    try {
      const [
        testimonialResponse,
        carouselResponse,
        trendingIndianRes,
        trendingInternationalRes,
        packagesRes,
        blogRes,
      ] = await Promise.all([
        axios.get("/api/testimonial/"),
        axios.get("/api/carousel/type/home"),
        axios.get("/api/destination/getTrendingIndian"),
        axios.get("/api/destination/getTrendingInternational"),
        axios.get("/api/package/getHomePackages"),
        axios.get("/api/blog/getEti"),
      ]);

      setTrendingIndian(trendingIndianRes.data?.data || []);
      setTrendingInternational(trendingInternationalRes.data?.data || []);
      setPackages(packagesRes.data?.data || []);
      setTestimonials(testimonialResponse.data?.data || []);
      setCarouselData(carouselResponse.data?.data || []);
      setBlogs(blogRes.data?.data || []);
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full py-20 overflow-hidden">
      {/* hero section */}
      <Carousel data={carouselData} />
      {/* partners */}
      {/* <InfiniteMovingCards
        items={partners}
        variant="partners"
        direction="right"
        speed="slow"
        className="mx-auto"
      /> */}
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
                <img src="./logo.png" alt="logo" className="h-96" />
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
};

const TestimonialCard = ({ index, data }) => (
  <div
    style={{ marginTop: index % 2 == 0 ? "80px" : "" }}
    className="bg-zinc-100 border border-gray-200 shadow-md h-fit min-w-xs max-w-sm rounded-xl p-6 animate-scroll"
  >
    <div className="flex items-center gap-4 mb-4">
      <img
        src={data.image}
        alt={data.name}
        className="w-12 h-12 rounded-full object-cover"
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

const DestinationCard = ({ data }) => {
  return (
    <Link href={`/destination/${data.name}`}>
      <div className="relative max-w-md border-2 border-opacity-50 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out transform-gpu hover:-translate-y-2">
        {/* Image with Overlay */}
        <div className="overflow-hidden rounded-lg border-2 border-opacity-30">
          <img
            src={data.thumbnail}
            alt={data.name}
            className="w-full h-72 object-cover transform hover:scale-110 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-between p-4 transition-opacity duration-300 hover:bg-opacity-20">
            {/* Title */}
            <h1 className="text-2xl font-semibold tracking-wide leading-tight">
              {toTitleCase(data.name)}
            </h1>
            {/* Tags */}
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

const TrendingPackages = ({ packages = [] }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.clientWidth * 0.7; // scroll ~70% of container
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-black text-white py-16">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left arrow (desktop only) */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#4a4032]/90 hover:bg-[#6b604e] p-3 rounded-full shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Carousel container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory px-2 md:px-6"
        >
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="flex-shrink-0 bg-[#141414] rounded-3xl w-[80%] sm:w-[280px] md:w-[320px] lg:w-[350px] shadow-md border border-gray-800 hover:scale-[1.03] transition-transform duration-300 ease-in-out snap-start"
            >
              <img
                src={pkg.thumbnail}
                alt={pkg.title}
                className="rounded-t-3xl w-full h-56 object-cover"
              />
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
                  href={`/services/packages/${pkg._id}`}
                  className="block bg-[#bba477] hover:bg-[#cbb982] text-black font-semibold rounded-xl px-6 py-2 w-full text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow (desktop only) */}
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

const BlogCarousel = ({ blogs = [] }) => {
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
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full z-10"
        >
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide scrollbar-none"
        >
          {blogs?.map((blog, idx) => (
            <div
              key={idx}
              className="min-w-[320px] md:min-w-[600px] relative rounded-xl overflow-hidden group"
            >
              {/* Blog Thumbnail */}
              <img
                src={blog?.thumbnail}
                alt={blog?.title}
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
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

        {/* Right Arrow */}
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

export default Home;
