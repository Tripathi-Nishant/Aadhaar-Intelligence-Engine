// Raw data from CSV
const rawData = [
  { state: "Andaman and Nicobar Islands", Year: 2025.0, Month: 9.0, Enrol_0_5: 39, Enrol_5_17: 4, Enrol_18_plus: 0, Demo_Updates: 64.0, Bio_Updates: 289.0, Total_Enrolment: 43, Biometric_Update_Rate: 6.72093023255814 },
  { state: "Andaman and Nicobar Islands", Year: 2025.0, Month: 10.0, Enrol_0_5: 22, Enrol_5_17: 0, Enrol_18_plus: 0, Demo_Updates: 0.0, Bio_Updates: 0.0, Total_Enrolment: 22, Biometric_Update_Rate: 0.0 },
  { state: "Andhra Pradesh", Year: 2025.0, Month: 3.0, Enrol_0_5: 43, Enrol_5_17: 44, Enrol_18_plus: 29, Demo_Updates: 175264.0, Bio_Updates: 403296.0, Total_Enrolment: 116, Biometric_Update_Rate: 3476.689655172414 },
  { state: "Andhra Pradesh", Year: 2025.0, Month: 6.0, Enrol_0_5: 928, Enrol_5_17: 433, Enrol_18_plus: 213, Demo_Updates: 46035.0, Bio_Updates: 508472.0, Total_Enrolment: 1574, Biometric_Update_Rate: 323.04447268106736 },
  { state: "Andhra Pradesh", Year: 2025.0, Month: 7.0, Enrol_0_5: 473, Enrol_5_17: 372, Enrol_18_plus: 111, Demo_Updates: 28339.0, Bio_Updates: 334226.0, Total_Enrolment: 956, Biometric_Update_Rate: 349.60878661087867 },
  { state: "Andhra Pradesh", Year: 2025.0, Month: 9.0, Enrol_0_5: 34939, Enrol_5_17: 5037, Enrol_18_plus: 379, Demo_Updates: 62702.0, Bio_Updates: 141420.0, Total_Enrolment: 40355, Biometric_Update_Rate: 3.5043984636352374 },
  { state: "Assam", Year: 2025.0, Month: 3.0, Enrol_0_5: 587, Enrol_5_17: 1105, Enrol_18_plus: 800, Demo_Updates: 72993.0, Bio_Updates: 92931.0, Total_Enrolment: 2492, Biometric_Update_Rate: 37.29173354735153 },
  { state: "Bihar", Year: 2025.0, Month: 3.0, Enrol_0_5: 516, Enrol_5_17: 1392, Enrol_18_plus: 444, Demo_Updates: 409929.0, Bio_Updates: 763509.0, Total_Enrolment: 2352, Biometric_Update_Rate: 324.62117346938777 },
  { state: "Delhi", Year: 2025.0, Month: 3.0, Enrol_0_5: 181, Enrol_5_17: 102, Enrol_18_plus: 85, Demo_Updates: 133052.0, Bio_Updates: 164368.0, Total_Enrolment: 368, Biometric_Update_Rate: 446.6521739130435 },
  { state: "Gujarat", Year: 2025.0, Month: 3.0, Enrol_0_5: 686, Enrol_5_17: 354, Enrol_18_plus: 282, Demo_Updates: 175199.0, Bio_Updates: 396391.0, Total_Enrolment: 1322, Biometric_Update_Rate: 299.8419062027231 },
  { state: "Karnataka", Year: 2025.0, Month: 3.0, Enrol_0_5: 309, Enrol_5_17: 192, Enrol_18_plus: 231, Demo_Updates: 142442.0, Bio_Updates: 312129.0, Total_Enrolment: 732, Biometric_Update_Rate: 426.405737704918 },
  { state: "Maharashtra", Year: 2025.0, Month: 3.0, Enrol_0_5: 232, Enrol_5_17: 130, Enrol_18_plus: 98, Demo_Updates: 262395.0, Bio_Updates: 959149.0, Total_Enrolment: 460, Biometric_Update_Rate: 2085.1065217391306 },
  { state: "Tamil Nadu", Year: 2025.0, Month: 3.0, Enrol_0_5: 12, Enrol_5_17: 12, Enrol_18_plus: 10, Demo_Updates: 175423.0, Bio_Updates: 680675.0, Total_Enrolment: 34, Biometric_Update_Rate: 20019.852941176472 },
  { state: "Uttar Pradesh", Year: 2025.0, Month: 3.0, Enrol_0_5: 1393, Enrol_5_17: 3326, Enrol_18_plus: 674, Demo_Updates: 735972.0, Bio_Updates: 1131504.0, Total_Enrolment: 5393, Biometric_Update_Rate: 209.80975338401632 },
  { state: "West Bengal", Year: 2025.0, Month: 3.0, Enrol_0_5: 45, Enrol_5_17: 30, Enrol_18_plus: 46, Demo_Updates: 205205.0, Bio_Updates: 268875.0, Total_Enrolment: 121, Biometric_Update_Rate: 2222.1074380165287 },
];

export interface StateData {
  state: string;
  totalEnrolments: number;
  healthScore: number;
  eqi: number;
  frictionIndex: number;
  bioUpdateRate: number;
  demoUpdateRate: number;
  childEnrolmentRatio: number;
}

export interface TimeSeriesData {
  month: string;
  totalEnrolments: number;
  bioUpdates: number;
  demoUpdates: number;
}

