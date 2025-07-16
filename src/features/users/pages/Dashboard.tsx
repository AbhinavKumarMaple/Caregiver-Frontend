import React, { useEffect, Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Schedule } from "../../../shared/types/schedule";
import { getSchedule } from "../../schedule/api/scheduleQueries";
import type { User } from "../../../types/user";
import { getUserData } from "../api/usersQuery";
import DashboardSkeleton from "../../../shared/components/DashboardSkeleton";
import Title from "../../../shared/components/Title";
import MobileHeader from "../../../shared/components/MobileHeader";
import DurationTimer from "../../../shared/components/DurationTimer";
import { alarm, clock_white, location_white } from "../../../shared/assets";
import { formatAddress } from "../../../shared/utils/formatadd";
import {
  formatDateTime,
  formatLocation,
  formatTimeRange,
  mapVisitStatusToCardStatus,
} from "../../schedule/utils/scheduleUtils";
import Button from "../../../shared/components/Button";
import ErrorBoundary from "../../../shared/components/ErrorBoundary";
import ScheduleCardSkeleton from "../../schedule/components/ScheduleCardSkeleton";
import LazyScheduleCard from "../../schedule/components/LazyScheduleCard";
const Dashboard: React.FC = () => {
  const [activeSchedule, setActiveSchedule] = useState<Schedule | null>(null);
  const {
    data: schedules,
    isLoading,
    error,
  } = useQuery<Schedule[], Error>({
    queryKey: ["schedules", "ecd75215-960b-484b-a184-736f8fca4e59"],
    queryFn: () => getSchedule("ecd75215-960b-484b-a184-736f8fca4e59"),
  });

  const userId = "ecd75215-960b-484b-a184-736f8fca4e59"; // Define the user ID

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery<User, Error>({
    queryKey: ["user", userId],
    queryFn: () => getUserData(userId),
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      // User data stored successfully in localStorage
    }
  }, [userData]);

  useEffect(() => {
    const schedule = schedules?.find((s) => s.VisitStatus === "in_progress");
    if (schedule) {
      setActiveSchedule(schedule);
    }
  }, [schedules]);

  // Calculate dashboard stats from actual schedule data
  const dashboardStats = React.useMemo(() => {
    if (!schedules)
      return [
        { value: 0, label: "Missed Scheduled", colorClass: "text-red-600" },
        {
          value: 0,
          label: "Upcoming Today's Schedule",
          colorClass: "text-orange-500",
        },
        {
          value: 0,
          label: "Today's Completed Schedule",
          colorClass: "text-green-600",
        },
      ];

    const missed = schedules.filter(
      (s) =>
        s.VisitStatus === "missed" ||
        s.VisitStatus === "canceled" ||
        s.VisitStatus === "cancelled"
    ).length;
    const upcoming = schedules.filter(
      (s) => s.VisitStatus === "upcoming" || s.VisitStatus === "in_progress"
    ).length;
    const completed = schedules.filter(
      (s) => s.VisitStatus === "completed"
    ).length;

    return [
      { value: missed, label: "Missed Scheduled", colorClass: "text-red-600" },
      {
        value: upcoming,
        label: "Upcoming Today's Schedule",
        colorClass: "text-orange-500",
      },
      {
        value: completed,
        label: "Today's Completed Schedule",
        colorClass: "text-green-600",
      },
    ];
  }, [schedules]);

  useEffect(() => {
    const schedule = schedules?.find((s) => s.VisitStatus === "in_progress");
    if (schedule) {
      setActiveSchedule(schedule);
    }
  }, [schedules]);

  if (isLoading || isUserLoading) {
    return <DashboardSkeleton />;
  }

  // Combine error handling for both queries
  if (error || userError) {
    const errorMessage = error ? error.message : userError?.message;
    return <div>An error occurred: {errorMessage}</div>;
  }

  return (
    <>
      <Title>
        <span>Dashboard</span>
      </Title>
      <MobileHeader>
        <span className="text-lg font-semibold capitalize">
          Welcome {userData?.UserName + "!"}
        </span>
      </MobileHeader>
      {activeSchedule && (
        <section className="flex flex-col item-center  rounded-[20px] p-5 bg-tertiary my-2">
          <div>
            {activeSchedule?.CheckinTime && (
              <DurationTimer
                checkinTime={activeSchedule?.CheckinTime}
                className="text-[#EEEEEE] mb-1 text-center text-xl sm:text-[28px] font-semibold"
              />
            )}
          </div>
          <div className="flex items-center gap-[8px] ">
            <img
              src={activeSchedule?.profilePicture || "invalid.jpg"}
              alt="Profile"
              className=" w-10 sm:w-14 h-10 sm:h-14 rounded-full mb-2 object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://picsum.photos/200/300";
              }}
            />
            <h3 className="text-base sm:text-xl text-white font-semibold font-roboto">
              {activeSchedule?.ClientInfo?.UserName}
            </h3>
          </div>

          {/* //flex  */}
          <section className="flex flex-col md:items-center md:gap-3 md:flex-row">
            <div className="flex items-center w-fit min-w-fit  text-nowrap text-sm text-gray-500">
              <img
                src={location_white}
                alt="location"
                className="w-5 sm:w-6 h-5 sm:h-6 rounded-full mr-1"
              />
              <span className="font-roboto text-[#EEEEEE]">
                {formatAddress(activeSchedule?.ClientInfo?.Location)}
              </span>
            </div>
            <span className="h-3 w-0.5 hidden md:block bg-[#EEEEEE] rounded-xl" />
            <div className="flex items-center w-full md:mt-0 mt-2">
              <img src={clock_white} alt="clock" className="w-5 h-5 mr-2" />
              <span className="font-roboto text-sm  text-[#EEEEEE]">
                {activeSchedule &&
                  formatTimeRange(
                    activeSchedule?.ScheduledSlot?.From,
                    activeSchedule?.ScheduledSlot.To
                  )}
              </span>
            </div>
          </section>

          <Button variant="white" className="mt-4">
            <div className="text-sm sm:text-base flex items-center justify-center text-center">
              <img src={alarm} alt="alarm" className="h-5 w-5" />
              Clock-Out
            </div>
          </Button>
        </section>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-7 sm:mt-2">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl shadow-sm bg-white text-center ${
              index === 0 ? "col-span-2 md:col-span-1" : "col-span-1"
            }`}
          >
            <div className={`text-[34px] font-bold ${stat.colorClass}`}>
              {stat.value}
            </div>
            <div className="text-gray-600 text-sm md:text-base">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-between items-center mt-5">
        <h2 className="text-[18px] font-semibold  flex items-center">
          Schedule
          <span className="ml-2 px-2 py-1 bg-[#02CAD1] text-white text-sm font-semibold rounded-lg">
            {schedules?.length || 0}
          </span>
        </h2>

        <span className="text-[#0D5D59] text-[13px] font-medium block sm:hidden">
          See All
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:gap-4 mt-5 pb-28">
        {schedules &&
          schedules.map((schedule: Schedule) => (
            <ErrorBoundary key={schedule.ID}>
              <Suspense fallback={<ScheduleCardSkeleton variant="card" />}>
                <LazyScheduleCard
                  profilePicture={schedule.ClientInfo.ProfilePicture}
                  id={schedule.ID}
                  status={mapVisitStatusToCardStatus(schedule.VisitStatus)}
                  patientName={`${schedule.ClientInfo.FirstName} ${schedule.ClientInfo.LastName}`}
                  serviceName={schedule.ServiceName}
                  location={formatLocation(schedule.ClientInfo)}
                  date={formatDateTime(schedule.ScheduledSlot.From)}
                  timeRange={formatTimeRange(
                    schedule.ScheduledSlot.From,
                    schedule.ScheduledSlot.To
                  )}
                />
              </Suspense>
            </ErrorBoundary>
          ))}
      </div>
    </>
  );
};

export default Dashboard;
