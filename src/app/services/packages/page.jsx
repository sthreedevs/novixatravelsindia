"use client";
import React, { useEffect, useState } from "react";
import { cn, transformPackageData } from "@/lib/utils";
import { BadgeDollarSign, ShieldCheck, Smartphone } from "lucide-react";
import { Grid } from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import Carousel from "@/components/common/Carousel";
import { useRouter } from "next/navigation";

import axios from "axios";
import Loader from "@/components/common/Loader";

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

const Packages = () => {
  const [packagesPageData, setPackagesPageData] = useState(null); // Initialize with null for loading state
  const carouselData = packagesPageData?.carouselData;
  const packageData = transformPackageData(packagesPageData?.packageData);

  const fetchData = async () => {
    try {
      const packagesResponse = await axios.get(
        "/api/package/getPackagesPageData"
      );
      const packagesPageData = packagesResponse.data.data;
      setPackagesPageData(packagesPageData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (packagesPageData === null) {
    return <Loader />; // Show loader while data is being fetched
  }

  return (
    <div className="relative pt-20 min-h-screen">
      <Carousel data={carouselData} />
      {/* packages section */}
      <div className="md:mx-10">
        {packageData?.map((data) => {
          return (
            <div
              key={data?._id}
              className="border rounded-md p-2 sm:p-4 mt-4 md:mt-10"
            >
              <h1 className="text-xl md:text-3xl mx-2 mb-4">{data?.title}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap overflow-hidden">
                {data?.content.map((item) => (
                  <PackageCard key={item._id} data={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="my-20">
        <h1 className="text-3xl md:text-5xl mb-12 font-medium text-center">
          Why Choose Us
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 max-w-7xl mx-auto">
          {whyChooseUs.map((feature) => (
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
      </div>
    </div>
  );
};

const PackageCard = ({ data }) => {
  const navigate = useRouter();
  return (
    <div className="w-full max-w-md xl:mb-4 mx-auto">
      <div
        className={cn(
          "group w-full overflow-hidden relative card h-60 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
          data?.image && `bg-[url('${data.image.replace(/'/g, "\\'")}')]`, // Fixed URL escaping
          "bg-cover bg-center bg-no-repeat", // Added missing background properties
          // Preload hover image
          "before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
          "hover:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)]",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
          "transition-all duration-500"
        )}
        style={{
          // Fallback inline style to ensure image displays
          backgroundImage: data?.image
            ? `url('${data.image.replace(/'/g, "\\'")}')`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text relative z-40">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
            {data.title}
          </h1>
          <p className="font-normal text-base text-gray-50 relative my-4">
            {data.description}
          </p>
          <Button
            onClick={() => navigate(data._id)}
            variant="outline"
            className="cursor-pointer"
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Packages;
