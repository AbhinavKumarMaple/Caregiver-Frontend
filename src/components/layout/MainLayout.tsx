import React from "react";
import Header from "../core/Header";
import MobileBottomBar from "../core/MobileBottomBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-[84px] sm:pb-0">{children}</main>
      <MobileBottomBar />
    </div>
  );
};

export default MainLayout;
