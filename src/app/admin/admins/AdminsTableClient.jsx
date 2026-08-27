"use client";

import React, { useState } from "react";
import { Trash2, UserPlus, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addAdmin, deleteAdmin } from "@/lib/actions/admin/admin.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AdminsTableClient({ initialAdmins }) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  
  // New Admin form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    
    try {
      const res = await addAdmin(formData);
      if (res.success) {
        toast.success("Admin account created successfully");
        setFormData({ name: "", email: "", password: "" });
        router.refresh();
      } else {
        toast.error(res.error || "Failed to create admin");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteAdmin = async (id, email) => {
    if (email === "sthreedevs@gmail.com") {
      toast.error("Cannot delete the super admin account!");
      return;
    }
    
    if (!confirm("Are you sure you want to delete this admin account?")) return;
    
    setIsDeleting(id);
    try {
      const res = await deleteAdmin(id);
      if (res.success) {
        toast.success("Admin deleted successfully");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to delete admin");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Admin Form */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <UserPlus className="w-5 h-5 mr-2 text-[#BFA181]" />
          Add New Admin
        </h2>
        <form onSubmit={handleAddAdmin} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <Input 
              type="text" 
              required 
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <Input 
              type="email" 
              required 
              placeholder="admin@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <Input 
              type="password" 
              required 
              placeholder="Secure password"
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <Button type="submit" disabled={isAdding} className="bg-[#BFA181] hover:bg-[#a68c70] text-black w-full sm:w-auto">
            {isAdding ? "Adding..." : "Add Admin"}
          </Button>
        </form>
      </div>

      {/* Admins Table */}
      <div className="bg-white dark:bg-zinc-900 shadow rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
            <thead className="bg-gray-50 dark:bg-zinc-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
              {initialAdmins.map((admin) => (
                <tr key={admin._id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {admin.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {admin.email === "sthreedevs@gmail.com" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        <ShieldAlert className="w-3 h-3 mr-1" /> Super Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        Admin
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {admin.email !== "sthreedevs@gmail.com" ? (
                       <Button 
                         variant="ghost" 
                         className="text-red-600 hover:text-red-900 hover:bg-red-50 dark:hover:bg-red-900/10 h-8 px-2"
                         onClick={() => handleDeleteAdmin(admin._id, admin.email)}
                         disabled={isDeleting === admin._id}
                       >
                         {isDeleting === admin._id ? "..." : <Trash2 className="w-4 h-4" />}
                       </Button>
                    ) : (
                      <span className="text-gray-400 text-xs italic">Protected</span>
                    )}
                  </td>
                </tr>
              ))}
              {initialAdmins.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
