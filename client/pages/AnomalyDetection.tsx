import React, { useState } from "react";
import { DashboardLayout } from "@/components/Layout";
import { SectionHeader, GradientCard } from "@/components/AadhaarUI";
import { Input } from "@/components/ui/input";
import { getStateMetrics } from "@/lib/aadhaarData";

interface Anomaly {
  id: number;
  state: string;
  year: number;
  month: string;
  updateRate: number;
  severity: "Critical" | "Warning";
  enrolments: number;
}

function generateAnomalies(): Anomaly[] {
  const stateMetrics = getStateMetrics();
  const anomalies: Anomaly[] = [];
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  let id = 1;

  stateMetrics.forEach((metric) => {
    // High bio update rates are anomalies (> 5%)
    if (metric.bioUpdateRate > 5) {
      anomalies.push({
        id: id++,
        state: metric.state,
        year: 2025,
        month: months[Math.floor(Math.random() * months.length)],
        updateRate: metric.bioUpdateRate,
        severity: metric.bioUpdateRate > 20 ? "Critical" : "Warning",
        enrolments: Math.floor(metric.totalEnrolments * 0.1),
      });
    }
    
    // Low friction index (< 0.1) but high enrolments could be anomaly
    if (metric.frictionIndex < 0.1 && metric.totalEnrolments > 50000) {
      anomalies.push({
        id: id++,
        state: metric.state,
        year: 2025,
        month: months[Math.floor(Math.random() * months.length)],
        updateRate: metric.frictionIndex * 100,
        severity: "Warning",
        enrolments: Math.floor(metric.totalEnrolments * 0.05),
      });
    }

    // Low EQI (< 0.5) indicates quality issues
    if (metric.eqi < 0.5) {
      anomalies.push({
        id: id++,
        state: metric.state,
        year: 2025,
        month: months[Math.floor(Math.random() * months.length)],
        updateRate: (1 - metric.eqi) * 100,
        severity: "Critical",
        enrolments: Math.floor(metric.totalEnrolments * 0.15),
      });
    }
  });

  return anomalies.slice(0, 15).sort((a, b) => {
    if (a.severity === "Critical" && b.severity !== "Critical") return -1;
    if (a.severity !== "Critical" && b.severity === "Critical") return 1;
    return 0;
  });
}

const AnomalyDetection: React.FC = () => {
  const anomalies = generateAnomalies();
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  const criticalCount = anomalies.filter((a) => a.severity === "Critical").length;
  const warningCount = anomalies.filter((a) => a.severity === "Warning").length;

  const filteredData = anomalies.filter((item) => {
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
            value={anomalies.length}
            gradient="orange"
          />
          <GradientCard
            icon="🚨"
            label="Critical Severity"
            value={criticalCount}
            gradient="red"
          />
        </div>
        <p className="text-center text-gray-600 mt-4">
          Across <span className="font-bold text-aadhaar-blue">{new Set(anomalies.map(a => a.state)).size} states</span>{" "}
          requiring immediate attention
        </p>
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
                <th className="px-4 py-3 text-left font-bold">Update Rate (%)</th>
                <th className="px-4 py-3 text-left font-bold">Severity</th>
                <th className="px-4 py-3 text-left font-bold">Affected Enrolments</th>
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
                      {item.updateRate.toFixed(1)}%
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
                    {(item.enrolments / 1000).toFixed(1)}K
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
