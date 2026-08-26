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

const genderOptions = ["Male", "Female", "Others"];

const PersonalInfo = ({ data, setData }) => {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setData({ ...data, gender: value });
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-2xl lg:max-w-5xl rounded-none bg-white p-4 md:rounded-2xl dark:bg-black">
      <form className="my-2">
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              onChange={handleChange}
              required
              value={data?.firstName || ""}
              name="firstName"
              id="firstname"
              placeholder="Tyler"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              onChange={handleChange}
              required
              value={data?.lastName || ""}
              name="lastName"
              id="lastname"
              placeholder="Durden"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            onChange={handleChange}
            required
            value={data?.email || ""}
            name="email"
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
          />
        </LabelInputContainer>
        <div className="flex flex-col items-center justify-center space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer className="flex-1">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              onChange={handleChange}
              required
              value={data?.phone || ""}
              name="phone"
              id="phone"
              placeholder="+91-xxxx-xxxx"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="flex-[0.5]">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              type="date"
              id="dob"
              name="dob"
              value={data?.dob ? data.dob.substring(0, 10) : ""}
              onChange={(e) => setData({ ...data, dob: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer className="flex-[0.5]">
            <Label>Gender</Label>
            <div className="flex flex-wrap gap-2">
              <Select
                value={data?.gender || ""}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Male,Female,Others" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    {genderOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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

export default PersonalInfo;
