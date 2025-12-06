"use client";

import { useState } from "react";
import { CalculationResults } from "@/types";

interface DependencyFactorTabProps {
  results: CalculationResults;
  updateResults: (updates: Partial<CalculationResults>) => void;
}

function calculateD(
  dependencyType: string,
  dependencyManual: number | null
): number | null {
  if (dependencyType && dependencyType !== "manual") {
    const d = parseFloat(dependencyType);
    if (!isNaN(d)) return d;
  }

  if (dependencyType === "manual" && dependencyManual !== null) {
    if (dependencyManual < 0 || dependencyManual > 1) return null;
    return dependencyManual;
  }

  return null;
}

export default function DependencyFactorTab({
  results,
  updateResults,
}: DependencyFactorTabProps) {
  const [dependencyType, setDependencyType] = useState<string>("");
  const [dependencyManual, setDependencyManual] = useState<string>("");

  const handleCalculate = () => {
    if (!results) return;

    const d = calculateD(
      dependencyType,
      dependencyManual ? parseFloat(dependencyManual) : null
    );

    if (d !== null) {
      updateResults({ d });

      // Calculate A, A1, A2
      const a = results.a ?? null;
      const t = results.t ?? null;
      const c = results.c ?? null;
      const r = results.r ?? null;

      const A = a !== null && t !== null && c !== null
        ? Math.max(0.1, 1.6 - a - t - c)
        : null;
      const A1 = a !== null && t !== null && r !== null
        ? Math.max(0.1, 1.6 - a - t - r)
        : null;
      const A2 = a !== null && c !== null
        ? Math.max(0.1, 1.6 - a - c - d)
        : null;

      updateResults({ A, A1, A2 });
    }
  };

  return (
    <div id="d-dependency" className="tab-content">
      <div className="help-card">
        <div className="text-info mb-2 text-base font-semibold">
          ضریب وابستگی اقتصادی (نسخه 2015 FRAME)
        </div>
        <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
          این ضریب حساسیت فعالیت‌ها به توقف ناشی از آتش‌سوزی را بر اساس نسبت
          ارزش افزوده به گردش مالی برآورد می‌کند.
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">انتخاب گروه فعالیت</label>
        <select
          value={dependencyType}
          onChange={(e) => {
            setDependencyType(e.target.value);
            if (e.target.value !== "manual") {
              setDependencyManual("");
            }
          }}
        >
          <option value="">-- انتخاب کنید --</option>
          <option value="0.8">
            صنایع فناوری پیشرفته (مثلاً هوافضا) - 0.7 تا 0.9 (میانگین 0.8)
          </option>
          <option value="0.6">
            صنایع دقیق (مثلاً الکترونیک) - 0.45 تا 0.7 (میانگین 0.6)
          </option>
          <option value="0.35">
            صنایع تولیدی - 0.25 تا 0.45 (میانگین 0.35)
          </option>
          <option value="0.1">
            شرکت‌های تجاری و انبارها - 0.05 تا 0.15 (میانگین 0.1)
          </option>
          <option value="0.8">خدمات اداری - 0.8</option>
          <option value="0.3">میانگین کسب‌وکارها - 0.3</option>
          <option value="manual">-- ورود دستی --</option>
        </select>
      </div>

      <div className="input-group">
        <label className="input-label">ورود دستی مقدار d (0 تا 1)</label>
        <input
          type="number"
          value={dependencyManual}
          onChange={(e) => setDependencyManual(e.target.value)}
          min="0"
          max="1"
          step="0.01"
          placeholder="مثلاً 0.45"
          disabled={dependencyType !== "manual"}
          className={dependencyType !== "manual" ? "opacity-50" : ""}
        />
      </div>

      <button className="btn btn-primary" onClick={handleCalculate}>
        محاسبه ضریب d
      </button>

      {results && results.d !== null && results.d !== undefined && (
        <div className="result-display mt-4">
          <div className="text-success font-semibold">
            ضریب d = {results.d.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

