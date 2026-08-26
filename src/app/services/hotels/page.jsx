"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaHotel, FaConciergeBell, FaShieldAlt } from "react-icons/fa";
import { Grid } from "@/components/ui/grid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import { ImagesSlider } from "@/components/ui/images-slider";
import { useDispatch } from "react-redux";
import { setModalForm } from "@/redux/uiSlice";
import axios from "axios";
import Loader from "@/components/common/Loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const whyChooseUs = [
  {
    icon: <FaHotel className="text-blue-500 text-4xl" />,
    title: "Handpicked Hotels",
    description:
      "We offer only the finest hotels with top-tier facilities and comfort.",
  },
  {
    icon: <FaConciergeBell className="text-green-500 text-4xl" />,
    title: "24/7 Customer Support",
    description:
      "Our dedicated team is available around the clock for any assistance.",
  },
  {
    icon: <FaShieldAlt className="text-red-500 text-4xl" />,
    title: "Secure Booking",
    description:
      "Book with confidence knowing your data and payments are safe.",
  },
];

const faqData = [
  {
    question: "How do I book a hotel through your platform?",
    answer:
      "Click on 'Enquire Now' and simply fill out the form — our team will reach out to you shortly.",
  },
  {
    question: "Can I cancel or modify my hotel booking?",
    answer:
      "Yes, you can request changes, but cancellation and modification policies vary by hotel.",
  },
  {
    question: "Are there any hidden charges in hotel bookings?",
    answer:
      "No, all prices shown are final. Taxes and service fees are included in the total price before confirmation.",
  },
  {
    question: "Do you offer customer support for hotel issues?",
    answer:
      "Absolutely! Our support team is available 24/7 to assist with any hotel-related concerns or emergencies.",
  },
  {
    question: "Can I request early check-in or late check-out?",
    answer:
      "Yes, you can request early check-in or late check-out during booking. Approval depends on the hotel's availability.",
  },
];

const Hotel = () => {
  const dispatch = useDispatch();
  const [hotelPageData, setHotelPageData] = useState(null);
  const hotelData = hotelPageData?.hotelData || [];
  const carouselData =
    hotelPageData?.carouselData?.reduce((prev, curr) => {
      return [...prev, curr?.image];
    }, []) || [];

  const handleFormModal = () => {
    dispatch(setModalForm("hotel"));
    console.error("clicked");
  };

  const fetchData = async () => {
    try {
      const hotelResponse = await axios.get("/api/hotel/getHotelsPageData");
      const hotelPageData = hotelResponse.data.data;
      setHotelPageData(hotelPageData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!hotelPageData) {
    return <Loader />;
  }

  return (
    <div className="py-20">
      {/* Hero Section */}
      <ImagesSlider className="h-[40rem]" images={carouselData}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            Your reliable partner for seamless <br />{" "}
            <span className="text-[#bfa46f]">hotel reservations.</span>
          </motion.p>
          <Button variant="link" onClick={handleFormModal}>
            Enquire Now
          </Button>
        </motion.div>
      </ImagesSlider>

      <h1 className="text-3xl md:text-6xl my-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold">
        Popular Hotels in India
      </h1>
      <Tabs
        defaultValue="five"
        className="mx-auto w-full max-w-2xl lg:max-w-6xl my-10"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="five">5 Star</TabsTrigger>
          <TabsTrigger value="four">4 Star</TabsTrigger>
          <TabsTrigger value="three">3 Star</TabsTrigger>
        </TabsList>
        <TabsContent value="five">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelData
              ?.filter((hotel) => hotel.category === "5 Star")
              ?.map((hotel) => (
                <HotelCard
                  hotel={hotel}
                  handleFormModal={handleFormModal}
                  key={hotel._id}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="four">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelData
              ?.filter((hotel) => hotel.category === "4 Star")
              ?.map((hotel) => (
                <HotelCard
                  hotel={hotel}
                  handleFormModal={handleFormModal}
                  key={hotel._id}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="three">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelData
              ?.filter((hotel) => hotel.category === "3 Star")
              ?.map((hotel) => (
                <HotelCard
                  hotel={hotel}
                  handleFormModal={handleFormModal}
                  key={hotel._id}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Why choose us section */}
      <h1 className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold">
        Why Choose Us?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-8 max-w-fit mx-auto">
        {whyChooseUs.map((feature, idx) => (
          <div
            key={idx}
            className="relative max-w-sm bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden mb-4"
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

      {/* faqs section */}
      <div className="mx-8 md:mx-20 lg:mx-30 mt-10">
        <h1 className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold">
          FAQs
        </h1>
        <Accordion type="single" collapsible>
          {faqData.map((faq, i) => (
            <AccordionItem key={`item-${i}`} value={`item-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

const HotelCard = ({ hotel, handleFormModal }) => {
  return (
    <div className="group relative flex flex-col bg-zinc-200 dark:bg-zinc-800 rounded-3xl w-full max-w-sm mx-auto overflow-hidden transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl">
      {/* Card Image */}
      <div className="flex-2 w-full aspect-[4/3] overflow-hidden rounded-3xl">
        <img
          src={hotel.thumbnail}
          alt={hotel.name}
          className="w-full h-full object-cover rounded-t-3xl"
        />
      </div>

      {/* Enquire Button - shows on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          onClick={handleFormModal}
          className="z-10 bg-white text-black dark:bg-zinc-900 dark:text-white rounded-full px-6 py-2 font-semibold hover:bg-neutral-200 dark:hover:bg-zinc-700"
        >
          Enquire Now &rarr;
        </Button>
      </div>

      {/* Text Section */}
      <div className="flex-1 flex flex-col justify-center pl-10 pb-4 font-medium">
        <h3 className="text-lg dark:text-white text-gray-800">
          {hotel.name || hotel.title}
        </h3>
        <p className="dark:text-zinc-400 text-black text-sm">{hotel.city}</p>
      </div>
    </div>
  );
};

export default Hotel;
