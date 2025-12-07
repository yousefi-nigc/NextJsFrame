"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AssessmentGetApiResponse } from "@/lib/APIResponseInterfaces";
import ProtectionLevelTabs from "@/components/protection-level/ProtectionLevelTabs";
import ProtectionLevelResultsWrapper from "@/components/protection-level/ProtectionLevelResults";
import WFactorTab from "@/components/protection-level/WFactorTab";
import NFactorTab from "@/components/protection-level/NFactorTab";
import SFactorTab from "@/components/protection-level/SFactorTab";
import FFactorTab from "@/components/protection-level/FFactorTab";
import UFactorTab from "@/components/protection-level/UFactorTab";
import YFactorTab from "@/components/protection-level/YFactorTab";

export default function ProtectionLevel() {
  const [activeTab, setActiveTab] = useState("w-water");
  const { projectId, floorId } = useParams();

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
          <WFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "n-normal" && (
          <NFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "s-special" && (
          <SFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "f-resistance" && (
          <FFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "u-escape" && (
          <UFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        {activeTab === "y-salvage" && (
          <YFactorTab projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
        )}

        <ProtectionLevelResultsWrapper projectId={projectId?.toString() || ""} floorId={floorId?.toString() || ""} />
      </div>
    </section>
  );
}
