"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BlurText from "@/components/ui/BlurText";
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

const checklistCategories = [
  {
    title: "Tourist Visa",
    items: [
      "Valid Passport (must be valid for at least 6 months beyond the trip, with at least 2 blank pages)",
      "Completed Visa Application Form",
      "Passport-size Photo (1-2 recent photos meeting the country's requirements, face zoom, clean 35x45mm with white background, recent)",
      "Past 3-year Income Tax Returns",
      "Past 6-month Bank Statements",
      "Covering Letter",
      "Round-trip Flight Tickets",
      "Sponsor Details & Invitation Letter (if applicable)",
      "Hotel Booking Voucher (confirmed)",
      "Travel Health Insurance",
      "Travel Itinerary",
    ],
  },
  {
    title: "Business Visa",
    items: [
      "Valid Passport (must be valid for at least 6 months beyond the trip)",
      "Completed Visa Application Form",
      "Passport-size Photo (1-2 recent photos meeting the country's requirements, face zoom, clean 35x45mm with white background, recent)",
      "Business Invitation Letter from the company/organization in the destination country",
      "Letter from Your Employer (stating job title, length of employment, purpose of visit, confirming that you will return after the trip)",
      "Round-trip Flight Tickets",
      "Travel Itinerary",
      "Hotel Booking Voucher (confirmed)",
      "Recent 6-month Bank Statements",
      "Business Documents (if self-employed - business registration documents, tax documents, other proof of businness ownership.)",
      "Sponsor Details & Invitation Letter (if applicable)",
      "Travel Insurance",
    ],
  },
  {
    title: "Transit Visa",
    items: [
      "Valid Passport",
      "Completed Visa Application Form",
      "Confirmed Onward Ticket",
      "Visa for Final Destination (if required)",
      "Travel Itinerary",
      "Proof of Financial Means (if applicable)",
    ],
  },
];

const faqData = [
  {
    question: "What documents are required for a tourist visa?",
    answer:
      "Typically, you need a passport, photographs, travel itinerary, financial proof, and a visa application form. Requirements vary by country.",
  },
  {
    question: "How long does it take to get a visa?",
    answer:
      "Processing time depends on the destination country and visa type, ranging from 2 days to several weeks.",
  },
  {
    question: "Can I apply for a visa online through your platform?",
    answer:
      "Yes, we support online visa application submissions for many countries with full assistance.",
  },
  {
    question: "Do you offer visa consultation or document verification?",
    answer:
      "Absolutely. Our team provides expert consultation and document checking before submission.",
  },
  {
    question: "What if my visa gets rejected?",
    answer:
      "In case of rejection, we’ll help you understand the reason and guide you through a reapplication if eligible.",
  },
];

const features = [
  {
    icon: <FaPlane size={30} />,
    title: "Fast Visa Processing",
    desc: "Speedy and reliable visa services for any destination.",
  },
  {
    icon: <FaMapMarkedAlt size={30} />,
    title: "Worldwide Coverage",
    desc: "We help you get visas for countries across the globe.",
  },
  {
    icon: <FaSmile size={30} />,
    title: "Expert Guidance",
    desc: "Talk to our visa specialists anytime you need help.",
  },
  {
    icon: <FaWallet size={30} />,
    title: "Clear & Fair Pricing",
    desc: "No hidden charges — just affordable visa solutions.",
  },
];

const steps = [
  {
    icon: <FaRegPlayCircle size={30} className="text-blue-500" />,
    title: "Start Your Visa Request",
    desc: 'Click "Get Started" to begin your visa application.',
  },
  {
    icon: <FaWpforms size={30} className="text-green-400" />,
    title: "Fill In Visa Details",
    desc: "Complete a short form with your travel information.",
  },
  {
    icon: <FaHeadset size={30} className="text-yellow-400" />,
    title: "We’ll Guide You",
    desc: "Our experts review your info and offer personalized help.",
  },
  {
    icon: <FaPlaneDeparture size={30} className="text-purple-400" />,
    title: "Visa Approved & Go",
    desc: "Once done, you're ready to pack and fly hassle-free!",
  },
];

const Visa = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);
  const dispatch = useDispatch();

  const handleFormModal = () => {
    dispatch(setModalForm("visa"));
  };
  return (
    <div className="py-20">
      {/* herosection */}
      <div className="flex bg-[url('/backgrounds/visaPage.jpg')] bg-cover bg-center flex-col items-center justify-center h-[80vh]">
        <BlurText
          text="Hassle-free visas, happy travels ahead"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-lg md:text-4xl lg:text-6xl font-medium text-center mb-8"
        />
        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Button
              className="px-6 py-3 transition duration-300"
              onClick={handleFormModal}
            >
              Start Your Application
            </Button>
          </motion.div>
        )}
      </div>

      <div className="p-2 sm:p-3 md:p-4">
        <motion.h2
          className="text-3xl md:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Documents Checklist
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {checklistCategories.map((category, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md hover:bg-accent transition-shadow duration-300"
            >
              <h3 className="text-base sm:text-lg md:text-2xl font-semibold mb-2 text-center">
                {category.title}
              </h3>
              <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                {category.items.map((item, idx) => (
                  <li key={idx} className="break-words">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* how to apply */}
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
                <p className="text-neutral-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* apply button */}
      <div className="py-10 px-6 my-10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Need a Visa for Your Next Trip?
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Get expert help with visa applications, fast processing, and
            personalized guidance for any destination.
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
              Apply for Your Visa Now
            </Button>
          </motion.div>
        </div>
      </div>

      {/* why choose us */}
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

export default Visa;
