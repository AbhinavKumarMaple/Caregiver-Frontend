import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/common/Button";
import MobileHeader from "../components/common/MobileHeader";
import type { User } from "../types/user";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        if (parsedUserData.ID === id || parsedUserData.id === id) {
          setUserData(parsedUserData);
        } else {
          if (
            typeof process !== "undefined" &&
            process.env.NODE_ENV === "development"
          ) {
            console.warn("User ID from params does not match stored user data");
          }
          setUserData(parsedUserData); // Still set the data, but log warning
        }
      } catch (error) {
        if (
          typeof process !== "undefined" &&
          process.env.NODE_ENV === "development"
        ) {
          console.error("Error parsing userData from localStorage:", error);
        }
      }
    }
  }, [id]);

  const displayName = userData?.UserName || userData?.FirstName || "User";

  return (
    <>
      <MobileHeader>
        <span className="text-lg font-semibold capitalize">
          Welcome {displayName}!
        </span>
      </MobileHeader>
      <Button
        variant="redGhost"
        className="mt-7 border-red-600 text-red-600 hover:bg-red-50"
      >
        Sign Out
      </Button>
    </>
  );
}
