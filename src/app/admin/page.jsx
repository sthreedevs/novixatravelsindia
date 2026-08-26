"use client";
import React from "react";
import { 
  Package, 
  MapPin, 
  Building2,
  FileText,
  Mail,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

const STATS = [
  { name: "Total Packages", value: "...", icon: Package, href: "/admin/packages", color: "bg-blue-500" },
  { name: "Total Destinations", value: "...", icon: MapPin, href: "/admin/destinations", color: "bg-green-500" },
  { name: "Total Hotels", value: "...", icon: Building2, href: "/admin/hotels", color: "bg-purple-500" },
  { name: "Published Blogs", value: "...", icon: FileText, href: "/admin/blogs", color: "bg-orange-500" },
  { name: "New Enquiries", value: "...", icon: Mail, href: "/admin/enquiries", color: "bg-red-500" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link 
              key={stat.name} 
              href={stat.href}
              className="bg-white dark:bg-zinc-900 overflow-hidden shadow rounded-lg border border-gray-100 dark:border-zinc-800 hover:shadow-md transition-shadow group"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-md ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
                      <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} aria-hidden="true" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-800/50 px-5 py-3">
                <div className="text-sm">
                  <span className="font-medium text-[#BFA181] group-hover:text-[#a68c70] transition-colors">
                    View all
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity placeholder */}
      <div className="bg-white dark:bg-zinc-900 shadow rounded-lg border border-gray-100 dark:border-zinc-800">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-gray-400" />
            Recent Activity
          </h2>
        </div>
        <div className="p-5">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Activity feed will appear here as users submit enquiries or book packages.
          </p>
        </div>
      </div>
    </div>
  );
}
