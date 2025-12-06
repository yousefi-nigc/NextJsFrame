"use client";

import { CalculationResults } from "@/types";

interface ProtectionLevelResultsProps {
  results: CalculationResults;
}

export default function ProtectionLevelResults({
  results,
}: ProtectionLevelResultsProps) {
  if (!results) {
    return null;
  }

  return (
    <div className="results-grid mt-8">
      <div className="result-card">
        <h3>حفاظت ساختمان</h3>
        <div className="result-value">
          {results.D !== null && results.D !== undefined ? results.D.toFixed(2) : "-"}
        </div>
      </div>
      <div className="result-card">
        <h3>حفاظت افراد</h3>
        <div className="result-value">
          {results.D1 !== null && results.D1 !== undefined ? results.D1.toFixed(2) : "-"}
        </div>
      </div>
      <div className="result-card">
        <h3>حفاظت فعالیت‌ها</h3>
        <div className="result-value">
          {results.D2 !== null && results.D2 !== undefined ? results.D2.toFixed(2) : "-"}
        </div>
      </div>
    </div>
  );
}

