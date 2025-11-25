"use client";

import { useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import { CalculationResults } from "@/src/types";
import { initialCalculationResults } from "@/src/utils/calculations";
import Header from "@/src/components/ui/website/Header";
import Sidebar from "@/src/components/ui/website/Sidebar";
import PotentialRiskSection from "@/src/components/ui/website/sections/PotentialRiskSection";
import AcceptableRiskSection from "@/src/components/ui/website/sections/AcceptableRiskSection";
import ProtectionLevelSection from "@/src/components/ui/website/sections/ProtectionLevelSection";
import InitialRiskSection from "@/src/components/ui/website/sections/InitialRiskSection";
import FinalRiskSection from "@/src/components/ui/website/sections/FinalRiskSection";
import ReportSection from "@/src/components/ui/website/sections/ReportSection";

export default function Home() {
  const [activeSection, setActiveSection] = useState("potential-risk");
  const [results, setResults] = useState<CalculationResults>(
    initialCalculationResults
  );
  const [isModalOpen, setIsModalOpen] = useState(true);

  const updateResults = (updates: Partial<CalculationResults>) => {
    setResults((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen">
      {/* PAGE SCROLL WRAPPER */}
      <div className={`overflow-hidden ${isModalOpen ? "max-h-screen" : ""}`}>
        <Header />

        {/* Intro Banner */}
        <div className="text-center bg-blue-50 text-blue-900 font-vazir text-lg py-3 px-4 lg:mx-auto max-w-4xl rounded-lg border border-blue-200 my-4 mx-8">
          این نرم‌افزار در راستای اجرای احکام قانون برنامه پنجساله هفتم پیشرفت
          جمهوری اسلامی ایران و هم‌سو با سیاست‌های دولت در ایمن‌سازی ساختمان‌ها،
          ارتقاء تاب‌آوری شهری، بهبود مدیریت بحران و تقویت خدمات آتش‌نشانی توسعه
          یافته است.
        </div>

        {/* Main Container */}
        <div className="mx-auto px-8 my-8 xl-1440:max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[230px_1fr] lg:gap-4 xl:grid-cols-[280px_1fr] xl:gap-8 mb-8">
            {/* Sidebar */}
            <Sidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />

            {/* Main Content */}
            <main className="content">
              {activeSection === "potential-risk" && (
                <PotentialRiskSection
                  results={results}
                  updateResults={updateResults}
                />
              )}
              {activeSection === "acceptable-risk" && (
                <AcceptableRiskSection
                  results={results}
                  updateResults={updateResults}
                />
              )}
              {activeSection === "protection-level" && (
                <ProtectionLevelSection
                  results={results}
                  updateResults={updateResults}
                />
              )}
              {activeSection === "initial-risk" && (
                <InitialRiskSection
                  results={results}
                  updateResults={updateResults}
                />
              )}
              {activeSection === "final-risk" && (
                <FinalRiskSection
                  results={results}
                  updateResults={updateResults}
                />
              )}
              {activeSection === "report" && (
                <ReportSection results={results} />
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Frame Guide Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-9999 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          <div
            id="frame-guide-modal"
            className="relative w-full max-w-3xl max-h-[90vh] overflow-auto 
            font-vazir p-8 rounded-3xl bg-blue-50 border-2 border-blue-600 shadow-2xl
            dark:bg-card-bg dark:border-border-color dark:text-primary"
          >
            <span
              className="absolute left-3 top-3 sm:top-5 sm:left-6 text-blue-600 text-xl cursor-pointer"
              onClick={() => setIsModalOpen((prev) => !prev)}
            >
              ✖️
            </span>

            <h1 className="text-blue-900 text-3xl mb-5 flex items-center gap-3 dark:text-white font-medium">
              <span className="text-3xl">📋</span> راهنمای الزامات ارزیابی ریسک
              حریق - FRAME
            </h1>

            <p className="mb-3 text-blue-700 text-lg dark:text-amber-50">
              ⚠️ قبل از وارد کردن اطلاعات محاسباتی و شروع ارزیابی، لطفاً الزامات
              کلیدی روش FRAME را با دقت بخوانید:
            </p>

            <ul className="mb-5 text-base leading-loose list-disc list-inside space-y-2 dark:text-white">
              <li>
                <b>واحد مبنای ارزیابی:</b> هر <b>کمپارتمنت آتش</b> (یا بخش
                مستقل، معمولاً هر طبقه یا قسمت مجزا از نظر ساختاری/عملکردی) باید
                جداگانه ارزیابی شود.
              </li>
              <li>
                <b>در ساختمان‌های چند طبقه:</b>
                ارزیابی باید برای هر طبقه یا هر بخش مجزا به صورت مستقل انجام
                گیرد؛ مگر کل ساختمان از لحاظ خطر و حفاظت یکپارچه باشد.
              </li>
              <li>
                <b>اطلاعات ضروری قبل از شروع:</b>
                <ol className="mr-6 mt-2 space-y-1">
                  <li>
                    مشخصات هر طبقه/کمپارتمنت (کاربری، ابعاد، بار آتش، سیستم‌های
                    حفاظت)
                  </li>
                  <li>اطلاعات افراد حاضر و نوع فعالیت‌های بحرانی در ساختمان</li>
                  <li>جزییات مسیرهای خروج و دسترسی نیروهای امدادی</li>
                </ol>
              </li>
              <li>
                <b>هر ارزیابی برای یک بخش خاص:</b>
                ابتدا یک طبقه یا کمپارتمنت را انتخاب و ارزیابی‌اش را تا انتها
                انجام دهید؛ در صورت نیاز، برای طبقات/بخش‌های بعدی، همین فرایند
                را تکرار کنید.
              </li>
              <li>
                <span className="text-green-700 dark:text-lime-500">
                  <b>داده‌های دقیق</b>
                </span>{" "}
                و مستند وارد کنید تا نتایج قابل اتکا و توصیه‌های اصلاحی، کاربردی
                باشند.
              </li>
            </ul>

            <div className="bg-blue-100 text-blue-900 p-4 rounded-lg text-sm dark:text-white dark:bg-(--bg-secondary)">
              <b>یادآوری:</b> نتایج هر ارزیابی صرفاً مربوط به همان
              طبقه/کمپارتمنت است و ممکن است نیاز به اقدامات متفاوتی در طبقات
              مختلف ساختمان داشته باشید.
            </div>

            <button
              onClick={() => setIsModalOpen((prev) => !prev)}
              className="bg-blue-500 text-white border-none py-3 px-8 rounded-lg text-lg mt-6 mx-auto block shadow-lg cursor-pointer transition-all hover:bg-blue-600"
            >
              <span className="text-xl">🚀</span>&nbsp;شروع ارزیابی
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
