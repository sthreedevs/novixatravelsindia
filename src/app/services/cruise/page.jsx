"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { ImagesSlider } from "@/components/ui/images-slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const faqData = [
  {
    question: "What is Cruise Travel?",
    answer:
      "Cruise Travel offers unforgettable experiences across the world's oceans and rivers...",
  },
  {
    question: "How do I book a cruise?",
    answer:
      "Booking a cruise is easy! Simply fill out the form — our team will reach out to you shortly.",
  },
  {
    question: "What amenities are included in a cruise package?",
    answer:
      "Cruise packages typically include accommodations, meals, entertainment, and access to onboard activities...",
  },
];

const cabinOptions = ["Interior", "Oceanview", "Balcony", "Suite"];
const mealOptions = ["Vegetarian", "Non-Vegetarian", "Vegan", "Gluten-Free"];
const yesNoOptions = ["Yes", "No"];

const Cruise = () => {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { submitEnquiry } = await import("@/lib/actions/enquiry.js");
      const result = await submitEnquiry("cruise", data);
      
      if (result.success) {
        toast.success("Success! Enquiry submitted.");
        setData({});
      } else {
        toast.warning(result.error || "Oops! Something went wrong.");
      }
    } catch (error) {
      toast.warning("Oops! Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div className="py-20">
      <ImagesSlider
        className="h-[40rem]"
        images={["/backgrounds/cruiseBooking.jpg"]}
      >
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
            Embark on a journey beyond the horizon <br />
            <span className="text-yellow-600">
              with our premium cruise escapes.
            </span>
          </motion.p>
        </motion.div>
      </ImagesSlider>

      {/* form */}
      <div className="shadow-input mx-auto w-full max-w-2xl lg:max-w-6xl rounded-none bg-white p-4 md:rounded-2xl dark:bg-black">
        <form className="my-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label>First Name</Label>
              <Input
                name="firstName"
                placeholder="Tyler"
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Last Name</Label>
              <Input
                name="lastName"
                placeholder="Durden"
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>

          <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            <LabelInputContainer>
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="example@mail.com"
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Phone</Label>
              <Input
                name="phone"
                placeholder="+91..."
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Country</Label>
              <Input
                name="countryOfResidence"
                placeholder="India"
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>State</Label>
              <Input
                name="stateOfResidence"
                placeholder="Maharashtra"
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Cruise Destination</Label>
              <Input
                name="preferredCruiseDestination"
                placeholder="Caribbean"
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Departure City</Label>
              <Input
                name="preferredDepartureCity"
                placeholder="Mumbai"
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Travel Date</Label>
              <Input name="travelDates" type="date" onChange={handleChange} />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Number of Nights</Label>
              <Input
                name="numberOfNights"
                type="number"
                placeholder="5"
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Adults</Label>
              <Input
                name="numberOfAdults"
                type="number"
                placeholder="2"
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Children</Label>
              <Input
                name="numberOfChildren"
                type="number"
                placeholder="1"
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Senior Citizen?</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("anySeniorCitizen", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {yesNoOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Cabin Preference</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("cabinPreference", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {cabinOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label>Meal Preference</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("mealPreference", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {mealOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label>Special Requests</Label>
            <textarea
              name="specialRequests"
              placeholder="Any special needs..."
              className="p-[10px] rounded-[4px] outline-none border-none resize-none h-[140px] bg-zinc-800 text-white"
              onChange={handleChange}
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Submit &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>

      {/* faqs section */}
      <div className="mx-8 md:mx-20 lg:mx-30">
        <h1 className="text-3xl md:text-5xl mb-10 font-medium text-center">
          FAQs
        </h1>
        <Accordion type="single" collapsible>
          {faqData.map((item, index) => (
            <AccordionItem key={`item-${index}`} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-[#BFA181] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-[#BFA181] to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

export default Cruise;
