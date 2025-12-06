"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { CalculationResults } from "@/types";

interface NFactorTabProps {
  results: CalculationResults;
  updateResults: (updates: Partial<CalculationResults>) => void;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="bg-[#f8f9fa] dark:bg-slate-800 p-4 pb-8 rounded-xl space-y-2 mb-5">
      <h4 className="font-semibold">{title}</h4>
      <div className="border-b border-primary mb-4"></div>
      {children}
    </div>
  );
}

interface SelectProps {
  value: number;
  onChange: (value: number) => void;
  children: React.ReactNode;
}

function Select({ value, onChange, children }: SelectProps) {
  return (
    <select
      className="w-full border rounded-lg p-2 dark:bg-slate-900 dark:border-slate-600"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {children}
    </select>
  );
}

export default function NFactorTab({
  results,
  updateResults,
}: NFactorTabProps) {
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);
  const [n3, setN3] = useState(0);
  const [n4, setN4] = useState(0);
  const [n5, setN5] = useState(0);

  const calculateN = () => {
    const n = n1 + n2 + n3 + n4 + n5;
    const N = Math.pow(0.95, n);
    updateResults({ N });

    // Recalculate D, D1, D2 if other factors are available
    const { W, S, F, U, Y } = results;
    if (W !== null && S !== null && F !== null) {
      const D = W * N * S * F;
      updateResults({ D });
    }
    if (U !== null) {
      const D1 = N * U;
      updateResults({ D1 });
    }
    if (W !== null && S !== null && Y !== null) {
      const D2 = W * N * S * Y;
      updateResults({ D2 });
    }
  };

  return (
    <div id="n-normal" className="tab-content">
      <div className="formula-card">
        <div className="text-primary mb-3 text-lg font-semibold text-center">
          فرمول محاسبه N - ضریب حفاظت عادی
        </div>

        <div
          className="formula-content text-center text-base mt-3"
          dir="ltr"
        >
          <BlockMath
            math={`N = 0.95^{n} \\quad \\text{که} \\quad n = n_1 + n_2 + n_3 + n_4 + n_5`}
          />
        </div>
      </div>

      <Section title="n₁ - کشف و هشدار">
        <Select value={n1} onChange={setN1}>
          <option value={0}>
            زنجیره کامل کشف و هشدار به آتش‌نشانی و ساکنان
          </option>
          <option value={2}>کشف یا هشدار ناقص</option>
          <option value={4}>هشدار محلی بدون اطلاع‌رسانی</option>
          <option value={6}>فاقد کشف و هشدار</option>
        </Select>
      </Section>

      <Section title="n₂ - خاموش‌کن دستی">
        <Select value={n2} onChange={setN2}>
          <option value={0}>خاموش‌کن‌ها کافی و درست</option>
          <option value={2}>خاموش‌کن ناکافی</option>
          <option value={4}>بدون خاموش‌کن</option>
        </Select>
      </Section>

      <Section title="n₃ - جعبه/هوزریل آتش‌نشانی">
        <Select value={n3} onChange={setN3}>
          <option value={0}>پوشش کامل جعبه آتش‌نشانی</option>
          <option value={2}>تعداد یا مکان ناکافی</option>
          <option value={4}>فاقد جعبه آتش‌نشانی</option>
        </Select>
      </Section>

      <Section title="n₄ - زمان رسیدن آتش‌نشانی">
        <Select value={n4} onChange={setN4}>
          <option value={0}>کمتر از 10 دقیقه</option>
          <option value={2}>10 تا 15 دقیقه</option>
          <option value={5}>15 تا 30 دقیقه</option>
          <option value={10}>بیش از 30 دقیقه</option>
        </Select>
      </Section>

      <Section title="n₅ - آموزش ساکنان">
        <Select value={n5} onChange={setN5}>
          <option value={0}>همه آموزش دیده‌اند</option>
          <option value={2}>برخی آموزش دیده‌اند</option>
          <option value={4}>هیچ آموزش ندیده‌اند</option>
        </Select>
      </Section>

      <button className="btn btn-primary" onClick={calculateN}>
        محاسبه ضریب N
      </button>

      {results.N !== null && (
        <div className="mt-4 text-primary font-semibold text-lg">
          <div className="result-value">{results.N.toFixed(3)}</div>
        </div>
      )}
    </div>
  );
}

