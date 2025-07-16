import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ScheduleDetailPage from "../pages/ScheduleDetailPage";
import Profile from "../pages/Profile";
import MainLayout from "../components/layout/MainLayout";

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
