// src/api/queries/scheduleQueries.ts
import type { Schedule, DetailedSchedule } from "../../types/schedule";
import api from "../../lib/axios";

export const getSchedule = (id: string): Promise<Schedule[]> => {
  return (
    api
      // .get(`/v1/schedules/today/${id}`)
      .get(`/v1/schedules/`)
      .then((response) => response.data)
      .catch((error) => {
        // Log error for debugging but don't expose to user
        if (
          typeof process !== "undefined" &&
          process.env.NODE_ENV === "development"
        ) {
          console.error("Error fetching schedules:", error);
        }
        return [];
      })
  );
};

/**
 * Fetches detailed information about a specific schedule by ID
 * @param scheduleId The ID of the schedule to fetch
 * @returns Promise with the detailed schedule data
 */
export const getScheduleById = async (
  scheduleId: string
): Promise<DetailedSchedule> => {
  try {
    const response = await api.get(`/v1/schedules/${scheduleId}`);
    return response.data;
  } catch (error) {
    // Log error for debugging but don't expose to user
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error("Error fetching schedule details:", error);
    }
    throw error;
  }
};
