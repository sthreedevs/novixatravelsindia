"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import Carousel from "@/components/common/Carousel";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setModalForm } from "@/redux/uiSlice";

export const DestinationPageClient = ({ data, countryName }) => {
  const dispatch = useDispatch();
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const handleFormModal = () => {
    dispatch(setModalForm("hotel"));
  };

  const content = useMemo(() => {
    return (
      data?.destinationData?.descriptions?.map((item) => ({
        title: item.title,
        description: (
          <>
            <p className="text-justify">{item.description}</p>
          </>
        ),
        image: item.image,
        highlights: item.highlights || [],
      })) || []
    );
  }, [data]);

  const handleNavigation = (index) => {
    if (sectionRefs.current[index]) {
      const yOffset = -90;
      const y =
        sectionRefs.current[index].getBoundingClientRect().top +
        window.scrollY +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = sectionRefs.current.map((section) =>
        section ? section.getBoundingClientRect().top : 0
      );
      const indexInView = sectionOffsets.findIndex(
        (offset) => offset > 0 && offset < window.innerHeight / 2
      );
      if (indexInView !== -1) {
        setActiveIndex(indexInView);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-20">
      <Carousel data={data?.destinationData?.carouselData} />
      <h1 className="text-3xl md:text-5xl font-medium text-center my-10">
        Places to visit in <span className="text-[#BFA181]">{decodeURIComponent(countryName)}</span>
      </h1>
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {content?.map((item, idx) => (
          <button
            key={item.title}
            className={`px-4 py-1 rounded-full border`}
            onClick={() => handleNavigation(idx)}
          >
          {item.title}
          </button>
        ))}
      </div>

      <div className="flex mx-4 ">
        <div className="sm:flex-[0.8] pl-4 overflow-hidden ">
          <TracingBeam className="px-6">
            <div className="max-w-2xl mx-auto antialiased pt-4 relative">
              {content.map((item, index) => (
                <div
                  key={`content-${index}`}
                  className="mb-10 pl-4 sm:pl-1"
                  ref={(el) => (sectionRefs.current[index] = el)}
                >
                  <p className="text-2xl font-bold mb-4">{item.title}</p>
                  <div className="text-sm prose prose-sm dark:prose-invert">
                    {item?.image && (
                      <img
                        src={item.image}
                        alt="blog thumbnail"
                        height="1000"
                        width="1000"
                        className="h-80 rounded-lg mb-10 object-cover"
                      />
                    )}
                    {item.description}
                  </div>
                  {item.highlights?.length > 0 && (
                    <div className="mt-6 text-sm prose prose-sm dark:prose-invert">
                      {item.highlights.map((highlight, i) => (
                        <div key={i} className="mb-4">
                          <h4 className="font-semibold">{highlight.title}</h4>
                          <p className="text-justify">
                            {highlight.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TracingBeam>
        </div>

        <div className="flex-[0.2] hidden sm:block">
          <div className="sticky top-20 right-0 w-full p-4 shadow-lg border rounded-sm mt-14">
            <p className="text-xl font-bold mb-2">Navigation</p>
            <ul className="space-y-2 dark:text-zinc-400">
              {content.map((item, index) => (
                <li
                  key={`nav-${index}`}
                  className={`hover:underline cursor-pointer ${
                    index === activeIndex ? "dark:text-[#BFA181]" : ""
                  }`}
                  onClick={() => handleNavigation(index)}
                >
                  <h1 className="text-lg font-medium">{item.title}</h1>
                  <div className="line-clamp-3 text-xs">{item.description}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {data?.hotelData?.length > 0 && (
        <div>
          <h1 className="text-3xl md:text-5xl font-medium text-center my-10">
            Popular Hotels
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
            {data.hotelData.map((hotel) => (
              <HotelCard
                key={hotel._id}
                hotel={hotel}
                handleFormModal={handleFormModal}
              />
            ))}
          </div>
        </div>
      )}

      {data?.packageData?.length > 0 && (
        <div>
          <h1 className="text-3xl md:text-5xl font-medium text-center my-10">
            Popular Packages
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {data.packageData.map((pkg) => (
              <PackageCard key={pkg._id} packageData={pkg} router={router} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HotelCard = ({ hotel, handleFormModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (window.innerWidth < 768) {
      setIsHovered((prev) => !prev);
    }
  };

  return (
    <div
      className="relative w-full sm:w-80 h-96 rounded-lg overflow-hidden shadow-lg group"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={hotel.thumbnail}
        alt={hotel.name}
        className={`w-full h-full object-cover transform transition-all duration-500 ${
          isHovered ? "scale-110" : ""
        }`}
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-md text-lg font-semibold text-white dark:text-white z-10">
        {hotel.city}
      </div>
      <div
        className={`absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center px-4 text-white dark:text-white transition-opacity duration-500 ${
          isHovered
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <h2 className="text-xl font-bold">{hotel.title}</h2>
        <p className="text-sm py-4">{hotel.description}</p>
        <Button onClick={handleFormModal}>Book Now</Button>
      </div>
    </div>
  );
};

const PackageCard = ({ packageData, router }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (window.innerWidth < 768) {
      setIsHovered((prev) => !prev);
    }
  };

  return (
    <div
      className="relative w-full sm:w-80 rounded-2xl overflow-hidden shadow-lg border border-gray-200 group bg-white dark:bg-zinc-900"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-52 overflow-hidden pointer-events-none">
        <img
          src={packageData.thumbnail}
          alt={packageData.title}
          className={`w-full h-full object-cover transform transition-transform duration-500 ${
            isHovered ? "scale-105" : ""
          }`}
        />
      </div>
      <div className="p-4 text-gray-800 dark:text-zinc-200">
        <h3 className="text-lg font-semibold">{packageData.title}</h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-zinc-400 mt-1">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          {packageData.destinations}
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-zinc-400 mt-1">
          <FaRegClock className="mr-2 text-blue-500" />
          {packageData.days} Days / {packageData.nights} Nights
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 shadow-md py-4 px-6 transform transition-transform duration-500 flex flex-col items-center ${
          isHovered ? "translate-y-0" : "translate-y-full"
        } pointer-events-auto`}
      >
        <p className="text-sm text-gray-700 dark:text-zinc-300 text-center">
          Explore the best destinations with this package.
        </p>
        <Button
          className="mt-2"
          onClick={() => router.push(`/services/packages/${packageData._id}`)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};
