import React from "react";
import { transformPackageData } from "@/lib/utils";
import { BadgeDollarSign, ShieldCheck, Smartphone } from "lucide-react";
import { Grid } from "@/components/ui/grid";
import Carousel from "@/components/common/Carousel";
import { getPackagesPageData } from "@/lib/services/package.service";
import { PackageCard } from "@/components/packages/PackageCard";

export const metadata = {
  title: "Travel Packages | Novixa Travels",
  description: "Explore the best travel packages at unbeatable prices.",
};

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

export default async function Packages() {
  const packagesPageData = await getPackagesPageData();
  const carouselData = packagesPageData?.carouselData;
  const packageData = transformPackageData(packagesPageData?.packageData);

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
}
