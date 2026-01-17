import React from "react";
import { DashboardLayout } from "@/components/Layout";
import { SectionHeader, ChartPlaceholder } from "@/components/AadhaarUI";

const stateData = [
  { rank: 1, state: "Uttar Pradesh", health: 85.2, eqi: 0.85, friction: 0.12, enrolments: 4800000 },
  { rank: 2, state: "Maharashtra", health: 82.5, eqi: 0.83, friction: 0.14, enrolments: 3900000 },
  { rank: 3, state: "Tamil Nadu", health: 79.8, eqi: 0.80, friction: 0.18, enrolments: 3200000 },
  { rank: 4, state: "Karnataka", health: 78.3, eqi: 0.78, friction: 0.21, enrolments: 2900000 },
  { rank: 5, state: "Andhra Pradesh", health: 75.6, eqi: 0.76, friction: 0.24, enrolments: 2700000 },
  { rank: 6, state: "Rajasthan", health: 72.1, eqi: 0.72, friction: 0.28, enrolments: 2400000 },
  { rank: 7, state: "Gujarat", health: 70.5, eqi: 0.71, friction: 0.30, enrolments: 2200000 },
  { rank: 8, state: "West Bengal", health: 68.9, eqi: 0.69, friction: 0.32, enrolments: 2000000 },
  { rank: 9, state: "Madhya Pradesh", health: 65.3, eqi: 0.65, friction: 0.35, enrolments: 1800000 },
  { rank: 10, state: "Bihar", health: 58.7, eqi: 0.59, friction: 0.42, enrolments: 1500000 },
  { rank: 11, state: "Odisha", health: 62.1, eqi: 0.62, friction: 0.38, enrolments: 1600000 },
  { rank: 12, state: "Jharkhand", health: 55.2, eqi: 0.55, friction: 0.45, enrolments: 1200000 },
  { rank: 13, state: "Assam", health: 52.8, eqi: 0.53, friction: 0.48, enrolments: 1100000 },
  { rank: 14, state: "Uttarakhand", health: 50.1, eqi: 0.50, friction: 0.50, enrolments: 950000 },
  { rank: 15, state: "Chhattisgarh", health: 48.5, eqi: 0.48, friction: 0.52, enrolments: 850000 },
  { rank: 16, state: "Manipur", health: 45.2, eqi: 0.45, friction: 0.55, enrolments: 450000 },
  { rank: 17, state: "Meghalaya", health: 42.8, eqi: 0.43, friction: 0.58, enrolments: 380000 },
  { rank: 18, state: "Mizoram", health: 40.5, eqi: 0.40, friction: 0.60, enrolments: 320000 },
  { rank: 19, state: "Nagaland", health: 38.1, eqi: 0.38, friction: 0.62, enrolments: 280000 },
  { rank: 20, state: "Tripura", health: 35.3, eqi: 0.35, friction: 0.65, enrolments: 250000 },
];

const DeepAnalytics: React.FC = () => {
  return (
    <DashboardLayout>
      {/* Advanced Metric Analysis */}
      <section className="mb-12">
        <SectionHeader
          title="Advanced Metric Analysis"
          subtitle="Enrolment Quality Index vs Friction Index"
        />
        <ChartPlaceholder
          title="EQI vs Friction Index Scatter Plot"
          description="Bubble size = Total Enrolments, Color = Health Score (Green = Healthy, Orange = Warning, Red = Critical)"
          height="500px"
        />
      </section>

      {/* Time-Series Trends */}
      <section className="mb-12">
        <SectionHeader
          title="Time-Series Trends"
          subtitle="Historical data analysis and pattern recognition"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="bg-aadhaar-blue rounded-lg p-4 mb-4">
              <h3 className="text-white font-bold">Total Enrolments Over Time</h3>
            </div>
            <ChartPlaceholder
              title="Line Chart"
              description="X-axis: Months (2022-2024), Y-axis: Total Enrolments"
              height="350px"
            />
          </div>
          <div>
            <div className="bg-aadhaar-blue rounded-lg p-4 mb-4">
              <h3 className="text-white font-bold">Update Trends</h3>
            </div>
            <ChartPlaceholder
              title="Dual Line Chart"
              description="Orange: Bio Updates, Green: Demo Updates (X-axis: Timeline)"
              height="350px"
            />
          </div>
        </div>
      </section>

      {/* Complete State Rankings Table */}
      <section>
        <SectionHeader
          title="Complete State Rankings"
          subtitle="Comprehensive performance metrics for all states"
        />
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-aadhaar-blue to-blue-800 text-white">
                <th className="px-4 py-3 text-left font-bold">Rank</th>
                <th className="px-4 py-3 text-left font-bold">State</th>
                <th className="px-4 py-3 text-left font-bold">Health Score</th>
                <th className="px-4 py-3 text-left font-bold">EQI</th>
                <th className="px-4 py-3 text-left font-bold">Friction Index</th>
                <th className="px-4 py-3 text-left font-bold">Enrolments</th>
              </tr>
            </thead>
            <tbody>
              {stateData.map((item, index) => {
                const isTopThree = index < 3;
                const isBottomThree = index >= stateData.length - 3;
                const rowBg = isTopThree
                  ? "bg-green-50"
                  : isBottomThree
                  ? "bg-red-50"
                  : index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50";

                return (
                  <tr
                    key={item.rank}
                    className={`${rowBg} border-b border-gray-200 hover:bg-aadhaar-light-orange transition-colors duration-200`}
                  >
                    <td className="px-4 py-3 font-semibold text-aadhaar-blue">
                      {item.rank}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {item.state}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-bold ${
                          item.health > 70
                            ? "text-aadhaar-green"
                            : item.health > 50
                            ? "text-aadhaar-orange"
                            : "text-red-600"
                        }`}
                      >
                        {item.health.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">{item.eqi.toFixed(2)}</td>
                    <td className="px-4 py-3">{item.friction.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      {(item.enrolments / 1000000).toFixed(2)}M
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DeepAnalytics;
