interface CreateTaskData {
  title: string;
  description: string;
  scheduleId: string;
  status?: "pending" | "completed";
}

interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: "pending" | "completed";
  done?: boolean;
  feedback?: string;
}

interface TaskResponse {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  done: boolean | null;
  feedback: string | null;
  createdAt: string;
  updatedAt: string;
}

interface DeleteTaskResponse {
  id: string;
  success: boolean;
}

export const createTask = (data: CreateTaskData): Promise<TaskResponse> => {
  return Promise.resolve({
    id: Math.random().toString(36).substr(2, 9),
    title: data.title,
    description: data.description,
    status: data.status || "pending",
    done: null,
    feedback: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};

export const updateTask = (
  id: string,
  data: UpdateTaskData
): Promise<TaskResponse> => {
  return Promise.resolve({
    id,
    title: data.title || "Updated Task",
    description: data.description || "Updated Description",
    status: data.status || "pending",
    done: data.done || null,
    feedback: data.feedback || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};

export const deleteTask = (id: string): Promise<DeleteTaskResponse> => {
  return Promise.resolve({ id, success: true });
};
