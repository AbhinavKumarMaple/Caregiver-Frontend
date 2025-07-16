// src/types/scheduleOperations.ts

/**
 * Location data for check-in and checkout operations
 */
export interface LocationData {
  lat: number;
  long: number;
}

/**
 * Request payload for check-in operation
 */
export interface CheckInRequest {
  location: LocationData;
}

/**
 * Request payload for checkout operation
 */
export interface CheckOutRequest {
  location: LocationData;
}

/**
 * Response from check-in operation
 */
export interface CheckInResponse {
  ID: string;
  VisitStatus: string;
  CheckinTime: string;
  CheckinLocation: LocationData;
  success?: boolean;
  message?: string;
}

/**
 * Response from checkout operation
 */
export interface CheckOutResponse {
  ID: string;
  VisitStatus: string;
  CheckoutTime: string;
  CheckoutLocation: LocationData;
  success?: boolean;
  message?: string;
}

/**
 * Response from cancel check-in operation
 */
export interface CancelCheckInResponse {
  ID: string;
  VisitStatus: string;
  success?: boolean;
  message?: string;
}

/**
 * Request payload for updating task status
 */
export interface UpdateTaskRequest {
  status: "pending" | "completed";
  feedback?: string;
}

/**
 * Response from task update operation
 */
export interface UpdateTaskResponse {
  ID: string;
  Status: string;
  Done: boolean;
  success?: boolean;
  message?: string;
}

/**
 * Request payload for saving service notes
 */
export interface SaveNotesRequest {
  notes: string;
}

/**
 * Response from saving service notes
 */
export interface SaveNotesResponse {
  ID: string;
  ServiceNote: string;
  success?: boolean;
  message?: string;
}
