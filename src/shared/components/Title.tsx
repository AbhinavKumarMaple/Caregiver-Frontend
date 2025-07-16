import React from "react";

export default function Title({
  children,
  func,
}: {
  children: React.ReactNode;
  func?: () => void;
}) {
  return (
    <div
      onClick={func && func}
      className={`flex mt-2 w-full text-2xl font-semibold p-1 sm:text-xl items-center gap-2 ${
        func && "cursor-pointer"
      }`}
    >
      {children}
    </div>
  );
}
