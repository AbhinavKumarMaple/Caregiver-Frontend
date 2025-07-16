// src/components/common/AppLoader.tsx
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface AppLoaderProps {
  variant?: "page" | "component" | "inline";
  message?: string;
  className?: string;
}

const AppLoader: React.FC<AppLoaderProps> = ({
  variant = "component",
  message = "Loading...",
  className = "",
}) => {
  const getContainerClasses = () => {
    switch (variant) {
      case "page":
        return "min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-teal-100";
      case "component":
        return "min-h-64 flex items-center justify-center bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-lg";
      case "inline":
        return "flex items-center justify-center py-8";
      default:
        return "min-h-64 flex items-center justify-center";
    }
  };

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      <div className="text-center">
        <LoadingSpinner size="lg" color="teal" />
        <p className="mt-4 text-gray-600 font-roboto text-description">
          {message}
        </p>
      </div>
    </div>
  );
};

export default AppLoader;
