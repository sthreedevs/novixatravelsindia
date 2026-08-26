"use client";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Bell,
  CalendarDays,
  FormInput,
  Globe,
  Home,
  Hotel,
  Images,
  LogOut,
  Newspaper,
  Package,
  Pen,
  PersonStanding,
} from "lucide-react";

const actionItems = [
  {
    icon: Bell,
    title: "Notifications",
    path: "notifications",
  },
  {
    icon: FormInput,
    title: "Enquiries",
    path: "enquiries",
  },
  {
    icon: Globe,
    title: "E-Sim",
    path: "e-sim",
  },
  {
    icon: PersonStanding,
    title: "Guides",
    path: "guides",
  },
];

const manageItems = [
  {
    id: "891789",
    icon: Newspaper,
    title: "Newsletter",
    path: "manage/newsletter",
  },
  {
    id: "qwsa",
    icon: Home,
    title: "Testimonials",
    path: "manage/testimonial",
  },
  {
    id: "nbvc",
    icon: Images,
    title: "Carousel",
    path: "manage/carousel",
  },
  {
    id: "erfd",
    icon: Hotel,
    title: "Hotel",
    path: "manage/hotel",
  },
  {
    id: "tyhg",
    icon: Package,
    title: "Package",
    path: "manage/package",
  },
  {
    id: "skdjm",
    icon: CalendarDays,
    title: "DayTrip",
    path: "manage/dayTrip",
  },
  {
    id: "uikj",
    icon: Globe,
    title: "Destinations",
    path: "manage/destination",
  },
  {
    id: "uikjzbhsdgyuaikh",
    icon: Pen,
    title: "Blogs",
    path: "manage/blog",
  },
];

const Dashboard = () => {
  const navigate = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout");
      navigate("/auth");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Failed to logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="py-20 px-4 lg:px-10 min-h-screen">
      <div className="flex justify-between items-center w-full">
        <h1 className="my-4 text-xl md:text-3xl lg:text-4xl">Admin</h1>
        <div
          onClick={handleLogout}
          className="p-1 rounded-md hover:bg-neutral-50/20"
        >
          <LogOut size={20} />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {actionItems.map((item) => (
          <Link key={item.title} href={item.path}>
            <div className="border p-2 md:p-4 h-50 flex flex-col justify-between rounded-sm bg-neutral-950 hover:bg-neutral-900">
              {<item.icon />}
              <h1 className="text-base md:text-xl lg:text-2xl text-end">
                {item.title}
              </h1>
            </div>
          </Link>
        ))}
      </div>
      <div className="my-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {manageItems.map((item) => (
          <Link key={item.title} href={item.path}>
            <div className="border p-2 md:p-4 max-w-sm h-50 flex flex-col justify-between rounded-sm bg-neutral-950 hover:bg-neutral-900">
              {<item.icon />}
              <h1 className="text-base md:text-xl lg:text-2xl text-end">
                {item.title}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
