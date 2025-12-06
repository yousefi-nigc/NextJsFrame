"use client";

import { useState } from "react";
import { CalculationResults } from "@/types";
import { BlockMath } from "react-katex";
import ProtectionLevelTabs from "@/components/protection-level/ProtectionLevelTabs";
import ProtectionLevelResults from "@/components/protection-level/ProtectionLevelResults";
import WFactorTab from "@/components/protection-level/WFactorTab";
import NFactorTab from "@/components/protection-level/NFactorTab";
import SFactorTab from "@/components/protection-level/SFactorTab";
import FFactorTab from "@/components/protection-level/FFactorTab";
import UFactorTab from "@/components/protection-level/UFactorTab";
import YFactorTab from "@/components/protection-level/YFactorTab";

interface ProtectionLevelSectionProps {
  results?: CalculationResults;
  updateResults?: (updates: Partial<CalculationResults>) => void;
}

export default function ProtectionLevel({
  results: externalResults,
  updateResults: externalUpdateResults,
}: ProtectionLevelSectionProps = {}) {
  const [activeTab, setActiveTab] = useState("w-water");

  // Internal state management if props not provided
  const [internalResults, setInternalResults] = useState<CalculationResults>({
    q: null, i: null, g: null, e: null, v: null, z: null,
    a: null, t: null, c: null, r: null, d: null,
    W: null, N: null, S: null, F: null, U: null, Y: null,
    P: null, P1: null, P2: null,
    A: null, A1: null, A2: null,
    D: null, D1: null, D2: null,
    R: null, R1: null, R2: null,
  });

  const results = externalResults || internalResults;
  const updateResults = externalUpdateResults || ((updates: Partial<CalculationResults>) => {
    setInternalResults((prev) => ({ ...prev, ...updates }));
  });

  // Ensure results is always defined
  const safeResults = results || {
    q: null, i: null, g: null, e: null, v: null, z: null,
    a: null, t: null, c: null, r: null, d: null,
    W: null, N: null, S: null, F: null, U: null, Y: null,
    P: null, P1: null, P2: null,
    A: null, A1: null, A2: null,
    D: null, D1: null, D2: null,
    R: null, R1: null, R2: null,
  };

  const tabs = [
    { id: "w-water", label: "سیستم‌های آب (W)" },
    { id: "n-normal", label: "تجهیزات عادی (N)" },
    { id: "s-special", label: "تجهیزات خاص (S)" },
    { id: "f-resistance", label: "مقاومت آتش (F)" },
    { id: "u-escape", label: "فرار و نجات (U)" },
    { id: "y-salvage", label: "نجات اموال (Y)" },
  ];

  return (
    <section id="protection-level" className="section">
      <div className="card">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="card-title">
            <div className="w-10 h-10 bg-linear-to-br from-warning to-danger dark:from-primary dark:to-secondary rounded-lg flex items-center justify-center text-white text-xl">
              🛡️
            </div>
            محاسبه سطح حفاظت (D)
          </h2>
        </div>

        <div className="formula-card">
          <div className="text-primary mb-3 text-lg font-semibold">
            فرمول‌های محاسبه سطح حفاظت
          </div>

          <div className="formula-content" dir="ltr">
            <p dir="rtl">برای ساختمان:</p>
            <BlockMath math="D = W \times N \times S \times F" />
            <p dir="rtl">برای افراد:</p>
            <BlockMath math="D_1 = N \times U" />
            <p dir="rtl">برای فعالیت‌ها:</p>
            <BlockMath math="D_2 = W \times N \times S \times Y" />
          </div>
        </div>

        <ProtectionLevelTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "w-water" && (
          <WFactorTab results={safeResults} updateResults={updateResults} />
        )}

        {activeTab === "n-normal" && (
          <NFactorTab results={safeResults} updateResults={updateResults} />
        )}

        {activeTab === "s-special" && (
          <SFactorTab results={safeResults} updateResults={updateResults} />
        )}

        {activeTab === "f-resistance" && (
          <FFactorTab results={safeResults} updateResults={updateResults} />
        )}

        {activeTab === "u-escape" && (
          <UFactorTab results={safeResults} updateResults={updateResults} />
        )}

        {activeTab === "y-salvage" && (
          <YFactorTab results={safeResults} updateResults={updateResults} />
        )}

        <ProtectionLevelResults results={safeResults} />
      </div>
    </section>
  );
}
