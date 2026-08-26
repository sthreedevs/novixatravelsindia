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
    title: "No Of Rooms",
    name: "numberOfRooms",
    options: [
      { label: "1" },
      { label: "2" },
      { label: "3" },
      { label: "4" },
      { label: "5" },
      { label: "more" },
    ],
  },
  {
    title: "Hotel Category",
    name: "hotelCategory",
    options: [
      { label: "3 Star", info: "Standard comfort and services" },
      { label: "4 Star", info: "Superior comfort with extra amenities" },
      { label: "5 Star", info: "Luxury experience with top services" },
    ],
  },
  {
    title: "Meal Plan",
    name: "mealPlan",
    options: [
      { label: "Room-only (RO)", info: "No meals included" },
      { label: "Bed and Breakfast (B&B)", info: "Breakfast included only" },
      {
        label: "Continental Plan (CP)",
        info: "Breakfast included (continental style)",
      },
      {
        label: "Half-board (HB)",
        info: "Breakfast and one other meal (lunch or dinner)",
      },
      {
        label: "Full-board (FB)",
        info: "Breakfast, lunch, and dinner included",
      },
    ],
  },
];

const HotelInfo = ({ data, setData }) => {
  const [info, setInfo] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-2xl lg:max-w-5xl rounded-none bg-white p-4 md:rounded-2xl dark:bg-black">
      <form className="my-2">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="hotelname">Hotel Name</Label>
          <Input
            onChange={handleChange}
            value={data?.hotelName || ""}
            name="hotelName"
            id="hotelname"
            placeholder="The Leela Palace"
            type="text"
          />
        </LabelInputContainer>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="city">City (Travelling To)</Label>
            <Input
              onChange={handleChange}
              value={data?.city || ""}
              name="city"
              id="city"
              placeholder="Delhi"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="country">Country (Travelling To)</Label>
            <Input
              onChange={handleChange}
              value={data?.country || ""}
              name="country"
              id="country"
              placeholder="India"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <div className="mb-4 flex flex-col items-center justify-center space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
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
            <Label htmlFor="checkIn">Check-in</Label>
            <Input
              type="date"
              id="checkIn"
              name="checkInDate"
              value={data?.checkInDate ? data.checkInDate.substring(0, 10) : ""}
              onChange={(e) =>
                setData({ ...data, checkInDate: e.target.value })
              }
            />
          </LabelInputContainer>
          <LabelInputContainer className="flex-[0.5]">
            <Label htmlFor="checkOutDate">Check-out</Label>
            <Input
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              value={
                data?.checkOutDate ? data.checkOutDate.substring(0, 10) : ""
              }
              onChange={(e) =>
                setData({ ...data, checkOutDate: e.target.value })
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

export default HotelInfo;
