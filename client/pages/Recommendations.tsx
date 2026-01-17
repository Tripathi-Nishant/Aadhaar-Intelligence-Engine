import React, { useState } from "react";
import { DashboardLayout } from "@/components/Layout";
import { GradientCard, SectionHeader } from "@/components/AadhaarUI";
import { Button } from "@/components/ui/button";

const recommendationsData = [
  {
    id: 1,
    state: "Bihar",
    priority: "Critical",
    category: "Enrolment Quality",
    action: "Establish mobile enrolment camps",
    impact: "15% improvement expected",
    cost: "₹45 Lakhs",
    timeline: "Q1 2025",
  },
  {
    id: 2,
    state: "Jharkhand",
    priority: "Critical",
    category: "Update Rate",
    action: "Deploy biometric update centers",
    impact: "25% increase in updates",
    cost: "₹62 Lakhs",
    timeline: "Q1 2025",
  },
  {
    id: 3,
    state: "Assam",
    priority: "Critical",
    category: "Infrastructure",
    action: "Upgrade authentication infrastructure",
    impact: "35% reduction in friction",
    cost: "₹78 Lakhs",
    timeline: "Q2 2025",
  },
  {
    id: 4,
    state: "Manipur",
    priority: "High",
    category: "Training",
    action: "Conduct operator training programs",
    impact: "20% improvement in data quality",
    cost: "₹28 Lakhs",
    timeline: "Q1 2025",
  },
  {
    id: 5,
    state: "Meghalaya",
    priority: "High",
    category: "Enrolment",
    action: "Incentivize child enrolment",
    impact: "12% increase in CER",
    cost: "₹35 Lakhs",
    timeline: "Q1 2025",
  },
  {
    id: 6,
    state: "Mizoram",
    priority: "High",
    category: "Technology",
    action: "Implement advanced analytics",
    impact: "Real-time anomaly detection",
    cost: "₹42 Lakhs",
    timeline: "Q2 2025",
  },
];

const Recommendations: React.FC = () => {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    "Critical",
    "High",
    "Medium",
  ]);

  const togglePriority = (priority: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };

  const criticalCount = recommendationsData.filter(
    (r) => r.priority === "Critical"
  ).length;
  const highCount = recommendationsData.filter(
    (r) => r.priority === "High"
  ).length;
  const totalInvestment = 390; // Lakhs

  const filteredData = recommendationsData.filter((r) =>
    selectedPriorities.includes(r.priority)
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border border-red-300";
      case "High":
        return "bg-orange-100 text-orange-800 border border-orange-300";
      default:
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
    }
  };

  return (
    <DashboardLayout>
      {/* Priority Summary Cards */}
      <section className="mb-12">
        <SectionHeader
          title="Recommendations Summary"
          subtitle="Strategic interventions for system improvement"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GradientCard
            icon="🚨"
            label="Critical Priority"
            value={criticalCount}
            gradient="red"
          />
          <GradientCard
            icon="⚡"
            label="High Priority"
            value={highCount}
            gradient="orange"
          />
          <GradientCard
            icon="💰"
            label="Total Investment"
            value={`₹${totalInvestment}L`}
            gradient="blue"
          />
        </div>
      </section>

      {/* Filter Section */}
      <section className="mb-8">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <p className="text-sm font-semibold text-gray-700 mb-4">
            Filter by Priority:
          </p>
          <div className="flex flex-wrap gap-3">
            {["Critical", "High", "Medium"].map((priority) => (
              <button
                key={priority}
                onClick={() => togglePriority(priority)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedPriorities.includes(priority)
                    ? "bg-aadhaar-orange text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations Table */}
      <section className="mb-8">
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-aadhaar-blue to-blue-800 text-white">
                <th className="px-4 py-3 text-left font-bold">State</th>
                <th className="px-4 py-3 text-left font-bold">Priority</th>
                <th className="px-4 py-3 text-left font-bold">Category</th>
                <th className="px-4 py-3 text-left font-bold">Action</th>
                <th className="px-4 py-3 text-left font-bold">Expected Impact</th>
                <th className="px-4 py-3 text-left font-bold">Cost</th>
                <th className="px-4 py-3 text-left font-bold">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((rec, index) => (
                <tr
                  key={rec.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b border-gray-200 hover:bg-aadhaar-light-orange transition-colors duration-200`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {rec.state}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(
                        rec.priority
                      )}`}
                    >
                      {rec.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {rec.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {rec.action}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {rec.impact}
                  </td>
                  <td className="px-4 py-3 font-semibold text-aadhaar-orange">
                    {rec.cost}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {rec.timeline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Download Button */}
      <section className="flex justify-center">
        <Button
          className="bg-gradient-to-r from-aadhaar-orange to-yellow-500 hover:from-aadhaar-blue hover:to-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          📥 Download Recommendations
        </Button>
      </section>
    </DashboardLayout>
  );
};

export default Recommendations;
