"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";


const Dropdown = ({
  title,
  items,
  level = 0,
  onCloseMobileMenu,
  isDesktop = false,
  activeMap,
  setActiveMap,
}) => {
  const isOpen = activeMap[level] === title;

  const handleToggle = () => {
    setActiveMap((prev) => ({
      ...prev,
      [level]: isOpen ? null : title,
      // Reset all deeper levels when opening a new level
      ...(isOpen
        ? {}
        : Object.fromEntries(
            Object.keys(prev)
              .filter((key) => parseInt(key) > level)
              .map((key) => [key, null])
          )),
    }));
  };

  const handleLinkClick = () => {
    if (onCloseMobileMenu) onCloseMobileMenu();
    setActiveMap({});
  };

  return (
    <div
      className={cn(
        "relative",
        level === 0 && "mt-2",
        isDesktop && level > 0 && "ml-1" // Add small gap between desktop levels
      )}
    >
      <button
        onClick={handleToggle}
        className={cn(
          "w-full text-left capitalize px-4 py-3 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-[#BFA181]/20 dark:hover:bg-[#BFA181]/30 transition flex items-center gap-2",
          level > 0 && "text-sm font-medium text-gray-700 dark:text-gray-200",
          isDesktop ? "pl-4 pr-8" : "pl-6", // Adjust padding for desktop
          isDesktop && level === 0 && "min-w-[180px]" // Set minimum width for top level
        )}
      >
        {title}
        {isOpen ? (
          <ChevronUp className="text-[#BFA181] ml-auto" size={18} />
        ) : (
          <ChevronDown className="text-[#BFA181] ml-auto" size={18} />
        )}
      </button>

      {isOpen && (
        <ul
          className={cn(
            "space-y-2",
            !isDesktop && "mt-2 ml-4", // Mobile styling
            isDesktop && [
              "absolute top-0 min-w-[200px] left-full ml-1",
              "bg-white dark:bg-zinc-800 shadow-lg rounded-lg p-2 z-50", // Desktop styling
              "border border-gray-200 dark:border-zinc-700", // Add border for better separation
            ]
          )}
        >
          {items.map((item) =>
            item.type === "dropdown" ? (
              <li key={item.title}>
                <Dropdown
                  title={item.title}
                  items={item.data}
                  level={level + 1}
                  onCloseMobileMenu={onCloseMobileMenu}
                  isDesktop={isDesktop}
                  activeMap={activeMap}
                  setActiveMap={setActiveMap}
                />
              </li>
            ) : (
              <li key={item.title}>
                <Link
                  href={
                    item.path ||
                    `/destination/${encodeURIComponent(item.title)}`
                  }
                  onClick={handleLinkClick}
                  className={cn(
                    "block px-4 py-2 rounded-md font-medium text-sm text-left",
                    "text-gray-700 dark:text-gray-200",
                    "hover:bg-[#BFA181]/20 dark:hover:bg-[#BFA181]/30",
                    "transition focus:bg-[#BFA181]/20 focus:text-[#BFA181] outline-none capitalize",
                    isDesktop && "hover:bg-gray-100 dark:hover:bg-zinc-700" // Different hover for desktop
                  )}
                >
                  {item.title}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
