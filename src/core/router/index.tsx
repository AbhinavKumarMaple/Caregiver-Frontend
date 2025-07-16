import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Dashboard from "../../features/users/pages/Dashboard";
import ScheduleDetailPage from "../../features/schedule/pages/ScheduleDetailPage";
import Profile from "../../features/users/pages/Profile";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/schedule/:scheduleId"
            element={<ScheduleDetailPage />}
          />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;
