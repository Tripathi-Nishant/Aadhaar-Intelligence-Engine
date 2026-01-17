import React from "react";
import { cn } from "@/lib/utils";

interface InfoBoxProps {
  type: "info" | "success" | "warning" | "critical";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({
  type,
  title,
  children,
  className,
}) => {
  const styles = {
    info: {
      bg: "#FFF9F0",
      border: "border-aadhaar-orange",
      text: "text-aadhaar-blue",
    },
    success: {
      bg: "#F0FDF4",
      border: "border-aadhaar-green",
      text: "text-aadhaar-green",
    },
    warning: {
      bg: "#FFFBEB",
      border: "border-yellow-500",
      text: "text-yellow-700",
    },
    critical: {
      bg: "#FEF2F2",
      border: "border-red-500",
      text: "text-red-700",
    },
  };

  const style = styles[type];

  return (
    <div
      className={cn(
        "rounded-lg p-4 border-l-4",
        `bg-[${style.bg}] ${style.border}`,
        className
      )}
      style={{
        backgroundColor: style.bg,
        borderLeftColor: type === "info" ? "#FF6B35" : 
                       type === "success" ? "#138808" :
                       type === "warning" ? "#EAB308" :
                       "#DC2626",
      }}
    >
      {title && <h4 className={cn("font-semibold mb-2", style.text)}>{title}</h4>}
      <div className={cn("text-sm", style.text)}>{children}</div>
    </div>
  );
};
