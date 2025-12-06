"use client";

import { CalculationResults } from "@/types";

interface AcceptableRiskResultsProps {
  results: CalculationResults;
}

export default function AcceptableRiskResults({
  results,
}: AcceptableRiskResultsProps) {
  if (!results) {
    return null;
  }

  return (
    <div className="results-grid" style={{ marginTop: "2rem" }}>
      <div className="result-card">
        <h3>سطح پذیرش ساختمان</h3>
        <div className="result-value">
          {results.A !== null && results.A !== undefined ? results.A.toFixed(2) : "-"}
        </div>
      </div>
      <div className="result-card">
        <h3>سطح پذیرش افراد</h3>
        <div className="result-value">
          {results.A1 !== null && results.A1 !== undefined ? results.A1.toFixed(2) : "-"}
        </div>
      </div>
      <div className="result-card">
        <h3>سطح پذیرش فعالیت‌ها</h3>
        <div className="result-value">
          {results.A2 !== null && results.A2 !== undefined ? results.A2.toFixed(2) : "-"}
        </div>
      </div>
    </div>
  );
}

