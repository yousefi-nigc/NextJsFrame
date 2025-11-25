"use client";

import Link from "next/link";
import { BlockMath } from "react-katex";
import { CalculationResults } from "@/src/types";
import { calculateFinalR } from "@/src/utils/calculations";

interface FinalRiskSectionProps {
  results: CalculationResults;
  updateResults: (updates: Partial<CalculationResults>) => void;
}

export default function FinalRiskSection({
  results,
  updateResults,
}: FinalRiskSectionProps) {
  const finalR = calculateFinalR(results);

  if (finalR.R !== null) {
    updateResults(finalR);
  }

  const getRiskStatus = (r: number | null) => {
    if (r === null) return { label: "نامشخص", color: "gray" };
    if (r < 0.5) return { label: "کم", color: "green" };
    if (r < 1.0) return { label: "متوسط", color: "yellow" };
    if (r < 2.0) return { label: "زیاد", color: "orange" };
    return { label: "بسیار زیاد", color: "red" };
  };

  return (
    <section id="final-risk" className="section">
      <div className="card">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="card-title">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-xl">
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

        {(finalR.R !== null || finalR.R1 !== null || finalR.R2 !== null) && (
          <div className="mt-8 space-y-4">
            {finalR.R !== null && (
              <div className="p-6 bg-linear-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-primary">
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
              <div className="p-6 bg-linear-to-br from-green-50 to-blue-50 rounded-xl border-2 border-success">
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
              <div className="p-6 bg-linear-to-br from-orange-50 to-red-50 rounded-xl border-2 border-warning">
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
        <div className="results-grid" style={{ marginTop: "2rem" }}>
          <div className="result-card">
            <h3>ریسک نهایی ساختمان</h3>
            <div className="result-value" id="total-p">
              -
            </div>
          </div>
          <div className="result-card">
            <h3>ریسک نهایی افراد</h3>
            <div className="result-value" id="total-p1">
              -
            </div>
          </div>
          <div className="result-card">
            <h3>ریسک نهایی فعالیت‌ها</h3>
            <div className="result-value" id="total-p2">
              -
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            className="btn btn-primary"
            // onclick="calculateFinalRisk()"
          >
            محاسبه ریسک نهایی
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
