import React from "react";
import { cn } from "@/lib/utils";

interface GradientCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  gradient: "red" | "orange" | "blue" | "green";
  className?: string;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  icon,
  label,
  value,
  gradient,
  className,
}) => {
  const gradients = {
    red: "from-red-500 to-red-600",
    orange: "from-aadhaar-orange to-yellow-500",
    blue: "from-aadhaar-blue to-blue-600",
    green: "from-aadhaar-green to-emerald-500",
  };

  return (
    <div
      className={cn(
        `bg-gradient-to-br ${gradients[gradient]} rounded-lg p-6 text-white shadow-lg`,
        "hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      {icon && <div className="text-3xl mb-4">{icon}</div>}
      <p className="text-sm font-semibold opacity-90 mb-2">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};
