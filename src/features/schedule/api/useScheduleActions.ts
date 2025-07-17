import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  checkInSchedule,
  checkOutSchedule,
  cancelCheckIn,
} from "./scheduleMutations";
import type { LocationData } from "../../../shared/types/scheduleOperations";
import { showToast } from "../../../shared/utils/toast";

/**
 * Custom hook for checking in to a schedule
 * @returns Mutation object for check-in functionality
 */
export const useCheckInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      scheduleId,
      location,
    }: {
      scheduleId: string;
      location: LocationData;
    }) => checkInSchedule(scheduleId, { location }),
    onSuccess: (_data, variables) => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({
        queryKey: ["schedule", variables.scheduleId],
      });

      // Show success message
      showToast("Successfully checked in!", "success");
    },
    onError: (error) => {
      console.error("Error checking in:", error);
      showToast("Failed to check in. Please try again.", "error");
    },
  });
};

/**
 * Custom hook for checking out of a schedule
 * @returns Mutation object for check-out functionality
 */
export const useCheckOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      scheduleId,
      location,
    }: {
      scheduleId: string;
      location: LocationData;
    }) => checkOutSchedule(scheduleId, { location }),
    onSuccess: (_data, variables) => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({
        queryKey: ["schedule", variables.scheduleId],
      });

      // Show success message
      showToast("Successfully checked out!", "success");
    },
    onError: (error) => {
      console.error("Error checking out:", error);
      showToast("Failed to check out. Please try again.", "error");
    },
  });
};

/**
 * Custom hook for canceling a schedule
 * @returns Mutation object for cancel functionality
 */
export const useCancelScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scheduleId: string) => cancelCheckIn(scheduleId),
    onSuccess: (_data, variables) => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["schedule", variables] });

      // Show success message
      showToast("Schedule cancelled successfully!", "success");
    },
    onError: (error) => {
      console.error("Error cancelling schedule:", error);
      showToast("Failed to cancel schedule. Please try again.", "error");
    },
  });
};

/**
 * Helper function to get current geolocation
 * @returns Promise with location data
 */
export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        reject(new Error("Unable to retrieve your location"));
      },
      { timeout: 10000 } // 10 second timeout
    );
  });
};
