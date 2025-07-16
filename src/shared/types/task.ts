export interface Task {
  ID: string;
  Title: string;
  Description: string;
  Status: "pending" | "completed" | "in_progress";
  Done: boolean | null;
  Feedback: string | null;
}
