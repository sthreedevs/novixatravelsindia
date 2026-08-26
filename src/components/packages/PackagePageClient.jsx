"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@/components/ui/grid";
import Carousel from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { setModalForm } from "@/redux/uiSlice";
import { Timeline } from "@/components/ui/timeline";
import { FaBed, FaRegClock, FaCreditCard, FaCity, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";

export const PackagePageClient = ({ packageData }) => {
  const [location, setLocation] = useState({});
  const dispatch = useDispatch();

  const getLocation = async () => {
    try {
      const response = await axios.get(
        "https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location"
      );
      setLocation(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const carouselData = useMemo(() => {
    if (!packageData) return [];
    return packageData?.carouselData?.map((curr) => ({
      title: curr.title,
      button: curr.buttonText,
      src: curr.image,
    }));
  }, [packageData]);

  const timelineData = useMemo(() => {
    if (!packageData) return [];
    return packageData?.timeline?.map((item) => ({
      title: item.dayTitle,
      content: (
        <div className="lg:ml-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-2">
              {item.description}
            </p>
            <Button onClick={() => dispatch(setModalForm("package"))}>
              Book Now
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {item.image1 && (
              <img
                key={`${item.dayTitle} image1`}
                src={item.image1}
                alt={`${item.dayTitle} image1`}
                className="rounded-lg object-cover h-28 md:h-44 lg:h-60 w-full"
              />
            )}
            {item.image2 && (
              <img
                key={`${item.dayTitle} image2`}
                src={item.image2}
                alt={`${item.dayTitle} image2`}
                className="rounded-lg object-cover h-28 md:h-44 lg:h-60 w-full"
              />
            )}
          </div>
        </div>
      ),
    }));
  }, [packageData, dispatch]);

  const details = useMemo(() => {
    if (!packageData) return [];
    return [
      {
        icon: <FaBed size={24} />,
        title: `${packageData.days} Days Stay`,
        description: `Relax and unwind with a ${packageData.days} days stay at top hotels.`,
      },
      {
        icon: <FaRegClock size={24} />,
        title: `${packageData.nights} Nights`,
        description: `Stay for ${packageData.nights} unforgettable nights exploring the city.`,
      },
      {
        icon: <FaCity size={24} />,
        title: "Cultural Attractions",
        description: packageData?.description,
      },
      {
        icon: <FaCreditCard size={24} />,
        title: "Package Price",
        description: `${
          location && location.country === "IN"
            ? `₹${packageData.domesticPrice}`
            : `$${packageData.internationalPrice || packageData.price}`
        } - Includes accommodation, meals, and exclusive tours.`,
      },
    ];
  }, [packageData, location]);

  return (
    <div className="relative pt-30 w-full overflow-hidden">
      <Carousel slides={carouselData} />
      <h2 className="text-lg pt-20 text-center font-bold md:text-4xl mb-4 text-black dark:text-white">
        {packageData.title}
      </h2>

      <div className="my-20 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 max-w-7xl mx-auto">
          {details?.map((feature) => (
            <div
              key={feature.title}
              className="relative max-w-sm mx-auto bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
            >
              <Grid size={20} />
              {feature.icon}
              <p className="my-4 text-xl font-bold text-neutral-800 dark:text-white relative z-20">
                {feature.title}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-base font-normal relative z-20">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-4 p-2">
          <p className="text-sm text-muted-foreground">
            Need something different?
          </p>
          <Button
            onClick={() => dispatch(setModalForm("package"))}
            variant="link"
            className="w-fit"
          >
            Customize
          </Button>
        </div>
      </div>

      <Timeline data={timelineData} />

      {(packageData?.inclusions?.length > 0 || packageData?.exclusions?.length > 0) && (
        <section className="max-w-6xl mx-auto my-20 px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white mb-10">
            What’s Included & Excluded
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {packageData?.inclusions?.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-neutral-900 dark:to-neutral-950 p-8 rounded-3xl shadow-md hover:shadow-lg transition-all">
                <h3 className="text-2xl font-semibold mb-6 text-green-800 dark:text-green-300 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600 dark:text-green-400" />
                  Inclusions
                </h3>
                <ul className="list-disc list-inside space-y-3 text-neutral-700 dark:text-neutral-300 text-base">
                  {packageData.inclusions.map((item, index) => (
                    <li key={index} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {packageData?.exclusions?.length > 0 && (
              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-neutral-900 dark:to-neutral-950 p-8 rounded-3xl shadow-md hover:shadow-lg transition-all">
                <h3 className="text-2xl font-semibold mb-6 text-red-800 dark:text-red-300 flex items-center gap-2">
                  <FaTimesCircle className="text-red-600 dark:text-red-400" />
                  Exclusions
                </h3>
                <ul className="list-disc list-inside space-y-3 text-neutral-700 dark:text-neutral-300 text-base">
                  {packageData.exclusions.map((item, index) => (
                    <li key={index} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
