"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AssessmentGetApiResponse,
  AssessmentUpdateApiResponse,
} from "@/lib/APIResponseInterfaces";

// Helper function to convert Iranian Rial to EUR 2000 (matching backend function)
function convertIranValueTo2000EUR(
  valueRial: number,
  year: number
): { eur2000: number; eurThisYear: number } | null {
  const iranConstructionIndex: Record<number, number> = {
    2000: 100,
    2005: 212.5,
    2010: 540.3,
    2015: 1150.7,
    2020: 4200.5,
    2021: 5980.2,
    2022: 7450.1,
    2023: 8800.0,
    2024: 10150.0,
    2025: 11400.0,
  };
  const eurExchangeRate: Record<number, number> = {
    2000: 9500,
    2005: 11500,
    2010: 13500,
    2015: 33000,
    2020: 175000,
    2021: 285000,
    2022: 310000,
    2023: 430000,
    2024: 500000,
    2025: 1100000,
  };

  const idx = iranConstructionIndex[year];
  const rate = eurExchangeRate[year];
  if (!idx || !rate) return null;

  const eurThisYear = valueRial / rate;
  const eur2000 = eurThisYear / (idx / 100);
  return { eur2000, eurThisYear };
}

export default function ValueFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [replaceability, setReplaceability] = useState("0");
  const [valueTotal, setValueTotal] = useState<string>("");
  const [valueYear, setValueYear] = useState<string>("");
  const [showCalcDescription, setShowCalcDescription] = useState(false);

  // Calculate display values (matching old script.js format)
  const calculateDisplayValues = () => {
    const c1 = parseFloat(replaceability) || 0;
    let c2 = 0;
    let calcData: { eur2000: number; eurThisYear: number } | null = null;

    const valRial = valueTotal ? parseFloat(valueTotal) : 0;
    const year = valueYear ? parseInt(valueYear) : NaN;

    if (valRial && year) {
      calcData = convertIranValueTo2000EUR(valRial, year);
      if (calcData && calcData.eur2000 > 7100000) {
        c2 = 0.25 * Math.log10(calcData.eur2000 / 7100000);
      }
    }

    return { c1, c2, calcData, c: c1 + c2 };
  };

  const displayValues = calculateDisplayValues();

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

      setReplaceability(response.assessment.replaceability?.toString() ?? "0");
      setValueTotal(response.assessment.valueTotal?.toString() ?? "");
      setValueYear(response.assessment.valueYear?.toString() ?? "");

      return response;
    },
  });

  const handleCalculate = useMutation({
    mutationFn: async () => {
      // Helper to parse number, allowing 0 as valid value
      const parseNumber = (val: string | undefined): number | undefined => {
        if (val === undefined || val === null || val === "") return undefined;
        const parsed = parseFloat(val);
        return isNaN(parsed) ? undefined : parsed;
      };

      const parseInteger = (val: string | undefined): number | undefined => {
        if (val === undefined || val === null || val === "") return undefined;
        const parsed = parseInt(val);
        return isNaN(parsed) ? undefined : parsed;
      };

      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          body: JSON.stringify({
            replaceability: parseNumber(replaceability) ?? 0, // Default to 0 if not provided
            valueTotal: parseNumber(valueTotal),
            valueYear: parseInteger(valueYear),
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to calculate c factor");
      }

      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("c محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error("خطا در محاسبه c");
      console.log(error);
    },
  });

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

          <div className="mt-2">
            <p>
              <b>فرمول 2008:</b> برای V سال 2000 بزرگ‌تر از 7.1 میلیون یورو:
            </p>
            <pre className="direction-ltr text-left">
              c₂ = 0.25 × log₁₀(V / 7,100,000)
            </pre>
          </div>

          <p className="mt-2">
            <strong>تعریف V:</strong> مجموع ارزش کمپارتمنت + محتویات + ارزش
            اقتصادی معادل ساکنان.
          </p>

          <p>
            اگر ارزش را به سالی غیر از 2000 دارید، سال شمسی را وارد کنید تا
            سیستم به طور خودکار به یورو سال 2000 تبدیل کند.
          </p>
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

      <button
        className="btn btn-primary"
        onClick={() => handleCalculate.mutate()}
      >
        محاسبه ضریب c
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          {assessment?.assessment.factor_c !== null &&
          assessment?.assessment.factor_c !== undefined ? (
            <>
              <div>
                c = {assessment.assessment.factor_c.toFixed(3)}
                <span
                  style={{
                    fontSize: "0.9em",
                    fontWeight: "normal",
                    color: "#666",
                  }}
                >
                  {" "}
                  (c₁={displayValues.c1.toFixed(2)}, c₂=
                  {displayValues.c2.toFixed(3)})
                </span>
              </div>
              {displayValues.calcData && (
                <div
                  style={{
                    fontSize: "0.95em",
                    color: "#555",
                    marginTop: "0.3em",
                  }}
                >
                  €{" "}
                  {displayValues.calcData.eur2000.toLocaleString("en-US", {
                    maximumFractionDigits: 3,
                  })}{" "}
                  ≈ 2000 معادل سال
                </div>
              )}
            </>
          ) : (
            "-"
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowCalcDescription(!showCalcDescription)}
        className="border-b border-dotted mt-2.5 cursor-pointer"
      >
        📄 شرح فرآیند محاسبه
      </button>

      {showCalcDescription && (
        <div
          className="
      mt-3 p-5 rounded-xl border bg-[#fafafa] dark:bg-[#0f3460]
      border-[#d0d0d0] dark:border-[#24303a]
      leading-relaxed text-[15px] font-vazir shadow-sm
    "
          dir="rtl"
        >
          {/* Title */}
          <p className="font-bold text-black dark:text-blue-200 mb-3 text-lg">
            فرآیند تبدیل و محاسبه c₂ بر پایه FRAME 2008:
          </p>

          {/* Steps */}
          <div className="space-y-1.5 text-gray-800 dark:text-gray-100">
            <p>1️⃣ ورود مقدار ارزش (ریال ایران) + سال شمسی</p>
            <p>2️⃣ تبدیل به یورو همان سال با نرخ بانک مرکزی</p>
            <p>3️⃣ تعدیل با شاخص ساخت‌وساز ایران → یورو سال 2000</p>
            <p>
              4️⃣ مقایسه با آستانه ۷.۱ میلیون یورو و محاسبه c₂ طبق فرمول FRAME
              2008
            </p>
            <p>5️⃣ جمع c₁ و c₂ برای استفاده در محاسبه سطح پذیرش (A)</p>
          </div>

          {/* Divider */}
          <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />

          {/* Example Title */}
          <p className="font-bold text-black dark:text-blue-200 mb-2">
            مثال عددی (ساختمان خدماتی - سال 1404 / 2025):
          </p>

          <ul className="list-disc pr-5 space-y-1 text-gray-800 dark:text-gray-100">
            <li>c₁ = 0.10 (جایگزینی با تأخیر کوتاه)</li>
            <li>ارزش کل = 50٬000٬000٬000 ریال</li>
            <li>سال ارزش جاری = 1404 (2025)</li>
          </ul>

          {/* Calculation Steps */}
          <p className="font-bold mt-3 text-black dark:text-blue-200">
            گام‌های محاسبه:
          </p>

          <div className="space-y-2 mt-2 text-gray-800 dark:text-gray-100">
            <p>🔹 نرخ یورو 2025 = 1٬100٬000 ریال/€</p>
            <p>🔹 شاخص ساخت 2025 = 11٬400.0</p>

            <p className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md text-[14px] font-mono">
              ارزش یورو همان سال = 50٬000٬000٬000 ÷ 1٬100٬000 ≈ 45٬454.55 €
            </p>

            <p className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md text-[14px] font-mono">
              ارزش معادل سال 2000 = 45٬454.55 ÷ (11400.0 ÷ 100) ≈ 398.72 €
            </p>

            <p>🔹 چون 398.72 € &lt; 7.1M € → c₂ = 0</p>
          </div>

          {/* Result */}
          <p className="font-bold mt-4 text-black dark:text-blue-200">نتیجه:</p>

          <p className="bg-green-100 dark:bg-green-800/40 px-3 py-1 mt-1 rounded-md text-[14px] font-mono text-green-900 dark:text-green-200">
            c = 0.10 + 0 = 0.10
          </p>

          <p className="mt-1 text-gray-700 dark:text-gray-200 text-[14px]">
            معادل سال 2000 ≈{" "}
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded font-mono">
              398.72 €
            </span>
          </p>

          {/* Footer Note */}
          <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />

          <p className="text-gray-600 dark:text-gray-300 italic text-[13px]">
            (خروجی واقعی کد هنگام وارد کردن همین داده‌ها باید با این محاسبات یکی
            باشد)
          </p>
        </div>
      )}
    </div>
  );
}
