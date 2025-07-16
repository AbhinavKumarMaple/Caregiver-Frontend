import React from "react";
import Skeleton from "../../../shared/components/Skeleton";

interface LocationMapSkeletonProps {
  className?: string;
  showTitle?: boolean;
}

const LocationMapSkeleton: React.FC<LocationMapSkeletonProps> = ({
  className = "",
  showTitle = true,
}) => {
  return (
    <div className={`${className}`}>
      {showTitle && <Skeleton width={150} height={20} className="mb-4" />}

      <div className="relative bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 rounded-task h-48 w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              className="bg-gradient-to-r from-red-300 via-red-400 to-red-300 animate-pulse"
            />
            <div className="absolute inset-0 rounded-full bg-red-200 animate-ping opacity-30"></div>
          </div>
        </div>

        <div className="absolute top-4 left-4 right-4">
          <Skeleton width="60%" height={2} className="bg-gray-300 mb-2" />
          <Skeleton width="40%" height={2} className="bg-gray-300 mb-2" />
          <Skeleton width="80%" height={2} className="bg-gray-300" />
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <Skeleton width="70%" height={2} className="bg-gray-300 mb-2" />
          <Skeleton width="50%" height={2} className="bg-gray-300" />
        </div>

        <div className="absolute top-8 right-8">
          <Skeleton width={16} height={16} className="bg-gray-400 mb-1" />
          <Skeleton width={12} height={12} className="bg-gray-400" />
        </div>

        <div className="absolute bottom-8 left-8">
          <Skeleton width={20} height={14} className="bg-gray-400 mb-1" />
          <Skeleton width={16} height={10} className="bg-gray-400" />
        </div>
      </div>

      <div className="mt-3">
        <Skeleton width="80%" height={16} className="mb-1" />
        <Skeleton width="60%" height={14} />
      </div>
    </div>
  );
};

export default LocationMapSkeleton;
