import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-aadhaar-orange to-aadhaar-blue rounded-lg p-6",
        "border-l-4 border-aadhaar-saffron shadow-lg mb-6",
        className
      )}
    >
      <h2 className="text-white text-2xl font-bold">{title}</h2>
      {subtitle && <p className="text-white text-sm mt-2 opacity-90">{subtitle}</p>}
    </div>
  );
};
