import React from "react";

export const Header: React.FC = () => {
  return (
    <header
      className="w-full bg-gradient-to-r from-aadhaar-orange via-white to-aadhaar-green rounded-2xl m-4 shadow-lg"
      style={{
        borderBottom: "3px solid #FF6B35",
        boxShadow: "0 8px 32px rgba(0, 78, 137, 0.3)",
      }}
    >
      <div className="px-8 py-8 text-center">
        <h1 className="text-4xl font-bold text-aadhaar-blue mb-2">
          🇮🇳 Aadhaar System Intelligence Engine
        </h1>
        <p className="text-lg text-aadhaar-blue font-semibold mb-2">
          Advanced Analytics for India's Digital Identity Infrastructure
        </p>
        <p className="text-sm text-gray-600">
          Transforming Data into Actionable Governance | UIDAI Hackathon 2025
        </p>
      </div>
    </header>
  );
};
