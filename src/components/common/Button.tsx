import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "fill" | "ghost" | "redGhost" | "white";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "fill",
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "w-full text-[13px] sm:text-base py-2 sm:py-3 px-4 rounded-xl font-medium text-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    fill: "bg-tertiary text-white hover:bg-tertiary focus:ring-tertiary disabled:bg-gray-400 disabled:cursor-not-allowed",
    ghost:
      "bg-transparent border-1 border-tertiary text-tertiary hover:bg-tertiary hover:text-white focus:ring-tertiary disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed",
    white:
      "bg-white border-1 border-white text-tertiary hover:bg-white hover:text-tertiary focus:ring-white disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed",
    redGhost:
      "bg-transparent border-1 border-red-500/70 text-red-500 hover:bg-red-500 hover:text-white focus:ring-red-500 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};

export default Button;
