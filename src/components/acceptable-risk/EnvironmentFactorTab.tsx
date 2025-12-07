"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AssessmentGetApiResponse, AssessmentUpdateApiResponse } from "@/lib/APIResponseInterfaces";

function calculateR(qi: number, materialClass: number): number {
  const qi_clamped = Math.max(0, Math.min(qi, 20000));
  const M_clamped = Math.max(0, Math.min(materialClass, 5));

  let rValue = 0.1 * Math.log10(qi_clamped + 1) + (M_clamped / 10);
  rValue = Math.max(0, Math.min(rValue, 2));

  return rValue;
}

export default function EnvironmentFactorTab({ projectId, floorId }: { projectId: string, floorId: string }) {
  const queryClient = useQueryClient();
  const [qi, setQi] = useState<string>("");
  const [materialClass, setMaterialClass] = useState<string>("0");

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
      setMaterialClass(response.assessment.materialClass?.toString() ?? "0");

      return response;
    },
  });

  const handleCalculate = useMutation({
    mutationFn: async () => {
      if (!qi || parseFloat(qi) <= 0) {
        throw new Error("Qi باید بزرگتر از صفر باشد");
      }

      const res = await fetch(`/api/user/projects/${projectId}/floors/${floorId}/assessment`, {
        method: "PUT",
        body: JSON.stringify({
          qi: parseFloat(qi),
          materialClass: parseFloat(materialClass),
        }),
      });
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
          <b>کلاس گسترش شعله (M)</b> در بدترین سناریوی آتش‌سوزی محاسبه
          می‌شود.
        </div>
      </div>

      <div className="formula-card">
        <div className="text-info mb-2 text-base font-semibold">فرمول محاسبه</div>
        <div className="formula-content">
          <div className="math-formula" dir="ltr">
            <BlockMath math={`r = 0.1 \\times \\log_{10}(Qi + 1) + \\frac{M}{10}`} />
          </div>
          <ul>
            <li>
              <b>Qi</b>: بار آتش ثابت (MJ/m²)
            </li>
            <li>
              <b>M</b>: کلاس گسترش شعله (۰ تا ۵)
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
        <label className="input-label">کلاس گسترش شعله (M)</label>
        <select
          value={materialClass}
          onChange={(e) => setMaterialClass(e.target.value)}
        >
          <option value="0">A1 - غیرقابل احتراق</option>
          <option value="0.5">A2 - تقریباً غیرقابل احتراق</option>
          <option value="1">B - دیرسوز</option>
          <option value="2">C - سوزش کند</option>
          <option value="3">D - قابل احتراق</option>
          <option value="4">E - به راحتی مشتعل</option>
          <option value="5">F - خیلی سریع شعله‌ور</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={() => handleCalculate.mutate()}>
        محاسبه ضریب r
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary">
        <div className="result-value">{assessment?.assessment.factor_r ? assessment?.assessment.factor_r.toFixed(3) : "-"}</div>
      </div>
    </div>
  );
}

