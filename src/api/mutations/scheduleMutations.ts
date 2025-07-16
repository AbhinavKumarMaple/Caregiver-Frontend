// src/api/mutations/scheduleMutations.ts
import api from "../../lib/axios";
import type {
  CheckInRequest,
  CheckInResponse,
  CheckOutRequest,
  CheckOutResponse,
  CancelCheckInResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
  SaveNotesRequest,
  SaveNotesResponse,
} from "../../types/scheduleOperations";

interface CreateScheduleData {
  clientUserId: string;
  assignedUserId: string;
  serviceName: string;
  scheduledSlot: {
    from: string;
    to: string;
  };
  tasks?: string[];
  serviceNote?: string;
}

interface UpdateScheduleData {
  serviceName?: string;
  scheduledSlot?: {
    from: string;
    to: string;
  };
  visitStatus?: "upcoming" | "in_progress" | "completed" | "missed";
  serviceNote?: string;
}

export const createSchedule = (data: CreateScheduleData) => {
  // Placeholder for creating schedule data
  return Promise.resolve(data);
};

export const updateSchedule = (id: string, data: UpdateScheduleData) => {
  // Placeholder for updating schedule data
  return Promise.resolve({ id, ...data });
};

export const deleteSchedule = (id: string) => {
  // Placeholder for deleting schedule data
  return Promise.resolve({ id, success: true });
};

/**
 * Performs check-in (start) for a schedule
 * @param scheduleId The ID of the schedule to check in
 * @param data Location data for check-in
 * @returns Promise with check-in response
 */
export const checkInSchedule = async (
  scheduleId: string,
  data: CheckInRequest
): Promise<CheckInResponse> => {
  try {
    // Format the payload according to the API requirements
    const payload = {
      Timestamp: new Date().toISOString(),
      Location: {
        lat: data.location.lat,
        long: data.location.long,
      },
    };

    const response = await api.post(
      `/v1/schedules/${scheduleId}/start`,
      payload
    );
    return response.data;
  } catch (error) {
    // Log error only in development
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error checking in:", error);
    }
    throw error;
  }
};

/**
 * Performs checkout (end) for a schedule
 * @param scheduleId The ID of the schedule to check out
 * @param data Location data for checkout
 * @returns Promise with checkout response
 */
export const checkOutSchedule = async (
  scheduleId: string,
  data: CheckOutRequest
): Promise<CheckOutResponse> => {
  try {
    // Format the payload according to the API requirements
    const payload = {
      Timestamp: new Date().toISOString(),
      Location: {
        lat: data.location.lat,
        long: data.location.long,
      },
    };

    const response = await api.post(`/v1/schedules/${scheduleId}/end`, payload);
    return response.data;
  } catch (error) {
    // Log error only in development
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error checking out:", error);
    }
    throw error;
  }
};

/**
 * Cancels a check-in for a schedule
 * @param scheduleId The ID of the schedule to cancel check-in
 * @returns Promise with cancel check-in response
 */
export const cancelCheckIn = async (
  scheduleId: string
): Promise<CancelCheckInResponse> => {
  try {
    // Format the payload according to the API requirements
    const payload = {
      VisitStatus: "cancelled",
    };

    const response = await api.put(`/v1/schedules/${scheduleId}`, payload);
    return response.data;
  } catch (error) {
    // Log error only in development
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error canceling check-in:", error);
    }
    throw error;
  }
};
/**
 * Updates the status of a task in a schedule
 * @param scheduleId The ID of the schedule containing the task
 * @param taskId The ID of the task to update
 * @param data Task update data
 * @returns Promise with task update response
 */
export const updateTaskStatus = async (
  scheduleId: string,
  taskId: string,
  data: UpdateTaskRequest
): Promise<UpdateTaskResponse> => {
  try {
    const response = await api.patch(
      `/v1/schedules/${scheduleId}/tasks/${taskId}`,
      data
    );
    return response.data;
  } catch (error) {
    // Log error only in development
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error updating task:", error);
    }
    throw error;
  }
};
/**
 * Saves service notes for a schedule
 * @param scheduleId The ID of the schedule
 * @param data Notes data
 * @returns Promise with save notes response
 */
export const saveServiceNotes = async (
  scheduleId: string,
  data: SaveNotesRequest
): Promise<SaveNotesResponse> => {
  try {
    const response = await api.patch(`/v1/schedules/${scheduleId}/notes`, data);
    return response.data;
  } catch (error) {
    // Log error only in development
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error saving notes:", error);
    }
    throw error;
  }
};
/**
 * Updates a task with status and feedback
 * @param taskId The ID of the task to update
 * @param data Task update data including status and feedback
 * @returns Promise with task update response
 */
interface TaskUpdateResponse {
  id: string;
  status: "completed" | "not_completed";
  done: boolean;
  feedback?: string;
  updatedAt: string;
}

export const updateTask = async (
  taskId: string,
  data: {
    status: "completed" | "not_completed";
    done: boolean;
    feedback?: string;
  }
): Promise<TaskUpdateResponse> => {
  try {
    const response = await api.post(`/v1/tasks/${taskId}/update`, data);
    return response.data;
  } catch (error) {
    // Log error only in development
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error updating task:", error);
    }
    throw error;
  }
};
