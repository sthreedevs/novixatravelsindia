"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDispatch } from "react-redux";
import { setModalForm } from "@/redux/uiSlice";
import {
  FaPlane,
  FaMapMarkedAlt,
  FaSmile,
  FaWallet,
  FaRegPlayCircle,
  FaWpforms,
  FaHeadset,
  FaPlaneDeparture,
} from "react-icons/fa";

const features = [
  {
    icon: <FaPlane size={30} />,
    title: "Seamless Booking",
    desc: "Book flights with just a few clicks using our user-friendly interface.",
  },
  {
    icon: <FaMapMarkedAlt size={30} />,
    title: "Widest Coverage",
    desc: "Choose from destinations across the globe with exclusive deals.",
  },
  {
    icon: <FaSmile size={30} />,
    title: "24/7 Support",
    desc: "Our travel experts are always here to assist you.",
  },
  {
    icon: <FaWallet size={30} />,
    title: "Best Price Guarantee",
    desc: "Get the most competitive prices with no hidden charges or surprises.",
  },
];

const destinations = [
  {
    title: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFsaXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RnJhbmNlfGVufDB8fDB8fHww",
  },
  {
    title: "Tokyo, Japan",
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amFwYW58ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Goa, India",
    image:
      "https://images.unsplash.com/photo-1558960214-f4283a743867?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdvYXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Jaipur, India",
    image:
      "https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFpcHVyfGVufDB8fDB8fHww",
  },
  {
    title: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1541336032412-2048a678540d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TmV3JTIwWW9ya3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Ladakh, India",
    image:
      "https://images.unsplash.com/photo-1593118845043-359e5f628214?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TGFkYWtofGVufDB8fDB8fHww",
  },
  {
    title: "Santorini, Greece",
    image:
      "https://images.unsplash.com/photo-1615015456178-ae6bb600b7ef?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U2FudG9yaW5pJTJDJTIwR3JlZWNlfGVufDB8fDB8fHww",
  },
];

const steps = [
  {
    icon: <FaRegPlayCircle size={30} className="text-blue-500" />,
    title: "Start Your Journey",
    desc: 'Click the "Get Started" button to begin the process.',
  },
  {
    icon: <FaWpforms size={30} className="text-green-400" />,
    title: "Fill Travel Details",
    desc: "Provide your travel preferences via a quick form.",
  },
  {
    icon: <FaHeadset size={30} className="text-[#BFA181]" />,
    title: "We'll Reach Out",
    desc: "Our travel team will contact you with the best offers.",
  },
  {
    icon: <FaPlaneDeparture size={30} className="text-purple-400" />,
    title: "Pack & Fly",
    desc: "Confirm your booking, pack your bags, and get ready to fly!",
  },
];

const faqData = [
  {
    question: "Can I book both domestic and international flights?",
    answer:
      "Yes, we provide booking options for both domestic and international routes with multiple airlines.",
  },
  {
    question: "Will I get an e-ticket after booking?",
    answer:
      "Absolutely. Your e-ticket will be sent to your registered email immediately after successful payment.",
  },
  {
    question: "Can I reschedule or cancel my flight?",
    answer:
      "Yes, you can reschedule or cancel depending on airline policies. Cancellation fees may apply.",
  },
  {
    question: "Do I need a passport for domestic flights?",
    answer:
      "No, a passport is not required for domestic flights within India. Any government-issued ID will suffice.",
  },
  {
    question: "How early should I reach the airport before my flight?",
    answer:
      "For domestic flights, arrive at least 2 hours early. For international, arrive 3-4 hours in advance.",
  },
];

const FlightBooking = () => {
  const dispatch = useDispatch();

  const handleFormModal = () => {
    dispatch(setModalForm("flight"));
  };

  return (
    <div className="py-20 ">
      {/* hero section */}
      <div className="relative flex h-[40rem] w-full items-center justify-center bg-black">
        <div
          className={cn(
            "absolute inset-0 bg-no-repeat bg-cover bg-center",
            "[background-image:url('/backgrounds/flightBooking.jpg')]"
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>

        <div className="min-h-screen flex items-center justify-center px-6 bg-black bg-clip-text z-20">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-yellow-600 mb-6 leading-tight"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              Fly to Your Dream Destination Today
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            >
              From search to boarding, we simplify travel planning with fast
              bookings and unbeatable flight deals.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <Button
                className="px-6 py-3 transition duration-300"
                onClick={handleFormModal}
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className=" py-10 px-6 my-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="rounded-3xl p-6 text-left shadow-md hover:shadow-xl transition-shadow duration-500 border border-neutral-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-neutral-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="relative py-10 px-6  overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Popular Destinations
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
            {destinations.map((dest, i) => (
              <DestinationCard key={dest.title} {...dest} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-10 px-6 my-10  relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Ready to Start Your Journey?
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl  mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Book flights, explore destinations, and enjoy seamless travel
            experiences — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4 }}
          >
            <Button
              className="transition-all duration-300"
              onClick={handleFormModal}
            >
              Book Your Trip Now
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 px-4">
        <h2 className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-4 max-w-7xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative max-w-sm bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
            >
              <Grid size={20} />
              {feature.icon}
              <p className="my-4 text-xl font-bold text-neutral-800 dark:text-white relative z-20">
                {feature.title}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-base font-normal relative z-20">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* faqs section */}
      <div className="mx-8 md:mx-20 lg:mx-30">
        <h1 className="ttext-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold">
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

const DestinationCard = ({ title, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay }}
    className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out w-full max-w-md"
  >
    {/* Image */}
    <div className="overflow-hidden rounded-3xl">
      <motion.img
        src={image}
        alt={title}
        className="h-[320px] w-full object-cover transition-transform duration-700"
        whileHover={{ scale: 1.1 }}
      />
    </div>

    {/* Gradient overlay */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-10 rounded-b-3xl" />

    {/* Title on Image */}
    <div className="absolute bottom-6 left-6 z-20">
      <h3 className="text-white font-bold drop-shadow-md">{title}</h3>
    </div>
  </motion.div>
);
export default FlightBooking;
