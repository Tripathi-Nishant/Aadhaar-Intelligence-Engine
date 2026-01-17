import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { StateData } from "@/lib/aadhaarData";

interface EQIScatterPlotProps {
  data: StateData[];
}

export const EQIScatterPlot: React.FC<EQIScatterPlotProps> = ({ data }) => {
  // Transform data for scatter plot
  const chartData = data.map((item) => ({
    x: item.eqi,
    y: item.frictionIndex,
    z: item.totalEnrolments / 100000, // Bubble size
    state: item.state,
    healthScore: item.healthScore,
  }));

  const getColor = (healthScore: number) => {
    if (healthScore > 70) return "#138808"; // Green
    if (healthScore > 50) return "#FF9933"; // Orange
    return "#DC2626"; // Red
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          type="number"
          dataKey="x"
          name="Enrolment Quality Index (EQI)"
          domain={[0, 1]}
          label={{ value: "EQI", position: "insideBottomRight", offset: -10 }}
          stroke="#666"
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Friction Index"
          domain={[0, 1]}
          label={{ value: "Friction Index", angle: -90, position: "insideLeft" }}
          stroke="#666"
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                  <p className="font-semibold text-aadhaar-blue">{data.state}</p>
                  <p className="text-sm text-gray-700">
                    EQI: {data.x.toFixed(3)}
                  </p>
                  <p className="text-sm text-gray-700">
                    Friction: {data.y.toFixed(3)}
                  </p>
                  <p className="text-sm text-gray-700">
                    Enrolments: {(data.z * 100000).toLocaleString()}
                  </p>
                  <p className="text-sm font-semibold text-aadhaar-orange">
                    Health: {data.healthScore.toFixed(1)}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Scatter
          name="States"
          data={chartData}
          fill="#FF6B35"
          shape="circle"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.healthScore)} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};
