"use client";

import { CalculationResults } from "@/types";
import { BlockMath } from "react-katex";

interface InitialRiskSectionProps {
  results: CalculationResults;
  updateResults: (updates: Partial<CalculationResults>) => void;
}

export default function InitialRiskSection({
  results,
  updateResults,
}: InitialRiskSectionProps) {
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

        {/*  */}
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
              className="border px-2 py-1 rounded"
            >
              <option value="15">سازه فولادی بدون محافظ (R15)</option>
              <option value="60" selected>
                سازه بتنی و بنایی (R60)
              </option>
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
            // onClick={() => calculateInitialRisk()}
          >
            محاسبه ریسک اولیه و دریافت توصیه
          </button>

          <div className="results-grid mt-6">
            <div className="result-card">
              <h3>ضریب مقاومت سازه (F₀)</h3>
              <div className="result-value" id="fo-result">
                -
              </div>
            </div>

            <div className="result-card">
              <h3>ریسک اولیه (R₀)</h3>
              <div className="result-value" id="ro-result">
                -
              </div>
            </div>
          </div>

          <div id="protection-recommendation" className="mt-8"></div>

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
