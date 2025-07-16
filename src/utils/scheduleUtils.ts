import type { Schedule } from "../types/schedule";

export const mapVisitStatusToCardStatus = (
  visitStatus: string
): "Scheduled" | "In progress" | "Completed" | "Cancelled" => {
  switch (visitStatus) {
    case "upcoming":
      return "Scheduled";
    case "in_progress":
      return "In progress";
    case "completed":
      return "Completed";
    default:
      return "Cancelled";
  }
};

export const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return dateStr;
};

export const formatTimeRange = (from: string, to: string) => {
  const fromTime = new Date(from).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const toTime = new Date(to).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${fromTime} - ${toTime}`;
};

export const formatLocation = (clientInfo: Schedule["ClientInfo"]) => {
  const { Location } = clientInfo;
  return `${Location.street}, ${Location.city}, ${Location.state} ${Location.pincode}`;
};
