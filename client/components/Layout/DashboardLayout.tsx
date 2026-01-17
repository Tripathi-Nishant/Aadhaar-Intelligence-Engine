import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-aadhaar-light-gray flex flex-col">
      <Header />

      <div className="flex flex-1 mt-4 mb-4">
        <Sidebar />

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
