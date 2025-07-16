// src/pages/LazyScheduleDetailPage.tsx
import React, { Suspense, lazy } from "react";
import ScheduleDetailSkeleton from "../components/schedule/ScheduleDetailSkeleton";

// Lazy load the main component
const ScheduleDetailPage = lazy(() => import("./ScheduleDetailPage"));

const LazyScheduleDetailPage: React.FC = () => {
  return (
    <Suspense fallback={<ScheduleDetailSkeleton />}>
      <ScheduleDetailPage />
    </Suspense>
  );
};

export default LazyScheduleDetailPage;
