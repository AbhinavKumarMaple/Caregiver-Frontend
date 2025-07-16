import React, { Suspense, lazy } from "react";
import ScheduleDetailSkeleton from "../components/schedule/ScheduleDetailSkeleton";

const ScheduleDetailPage = lazy(() => import("./ScheduleDetailPage"));

const LazyScheduleDetailPage: React.FC = () => {
  return (
    <Suspense fallback={<ScheduleDetailSkeleton />}>
      <ScheduleDetailPage />
    </Suspense>
  );
};

export default LazyScheduleDetailPage;
