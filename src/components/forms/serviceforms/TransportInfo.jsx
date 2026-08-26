"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
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

const selectData = [
  {
    title: "Number Of Adults",
    name: "numberOfAdults",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "more"],
  },
  {
    title: "Number Of Child",
    name: "numberOfChild",
    options: ["0", "1", "2", "3", "4", "5", "more"],
  },
  {
    title: "Car/Bus Type",
    name: "carBusType",
    options: [
      "5 Seater",
      "7 Seater",
      "12 Seater(Temp)",
      "14 Seater(Temp)",
      "Bus",
      "Airport Transfer",
    ],
  },
];

const TransportInfo = ({ data, setData }) => {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-2xl lg:max-w-5xl rounded-none bg-white p-4 md:rounded-2xl dark:bg-black">
      <form className="my-2">
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
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer className="w-full">
            <Label htmlFor="pickup">Pick-up Point</Label>
            <Input
              onChange={handleChange}
              value={data?.pickUp || ""}
              name="pickUp"
              id="pickup"
              placeholder="Delhi"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="w-full">
            <Label htmlFor="dropoff">Drop-off Point</Label>
            <Input
              onChange={handleChange}
              value={data?.dropOff || ""}
              name="dropOff"
              id="dropoff"
              placeholder="Agra"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer className="w-28 md:max-w-fit">
            <Label htmlFor="pickuptime">Pick-up Time</Label>
            <Input
              onChange={handleChange}
              value={data?.pickUpTime || ""}
              name="pickUpTime"
              id="pickuptime"
              type="time"
              step="60"
            />
          </LabelInputContainer>
        </div>
      </form>
    </div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>{children}</div>
  );
};

export default TransportInfo;
