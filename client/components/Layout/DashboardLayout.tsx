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
      <Sidebar />

      {/* Main content with sidebar offset on desktop */}
      <div className="flex flex-col md:ml-64 min-h-screen">
        <Header />

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

        <Footer />
      </div>
    </div>
  );
};
