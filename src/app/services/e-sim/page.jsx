"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Globe, Headphones, Smartphone, X, Zap } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Grid } from "@/components/ui/grid";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import WixHero from "@/components/common/WixHero";

const grid = [
  {
    title: "Instant Activation",
    description:
      "Get online in minutes with quick eSIM activation—no physical SIM required.",
    icon: <Zap size={24} />, // Lightning bolt icon for speed
  },
  {
    title: "Global Coverage",
    description:
      "Enjoy seamless connectivity in over 100+ countries without roaming fees.",
    icon: <Globe size={24} />, // Globe icon for worldwide reach
  },
  {
    title: "No Physical SIM Needed",
    description:
      "Ditch the plastic! Enjoy a completely digital experience with eSIM technology.",
    icon: <Smartphone size={24} />, // Icon representing no physical SIM
  },
  {
    title: "24/7 Customer Support",
    description:
      "We're here for you anytime, anywhere. Get assistance whenever you need it.",
    icon: <Headphones size={24} />, // Headphones icon for support
  },
];

const faqData = [
  {
    question: "What is an eSIM?",
    answer:
      "An eSIM (embedded SIM) is a digital SIM that allows you to activate a cellular plan without a physical SIM card.",
  },
  {
    question: "Which devices support eSIM?",
    answer:
      "Most modern smartphones, tablets, and some smartwatches support eSIM, including recent models of iPhone, Samsung, Google Pixel, and more.",
  },
  {
    question: "Can I use an eSIM and physical SIM together?",
    answer:
      "Yes, many dual-SIM phones support one physical SIM and one eSIM, allowing you to use two numbers or plans simultaneously.",
  },
  {
    question: "Is eSIM available in all countries?",
    answer:
      "eSIM availability depends on local mobile operators. Many countries support it, but it's best to check with local providers.",
  },
  {
    question: "How do I activate my eSIM?",
    answer:
      "You'll typically receive a QR code or activation details after purchase. Scan the QR in your phone’s mobile network settings to activate.",
  },
];

