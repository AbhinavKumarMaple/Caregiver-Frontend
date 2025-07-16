// src/components/schedule/TaskListSkeleton.tsx
import React from "react";
import Skeleton from "../common/Skeleton";

interface TaskListSkeletonProps {
  taskCount?: number;
  className?: string;
}

const TaskListSkeleton: React.FC<TaskListSkeletonProps> = ({
  taskCount = 3,
  className = "",
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {/* Tasks Title */}
      <Skeleton width={100} height={20} className="mb-4" />

      {/* Task Items */}
      <div className="space-y-3">
        {Array.from({ length: taskCount }).map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer bg-shimmer rounded-task p-4"
          >
            <div className="flex items-start space-x-3">
              {/* Checkbox skeleton */}
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                className="mt-1"
              />

              <div className="flex-1">
                {/* Task title */}
                <Skeleton
                  width={`${Math.random() * 30 + 60}%`}
                  height={18}
                  className="mb-2"
                />

                {/* Task description */}
                <Skeleton
                  width={`${Math.random() * 40 + 50}%`}
                  height={14}
                  className="mb-2"
                />

                {/* Sometimes add a second line for description */}
                {Math.random() > 0.5 && (
                  <Skeleton width={`${Math.random() * 50 + 30}%`} height={14} />
                )}
              </div>

              {/* Action button skeleton */}
              <div className="flex flex-col space-y-2">
                <Skeleton
                  width={78}
                  height={44}
                  className="bg-gradient-to-r from-teal-100 via-teal-200 to-teal-100 animate-shimmer bg-shimmer rounded-button"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListSkeleton;
