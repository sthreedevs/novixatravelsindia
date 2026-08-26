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
    title: "Number Of Adult",
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
    title: "Number Of Child",
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
      { label: "Sleeper", info: "Non-AC sleeper coach (budget friendly)" },
      { label: "3AC", info: "AC 3-Tier (affordable air-conditioned travel)" },
      { label: "2AC", info: "AC 2-Tier (more comfort, fewer berths)" },
      { label: "1AC", info: "AC 1-Tier (luxury, private cabins)" },
    ],
  },
  {
    title: "Special Quota",
    name: "specialQuota",
    options: [
      {
        label: "Tatkal",
        info: "Emergency last-minute booking (extra charges apply)",
      },
      {
        label: "Senior Citizen",
        info: "Concession available for senior citizens",
      },
      {
        label: "Student",
        info: "Special discount for students (varies by route)",
      },
      { label: "Armed Force", info: "Quota reserved for defense personnel" },
    ],
  },
];

const TrainInfo = ({ data, setData }) => {
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
              placeholder="Delhi"
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
              placeholder="Agra"
              type="text"
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
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={item.title} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
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
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelInputContainer>
          ))}
        </div>
        <div className="mt-4 flex flex-col max-w-fit md:flex-row space-y-4 md:space-y-0 md:space-x-4">
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
          <LabelInputContainer className="w-full md:max-w-fit">
            <Label htmlFor="departuretime">Departure Time {"(Optional)"}</Label>
            <Input
              onChange={handleChange}
              value={data?.departureTime || ""}
              name="departureTime"
              id="departuretime"
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
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default TrainInfo;
