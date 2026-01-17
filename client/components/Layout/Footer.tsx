import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer
      className="w-full bg-gradient-to-r from-aadhaar-blue to-blue-900 text-white text-center py-6 md:py-8 mt-8 md:mt-12"
      style={{ borderTop: "3px solid #FF6B35" }}
    >
      <div className="space-y-2 px-4">
        <h3 className="text-lg md:text-xl font-bold">
          🇮🇳 Aadhaar System Intelligence Engine
        </h3>
        <p className="text-xs md:text-sm opacity-90">
          UIDAI Hackathon 2025 | Unlocking Societal Trends
        </p>
        <p className="text-xs opacity-75">
          Novel Analytics • Predictive Intelligence • Actionable Recommendations
        </p>
        <p className="text-xs opacity-75">
          Built with 🧡 for India's Digital Identity Infrastructure
        </p>
      </div>
    </footer>
  );
};
