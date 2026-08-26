"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const selectData = [
  {
    title: "Preferred Time",
    name: "preferredTime",
    options: [
      { label: "Early Morning", info: "Between 12 AM - 6 AM" },
      { label: "Morning", info: "Between 6 AM - 12 PM" },
      { label: "Mid Day", info: "Between 12 PM - 6 PM" },
      { label: "Night", info: "Between 6 PM - 12 AM" },
    ],
  },
  {
    title: "No Of Adult",
    name: "numberOfAdults",
    options: [
      { label: "1" },
      { label: "2" },
      { label: "3" },
      { label: "4" },
      { label: "5" },
      { label: "6" },
      { label: "7" },
      { label: "8" },
      { label: "9" },
      { label: "more" },
    ],
  },
  {
    title: "No Of Child",
    name: "numberOfChild",
    options: [
      { label: "0" },
      { label: "1" },
      { label: "2" },
      { label: "3" },
      { label: "4" },
      { label: "5" },
      { label: "more" },
    ],
  },
  {
    title: "Class",
    name: "travelClass",
    options: [
      { label: "Economy", info: "Affordable seating with basic services" },
      {
        label: "Business",
        info: "Premium seating with extra comfort and services",
      },
      { label: "First Class", info: "Luxury seating with top-tier services" },
    ],
  },
  {
    title: "Trip Type",
    name: "tripType",
    options: [
      { label: "One Way", info: "Flight to destination without return" },
      { label: "Round Trip", info: "Flight to destination and back" },
    ],
  },
  {
    title: "Stop",
    name: "stop",
    options: [
      { label: "Direct", info: "Non-stop flight" },
      { label: "1 Stop", info: "One connecting stop" },
      { label: "Multi Stop", info: "Multiple connecting stops" },
    ],
  },
];

const FlightInfo = ({ data, setData }) => {
  const [info, setInfo] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-2xl lg:max-w-5xl rounded-none bg-white p-4 md:rounded-2xl dark:bg-black">
      <form className="my-2">
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="from">From</Label>
            <Input
              onChange={handleChange}
              value={data?.from || ""}
              name="from"
              id="from"
              placeholder="India"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="to">To</Label>
            <Input
              onChange={handleChange}
              value={data?.to || ""}
              name="to"
              id="to"
              placeholder="Dubai"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <div className="mb-4 flex flex-col items-center justify-center space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer className="flex-1">
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              onChange={handleChange}
              value={data?.nationality || ""}
              name="nationality"
              id="nationality"
              placeholder="Indian"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="flex-[0.5]">
            <Label htmlFor="airline">Airline</Label>
            <Input
              onChange={handleChange}
              value={data?.airline || ""}
              name="airline"
              id="airline"
              placeholder="Indigo"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="flex-[0.5]">
            <Label htmlFor="arrival">Arrival Date</Label>
            <Input
              type="date"
              id="arrival"
              name="arrivalDate"
              value={data?.arrivalDate ? data.arrivalDate.substring(0, 10) : ""}
              onChange={(e) =>
                setData({ ...data, arrivalDate: e.target.value })
              }
            />
          </LabelInputContainer>
          <LabelInputContainer className="flex-[0.5]">
            <Label htmlFor="departure">Departure Date</Label>
            <Input
              type="date"
              id="departure"
              name="departureDate"
              value={
                data?.departureDate ? data.departureDate.substring(0, 10) : ""
              }
              onChange={(e) =>
                setData({ ...data, departureDate: e.target.value })
              }
            />
          </LabelInputContainer>
        </div>
        <div className="flex gap-2 flex-wrap">
          {selectData.map((item) => (
            <LabelInputContainer key={item.title} className="flex-1">
              <Label>{item.title}</Label>
              <Select
                value={data?.[item.name] || ""}
                onValueChange={(value) => handleSelectChange(item.name, value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={item.title} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="flex items-center justify-between">
                      {item.title}
                      {item?.options[0]?.info && (
                        <Info onClick={() => setInfo(!info)} />
                      )}
                    </SelectLabel>
                    {item.options.map((option) => (
                      <SelectItem key={option.label} value={option.label}>
                        <p>{option.label}</p>
                        {info && option?.info && <p>- {option.info}</p>}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelInputContainer>
          ))}
        </div>
      </form>
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

export default FlightInfo;
