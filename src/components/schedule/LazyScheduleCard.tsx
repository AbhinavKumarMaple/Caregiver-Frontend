// src/components/schedule/LazyScheduleCard.tsx
import React, { Suspense, lazy } from "react";
import ScheduleCardSkeleton from "./ScheduleCardSkeleton";
import type { DetailedSchedule } from "../../types/schedule";

// Lazy load the ScheduleCard component
const ScheduleCard = lazy(() => import("./ScheduleCard"));

interface LazyScheduleCardProps {
  id: string;
  status: "upcoming" | "in_progress" | "completed" | "missed" | "Scheduled" | "In progress" | "Completed" | "Cancelled";
  patientName: string;
  serviceName: string;
  location: string;
  date: string;
  timeRange: string;
  profilePicture?: string;
  clientInfo?: DetailedSchedule["ClientInfo"];
  variant?: "card" | "detail" | "centered";
  asLink?: boolean;
  className?: string;
}

const LazyScheduleCard: React.FC<LazyScheduleCardProps> = (props) => {
  return (
    <Suspense
      fallback={
        <ScheduleCardSkeleton
          variant={props.variant}
          className={props.className}
        />
      }
    >
      <ScheduleCard {...props} />
    </Suspense>
  );
};

export default LazyScheduleCard;
