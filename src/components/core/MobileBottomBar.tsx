import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

type TabType = "home" | "profile";

export default function MobileBottomBar() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const location = useLocation();

  // Set active tab based on current route
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("home");
    } else if (location.pathname.startsWith("/profile")) {
      setActiveTab("profile");
    }
  }, [location.pathname]);

  // Get profile URL from localStorage
  const profileUrl = useMemo(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        const userId = parsedUserData.ID || parsedUserData.id;
        return userId ? `/profile/${userId}` : "/profile";
      } catch (error) {
        // Log error only in development
        if (
          typeof process !== "undefined" &&
          process.env.NODE_ENV === "development"
        ) {
          console.error("Error parsing userData from localStorage:", error);
        }
        return "/profile";
      }
    }
    return "/profile";
  }, []);

  return (
    <div className="fixed h-[84px] w-full sm:hidden bottom-0 left-0 right-0 bg-[#F5FBFF] border-t border-gray-200 flex items-center safe-area-pb">
      <div className="flex w-full  justify-around items-center max-w-md mx-auto">
        {/* Home Tab */}
        <Link
          to="/"
          className="flex flex-col items-center py-2 px-4 rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 21 20"
            fill="none"
            className=""
          >
            <path
              d="M8.83338 15.8331V11.6664H12.1667V15.8331C12.1667 16.2914 12.5417 16.6664 13.0001 16.6664H15.5001C15.9584 16.6664 16.3334 16.2914 16.3334 15.8331V9.99973H17.7501C18.1334 9.99973 18.3167 9.52473 18.0251 9.27473L11.0584 2.99973C10.7417 2.7164 10.2584 2.7164 9.94172 2.99973L2.97505 9.27473C2.69172 9.52473 2.86672 9.99973 3.25005 9.99973H4.66672V15.8331C4.66672 16.2914 5.04172 16.6664 5.50005 16.6664H8.00005C8.45838 16.6664 8.83338 16.2914 8.83338 15.8331Z"
              fill={activeTab === "home" ? "#0D5D59" : "#757575"}
            />
          </svg>
          <span
            className={`text-xs font-medium ${
              activeTab === "home" ? "text-[#757575]" : "text-[#0D5D59]"
            }`}
          >
            Home
          </span>
        </Link>

        {/* Profile Tab */}
        <Link
          to={profileUrl}
          className="flex flex-col items-center py-2 px-4 rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M10.5 10C12.3417 10 13.8334 8.50837 13.8334 6.66671C13.8334 4.82504 12.3417 3.33337 10.5 3.33337C8.65837 3.33337 7.16671 4.82504 7.16671 6.66671C7.16671 8.50837 8.65837 10 10.5 10ZM10.5 11.6667C8.27504 11.6667 3.83337 12.7834 3.83337 15V15.8334C3.83337 16.2917 4.20837 16.6667 4.66671 16.6667H16.3334C16.7917 16.6667 17.1667 16.2917 17.1667 15.8334V15C17.1667 12.7834 12.725 11.6667 10.5 11.6667Z"
              fill={activeTab === "profile" ? "#0D5D59" : "#757575"}
            />
          </svg>
          <span
            className={`text-xs font-medium ${
              activeTab === "profile" ? "#0D5D59" : "#757575"
            }`}
          >
            Profile
          </span>
        </Link>
      </div>
    </div>
  );
}
