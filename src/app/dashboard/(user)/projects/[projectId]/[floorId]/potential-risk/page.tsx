"use client";

import { useState } from "react";
import { CalculationResults } from "@/types";
import { BlockMath } from "react-katex";
import PotentialRiskTabs from "@/components/potential-risk/PotentialRiskTabs";
import PotentialRiskResults from "@/components/potential-risk/PotentialRiskResults";
import QFactorTab from "@/components/potential-risk/QFactorTab";
import IFactorTab from "@/components/potential-risk/IFactorTab";
import VFactorTab from "@/components/potential-risk/VFactorTab";
import GFactorTab from "@/components/potential-risk/GFactorTab";
import EFactorTab from "@/components/potential-risk/EFactorTab";
import ZFactorTab from "@/components/potential-risk/ZFactorTab";

interface PotentialRiskSectionProps {
  results?: CalculationResults;
  updateResults?: (updates: Partial<CalculationResults>) => void;
}

export default function PotentialRisk({
  results: externalResults,
  updateResults: externalUpdateResults,
}: PotentialRiskSectionProps = {}) {
  const [activeTab, setActiveTab] = useState("q-factor");

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
    { id: "q-factor", label: "ضریب بار آتش (q)" },
    { id: "i-factor", label: "ضریب گسترش (i)" },
    { id: "v-factor", label: "ضریب تهویه (v)" },
    { id: "g-factor", label: "ضریب سطح (g)" },
    { id: "e-factor", label: "ضریب طبقه (e)" },
    { id: "z-factor", label: "ضریب دسترسی (z)" },
  ];

  return (
    <section id="potential-risk" className="">
      <div className="card">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="card-title">
            <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-xl">
              🎯
            </div>
            محاسبه ریسک بالقوه (P)
          </h2>
        </div>

        {/* Formula Card */}
        <div className="formula-card">
          <div className="text-primary mb-3 text-lg font-semibold">
            فرمول محاسبه ریسک بالقوه
          </div>
          <div className="formula-content" dir="ltr">
            <p dir="rtl">برای ساختمان:</p>
            <BlockMath math="P = q \times i \times g \times e \times v \times z" />
            <p dir="rtl">برای افراد:</p>
            <BlockMath math="P_1 = q \times i \times e \times v \times z" />
            <p dir="rtl">برای فعالیت‌ها:</p>
            <BlockMath math="P_2 = i \times g \times e \times v \times z" />
          </div>
        </div>

        {/* Help Card */}
        <div className="help-card">
          <div className="text-info mb-2 text-base font-semibold">
            راهنمای محاسبه
          </div>
          <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
            ریسک بالقوه نشان‌دهنده میزان خطر احتمالی حریق در ساختمان است. این
            مقدار از ضرب شش عامل اصلی محاسبه می‌شود که هر کدام جنبه‌ای از خطر
            حریق را نشان می‌دهند.
          </div>
        </div>

        <PotentialRiskTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "q-factor" && (
          <QFactorTab results={safeResults} updateResults={updateResults} />
        )}

        {activeTab === "i-factor" && (
          <IFactorTab results={safeResults} updateResults={updateResults} />
        )}

        {activeTab === "v-factor" && (
          <VFactorTab results={safeResults} updateResults={updateResults} />
        )}

        {activeTab === "g-factor" && (
          <GFactorTab results={safeResults} updateResults={updateResults} />
        )}

        {activeTab === "e-factor" && (
          <EFactorTab results={safeResults} updateResults={updateResults} />
        )}

        {activeTab === "z-factor" && (
          <ZFactorTab results={safeResults} updateResults={updateResults} />
        )}

        <PotentialRiskResults results={safeResults} />
      </div>
    </section>
  );
}
