"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
    options: ["Early Morning", "Morning", "Mid Day", "Night"],
  },
  {
    title: "No Of Adult",
    name: "numberOfAdult",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "more"],
  },
  {
    title: "No Of Child",
    name: "numberOfChild",
    options: ["0", "1", "2", "3", "4", "5", "more"],
  },
  {
    title: "Class",
    name: "travelClass",
    options: ["Economy", "Business", "First Class"],
  },
  {
    title: "Trip Type",
    name: "tripType",
    options: ["One Way", "Round Trip"],
  },
  {
    title: "Stop",
    name: "stop",
    options: ["Direct", "1 Stop", "Multi Stop"],
  },
];

const ServiceInfo = ({ data, setData }) => {
  const [date, setDate] = useState(
    data?.date || {
      from: new Date(2022, 0, 20),
      to: addDays(new Date(2022, 0, 20), 20),
    }
  );

  const handleChange = (e) => {
    setData({ ...data, date, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setData({ ...data, date, [name]: value });
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
            <Label>Departure/Arrival</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-fit justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setData({ ...data, date: newDate });
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
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

export default ServiceInfo;
