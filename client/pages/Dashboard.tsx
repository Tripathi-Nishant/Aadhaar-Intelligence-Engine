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

      {/* Top and Bottom Performers */}
      <section className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-aadhaar-blue mb-4 md:mb-6">
          Performance Analysis
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top 5 Performers */}
          <div>
            <PerformanceBarChart
              data={topPerformers}
              title="Top 5 Performers"
              color="#138808"
            />
          </div>

          {/* Bottom 5 States */}
          <div>
            <PerformanceBarChart
              data={bottomPerformers}
              title="Bottom 5 States (Requiring Intervention)"
              color="#DC2626"
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
