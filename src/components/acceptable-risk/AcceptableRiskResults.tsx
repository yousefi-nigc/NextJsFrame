"use client";

import { useQuery } from "@tanstack/react-query";
import { AssessmentGetApiResponse } from "@/lib/APIResponseInterfaces";

interface AcceptableRiskResultsProps {
  projectId: string;
  floorId: string;
}

export default function AcceptableRiskResults({
  projectId,
  floorId,
}: AcceptableRiskResultsProps) {
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
        <h3>سطح پذیرش ساختمان</h3>
        <div className="result-value">
          {assessment.assessment.level_A !== null && assessment.assessment.level_A !== undefined ? assessment.assessment.level_A.toFixed(2) : "-"}
        </div>
      </div>
      <div className="result-card">
        <h3>سطح پذیرش افراد</h3>
        <div className="result-value">
          {assessment.assessment.level_A1 !== null && assessment.assessment.level_A1 !== undefined ? assessment.assessment.level_A1.toFixed(2) : "-"}
        </div>
      </div>
      <div className="result-card">
        <h3>سطح پذیرش فعالیت‌ها</h3>
        <div className="result-value">
          {assessment.assessment.level_A2 !== null && assessment.assessment.level_A2 !== undefined ? assessment.assessment.level_A2.toFixed(2) : "-"}
        </div>
      </div>
    </div>
  );
}

