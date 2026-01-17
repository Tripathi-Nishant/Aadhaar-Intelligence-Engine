import React, { useState } from "react";
import { DashboardLayout } from "@/components/Layout";
import { SectionHeader } from "@/components/AadhaarUI";
import {
  getStateMetrics,
  getStateTimeSeries,
} from "@/lib/aadhaarData";
import { EQIScatterPlot, TimeSeriesChart } from "@/components/Charts";

const DeepAnalytics: React.FC = () => {
  const stateData = getStateMetrics();
  const [selectedState, setSelectedState] = useState(stateData[0]?.state || "");

  const timeSeriesData = getStateTimeSeries(selectedState);

  return (
    <DashboardLayout>
      {/* Advanced Metric Analysis */}
      <section className="mb-12">
        <SectionHeader
          title="Advanced Metric Analysis"
          subtitle="Enrolment Quality Index vs Friction Index"
        />
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <EQIScatterPlot data={stateData} />
          <p className="text-center text-sm text-gray-600 mt-4">
            Bubble size = Total Enrolments | Color: Green = Healthy (60+), Orange = Warning (40-60), Red = Critical (&lt;40)
          </p>
        </div>
      </section>

      {/* Time-Series Trends */}
      <section className="mb-12">
        <SectionHeader
          title="Time-Series Trends"
          subtitle="Historical data analysis and pattern recognition"
        />
        
        {/* State Selector */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
          <label className="block text-sm font-semibold text-aadhaar-blue mb-2">
            Select State for Time Series Analysis:
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-aadhaar-orange"
          >
            {stateData.map((state) => (
              <option key={state.state} value={state.state}>
                {state.state} (Health: {state.healthScore.toFixed(1)})
              </option>
            ))}
          </select>
        </div>

        {/* Time Series Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <TimeSeriesChart
              data={timeSeriesData}
              title="Total Enrolments Over Time"
              dataKeys={[
                {
                  key: "totalEnrolments",
                  name: "Enrolments",
                  stroke: "#FF6B35",
                },
              ]}
            />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <TimeSeriesChart
              data={timeSeriesData}
              title="Update Trends"
              dataKeys={[
                {
                  key: "bioUpdates",
                  name: "Biometric Updates",
                  stroke: "#FF9933",
                },
                {
                  key: "demoUpdates",
                  name: "Demo Updates",
                  stroke: "#138808",
                },
              ]}
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
                    key={item.state}
                    className={`${rowBg} border-b border-gray-200 hover:bg-aadhaar-light-orange transition-colors duration-200 cursor-pointer`}
                    onClick={() => setSelectedState(item.state)}
                  >
                    <td className="px-4 py-3 font-semibold text-aadhaar-blue">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {item.state}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-bold ${
                          item.healthScore > 70
                            ? "text-aadhaar-green"
                            : item.healthScore > 50
                            ? "text-aadhaar-orange"
                            : "text-red-600"
                        }`}
                      >
                        {item.healthScore.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">{item.eqi.toFixed(3)}</td>
                    <td className="px-4 py-3">{item.frictionIndex.toFixed(3)}</td>
                    <td className="px-4 py-3 text-right">
                      {(item.totalEnrolments / 1000000).toFixed(2)}M
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
