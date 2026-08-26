"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import { FaCarSide, FaBusAlt, FaClock, FaRupeeSign } from "react-icons/fa";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
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

const services = [
  {
    icon: <FaRupeeSign size={28} className=" text-green-600" />,
    title: "Affordable Pricing",
    desc: "Transparent rates with no hidden charges.",
  },
  {
    icon: <FaClock size={28} className=" text-blue-600" />,
    title: "On-Time Service",
    desc: "Always punctual, no delays guaranteed.",
  },
  {
    icon: <FaCarSide size={28} className=" text-red-600" />,
    title: "Well-Maintained Vehicles",
    desc: "Clean, sanitized & ready to roll.",
  },
  {
    icon: <FaBusAlt size={28} className=" text-[#BFA181]" />,
    title: "Wide Fleet",
    desc: "From hatchbacks to tempo travelers.",
  },
];
const vehicles = [
  {
    name: "Hatchback",
    image:
      "https://images.unsplash.com/photo-1605270396307-d00ba5cda1d0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3dpZnQlMjBjYXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Sedan",
    image:
      "https://images.unsplash.com/photo-1726003536800-b9ec0888cf36?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXVkaSUyMGE0fGVufDB8fDB8fHww",
  },
  {
    name: "SUV",
    image:
      "https://images.unsplash.com/photo-1622893288761-823ba60f17a6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3V2fGVufDB8fDB8fHww",
  },
  {
    name: "Mini Bus",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt97gGXC9eruu72QLY-KV5no4ZFpOgCehX4g&s",
  },
];
const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
const faqData = [
  {
    question: "What types of vehicles are available for rent?",
    answer:
      "We offer a wide range including sedans, SUVs, minibuses, and luxury coaches based on your group size and preference.",
  },
  {
    question: "Is a driver included with the rental?",
    answer:
      "Yes, all rentals include a professional driver. Self-drive is currently not available for buses and outstation cars.",
  },
  {
    question: "How are rental charges calculated?",
    answer:
      "Charges depend on the vehicle type, distance, duration, and any additional services like tolls or parking.",
  },
  {
    question: "Can I make changes to my booking after confirmation?",
    answer:
      "Yes, you can reschedule or change pickup/drop locations depending on availability. Contact support for changes.",
  },
  {
    question: "Are your vehicles sanitized and safe?",
    answer:
      "Yes, all vehicles are sanitized before every trip and drivers follow safety protocols including mask usage.",
  },
];

const steps = ["Select Vehicle", "Pick Date & Time", "Confirm Booking"];

const CarBusRental = () => {
  const dispatch = useDispatch();

  const handleFormModal = () => {
    dispatch(setModalForm("transport"));
  };

  return (
    <div className="py-20">
      {/* hero section */}
      <div className="h-[30rem] sm:h-[40rem] flex justify-center items-center px-4">
        <div className="h-[30rem] sm:h-[40rem] flex justify-center items-center px-4">
          <div className="text-2xl lg:text-6xl md:text-4xl sm:text-7xl mx-auto font-normal">
            Book your
            <FlipWords words={["rentals", "transfers", "rides"]} />
            <br />
            for every destination
            <FlipWords words={["anytime", "anywhere"]} />
            effortlessly.
          </div>
        </div>
      </div>

      {/* Vehicles Section */}
      <div className="py-10 text-center px-4 my-10">
        <h2 className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold">
          Choose Your Ride
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={index}
              vehicle={vehicle}
              index={index}
              handleFormModal={handleFormModal}
            />
          ))}
        </div>
      </div>

      {/* Booking Steps Section */}
      <div className="py-16 px-4 text-center my-10">
        <h2 className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold">
          How to Book
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-10 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={index + 1}
              title={step}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 text-center my-10">
        <motion.h2
          className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Ready to ride with us?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="w-40 mx-auto"
        >
          <Button className="w-full" onClick={handleFormModal}>
            Book Now
          </Button>
        </motion.div>
      </div>
      {/* testimonials section */}
      <div className="my-10">
        <h1 className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold">
          Testimonials
        </h1>
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          className="mx-auto"
        />
      </div>

      {/* Service Highlights */}
      <div className="py-16 px-4">
        <h2 className="text-3xl md:text-6xl mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-semibold">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-4 max-w-7xl mx-auto">
          {services.map((feature) => (
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

const VehicleCard = ({ vehicle, index, handleFormModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (window.innerWidth < 768) {
      setIsHovered((prev) => !prev);
    }
  };

  return (
    <motion.div
      onClick={handleCardClick}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative w-full max-w-sm rounded-2xl overflow-hidden shadow-md hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={vehicle.image || "/placeholder.jpg"}
          alt={vehicle.name || "vehicle"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {vehicle.type || "Available"}
        </span>
      </div>

      {/* Hover or Click Text Content */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-4 bg-black/60 transition-opacity duration-500
          ${isHovered ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}
      >
        <h3 className="text-white text-lg font-semibold">{vehicle.name}</h3>
        <p className="text-sm text-gray-200 mb-2">₹999 day</p>
        <Button onClick={handleFormModal}>Book Now</Button>
      </div>
    </motion.div>
  );
};

const StepCard = ({ number, title, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.2 }}
      className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md flex-1 text-center"
    >
      <div className="text-2xl font-bold text-[#bfa46f] mb-2">{number}</div>
      <div className="font-medium">{title}</div>
    </motion.div>
  );
};

export default CarBusRental;
