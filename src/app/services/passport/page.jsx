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
import SplitText from "@/components/ui/SplitText";
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
    question: "Why do you need my passport details?",
    answer:
      "We use your passport data to book international travel, visas, and ensure identity verification for secure services.",
  },
  {
    question: "Is my passport data stored securely?",
    answer:
      "Yes, all sensitive information is encrypted and stored following strict data protection protocols.",
  },
  {
    question: "How long do you keep my passport details?",
    answer:
      "We retain passport data only as long as necessary for processing your booking or as required by law.",
  },
  {
    question: "Who has access to my passport information?",
    answer:
      "Only authorized staff involved in your travel arrangements can access your passport data, and it's never shared externally without consent.",
  },
  {
    question: "Can I request deletion of my passport data?",
    answer:
      "Absolutely. You can request data deletion anytime once your booking process is complete.",
  },
];

const features = [
  {
    icon: <FaPlane size={30} />,
    title: "Hassle-Free Passport Help",
    desc: "Quick and easy passport services for stress-free travel.",
  },
  {
    icon: <FaMapMarkedAlt size={30} />,
    title: "Global Travel Made Easy",
    desc: "Get passport-ready for destinations around the world.",
  },
  {
    icon: <FaSmile size={30} />,
    title: "Reliable Assistance",
    desc: "Our experts are here to guide you anytime.",
  },
  {
    icon: <FaWallet size={30} />,
    title: "Transparent Pricing",
    desc: "Affordable passport solutions — no hidden charges.",
  },
];

const steps = [
  {
    icon: <FaRegPlayCircle size={30} className="text-blue-500" />,
    title: "Begin Application",
    desc: 'Click "Get Started" to initiate your passport request.',
  },
  {
    icon: <FaWpforms size={30} className="text-green-400" />,
    title: "Submit Documents",
    desc: "Upload the required documents using our secure form.",
  },
  {
    icon: <FaHeadset size={30} className="text-yellow-400" />,
    title: "We’ll Review & Assist",
    desc: "Our team will verify your details and assist further.",
  },
  {
    icon: <FaPlaneDeparture size={30} className="text-purple-400" />,
    title: "Receive & Travel",
    desc: "Once approved, your passport is ready — time to explore!",
  },
];

const Passport = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  const dispatch = useDispatch();

  const handleFormModal = () => {
    dispatch(setModalForm("passport"));
  };

  return (
    <div className="py-20">
      {/* herosection */}
      <div className="flex flex-col items-center justify-center h-[90vh] bg-[url('/backgrounds/passportPage.jpg')] bg-cover bg-center">
        <SplitText
          text="Get Your Passport Fast and Hassle-Free Today"
          className="text-xl md:text-4xl lg:text-5xl font-medium text-center mb-6"
          delay={100}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="NovixaOutCubic"
          threshold={0.2}
          rootMargin="-50px"
        />
        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, Novixa: "NovixaOut" }}
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
            Ready to Get Your Passport Done?
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Apply, renew, or replace — Novixa Travels India make passport
            processing smooth and stress-free.
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

export default Passport;
