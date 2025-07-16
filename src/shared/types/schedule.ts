import type { Task } from "./task";

export interface ClientInfo {
  ProfilePicture: string;
  ID: string;
  UserName: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Location: {
    house_number: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    lat: number;
    long: number;
  };
}

export interface ScheduledSlot {
  From: string;
  To: string;
}

export interface Location {
  lat: number | null;
  long: number | null;
}

export interface Schedule {
  ID: string;
  ClientUserID: string;
  ClientInfo: ClientInfo;
  AssignedUserID: string;
  ServiceName: string;
  ScheduledSlot: ScheduledSlot;
  VisitStatus:
    | "upcoming"
    | "in_progress"
    | "completed"
    | "missed"
    | "canceled"
    | "cancelled";
  CheckinTime: string | null;
  CheckoutTime: string | null;
  CheckinLocation: Location;
  CheckoutLocation: Location;
  Tasks: Task[];
  ServiceNote: string | null;
  profilePicture: string | null;
}

// Extended interface for detailed schedule information
export interface DetailedSchedule {
  ID: string;
  ClientUserID: string;
  ClientInfo: {
    ID: string;
    UserName: string;
    Email: string;
    FirstName: string;
    LastName: string;
    ProfilePicture?: string;
    Location: {
      house_number: string;
      street: string;
      city: string;
      state: string;
      pincode: string;
      lat: number;
      long: number;
    };
  };
  AssignedUserID: string;
  ServiceName: string;
  ScheduledSlot: {
    From: string;
    To: string;
  };
  VisitStatus:
    | "upcoming"
    | "in_progress"
    | "completed"
    | "missed"
    | "canceled"
    | "cancelled";
  CheckinTime: string | null;
  CheckoutTime: string | null;
  CheckinLocation: {
    lat: number | null;
    long: number | null;
  };
  CheckoutLocation: {
    lat: number | null;
    long: number | null;
  };
  Tasks: {
    ID: string;
    Title: string;
    Description: string;
    Status: "pending" | "completed";
    Done: boolean | null;
    Feedback: string | null;
  }[];
  ServiceNote: string | null;
}

export const mapDetailedScheduleToSchedule = (
  detailedSchedule: DetailedSchedule
): Schedule => {
  return {
    ID: detailedSchedule?.ID,
    ClientUserID: detailedSchedule?.ClientUserID,
    ClientInfo: {
      ...detailedSchedule?.ClientInfo,
      ProfilePicture: detailedSchedule?.ClientInfo?.ProfilePicture || "",
    },
    AssignedUserID: detailedSchedule?.AssignedUserID,
    ServiceName: detailedSchedule?.ServiceName,
    ScheduledSlot: {
      From: detailedSchedule?.ScheduledSlot?.From,
      To: detailedSchedule?.ScheduledSlot?.To,
    },
    VisitStatus: detailedSchedule?.VisitStatus,
    CheckinTime: detailedSchedule?.CheckinTime,
    CheckoutTime: detailedSchedule?.CheckoutTime,
    CheckinLocation: detailedSchedule?.CheckinLocation,
    CheckoutLocation: detailedSchedule?.CheckoutLocation,
    Tasks:
      detailedSchedule?.Tasks?.map((task) => ({
        ID: task?.ID,
        Title: task?.Title,
        Description: task?.Description,
        Status: task?.Status,
        Done: task?.Done,
        Feedback: task?.Feedback,
      })) || [],
    ServiceNote: detailedSchedule?.ServiceNote,
    profilePicture: detailedSchedule?.ClientInfo?.ProfilePicture || null,
  };
};
