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

const applicationType = [
  { label: "Fresh", info: "Applying for a new application for the first time" },
  { label: "Tatkal", info: "Urgent processing under fast-track service" },
  {
    label: "Re-Issue",
    info: "Re-applying due to expiry, exhaustion, or changes",
  },
  {
    label: "Correction",
    info: "Correction of mistakes (name, DOB, address, etc.)",
  },
  {
    label: "Lost/Damage",
    info: "Lost or physically damaged application needs replacement",
  },
];

const PassportInfo = ({ data, setData }) => {
  const [info, setInfo] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setData({ ...data, applicationType: value });
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-2xl lg:max-w-5xl rounded-none bg-white p-4 md:rounded-2xl dark:bg-black">
      <form className="my-2">
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="middlename">Middle Name</Label>
            <Input
              onChange={handleChange}
              value={data?.middleName || ""}
              name="middleName"
              id="middlename"
              placeholder="Singh"
              type="text"
            />
          </LabelInputContainer>
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
        </div>
        <div className="mb-4 flex flex-col items-center justify-center space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer className="flex-1">
            <Label htmlFor="state">State</Label>
            <Input
              onChange={handleChange}
              value={data?.state || ""}
              name="state"
              id="state"
              placeholder="UttarPradesh"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="flex-1">
            <Label htmlFor="city">City</Label>
            <Input
              onChange={handleChange}
              value={data?.city || ""}
              name="city"
              id="city"
              placeholder="Agra"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="flex-1">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              onChange={handleChange}
              value={data?.pincode || ""}
              name="pincode"
              id="pincode"
              placeholder="282006"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="flex-1">
          <Label>Application Type</Label>
          <Select
            value={data?.applicationType || ""}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Application Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="flex items-center justify-between">
                  Application Type
                  <Info onClick={() => setInfo(!info)} />
                </SelectLabel>
                {applicationType.map((option) => (
                  <SelectItem key={option.label} value={option.label}>
                    {option.label}
                    {info && <p>- {option.info}</p>}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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

export default PassportInfo;
