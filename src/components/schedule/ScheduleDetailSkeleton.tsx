import React from "react";
import Skeleton from "../common/Skeleton";

const ScheduleDetailSkeleton: React.FC = () => {
  return (
    <>
      <div className="flex justify-center w-full md:mt-4">
        <div className="w-full flex items-center mb-4">
          <Skeleton
            variant="circular"
            width={24}
            height={24}
            className="mr-2"
          />
          <Skeleton width={150} height={24} />
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="w-full">
          <div className="rounded-2xl p-4 sm:px-0">
            <div className="rounded-2xl bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 animate-shimmer bg-shimmer p-4 mb-6">
              <div className="flex flex-col items-center text-center py-2 px-2">
                <Skeleton width={200} height={20} className="mb-4" />

                <div className="flex items-center mb-2 gap-2">
                  <Skeleton
                    variant="circular"
                    width={64}
                    height={64}
                    className="mb-2"
                  />
                  <Skeleton width={150} height={20} />
                </div>

                <div className="w-full bg-gradient-to-r from-teal-50 via-teal-100 to-teal-50 animate-shimmer bg-shimmer rounded-xl py-3 px-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center w-full">
                      <Skeleton
                        variant="circular"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      <Skeleton width={100} height={16} />
                    </div>
                    <div className="mx-2">
                      <Skeleton width={1} height={16} />
                    </div>
                    <div className="flex items-center w-full">
                      <Skeleton
                        variant="circular"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      <Skeleton width={80} height={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <Skeleton width={100} height={20} className="mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer bg-shimmer rounded-task p-4"
                  >
                    <div className="flex items-start space-x-3">
                      <Skeleton variant="circular" width={20} height={20} />
                      <div className="flex-1">
                        <Skeleton width="80%" height={18} className="mb-2" />
                        <Skeleton width="60%" height={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <Skeleton width={120} height={20} className="mb-4" />
              <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer bg-shimmer rounded-task p-4">
                <Skeleton width="100%" height={80} />
              </div>
            </div>

            <div className="mb-6">
              <Skeleton width={150} height={20} className="mb-4" />
              <div className="bg-gradient-to-r from-teal-100 via-teal-200 to-teal-100 animate-shimmer bg-shimmer rounded-task h-48 w-full" />
            </div>

            <div className="mt-8">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <Skeleton
                  width="100%"
                  height={56}
                  className="bg-gradient-to-r from-teal-200 via-teal-300 to-teal-200 animate-shimmer bg-shimmer rounded-button sm:flex-1"
                />
                <Skeleton
                  width="100%"
                  height={56}
                  className="bg-gradient-to-r from-teal-200 via-teal-300 to-teal-200 animate-shimmer bg-shimmer rounded-button sm:flex-1 sm:block hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleDetailSkeleton;
