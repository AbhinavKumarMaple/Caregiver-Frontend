// src/components/common/LoadingSpinner.tsx
import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "teal" | "blue";
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "teal",
  className = "",
  text,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4";
      case "md":
        return "w-8 h-8";
      case "lg":
        return "w-12 h-12";
      case "xl":
        return "w-16 h-16";
      default:
        return "w-8 h-8";
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return "text-gray-600";
      case "secondary":
        return "text-gray-400";
      case "teal":
        return "text-teal-600";
      case "blue":
        return "text-blue-600";
      default:
        return "text-teal-600";
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div
          className={`${getSizeClasses()} ${getColorClasses()} animate-spin rounded-full border-2 border-current border-t-transparent`}
        />

        {/* Inner gradient ring for enhanced effect */}
        <div
          className={`absolute inset-0 ${getSizeClasses()} animate-spin rounded-full`}
          style={{
            background: `conic-gradient(from 0deg, transparent, ${
              color === "teal"
                ? "#0D5D59"
                : color === "blue"
                ? "#2DA6FF"
                : "#6B7280"
            })`,
            mask: "radial-gradient(circle at center, transparent 60%, black 61%)",
            WebkitMask:
              "radial-gradient(circle at center, transparent 60%, black 61%)",
          }}
        />
      </div>

      {text && (
        <p className={`mt-3 text-sm font-roboto ${getColorClasses()}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
