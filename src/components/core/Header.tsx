import { chevron_down, logo } from "../../assets";
import { useEffect, useState, useRef } from "react";
import type { User } from "../../types/user";

export default function Header() {
  const [userData, setUserData] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleSignOut = () => {
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="hidden md:flex justify-between items-center bg-secondary p-2 rounded-[20px]">
        <div className="flex items-center">
          <img src={logo} alt="Careviah Logo" className="h-8 mr-2" />{" "}
        </div>
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center hover:bg-secondary cursor-pointer p-2 rounded-2xl"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src={
                "https://th.bing.com/th/id/OIP.lw60ifYN2dZGB9RY_cEuCQHaEc?w=307&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              }
              alt="User Profile"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <div className="font-semibold text-gray-800">
                {userData ? `${userData.UserName}` : "Guest User"}
              </div>
              <div className="text-xs text-gray-600">
                {userData?.Email || "No email available"}
              </div>
            </div>
            <img
              src={chevron_down}
              alt="chevron-down"
              className={`ml-3 w-6 h-6 text-gray-600 transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-1 z-10">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-secondary"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
