import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { path: "/", label: "Executive Dashboard", icon: "🏠" },
  { path: "/deep-analytics", label: "Deep Analytics", icon: "📊" },
  { path: "/recommendations", label: "Recommendations", icon: "🎯" },
  { path: "/anomaly-detection", label: "Anomaly Detection", icon: "🚨" },
  { path: "/export-reports", label: "Export & Reports", icon: "📥" },
];

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-aadhaar-blue text-white rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-aadhaar-blue to-blue-800",
          "border-r-4 border-aadhaar-orange p-6 flex flex-col shadow-xl",
          "transform transition-transform duration-300",
          "md:translate-x-0 md:relative md:h-auto md:flex md:flex-col md:w-full",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex-1">
          <h2 className="text-white font-bold text-lg mb-8">🇮🇳 Aadhaar</h2>

          <nav className="space-y-3">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg transition-all duration-300",
                  "flex items-center gap-3 font-semibold",
                  isActive(item.path)
                    ? "bg-gradient-to-r from-aadhaar-orange to-yellow-500 text-white shadow-lg"
                    : "text-white hover:bg-white hover:bg-opacity-20"
                )}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-white border-opacity-30 pt-4 text-white text-xs">
          <p className="font-semibold mb-2">About</p>
          <div className="space-y-1 text-white text-opacity-80 text-justify">
            <p>📍 States: 30+ Complete Coverage</p>
            <p>📊 Records: 2.5M+ Analysed</p>
            <p>📅 Timeline: 2022-2024</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
