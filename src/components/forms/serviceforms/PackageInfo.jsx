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
    title: "Who is Traveling",
    name: "whoIsTraveling",
    options: [
      { label: "Couple", info: "Traveling as a couple" },
      { label: "Family", info: "Family trip with adults and children" },
      { label: "Friends", info: "Group of friends traveling together" },
    ],
  },
  {
    title: "Number Of Adult",
    name: "numberOfAdult",
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
    title: "Hotel Category",
    name: "hotelCategory",
    options: [
      { label: "3 Star", info: "Comfortable, affordable hotel options" },
      { label: "4 Star", info: "Premium hotels with extra facilities" },
      { label: "5 Star", info: "Luxury hotels with top-class amenities" },
    ],
  },
  {
    title: "Number Of Rooms",
    name: "numberOfRooms",
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
    title: "Meal Plan",
    name: "mealPlan",
    options: [
      { label: "Room Only (RO)", info: "No meals included" },
      { label: "Continental Plan (CP)", info: "Breakfast included" },
      { label: "Bed & Breakfast (BB)", info: "Stay with breakfast" },
      {
        label: "Modified American Plan (MAP)",
        info: "Breakfast + one main meal (lunch/dinner)",
      },
      { label: "American Plan (AP)", info: "All three meals included" },
    ],
  },
  {
    title: "Want To Include Flight",
    name: "wantToIncludeFlight",
    options: [
      { label: "Yes", info: "Include flight tickets in the package" },
      { label: "No", info: "Only hotel and other services, no flights" },
    ],
  },
];

const PackageInfo = ({ data, setData }) => {
  const [info, setInfo] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const calculateNights = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate - startDate;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-2xl lg:max-w-5xl rounded-none bg-white p-4 md:rounded-2xl dark:bg-black">
      <form className="my-2">
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="from">Country You Are Travelling From</Label>
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
            <Label htmlFor="to">Country/City You Want To Travel</Label>
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
            <Label htmlFor="arrival">Arrival Date</Label>
            <Input
              type="date"
              id="arrival"
              name="arrivalDate"
              value={data?.arrivalDate ? data.arrivalDate.substring(0, 10) : ""}
              onChange={(e) => {
                const newArrival = e.target.value;
                const newDeparture = data.departureDate;
                const nights = calculateNights(newArrival, newDeparture);
                setData({
                  ...data,
                  arrivalDate: newArrival,
                  numberOfNights:
                    nights > 0 ? nights.toString() : data.numberOfNights,
                });
              }}
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
              onChange={(e) => {
                const newDeparture = e.target.value;
                const newArrival = data.arrivalDate;
                const nights = calculateNights(newArrival, newDeparture);
                setData({
                  ...data,
                  departureDate: newDeparture,
                  numberOfNights:
                    nights > 0 ? nights.toString() : data.numberOfNights,
                });
              }}
            />
          </LabelInputContainer>
        </div>
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
          <LabelInputContainer className="flex-1">
            <Label htmlFor="numberOfNights">Number of Nights</Label>
            <Input
              onChange={handleChange}
              value={data?.numberOfNights || ""}
              name="numberOfNights"
              id="numberOfNights"
              placeholder="1"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="flex-1">
          <Label htmlFor="budgetperperson">Budget Per Person</Label>
          <Input
            onChange={handleChange}
            value={data?.budgetPerPerson || ""}
            name="budgetPerPerson"
            id="budgetperperson"
            placeholder="25000"
            type="text"
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

export default PackageInfo;
