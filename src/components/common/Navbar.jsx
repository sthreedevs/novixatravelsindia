"use client";
import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Menu,
  X,
  Moon,
  Sun,
  Loader2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Dropdown from "@/components/ui/dropdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/redux/uiSlice";
import axios from "axios";
import NotificationBar from "./NotificationBar";

const navItems = [
  { title: "Home", path: "/" },
  {
    title: "Services",
    dropdown: [
      {
        title: "Packages",
        description: "Tailored travel experiences for any destination.",
        path: "/services/packages",
        img: "/services/packages.png",
      },
      {
        title: "Hotels",
        description: "Book top-rated hotels with exclusive deals.",
        path: "/services/hotels",
        img: "/services/hotels.png",
      },
      {
        title: "Flights",
        description: "Compare and book cheap flight tickets.",
        path: "/services/flights",
        img: "/services/flights.png",
      },
      {
        title: "Trains",
        description: "Book your trains tickets with ease.",
        path: "/services/trains",
        img: "/services/trains.png",
      },
      {
        title: "Cruise",
        description: "Explore the world on a cruise.",
        path: "/services/cruise",
        img: "/services/image.png",
      },
      {
        title: "RailEurope",
        description: "Book your trains tickets with ease.",
        path: "/services/rail-europe",
        img: "/services/trains.png",
      },
      {
        title: "Rentals/Transfers",
        description: "Affordable car and bus rentals across cities.",
        path: "/services/car-bus-rental",
        img: "/services/rentals.png",
      },
      {
        title: "Passport",
        description: "Smooth passport application and renewal.",
        path: "/services/passport",
        img: "/services/passport.png",
      },
      {
        title: "Visa",
        description: "Visa assistance for all your travel needs.",
        path: "/services/visa",
        img: "/services/visa.png",
      },
      {
        title: "Insurance",
        description: "Travel insurance for a worry-free journey.",
        path: "/services/insurance",
        img: "/services/insurance.png",
      },
      {
        title: "E-Sim",
        description: "Stay connected globally with our e-SIM services.",
        path: "/services/e-sim",
        img: "/services/esim.png",
      },
    ],
  },
  { title: "DayTrips", path: "/services/day-trips" },
  { title: "About Us", path: "/about-us" },
  { title: "Blog", path: "/blogs" },
];

const placeholders = [
  "Search for flights to Paris",
  "Find the best hotels in Dubai",
  "Explore top attractions in Bali",
  "Plan a trip to Switzerland",
  "Discover hidden gems in Thailand",
];

