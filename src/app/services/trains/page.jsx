"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
  FaCheckCircle,
  FaMapMarkedAlt,
  FaSearchLocation,
  FaSmile,
  FaTrain,
  FaWallet,
  FaWpforms,
} from "react-icons/fa";

const faqData = [
  {
    question: "Can I choose my seat while booking a train ticket?",
    answer:
      "Seat selection isn't guaranteed, but preferences like lower or upper berths can be selected during booking.",
  },
  {
    question: "Do you support Tatkal bookings?",
    answer:
      "Yes, we support both regular and Tatkal train ticket bookings as per IRCTC availability.",
  },
  {
    question: "How will I receive my train ticket?",
    answer:
      "Your ticket will be sent via email and SMS once the booking is confirmed.",
  },
  {
    question: "What if my ticket is in waitlist?",
    answer:
      "Waitlisted tickets are automatically updated as per IRCTC rules. You’ll get real-time updates.",
  },
  {
    question: "Can I cancel a train ticket after booking?",
    answer:
      "Yes, cancellations are allowed according to IRCTC's cancellation policy. Refunds are processed accordingly.",
  },
];
const popularRoutes = [
  {
    from: "Delhi",
    to: "Mumbai",
    duration: "15h",
    image:
      "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVtYmFpfGVufDB8fDB8fHww",
  },
  {
    from: "Chennai",
    to: "Bangalore",
    duration: "6h",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hlbm5haXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    from: "Kolkata",
    to: "Delhi",
    duration: "17h",
    image:
      "https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8S29sa2F0YXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    from: "Hyderabad",
    to: "Pune",
    duration: "12h",
    image:
      "https://images.unsplash.com/photo-1551161242-b5af797b7233?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SHlkZXJhYmFkfGVufDB8fDB8fHww",
  },
];
const steps = [
  {
    icon: <FaSearchLocation size={30} className="text-blue-500" />,
    title: "Search Trains",
    desc: "Enter your source, destination, and travel date to begin.",
  },
  {
    icon: <FaWpforms size={30} className="text-green-400" />,
    title: "Select & Fill Details",
    desc: "Choose your preferred train and provide passenger information.",
  },
  {
    icon: <FaCheckCircle size={30} className="text-yellow-400" />,
    title: "Confirm Booking",
    desc: "Review your journey details and confirm the ticket.",
  },
  {
    icon: <FaTrain size={30} className="text-purple-400" />,
    title: "Board the Train",
    desc: "Get your ticket, head to the station, and enjoy your trip!",
  },
];
const features = [
  {
    icon: <FaTrain size={30} />,
    title: "Easy Train Booking",
    desc: "Book train tickets effortlessly with our user-friendly interface.",
  },
  {
    icon: <FaMapMarkedAlt size={30} />,
    title: "Nationwide Coverage",
    desc: "Access train routes and destinations all over the country.",
  },
  {
    icon: <FaSmile size={30} />,
    title: "24/7 Customer Support",
    desc: "Our travel team is here to help you anytime, anywhere.",
  },
  {
    icon: <FaWallet size={30} />,
    title: "Affordable Pricing",
    desc: "Enjoy competitive fares with no hidden charges or surprises.",
  },
];

const TrainBooking = () => {
  const dispatch = useDispatch();

  const handleFormModal = () => {
    dispatch(setModalForm("train"));
  };

  return (
    <div className="py-20">
      {/* Hero section */}
      <div className="relative flex h-[90vh] w-full items-center justify-center :bg-black">
        <div
          className={cn(
            "absolute inset-0 bg-no-repeat bg-cover bg-center",
            "[background-image:url('/backgrounds/trainBooking.jpg')]"
          )}
        />
        <div className="relative flex items-center justify-center px-6 overflow-hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-opacity-60 z-0" />
          {/* Content */}
          <motion.div
            className="z-10 text-center max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className=" text-5xl mb-4 flex flex-col justify-center"
            >
              <h1 className="text-4xl sm:text-6xl text-yellow-600 font-bold leading-tight">
                Seamless Train Booking for Your Journey
              </h1>
              <p className="my-4 text-lg">
                Plan your journey with ease, book your train tickets in seconds,
                and travel stress-free with our seamless booking experience.
              </p>
            </motion.div>

            <Button
              className="px-6 py-3 transition duration-300"
              onClick={handleFormModal}
            >
              Book Now
            </Button>
          </motion.div>
        </div>
      </div>

      {/* How It Works */}
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

      {/* Popular routes */}
      <div className="py-20 px-6">
        <motion.h2
          className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Popular Routes
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {popularRoutes.map((route, index) => (
            <PopularRouteCard key={index} {...route} />
          ))}
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
            Ready to Begin Your Train Journey?
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Book trains, explore routes, and travel with comfort and ease — all
            in one place.
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
              Book Your Train Now
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us */}
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

const PopularRouteCard = ({ from, to, duration, image }) => {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl transition-transform duration-300 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 120,
        damping: 15,
        bounce: 0.25,
      }}
      viewport={{ once: true }}
    >
      <img
        src={image}
        alt={`${from} to ${to}`}
        className="w-full h-64 object-cover"
      />

      <div className="absolute inset-x-0 bottom-0 hover:bg-gradient-to-t from-orange/80 to-transparent px-6 py-5">
        <h3 className="text-xl font-bold text-white">
          {from} → {to}
        </h3>
        <span className="text-md text-gray-300">Duration: {duration}</span>
      </div>
    </motion.div>
  );
};

export default TrainBooking;