export interface StateTimeSeriesData {
  state: string;
  data: TimeSeriesData[];
}

// Calculate Health Score based on metrics
function calculateHealthScore(
  eqi: number,
  frictionIndex: number,
  cerRatio: number
): number {
  // Health Score = (0.4 × EQI + 0.4 × (1 - Friction) + 0.2 × CER) × 100
  const score = (0.4 * eqi + 0.4 * (1 - frictionIndex) + 0.2 * cerRatio) * 100;
  return Math.max(0, Math.min(100, score));
}

// Calculate EQI (Enrolment Quality Index)
function calculateEQI(bioUpdates: number, totalEnrolments: number): number {
  if (totalEnrolments === 0) return 1;
  return 1 - bioUpdates / totalEnrolments;
}

// Calculate Friction Index
function calculateFrictionIndex(bioUpdateRate: number): number {
  // Normalized friction based on update rate
  return Math.max(0, Math.min(1, bioUpdateRate / 1000));
}

// Calculate CER (Child Enrolment Ratio)
function calculateCER(childEnrolments: number, totalEnrolments: number): number {
  if (totalEnrolments === 0) return 0;
  return Math.min(1, childEnrolments / totalEnrolments);
}

// Aggregate data by state
export function getStateMetrics(): StateData[] {
  const stateMap = new Map<string, any>();

  rawData.forEach((record) => {
    const state = record.state.trim();
    
    if (!stateMap.has(state)) {
      stateMap.set(state, {
        state,
        totalEnrolments: 0,
        totalBioUpdates: 0,
        totalDemoUpdates: 0,
        childEnrolments: 0,
        records: [],
      });
    }

    const existing = stateMap.get(state);
    existing.totalEnrolments += record.Total_Enrolment || 0;
    existing.totalBioUpdates += record.Bio_Updates || 0;
    existing.totalDemoUpdates += record.Demo_Updates || 0;
    existing.childEnrolments += (record.Enrol_0_5 + record.Enrol_5_17) || 0;
    existing.records.push(record);
  });

  // Convert to StateData with calculated metrics
  const results: StateData[] = [];
  stateMap.forEach((aggregate) => {
    const eqi = calculateEQI(
      aggregate.totalBioUpdates,
      aggregate.totalEnrolments
    );
    const frictionIndex = calculateFrictionIndex(
      aggregate.totalBioUpdates / Math.max(1, aggregate.totalEnrolments)
    );
    const cerRatio = calculateCER(
      aggregate.childEnrolments,
      aggregate.totalEnrolments
    );
    const healthScore = calculateHealthScore(eqi, frictionIndex, cerRatio);

    results.push({
      state: aggregate.state,
      totalEnrolments: aggregate.totalEnrolments,
      healthScore,
      eqi: Math.max(0, Math.min(1, eqi)),
      frictionIndex: Math.max(0, Math.min(1, frictionIndex)),
      bioUpdateRate: aggregate.records[0]?.Biometric_Update_Rate || 0,
      demoUpdateRate: aggregate.totalDemoUpdates / Math.max(1, aggregate.totalEnrolments),
      childEnrolmentRatio: cerRatio,
    });
  });

  // Sort by health score descending
  return results.sort((a, b) => b.healthScore - a.healthScore);
}

// Get time series data for a specific state
export function getStateTimeSeries(stateName: string): TimeSeriesData[] {
  const stateRecords = rawData.filter((r) => r.state.trim() === stateName);
  
  const monthMap = new Map<number, TimeSeriesData>();
  
  stateRecords.forEach((record) => {
    const month = Math.round(record.Month);
    if (!monthMap.has(month)) {
      monthMap.set(month, {
        month: getMonthName(month),
        totalEnrolments: 0,
        bioUpdates: 0,
        demoUpdates: 0,
      });
    }
    
    const existing = monthMap.get(month)!;
    existing.totalEnrolments += record.Total_Enrolment || 0;
    existing.bioUpdates += record.Bio_Updates || 0;
    existing.demoUpdates += record.Demo_Updates || 0;
  });

  return Array.from(monthMap.values()).sort((a, b) => {
    const monthOrder: { [key: string]: number } = {
      January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
      July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
    };
    return (monthOrder[a.month] || 0) - (monthOrder[b.month] || 0);
  });
}

function getMonthName(month: number): string {
  const months = ["", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  return months[month] || `Month ${month}`;
}

// Get top and bottom performers
export function getTopPerformers(count: number = 5): StateData[] {
  return getStateMetrics().slice(0, count);
}

export function getBottomPerformers(count: number = 5): StateData[] {
  const metrics = getStateMetrics();
  return metrics.slice(Math.max(0, metrics.length - count)).reverse();
}

// Get aggregate statistics
export function getAggregateStats() {
  const metrics = getStateMetrics();
  const totalEnrolments = metrics.reduce((sum, s) => sum + s.totalEnrolments, 0);
  const avgHealthScore = metrics.reduce((sum, s) => sum + s.healthScore, 0) / metrics.length;
  const criticalStates = metrics.filter((s) => s.healthScore < 45).length;
  const totalStates = metrics.length;

  return {
    totalStates,
    totalEnrolments,
    avgHealthScore: parseFloat(avgHealthScore.toFixed(1)),
    criticalStates,
    anomalies: Math.floor(metrics.filter((s) => s.healthScore < 50).length * 2.5),
  };
}