const Navbar = () => {
  const dispatch = useDispatch();
  const { data = [] } = useSelector((state) => state.destination);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMap, setActiveMap] = useState({});
  const [showDest, setShowDest] = useState(false);

  const useFormattedDestinations = (destinationsData) => {
    const formattedDestinations = useMemo(() => {
      if (!destinationsData || !Array.isArray(destinationsData)) return [];

      // Group by region (domestic/international) and continent
      const grouped = {
        domestic: {},
        international: {},
      };

      destinationsData.forEach((item) => {
        const continent = item.continent.toLowerCase();
        const region =
          item.country.toLowerCase() === "india" ? "domestic" : "international";

        // Initialize continent group if it doesn't exist
        if (!grouped[region][continent]) {
          grouped[region][continent] = [];
        }

        // Push destination to the continent group
        grouped[region][continent].push({
          title: item.name.toLowerCase(),
          type: "link",
        });
      });

      // Format the grouped data into the desired structure
      return [
        {
          title: "domestic",
          data: Object.keys(grouped.domestic).map((continent) => ({
            title: continent,
            data: grouped.domestic[continent],
            type: "dropdown",
          })),
          type: "dropdown",
        },
        {
          title: "international",
          data: Object.keys(grouped.international).map((continent) => ({
            title: continent,
            data: grouped.international[continent],
            type: "dropdown",
          })),
          type: "dropdown",
        },
      ];
    }, [destinationsData]);

    return formattedDestinations;
  };

  const destinationsData = useFormattedDestinations(data);

  const formatResults = (data) => {
    return data.reduce((acc, curr) => {
      const existingType = acc.find((item) => item.type === curr.type);
      if (existingType) {
        existingType.data.push(curr);
      } else {
        acc.push({
          type: curr.type,
          data: [curr],
        });
      }
      return acc;
    }, []);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        setLoading(true);
        axios
          .get(`/api/search?keyword=${query}`)
          .then((response) => {
            setResults(formatResults(response.data.results));
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching search results:", error);
            setLoading(false);
          });
      } else {
        setResults([]);
      }
    }, 500); // 500ms debounce time

    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
  }, [query]);

  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      <div className="bg-white/90 dark:bg-black/90 px-4 lg:px-10 py-4 flex justify-between items-center border-b-2">
        {/* Logo & Menu */}
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="logo" className="size-12 rounded-full" />
          <div className="hidden lg:flex gap-4 text-sm font-medium">
            <div
              className="relative"
              onMouseEnter={() => setShowDest(true)}
              onMouseLeave={() => setShowDest(false)}
            >
              <button className={navigationMenuTriggerStyle()}>
                Destinations
                {showDest ? (
                  <ChevronUp className="ml-1" size={14} />
                ) : (
                  <ChevronDown className="ml-1" size={14} />
                )}
              </button>

              {showDest && (
                <div className="absolute top-full left-0 z-50 bg-neutral-800 shadow-lg p-2 rounded-md min-w-[300px]">
                  {destinationsData.map((region) => (
                    <Dropdown
                      key={region.title}
                      title={region.title}
                      items={region.data}
                      isDesktop={true}
                      activeMap={activeMap}
                      setActiveMap={setActiveMap}
                    />
                  ))}
                </div>
              )}
            </div>

            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) =>
                  item.dropdown ? (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid min-w-[80vw] gap-3 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {item.dropdown.map((subItem) => (
                            <ListItem
                              key={subItem.title}
                              title={subItem.title}
                              path={subItem.path}
                              img={subItem.img}
                            >
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.title}>
                      <Link
                        href={item.path}
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative w-full max-w-xl mx-auto">
            <PlaceholdersAndVanishInput
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholders={placeholders}
            />

            {loading ? (
              <div className="absolute left-0 right-0 mt-2 flex items-center justify-center p-4 text-sm text-gray-600">
                <Loader2 className="animate-spin mr-2" size={16} />
                Loading...
              </div>
            ) : (
              results.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg max-h-72 overflow-y-auto no-scrollbar z-20">
                  {results.map((group) => (
                    <div key={group.type} className="border-b last:border-none">
                      <h2 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100">
                        {group.type}s
                      </h2>
                      <ul>
                        {group.data.map((item) => {
                          let link = "#"; // default
                          if (item.type === "hotel") {
                            link = `/services/hotels`;
                          } else if (item.type === "package") {
                            link = `/services/packages/${item._id}`;
                          } else if (item.type === "destination") {
                            link = `/destination/${encodeURIComponent(
                              item.name
                            )}`;
                          } else if (item.type === "blog") {
                            link = `/blogs/${item._id}`;
                          }

                          return (
                            <li
                              key={item._id}
                              className="border-b last:border-none"
                            >
                              <Link
                                href={link}
                                onClick={() => setQuery("")}
                                className="block px-4 py-3 hover:bg-[#BFA181] transition"
                              >
                                <span className="text-sm font-medium text-gray-800">
                                  {item.title || item.name}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

          <Button onClick={() => router.push("/contact-us")}>Contact Us</Button>
          {/* <Toggle onClick={() => dispatch(toggleDarkMode())}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Toggle> */}
        </div>

        {/* Mobile Menu */}
        <button
          className="lg:hidden z-50 relative"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-white/95 dark:bg-black/90 backdrop-blur-sm overflow-y-auto transition-all duration-300 lg:hidden">
            <div className="p-6 max-w-xl mx-auto space-y-6">
              {/* Search Input */}
              <div className="relative">
                <PlaceholdersAndVanishInput
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  placeholders={placeholders}
                />
                {loading && (
                  <div className="absolute inset-x-0 mt-2 flex justify-center text-gray-600 text-sm">
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Loading...
                  </div>
                )}
                {!loading && results.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-800 border rounded-lg shadow-lg max-h-72 overflow-y-auto z-30">
                    {results.map((group) => (
                      <div
                        key={group.type}
                        className="border-b last:border-none"
                      >
                        <h2 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
                          {group.type}s
                        </h2>
                        <ul>
                          {group.data.map((item) => {
                            let link = "#";
                            if (item.type === "hotel")
                              link = `/services/hotels`;
                            else if (item.type === "package")
                              link = `/services/packages/${item._id}`;
                            else if (item.type === "destination")
                              link = `/destination/${encodeURIComponent(
                                item.name
                              )}`;
                            else if (item.type === "blog")
                              link = `/blogs/${item._id}`;

                            return (
                              <li key={item._id}>
                                <Link
                                  href={link}
                                  onClick={() => {
                                    setQuery("");
                                    setMobileOpen(false);
                                  }}
                                  className="block px-4 py-3 hover:bg-[#BFA181] dark:hover:bg-[#BFA181]/80 transition text-gray-800 dark:text-gray-200"
                                >
                                  <span className="text-sm font-medium">
                                    {item.title || item.name}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Nav Links */}
              <nav className="space-y-3">
                {navItems.map((item) =>
                  item.dropdown ? (
                    <Dropdown
                      title={item.title}
                      items={item.dropdown.map((subItem) => ({
                        title: subItem.title,
                        path: subItem.path,
                        type: "link",
                      }))}
                      onCloseMobileMenu={() => setMobileOpen(false)}
                      activeMap={activeMap}
                      setActiveMap={setActiveMap}
                    />
                  ) : (
                    <Link
                      key={item.title}
                      href={item.path}
                      onClick={() => setMobileOpen(false)}
                      className="block text-lg font-semibold px-4 py-3 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-[#BFA181]/20 dark:hover:bg-[#BFA181]/30 transition text-gray-800 dark:text-gray-200"
                    >
                      {item.title}
                    </Link>
                  )
                )}
              </nav>

              {/* Destinations */}
              <Dropdown
                title="Destinations"
                items={destinationsData}
                onCloseMobileMenu={() => setMobileOpen(false)}
                activeMap={activeMap}
                setActiveMap={setActiveMap}
              />

              <Button
                onClick={() => {
                  setMobileOpen(false);
                  router.push("/contact-us");
                }}
                className="w-full text-lg py-6"
              >
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </div>
      <NotificationBar />
    </div>
  );
};

const ListItem = React.forwardRef(
  ({ className, title, img, path, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={path}
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors hover:bg-orange-300 hover:text-black",
              className
            )}
            {...props}
          >
            <div className="flex items-center gap-4">
              <div className="flex-[0.3] rounded-md overflow-hidden bg-zinc-100 p-2">
                <img
                  src={img}
                  alt={title}
                  className="size-full rounded-md object-center"
                  draggable={false}
                />
              </div>
              <div className="flex-[0.7] flex flex-col gap-2">
                <div className="text-sm font-medium">{title}</div>
                <p className="text-sm text-muted-foreground">{children}</p>
              </div>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);

export default Navbar;
