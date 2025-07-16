import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/queryClient";
import App from "./App";
import "./index.css";
import { CurrScheduleProvider } from "./context/currSchedule";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CurrScheduleProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </CurrScheduleProvider>
  </StrictMode>
);
