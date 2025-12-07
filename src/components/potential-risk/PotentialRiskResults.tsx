"use client";

import { useQuery } from "@tanstack/react-query";
import { AssessmentGetApiResponse } from "@/lib/APIResponseInterfaces";

interface PotentialRiskResultsWrapperProps {
  projectId: string;
  floorId: string;
}

export default function PotentialRiskResultsWrapper({
  projectId,
  floorId,
}: PotentialRiskResultsWrapperProps) {
  const { data: assessment } = useQuery<AssessmentGetApiResponse>({
    queryKey: ["assessment", floorId],
    enabled: !!floorId,
    queryFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`
      );
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch the assessment");

      return data as AssessmentGetApiResponse;
    },
  });

  if (!assessment) {
    return null;
  }

  return (
    <div className="results-grid" style={{ marginTop: "2rem" }}>
      <div className="result-card">
        <h3>ریسک ساختمان</h3>
        <div className="result-value">
          {assessment.assessment.risk_P !== null && assessment.assessment.risk_P !== undefined ? assessment.assessment.risk_P.toFixed(2) : "-"}
        </div>
      </div>
      <div className="result-card">
        <h3>ریسک افراد</h3>
        <div className="result-value">
          {assessment.assessment.risk_P1 !== null && assessment.assessment.risk_P1 !== undefined ? assessment.assessment.risk_P1.toFixed(2) : "-"}
        </div>
      </div>
      <div className="result-card">
        <h3>ریسک فعالیت‌ها</h3>
        <div className="result-value">
          {assessment.assessment.risk_P2 !== null && assessment.assessment.risk_P2 !== undefined ? assessment.assessment.risk_P2.toFixed(2) : "-"}
        </div>
      </div>
    </div>
  );
}
