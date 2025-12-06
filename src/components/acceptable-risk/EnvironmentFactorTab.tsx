"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { CalculationResults } from "@/types";

interface EnvironmentFactorTabProps {
  results: CalculationResults;
  updateResults: (updates: Partial<CalculationResults>) => void;
}

function calculateR(qi: number, materialClass: number): number {
  const qi_clamped = Math.max(0, Math.min(qi, 20000));
  const M_clamped = Math.max(0, Math.min(materialClass, 5));

  let rValue = 0.1 * Math.log10(qi_clamped + 1) + (M_clamped / 10);
  rValue = Math.max(0, Math.min(rValue, 2));

  return rValue;
}

export default function EnvironmentFactorTab({
  results,
  updateResults,
}: EnvironmentFactorTabProps) {
  const [qi, setQi] = useState<string>("");
  const [materialClass, setMaterialClass] = useState<string>("0");

  const handleCalculate = () => {
    if (!results || !qi || parseFloat(qi) <= 0) return;

    const r = calculateR(parseFloat(qi), parseFloat(materialClass));

    updateResults({ r });

    // Calculate A, A1, A2
    const a = results.a ?? null;
    const t = results.t ?? null;
    const c = results.c ?? null;
    const d = results.d ?? null;

    const A = a !== null && t !== null && c !== null
      ? Math.max(0.1, 1.6 - a - t - c)
      : null;
    const A1 = a !== null && t !== null
      ? Math.max(0.1, 1.6 - a - t - r)
      : null;
    const A2 = a !== null && c !== null && d !== null
      ? Math.max(0.1, 1.6 - a - c - d)
      : null;

    updateResults({ A, A1, A2 });
  };

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

      <button className="btn btn-primary" onClick={handleCalculate}>
        محاسبه ضریب r
      </button>

      {results && results.r !== null && results.r !== undefined && (
        <div className="result-display mt-4">
          <div className="text-success font-semibold">
            ضریب r = {results.r.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

