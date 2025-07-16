import React from "react";
import { useParams } from "react-router-dom";
import { getSchedule } from "../api/queries";
import { useQuery } from "@tanstack/react-query";
import type { Schedule } from "../types/schedule";
import { getStatusColor } from "../utils/statusColor";

const ScheduleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: schedules,
    isLoading,
    error,
  } = useQuery<Schedule[]>({
    queryKey: ["schedules", "ecd75215-960b-484b-a184-736f8fca4e59"],
    queryFn: () => getSchedule("ecd75215-960b-484b-a184-736f8fca4e59"),
    enabled: !!id,
  });

  const schedule = schedules?.find((s: Schedule) => s.ID === id);

  if (isLoading) return <div>Loading schedule details...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!schedule) return <div>Schedule not found.</div>;

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Schedule Details</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold">{schedule.ServiceName}</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              schedule.VisitStatus
            )}`}
          >
            {schedule.VisitStatus.replace("_", " ").toUpperCase()}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Client Information</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {schedule.ClientInfo.FirstName} {schedule.ClientInfo.LastName}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {schedule.ClientInfo.Email}
              </p>
              <p>
                <span className="font-medium">Username:</span>{" "}
                {schedule.ClientInfo.UserName}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Location</h3>
            <div className="space-y-2">
              <p>
                {schedule.ClientInfo.Location.house_number}{" "}
                {schedule.ClientInfo.Location.street}
              </p>
              <p>
                {schedule.ClientInfo.Location.city},{" "}
                {schedule.ClientInfo.Location.state}{" "}
                {schedule.ClientInfo.Location.pincode}
              </p>
              <p className="text-sm text-gray-600">
                Coordinates: {schedule.ClientInfo.Location.lat},{" "}
                {schedule.ClientInfo.Location.long}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Schedule Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-medium">From:</span>{" "}
                {formatDateTime(schedule.ScheduledSlot.From)}
              </p>
              <p>
                <span className="font-medium">To:</span>{" "}
                {formatDateTime(schedule.ScheduledSlot.To)}
              </p>
            </div>
            <div>
              {schedule.CheckinTime && (
                <p>
                  <span className="font-medium">Check-in:</span>{" "}
                  {formatDateTime(schedule.CheckinTime)}
                </p>
              )}
              {schedule.CheckoutTime && (
                <p>
                  <span className="font-medium">Check-out:</span>{" "}
                  {formatDateTime(schedule.CheckoutTime)}
                </p>
              )}
            </div>
          </div>
        </div>

        {schedule.Tasks && schedule.Tasks.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              Tasks ({schedule.Tasks.length})
            </h3>
            <div className="space-y-3">
              {schedule.Tasks.map((task) => (
                <div key={task.ID} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{task.Title}</h4>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        task.Status === "completed"
                          ? "bg-green-100 text-green-800"
                          : task.Status === "in_progress"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.Status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{task.Description}</p>
                  {task.Feedback && (
                    <div className="mt-2 p-2 bg-gray-50 rounded">
                      <p className="text-sm">
                        <span className="font-medium">Feedback:</span>{" "}
                        {task.Feedback}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {schedule.ServiceNote && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Service Notes</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p>{schedule.ServiceNote}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleDetail;
