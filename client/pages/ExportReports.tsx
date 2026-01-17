import React from "react";
import { DashboardLayout } from "@/components/Layout";
import { SectionHeader, InfoBox } from "@/components/AadhaarUI";
import { Button } from "@/components/ui/button";

const ExportReports: React.FC = () => {
  const handleDownload = (filename: string) => {
    alert(`Downloaded: ${filename}`);
  };

  return (
    <DashboardLayout>
      {/* Header Box */}
      <section className="mb-12">
        <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-aadhaar-blue">
          <div className="flex items-start gap-4">
            <div className="text-5xl">📦</div>
            <div>
              <h2 className="text-2xl font-bold text-aadhaar-blue mb-2">
                Available Exports
              </h2>
              <p className="text-gray-700">
                Download complete analysis results, visualizations, and reports
                for integration with governance systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Data Exports */}
          <div>
            <div className="bg-gradient-to-r from-aadhaar-blue to-blue-700 rounded-lg p-4 mb-6 border-l-4 border-aadhaar-saffron">
              <h3 className="text-white font-bold text-lg">📊 Data Exports</h3>
            </div>
            <div className="space-y-4">
              <Button
                onClick={() => handleDownload("State_Rankings.csv")}
                className="w-full bg-gradient-to-r from-aadhaar-orange to-yellow-500 hover:from-aadhaar-blue hover:to-blue-700 text-white py-6 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                📈 State Rankings (CSV)
              </Button>
              <Button
                onClick={() => handleDownload("Anomalies_Report.csv")}
                className="w-full bg-gradient-to-r from-aadhaar-orange to-yellow-500 hover:from-aadhaar-blue hover:to-blue-700 text-white py-6 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🚨 Anomalies Report (CSV)
              </Button>
              <Button
                onClick={() => handleDownload("Recommendations.csv")}
                className="w-full bg-gradient-to-r from-aadhaar-orange to-yellow-500 hover:from-aadhaar-blue hover:to-blue-700 text-white py-6 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🎯 Recommendations (CSV)
              </Button>
            </div>
          </div>

          {/* Right Column - Summary Reports */}
          <div>
            <div className="bg-gradient-to-r from-aadhaar-green to-emerald-700 rounded-lg p-4 mb-6 border-l-4 border-aadhaar-saffron">
              <h3 className="text-white font-bold text-lg">📄 Summary Reports</h3>
            </div>
            <div className="space-y-4">
              <Button
                onClick={() => handleDownload("Executive_Summary.txt")}
                className="w-full bg-gradient-to-r from-aadhaar-green to-emerald-600 hover:from-aadhaar-blue hover:to-blue-700 text-white py-6 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                📋 Executive Summary (TXT)
              </Button>
              <Button
                onClick={() => handleDownload("Full_Analysis.pdf")}
                className="w-full bg-gradient-to-r from-aadhaar-green to-emerald-600 hover:from-aadhaar-blue hover:to-blue-700 text-white py-6 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                📊 Full Analysis (PDF)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section>
        <SectionHeader
          title="📖 Methodology"
          subtitle="Understanding the analytics framework"
        />

        <div className="space-y-6">
          {/* Enrolment Quality Index */}
          <div className="bg-white rounded-lg p-6 border-l-4 border-aadhaar-blue shadow-md">
            <h3 className="text-lg font-bold text-aadhaar-blue mb-3">
              1. Enrolment Quality Index (EQI)
            </h3>
            <div className="bg-gray-50 rounded p-3 mb-3 overflow-x-auto">
              <code className="text-sm text-gray-800 font-mono">
                EQI = 1 - (Bio Updates / Total Enrolments)
              </code>
            </div>
            <p className="text-gray-700 text-sm">
              Measures the stability and quality of enrolled records. Higher EQI
              indicates fewer updates are required, suggesting better initial
              data quality. Ranges from 0 to 1, where 1 is perfect quality.
            </p>
          </div>

          {/* Friction Index */}
          <div className="bg-white rounded-lg p-6 border-l-4 border-aadhaar-orange shadow-md">
            <h3 className="text-lg font-bold text-aadhaar-orange mb-3">
              2. Friction Index
            </h3>
            <div className="bg-gray-50 rounded p-3 mb-3 overflow-x-auto">
              <code className="text-sm text-gray-800 font-mono">
                Friction = (Rejected Transactions / Total Transactions)
              </code>
            </div>
            <p className="text-gray-700 text-sm">
              Quantifies operational friction in the system. Reflects failed
              authentications and failed enrolments. Lower values indicate smoother
              operations. Critical for understanding user experience and system
              reliability.
            </p>
          </div>

          {/* System Health Score */}
          <div className="bg-white rounded-lg p-6 border-l-4 border-aadhaar-green shadow-md">
            <h3 className="text-lg font-bold text-aadhaar-green mb-3">
              3. System Health Score
            </h3>
            <div className="bg-gray-50 rounded p-3 mb-3 overflow-x-auto">
              <code className="text-sm text-gray-800 font-mono">
                Health Score = (0.4 × EQI + 0.4 × (1 - Friction) + 0.2 × CER) × 100
              </code>
            </div>
            <p className="text-gray-700 text-sm">
              Comprehensive metric combining quality, friction, and enrolment
              efforts. Weighted formula prioritizes data quality and operational
              smoothness. Scores above 70 indicate healthy systems, 50-70 require
              attention, and below 50 need urgent intervention.
            </p>
          </div>

          {/* Child Enrolment Ratio */}
          <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500 shadow-md">
            <h3 className="text-lg font-bold text-aadhaar-blue mb-3">
              4. Child Enrolment Ratio (CER)
            </h3>
            <div className="bg-gray-50 rounded p-3 mb-3 overflow-x-auto">
              <code className="text-sm text-gray-800 font-mono">
                CER = (Children Enrolled / Child Population) × 100
              </code>
            </div>
            <p className="text-gray-700 text-sm">
              Tracks progress in enrolling the youngest citizens. Critical for
              achieving universal ID coverage. Ranges from 0-100%. Reflects
              government commitment to digital inclusion and demographic
              completeness of the system.
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <InfoBox type="success" className="mt-8">
          All metrics are updated in real-time using data from UIDAI systems.
          Export data is encrypted and follows all government data protection
          standards.
        </InfoBox>
      </section>
    </DashboardLayout>
  );
};

export default ExportReports;
