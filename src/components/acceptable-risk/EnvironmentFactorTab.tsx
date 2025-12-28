"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AssessmentGetApiResponse,
  AssessmentUpdateApiResponse,
} from "@/lib/APIResponseInterfaces";

// Helper function to get material class label
function getMaterialClassLabel(m: number): string {
  if (m === 0) return "A1 - غیرقابل احتراق (M = 0)";
  if (m === 0.5) return "A2 - تقریباً غیرقابل احتراق (M = 0.5)";
  if (m === 1) return "B - دیرسوز (M = 1)";
  if (m === 2) return "C - سوزش کند (M = 2)";
  if (m === 3) return "D - قابل احتراق (M = 3)";
  if (m === 4) return "E - به راحتی مشتعل (M = 4)";
  if (m === 5) return "F - خیلی سریع شعله‌ور (M = 5)";
  return `M = ${m}`;
}

function calculateR(qi: number, materialClass: number): number {
  const qi_clamped = Math.max(0, Math.min(qi, 20000));
  const M_clamped = Math.max(0, Math.min(materialClass, 5));

  let rValue = 0.1 * Math.log10(qi_clamped + 1) + M_clamped / 10;
  rValue = Math.max(0, Math.min(rValue, 2));

  return rValue;
}

export default function EnvironmentFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [qi, setQi] = useState<string>("");

  const { data: assessment, isLoading } = useQuery<AssessmentGetApiResponse>({
    queryKey: ["assessment", floorId],
    enabled: !!floorId,
    queryFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`
      );
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch the assessment");

      const response = data as AssessmentGetApiResponse;

      setQi(response.assessment.qi?.toString() ?? "");

      return response;
    },
  });

  const handleCalculate = useMutation({
    mutationFn: async () => {
      if (!qi || parseFloat(qi) <= 0) {
        throw new Error("Qi باید بزرگتر از صفر باشد");
      }

      // Material class M comes from factor i calculation - use the stored value
      const materialClass = assessment?.assessment.materialClass;
      if (materialClass === null || materialClass === undefined) {
        throw new Error("لطفاً ابتدا کلاس واکنش در برابر آتش (M) را در تب ضریب i وارد کنید");
      }

      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          body: JSON.stringify({
            qi: parseFloat(qi),
            // materialClass is not sent - it's already stored from factor i calculation
          }),
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("r محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "خطا در محاسبه r");
      console.log(error);
    },
  });

  return (
    <div id="r-environment" className="tab-content">
      <div className="help-card">
        <div className="text-info mb-2 text-base font-semibold">
          ضریب محیطی (r)
        </div>
        <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
          این ضریب شاخص سرعت تولید دود و حرارت است که بر مدت زمان تخلیه ایمن
          (ASET) اثر می‌گذارد. مقدار r بر اساس <b>بار آتش ثابت (Qi)</b> و{" "}
          <b>کلاس واکنش در برابر آتش (M)</b> محاسبه می‌شود.
          <p className="mt-3">
            <span className="font-semibold">توجه:</span> کلاس واکنش در برابر آتش (M) از محاسبه ضریب i استفاده می‌شود.
            لطفاً ابتدا در تب ضریب i مقدار M را وارد کنید.
          </p>
          <p className="mt-3">
            <span className="font-semibold">یادآوری:</span> هرچه r بزرگ‌تر باشد،
            آتش سریع‌تر توسعه می‌یابد و ASET کوتاه‌تر می‌شود.
          </p>
        </div>
      </div>

      <div className="formula-card">
        <div className="text-info mb-2 text-base font-semibold">
          فرمول محاسبه
        </div>
        <div className="formula-content">
          <div className="math-formula" dir="ltr">
            <BlockMath
              math={`r = 0.1 \\times \\log_{10}(Qi + 1) + \\frac{M}{10}`}
            />
          </div>
          <ul>
            <li>
              <b>Qi</b>: بار آتش ثابت (MJ/m²)
            </li>
            <li>
              <b>M</b>: کلاس واکنش در برابر آتش (۰ تا ۵) - از ضریب i
            </li>
          </ul>
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">بار آتش ثابت Qi (MJ/m²)</label>
        <input
          type="number"
          value={qi}
          onChange={(e) => setQi(e.target.value)}
          min="0"
          placeholder="مثلاً 300"
        />
      </div>

      <div className="input-group">
        <label className="input-label">کلاس واکنش در برابر آتش (M) - از ضریب i</label>
        <input
          type="text"
          value={
            assessment?.assessment.materialClass !== null && assessment?.assessment.materialClass !== undefined
              ? getMaterialClassLabel(assessment.assessment.materialClass)
              : "لطفاً ابتدا در تب ضریب i وارد کنید"
          }
          readOnly
          style={{ background: "#f0f0f0", cursor: "not-allowed" }}
          className="dark:bg-gray-700"
        />
        <small className="text-sm text-gray-500 mt-1 dark:text-gray-400">
          این مقدار از محاسبه ضریب i (کلاس واکنش در برابر آتش) استفاده می‌شود
        </small>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => handleCalculate.mutate()}
      >
        محاسبه ضریب r
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          {assessment?.assessment.factor_r
            ? assessment?.assessment.factor_r.toFixed(3)
            : "-"}
        </div>
      </div>
    </div>
  );
}
