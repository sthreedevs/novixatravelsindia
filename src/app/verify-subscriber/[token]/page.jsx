"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const VerifySubscriber = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("verifying"); // verifying | success | failed

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/api/subscriber/verify/${token}`);
        setStatus("success");
      } catch (error) {
        setStatus("failed");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-md text-center">
        {status === "verifying" && (
          <p className="text-lg">Verifying your email...</p>
        )}

        {status === "success" && (
          <>
            <FaCheckCircle size={60} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Subscription Verified!
            </h2>
            <p className="text-gray-300">
              You're now subscribed to our newsletter. 🎉
            </p>
          </>
        )}

        {status === "failed" && (
          <>
            <FaTimesCircle size={60} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-gray-300">
              The link is either invalid or expired.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifySubscriber;
