// src/components/common/DashboardSkeleton.tsx
import React from "react";
import Skeleton from "./Skeleton";
import ScheduleCardSkeleton from "../schedule/ScheduleCardSkeleton";

const DashboardSkeleton: React.FC = () => {
  return (
    <>
      {/* Title Skeleton */}
      <div className="mb-4 mt-4">
        <Skeleton width={120} height={24} />
      </div>

      {/* Mobile Header Skeleton */}
      <div className="mb-4 sm:hidden">
        <Skeleton width={200} height={24} />
      </div>

      {/* Dashboard Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-7 sm:mt-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl shadow-sm bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer bg-shimmer text-center ${
              index === 0 ? "col-span-2 md:col-span-1" : "col-span-1"
            }`}
          >
            <div className="mb-2">
              <Skeleton width={60} height={40} className="mx-auto" />
            </div>
            <div>
              <Skeleton
                width={index === 0 ? 120 : index === 1 ? 160 : 140}
                height={16}
                className="mx-auto"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Header Skeleton */}
      <div className="w-full flex justify-between items-center mt-5">
        <div className="flex items-center">
          <Skeleton width={80} height={20} className="mr-2" />
          <Skeleton
            width={40}
            height={28}
            className="bg-gradient-to-r from-teal-200 via-teal-300 to-teal-200 animate-shimmer bg-shimmer rounded-lg"
          />
        </div>
        <div className="block sm:hidden">
          <Skeleton width={50} height={16} />
        </div>
      </div>

      {/* Schedule Cards Skeleton */}
      <div className="flex flex-col gap-2 sm:gap-4 mt-5 pb-28">
        {[1, 2, 3, 4].map((index) => (
          <ScheduleCardSkeleton key={index} variant="card" />
        ))}
      </div>
    </>
  );
};

export default DashboardSkeleton;
