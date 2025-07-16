import type { Schedule, DetailedSchedule } from "../../types/schedule";
import api from "../../lib/axios";

export const getSchedule = (id: string): Promise<Schedule[]> => {
  console.log(id);
  return api
    .get(`/v1/schedules/`)
    .then((response) => response.data)
    .catch((error) => {
      if (
        typeof process !== "undefined" &&
        process.env.NODE_ENV === "development"
      ) {
        console.error("Error fetching schedules:", error);
      }
      return [];
    });
};

export const getScheduleById = async (
  scheduleId: string
): Promise<DetailedSchedule> => {
  try {
    const response = await api.get(`/v1/schedules/${scheduleId}`);
    return response.data;
  } catch (error) {
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error fetching schedule details:", error);
    }
    throw error;
  }
};
