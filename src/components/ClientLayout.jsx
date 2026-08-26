"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import FormOverlay from "@/components/FormOverlay";
import { setData } from "@/redux/destinationSlice";
import axios from "axios";

export function ClientLayout({ children }) {
  const { modalForm, darkMode } = useSelector((state) => state.ui);
  const pathname = usePathname();
  const dispatch = useDispatch();

  const fetchDestinations = async () => {
    try {
      // In Next.js, we can call our local API route
      const response = await axios.get("/api/destination/");
      dispatch(setData(response.data.data));
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <div className={`${darkMode ? "dark" : ""} dark:bg-black dark:text-zinc-200`}>
      <ToastContainer />
      <Navbar />
      {children}
      {modalForm && <FormOverlay />}
      <Footer />
    </div>
  );
}
