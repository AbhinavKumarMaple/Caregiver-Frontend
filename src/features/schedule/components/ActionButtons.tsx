import React from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

interface ActionButtonsProps {
  visitStatus: "upcoming" | "in_progress" | "completed" | "missed";
  onCheckin?: () => void;
  onCheckout?: () => void;
  onCancelCheckin?: () => void;
  isLoading?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  visitStatus,
  onCheckin,
  onCheckout,
  onCancelCheckin,
  isLoading: propIsLoading = false,
}) => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = propIsLoading || isFetching > 0 || isMutating > 0;

  if (visitStatus === "completed" || visitStatus === "missed") return null;

  return (
    <div className="mt-8">
      {visitStatus === "upcoming" && (
        <button
          onClick={onCheckin}
          disabled={isLoading}
          className="w-full bg-activity text-white py-4 rounded-button font-roboto !font-medium text-button-text leading-button-text bg-teal-800 hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "Clock-In Now"}
        </button>
      )}

      {visitStatus === "in_progress" && (
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onCancelCheckin}
            disabled={isLoading}
            className="sm:flex-1 border border-[red] hover:border-[red] !text-[#D32F2F] !font-medium py-4 rounded-button font-roboto   leading-button-text transition-colors disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Cancel Check-In"}
          </button>
          <button
            onClick={onCheckout}
            disabled={isLoading}
            className="sm:flex-1 bg-activity text-white py-4 rounded-button !font-medium  text-button-text leading-button-text bg-teal-800 hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Clock-Out"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
