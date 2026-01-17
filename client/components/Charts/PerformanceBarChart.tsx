import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { StateData } from "@/lib/aadhaarData";

interface PerformanceBarChartProps {
  data: StateData[];
  title: string;
  color: string;
}

export const PerformanceBarChart: React.FC<PerformanceBarChartProps> = ({
  data,
  title,
  color,
}) => {
  const chartData = data.map((item) => ({
    name: item.state.substring(0, 15), // Truncate long names
    value: parseFloat(item.healthScore.toFixed(1)),
    fullName: item.state,
  }));

  return (
    <div>
      <div className="bg-aadhaar-blue rounded-lg p-3 mb-4 border-l-4 border-aadhaar-saffron">
        <h3 className="text-white font-bold">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis type="number" domain={[0, 100]} stroke="#666" />
          <YAxis
            dataKey="name"
            type="category"
            width={145}
            stroke="#666"
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => (
              <span className="font-semibold">{value.toFixed(1)}</span>
            )}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "4px",
            }}
          />
          <Bar dataKey="value" fill={color} radius={[0, 8, 8, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
