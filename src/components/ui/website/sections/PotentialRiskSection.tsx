"use client";

import { useState } from "react";
import { CalculationResults } from "@/types";
import {
  calculateQ,
  // calculateI,
  // calculateG,
  // calculateE,
  // calculateV,
  // calculateZ,
  calculateTotalP,
  // calculateHRR,
} from "@/utils/calculations";
import { BlockMath } from "react-katex";

interface PotentialRiskSectionProps {
  results: CalculationResults;
  updateResults: (updates: Partial<CalculationResults>) => void;
}

export default function PotentialRiskSection({
  results,
  updateResults,
}: PotentialRiskSectionProps) {
  const [activeTab, setActiveTab] = useState("q-factor");

  const [showQiGuide, setShowQiGuide] = useState(false);
  const [showQmGuide, setShowQmGuide] = useState(false);
  const [showQTable, setShowQTable] = useState(false);
  const [showITable, setShowITable] = useState(false);
  const [showZGuide, setShowZGuide] = useState(false);
  const [showgGuide, setShowgGuide] = useState(false);

  // Q Factor State
  const [qi, setQi] = useState(800);
  const [qm, setQm] = useState(500);

  // I Factor State
  const [showTWeightedTable] = useState(false);
  // const [selectedTMode] = useState("reference");
  const [showDimsModal] = useState(false);
  // const [multiSelectVisible] = useState(false);

  // G Factor State
  // const [sectionLength, setSectionLength] = useState(0);
  // const [sectionWidth, setSectionWidth] = useState(0);
  // const [sectionArea, setSectionArea] = useState(0);
  // const [accessType, setAccessType] = useState<"wide" | "narrow">("wide");

  // E Factor State
  // const [floorNumber, setFloorNumber] = useState(1);

  // V Factor State
  // minimal state to avoid React read-only warnings; no calc logic
  const [windowArea, setWindowArea] = useState<number | "">(0);
  const [staticVentArea, setStaticVentArea] = useState<number | "">(0);
  const [ventMode, setVentMode] = useState<"manual" | "advanced">("manual");
  const [mechanicalVentFlow, setMechanicalVentFlow] = useState<number | "">(0);
  const [qvAdvanced, setQvAdvanced] = useState<number | "">("");
  const [cdAdvanced, setCdAdvanced] = useState<number | "">(0.65);
  const [deltaPAdvanced, setDeltaPAdvanced] = useState<number | "">(25);
  const [rhoAdvanced, setRhoAdvanced] = useState<number | "">(1.2);
  const [compartmentArea, setCompartmentArea] = useState<number | "">(100);
  const [ventingRatio, setVentingRatio] = useState<number | "">(0.01);
  const [qmVentilation, setQmVentilation] = useState<number | "">(500);
  const [ceilingHeight, setCeilingHeight] = useState<number | "">(3);

  // Z Factor State
  // const [accessDistance, setAccessDistance] = useState(0);
  // const [accessWidth, setAccessWidth] = useState(0);
  // const [obstacles, setObstacles] = useState(0);
  // const [height, setHeight] = useState(0);

  const handleCalculateQ = () => {
    const q = calculateQ(qi, qm);
    if (q !== null) {
      updateResults({ q });
      const { P, P1, P2 } = calculateTotalP({ ...results, q });
      updateResults({ P, P1, P2 });
    }
  };

  // const handleCalculateG = () => {
  //   const g = calculateG(sectionLength, sectionWidth, accessType);
  //   if (g !== null) {
  //     updateResults({ g });
  //     const { P, P1, P2 } = calculateTotalP({ ...results, g });
  //     updateResults({ P, P1, P2 });
  //   }
  // };

  // const handleCalculateE = () => {
  //   const e = calculateE(floorNumber);
  //   updateResults({ e });
  //   const { P, P1, P2 } = calculateTotalP({ ...results, e });
  //   updateResults({ P, P1, P2 });
  // };

  // const handleCalculateZ = () => {
  //   const z = calculateZ(accessDistance, accessWidth, obstacles, height);
  //   updateResults({ z });
  //   const { P, P1, P2 } = calculateTotalP({ ...results, z });
  //   updateResults({ P, P1, P2 });
  // };

  const tabs = [
    { id: "q-factor", label: "ضریب بار آتش (q)" },
    { id: "i-factor", label: "ضریب گسترش (i)" },
    { id: "v-factor", label: "ضریب تهویه (v)" },
    { id: "g-factor", label: "ضریب سطح (g)" },
    { id: "e-factor", label: "ضریب طبقه (e)" },
    { id: "z-factor", label: "ضریب دسترسی (z)" },
  ];

  return (
    <section id="potential-risk" className="section">
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

        {/* Tabs */}
        <div className="tabs flex gap-0 mb-8 border-b-2 border-gray-200 justify-between overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab text-sm px-2 ${
                activeTab === tab.id ? "active" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Q Factor Tab */}
        {activeTab === "q-factor" && (
          <div>
            <div className="formula-card">
              <div className="text-primary mb-3 text-lg font-semibold">
                فرمول محاسبه q
              </div>
              <div className="formula-content" dir="ltr">
                <BlockMath math="q = \frac{2}{3} \times \log_{10}(Q_i + Q_m) - 0.55" />
              </div>
            </div>

            <div className="help-card">
              <div className="mb-2 font-semibold text-primary">
                توضیحات کاربردی
              </div>
              <div className="pr-3 md:pr-5">
                <ul className="text-gray-500 leading-relaxed text-sm list-disc mb-2.5 dark:text-white">
                  <li>
                    <b>q</b> نمایانگر شدت بار آتش است؛ تابع لگاریتمی از مجموع
                    بار آتش ثابت و متحرک بر واحد سطح.
                  </li>
                  <li>
                    برای برآورد <b>Qi</b> و <b>Qm</b> می‌توان به راهنمای پایین
                    مراجعه کرد
                    <button
                      type="button"
                      onClick={() => setShowQTable(true)}
                      className="text-sm underline text-primary mr-1"
                    >
                      <a href="#table-section">جدول‌های کمک 🔎</a>
                    </button>
                  </li>
                  <li>
                    با افزایش بار آتش به مقادیر بالا، q به ‌آرامی رشد می‌کند و
                    خطری در به خطا افتادن تخمین‌ها وجود ندارد.
                  </li>
                  <li> Q_i + Q_m .باید مخالف صفر باشد </li>
                </ul>
              </div>
            </div>

            <div className="input-group relative">
              <label className="input-label">
                بار آتش ثابت (Qi)
                <button
                  type="button"
                  onClick={() => setShowQiGuide((prev) => !prev)}
                  className="text-[10px] font-semibold py-0.5 px-1 mr-1.5 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
                >
                  راهنما
                </button>
              </label>
              <div className="">
                <input
                  type="number"
                  id="qi"
                  min="0"
                  step="100"
                  value={qi}
                  onChange={(e) => setQi(parseFloat(e.target.value) || 0)}
                  className="flex-1"
                />
                <p className="text-sm px-4 py-3.5 rounded-lg">MJ/m²</p>
              </div>

              {/* Qi Guide Card */}
              {showQiGuide && (
                <ul className="relative text-gray-500 dark:text-gray-300 left-0 mt-2 p-4 bg-[#e0f7fa] dark:bg-[#0f3460] text-sm rounded-lg shadow-md border border-[#00bfae30] dark:border-[#2196f380] w-full z-20">
                  <li>
                    <b>A. کاملاً غیرقابل احتراق (مانند بتن / فقط فولاد):</b> 0
                  </li>
                  <li>
                    <b>
                      B. سازه غیرقابل احتراق با حداکثر ۱۰٪ اجزای قابل احتراق
                      مجاز مانند پنجره‌ها، پوشش سقف و غیره:
                    </b>{" "}
                    100
                  </li>
                  <li>
                    <b>C1. سازه چوبی با تکمیل با مواد غیرقابل احتراق:</b> 300
                  </li>
                  <li>
                    <b>C2. سازه بنایی با کف‌ها و تیرهای چوبی:</b> 300
                  </li>
                  <li>
                    <b>D. سازه غیرقابل احتراق با پوشش نهایی قابل احتراق:</b>{" "}
                    1000
                  </li>
                  <li>
                    <b>E. سازه کاملاً قابل احتراق:</b> 1500
                  </li>
                </ul>
              )}
            </div>

            <div className="input-group">
              <label className="input-label">
                بار آتش متحرک (Qm)
                <button
                  type="button"
                  onClick={() => setShowQmGuide((prev) => !prev)}
                  className="text-[10px] font-semibold py-0.5 px-1 mr-1.5 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
                >
                  راهنما
                </button>
              </label>
              <div className="">
                <input
                  type="number"
                  id="qm"
                  min="0"
                  step="100"
                  value={qm}
                  onChange={(e) => setQm(parseFloat(e.target.value) || 0)}
                  className="flex-1"
                />
                <p className="text-sm px-4 py-3.5 rounded-lg">MJ/m²</p>
              </div>

              {/* Qm Guide Card */}
              {showQmGuide && (
                <ul className="relative left-0 mt-2 p-4 bg-[#e0f7fa] dark:bg-[#0f3460] text-sm rounded-lg shadow-md border border-[#00bfae30] dark:border-[#2196f380] w-full z-20">
                  <li>خطر آتش‌سوزی کم (LH): 200</li>
                  <li>اداری: 400 (بازه: 80–550)</li>
                  <li>مسکونی: 500 (بازه: 330–780)</li>
                  <li>مدرسه: 200 (بازه: 215–340)</li>
                  <li>بیمارستان: 250 (بازه: 100–330)</li>
                  <li>هتل: 250 (بازه: 310–330)</li>
                  <li>خطر معمولی با بار کم (OH1): 600</li>
                  <li>خطر معمولی با بار متوسط (OH2): 1500</li>
                  <li>خطر معمولی با بار زیاد (OH3): 2000</li>
                  <li>خطر معمولی با بار بسیار زیاد (OH4): 2500</li>
                  <li>کلاس خطر زیاد HH1: 2500</li>
                  <li>کلاس خطر زیاد HH2: 3000</li>
                  <li>کلاس خطر زیاد HH3: 3750</li>
                  <li>ذخیره قفسه‌ای: 6750</li>
                  <li>انبار محافظت‌شده با قطر بزرگ: 7500</li>
                  <li>انبار ESFR (ارتفاع ۷ متر): 12000 (بازه: 0)</li>
                  <li>انبار ESFR (۵.۵ بار): 15000 (بازه: 0)</li>
                </ul>
              )}
            </div>

            <button className="btn btn-primary" onClick={handleCalculateQ}>
              محاسبه ضریب q
            </button>

            {results.q !== null && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary">
                <div className="result-value">{results.q.toFixed(3)}</div>
                <div className="text-sm text-gray-600 text-center">
                  (Q = {(qi + qm).toLocaleString()} MJ/m²)
                </div>
              </div>
            )}

            {/* Table guide */}
            <div
              id="table-section"
              className={`transition-all duration-300 ${
                showQTable ? "block" : "hidden"
              }`}
            >
              {showQTable && (
                <div className="card mt-4 p-4 dark:bg-[#0f3460] rounded-lg shadow-md border border-[#35363630] dark:border-[#2196f380] max-w-full overflow-x-auto">
                  <b>راهنمای انتخاب سریع:</b>

                  {/* Qi Table */}
                  <table className="table-auto border-collapse w-full mt-2 text-sm">
                    <thead>
                      <tr className="bg-[#f5f5f5] dark:bg-gray-700">
                        <th className="border border-neutral-300 px-2 py-1 md:py-3 text-right">
                          نوع ساخت‌وساز
                        </th>
                        <th className="border border-neutral-300 px-2 py-1 md:py-3">
                          MJ/m²
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          A. کاملاً غیرقابل احتراق (مانند بتن / فقط فولاد)
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          0
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          B. سازه غیرقابل احتراق با حداکثر ۱۰٪ اجزای قابل احتراق
                          مجاز مانند پنجره‌ها، پوشش سقف و غیره
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          100
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          C1. سازه چوبی با تکمیل با مواد غیرقابل احتراق
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          300
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          C2. سازه بنایی با کف‌ها و تیرهای چوبی
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          300
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          D. سازه غیرقابل احتراق با پوشش نهایی قابل احتراق
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          1000
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          E. سازه کاملاً قابل احتراق
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          1500
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Qm Table */}
                  <table className="table-auto border-collapse w-full mt-4 text-sm">
                    <thead>
                      <tr className="bg-[#f5f5f5] dark:bg-gray-700">
                        <th className="border border-neutral-300 px-2 py-1 md:py-3 text-right">
                          دسته‌بندی
                        </th>
                        <th className="border border-neutral-300 px-2 py-1 md:py-3">
                          Qm (MJ/m²)
                        </th>
                        <th className="border border-neutral-300 px-2 py-1 md:py-3">
                          بازه (MJ/m²)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          a. اشغال با خطر آتش‌سوزی کم (LH یا Light Hazard)
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          200
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          —
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          a1. دفتر کار
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          400
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          80 – 550
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          a2. واحد مسکونی
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          500
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          330 – 780
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          a3. مدرسه
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          200
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          215 – 340
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          a4. بیمارستان
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          250
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          100 – 330
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          a5. هتل
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          250
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          310 – 330
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          b. خطر آتش‌سوزی معمولی با بار آتش کم (OH1 / NFPA: OH
                          Gp1)
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          600
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          —
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          c. خطر آتش‌سوزی معمولی با بار آتش متوسط (OH2 / NFPA OH
                          Gp2)
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          1500
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          —
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          d. خطر آتش‌سوزی معمولی با بار آتش زیاد (OH3 / NFPA OH
                          Gp2+)
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          2000
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          —
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          e. خطر آتش‌سوزی معمولی با بار آتش بسیار زیاد (OH4)
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          2500
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          —
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          f. کلاس خطر زیاد HH1
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          2500
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          —
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          g. کلاس خطر زیاد HH2 (NFPA EH Gp1)
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          3000
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          —
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          h. کلاس خطر زیاد HH3 (NFPA EH Gp2)
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          3750
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          —
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          i. ذخیره قفسه‌ای (Rack storage)
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          6750
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          —
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          j. انبار محافظت‌شده با اسپرینکلر قطر بزرگ (Large Drop)
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          7500
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          —
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          k. انبار محافظت‌شده ESFR با ارتفاع ۷ متر
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          12000
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          0
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          l. انبار محافظت‌شده ESFR فشار 5.5 بار
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          15000
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          0
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <button
                    type="button"
                    className="mt-3 btn btn-primary"
                    onClick={() => setShowQTable(false)}
                  >
                    بستن راهنمای جداول
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* I Factor Tab */}
        {activeTab === "i-factor" && (
          <div id="i-factor" className="tab-content">
            <div className="formula-card">
              <div className="text-primary mb-3 text-lg font-semibold">
                فرمول محاسبه i
              </div>
              <div
                className="formula-content"
                style={{ direction: "ltr", textAlign: "center" }}
              >
                <BlockMath
                  math={`i = 1 - \\frac{T}{1000} - (0.1 \\times \\log_{10} m) + \\frac{M}{10}`}
                />
              </div>
            </div>

            <div className="help-card">
              <div className="text-primary mb-3 font-semibold">
                توضیحات مهندسی و ارتباط با سرعت رشد حریق (HRR)
              </div>
              <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
                <ul className="list-disc text-sm pr-5">
                  <li className="mb-1.5">
                    <b>i</b> بیانگر سرعت و نرخ رشد آتش است. هر چه مقدار بالاتر
                    باشد، رشد آتش سریع‌تر است.
                  </li>
                  <li className="mb-1.5">
                    مقدار <b>i</b> معمولاً بین <b>0.5 تا 1.65</b> (سقف تجربی:
                    0.4 تا 1.8) قرار می‌گیرد.
                  </li>
                  <li className="mb-1.5">
                    ارتباط i با &quot;نرخ آزادسازی گرما HRR&quot;:
                    <br />
                    <span className="bg-[#f5f5f5] dark:bg-primary-light rounded-sm inline-block py-0.5 px-1.5">
                      HRR (kW/m²) = 25 × 10<sup>i</sup>
                    </span>
                    <br />
                    مقدار HRR برای رشد آتش را نمایش می‌دهد.
                  </li>

                  <li className="mb-1.5">
                    مثال‌ها: <br />
                    <b>فلزات (بتن):</b> i=0.5 → HRR=<b>80</b> kW/m² |
                    <b>اداری (رزیدنشیال):</b> i=1.0 → HRR=250 kW/m² |
                    <b>پلی‌استایرن:</b> i=1.65 → HRR=1120 kW/m²
                  </li>
                </ul>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                دمای تخریب T (درجه سانتیگراد)
              </label>
              <select
                id="temp-destruction"
                // onChange={noop}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-[#2c3e50] dark:text-white"
              >
                <option value="20">
                  a. مایعات قابل‌اشتعال — 21°C تا 70°F (≈20°C میانگین)
                </option>
                <option value="100">
                  b. پلاستیک / لوازم الکترونیکی / انسان — 100°C (212°F)
                </option>
                <option value="200">
                  c. منسوجات، چوب، کاغذ، غذا — 200°C (400°F)
                </option>
                <option value="250" selected>
                  d. متوسط محتویات ساختمان مسکونی — 250°C (482°F)
                </option>
                <option value="300">
                  e. ماشین‌آلات، لوازم خانگی — 300°C (572°F)
                </option>
                <option value="400">f. اجسام فلزی — 400°C (752°F)</option>
                <option value="500">
                  g. مواد غیرقابل‌احتراق (مصالح ساختمانی) — 500°C (932°F)
                </option>
                <option value="multi">📊 انتخاب چند دما (میانگین وزنی)</option>
              </select>
            </div>

            {/* weighted T table (kept hidden by default) */}
            <div
              id="t-weighted-table"
              style={{
                display: showTWeightedTable ? "block" : "none",
                marginTop: 10,
              }}
            >
              <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-slate-700">
                <table className="w-full text-sm text-right">
                  <thead className="bg-gray-100 dark:bg-gray-800 font-semibold">
                    <tr>
                      <th className="p-2 border-b border-gray-200">انتخاب</th>
                      <th className="p-2 border-b border-gray-200">
                        دمای T (°C)
                      </th>
                      <th className="p-2 border-b border-gray-200">توضیحات</th>
                      <th className="p-2 border-b border-gray-200">درصد (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        t: 20,
                        desc: "a. مایعات قابل‌اشتعال — 21°C تا 70°F (≈20°C میانگین)",
                      },
                      {
                        t: 100,
                        desc: "b. پلاستیک / لوازم الکترونیکی / انسان — 100°C (212°F)",
                      },
                      {
                        t: 200,
                        desc: "c. منسوجات، چوب، کاغذ، غذا — 200°C (400°F)",
                      },
                      {
                        t: 250,
                        desc: "d. متوسط محتویات ساختمان مسکونی — 250°C (482°F)",
                      },
                      {
                        t: 300,
                        desc: "e. ماشین‌آلات، لوازم خانگی — 300°C (572°F)",
                      },
                      { t: 400, desc: "f. اجسام فلزی — 400°C (752°F)" },
                      {
                        t: 500,
                        desc: "g. مواد غیرقابل‌احتراق (مصالح ساختمانی) — 500°C (932°F)",
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className="odd:bg-white even:bg-gray-50 dark:even:bg-slate-800 dark:odd:bg-slate-900"
                      >
                        <td className="p-2 text-center">
                          <input
                            type="checkbox"
                            // onChange={noop}
                          />
                        </td>
                        <td className="p-2 text-center">{row.t}</td>
                        <td className="p-2">{row.desc}</td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            defaultValue={0}
                            min={0}
                            max={100}
                            disabled
                            // onChange={noop}
                            className="w-20 p-1 border rounded"
                          />{" "}
                          %
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-bold bg-gray-100 dark:bg-gray-800">
                      <td colSpan={3} className="p-2 text-left">
                        جمع درصدها:
                      </td>
                      <td className="p-2 text-center">0 %</td>
                    </tr>
                    <tr className="font-bold bg-green-50 dark:bg-green-900/20">
                      <td colSpan={3} className="p-2 text-left">
                        دمای وزنی (Weighted T):
                      </td>
                      <td className="p-2 text-center">250 °C</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div style={{ marginBottom: 10 }}>
              <label>
                <b>ابعاد متوسط محتویات m (متر):</b>
              </label>

              <div className="mt-2 space-y-2">
                <div>
                  <label className="inline-flex items-center mr-3">
                    <input
                      type="radio"
                      name="m-mode"
                      value="formula"
                      // onChange={noop}
                      className="mr-2"
                    />
                    فرمول محاسباتی میانگین هندسی ابعاد
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="m-mode"
                      value="reference"
                      defaultChecked
                      // onChange={noop}
                      className="mr-2"
                    />
                    مقادیر مرجع
                  </label>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    id="avg-dimension"
                    step="0.001"
                    min="0.001"
                    max="2"
                    placeholder="m"
                    style={{ flex: 1 }}
                    className="p-2 border rounded"
                  />
                  <button
                    type="button"
                    id="btn-dims"
                    className="btn-add hidden"
                    // onClick={noop}
                  >
                    🧮 ورود ابعاد
                  </button>
                </div>

                <div
                  id="m-ref-guide"
                  style={{
                    display: "none",
                    fontSize: "0.9em",
                    color: "#333",
                    background: "#f0f8ff",
                    padding: 8,
                    borderRadius: 5,
                    marginTop: 6,
                  }}
                >
                  <b>مقادیر مرجع:</b>
                  <p className="mt-2">
                    رایج‌ترین مقدار مورد استفاده برای m= <b>0.3</b> است که به
                    عنوان میانگین ابعاد اکثر اشیاء در محیط روزمره ما در نظر
                    گرفته می‌شود.
                  </p>
                  <p className="mt-2">
                    سایر مقادیر معمول عبارتند از:
                    <br />
                    انبار کردن کالا روی پالت: <b>1</b> =m
                    <br />
                    صنایع تولیدکننده اجسام کوچک: <b>0.1</b>=m
                    <br />
                    صنایع تولیدکننده کالاهای نوع فیلمی (ورقه‌ای): <b>0.01</b> =m
                    <br />
                    غلات، پلت و کالاهای مشابه: <b>0.001</b> =m
                  </p>
                </div>
              </div>
            </div>

            {/* dims modal (kept hidden) */}
            <div
              id="dims-modal"
              className="chart-modal"
              style={{ display: showDimsModal ? "block" : "none" }}
            >
              <div className="chart-container" style={{ maxWidth: 500 }}>
                <h3>ورود ابعاد اشیاء (متر)</h3>

                <table
                  id="dims-table"
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "center",
                  }}
                >
                  <thead>
                    <tr>
                      <th className="p-2 border">بُعد</th>
                      <th className="p-2 border">مقدار (متر)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* rows can be dynamically generated by logic if needed */}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i}>
                        <td className="p-2 border">{i + 1}</td>
                        <td className="p-2 border">
                          <input
                            type="number"
                            step="0.001"
                            min="0.001"
                            className="dim-input w-full p-1 border rounded"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-3 text-right">
                  <button
                    type="button"
                    className="btn-add"
                    // onClick={noop}
                  >
                    محاسبه m
                  </button>
                </div>

                <div id="m-calc-result" className="mt-3 font-semibold"></div>

                <button
                  type="button"
                  className="btn-close mt-3"
                  // onClick={noop}
                >
                  ✖
                </button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                کلاس واکنش در برابر آتش M
                <button
                  type="button"
                  onClick={() => setShowITable(!showITable)}
                  className="text-[10px] font-semibold py-0.5 px-1 mr-1.5 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
                >
                  جدول
                </button>
              </label>

              <select
                id="fire-class"
                // onChange={noop}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-[#2c3e50] dark:text-white"
              >
                <option value="0">
                  A1 - طبق EN13501-1 یا غیرقابل‌احتراق (M=0)
                </option>
                <option value="0.5">
                  A2 - طبق EN13501-1 یا تقریباً غیرقابل‌احتراق (M=0.5)
                </option>
                <option value="1">
                  B - طبق EN13501 یا EN12845 Cat. I : سخت برای اشتعال
                  (خودخاموش‌شونده) (M=1)
                </option>
                <option value="2">C - طبق EN13501-1 : مواد کندسوز (M=2)</option>
                <option value="3">
                  D - طبق EN13501 یا EN12845 Cat. II : سطوح قابل‌احتراق (M=3)
                </option>
                <option value="4">
                  E - طبق EN13501-1 یا EN12845 Cat. III : سطوح قابل‌اشتعال (M=4)
                </option>
                <option value="5" selected>
                  F - طبق EN12845 Cat. IV : سطوح بسیار قابل‌اشتعال (M=5)
                </option>
                <option value="multi">📊 انتخاب چندکلاسی (میانگین وزنی)</option>
              </select>

              {/* i table */}
              {showITable && (
                <div
                  // id="table-section"
                  className={`transition-all duration-300 ${
                    showITable ? "block" : "hidden"
                  }`}
                >
                  <table
                    className="table-auto border-collapse w-full mt-2 text-sm"
                    style={{ fontSize: "0.93em" }}
                  >
                    <thead>
                      <tr className="bg-[#f5f5f5] dark:bg-gray-700">
                        <th className="border border-neutral-300 text-right px-2 py-1 md:py-3">
                          EN13501-1
                        </th>
                        <th className="border border-neutral-300 text-right px-2 py-1 md:py-3">
                          M
                        </th>
                        <th className="border border-neutral-300 text-right px-2 py-1 md:py-3">
                          مثال
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          A1
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          0
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          بتن، سنگ، فولاد
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          A2
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          0.5
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          شیشه، آجر نسوز
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          B
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          1
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          گچ، پانل دیرسوز
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          C
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          2
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          چوب طبیعی، کفپوش پارکت
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          D
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          3
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          فرش پلاستیکی، پلیمرها
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          E
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          4
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          فوم‌های قابل اشتعال
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          F
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          5
                        </td>
                        <td className="border border-neutral-300 px-2 py-1 md:py-3">
                          پلی‌استایرن منبسط
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* 
              <div
                id="multi-select-container"
                style={{
                  display: multiSelectVisible ? "block" : "none",
                  marginTop: 10,
                  border: "1px solid #ccc",
                  padding: 8,
                  borderRadius: 5,
                }}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="p-2">انتخاب</th>
                      <th className="p-2">کلاس + توضیحات</th>
                      <th className="p-2">درصد</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { v: 0, t: "A1 (M=0) : طبق EN13501-1 | غیرقابل‌احتراق" },
                      {
                        v: 0.5,
                        t: "A2 (M=0.5) : تقریباً غیرقابل‌احتراق | EN13501-1",
                      },
                      {
                        v: 1,
                        t: "B (M=1) : سخت برای اشتعال (خودخاموش‌شونده) | EN12845 Cat. I",
                      },
                      { v: 2, t: "C (M=2) : مواد کندسوز | EN13501-1" },
                      {
                        v: 3,
                        t: "D (M=3) : سطوح قابل‌احتراق | EN12845 Cat. II",
                      },
                      {
                        v: 4,
                        t: "E (M=4) : سطوح قابل‌اشتعال | EN12845 Cat. III",
                      },
                      {
                        v: 5,
                        t: "F (M=5) : سطوح بسیار قابل‌اشتعال | EN12845 Cat. IV",
                      },
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-2 text-center">
                          <input
                            type="checkbox"
                            value={row.v}
                            // onChange={noop}
                          />
                        </td>
                        <td className="p-2">{row.t}</td>
                        <td className="p-2">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            defaultValue={0}
                            // onChange={noop}
                            className="p-1 border rounded w-20"
                          />
                          %
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-2 font-bold">
                  M میانگین وزنی: <span id="weightedM">0</span>
                </div>
              </div> */}

              <div
                id="class-hint"
                className="input-hint"
                style={{ display: "none" }}
              ></div>
            </div>

            <div className="mt-4">
              <button
                className="btn btn-primary"
                // onClick={noop}
              >
                محاسبه ضریب i
              </button>
            </div>

            <div className="result-display mt-4" id="i-result"></div>
          </div>
        )}

        {/* V Factor Tab */}
        {activeTab === "v-factor" && (
          <div id="v-factor" className="tab-content">
            <div className="formula-card" dir="ltr">
              <div className="text-primary mb-3 text-lg font-semibold">
                فرمول محاسبه v
              </div>
              <div className="formula-content">
                <BlockMath
                  math={`v = 0.84 + 0.1 \\times \\log(Q_m) - \\sqrt{k \\times \\sqrt{h}}`}
                />
              </div>
            </div>

            <div className="help-card">
              <div className="text-primary mb-3 font-semibold">توضیحات</div>
              <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
                ضریب تهویه تأثیر دود و حرارت داخل ساختمان را نشان می‌دهد. <br />
                <b>
                  k = نسبت مساحت بازشوهای تخلیه دود به مساحت کف (معمولاً 0.01 تا
                  0.02)
                </b>
              </div>
            </div>

            {/* ورودی‌های ریز بازشوها و تهویه مکانیکی */}
            <div className="input-group">
              <label className="input-label">
                مساحت کل پنجره‌ها و نورگیرها (A<sub>w</sub>)
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="windowArea"
                  min="0"
                  step="0.01"
                  value={windowArea}
                  onChange={(e) =>
                    setWindowArea(
                      e.target.value === "" ? "" : parseFloat(e.target.value)
                    )
                  }
                  className="w-full"
                />
                <span className="input-unit">m²</span>
              </div>
              <div className="input-hint">
                جمع مساحت پنجره‌ها و نورگیرهای قابل باز شدن به بیرون
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                مساحت دریچه‌های ثابت (A<sub>s</sub>)
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="staticVentArea"
                  min="0"
                  step="0.01"
                  value={staticVentArea}
                  onChange={(e) =>
                    setStaticVentArea(
                      e.target.value === "" ? "" : parseFloat(e.target.value)
                    )
                  }
                  className="w-full"
                />
                <span className="input-unit">m²</span>
              </div>
              <div className="input-hint">
                جمع مساحت دریچه‌های ثابت تخلیه دود
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">دبی تهویه مکانیکی</label>

              <div style={{ margin: "0.25rem 0" }}>
                <label className="mr-3">
                  <input
                    type="radio"
                    name="ventMode"
                    value="manual"
                    checked={ventMode === "manual"}
                    onChange={() => setVentMode("manual")}
                  />{" "}
                  حالت دستی
                </label>
                <label>
                  <input
                    type="radio"
                    name="ventMode"
                    value="advanced"
                    checked={ventMode === "advanced"}
                    onChange={() => setVentMode("advanced")}
                  />{" "}
                  حالت پیشرفته
                </label>
              </div>

              {/* حالت دستی */}
              <div
                id="manual-vent"
                className={ventMode === "manual" ? "" : "hidden"}
              >
                <div className="input-wrapper">
                  <input
                    type="number"
                    id="mechanicalVentFlow"
                    min="0"
                    step="1"
                    value={mechanicalVentFlow}
                    onChange={(e) =>
                      setMechanicalVentFlow(
                        e.target.value === "" ? "" : parseFloat(e.target.value)
                      )
                    }
                    className="w-full"
                  />
                  <span className="input-unit">Nm³/h</span>
                </div>
                <div className="input-hint">اگر وجود ندارد صفر وارد کنید</div>
              </div>

              {/* حالت پیشرفته */}
              <div
                id="advanced-vent"
                className={
                  ventMode === "advanced"
                    ? "mt-2 p-3 rounded-md border border-dashed"
                    : "hidden"
                }
                style={{
                  background: "#f9f9f9",
                  borderStyle: "dashed",
                  borderColor: "#ccc",
                }}
              >
                <div
                  style={{
                    fontSize: "0.9rem",
                    marginBottom: "0.8rem",
                    lineHeight: 1.6,
                    backgroundColor: "#eef6fb",
                    padding: "0.6rem",
                    borderLeft: "4px solid #2196F3",
                    borderRadius: 4,
                  }}
                >
                  <b>فرمول محاسبه طبق NFPA 204 و EN TR 12101-4:</b>
                  <br />
                  <code>Qv = Cd × A × √(2 × ΔP / ρ)</code>
                  <br />
                  که Qv بر حسب m³/s است و پس از محاسبه، به Nm³/h تبدیل می‌شود.
                  <br />
                  <span style={{ color: "#555" }}>
                    Cd: ضریب تخلیه — ΔP: اختلاف فشار (Pa) — ρ: چگالی هوا (kg/m³)
                  </span>
                </div>

                <div className="input-group">
                  <label>Qv (m³/s)</label>
                  <input
                    type="number"
                    id="qv-advanced"
                    step="0.001"
                    value={qvAdvanced}
                    onChange={(e) =>
                      setQvAdvanced(
                        e.target.value === "" ? "" : parseFloat(e.target.value)
                      )
                    }
                    className="w-full"
                  />
                </div>
                <div className="input-group">
                  <label>Cd</label>
                  <input
                    type="number"
                    id="cd-advanced"
                    step="0.01"
                    value={cdAdvanced}
                    onChange={(e) =>
                      setCdAdvanced(parseFloat(e.target.value || "0"))
                    }
                    className="w-full"
                  />
                </div>
                <div className="input-group">
                  <label>ΔP (Pa)</label>
                  <input
                    type="number"
                    id="deltaP-advanced"
                    step="1"
                    value={deltaPAdvanced}
                    onChange={(e) =>
                      setDeltaPAdvanced(parseFloat(e.target.value || "0"))
                    }
                    className="w-full"
                  />
                </div>
                <div className="input-group">
                  <label>ρ (kg/m³)</label>
                  <input
                    type="number"
                    id="rho-advanced"
                    step="0.01"
                    value={rhoAdvanced}
                    onChange={(e) =>
                      setRhoAdvanced(parseFloat(e.target.value || "0"))
                    }
                    className="w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    /* placeholder - no logic */
                  }}
                  className="btn"
                >
                  محاسبه از فرمول پیشرفته
                </button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">مساحت کل کف (A)</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="compartmentArea"
                  min="1"
                  step="0.01"
                  value={compartmentArea}
                  onChange={(e) =>
                    setCompartmentArea(
                      e.target.value === "" ? "" : parseFloat(e.target.value)
                    )
                  }
                  className="w-full"
                />
                <span className="input-unit">m²</span>
              </div>
              <div className="input-hint">کل مساحت فضای مورد نظر</div>
            </div>

            <button
              className="btn btn-secondary mb-6"
              type="button"
              onClick={() => {
                /* placeholder auto-calc - no logic */
              }}
            >
              محاسبه خودکار k بر اساس بازشوها
            </button>

            <div className="input-group">
              <label className="input-label">نسبت تهویه (k)</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="venting-ratio"
                  readOnly
                  step="0.001"
                  value={ventingRatio}
                  className="w-full"
                />
              </div>
              <div className="input-hint" id="k-details">
                نسبت مساحت بازشوهای مؤثر به مساحت کف (بر اساس داده‌های بالا)
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">بار آتش متحرک (Qm)</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="qm-ventilation"
                  min="0"
                  step="100"
                  value={qmVentilation}
                  onChange={(e) =>
                    setQmVentilation(
                      e.target.value === "" ? "" : parseFloat(e.target.value)
                    )
                  }
                  className="w-full"
                />
                <span className="input-unit">MJ/m²</span>
              </div>
              <div className="input-hint">
                همان مقدار استفاده شده در محاسبه q
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">ارتفاع سقف (h)</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="ceiling-height"
                  min="2"
                  max="15"
                  step="0.5"
                  value={ceilingHeight}
                  onChange={(e) =>
                    setCeilingHeight(
                      e.target.value === "" ? "" : parseFloat(e.target.value)
                    )
                  }
                  className="w-full"
                />
                <span className="input-unit">متر</span>
              </div>
              <div className="input-hint">
                ارتفاع از کف تا سقف (حداکثر 15 متر)
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                /* placeholder - no logic */
              }}
            >
              محاسبه ضریب v
            </button>

            <div
              className="result-display"
              id="v-result"
              style={{ marginTop: "1rem" }}
            />
          </div>
        )}

        {/* G Factor Tab */}
        {activeTab === "g-factor" && (
          <div id="g-factor" className="tab-content">
            {/* Formula Card */}
            <div className="formula-card">
              <div className="text-primary mb-3 text-lg font-semibold">
                فرمول محاسبه <b>g</b>
              </div>

              <div className="formula-content" dir="ltr">
                <BlockMath
                  math={`g = \\frac{b + 5 \\times \\sqrt[3]{b^2 \\times l}}{200}`}
                />
              </div>

              <div
                className="text-[0.95em] text-green-700 mt-1"
                id="area-tip"
                style={{ direction: "ltr" }}
              ></div>
            </div>

            {/* Help Card */}
            <div className="help-card">
              <div>
                <b>توضیح:</b>
                <span className="mr-1 text-gray-500 leading-relaxed text-sm dark:text-white">
                  ضریب سطح، مقدار گسترش افقی آتش را بسته به ابعاد بخش و نوع پلان
                  نشان می‌دهد. هرچه مساحت و شکل ساختمان به مربع نزدیک‌تر باشد (l
                  ≈ b) و راهرو دسترسی به دلیل طول زیاد باریک‌تر باشد، g بزرگ‌تر
                  خواهد شد.
                </span>
              </div>

              <h2
                className="cursor-pointer mt-3 text-primary font-semibold inline-block border-b"
                onClick={() => setShowgGuide((prev) => !prev)}
              >
                راهنمای محاسبه ضریب g{" "}
                <span className="text-[0.8em] text-gray-500">(کلیک کنید)</span>
              </h2>

              {showgGuide && (
                <div className="text-gray-500  leading-relaxed text-sm dark:text-white mt-2">
                  <p>
                    ضریب <b>g</b> تأثیر افقی آتش را بر اساس ابعاد و نوع دسترسی
                    آتش‌نشانی نشان می‌دهد.
                  </p>

                  <ol className="list-decimal pr-5 space-y-1">
                    <li>طول (l) را اندازه بگیرید.</li>
                    <li>
                      عرض (b) را اندازه بگیرید یا مساحت کل (A) را داشته باشید.
                    </li>
                    <li>نوع دسترسی را مشخص کنید (wide یا narrow).</li>
                    <li>اگر narrow انتخاب شد، طول و عرض جابجا می‌شوند.</li>
                    <li>
                      مقادیر را وارد کنید تا مطابق فرمول محاسبه شود:
                      <code className="mr-2">
                        g = (b + 5 × ∛(b² × l)) / 200
                      </code>
                    </li>
                  </ol>
                </div>
              )}
            </div>

            {/* نوع دسترسی */}
            <div className="input-group">
              <label>
                نوع دسترسی به ساختمان
                <span
                  className="input-help"
                  // onClick={() => showGuide("access")}
                >
                  ؟
                </span>
              </label>
              <select id="access-type" className="border p-2 rounded w-full">
                <option value="wide">دسترسی از ضلع عریض (wide)</option>
                <option value="narrow">دسترسی از ضلع باریک (narrow)</option>
              </select>
            </div>

            {/* طول بخش */}
            <div className="input-group">
              <label>
                طول بخش (l)
                <span
                  className="input-help"
                  // onClick={() => showGuide("length")}
                >
                  ؟
                </span>
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="section-length"
                  min="1"
                  step="1"
                  defaultValue={30}
                  className="border p-2 rounded w-full"
                />
                <span className="input-unit">متر</span>
              </div>
            </div>

            {/* عرض بخش */}
            <div className="input-group">
              <label>
                عرض بخش (b)
                <span
                  className="input-help"
                  // onClick={() => showGuide("width")}
                >
                  ؟
                </span>
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="section-width"
                  min="1"
                  step="1"
                  defaultValue={20}
                  className="border p-2 rounded w-full"
                />
                <span className="input-unit">متر</span>
              </div>
            </div>

            {/* مساحت اختیاری */}
            <div className="input-group">
              <label>
                یا مساحت (اختیاری)
                <span
                  className="input-help"
                  // onClick={() => showGuide("area")}
                >
                  ؟
                </span>
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="section-area"
                  min="1"
                  step="1"
                  placeholder="اختیاری"
                  className="border p-2 rounded w-full"
                />
                <span className="input-unit">متر مربع</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              // onClick={() => calculateG()}
            >
              محاسبه ضریب g
            </button>

            <div className="result-display mt-4" id="g-result"></div>
          </div>
        )}

        {/* E Factor Tab */}
        {activeTab === "e-factor" && (
          <div id="e-factor" className="tab-content">
            <div className="formula-card">
              <div className="text-primary mb-3 text-lg font-semibold">
                فرمول محاسبه e
              </div>

              <div className="formula-content" dir="ltr">
                <BlockMath
                  math={`e = \\left[\\frac{|E| + 3}{|E| + 2}\\right]^{0.7 \\times |E|}`}
                />
              </div>
            </div>

            <div className="help-card mb-[0.7em]">
              <div className="text-primary mb-3 font-semibold">
                توضیحات مهندسی
              </div>
              <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
                ضریب طبقه، اثر ارتفاع یا عمق طبقه نسبت به سطح زمین را لحاظ
                می‌کند.
                <br />
                هرچه طبقه موردنظر بالاتر یا پایین‌تر باشد، <b>e</b> بیشتر شده و
                ریسک افزایش می‌یابد.
                <br />
                <span className="text-[#7986cb]">
                  برای طبقات با گالری/نیم‌طبقه (مثل سالن‌های چندسطحی)، مقدار
                  اعشاری وارد کنید.
                  <br />
                  <i>مثال: طبقه اول با ۴۰٪ مساحت گالری → عدد 1.4</i>
                </span>
              </div>
            </div>

            <button
              id="special-guide-btn"
              className="btn bg-primary-dark text-white text-sm mb-3"
            >
              📖 راهنمای آتریوم ، نیم‌طبقه ، لوفت و دوبلکس
            </button>

            <div className="input-group">
              <label htmlFor="floor-E" className="input-label">
                شماره طبقه (E)
              </label>

              <input
                type="number"
                step="0.01"
                id="floor-E"
                className="inline-block w-[140] ml-3 md:ml-6 md:w-[200px]"
                min="-4"
                max="150"
                placeholder="مثلاً 0, 2, 1.4"
              />

              <select
                id="preset-floor-E"
                className="inline-block w-[140px] md:w-[200px]"
                onChange={(e) => e.target.value}
              >
                <option disabled selected>
                  انتخاب سریع
                </option>
                <option value="-2">زیرزمین 2</option>
                <option value="-1">زیرزمین 1</option>
                <option value="0">همکف</option>
                <option value="1">طبقه اول</option>
                <option value="2">طبقه دوم</option>
                <option value="3">طبقه سوم</option>
                <option value="4">طبقه چهارم</option>
                <option value="5">پنجم/بالاتر</option>
              </select>
            </div>

            <button
              className="btn btn-primary"
              // onClick={() => calculateE()}
            >
              محاسبه ضریب e
            </button>

            <div id="e-result" className="result-display mt-[1.2em]"></div>
          </div>
        )}

        {/* Z Factor Tab */}
        {activeTab === "z-factor" && (
          <div id="z-factor" className="tab-content mt-6">
            <div className="formula-card">
              <div className="mb-3 flex items-center justify-center">
                <h3 className="text-primary text-lg font-semibold">
                  {" "}
                  فرمول محاسبه z
                </h3>
                <button
                  type="button"
                  onClick={() => setShowZGuide((prev) => !prev)}
                  className="text-[10px] font-semibold py-0.5 px-1 mr-1.5 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
                >
                  راهنما 📖
                </button>
              </div>

              <div className="formula-content" dir="ltr">
                <BlockMath
                  math={`z = 1 + 0.05 \\times INT\\left[\\frac{b}{20 \\times Z} + \\left(\\frac{H^+}{25} \\text{ or } \\frac{H^-}{3}\\right)\\right]`}
                />
              </div>

              {showZGuide && (
                <div
                  id="z-help"
                  className="text-gray-500 leading-relaxed text-sm mt-2 dark:text-white"
                >
                  <h4 className="font-semibold">جزءها:</h4>
                  <ul>
                    <li>
                      <b>INT</b> = فقط قسمت صحیح عدد (rounded down).
                    </li>
                    <li>
                      <b>b</b> = عرض مؤثر ساختمان (متر).
                    </li>
                    <li>
                      <b>Z</b> = تعداد جبهه‌های دسترسی آتش‌نشانی (۱ تا ۴).
                    </li>
                    <li>
                      <b>H⁺</b> = ارتفاعی که باید از سطح دسترسی تا محل حریق به
                      بالا رفت (متر).
                    </li>
                    <li>
                      <b>H⁻</b> = عمقی که باید به پایین رفت تا به محل حریق رسید
                      (متر).
                    </li>
                  </ul>

                  <p>
                    <b>مقسوم‌علیه ثابت‌ها:</b>
                  </p>
                  <ul>
                    <li>
                      ۲۰ متر = طول استاندارد یک شلنگ آتش‌نشانی در بسیاری از
                      کشورها.
                    </li>
                    <li>۲۵ متر = ارتفاع مرجع نردبان هوایی.</li>
                    <li>۳ متر = ارتفاع تقریبی یک زیرزمین.</li>
                  </ul>

                  <div className="flex items-center justify-center gap-1">
                    <h4 className="font-semibold">الف) قسمت اول:</h4>
                    <BlockMath math={`\\frac{b}{20 \\times Z}`} />
                  </div>

                  <ul>
                    <li>
                      اگر فقط از یک سمت شود (Z = 1)، عرض مؤثر را بر ۲۰ متر تقسیم
                      می‌کنیم تا بفهمیم چند شلنگ سری لازم است.
                    </li>
                    <li>
                      هر چه Z بیشتر باشد (دسترسی از چند سمت)، این عدد کوچک‌تر و
                      دسترسی آسان‌تر می‌شود.
                    </li>
                  </ul>

                  <h4 className="font-semibold flex items-center justify-center gap-1">
                    ب) قسمت دوم:
                    <div
                      className="flex items-center justify-center gap-1"
                      dir="ltr"
                    >
                      <BlockMath math={"\\frac{H^+}{25}"} />
                      <span className="my-1 inline-block">یا</span>
                      <BlockMath math={"\\frac{H^-}{3}"} />
                    </div>
                  </h4>

                  <p>
                    <span className="font-semibold">بالا رفتن (H⁺):</span>{" "}
                    ارتفاع از محل توقف ماشین آتش‌نشانی تا طبقه محل حریق تقسیم بر
                    ۲۵ متر.
                  </p>
                  <ul className="">
                    <li>۲۵ متر = طول مرجع نردبان‌ها و محدودیت پمپ آب.</li>
                  </ul>

                  <p>
                    <span className="font-semibold" dir="lrt">
                      پایین رفتن (H⁻):
                    </span>{" "}
                    عمق زیر سطح دسترسی تقسیم بر ۳ متر.
                  </p>
                  <ul className="">
                    <li>
                      ۳ متر: ارتفاع معمولی یک طبقه زیرزمین؛ این عمق با دود/حرارت
                      جهت بالا کار را سخت‌تر می‌کند.
                    </li>
                  </ul>

                  <h4 className="font-semibold">پ) قسمت سوم: INT[…]</h4>
                  <p>
                    INT یعنی فقط قسمت صحیح عدد محاسبه‌شده بدون گرد کردن اعشار.
                  </p>

                  <p>
                    <b>محدوده z:</b> از 1.00 (دسترسی عالی) تا حدود 1.20 (محدود)
                    یا بیشتر در شرایط خاص.
                  </p>
                </div>
              )}
            </div>

            <div className="help-card">
              <div className="text-primary mb-3 font-semibold">توضیحات</div>
              <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
                ضریب دسترسی میزان سهولت دسترسی آتش‌نشانان به محل را نشان می‌دهد.
                INT بخش صحیح عدد است. برای طبقات بالا از H+ و برای زیرزمین از H-
                استفاده کنید. <br />
                <b>Z:</b> تعداد جبهه‌های دسترسی مستقل آتش‌نشانی (عدد صحیح: 1 تا
                4)
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">عرض مؤثر ساختمان (b)</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="section-width-z"
                  min="1"
                  step="0.1"
                  defaultValue={20}
                />
                <span className="input-unit">متر</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">تعداد جبهه دسترسی (Z)</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="access-directions-z"
                  min="1"
                  max="4"
                  step="1"
                  defaultValue={1}
                />
                <span className="input-unit">عدد</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                ارتفاع بالای سطح دسترسی (H+)
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="height-above-z"
                  min="0"
                  step="1"
                  defaultValue={0}
                />
                <span className="input-unit">متر</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">عمق زیر سطح دسترسی (H-)</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="height-below-z"
                  min="0"
                  step="1"
                  defaultValue={0}
                />
                <span className="input-unit">متر</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              // onClick={() => calculateZ()}
            >
              محاسبه ضریب z
            </button>

            <div className="result-display mt-4" id="z-result"></div>
          </div>
        )}

        {/* Total P Results */}
        {(results.P !== null || results.P1 !== null || results.P2 !== null) && (
          <div className="mt-8 p-6 bg-linear-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-500">
            <h3 className="text-xl font-bold text-green-700 mb-4 text-center">
              نتایج ریسک بالقوه
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {results.P !== null && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">P</div>
                  <div className="text-3xl font-bold text-primary mt-2">
                    {results.P.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">برای ساختمان</div>
                </div>
              )}
              {results.P1 !== null && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">P₁</div>
                  <div className="text-3xl font-bold text-primary mt-2">
                    {results.P1.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">برای افراد</div>
                </div>
              )}
              {results.P2 !== null && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">P₂</div>
                  <div className="text-3xl font-bold text-primary mt-2">
                    {results.P2.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    برای فعالیت‌ها
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="results-grid" style={{ marginTop: "2rem" }}>
          <div className="result-card">
            <h3>ریسک ساختمان</h3>
            <div className="result-value" id="total-p">
              -
            </div>
          </div>
          <div className="result-card">
            <h3>ریسک افراد</h3>
            <div className="result-value" id="total-p1">
              -
            </div>
          </div>
          <div className="result-card">
            <h3>ریسک فعالیت‌ها</h3>
            <div className="result-value" id="total-p2">
              -
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            className="btn btn-secondary"
            // onclick="calculateTotalP()"
          >
            محاسبه همه سطوح ریسک
          </button>
        </div>
      </div>
    </section>
  );
}
