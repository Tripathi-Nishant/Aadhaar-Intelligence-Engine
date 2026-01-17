import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TimeSeriesData } from "@/lib/aadhaarData";

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  title: string;
  dataKeys: Array<{
    key: string;
    name: string;
    stroke: string;
  }>;
}

export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  title,
  dataKeys,
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
        <p className="text-gray-600">No data available for this state</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-aadhaar-blue rounded-lg p-3 mb-4 border-l-4 border-aadhaar-saffron">
        <h3 className="text-white font-bold">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="month"
            stroke="#666"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "4px",
            }}
            formatter={(value: any) => {
              if (typeof value === "number") {
                return value.toLocaleString();
              }
              return value;
            }}
          />
          <Legend />
          {dataKeys.map((item) => (
            <Line
              key={item.key}
              type="monotone"
              dataKey={item.key}
              stroke={item.stroke}
              name={item.name}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
