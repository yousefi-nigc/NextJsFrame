"use client";

import { useState } from "react";
import { CalculationResults } from "@/types";

interface ValueFactorTabProps {
  results: CalculationResults;
  updateResults: (updates: Partial<CalculationResults>) => void;
}

// Helper function to convert Iranian Rial to EUR 2000
function convertIranValueTo2000EUR(valueRial: number, year: number): number | null {
  const iranConstructionIndex: Record<number, number> = {
    2000: 100, 2005: 212.5, 2010: 540.3, 2015: 1150.7,
    2020: 4200.5, 2021: 5980.2, 2022: 7450.1, 2023: 8800.0,
    2024: 10150.0, 2025: 11400.0
  };
  const eurExchangeRate: Record<number, number> = {
    2000: 9500, 2005: 11500, 2010: 13500, 2015: 33000,
    2020: 175000, 2021: 285000, 2022: 310000, 2023: 430000,
    2024: 500000, 2025: 1100000
  };

  const idx = iranConstructionIndex[year];
  const rate = eurExchangeRate[year];
  if (!idx || !rate) return null;

  const eurThisYear = valueRial / rate;
  const eur2000 = eurThisYear / (idx / 100);
  return eur2000;
}

function calculateC(
  replaceability: number,
  valueTotal: number | null,
  valueYear: number | null
): number {
  const c1 = replaceability;
  let c2 = 0;

  if (valueTotal !== null && valueYear !== null && valueTotal > 0 && valueYear > 0) {
    const eur2000 = convertIranValueTo2000EUR(valueTotal, valueYear);
    if (eur2000 && eur2000 > 7100000) {
      c2 = 0.25 * Math.log10(eur2000 / 7100000);
    }
  }

  return c1 + c2;
}

export default function ValueFactorTab({
  results,
  updateResults,
}: ValueFactorTabProps) {
  const [replaceability, setReplaceability] = useState("0");
  const [valueTotal, setValueTotal] = useState<string>("");
  const [valueYear, setValueYear] = useState<string>("");
  const [showCalcDescription, setShowCalcDescription] = useState(false);

  const handleCalculate = () => {
    if (!results) return;

    const c = calculateC(
      parseFloat(replaceability),
      valueTotal ? parseFloat(valueTotal) : null,
      valueYear ? parseInt(valueYear) : null
    );

    updateResults({ c });

    // Calculate A, A1, A2
    const a = results.a ?? null;
    const t = results.t ?? null;
    const r = results.r ?? null;
    const d = results.d ?? null;

    const A = a !== null && t !== null
      ? Math.max(0.1, 1.6 - a - t - c)
      : null;
    const A1 = a !== null && t !== null && r !== null
      ? Math.max(0.1, 1.6 - a - t - r)
      : null;
    const A2 = a !== null && d !== null
      ? Math.max(0.1, 1.6 - a - c - d)
      : null;

    updateResults({ A, A1, A2 });
  };

  return (
    <div id="c-value" className="tab-content">
      <div className="help-card">
        <div className="text-info mb-2 text-base font-semibold">
          ضریب ارزش محتویات (c) - FRAME 2008
        </div>
        <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
          <div>
            این ضریب از مجموع:
            <ul className="list-disc mr-3">
              <li>
                <b>c₁:</b> قابلیت جایگزینی محتویات
              </li>
              <li>
                <b>c₂:</b> ارزش محتویات (فرمول دقیق)
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">قابلیت جایگزینی (c₁)</label>
        <select
          value={replaceability}
          onChange={(e) => setReplaceability(e.target.value)}
        >
          <option value="0">به راحتی قابل جایگزینی</option>
          <option value="0.1">جایگزینی با تأخیر کوتاه</option>
          <option value="0.2">غیرقابل جایگزینی</option>
        </select>
      </div>

      <div className="input-group">
        <label className="input-label">
          ارزش کل ساختمان، محتویات و افراد (ریال ایران)
        </label>
        <div className="input-wrapper">
          <input
            type="number"
            value={valueTotal}
            onChange={(e) => setValueTotal(e.target.value)}
            min="0"
            step="1000000"
          />
          <span className="input-unit">﷼</span>
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">سال ارزش جاری (شمسی / میلادی)</label>
        <select
          value={valueYear}
          onChange={(e) => setValueYear(e.target.value)}
        >
          <option value="">انتخاب کنید</option>
          <option value="2000">1379 (2000)</option>
          <option value="2005">1384 (2005)</option>
          <option value="2010">1389 (2010)</option>
          <option value="2015">1394 (2015)</option>
          <option value="2020">1399 (2020)</option>
          <option value="2021">1400 (2021)</option>
          <option value="2022">1401 (2022)</option>
          <option value="2023">1402 (2023)</option>
          <option value="2024">1403 (2024)</option>
          <option value="2025">1404 (2025)</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleCalculate}>
        محاسبه ضریب c
      </button>

      {results && results.c !== null && results.c !== undefined && (
        <div className="result-display" style={{ marginTop: "1rem" }}>
          <div className="text-success font-semibold">
            ضریب c = {results.c.toFixed(2)}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowCalcDescription(!showCalcDescription)}
        className="border-b border-dotted mt-2.5 cursor-pointer"
      >
        📄 شرح فرآیند محاسبه
      </button>

      {showCalcDescription && (
        <div className="mt-2.5 p-4 border rounded-md bg-[#fafafa] leading-relaxed border-[#ccc] dark:bg-[#0f3460] dark:border-[#263238] dark:text-[#eceff1]">
          <p className="font-bold mb-2">
            فرآیند تبدیل و محاسبه c₂ بر پایه FRAME 2008:
          </p>
          <p className="mb-2">1️⃣ ورود مقدار ارزش (ریال ایران) + سال شمسی</p>
          <p className="mb-2">2️⃣ تبدیل به یورو همان سال با نرخ بانک مرکزی</p>
          <p className="mb-2">
            3️⃣ تعدیل با شاخص ساخت‌وساز ایران → یورو سال 2000
          </p>
          <p className="mb-2">
            4️⃣ مقایسه با آستانه ۷.۱ میلیون یورو و محاسبه c₂ طبق فرمول FRAME
            2008
          </p>
          <p className="mb-2">
            5️⃣ جمع c₁ و c₂ برای استفاده در محاسبه سطح پذیرش (A)
          </p>
        </div>
      )}
    </div>
  );
}

