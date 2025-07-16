import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./shared/lib/queryClient";
import App from "./App";
import "./core/styles/index.css";
import { CurrScheduleProvider } from "./core/context/currSchedule";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CurrScheduleProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </CurrScheduleProvider>
  </StrictMode>
);
