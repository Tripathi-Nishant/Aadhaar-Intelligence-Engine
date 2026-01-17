import React from "react";
import { cn } from "@/lib/utils";

interface ChartPlaceholderProps {
  title: string;
  description?: string;
  height?: string;
  className?: string;
}

export const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  title,
  description,
  height = "500px",
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200",
        "flex flex-col items-center justify-center p-8 shadow-md",
        className
      )}
      style={{ height }}
    >
      <div className="text-center">
        <div className="text-6xl mb-4 opacity-50">📊</div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 max-w-md">{description}</p>
        )}
      </div>
    </div>
  );
};
