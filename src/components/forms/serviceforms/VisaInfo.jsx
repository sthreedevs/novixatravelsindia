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
    title: "Visa Type",
    name: "visaType",
    options: [
      {
        label: "Tourist",
        info: "For leisure travel, sightseeing, family visits",
      },
      {
        label: "Business",
        info: "For business meetings, conferences, work visits",
      },
      {
        label: "Transit",
        info: "For passing through a country to reach another destination",
      },
    ],
  },
  {
    title: "Number Of Applicant",
    name: "numberOfApplicant",
    options: [
      { label: "1" },
      { label: "2" },
      { label: "3" },
      { label: "4" },
      { label: "5" },
      { label: "more", info: "More than five applicants" },
    ],
  },
  {
    title: "Holding Dual Nationality",
    name: "holdingDualNationality",
    options: [
      { label: "Yes", info: "You hold passports of two countries" },
      { label: "No", info: "You have nationality of only one country" },
    ],
  },
  {
    title: "Marital Status",
    name: "maritalStatus",
    options: [
      { label: "Single", info: "Not married" },
      { label: "Married", info: "Legally married" },
      { label: "Divorced", info: "Legally separated/divorced" },
    ],
  },
  {
    title: "Employment",
    name: "employment",
    options: [
      { label: "Salaried", info: "Working for a company/organization" },
      { label: "Self Employed", info: "Running your own business" },
      {
        label: "Professional",
        info: "Practicing as a licensed professional (doctor, lawyer, etc.)",
      },
    ],
  },
  {
    title: "I Have 3 Years ITR",
    name: "hasThreeYearsITR",
    options: [
      {
        label: "Yes",
        info: "You have filed Income Tax Returns for the last 3 years",
      },
      { label: "No", info: "You have NOT filed ITRs for the last 3 years" },
    ],
  },
];

const VisaInfo = ({ data, setData }) => {
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
            <Label htmlFor="travelcountry">Travel Country</Label>
            <Input
              onChange={handleChange}
              value={data?.travelCountry || ""}
              name="travelCountry"
              id="travelcountry"
              placeholder="Dubai"
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
          <LabelInputContainer className="">
            <Label htmlFor="placeofbirth">Place Of Birth</Label>
            <Input
              onChange={handleChange}
              value={data?.placeOfBirth || ""}
              name="placeOfBirth"
              id="placeofbirth"
              placeholder="Delhi"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <div className="mb-6 flex flex-col items-center justify-center space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer className="">
            <Label htmlFor="address">Address</Label>
            <Input
              onChange={handleChange}
              value={data?.address || ""}
              name="address"
              id="address"
              placeholder="Your Complete Address"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="">
            <Label htmlFor="city">City</Label>
            <Input
              onChange={handleChange}
              value={data?.city || ""}
              name="city"
              id="city"
              placeholder="City"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              onChange={handleChange}
              value={data?.pincode || ""}
              name="pincode"
              id="pincode"
              placeholder="Pincode"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <div className="gap-2 grid grid-cols-1 sm:grid-cols-3">
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

export default VisaInfo;
