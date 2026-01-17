import React from "react";
import { DashboardLayout } from "@/components/Layout";
import {
  MetricCard,
  SectionHeader,
  InfoBox,
} from "@/components/AadhaarUI";
import { getAggregateStats, getTopPerformers, getBottomPerformers } from "@/lib/aadhaarData";
import { PerformanceBarChart } from "@/components/Charts";

const Dashboard: React.FC = () => {
  const stats = getAggregateStats();
  const topPerformers = getTopPerformers(5);
  const bottomPerformers = getBottomPerformers(5);

  return (
    <DashboardLayout>
      {/* Key Metrics Row */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-aadhaar-blue mb-4 md:mb-6">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            icon="🏛️"
            label="States Analyzed"
            value={stats.totalStates}
            subtext="✓ Complete Coverage"
            valueColor="blue"
          />
          <MetricCard
            icon="💯"
            label="Avg Health Score"
            value={stats.avgHealthScore.toFixed(1)}
            subtext="National Average"
            valueColor={stats.avgHealthScore > 70 ? "green" : stats.avgHealthScore > 50 ? "orange" : "red"}
          />
          <MetricCard
            icon="⚠️"
            label="Critical States"
            value={stats.criticalStates}
            subtext="Need Urgent Action"
            valueColor="red"
          />
          <MetricCard
            icon="🔍"
            label="Anomalies"
            value={stats.anomalies}
            subtext="Detected Issues"
            valueColor="orange"
          />
        </div>
      </section>

      {/* National Health Map Section */}
      <section className="mb-8 md:mb-12">
        <SectionHeader
          title="National Health Map"
          subtitle="Interactive visualization of state-wise health scores"
        />
        <ChartPlaceholder
          title="India State-wise Health Scores"
          description="Interactive map showing state-wise health scores (color-coded: green = healthy, orange = warning, red = critical)"
          height="350px"
        />
      </section>

      {/* Top and Bottom Performers */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-aadhaar-blue mb-4 md:mb-6">
          Performance Analysis
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top 5 Performers */}
          <div>
            <div className="bg-gradient-to-r from-aadhaar-green to-emerald-600 rounded-lg p-4 mb-4 border-l-4 border-aadhaar-saffron">
              <h3 className="text-white font-bold text-lg">Top 5 Performers</h3>
            </div>
            <ChartPlaceholder
              title="Horizontal Bar Chart"
              description="State names on Y-axis, Health Scores on X-axis"
              height="300px"
            />
          </div>

          {/* Bottom 5 States */}
          <div>
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-4 mb-4 border-l-4 border-aadhaar-saffron">
              <h3 className="text-white font-bold text-lg">Bottom 5 States</h3>
            </div>
            <ChartPlaceholder
              title="Horizontal Bar Chart"
              description="States requiring immediate intervention"
              height="300px"
            />
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section>
        <InfoBox type="info" title="🎯 Key Insights">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>
                <strong>Uttar Pradesh leads</strong> with Health Score of 85.2
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>
                <strong>8 states require immediate intervention</strong> with
                scores below 45
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>
                <strong>National average EQI: 0.712</strong> indicating good
                enrolment quality
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>
                <strong>45 anomalies detected</strong> across 12 states requiring
                investigation
              </span>
            </li>
          </ul>
        </InfoBox>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
