"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import { ImagesSlider } from "@/components/ui/images-slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "react-toastify";

const faqData = [
  {
    question: "What is Rail Europe?",
    answer:
      "At Novixa Travels India, we assist travelers in booking Rail Europe tickets and passes to make their European journey smooth and convenient.",
  },
  {
    question: "Can I book Rail Europe train tickets through Novixa Travels India?",
    answer:
      "Yes, Novixa Travels India helps you book Rail Europe train tickets and rail passes. Simply reach out to our team or submit a booking request through our website, and we’ll handle the rest.",
  },
  {
    question: "What types of rail passes are available?",
    answer:
      "Rail Europe offers several options, including the Eurail Pass and Interrail Pass, which allow flexible travel across multiple European countries. Our team at NovixaIndiaTravels can guide you in selecting the most suitable pass based on your travel plans.",
  },
];

const RailEurope = () => {
  return (
    <div className="py-20">
      {/* hero section */}
      <ImagesSlider
        className="h-[40rem]"
        images={["/backgrounds/railEurope.jpg"]}
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
            Glide through Europe&apos;s heartlands in style—
            <br />
            <span className="text-yellow-600">
              your rail journey begins here.
            </span>
          </motion.p>
        </motion.div>
      </ImagesSlider>
      {/* form */}
      <Tabs
        defaultValue="ticket"
        className="mx-auto w-full max-w-2xl lg:max-w-6xl"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ticket">Tickets</TabsTrigger>
          <TabsTrigger value="pass">Passes</TabsTrigger>
        </TabsList>
        <TabsContent value="ticket">
          <TicketForm />
        </TabsContent>
        <TabsContent value="pass">
          <PassForm />
        </TabsContent>
      </Tabs>
      {/* faqs section */}
      <div className="mx-8 md:mx-20 lg:mx-30">
        <h1 className="text-3xl md:text-5xl mb-10 font-medium text-center">
          FAQs
        </h1>
        <Accordion type="single" collapsible>
          {faqData.map((item, index) => {
            return (
              <AccordionItem key={`item-${index}`} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

const PassForm = () => {
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
      const result = await submitEnquiry("europeRailPass", data);
      
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

  const selectData = [
    {
      title: "Country",
      name: "country",
      options: [
        "All Europe",
        "Austria",
        "Belgium",
        "Benelux",
        "Bulgaria",
        "Czech Republic",
        "Germany",
        "Denmark",
        "Spain",
        "Finland",
        "France",
        "Great Britain",
        "Greece",
        "Croatia",
        "Hungary",
        "Italy",
        "Lithuania",
        "Luxembourg",
        "Netherlands",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Switzerland",
        "Serbia",
        "Scandinavia",
        "Sweden",
        "Slovenia",
      ],
    },
    {
      title: "Number of Travel Days",
      name: "numberOfTravelsDays",
      options: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
      ],
    },
    ,
    {
      title: "Adults (30-59 years)",
      name: "numberOfAdults",
      options: ["0", "1", "2", "3", "4", "5+"],
    },
    {
      title: "Youth (Under 30 years)",
      name: "numberOfYouth",
      options: ["0", "1", "2", "3", "4", "5+"],
    },
    {
      title: "Seniors (60+ years)",
      name: "numberOfSeniors",
      options: ["0", "1", "2", "3", "4", "5+"],
    },
  ];

  return (
    <div className="shadow-input mx-auto w-full max-w-2xl lg:max-w-6xl rounded-none bg-white p-4 md:rounded-2xl dark:bg-black">
      <form className="my-2" onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="Tyler"
              type="text"
              value={data.firstName || ""}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Durden"
              type="text"
              value={data.lastName || ""}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>

        {/* Contact & PAN */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2">
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="projectmayhem@fc.com"
              value={data.email || ""}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 99999 99999"
              value={data.phone || ""}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              value={data.dob || ""}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          <LabelInputContainer>
            <Label htmlFor="country">Country Of Residence</Label>
            <Input
              id="country"
              name="countryOfResidence"
              type="text"
              placeholder="India"
              value={data.country || ""}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="panNumber">PAN Number</Label>
            <Input
              id="panNumber"
              name="panNumber"
              placeholder="ABCDE1234F"
              value={data.panNumber || ""}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="validFrom">Valid From</Label>
            <Input
              id="validFrom"
              name="validFrom"
              type="date"
              value={data.validFrom || ""}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>

        {/* Selects */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {selectData.map((item) => (
            <LabelInputContainer key={item.title}>
              <Label>{item.title}</Label>
              <Select
                value={data?.[item.name] || ""}
                onValueChange={(value) => handleSelectChange(item.name, value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={item.title} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{item.title}</SelectLabel>
                    {item.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelInputContainer>
          ))}
        </div>

        {/* Submit Button */}
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Submit &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
};

const TicketForm = () => {
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
      const result = await submitEnquiry("europeRailTicket", data);
      
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

  const inputData = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "Tyler",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Durden",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "example@mail.com",
    },
    {
      label: "Phone",
      name: "phone",
      type: "text",
      placeholder: "+91 1234567890",
    },
    { label: "Date of Birth", name: "dob", type: "date" },
    {
      label: "PAN Number",
      name: "panNumber",
      type: "text",
      placeholder: "ABCDE1234F",
    },
    {
      label: "Country of Residence",
      name: "countryOfResidence",
      type: "text",
      placeholder: "India",
    },
    {
      label: "From City",
      name: "from",
      type: "text",
      placeholder: "Paris",
    },
    {
      label: "To City",
      name: "to",
      type: "text",
      placeholder: "Zurich",
    },
    { label: "Departure Date", name: "departureDate", type: "date" },
    {
      label: "Departure Time",
      name: "time",
      type: "time",
    },
  ];

  const selectData = [
    {
      title: "Trip Type",
      name: "tripType",
      options: ["One Way", "Round Trip"],
    },
    {
      title: "Travel Class",
      name: "travelClass",
      options: [
        "First Class (Non-Flex)",
        "First Class (Semi-Flex)",
        "Second Class (Non-Flex)",
        "Second Class (Semi-Flex)",
      ],
    },
    {
      title: "Adults (30-59 years)",
      name: "numberOfAdults",
      options: ["0", "1", "2", "3", "4", "5+"],
    },
    {
      title: "Youth (Under 30 years)",
      name: "numberOfYouth",
      options: ["0", "1", "2", "3", "4", "5+"],
    },
    {
      title: "Seniors (60+ years)",
      name: "numberOfSeniors",
      options: ["0", "1", "2", "3", "4", "5+"],
    },
  ];

  return (
    <div className="shadow-input mx-auto w-full max-w-2xl lg:max-w-6xl rounded-none bg-white p-4 md:rounded-2xl dark:bg-black">
      <form className="my-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {inputData.map((field) => (
            <LabelInputContainer key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder || ""}
                value={data[field.name] || ""}
                onChange={handleChange}
              />
            </LabelInputContainer>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {selectData.map((item) => (
            <LabelInputContainer key={item.name}>
              <Label>{item.title}</Label>
              <Select
                value={data?.[item.name] || ""}
                onValueChange={(value) => handleSelectChange(item.name, value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={item.title} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{item.title}</SelectLabel>
                    {item.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelInputContainer>
          ))}
        </div>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Submit &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-[#BFA181] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-[#BFA181] to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default RailEurope;
