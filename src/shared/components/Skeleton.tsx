import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "text",
  width,
  height,
  animation = "wave",
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "circular":
        return "rounded-full";
      case "rectangular":
        return "rounded-none";
      case "rounded":
        return "rounded-lg";
      case "text":
      default:
        return "rounded";
    }
  };

  const getAnimationClasses = () => {
    switch (animation) {
      case "pulse":
        return "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200";
      case "wave":
        return "animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-shimmer";
      case "none":
        return "bg-gray-200";
      default:
        return "animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-shimmer";
    }
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height)
    style.height = typeof height === "number" ? `${height}px` : height;

  if (animation === "wave") {
    style.backgroundSize = "200% 100%";
  }

  return (
    <div
      className={`${getVariantClasses()} ${getAnimationClasses()} ${className}`}
      style={style}
    />
  );
};

export default Skeleton;
