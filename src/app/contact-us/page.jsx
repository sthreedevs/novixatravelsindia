"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactUsSchema } from "@/lib/validations/index.js";
import { submitContactForm } from "@/lib/actions/contact.actions.js";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const words = [
  { text: "Everything" },
  { text: "begins" },
  { text: "with" },
  { text: "a" },
  { text: "Hello!", className: "text-blue-500 dark:text-blue-500" },
];

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      enterYourMessage: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await submitContactForm(data);
      if (res.success) {
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.error || "Oops! Something went wrong.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20">
      {/* hero section */}
      <div className="flex flex-col items-center justify-center h-[36rem]">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
          The road to freedom starts from here
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <Button
            onClick={() => {
              window.scrollBy({
                top: 480,
                behavior: "smooth",
              });
            }}
            variant="outline"
            className="sm:w-40 sm:h-10"
          >
            Join now &darr;
          </Button>
        </div>
      </div>

      {/* form */}
      <div className="shadow-input mx-auto w-full max-w-2xl lg:max-w-5xl rounded-none bg-white p-4 md:rounded-2xl dark:bg-black">
        <form className="my-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <LabelInputContainer>
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="Tyler"
                type="text"
                {...register("firstName")}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Durden"
                type="text"
                {...register("lastName")}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="enterYourMessage">Enter Your Message</Label>
            <textarea
              id="enterYourMessage"
              placeholder="Write a message..."
              {...register("enterYourMessage")}
              className={`p-[10px] rounded-[4px] outline-none resize-none h-[140px] bg-zinc-800 text-white ${
                errors.enterYourMessage ? "border border-red-500" : "border-none"
              }`}
            />
            {errors.enterYourMessage && <span className="text-red-500 text-xs">{errors.enterYourMessage.message}</span>}
          </LabelInputContainer>
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit \u2192"}
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-[#BFA181] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-[#BFA181] to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default ContactUs;
