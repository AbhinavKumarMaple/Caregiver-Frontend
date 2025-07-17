import React from "react";
import ScheduleCard from "./ScheduleCard";
import { useScheduleCardActions } from "../hooks/useScheduleCardActions";
import type { DetailedSchedule } from "../../../shared/types/schedule";

interface ConnectedScheduleCardProps {
  id: string;
  status:
    | "Scheduled"
    | "In progress"
    | "Completed"
    | "Cancelled"
    | "upcoming"
    | "in_progress"
    | "completed"
    | "missed";
  patientName: string;
  serviceName: string;
  location: string;
  date: string;
  timeRange: string;
  profilePicture?: string;
  clientInfo?: DetailedSchedule["ClientInfo"];
  variant?: "card" | "detail" | "centered";
  showActions?: boolean;
  showMoreButton?: boolean;
  showDateTimeSection?: boolean;
  showLocationSection?: boolean;
  email?: string;
  className?: string;
  asLink?: boolean;
}

/**
 * A wrapper component for ScheduleCard that integrates with API actions
 */
const ConnectedScheduleCard: React.FC<ConnectedScheduleCardProps> = (props) => {
  const {
    handleCheckIn,
    handleCheckOut,
    handleCancel,
    isCheckingIn,
    isCheckingOut,
    isCancelling,
  } = useScheduleCardActions();

  return (
    <ScheduleCard
      {...props}
      onCheckIn={handleCheckIn}
      onCheckOut={handleCheckOut}
      onCancel={handleCancel}
      isCheckingIn={isCheckingIn}
      isCheckingOut={isCheckingOut}
      isCancelling={isCancelling}
    />
  );
};

export default ConnectedScheduleCard;
