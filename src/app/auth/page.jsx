"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "@/components/admin/Auth/LoginForm";
import SignUpForm from "@/components/admin/Auth/SignUpForm";
import axios from "axios";
import { useRouter } from "next/navigation";


const Auth = () => {
  const [currForm, setCurrForm] = useState("login");
  const [loading, setLoading] = useState(true); // Added loading state for user fetch
  const router = useRouter();

  const toggleForm = () => {
    setCurrForm((prev) => (prev === "login" ? "signup" : "login"));
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/user/me");
      if (response.data.data._id) {
        router.push("/admin"); // Redirect to /admin if user is logged in
      }
    } catch (error) {
      console.error(error);
      setLoading(false); // Ensure loading is set to false on error
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    // Show a loader while the user info is being fetched
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      {/* Left Side - Image */}
      <div className="w-1/2 hidden md:block">
        <img
          src="https://plus.unsplash.com/premium_photo-1679830513924-313c9fe68ab8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmVsY29sbGFnZXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Auth Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          {currForm === "login" ? <LoginForm /> : <SignUpForm />}
          <button
            onClick={toggleForm}
            className="mt-4 mx-auto text-sm underline hover:opacity-80"
          >
            {currForm === "login"
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
