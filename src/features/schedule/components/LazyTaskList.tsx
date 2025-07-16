import React, { Suspense, lazy } from "react";
import TaskListSkeleton from "./TaskListSkeleton";

const TaskList = lazy(() => import("./TaskList"));

interface LazyTaskListProps {
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    status: "pending" | "completed";
    feedback?: string;
  }>;
  visitStatus: "upcoming" | "in_progress" | "completed" | "missed";
  onTaskUpdate: (
    taskId: string,
    status: "completed" | "not_completed",
    feedback?: string
  ) => Promise<void>;
}

const LazyTaskList: React.FC<LazyTaskListProps> = (props) => {
  return (
    <Suspense
      fallback={<TaskListSkeleton taskCount={props.tasks.length || 3} />}
    >
      <TaskList {...props} />
    </Suspense>
  );
};

export default LazyTaskList;
