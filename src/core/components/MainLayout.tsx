import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import MobileBottomBar from "./MobileBottomBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideBottomBar = location.pathname.startsWith("/schedule/");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-[84px] sm:pb-0">{children}</main>
      {!hideBottomBar && <MobileBottomBar />}
    </div>
  );
};

export default MainLayout;
