import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { verifySubscriber } from "@/lib/services/subscriber.service.js";

const VerifySubscriber = async ({ params }) => {
  const { token } = params;
  
  const isVerified = await verifySubscriber(token);
  const status = isVerified ? "success" : "failed";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-md text-center">
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
