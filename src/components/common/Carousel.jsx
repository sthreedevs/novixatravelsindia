"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Carousel = ({ data = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data?.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [data?.length]);

  return (
    <div className="relative w-full">
      {/* Carousel Wrapper */}
      <div className="relative h-56 overflow-hidden md:h-96 lg:h-[88vh]">
        {data?.map((item, index) => (
          <Image
            key={item._id || index}
            src={item.image || "/placeholder.jpg"}
            alt={item.title || "Carousel Image"}
            fill
            className={`absolute z-20 block object-cover transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-30 flex items-center justify-center bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-center">
        <div className="">
          <h2 className="text-2xl sm:text-6xl font-bold">
            {data[currentIndex]?.title}
          </h2>
          <p className="text-lg sm:text-2xl mt-2">
            {data[currentIndex]?.description}
          </p>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {data?.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
