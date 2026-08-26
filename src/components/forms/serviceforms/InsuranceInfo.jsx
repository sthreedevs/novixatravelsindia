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
    title: "No Of Days",
    name: "numberOfDays",
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
    title: "No Of Passengers",
    name: "numberOfPassengers",
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
    title: "Type Of Insurance",
    name: "typeOfInsurance",
    options: [
      { label: "Individual", info: "Insurance for a single person" },
      {
        label: "Annual Multitrip",
        info: "Coverage for multiple trips over a year",
      },
      { label: "Family", info: "Insurance plan for family members" },
      { label: "Friends", info: "Insurance plan for a group of friends" },
      {
        label: "Student",
        info: "Insurance tailored for students studying abroad",
      },
    ],
  },
  {
    title: "Travelling From India",
    name: "travellingFromIndia",
    options: [
      { label: "Yes", info: "Traveler is departing from India" },
      { label: "No", info: "Traveler is departing from another country" },
    ],
  },
];

const InsuranceInfo = ({ data, setData }) => {
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
        <LabelInputContainer className="mb-4">
          <Label htmlFor="country">Countries</Label>
          <Input
            onChange={handleChange}
            value={data?.country || ""}
            name="country"
            id="country"
            placeholder="India"
            type="text"
          />
        </LabelInputContainer>
        <div className="mb-4 flex gap-2 flex-wrap">
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
        <LabelInputContainer className="flex-[0.5]">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            value={data?.startDate ? data.startDate.substring(0, 10) : ""}
            onChange={(e) => setData({ ...data, startDate: e.target.value })}
          />
        </LabelInputContainer>
        <LabelInputContainer className="flex-[0.5]">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            value={data?.endDate ? data.endDate.substring(0, 10) : ""}
            onChange={(e) => setData({ ...data, endDate: e.target.value })}
          />
        </LabelInputContainer>
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

export default InsuranceInfo;
