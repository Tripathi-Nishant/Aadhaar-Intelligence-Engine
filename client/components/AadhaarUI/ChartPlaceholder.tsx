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
        "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 rounded-lg border-2 border-gray-300",
        "flex flex-col items-center justify-center p-8 shadow-lg hover:shadow-xl transition-all duration-300",
        "relative overflow-hidden",
        className
      )}
      style={{ height }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-aadhaar-orange rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-40 right-0 w-40 h-40 bg-aadhaar-blue rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute -bottom-8 left-20 w-40 h-40 bg-aadhaar-green rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="text-center relative z-10">
        <div className="text-6xl mb-4 opacity-60">📊</div>
        <h3 className="text-lg font-semibold text-aadhaar-blue mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 max-w-md leading-relaxed">{description}</p>
        )}
        <p className="text-xs text-gray-500 mt-4 opacity-75">
          (Interactive visualization - Ready for data integration)
        </p>
      </div>
    </div>
  );
};
