import { useCallback } from "react";
import {
  useCheckInMutation,
  useCheckOutMutation,
  useCancelScheduleMutation,
  getCurrentLocation,
} from "../api/useScheduleActions";
import { showToast } from "../../../shared/utils/toast";

/**
 * Custom hook that provides all schedule card actions with loading states
 * @returns Object containing action handlers and loading states
 */
export const useScheduleCardActions = () => {
  const checkInMutation = useCheckInMutation();
  const checkOutMutation = useCheckOutMutation();
  const cancelMutation = useCancelScheduleMutation();

  /**
   * Handle check-in action
   * @param scheduleId The ID of the schedule to check in to
   */
  const handleCheckIn = useCallback(
    async (scheduleId: string) => {
      try {
        // Get current location
        const location = await getCurrentLocation();

        // Call check-in mutation
        await checkInMutation.mutateAsync({ scheduleId, location });
      } catch (error) {
        if (error instanceof Error && error.message.includes("location")) {
          showToast(
            "Location access is required for check-in. Please enable location services and try again.",
            "error"
          );
        }
        // Other errors are handled by the mutation itself
      }
    },
    [checkInMutation]
  );

  /**
   * Handle check-out action
   * @param scheduleId The ID of the schedule to check out from
   */
  const handleCheckOut = useCallback(
    async (scheduleId: string) => {
      try {
        // Get current location
        const location = await getCurrentLocation();

        // Call check-out mutation
        await checkOutMutation.mutateAsync({ scheduleId, location });
      } catch (error) {
        if (error instanceof Error && error.message.includes("location")) {
          showToast(
            "Location access is required for check-out. Please enable location services and try again.",
            "error"
          );
        }
        // Other errors are handled by the mutation itself
      }
    },
    [checkOutMutation]
  );

  /**
   * Handle cancel action
   * @param scheduleId The ID of the schedule to cancel
   */
  const handleCancel = useCallback(
    async (scheduleId: string) => {
      try {
        // Call cancel mutation
        await cancelMutation.mutateAsync(scheduleId);
      } catch (error) {
        console.log(error);
        // Errors are handled by the mutation itself
      }
    },
    [cancelMutation]
  );

  return {
    handleCheckIn,
    handleCheckOut,
    handleCancel,
    isCheckingIn: checkInMutation.isPending,
    isCheckingOut: checkOutMutation.isPending,
    isCancelling: cancelMutation.isPending,
  };
};
