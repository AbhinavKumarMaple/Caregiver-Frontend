import api from "../../../shared/lib/axios";
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
} from "../../../shared/types/scheduleOperations";

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
  return Promise.resolve(data);
};

export const updateSchedule = (id: string, data: UpdateScheduleData) => {
  return Promise.resolve({ id, ...data });
};

export const deleteSchedule = (id: string) => {
  return Promise.resolve({ id, success: true });
};

export const checkInSchedule = async (
  scheduleId: string,
  data: CheckInRequest
): Promise<CheckInResponse> => {
  try {
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
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error checking in:", error);
    }
    throw error;
  }
};

export const checkOutSchedule = async (
  scheduleId: string,
  data: CheckOutRequest
): Promise<CheckOutResponse> => {
  try {
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
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error checking out:", error);
    }
    throw error;
  }
};

export const cancelCheckIn = async (
  scheduleId: string
): Promise<CancelCheckInResponse> => {
  try {
    const payload = {
      VisitStatus: "cancelled",
    };

    const response = await api.put(`/v1/schedules/${scheduleId}`, payload);
    return response.data;
  } catch (error) {
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error canceling check-in:", error);
    }
    throw error;
  }
};
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
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error updating task:", error);
    }
    throw error;
  }
};
export const saveServiceNotes = async (
  scheduleId: string,
  data: SaveNotesRequest
): Promise<SaveNotesResponse> => {
  try {
    const response = await api.patch(`/v1/schedules/${scheduleId}/notes`, data);
    return response.data;
  } catch (error) {
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error saving notes:", error);
    }
    throw error;
  }
};
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
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error updating task:", error);
    }
    throw error;
  }
};
