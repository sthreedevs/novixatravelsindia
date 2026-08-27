"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  MapPin, 
  Building2,
  FileText,
  Mail,
  LogOut,
  Menu,
  X,
  Users
} from "lucide-react";
import { adminLogout } from "@/lib/actions/admin/auth.actions";
import { toast } from "react-toastify";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Packages", href: "/admin/packages", icon: Package },
  { name: "Destinations", href: "/admin/destinations", icon: MapPin },
  { name: "Hotels", href: "/admin/hotels", icon: Building2 },
  { name: "eSIMs", href: "/admin/esims", icon: Building2 },
  { name: "Day Trips", href: "/admin/day-trips", icon: Building2 },
  { name: "Testimonials", href: "/admin/testimonials", icon: FileText },
  { name: "Subscribers", href: "/admin/subscribers", icon: Mail },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Guides", href: "/admin/guides", icon: FileText },
  { name: "Offers Banner", href: "/admin/offers", icon: Package },
  { name: "Enquiries", href: "/admin/enquiries", icon: Mail },
  { name: "Admins", href: "/admin/admins", icon: Users },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await adminLogout();
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-zinc-800">
          <Link href="/admin" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#BFA181] to-black dark:to-white">
            Novixa Admin
          </Link>
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-[#BFA181]/10 text-[#BFA181]' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'}
                `}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-[#BFA181]' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between lg:justify-end px-4 sm:px-6 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <button
            className="lg:hidden p-2 -ml-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-4">
             <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#BFA181] to-black flex items-center justify-center text-white font-bold text-sm">
                A
             </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
