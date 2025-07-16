import React from "react";
import Skeleton from "../../../shared/components/Skeleton";

interface ScheduleCardSkeletonProps {
  variant?: "card" | "detail" | "centered";
  className?: string;
}

const ScheduleCardSkeleton: React.FC<ScheduleCardSkeletonProps> = ({
  variant = "card",
  className = "",
}) => {
  if (variant === "centered") {
    return (
      <div
        className={`rounded-2xl bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 p-4 ${className}`}
      >
        <div className="flex flex-col items-center text-center py-2 px-2">
          <Skeleton width={180} height={18} className="mb-4" />

          <div className="flex items-center mb-2 gap-2">
            <Skeleton
              variant="circular"
              width={64}
              height={64}
              className="mb-2"
            />
            <Skeleton width={140} height={20} />
          </div>

          <div className="w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-xl py-3 px-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center w-full">
                <Skeleton
                  variant="circular"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <Skeleton width={90} height={14} />
              </div>
              <div className="mx-2">
                <Skeleton width={1} height={14} />
              </div>
              <div className="flex items-center w-full">
                <Skeleton
                  variant="circular"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <Skeleton width={70} height={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-5 rounded-2xl shadow-sm bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 ${className}`}
    >
      <div className="flex justify-between items-start mb-2">
        <Skeleton width={80} height={24} className="rounded-full" />
        <Skeleton variant="circular" width={24} height={24} />
      </div>

      <div className="flex items-center mb-2">
        <Skeleton variant="circular" width={64} height={64} className="mr-3" />
        <div className="flex-1">
          <Skeleton width="70%" height={20} className="mb-1" />
          <Skeleton width="50%" height={16} />
        </div>
      </div>

      <div className="flex items-start mb-4">
        <Skeleton
          variant="circular"
          width={20}
          height={20}
          className="mr-2 mt-1"
        />
        <Skeleton width="80%" height={16} />
      </div>

      <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-xl py-3 mb-4">
        <div className="flex items-center justify-around">
          <div className="flex items-center">
            <Skeleton
              variant="circular"
              width={20}
              height={20}
              className="mr-2"
            />
            <Skeleton width={80} height={16} />
          </div>
          <Skeleton width={1} height={16} />
          <div className="flex items-center">
            <Skeleton
              variant="circular"
              width={20}
              height={20}
              className="mr-2"
            />
            <Skeleton width={70} height={16} />
          </div>
        </div>
      </div>

      <Skeleton
        width="100%"
        height={44}
        className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-button"
      />
    </div>
  );
};

export default ScheduleCardSkeleton;
