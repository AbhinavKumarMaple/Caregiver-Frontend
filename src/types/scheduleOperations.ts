export interface LocationData {
  lat: number;
  long: number;
}

export interface CheckInRequest {
  location: LocationData;
}

export interface CheckOutRequest {
  location: LocationData;
}

export interface CheckInResponse {
  ID: string;
  VisitStatus: string;
  CheckinTime: string;
  CheckinLocation: LocationData;
  success?: boolean;
  message?: string;
}

export interface CheckOutResponse {
  ID: string;
  VisitStatus: string;
  CheckoutTime: string;
  CheckoutLocation: LocationData;
  success?: boolean;
  message?: string;
}

export interface CancelCheckInResponse {
  ID: string;
  VisitStatus: string;
  success?: boolean;
  message?: string;
}

export interface UpdateTaskRequest {
  status: "pending" | "completed";
  feedback?: string;
}

export interface UpdateTaskResponse {
  ID: string;
  Status: string;
  Done: boolean;
  success?: boolean;
  message?: string;
}

export interface SaveNotesRequest {
  notes: string;
}

export interface SaveNotesResponse {
  ID: string;
  ServiceNote: string;
  success?: boolean;
  message?: string;
}
