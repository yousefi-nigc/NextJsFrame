"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { useParams } from "next/navigation";
import AcceptableRiskTabs from "@/components/acceptable-risk/AcceptableRiskTabs";
import AcceptableRiskResults from "@/components/acceptable-risk/AcceptableRiskResults";
import ActivationFactorTab from "@/components/acceptable-risk/ActivationFactorTab";
import EvacuationTimeTab from "@/components/acceptable-risk/EvacuationTimeTab";
import ValueFactorTab from "@/components/acceptable-risk/ValueFactorTab";
import EnvironmentFactorTab from "@/components/acceptable-risk/EnvironmentFactorTab";
import DependencyFactorTab from "@/components/acceptable-risk/DependencyFactorTab";

export default function AcceptableRisk() {
  const [activeTab, setActiveTab] = useState("a-activation");
  const { projectId, floorId } = useParams();

  const tabs = [
    { id: "a-activation", label: "ضریب فعال‌سازی (a)" },
    { id: "t-evacuation", label: "زمان تخلیه (t)" },
    { id: "c-value", label: "ضریب ارزش (c)" },
    { id: "r-environment", label: "ضریب محیطی (r)" },
    { id: "d-dependency", label: "ضریب وابستگی (d)" },
  ];

  return (
    <section id="acceptable-risk" className="section">
      <div className="card">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="card-title">
            <div className="w-10 h-10 bg-linear-to-br from-success to-info dark:from-primary dark:to-secondary rounded-lg flex items-center justify-center text-white text-xl">
              ✅
            </div>
            محاسبه سطح پذیرش (A)
          </h2>
        </div>

        <div className="formula-card">
          <div className="text-info mb-2 text-base font-semibold">
            فرمول‌های محاسبه سطح پذیرش
          </div>

          <div className="formula-content space-y-3" dir="ltr">
            <p dir="rtl">برای ساختمان:</p>
            <BlockMath math={`A = 1.6 - a - t - c`} />

            <p dir="rtl">برای افراد:</p>
            <BlockMath math={`A_1 = 1.6 - a - t - r`} />

            <p dir="rtl">برای فعالیت‌ها:</p>
            <BlockMath math={`A_2 = 1.6 - a - c - d`} />
          </div>
        </div>

        <AcceptableRiskTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "a-activation" && (
          <ActivationFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "t-evacuation" && (
          <EvacuationTimeTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "c-value" && (
          <ValueFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "r-environment" && (
          <EnvironmentFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "d-dependency" && (
          <DependencyFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        <AcceptableRiskResults projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
      </div>
    </section>
  );
}
