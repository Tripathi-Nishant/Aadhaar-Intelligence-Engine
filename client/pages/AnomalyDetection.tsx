import React, { useState } from "react";
import { DashboardLayout } from "@/components/Layout";
import { SectionHeader, GradientCard, ChartPlaceholder } from "@/components/AadhaarUI";
import { Input } from "@/components/ui/input";

const anomaliesData = [
  {
    id: 1,
    state: "Bihar",
    year: 2024,
    month: "Jan",
    updateRate: 0.28,
    severity: "Critical",
    enrolments: 125000,
  },
  {
    id: 2,
    state: "Jharkhand",
    year: 2024,
    month: "Feb",
    updateRate: 0.32,
    severity: "Critical",
    enrolments: 98000,
  },
  {
    id: 3,
    state: "Assam",
    year: 2024,
    month: "Jan",
    updateRate: 0.25,
    severity: "Warning",
    enrolments: 87000,
  },
  {
    id: 4,
    state: "Manipur",
    year: 2023,
    month: "Nov",
    updateRate: 0.31,
    severity: "Critical",
    enrolments: 45000,
  },
  {
    id: 5,
    state: "Meghalaya",
    year: 2023,
    month: "Dec",
    updateRate: 0.26,
    severity: "Warning",
    enrolments: 38000,
  },
  {
    id: 6,
    state: "Mizoram",
    year: 2024,
    month: "Mar",
    updateRate: 0.29,
    severity: "Warning",
    enrolments: 32000,
  },
  {
    id: 7,
    state: "Nagaland",
    year: 2023,
    month: "Oct",
    updateRate: 0.27,
    severity: "Critical",
    enrolments: 28000,
  },
  {
    id: 8,
    state: "Tripura",
    year: 2024,
    month: "Feb",
    updateRate: 0.24,
    severity: "Warning",
    enrolments: 25000,
  },
];

const AnomalyDetection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  const criticalCount = anomaliesData.filter((a) => a.severity === "Critical")
    .length;
  const criticalSeverityCount = anomaliesData.filter(
    (a) => a.severity === "Critical"
  ).length;

  const filteredData = anomaliesData.filter((item) => {
    const matchesSearch =
      item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.severity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity =
      !severityFilter || item.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    return severity === "Critical"
      ? "bg-red-100 text-red-800 border border-red-300"
      : "bg-yellow-100 text-yellow-800 border border-yellow-300";
  };

  return (
    <DashboardLayout>
      {/* Anomaly Stats */}
      <section className="mb-12">
        <SectionHeader
          title="Anomaly Detection System"
          subtitle="Automated detection and severity assessment"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GradientCard
            icon="🔍"
            label="Anomalies Detected"
            value={anomaliesData.length}
            gradient="orange"
          />
          <GradientCard
            icon="🚨"
            label="Critical Severity"
            value={criticalSeverityCount}
            gradient="red"
          />
        </div>
        <p className="text-center text-gray-600 mt-4">
          Across <span className="font-bold text-aadhaar-blue">12 states</span>{" "}
          requiring immediate attention
        </p>
      </section>

      {/* Anomaly Timeline */}
      <section className="mb-12">
        <SectionHeader
          title="Anomaly Timeline"
          subtitle="Temporal distribution of detected anomalies"
        />
        <ChartPlaceholder
          title="Scatter Plot: Time vs Update Rate"
          description="X-axis: Time (months), Y-axis: Update Rate, Points colored by severity (red = critical, orange = warning), Size = enrolment volume"
          height="450px"
        />
      </section>

      {/* Search and Filter */}
      <section className="mb-8">
        <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search by State or Severity
            </label>
            <Input
              type="text"
              placeholder="Search anomalies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Severity
            </label>
            <div className="flex gap-3">
              {["All", "Critical", "Warning"].map((severity) => (
                <button
                  key={severity}
                  onClick={() =>
                    setSeverityFilter(severity === "All" ? null : severity)
                  }
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    (severity === "All" && severityFilter === null) ||
                    severityFilter === severity
                      ? "bg-aadhaar-orange text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {severity}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Anomaly Table */}
      <section>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-aadhaar-blue to-blue-800 text-white">
                <th className="px-4 py-3 text-left font-bold">State</th>
                <th className="px-4 py-3 text-left font-bold">Year</th>
                <th className="px-4 py-3 text-left font-bold">Month</th>
                <th className="px-4 py-3 text-left font-bold">Update Rate</th>
                <th className="px-4 py-3 text-left font-bold">Severity</th>
                <th className="px-4 py-3 text-left font-bold">Enrolments</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b border-gray-200 hover:bg-aadhaar-light-orange transition-colors duration-200`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {item.state}
                  </td>
                  <td className="px-4 py-3">{item.year}</td>
                  <td className="px-4 py-3">{item.month}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-red-600">
                      {(item.updateRate * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(
                        item.severity
                      )}`}
                    >
                      {item.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {(item.enrolments / 1000).toFixed(0)}K
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No anomalies found matching your filters
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default AnomalyDetection;
