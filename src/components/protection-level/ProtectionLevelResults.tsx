"use client";

import { useQuery } from "@tanstack/react-query";
import { AssessmentGetApiResponse } from "@/lib/APIResponseInterfaces";

interface ProtectionLevelResultsWrapperProps {
  projectId: string;
  floorId: string;
}

export default function ProtectionLevelResultsWrapper({
  projectId,
  floorId,
}: ProtectionLevelResultsWrapperProps) {
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
    <div className="results-grid mt-8">
      <div className="result-card">
        <h3>حفاظت ساختمان</h3>
        <div className="result-value">
          {assessment.assessment.level_D !== null && assessment.assessment.level_D !== undefined ? assessment.assessment.level_D.toFixed(2) : "-"}
        </div>
      </div>
      <div className="result-card">
        <h3>حفاظت افراد</h3>
        <div className="result-value">
          {assessment.assessment.level_D1 !== null && assessment.assessment.level_D1 !== undefined ? assessment.assessment.level_D1.toFixed(2) : "-"}
        </div>
      </div>
      <div className="result-card">
        <h3>حفاظت فعالیت‌ها</h3>
        <div className="result-value">
          {assessment.assessment.level_D2 !== null && assessment.assessment.level_D2 !== undefined ? assessment.assessment.level_D2.toFixed(2) : "-"}
        </div>
      </div>
    </div>
  );
}
