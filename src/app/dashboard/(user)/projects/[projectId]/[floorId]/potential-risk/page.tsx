"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import PotentialRiskTabs from "@/components/potential-risk/PotentialRiskTabs";
import QFactorTab from "@/components/potential-risk/QFactorTab";
import IFactorTab from "@/components/potential-risk/IFactorTab";
import VFactorTab from "@/components/potential-risk/VFactorTab";
import GFactorTab from "@/components/potential-risk/GFactorTab";
import EFactorTab from "@/components/potential-risk/EFactorTab";
import ZFactorTab from "@/components/potential-risk/ZFactorTab";
import PotentialRiskResultsWrapper from "@/components/potential-risk/PotentialRiskResults";
import { useParams } from "next/navigation";

export default function PotentialRisk({ }) {
  const [activeTab, setActiveTab] = useState("q-factor");
  const { projectId, floorId } = useParams();

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
          <QFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "i-factor" && (
          <IFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "v-factor" && (
          <VFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "g-factor" && (
          <GFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "e-factor" && (
          <EFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "z-factor" && (
          <ZFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        <PotentialRiskResultsWrapper projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
      </div>
    </section>
  );
}
