// src/pages/ScheduleDetailPage.tsx
import React, { useState, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getScheduleById } from "../api/queries/scheduleQueries";
import {
  checkInSchedule,
  checkOutSchedule,
  cancelCheckIn,
  updateTask,
} from "../api/mutations/scheduleMutations";
import type { DetailedSchedule } from "../types/schedule";
import LazyTaskList from "../components/schedule/LazyTaskList";
import LazyLocationMap from "../components/schedule/LazyLocationMap";
import ActionButtons from "../components/schedule/ActionButtons";
import ServiceNotes from "../components/schedule/ServiceNotes";
import LazyScheduleCard from "../components/schedule/LazyScheduleCard";
import ScheduleCompletionModal from "../components/schedule/ScheduleCompletionModal";
import ScheduleDetailSkeleton from "../components/schedule/ScheduleDetailSkeleton";
import ErrorBoundary from "../components/common/ErrorBoundary";
import type { LocationData } from "../types/scheduleOperations";
import { showToast } from "../utils/toast";
import Title from "../components/common/Title";
import DurationTimer from "../components/common/DurationTimer";
import { useCurrSchedule } from "../context/currSchedule";
import { formatAddress } from "../utils/formatadd";
import { formatTimeRange } from "../utils/formatTime";
import { email, phone } from "../assets";

