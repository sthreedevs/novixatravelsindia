"use client";
import React from "react";
import { motion } from "framer-motion";
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

const faqData = [
  {
    question: "What does travel insurance cover?",
    answer:
      "It typically covers trip cancellations, medical emergencies, lost luggage, flight delays, and personal liability.",
  },
  {
    question: "Is travel insurance mandatory?",
    answer:
      "Some countries require it for visa approval. Even if not mandatory, it is highly recommended for safety.",
  },
  {
    question: "Can I buy insurance after booking my trip?",
    answer:
      "Yes, but it’s best to buy it right after booking to get full benefits like trip cancellation coverage.",
  },
  {
    question: "Does insurance cover COVID-19 related issues?",
    answer:
      "Yes, most travel insurance plans now include coverage for COVID-19 related medical expenses and cancellations.",
  },
  {
    question: "How do I file a claim if something goes wrong?",
    answer:
      "You can file a claim online by submitting documents like tickets, receipts, and medical reports to the insurer.",
  },
];

const features = [
  {
    icon: <FaPlane size={30} />,
    title: "Comprehensive Coverage",
    desc: "Stay protected with insurance that covers flights, luggage, and emergencies.",
  },
  {
    icon: <FaMapMarkedAlt size={30} />,
    title: "Worldwide Support",
    desc: "Travel with peace of mind no matter where you go.",
  },
  {
    icon: <FaSmile size={30} />,
    title: "Expert Assistance",
    desc: "Our insurance advisors are here for you anytime, anywhere.",
  },
  {
    icon: <FaWallet size={30} />,
    title: "Affordable Premiums",
    desc: "Flexible plans to suit your trip and budget.",
  },
];

const steps = [
  {
    icon: <FaRegPlayCircle size={30} className="text-blue-500" />,
    title: "Start Insurance Process",
    desc: 'Click "Get Started" to choose your travel insurance plan.',
  },
  {
    icon: <FaWpforms size={30} className="text-green-400" />,
    title: "Provide Travel Details",
    desc: "Fill in your trip info to generate a custom quote.",
  },
  {
    icon: <FaHeadset size={30} className="text-yellow-400" />,
    title: "Talk to Our Team",
    desc: "Get recommendations and finalize your plan with an expert.",
  },
  {
    icon: <FaPlaneDeparture size={30} className="text-purple-400" />,
    title: "Travel Protected",
    desc: "Enjoy your journey with complete insurance support.",
  },
];

const Insurance = () => {
  const dispatch = useDispatch();

  const handleFormModal = () => {
    dispatch(setModalForm("insurance"));
  };
  return (
    <div className="py-20">
      {/* Hero Section */}
      <div className="grid place-content-center h-[90vh] px-4 py-24 bg-[url('/backgrounds/travelInsurance.jpg')] bg-cover bg-center">
        <h1 className="max-w-2xl text-center text-5xl leading-snug">
          We handle{" "}
          <span className="relative">
            insurance,
            <svg
              viewBox="0 0 286 73"
              fill="none"
              className="absolute -left-2 -right-2 top-0 bottom-0 translate-y-1"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{
                  duration: 1.25,
                  ease: "easeInOut",
                }}
                d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                stroke="#FACC15"
                strokeWidth="3"
              />
            </svg>
          </span>{" "}
          you plan the trip.
        </h1>
      </div>

      {/* Steps */}
      <div className="py-10 px-6 my-10">
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
                <p className="text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-10 px-6 my-10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Ready to Insure Your Trip?
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Get covered for delays, cancellations, medical needs, and more. Your
            safety starts here.
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
              Start Your Application
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 px-4 my-10">
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

export default Insurance;
