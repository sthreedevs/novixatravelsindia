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

export function ClientLayout({ children, initialDestinations, initialPackages, initialOffers }) {
  const { modalForm, darkMode } = useSelector((state) => state.ui);
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialDestinations) {
      dispatch(setData(initialDestinations));
    }
  }, [initialDestinations, dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className={`${darkMode ? "dark" : ""} dark:bg-black dark:text-zinc-200`}>
      <ToastContainer />
      {!isAdminRoute && <Navbar initialOffers={initialOffers} />}
      {children}
      {modalForm && <FormOverlay />}
      {!isAdminRoute && <Footer initialPackages={initialPackages} />}
    </div>
  );
}