const ScheduleDetailPage: React.FC = () => {
  const { setCurrScheduleId } = useCurrSchedule();
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Using sonner toast directly

  // Local state
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Fetch schedule details
  const {
    data: schedule,
    isLoading,
    error,
  } = useQuery<DetailedSchedule, Error>({
    queryKey: ["schedule", scheduleId],
    queryFn: () => getScheduleById(scheduleId || ""),
    enabled: !!scheduleId,
  });

  // Check-in mutation
  const checkInMutation = useMutation({
    mutationFn: ({
      scheduleId,
      location,
    }: {
      scheduleId: string;
      location: LocationData;
    }) => checkInSchedule(scheduleId, { location }),
    onSuccess: () => {
      setActionSuccess("Successfully checked in!");
      queryClient.invalidateQueries({ queryKey: ["schedules", "ecd75215-960b-484b-a184-736f8fca4e59"] });

      setTimeout(() => setActionSuccess(null), 3000);
    },
    onError: (error: Error) => {
      setActionError(`Check-in failed: ${error.message}`);
      setTimeout(() => setActionError(null), 5000);
    },
    onSettled: () => {
      setIsActionLoading(false);
    },
  });

  // Check-out mutation
  const checkOutMutation = useMutation({
    mutationFn: ({
      scheduleId,
      location,
    }: {
      scheduleId: string;
      location: LocationData;
    }) => checkOutSchedule(scheduleId, { location }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule", scheduleId] });
      setShowCompletionModal(true);
    },
    onError: (error: Error) => {
      setActionError(`Check-out failed: ${error.message}`);
      setTimeout(() => setActionError(null), 5000);
    },
    onSettled: () => {
      setIsActionLoading(false);
    },
  });

  // Cancel check-in mutation
  const cancelCheckInMutation = useMutation({
    mutationFn: (scheduleId: string) => cancelCheckIn(scheduleId),
    onSuccess: () => {
      setActionSuccess("Check-in cancelled successfully!");
      queryClient.invalidateQueries({ queryKey: ["schedule", scheduleId] });
      setTimeout(() => setActionSuccess(null), 3000);
    },
    onError: (error: Error) => {
      setActionError(`Cancel check-in failed: ${error.message}`);
      setTimeout(() => setActionError(null), 5000);
    },
    onSettled: () => {
      setIsActionLoading(false);
    },
  });

  // Helper function to request location permission directly
  const requestLocationPermission = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      const locationTimeout = setTimeout(() => {
        reject(new Error("Location request timed out. Please try again."));
      }, 10000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(locationTimeout);
          resolve(position);
        },
        (error) => {
          clearTimeout(locationTimeout);

          // Provide more user-friendly error messages based on error code
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(
                new Error(
                  "Location permission denied. Please enable location access in your browser settings."
                )
              );
              break;
            case error.POSITION_UNAVAILABLE:
              reject(
                new Error(
                  "Location information is unavailable. Please try again later."
                )
              );
              break;
            case error.TIMEOUT:
              reject(
                new Error("Location request timed out. Please try again.")
              );
              break;
            default:
              reject(
                new Error(`Unable to retrieve your location: ${error.message}`)
              );
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  // Helper function to get current location with improved error handling
  const getCurrentLocation = async (): Promise<LocationData> => {
    try {
      // This will trigger the browser's permission prompt if permission hasn't been granted yet
      const position = await requestLocationPermission();

      return {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
    } catch (error) {
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  // Handle check-in action
  const handleCheckIn = async () => {
    if (!scheduleId) return;

    setIsActionLoading(true);
    setActionError(null);

    try {
      // First try to get the location
      let location: LocationData;
      try {
        location = await getCurrentLocation();
      } catch (error) {
        // Show toast for location error
        showToast((error as Error).message, "error");
        setIsActionLoading(false);
        return;
      }

      // If location is obtained successfully, proceed with check-in
      try {
        await checkInMutation.mutateAsync({ scheduleId, location });
        showToast("Successfully checked in!", "success");
        // Revalidate the schedules query
        setCurrScheduleId(scheduleId)
      } catch (error) {
        showToast(`Check-in failed: ${(error as Error).message}`, "error");
        setIsActionLoading(false);
      }
    } catch (error) {
      // This is a fallback in case of unexpected errors
      showToast(
        `An unexpected error occurred: ${(error as Error).message}`,
        "error"
      );
      setIsActionLoading(false);
    }
  };

  // Handle check-out action
  const handleCheckOut = async () => {
    if (!scheduleId) return;

    setIsActionLoading(true);
    setActionError(null);

    try {
      // First try to get the location
      let location: LocationData;
      try {
        location = await getCurrentLocation();
      } catch (error) {
        // Show toast for location error
        showToast((error as Error).message, "error");
        setIsActionLoading(false);
        return;
      }

      // If location is obtained successfully, proceed with check-out
      try {
        await checkOutMutation.mutateAsync({ scheduleId, location });
        showToast("Successfully checked out!", "success");
      } catch (error) {
        showToast(`Check-out failed: ${(error as Error).message}`, "error");
        setIsActionLoading(false);
      }
    } catch (error) {
      // This is a fallback in case of unexpected errors
      showToast(
        `An unexpected error occurred: ${(error as Error).message}`,
        "error"
      );
      setIsActionLoading(false);
    }
  };

  // Handle cancel check-in action
  const handleCancelCheckIn = async () => {
    if (!scheduleId) return;

    setIsActionLoading(true);
    setActionError(null);

    try {
      await cancelCheckInMutation.mutateAsync(scheduleId);
      showToast("Check-in cancelled successfully!", "success");
    } catch (error) {
      showToast(`Cancel check-in failed: ${(error as Error).message}`, "error");
      setIsActionLoading(false);
    }
  };

  // Task update mutation using the new API endpoint
  const updateTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      status,
      done,
      feedback,
    }: {
      taskId: string;
      status: "completed" | "not_completed";
      done: boolean;
      feedback?: string;
    }) => updateTask(taskId, { status, done, feedback }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules", "ecd75215-960b-484b-a184-736f8fca4e59"] });
    },
    onError: (error: Error) => {
      setActionError(`Failed to update task: ${error.message}`);
      setTimeout(() => setActionError(null), 5000);
    },
  });

  // Handle task update
  const handleTaskUpdate = async (
    taskId: string,
    status: "completed" | "not_completed",
    feedback?: string
  ) => {
    if (!scheduleId) return;

    try {
      await updateTaskMutation.mutateAsync({
        taskId,
        status,
        done: true, // Always true when posting to the API
        feedback,
      });
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  // Notes are now read-only, so we don't need a handleSaveNotes function

  if (isLoading) {
    return <ScheduleDetailSkeleton />;
  }

  if (error || !schedule) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        <h3 className="font-bold">Error loading schedule</h3>
        <p>{error?.message || "Schedule not found"}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 text-red-700 hover:text-red-800 font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Format address from client location
 

  // Convert API status to our internal format
  const visitStatus = schedule.VisitStatus.toLowerCase() as
    | "upcoming"
    | "in_progress"
    | "completed"
    | "missed";

  // Format date and time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

 

  // Calculate duration
  const calculateDuration = (from: string, to: string) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const diffMs = toDate.getTime() - fromDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours === 1 && diffMinutes === 0) {
      return "1 hour";
    } else if (diffHours === 1) {
      return `1 hour ${diffMinutes} min`;
    } else if (diffHours > 1 && diffMinutes === 0) {
      return `${diffHours} hours`;
    } else if (diffHours > 1) {
      return `${diffHours} hours ${diffMinutes} min`;
    } else {
      return `${diffMinutes} min`;
    }
  };

  // Handle modal actions
  const handleCloseModal = () => {
    setShowCompletionModal(false);
  };

  const handleGoHome = () => {
    setShowCompletionModal(false);
    navigate("/");
    
  };
  console.log(schedule)

  return (
    <>
      {/* Header with reduced width to match content */}
      {/* <div className="flex justify-center w-full md:mt-4">
        <div className="w-full  flex items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="!p-0 mr-2 text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <span className="font-roboto font-semibold text-[1.5rem] leading-task-title">
            Schedule Details
          </span>
        </div>
      </div> */}
      <Title func={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="font-roboto font-semibold  ">
          {
        visitStatus === 'in_progress' ? "Clock-out": "Schedule Details"
        }
        </span>
      </Title>

      {/* Content area */}
      <div className="flex flex-col items-center w-full">
        <div className="w-full ">
          <div className="rounded-2xl p-4 sm:px-0">
            <ErrorBoundary>
            {schedule?.CheckinTime && <DurationTimer
            className="font-semibold text-[#1D1D1BDE] text-[32px] mb-5 text-center"
            checkinTime={schedule.CheckinTime} />}
              <LazyScheduleCard
                id={schedule.ID}
                status={visitStatus}
                patientName={`${schedule.ClientInfo.FirstName} ${schedule.ClientInfo.LastName}`}
                serviceName={schedule.ServiceName}
                location={formatAddress(schedule.ClientInfo.Location)}
                date={formatDate(schedule.ScheduledSlot.From)}
                timeRange={formatTimeRange(
                  schedule.ScheduledSlot.From,
                  schedule.ScheduledSlot.To
                )}
                profilePicture={schedule.ClientInfo.ProfilePicture}
                clientInfo={schedule.ClientInfo}
                variant="centered"
                asLink={false}
                className="mb-6"
              />
            </ErrorBoundary>

            <section className="flex flex-col gap-6">
               <div className="flex flex-col">
               <h3 className="text-[20px] font-semibold">CLient Contant:</h3>
                <div className="space-y-2 mt-2 text-sm sm:text-base">
                  <p className="flex gap-2 items-center">
                    <img src={email} alt="email" className="h-7 w-7" />
                    <span className="">{schedule.ClientInfo?.Email}</span>
                  </p>
                  <p className="flex gap-2 items-center">
                    <img src={phone} alt="email" className="h-7 w-7" />
                    <span className="">{"+44 1232 212 3233"}</span>
                  </p>
                </div>
               </div>
               <div className="flex flex-col">
               <h3 className="text-[20px] font-semibold">Address:</h3>
                <div className="space-y-2 mt-2 text-sm sm:text-base">
                    <span className="block">{schedule.ClientInfo?.Location?.house_number} {schedule.ClientInfo?.Location?.street}</span>
                    <span className="">{schedule.ClientInfo?.Location?.city}, {schedule.ClientInfo?.Location?.state}, {schedule.ClientInfo?.Location?.pincode}</span>
                </div>
               </div>

            </section>

            {/* Task List Component */}
            <ErrorBoundary>
              <LazyTaskList
                tasks={schedule.Tasks.map((task) => ({
                  id: task.ID,
                  title: task.Title,
                  description: task.Description,
                  status: task.Status.toLowerCase() as "pending" | "completed",
                  feedback: task.Feedback || undefined,
                }))}
                visitStatus={visitStatus}
                onTaskUpdate={handleTaskUpdate}
              />
            </ErrorBoundary>

            {/* Service Notes Component */}
            <ServiceNotes notes={schedule.ServiceNote} />

            {/* Location Map Component for Check-in Location */}
            {(schedule.CheckinTime || visitStatus === "in_progress") && (
              <div className="mt-[1.5rem]">
                <h3 className="font-roboto font-semibold text-task-title leading-task-title text-task-text mb-8">
                  Clock-In Location
                </h3>
                <ErrorBoundary>
                  <LazyLocationMap
                    location={schedule.CheckinLocation}
                    address={schedule.ClientInfo.Location}
                  />
                </ErrorBoundary>
              </div>
            )}

            {/* Success/Error messages */}
            {actionSuccess && (
              <div className="mt-16 bg-green-50 text-green-800 p-8 rounded-task font-roboto font-normal text-description leading-description">
                {actionSuccess}
              </div>
            )}

            {actionError && (
              <div className="mt-16 bg-red-50 text-red-700 p-8 rounded-task font-roboto font-normal text-description leading-description">
                {actionError}
              </div>
            )}

            {/* Action Buttons Component */}
            <ActionButtons
              visitStatus={visitStatus}
              onCheckin={handleCheckIn}
              onCheckout={handleCheckOut}
              onCancelCheckin={handleCancelCheckIn}
              isLoading={isActionLoading}
            />
          </div>
        </div>
      </div>

      {/* Schedule Completion Modal */}
      <ScheduleCompletionModal
        isOpen={showCompletionModal}
        onClose={handleCloseModal}
        onGoHome={handleGoHome}
        scheduleDate={formatDate(schedule.ScheduledSlot.From)}
        scheduleTime={formatTimeRange(
          schedule.ScheduledSlot.From,
          schedule.ScheduledSlot.To
        )}
        duration={calculateDuration(
          schedule.ScheduledSlot.From,
          schedule.ScheduledSlot.To
        )}
      />
    </>
  );
};

export default ScheduleDetailPage;
