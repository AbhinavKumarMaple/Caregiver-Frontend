import React, { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  feedback?: string;
}

interface TaskListProps {
  tasks: Task[];
  visitStatus: "upcoming" | "in_progress" | "completed" | "missed";
  onTaskUpdate?: (
    taskId: string,
    status: "completed" | "not_completed",
    feedback?: string
  ) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  visitStatus,
  onTaskUpdate,
}) => {
  const isInteractive = visitStatus === "in_progress";
  const [showReasonInput, setShowReasonInput] = useState<string | null>(null);
  const [taskReasons, setTaskReasons] = useState<Record<string, string>>({});
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, "yes" | "no">
  >({});

  useEffect(() => {
    const initialReasons: Record<string, string> = {};
    const initialOptions: Record<string, "yes" | "no"> = {};

    tasks.forEach((task) => {
      if (task.feedback) {
        initialReasons[task.id] = task.feedback;
      }

      initialOptions[task.id] = task.status === "completed" ? "yes" : "no";

      // Only show reason input for tasks with "no" status and feedback
      if (task.status !== "completed" && task.feedback) {
        setShowReasonInput(task.id);
      }
    });

    setTaskReasons(initialReasons);
    setSelectedOptions(initialOptions);
  }, [tasks]);

  const handleTaskToggle = (taskId: string, status: "yes" | "no") => {
    if (!isInteractive || !onTaskUpdate) return;

    setSelectedOptions((prev) => ({
      ...prev,
      [taskId]: status,
    }));

    if (status === "no") {
      setShowReasonInput(taskId);
    } else {
      setShowReasonInput(null);
      onTaskUpdate(taskId, "completed");
    }
  };

  const handleReasonChange = (taskId: string, reason: string) => {
    setTaskReasons((prev) => ({
      ...prev,
      [taskId]: reason,
    }));
  };
  console.log(tasks, visitStatus);
  const handleReasonBlur = (taskId: string) => {
    if (!isInteractive || !onTaskUpdate || !taskReasons[taskId]) return;

    onTaskUpdate(taskId, "not_completed", taskReasons[taskId]);
  };

  return (
    <div className="mt-[24px]">
      <h3 className="font-roboto font-semibold text-[20px] mb-4">Tasks:</h3>
      {tasks.length === 0 ? (
        <p className="font-roboto text-description text-gray-500">
          No tasks assigned for this schedule.
        </p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-[8px] border border-gray-100"
              style={{
                boxShadow: "0px 0px 7px 0px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="mb-2">
                <h4 className="font-roboto text-[18px] font-semibold text-tertiary">
                  {task.title}
                </h4>
                <p className="font-roboto font-normal mt-2">
                  {task.description}
                </p>
              </div>
              {task.status != "pending" && (
                <>
                  {isInteractive ? (
                    <div className="mt-4">
                      <div className="flex items-center gap-[16px]">
                        <button
                          onClick={() => handleTaskToggle(task.id, "yes")}
                          className={`flex items-center ${
                            selectedOptions[task.id] === "yes"
                              ? "text-green-600 !bg-[#2DA6FF1F]"
                              : "text-gray-500"
                          } w-button-select h-button-select rounded-button bg-button-select-bg p-2`}
                        >
                          <svg
                            className={`h-5 w-5 mr-1 ${
                              selectedOptions[task.id] === "yes"
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Yes</span>
                        </button>

                        <span className="text-gray-300 mx-1">|</span>

                        <button
                          onClick={() => handleTaskToggle(task.id, "no")}
                          className={`flex items-center ${
                            selectedOptions[task.id] === "no"
                              ? "text-red-500 !bg-[#2DA6FF1F]"
                              : "text-gray-500"
                          } w-button-select h-button-select rounded-button bg-button-select-bg p-2`}
                        >
                          <svg
                            className="h-5 w-5 mr-1 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span>No</span>
                        </button>
                      </div>

                      {showReasonInput === task.id && (
                        <div className="mt-4">
                          <input
                            type="text"
                            placeholder="Add reason..."
                            className="w-full p-2 px-4 border bg-white border-[#0000003B] rounded-[14px] focus:outline-none focus:ring-0 focus:ring-[#0000003B] font-roboto font-normal text-input-text leading-input-text"
                            value={taskReasons[task.id] || ""}
                            onChange={(e) =>
                              handleReasonChange(task.id, e.target.value)
                            }
                            onBlur={() => handleReasonBlur(task.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleReasonBlur(task.id);
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-4">
                      <div className="flex items-center">
                        {task.status === "completed" ? (
                          <div className="flex items-center text-green-600 w-button-select h-button-select rounded-button bg-button-select-bg p-2">
                            <svg
                              className="h-5 w-5 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span>Yes</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-500 w-button-select h-button-select rounded-button bg-button-select-bg p-2">
                            <svg
                              className="h-5 w-5 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            <span>No</span>
                          </div>
                        )}
                      </div>

                      {/* Display feedback for non-interactive tasks */}
                      {task.feedback && (
                        <div className="mt-4">
                          <div className="w-full p-2 border border-gray-200 rounded-full bg-gray-50 font-roboto font-normal text-input-text leading-input-text">
                            {task.feedback}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
