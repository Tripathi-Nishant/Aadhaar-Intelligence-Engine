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
                <strong>{topPerformers[0]?.state} leads</strong> with Health Score of{" "}
                {topPerformers[0]?.healthScore.toFixed(1)}
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>
                <strong>{stats.criticalStates} states require immediate intervention</strong> with
                scores below 45
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>
                <strong>National average Health Score: {stats.avgHealthScore.toFixed(1)}</strong>{" "}
                indicating {stats.avgHealthScore > 70 ? "good" : "moderate"} system health
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>
                <strong>{stats.anomalies} anomalies detected</strong> across multiple states requiring
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
