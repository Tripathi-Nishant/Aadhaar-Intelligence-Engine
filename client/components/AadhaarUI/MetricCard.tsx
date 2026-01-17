import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext: string;
  valueColor?: "blue" | "green" | "orange" | "red";
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  label,
  value,
  subtext,
  valueColor = "blue",
  className,
}) => {
  const colorClasses = {
    blue: "text-aadhaar-blue",
    green: "text-aadhaar-green",
    orange: "text-aadhaar-orange",
    red: "text-red-600",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg p-4 md:p-6 border-l-4 border-aadhaar-orange shadow-md",
        "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
        "border-b border-r border-gray-200",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl md:text-4xl">{icon}</div>
      </div>

      <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2">
        {label}
      </p>

      <p className={cn("text-2xl md:text-4xl font-bold mb-2", colorClasses[valueColor])}>
        {value}
      </p>

      <p className="text-xs md:text-sm text-gray-600">{subtext}</p>
    </div>
  );
};
