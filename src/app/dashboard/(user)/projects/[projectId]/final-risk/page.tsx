"use client";

import { useState } from "react";
import Link from "next/link";
import { BlockMath } from "react-katex";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Floor, AssessmentGetApiResponse } from "@/lib/APIResponseInterfaces";
import { toast } from "sonner";

export default function FinalRisk() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const [selectedFloorId, setSelectedFloorId] = useState<string>("");

  // Fetch all floors for the project
  const { data: floors, isLoading: isFloorsLoading } = useQuery<Floor[]>({
    queryKey: ["floors", projectId],
    enabled: !!projectId,
    queryFn: async () => {
      const res = await fetch(`/api/user/projects/${projectId}/floors`);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch floors");
      return data.floors;
    },
  });

  // Fetch assessment for selected floor
  const { data: assessment, isLoading: isAssessmentLoading } = useQuery<AssessmentGetApiResponse>({
    queryKey: ["assessment", selectedFloorId],
    enabled: !!selectedFloorId,
    queryFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${selectedFloorId}/assessment`
      );
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch assessment");
      return data as AssessmentGetApiResponse;
    },
  });

  // Mutation to recalculate final risk
  const recalculateMutation = useMutation({
    mutationFn: async () => {
      if (!selectedFloorId || !assessment) return;

      // Trigger recalculation by updating the assessment (this will recalculate all values)
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${selectedFloorId}/assessment`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(assessment.assessment),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to recalculate");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessment", selectedFloorId] });
      toast.success("محاسبه ریسک نهایی با موفقیت انجام شد");
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطا در محاسبه ریسک نهایی");
    },
  });

  const getRiskStatus = (r: number | null) => {
    if (r === null) return { label: "نامشخص", color: "gray" };
    if (r < 0.5) return { label: "کم", color: "green" };
    if (r < 1.0) return { label: "متوسط", color: "yellow" };
    if (r < 2.0) return { label: "زیاد", color: "orange" };
    return { label: "بسیار زیاد", color: "red" };
  };

  // Validation function to check what's missing for final risk calculation
  const validateFinalRiskData = () => {
    if (!assessment?.assessment) {
      return {
        canCalculate: false,
        missingSections: ["ارزیابی"],
        message: "ارزیابی برای این طبقه یافت نشد. لطفاً ابتدا یک ارزیابی ایجاد کنید.",
      };
    }

    const ass = assessment.assessment;
    const missingSections: string[] = [];

    // Check if intermediate calculated values exist (these are what's actually needed)
    // If they don't exist, check if the required factors exist to calculate them

    // For R (Building): needs risk_P, level_A, level_D
    // For R1 (People): needs risk_P1, level_A1, level_D1
    // For R2 (Activities): needs risk_P2, level_A2, level_D2

    // Check Potential Risk values (P, P1, P2)
    // These need factors: q, i, g, e, v, z
    const hasPotentialRiskValues =
      ass.risk_P !== null || ass.risk_P1 !== null || ass.risk_P2 !== null;
    const hasPotentialRiskFactors =
      ass.factor_q !== null &&
      ass.factor_i !== null &&
      ass.factor_g !== null &&
      ass.factor_e !== null &&
      ass.factor_v !== null &&
      ass.factor_z !== null;

    if (!hasPotentialRiskValues && !hasPotentialRiskFactors) {
      missingSections.push("ریسک بالقوه");
    }

    // Check Acceptable Level values (A, A1, A2)
    // These need factors: a, t, c, r, d
    const hasAcceptableLevelValues =
      ass.level_A !== null || ass.level_A1 !== null || ass.level_A2 !== null;
    const hasAcceptableRiskFactors =
      ass.factor_a !== null &&
      ass.factor_t !== null &&
      ass.factor_c !== null &&
      ass.factor_r !== null &&
      ass.factor_d !== null;

    if (!hasAcceptableLevelValues && !hasAcceptableRiskFactors) {
      missingSections.push("سطح پذیرش");
    }

    // Check Protection Level values (D, D1, D2)
    // D needs: W, N, S, F
    // D1 needs: N, U
    // D2 needs: W, N, S, Y
    const hasProtectionLevelValues =
      ass.level_D !== null || ass.level_D1 !== null || ass.level_D2 !== null;
    const hasProtectionLevelFactors =
      ass.factor_W !== null &&
      ass.factor_N !== null &&
      ass.factor_S !== null &&
      ass.factor_F !== null &&
      ass.factor_U !== null &&
      ass.factor_Y !== null;

    if (!hasProtectionLevelValues && !hasProtectionLevelFactors) {
      missingSections.push("سطح حفاظت");
    }

    if (missingSections.length > 0) {
      return {
        canCalculate: false,
        missingSections,
        message: `برای محاسبه ریسک نهایی، لطفاً بخش‌های زیر را تکمیل کنید: ${missingSections.join("، ")}. پس از تکمیل، دوباره به این صفحه برگردید.`,
      };
    }

    return { canCalculate: true, missingSections: [], message: "" };
  };

  const validation = validateFinalRiskData();
  const finalR = {
    R: assessment?.assessment.final_R ?? null,
    R1: assessment?.assessment.final_R1 ?? null,
    R2: assessment?.assessment.final_R2 ?? null,
  };

  const handleCalculate = () => {
    if (!selectedFloorId) {
      toast.error("لطفاً یک طبقه انتخاب کنید");
      return;
    }

    if (!validation.canCalculate) {
      toast.error(validation.message);
      return;
    }

    recalculateMutation.mutate();
  };

  return (
    <section id="final-risk" className="section">
      <div className="card">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="card-title">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 dark:from-primary dark:to-secondary rounded-lg flex items-center justify-center text-white text-xl">
              📊
            </div>
            محاسبه نهایی ریسک
          </h2>
        </div>

        <div className="formula-card">
          <div className="text-primary mb-3 text-lg font-semibold">
            فرمول محاسبه ریسک نهایی
          </div>
          <div className="formula-content">
            <div className="formula-content" dir="ltr">
              <BlockMath math="R = \frac{P}{A \times D}" />
            </div>
          </div>
        </div>

        <div className="help-card text-base">
          <div className="mb-2 font-semibold text-primary">تفسیر نتایج</div>

          <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
            <ul className="list-none p-0">
              <li className="mb-2">✅ R ≤ 1: ریسک قابل قبول</li>
              <li className="mb-2">
                ⚠️ 1 &lt; R ≤ 1.6: ریسک متوسط - نیاز به بهبود
              </li>
              <li className="mb-2">
                ❌ R &gt; 1.6: ریسک غیرقابل قبول - اقدام فوری
              </li>
            </ul>
          </div>
        </div>

        {/* Floor Selector */}
        <div className="mt-6 mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            انتخاب طبقه
          </label>
          <select
            value={selectedFloorId}
            onChange={(e) => setSelectedFloorId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            disabled={isFloorsLoading}
          >
            <option value="">-- انتخاب طبقه --</option>
            {floors?.map((floor) => (
              <option key={floor.id} value={floor.id}>
                {floor.name} (سطح {floor.level})
              </option>
            ))}
          </select>
        </div>

        {/* Results Display */}
        {(finalR.R !== null || finalR.R1 !== null || finalR.R2 !== null) && (
          <div className="mt-8 space-y-4">
            {finalR.R !== null && (
              <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-2 border-primary">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">
                    R (ساختمان)
                  </div>
                  <div className="text-5xl font-bold text-primary mb-2">
                    {finalR.R.toFixed(2)}
                  </div>
                  <div
                    className={`inline-block px-4 py-2 rounded-full font-bold text-white ${
                      getRiskStatus(finalR.R).color === "green"
                        ? "bg-green-500"
                        : getRiskStatus(finalR.R).color === "yellow"
                        ? "bg-yellow-500"
                        : getRiskStatus(finalR.R).color === "orange"
                        ? "bg-orange-500"
                        : getRiskStatus(finalR.R).color === "red"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {getRiskStatus(finalR.R).label}
                  </div>
                </div>
              </div>
            )}

            {finalR.R1 !== null && (
              <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border-2 border-success">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-2">
                    R₁ (افراد)
                  </div>
                  <div className="text-5xl font-bold text-success mb-2">
                    {finalR.R1.toFixed(2)}
                  </div>
                  <div
                    className={`inline-block px-4 py-2 rounded-full font-bold text-white ${
                      getRiskStatus(finalR.R1).color === "green"
                        ? "bg-green-500"
                        : getRiskStatus(finalR.R1).color === "yellow"
                        ? "bg-yellow-500"
                        : getRiskStatus(finalR.R1).color === "orange"
                        ? "bg-orange-500"
                        : getRiskStatus(finalR.R1).color === "red"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {getRiskStatus(finalR.R1).label}
                  </div>
                </div>
              </div>
            )}

            {finalR.R2 !== null && (
              <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border-2 border-warning">
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning mb-2">
                    R₂ (فعالیت‌ها)
                  </div>
                  <div className="text-5xl font-bold text-warning mb-2">
                    {finalR.R2.toFixed(2)}
                  </div>
                  <div
                    className={`inline-block px-4 py-2 rounded-full font-bold text-white ${
                      getRiskStatus(finalR.R2).color === "green"
                        ? "bg-green-500"
                        : getRiskStatus(finalR.R2).color === "yellow"
                        ? "bg-yellow-500"
                        : getRiskStatus(finalR.R2).color === "orange"
                        ? "bg-orange-500"
                        : getRiskStatus(finalR.R2).color === "red"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {getRiskStatus(finalR.R2).label}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Validation Error Message */}
        {selectedFloorId && !isAssessmentLoading && assessment && !validation.canCalculate && (
          <div className="mt-6 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-300 dark:border-red-800">
            <div className="flex items-start">
              <div className="text-2xl mr-3">⚠️</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-800 dark:text-red-200 mb-2">
                  داده‌های لازم برای محاسبه موجود نیست
                </h3>
                <p className="text-red-700 dark:text-red-300 mb-4 leading-relaxed">
                  {validation.message}
                </p>
                <div className="space-y-2">
                  {validation.missingSections.includes("ریسک بالقوه") && (
                    <Link
                      href={`/dashboard/projects/${projectId}/${selectedFloorId}/potential-risk`}
                      className="block px-4 py-2 bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/60 rounded-md text-red-800 dark:text-red-200 font-medium transition-colors"
                    >
                      ← رفتن به بخش ریسک بالقوه
                    </Link>
                  )}
                  {validation.missingSections.includes("سطح پذیرش") && (
                    <Link
                      href={`/dashboard/projects/${projectId}/${selectedFloorId}/acceptable-risk`}
                      className="block px-4 py-2 bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/60 rounded-md text-red-800 dark:text-red-200 font-medium transition-colors"
                    >
                      ← رفتن به بخش سطح پذیرش
                    </Link>
                  )}
                  {validation.missingSections.includes("سطح حفاظت") && (
                    <Link
                      href={`/dashboard/projects/${projectId}/${selectedFloorId}/protection-level`}
                      className="block px-4 py-2 bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/60 rounded-md text-red-800 dark:text-red-200 font-medium transition-colors"
                    >
                      ← رفتن به بخش سطح حفاظت
                    </Link>
                  )}
                </div>
                <p className="text-sm text-red-600 dark:text-red-400 mt-4 italic">
                  پس از تکمیل بخش‌های بالا، دوباره به این صفحه برگردید تا نتایج محاسبه ریسک نهایی نمایش داده شود.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Fallback results grid for when no results are available */}
        {!finalR.R && !finalR.R1 && !finalR.R2 && selectedFloorId && validation.canCalculate && (
          <div className="results-grid" style={{ marginTop: "2rem" }}>
            <div className="result-card">
              <h3>ریسک نهایی ساختمان</h3>
              <div className="result-value">-</div>
            </div>
            <div className="result-card">
              <h3>ریسک نهایی افراد</h3>
              <div className="result-value">-</div>
            </div>
            <div className="result-card">
              <h3>ریسک نهایی فعالیت‌ها</h3>
              <div className="result-value">-</div>
            </div>
          </div>
        )}

        {!selectedFloorId && (
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-yellow-800 dark:text-yellow-200 text-center">
              لطفاً یک طبقه انتخاب کنید تا نتایج محاسبه ریسک نهایی نمایش داده شود.
            </p>
          </div>
        )}

        {isAssessmentLoading && selectedFloorId && (
          <div className="mt-6 text-center">
            <p className="text-gray-500">در حال بارگذاری...</p>
          </div>
        )}

        {selectedFloorId && !isAssessmentLoading && !assessment && (
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-yellow-800 dark:text-yellow-200 text-center">
              ارزیابی برای این طبقه یافت نشد. لطفاً ابتدا یک ارزیابی ایجاد کنید.
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            className="btn btn-primary"
            onClick={handleCalculate}
            disabled={
              !selectedFloorId ||
              recalculateMutation.isPending ||
              isAssessmentLoading ||
              !validation.canCalculate
            }
          >
            {recalculateMutation.isPending
              ? "در حال محاسبه..."
              : validation.canCalculate
              ? "محاسبه ریسک نهایی"
              : "تکمیل بخش‌های لازم"}
          </button>
        </div>
      </div>

      <div className="text-center mt-[30px] p-5 bg-[#e8f4f8] rounded-lg">
        <p className="text-[#2c3e50] mb-5">
          ✅ محاسبات تکمیل شد! برای ذخیره‌سازی و تولید گزارش به بخش بعد بروید.
        </p>

        <Link
          href="#report"
          // onClick={() => showSection('report')}
          className="bg-[#27ae60] text-white py-3 px-8 rounded-md cursor-pointer text-sm font-semibold"
        >
          ادامه به گزارش نهایی و ذخیره‌سازی ←
        </Link>
      </div>
    </section>
  );
}

