"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import { ImagesSlider } from "@/components/ui/images-slider";
import { cn } from "@/lib/utils";
import { Info, XCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/common/Loader";

// Updated FAQ data for Day Trips
const faqData = [
  {
    question: "What are Day Trips?",
    answer:
      "Day Trips offer short and memorable excursions that allow you to explore new places, enjoy scenic views, and experience local culture—all within a day! Whether you're looking for a relaxing escape or an adventurous outing, day trips are the perfect option.",
  },
  {
    question: "How do I book a Day Trip?",
    answer:
      "Booking a day trip is easy! Simply browse our selection of trips on our website, choose your preferred destination and itinerary, and book online. You'll receive all the details and instructions for a smooth and enjoyable experience.",
  },
  {
    question: "What should I bring on a Day Trip?",
    answer:
      "Depending on your trip, we recommend bringing comfortable clothing, sunscreen, water, and a camera to capture the memories. Some trips may require specific items, so be sure to check the details before you go.",
  },
  {
    question: "Are meals included in Day Trips?",
    answer:
      "Some day trips include meals, while others may offer a stop at local restaurants for lunch or snacks. Check the itinerary for each trip to see what is included in the package.",
  },
];

export const DayTripsPageClient = ({ dayTripsData, initialGuides }) => {
  const [modal, setModal] = useState(null);
  const [location, setLocation] = useState({});
  const dayTripData = dayTripsData || [];

  const getLocation = async () => {
    try {
      const response = await axios.get(
        "https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location"
      );
      setLocation(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="py-20">
      {/* Hero Section */}
      <ImagesSlider className="h-[40rem]" images={["/backgrounds/dayTrip.jpg"]}>
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
            Curated day trips for curious travelers—
            <br />
            <span className="text-[#bfa46f]">discover more in less time.</span>
          </motion.p>
        </motion.div>
      </ImagesSlider>
      {/* Main Section */}
      <div className="my-4 mx-4 max-w-6xl sm:mx-auto">
        <h1 className="text-3xl md:text-5xl mb-10 font-medium text-center">
          Trips
        </h1>
        <div className="space-y-6">
          {/* Loop through the trips data */}
          {dayTripData?.map((trip) => (
            <div
              key={trip._id}
              className="w-full p-4 bg-zinc-50 border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
                  {trip.title}
                </h2>
                <Button onClick={() => setModal(trip)} className="mt-2 sm:mt-0">
                  Book Now
                </Button>
              </div>
              <Image
                src={trip.thumbnail || "/placeholder.jpg"}
                alt={trip.title || "thumbnail"}
                width={800}
                height={400}
                className="w-full h-[30vh] sm:h-[40vh] object-cover rounded-md mb-3"
              />
              <p className="text-sm text-gray-600 mb-3">{trip.description}</p>
              <div className="space-y-3">
                {trip.descriptionList?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Details
                    </h3>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {trip.descriptionList.map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {trip.inclusionList?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Inclusions
                    </h3>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {trip.inclusionList.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {trip.exclusionList?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Exclusions
                    </h3>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {trip.exclusionList.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {trip.info?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Additional Information
                    </h3>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {trip.info.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="mt-3 text-right text-sm text-gray-800">
                <p>
                  <strong>Starting From: </strong>
                  {location && location.country === "IN"
                    ? `₹${trip.domesticPrice}`
                    : `${trip.internationalPrice}` || trip.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* FAQs Section */}
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
      {modal && (
        <ModalForm location={location} tripData={modal} setModal={setModal} initialGuides={initialGuides} />
      )}
    </div>
  );
};

const ModalForm = ({ tripData, setModal, location, initialGuides }) => {
  const [guides, setGuides] = useState(initialGuides || []);
  const [finalAmount, setFinalAmount] = useState(
    location && location.country === "IN"
      ? Number(tripData.domesticPrice)
      : Number(tripData.internationalPrice)
  );
  const [data, setData] = useState({
    dayTrip: tripData?._id || "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    travelDate: "",
    numberOfAdults: "1",
    numberOfChildren: "0",
    pickupLocation: "",
    dropLocation: "",
    flightArrivalTime: "",
    flightDepartureTime: "",
    languagePreference: "English",
    needGuide: false,
    documents: [],
  });

  const [paymentType, setPaymentType] = useState(null); // "payNow" or "payAtPickup"
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Prevent negative numbers for adult/children fields
    const sanitizedValue =
      (name === "numberOfAdults" || name === "numberOfChildren") &&
      Number(value) < 0
        ? 0
        : value;

    const updatedData = {
      ...data,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? [...files]
          : sanitizedValue,
    };

    setData(updatedData);

    if (
      name === "numberOfAdults" ||
      name === "numberOfChildren" ||
      name === "needGuide" ||
      name === "languagePreference"
    ) {
      const baseAmount =
        location && location.country === "IN"
          ? Number(tripData.domesticPrice)
          : Number(tripData.internationalPrice);

      let guideAmount = 0;

      if (updatedData.needGuide) {
        const selectedGuide = guides.find(
          (guide) => guide.language === updatedData.languagePreference
        );
        if (selectedGuide) {
          guideAmount =
            location && location.country === "IN"
              ? Number(selectedGuide.domesticPrice)
              : Number(selectedGuide.internationalPrice);
        }
      }

      const adults = Math.max(0, Number(updatedData.numberOfAdults) || 0);
      const children = Math.max(0, Number(updatedData.numberOfChildren) || 0);

      // Add guide cost only once regardless of number of people
      const totalAmount = baseAmount * (adults + children) + guideAmount;

      setFinalAmount(totalAmount);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentType) {
      toast.error("Please select a payment option first!");
      return;
    }

    if (paymentType === "payNow") {
      await handleOnlinePayment();
    } else {
      await handleOfflinePayment();
    }
  };

  const handleOfflinePayment = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "documents" && value.length) {
          value.forEach((file) => formData.append("documents", file));
        } else {
          formData.append(key, value);
        }
      });

      formData.append("paymentMethod", "offline");
      formData.append("paymentStatus", "pending");
      formData.append("paymentId", "");

      await import("@/lib/actions/enquiry.js").then((m) => m.submitEnquiry("dayTrip", formData));

      toast.success("Booking submitted for payment at pickup!");
      setModal(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit booking");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnlinePayment = async () => {
    setIsLoading(true);
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    try {
      // Create order from server first if needed
      const orderRes = await axios.post(
        "/api/payment/createOrder",
        {
          amount: finalAmount, // 5000 paise = 50 INR (set dynamically)
          serviceName: tripData.title,
          currency: location && location?.country === "IN" ? "INR" : "USD",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { id: order_id, amount, currency } = orderRes.data;

      const options = {
        key: "rzp_live_hgu6JJkhvITzhB",
        amount,
        currency,
        order_id,
        name: "Day Trip Booking",
        description: "Trip Payment",
        handler: async (response) => {
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            if (key === "documents" && value.length) {
              value.forEach((file) => formData.append("documents", file));
            } else {
              formData.append(key, value);
            }
          });

          formData.append("paymentMethod", "online");
          formData.append("paymentStatus", "success");
          formData.append("paymentId", response.razorpay_payment_id);

          await import("@/lib/actions/enquiry.js").then((m) => m.submitEnquiry("dayTrip", formData));
          toast.success("Payment Successful! Booking Confirmed");
          setModal(null);
          await axios.post(
            "/api/payment/updateStatus",
            {
              paymentId: response.razorpay_payment_id,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment Failed");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex flex-col items-center justify-center">
      <XCircle size={40} onClick={() => setModal(null)} />

      <div className="shadow-input h-[70vh] overflow-y-scroll no-scrollbar mx-auto w-full max-w-2xl lg:max-w-5xl bg-white dark:bg-black p-4 md:rounded-2xl rounded-none">
        <form className="my-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            {/* First Name */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={data.firstName}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>

            {/* Last Name */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={data.lastName}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </div>
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            {/* Email */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>

            {/* Phone */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={data.phone}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </div>
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            {/* Emergency Contact */}
            <LabelInputContainer className="mb-4 flex-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                type="tel"
                value={data.emergencyContact}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            {/* Number of Adults and Children */}
            <LabelInputContainer className="flex-1">
              <Label htmlFor="numberOfAdults">Adults</Label>
              <Input
                id="numberOfAdults"
                name="numberOfAdults"
                min="0"
                type="number"
                value={data.numberOfAdults}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="flex-1">
              <Label htmlFor="numberOfChildren">Children</Label>
              <Input
                id="numberOfChildren"
                name="numberOfChildren"
                min="0"
                type="number"
                value={data.numberOfChildren}
                onChange={handleChange}
              />
            </LabelInputContainer>
            {/* Travel Date */}
            <LabelInputContainer className="mb-4  flex-1">
              <Label htmlFor="travelDate">Travel Date</Label>
              <Input
                id="travelDate"
                name="travelDate"
                type="date"
                value={data.travelDate}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </div>

          {/* Pickup Location */}
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="pickupLocation">Pickup Location</Label>
              <Input
                id="pickupLocation"
                name="pickupLocation"
                type="text"
                value={data.pickupLocation}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="dropLocation">Drop Location</Label>
              <Input
                id="dropLocation"
                name="dropLocation"
                type="text"
                value={data.dropLocation}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </div>

          {/* Need Guide */}

          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <div className="mb-4 flex items-center gap-2 flex-[0.3]">
              <input
                type="checkbox"
                id="needGuide"
                name="needGuide"
                checked={data.needGuide}
                onChange={handleChange}
              />
              <Label htmlFor="needGuide">Need Guide?</Label>
            </div>

            {data.needGuide && (
              <>
                <LabelInputContainer className="mb-4 flex-[0.7]">
                  <Label htmlFor="languagePreference">
                    Language Preference
                  </Label>
                  <select
                    id="languagePreference"
                    name="languagePreference"
                    value={data.languagePreference}
                    onChange={handleChange}
                    className="p-[10px] rounded-[4px] outline-none border-none bg-zinc-800 text-white"
                  >
                    <option value="">Select Language</option>
                    {guides?.map((guide) => (
                      <option key={guide._id} value={guide.language}>
                        {guide.language} -{" "}
                        {location?.country === "IN"
                          ? `₹${guide.domesticPrice}`
                          : `$${guide.internationalPrice}`}{" "}
                        additional charge
                      </option>
                    ))}
                  </select>
                </LabelInputContainer>
              </>
            )}
          </div>

          {/* Flight Arrival and Departure */}
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <LabelInputContainer className="flex-1">
              <Label htmlFor="flightArrivalTime">Flight Arrival Time</Label>
              <Input
                id="flightArrivalTime"
                name="flightArrivalTime"
                type="time"
                value={data.flightArrivalTime}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="flex-1">
              <Label htmlFor="flightDepartureTime">Flight Departure Time</Label>
              <Input
                id="flightDepartureTime"
                name="flightDepartureTime"
                type="time"
                value={data.flightDepartureTime}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>

          {/* Documents */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="documents">Upload Documents (any id proof)</Label>
            <input
              id="documents"
              name="documents"
              type="file"
              multiple
              onChange={handleChange}
              required
              className="p-[10px] rounded-[4px] outline-none border-none bg-zinc-800 text-white"
            />
          </LabelInputContainer>
          {/* Payment Options */}
          <PricingTooltip
            location={location}
            finalAmount={finalAmount}
            data={data}
            tripData={tripData}
            guides={guides}
          />
          <div className="flex gap-4 mb-4">
            <Button
              type="button"
              onClick={() => setPaymentType("payNow")}
              className={`px-4 py-2 rounded-md ${
                paymentType === "payNow"
                  ? "bg-[#BFA181] text-white"
                  : "bg-gray-200"
              }`}
            >
              Pay Now
            </Button>
            <Button
              type="button"
              onClick={() => setPaymentType("payAtPickup")}
              className={`px-4 py-2 rounded-md ${
                paymentType === "payAtPickup"
                  ? "bg-[#BFA181] text-white"
                  : "bg-gray-200"
              }`}
            >
              Pay at Pickup
            </Button>
            <span className="text-sm">*Select an option then submit</span>
          </div>

          {/* Submit */}
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <span>Submitting...</span> // Show loading text or spinner when submitting
            ) : (
              <>
                Submit &rarr;
                <BottomGradient />
              </>
            )}
          </button>
          <BottomGradient />
        </form>
      </div>
    </div>
  );
};

const PricingTooltip = ({ location, finalAmount, data, tripData, guides }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const currency = location?.country === "IN" ? "₹" : "$";
  const basePrice =
    location?.country === "IN"
      ? Number(tripData.domesticPrice)
      : Number(tripData.internationalPrice);

  const adults = Number(data.numberOfAdults) || 0;
  const children = Number(data.numberOfChildren) || 0;
  const totalPersons = adults + children;

  const guide = guides?.find((g) => g.language === data.languagePreference);

  const guidePrice =
    data.needGuide && guide
      ? location?.country === "IN"
        ? Number(guide.domesticPrice)
        : Number(guide.internationalPrice)
      : 0;

  return (
    <div className="relative inline-block mb-2">
      <p className="font-semibold cursor-pointer flex gap-2 items-center ">
        Final Amount: {currency}
        {finalAmount}
        <Info
          onClick={() => setIsTooltipVisible(!isTooltipVisible)}
          size={22}
        />
      </p>

      {isTooltipVisible && (
        <div className="absolute -top-60 z-50 w-72 bg-white text-gray-800 text-sm border rounded-lg shadow-lg p-4 mt-2">
          <h4 className="font-bold mb-2">Pricing Breakdown</h4>
          <ul className="space-y-1">
            <li>
              <strong>Base Price / Person:</strong> {currency}
              {basePrice}
            </li>
            <li>
              <strong>Adults:</strong> {adults}
            </li>
            <li>
              <strong>Children:</strong> {children}
            </li>
            <li>
              <strong>Total Base:</strong> {currency}
              {basePrice * totalPersons}
            </li>
            {data.needGuide && guide && (
              <li>
                <strong>Guide ({guide.language}):</strong> {currency}
                {guidePrice}
              </li>
            )}
            <li className="font-bold border-t pt-2 mt-2">
              Final: {currency}
              {finalAmount}
            </li>
          </ul>
        </div>
      )}
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
