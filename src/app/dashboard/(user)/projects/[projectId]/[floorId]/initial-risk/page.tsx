"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AssessmentGetApiResponse, AssessmentUpdateApiResponse } from "@/lib/APIResponseInterfaces";

export default function InitialRisk() {
  const queryClient = useQueryClient();
  const { projectId, floorId } = useParams();
  const [structureResist, setStructureResist] = useState("60");

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

      setStructureResist(response.assessment.structureResist?.toString() ?? "60");

      return response;
    },
  });

  const handleCalculate = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/user/projects/${projectId}/floors/${floorId}/assessment`, {
        method: "PUT",
        body: JSON.stringify({
          structureResist: parseFloat(structureResist),
        }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("ریسک اولیه محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error("خطا در محاسبه ریسک اولیه");
      console.log(error);
    },
  });

  const getRecommendation = (ro: number | null): string => {
    if (ro === null || ro === undefined) return "";
    if (ro < 1) return "سیستم دستی (Manual)";
    if (ro >= 1 && ro < 1.6) return "سیستم اعلام حریق (Fire Alarm)";
    if (ro >= 1.6 && ro < 2.7) return "سیستم اسپرینکلر (Sprinkler)";
    if (ro >= 2.7 && ro < 4.5) return "سیستم اسپرینکلر پیشرفته (Sprinkler+)";
    return "نیاز به کاهش ریسک (Risk Reduction Required)";
  };

  return (
    <section id="initial-risk" className="section">
      <div className="card">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="card-title">
            <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-xl">
              🎯
            </div>
            محاسبه ریسک اولیه (R₀) و انتخاب سیستم حفاظت
          </h2>
        </div>

        <div>
          <div className="validation-progress">
            <div className="validation-progress-bar form-progress"></div>
          </div>

          <div className="formula-card">
            <div className="text-primary mb-3 text-lg font-semibold">
              فرمول‌های محاسبه
            </div>
            <div className="formula-content" dir="ltr">
              <BlockMath math="F_o = 1 + \frac{f_s}{100} - \frac{f_s^{2.5}}{10^6}" />
              <BlockMath math="R_o = \frac{P}{A \times F_o}" />
            </div>
          </div>

          <div className="help-card">
            <div className="mb-2 font-semibold text-primary">
              هدف از محاسبه R₀
            </div>
            <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
              ریسک اولیه نشان می‌دهد که با توجه به اقدامات ایمنی موجود در
              ساختمان (مثل جداسازی، تهویه دود و مقاومت سازه)، چه سطحی از سیستم
              حفاظت در برابر حریق مورد نیاز است.
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">مقاومت آتش سازه (fs)</label>
            <select
              id="fire-resistance-initial"
              value={structureResist}
              onChange={(e) => setStructureResist(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="15">سازه فولادی بدون محافظ (R15)</option>
              <option value="60">سازه بتنی و بنایی (R60)</option>
              <option value="90">سازه با پوشش ضد حریق (R90)</option>
              <option value="120">سازه با پوشش ضد حریق پیشرفته (R120)</option>
              <option value="0">سازه چوبی سبک (R0)</option>
              <option value="75">سازه چوبی سنگین روی دیوار بنایی (R75)</option>
            </select>
            <div className="input-hint">
              مقاومت در برابر آتش بر حسب دقیقه طبق استاندارد ISO R 834
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => handleCalculate.mutate()}
          >
            محاسبه ریسک اولیه و دریافت توصیه
          </button>

          <div className="results-grid mt-6">
            <div className="result-card">
              <h3>ضریب مقاومت سازه (F₀)</h3>
              <div className="result-value">
                {assessment?.assessment.factor_Fo !== null && assessment?.assessment.factor_Fo !== undefined 
                  ? assessment.assessment.factor_Fo.toFixed(3) 
                  : "-"}
              </div>
            </div>

            <div className="result-card">
              <h3>ریسک اولیه (R₀)</h3>
              <div className="result-value">
                {assessment?.assessment.risk_Ro !== null && assessment?.assessment.risk_Ro !== undefined 
                  ? assessment.assessment.risk_Ro.toFixed(3) 
                  : "-"}
              </div>
            </div>
          </div>

          {assessment?.assessment.risk_Ro !== null && assessment?.assessment.risk_Ro !== undefined && (
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-primary">
              <h4 className="font-semibold text-lg mb-2">توصیه سیستم حفاظت:</h4>
              <p className="text-primary font-bold text-xl">
                {getRecommendation(assessment.assessment.risk_Ro)}
              </p>
            </div>
          )}

          <div className="risk-scale mt-8 text-center font-semibold text-base">
            <h4>مقیاس سطوح ریسک و سیستم‌های توصیه شده</h4>

            <div
              className="
    flex h-[60px] my-4 rounded-lg overflow-hidden 
    shadow-[0_4px_20px_rgba(0,0,0,0.3)]
  "
            >
              <div
                className="
      flex flex-col justify-center items-center text-white font-bold 
      transition-all duration-300 hover:scale-110 hover:z-10 
      w-[20%] bg-[#28a745]
    "
              >
                <span className="text-base">R₀ &lt; 1</span>
                <small className="text-[0.8rem] opacity-90">دستی</small>
              </div>

              <div
                className="
      flex flex-col justify-center items-center font-bold 
      transition-all duration-300 hover:scale-110 hover:z-10 
      w-[20%] bg-[#ffc107] text-[#333]
    "
              >
                <span className="text-base">1–1.6</span>
                <small className="text-[0.8rem] opacity-90">اعلام حریق</small>
              </div>

              <div
                className="
      flex flex-col justify-center items-center text-white font-bold 
      transition-all duration-300 hover:scale-110 hover:z-10 
      w-[20%] bg-[#ff8c00]
    "
              >
                <span className="text-base">1.6–2.7</span>
                <small className="text-[0.8rem] opacity-90">اسپرینکلر</small>
              </div>

              <div
                className="
      flex flex-col justify-center items-center text-white font-bold 
      transition-all duration-300 hover:scale-110 hover:z-10 
      w-[20%] bg-[#dc3545]
    "
              >
                <span className="text-base">2.7–4.5</span>
                <small className="text-[0.8rem] opacity-90">اسپرینکلر+</small>
              </div>

              <div
                className="
      flex flex-col justify-center items-center text-white font-bold 
      transition-all duration-300 hover:scale-110 hover:z-10 
      w-[20%] bg-[#8b0000]
    "
              >
                <span className="text-base">&gt; 4.5</span>
                <small className="text-[0.8rem] opacity-90">کاهش ریسک</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
