"use client";

import { CalculationResults } from "@/types";

interface PotentialRiskResultsProps {
  results: CalculationResults;
}

export default function PotentialRiskResults({
  results,
}: PotentialRiskResultsProps) {
  if (!results) {
    return null;
  }

  return (
    <div className="results-grid" style={{ marginTop: "2rem" }}>
      <div className="result-card">
        <h3>ریسک ساختمان</h3>
        <div className="result-value">
          {results.P !== null && results.P !== undefined ? results.P.toFixed(2) : "-"}
        </div>
      </div>
      <div className="result-card">
        <h3>ریسک افراد</h3>
        <div className="result-value">
          {results.P1 !== null && results.P1 !== undefined ? results.P1.toFixed(2) : "-"}
        </div>
      </div>
      <div className="result-card">
        <h3>ریسک فعالیت‌ها</h3>
        <div className="result-value">
          {results.P2 !== null && results.P2 !== undefined ? results.P2.toFixed(2) : "-"}
        </div>
      </div>
    </div>
  );
}

