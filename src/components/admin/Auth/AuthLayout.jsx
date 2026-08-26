"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

import { toast } from "react-toastify";

const AuthLayout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initial loading state set to true
  const location = usePathname();

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/user/me");
      if (response.data.data) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Ensure loading state is set to false after fetch attempt
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout");
      toast.warning("Logged you out!");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    // Show loader while user info is being fetched
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!user.isAdmin) {
    handleLogout();
    // Logged in but not an admin
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-2xl">
        Unauthorized Access
      </div>
    );
  }

  // Logged in and is an admin
  return (
    <div>
      {/* Optional: Sidebar or Navbar */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
