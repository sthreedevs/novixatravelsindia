import React from "react";
import { 
  Package as PackageIcon, 
  MapPin, 
  Building2,
  FileText,
  Mail,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { connectDB } from "@/lib/db/index.js";
import { Package } from "@/lib/models/package.model.js";
import { Destination } from "@/lib/models/destination.model.js";
import { Hotel } from "@/lib/models/hotel.model.js";
import { Blog } from "@/lib/models/blog.model.js";
import { ContactUs } from "@/lib/models/serviceModels/contactUs.model.js";
import { CustomizePackage } from "@/lib/models/customizePackage.model.js";
import { Subscriber } from "@/lib/models/subscriber.model.js";
import { formatDistanceToNow } from "date-fns";

export const metadata = {
  title: "Admin Dashboard | Novixa",
  description: "Overview of your application stats",
};

export default async function AdminDashboard() {
  await connectDB();
  
  const [
    packagesCount,
    destinationsCount,
    hotelsCount,
    blogsCount,
    enquiriesCount
  ] = await Promise.all([
    Package.countDocuments(),
    Destination.countDocuments(),
    Hotel.countDocuments(),
    Blog.countDocuments(),
    ContactUs.countDocuments()
  ]);

  // Fetch recent activities
  const [recentContactUs, recentCustomPackages, recentSubscribers] = await Promise.all([
    ContactUs.find().sort({ createdAt: -1 }).limit(5).lean(),
    CustomizePackage.find().sort({ createdAt: -1 }).limit(5).lean(),
    Subscriber.find().sort({ createdAt: -1 }).limit(5).lean()
  ]);

  // Combine and sort activities
  const activities = [
    ...recentContactUs.map(item => ({
      id: item._id.toString(),
      type: "enquiry",
      title: "New General Enquiry",
      description: `${item.firstName} ${item.lastName} (${item.email}) submitted a general enquiry.`,
      date: item.createdAt,
      icon: Mail,
      iconBg: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-600 dark:text-red-400"
    })),
    ...recentCustomPackages.map(item => ({
      id: item._id.toString(),
      type: "custom_package",
      title: "New Package Enquiry",
      description: `${item.name} (${item.email}) requested a custom package.`,
      date: item.createdAt,
      icon: PackageIcon,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400"
    })),
    ...recentSubscribers.map(item => ({
      id: item._id.toString(),
      type: "subscriber",
      title: "New Subscriber",
      description: `${item.email} subscribed to the newsletter.`,
      date: item.createdAt,
      icon: Mail,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400"
    }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const STATS = [
    { name: "Total Packages", value: packagesCount, icon: PackageIcon, href: "/admin/packages", color: "bg-blue-500" },
    { name: "Total Destinations", value: destinationsCount, icon: MapPin, href: "/admin/destinations", color: "bg-green-500" },
    { name: "Total Hotels", value: hotelsCount, icon: Building2, href: "/admin/hotels", color: "bg-purple-500" },
    { name: "Published Blogs", value: blogsCount, icon: FileText, href: "/admin/blogs", color: "bg-orange-500" },
    { name: "New Enquiries", value: enquiriesCount, icon: Mail, href: "/admin/enquiries", color: "bg-red-500" },
  ];

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

      {/* Recent Activity */}
      <div className="bg-white dark:bg-zinc-900 shadow rounded-lg border border-gray-100 dark:border-zinc-800">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-gray-400" />
            Recent Activity
          </h2>
        </div>
        <div className="p-5">
          {activities.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
              {activities.map((activity) => {
                const ActivityIcon = activity.icon;
                return (
                  <li key={`${activity.type}-${activity.id}`} className="py-4">
                    <div className="flex space-x-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-zinc-900 ${activity.iconBg}`}>
                        <ActivityIcon className={`h-4 w-4 ${activity.iconColor}`} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No recent activity found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