const Esim = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    country: "",
    passport: null,
  });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("firstName", formData.firstname);
      data.append("lastName", formData.lastname);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("countryOfTravel", formData.country);
      data.append("document", formData.passport);
      if (selectedPlan?._id) {
        data.append("selectedDataPlan", selectedPlan._id);
      }
      const { submitEnquiry } = await import("@/lib/actions/enquiry.js");
      const result = await submitEnquiry("eSim", data);
      
      if (result.success) {
        toast.success("Success! Form submitted.");
        setFormData({
          firstname: "",
          lastname: "",
          phone: "",
          email: "",
          country: "",
          passport: null,
        });
      } else {
        toast.warning(result.error || "Oops! Something went wrong.");
      }
    } catch (error) {
      toast.warning(error.response.data.error || "Oops! Something went wrong.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  return (
    <div className="py-20 min-h-screen">
      {/* hero section */}
      <WixHero
        title="eSIM Service"
        content={["Stay connected.", "Instant activation."]}
        btnText="Get Now"
        top="3500"
      />
      {/* why us section */}
      <div className="my-10">
        <h1 className="text-3xl md:text-5xl mb-12 font-medium text-center">
          Why Choose Our eSIM?
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-4 max-w-7xl mx-4 md:mx-10 lg:mx-auto">
          {grid.map((feature) => (
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
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* form section */}
      <div className="flex flex-col lg:flex-row mx-2 md:mx-10 lg:mx-30 my-10">
        <div className="flex-[0.6] shadow-input mx-auto w-full max-w-2xl lg:max-w-5xl rounded-none bg-white p-4 md:rounded-2xl dark:bg-black">
          <h1 className="text-3xl md:text-5xl font-medium mb-10">
            Enquiry Form
          </h1>
          <form className="my-2" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <LabelInputContainer>
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  name="firstname"
                  placeholder="Tyler"
                  type="text"
                  onChange={handleChange}
                  value={formData?.firstname}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  name="lastname"
                  placeholder="Durden"
                  type="text"
                  onChange={handleChange}
                  value={formData?.lastname}
                />
              </LabelInputContainer>
            </div>
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <LabelInputContainer className="flex-[0.4]">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+01-234567890"
                  type="text"
                  onChange={handleChange}
                  value={formData?.phone}
                />
              </LabelInputContainer>
              <LabelInputContainer className="flex-[0.6]">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="tyler@duren.com"
                  type="email"
                  onChange={handleChange}
                  value={formData?.email}
                />
              </LabelInputContainer>
            </div>
            <div className="mb-4 flex flex-col justify-center items-center space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <LabelInputContainer className="flex-[0.8]">
                <Label htmlFor="country">Country Of Travel</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Tuvalu"
                  type="text"
                  onChange={handleChange}
                  value={formData?.country}
                />
              </LabelInputContainer>
              <LabelInputContainer className="flex-[0.2]">
                <Label htmlFor="passport">Data Plan</Label>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                >
                  {selectedPlan ? selectedPlan?.planName : "Select Plan"}
                </Button>
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="passport">Upload Passport Copy</Label>
              <Input
                id="passport"
                name="passport"
                type="file"
                onChange={handleChange}
              />
            </LabelInputContainer>
            <Button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
            >
              Submit &rarr;
              <BottomGradient />
            </Button>
          </form>
        </div>
        <div className="flex-[0.4] p-4 mt-2">
          <h1 className="text-3xl md:text-5xl font-medium mb-10">
            How it works?
          </h1>
          <div className="my-10 flex flex-col gap-2 justify-between">
            <div className="flex-1 border rounded-sm flex gap-4 items-end">
              <Image src="/esim/form.gif" alt="fill-form" width={200} height={200} className="w-auto h-32 md:h-48 object-contain" />
              <h1 className="text-xl md:text-2xl lg:text-4xl py-2">
                Fill the form and submit
              </h1>
            </div>
            <div className="flex-1 border rounded-sm flex gap-4 items-end">
              <Image src="/esim/payment.gif" alt="confirmation" width={200} height={200} className="w-auto h-32 md:h-48 object-contain" />
              <h1 className="text-xl md:text-2xl lg:text-3xl py-2">
                Recieve confirmation and payment link
              </h1>
            </div>
            <div className="flex-1 flex rounded-sm border gap-4 items-end">
              <Image src="/esim/email.gif" alt="qrcode" width={200} height={200} className="w-auto h-32 md:h-48 object-contain" />
              <h1 className="text-xl md:text-2xl lg:text-4xl py-4">
                Get E-Sim QR code via email
              </h1>
            </div>
          </div>
        </div>
        {/* data plan modal */}
        {open && (
          <DataPlanModal
            setOpen={setOpen}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        )}
      </div>
      {/* faqs section */}
      <div className="mx-8 md:mx-20 lg:mx-30">
        <h1 className="text-3xl md:text-5xl mb-10 font-medium text-center">
          FAQs
        </h1>
        <Accordion type="multiple" collapsible>
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

const DataPlanModal = ({ setOpen, selectedPlan, setSelectedPlan }) => {
  const [country, setCountry] = useState("");
  const [operator, setOperator] = useState("");
  const [availableCountries, setAvailableCountries] = useState([]);
  const [availableOperators, setAvailableOperators] = useState([]);
  const [availablePlans, setAvailablePlans] = useState([]);

  // Fetch all countries on mount
  useEffect(() => {
    axios
      .get("/api/esim/countries")
      .then((res) => setAvailableCountries(res.data.data))
      .catch((err) => console.error("Failed to load countries", err));
  }, []);

  // Fetch operators when country is selected
  useEffect(() => {
    if (country) {
      axios
        .get(`/api/esim/operators?country=${country}`)
        .then((res) => {
          setAvailableOperators(res.data.data);
          setOperator("");
          setAvailablePlans([]);
        })
        .catch((err) => console.error("Failed to load operators", err));
    }
  }, [country]);

  // Fetch plans when operator is selected
  useEffect(() => {
    if (country && operator) {
      axios
        .get(`/api/esim?country=${country}&operatorName=${operator}`)
        .then((res) => setAvailablePlans(res.data.data))
        .catch((err) => console.error("Failed to load plans", err));
    }
  }, [operator]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-lg bg-black text-white shadow-lg p-6 w-full h-[70vh] max-w-lg overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Select a Plan</h1>
          <Button onClick={() => setOpen(false)} variant="ghost">
            <X size={20} />
          </Button>
        </div>

        <LabelInputContainer>
          <Label>Country</Label>
          <Select onValueChange={(val) => setCountry(val)}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="max-w-xs overflow-x-scroll no-scrollbar">
                {availableCountries.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </LabelInputContainer>

        <LabelInputContainer>
          <Label>Operator</Label>
          <Select
            onValueChange={(val) => setOperator(val)}
            disabled={!availableOperators.length}
          >
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select an operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="max-w-xs overflow-x-scroll no-scrollbar">
                {availableOperators.map((op) => (
                  <SelectItem key={op} value={op}>
                    {op}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </LabelInputContainer>

        <div className="my-4 space-y-2 max-h-[40%] overflow-y-scroll no-scrollbar">
          {availablePlans.length === 0 ? (
            <p className="text-gray-500">
              Select country and operator to see plans.
            </p>
          ) : (
            availablePlans.map((plan, idx) => (
              <div
                key={idx}
                className={`border-b p-3 rounded-md cursor-pointer flex justify-between hover:bg-white/10 ${
                  selectedPlan?.planName === plan.planName ? "bg-white/10" : ""
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <p>
                  {plan.planName} – {plan.dataGB}GB / {plan.validityDays} days
                </p>
                <p>{plan.dataSpeed}</p>
              </div>
            ))
          )}
        </div>

        {selectedPlan && (
          <Button variant="outline" onClick={() => setOpen(false)}>
            Continue with {selectedPlan.planName}
          </Button>
        )}
      </div>
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

export default Esim;
