"use client";

import { useState } from "react";
import { CalculationResults } from "@/types";
// import {
//   calculateA,
//   calculateT,
//   calculateC,
//   calculateR,
//   calculateD,
//   calculateTotalA,
// } from "@/utils/calculations";
import { BlockMath } from "react-katex";

interface AcceptableRiskSectionProps {
  results: CalculationResults;
  updateResults: (updates: Partial<CalculationResults>) => void;
}

export default function AcceptableRisk({
  results,
  updateResults,
}: AcceptableRiskSectionProps) {
  const [showCalcDescription, setShowCalcDescription] = useState(false);

  // const [activityType, setActivityType] = useState("office");
  // const [area, setArea] = useState(0);
  // const [length, setLength] = useState(0);
  // const [width, setWidth] = useState(0);
  // const [occupants, setOccupants] = useState(0);
  // const [exitWidths, setExitWidths] = useState([0.6]);
  // const [mobilityFactor, setMobilityFactor] = useState(1);
  // const [heightAbove, setHeightAbove] = useState(0);
  // const [heightBelow, setHeightBelow] = useState(0);
  // const [replaceability, setReplaceability] = useState(0);
  // const [valueEUR2000, setValueEUR2000] = useState(0);
  // const [environmentType, setEnvironmentType] = useState("normal");
  // const [dependencyLevel, setDependencyLevel] = useState(0);

  const toggleCalcDescription = () => {
    setShowCalcDescription((prev) => !prev);
  };

  // const handleCalculateA = () => {
  //   const a = calculateA(activityType);
  //   updateResults({ a });
  //   const { A, A1, A2 } = calculateTotalA({ ...results, a });
  //   updateResults({ A, A1, A2 });
  // };

  // const handleCalculateT = () => {
  //   const t = calculateT(
  //     area,
  //     length,
  //     width,
  //     occupants,
  //     exitWidths,
  //     mobilityFactor,
  //     heightAbove,
  //     heightBelow
  //   );
  //   if (t !== null) {
  //     updateResults({ t });
  //     const { A, A1, A2 } = calculateTotalA({ ...results, t });
  //     updateResults({ A, A1, A2 });
  //   }
  // };

  // const handleCalculateC = () => {
  //   const c = calculateC(replaceability, valueEUR2000);
  //   updateResults({ c });
  //   const { A, A1, A2 } = calculateTotalA({ ...results, c });
  //   updateResults({ A, A1, A2 });
  // };

  // const handleCalculateR = () => {
  //   const r = calculateR(environmentType);
  //   updateResults({ r });
  //   const { A, A1, A2 } = calculateTotalA({ ...results, r });
  //   updateResults({ A, A1, A2 });
  // };

  // const handleCalculateD = () => {
  //   const d = calculateD(dependencyLevel);
  //   updateResults({ d });
  //   const { A, A1, A2 } = calculateTotalA({ ...results, d });
  //   updateResults({ A, A1, A2 });
  // };

  const tabs = [
    { id: "a-activation", label: "ضریب فعال‌سازی (a)" },
    { id: "t-evacuation", label: "زمان تخلیه (t)" },
    { id: "c-value", label: "ضریب ارزش (c)" },
    { id: "r-environment", label: "ضریب محیطی (r)" },
    { id: "d-dependency", label: "ضریب وابستگی (d)" },
  ];

  const [activeTab, setActiveTab] = useState("a-activation");

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

        {/* tabs */}
        <div className="tabs flex gap-0 mb-8 border-b-2 border-gray-200 dark:border-gray-800 justify-between overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab text-sm px-2 dark:text-gray-400 ${
                activeTab === tab.id
                  ? "active text-primary dark:text-primary"
                  : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* tab A */}
        {activeTab === "a-activation" && (
          <div id="a-activation" className="tab-content active">
            <div className="help-card">
              <div className="text-info mb-2 text-base font-semibold">
                ضریب فعال‌سازی (a)
              </div>
              <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
                این ضریب بر اساس منابع احتمالی آتش‌سوزی و فعالیت‌های خطرناک
                محاسبه می‌شود. مقادیر هر گزینه دقیقاً مطابق با جداول سند FRAME
                است.
              </div>
            </div>

            {/* ===== گروه 1: فعالیت‌های اصلی ===== */}
            <h4 className="group-title">فعالیت‌های اصلی</h4>
            <div className="input-group">
              <label className="input-label">فعالیت اصلی</label>
              <select id="main-activity" className="">
                <option value="0">
                  A1 - کاربری غیرصنعتی: اداری، مسکونی، آموزشی
                </option>
                <option value="0">
                  A2 - صنایع محصولات غیرقابل احتراق (OH1)
                </option>
                <option value="0.2">
                  B - صنایع عمومی/فروشگاه‌های بزرگ (OH2–OH3)
                </option>
                <option value="0.4">
                  C - صنایع محصولات قابل احتراق (OH4 / HH1–HH4)
                </option>
                <option value="0">D - انبارها و ذخیره‌سازی مشابه (S)</option>
              </select>
            </div>

            {/* ===== گروه 2: سیستم‌های گرمایشی ===== */}
            <h4 className="group-title">سیستم‌های گرمایشی</h4>

            {/* منبع انرژی */}
            <div className="input-group">
              <label className="input-label">منبع انرژی (G)</label>
              <select id="energy-source">
                <option value="0">G0 - قابل‌اعمال نیست</option>
                <option value="0">G1 - برق، زغال‌سنگ، نفت کوره</option>
                <option value="0.1">G2 - گاز</option>
                <option value="0.15">G3 - چوب یا ضایعات سوختنی</option>
              </select>
            </div>

            {/* نوع انتقال حرارت */}
            <div className="input-group">
              <label className="input-label">نوع انتقال حرارت (E)</label>
              <select id="heat-transfer-type">
                <option value="0">E1 -بدون گرمایش: بدون خطر</option>
                <option value="0">E2 - آب، بخار یا جامدات</option>
                <option value="0.05">E3 - هوای پرفشار یا روغن</option>
              </select>
            </div>

            {/* محل ژنراتور حرارت */}
            <div className="input-group">
              <label className="input-label">محل ژنراتور حرارت (F)</label>
              <select id="generator-location">
                <option value="0">F0 - قابل‌اعمال نیست</option>
                <option value="0">F1 - اتاق جداگانه مقاوم در برابر آتش</option>
                <option value="0.1">F2 - داخل همان کمپارتمان</option>
              </select>
            </div>

            {/* ===== گروه 3: تأسیسات الکتریکی ===== */}
            <h4 className="group-title">تأسیسات الکتریکی</h4>
            <div className="input-group">
              <label className="input-label">تأسیسات برق (I)</label>
              <select id="electrical-system">
                <option value="0">I1 - منطبق و بازرسی منظم</option>
                <option value="0.1">I2 - منطبق ولی بدون بازرسی منظم</option>
                <option value="0.2">I3 - غیرمنطبق با مقررات</option>
              </select>
            </div>

            {/* ===== گروه 4: خطرات انفجار ===== */}
            <h4 className="group-title">خطرات انفجار</h4>

            {/* مایعات و گازها */}
            <div className="input-group">
              <label className="input-label">
                مایعات و گازهای قابل اشتعال (Z)
              </label>
              <select id="flammable-liquids">
                <option value="0" selected>
                  Z - هیچکدام
                </option>
                <option value="0.3">Z0 - خطر انفجار دائمی</option>
                <option value="0.2">Z1 - خطر در شرایط عادی</option>
                <option value="0.1">Z2 - خطر گاه‌به‌گاه</option>
              </select>
            </div>

            {/* گردوغبار */}
            <div className="input-group">
              <label className="input-label">گردوغبار قابل اشتعال (K)</label>
              <select id="combustible-dust">
                <option value="0">K0 - هیچکدام</option>
                <option value="0.2">
                  K1 - خطر انفجار گردوغبار (زون 20/21/22)
                </option>
                <option value="0.1">K2 - تولید گردوغبار بدون سیستم مکش</option>
              </select>
            </div>

            {/* گروه 1.2: رنگ‌آمیزی / اسپری / پوشش */}
            <div className="input-group">
              <label className="input-label">رنگ‌آمیزی / اسپری / پوشش</label>
              <select id="painting-spraying-coating">
                <option value="0">NONE - هیچ‌کدام</option>
                <option value="0.05">N1 - در فضای جداشده با تهویه مناسب</option>
                <option value="0.1">
                  N2 - در فضای جداشده بدون تهویه اضافی
                </option>
                <option value="0.2">N3 - بدون جداسازی</option>
              </select>
            </div>

            <button className="btn btn-primary" onClick={() => {}}>
              محاسبه ضریب a
            </button>

            <div
              className="result-display"
              id="a-result"
              style={{ marginTop: "1rem" }}
            ></div>
          </div>
        )}

        {/* tab T */}
        {activeTab === "t-evacuation" && (
          <div id="t-evacuation" className="tab-content">
            <div className="formula-card">
              <div className="text-info mb-2 text-base font-semibold">
                فرمول محاسبه t (FRAME 2015)
              </div>

              <div className="formula-content">
                <BlockMath
                  math={`
t = \\frac{p \\times \\left[(b + l) + \\frac{X}{x} + 1.25\\,H^{+} + 2\\,H^{-} \\right]
\\times \\left[x \\times (b + l)\\right]}{800 \\times K \\times \\left[1.4\\,x\\,(b + l) -
0.44\\,X \\right]}
        `}
                />
              </div>

              <div className="formula-description text-sm">
                <p className="mt-4 mb-1.5">
                  <strong>t:</strong> ضریب زمان تخلیه بر اساس FRAME 2015
                </p>
                <p className="mb-1.5">
                  <strong>b, l:</strong> عرض و طول بخش (متر) – اگر خالی باشد از
                  نتایج ضریب g استفاده می‌شود
                </p>
                <p className="mb-1.5">
                  <strong>X:</strong> تعداد کل افراد – از ورودی یا ضریب اشغال
                </p>
                <p className="mb-1.5">
                  <strong>x:</strong> تعداد واحدهای خروج (هر 0.6m = 1 واحد)
                </p>
                <p className="mb-1.5">
                  <strong>K:</strong> عرض مؤثر کل خروج‌ها (متر)
                </p>
                <p className="mb-1.5">
                  <strong>p:</strong> ضریب تحرک افراد
                </p>
                <p className="mb-1.5">
                  <strong>
                    H<sup>+</sup>/H<sup>-</sup>:
                  </strong>{" "}
                  ارتفاع یا عمق نسبت به سطح دسترسی
                </p>
              </div>
            </div>

            {/* ضریب بار اشغال */}
            <div className="input-group">
              <label>
                کاربری و ضریب بار اشغال
                <span
                  className="help-icon"
                  // onClick={() => showTHelpInline('occupant-factor')}
                ></span>
              </label>
              <select id="occupant-factor">
                <option value="">-- انتخاب کنید --</option>
                <option value="3">فضاهای انتظار</option>
                <option value="1.5">محل تجمع – فشرده</option>
                <option value="0.6">محل تجمع – معمولی</option>
                <option value="0.5">کلاس مدارس</option>
                <option value="0.3">مهدکودک</option>
                <option value="0.2">آموزش فنی/کارگاه</option>
                <option value="0.1">مرکز درمانی/زندان</option>
                <option value="0.05">ساختمان مسکونی/هتل</option>
                <option value="0.3">فضای فروش (هم‌سطح)</option>
                <option value="0.2">فضای فروش (بالا)</option>
                <option value="0.1">دفتر اداری</option>
                <option value="0.03">کارخانه</option>
                <option value="0.003">انبار</option>
              </select>
            </div>

            {/* تعداد افراد X */}
            <div className="input-group">
              <label>
                تعداد افراد (X)
                <span
                  className="help-icon"
                  // onClick={() => showTHelpInline('occupants-count')}
                ></span>
              </label>
              <input
                type="number"
                id="occupants-count"
                min="0"
                step="1"
                placeholder="در صورت خالی گذاشتن، از ضریب بار اشغال محاسبه می‌شود"
              />
              <p className="input-hint">
                می‌توانید مستقیماً وارد کنید یا سیستم محاسبه کند
              </p>
            </div>

            {/* مساحت */}
            <div className="input-group">
              <label>
                مساحت بخش (m²)
                <span
                  className="help-icon"
                  // onClick={() => showTHelpInline('section-area-t')}
                ></span>
              </label>
              <input
                type="number"
                id="section-area-t"
                min="1"
                step="1"
                placeholder="یا از طول × عرض محاسبه می‌شود"
              />
            </div>

            {/* عرض مؤثر مسیر خروج */}
            <div className="input-group">
              <label>
                عرض مؤثر مسیرهای خروج (متر) – جدا با کاما
                <span
                  className="help-icon"
                  // onClick={() => showTHelpInline('exit-widths')}
                ></span>
              </label>
              <input
                type="text"
                id="exit-widths"
                placeholder="مثلاً 1.2, 0.9, 2.0"
              />
              <p className="input-hint">
                حداقل عرض مؤثر: 0.6 متر | هر 0.6 متر = 1 واحد خروج
              </p>
            </div>

            {/* عرض کل K */}
            <div className="input-group">
              <label htmlFor="manual-k">
                عرض مؤثر کل (K) - دستی
                <span
                  className="help-icon"
                  title="اگر خالی باشد، از مجموع عرض‌ها محاسبه می‌شود"
                >
                  ?
                </span>
              </label>
              <input
                type="number"
                id="manual-k"
                step="0.1"
                min="0.6"
                max="10"
                placeholder="محاسبه خودکار"
              />
              <span className="unit">متر</span>
            </div>

            {/* تعداد خروج‌های مستقیم */}
            <div className="input-group">
              <label>
                تعداد خروج‌های منتهی به فضای آزاد
                <span
                  className="help-icon"
                  // onClick={() => showTHelpInline('external-exits')}
                ></span>
              </label>
              <input
                type="number"
                id="external-exits"
                min="1"
                placeholder="خروجی مستقیم به بیرون"
              />
            </div>

            {/* ضریب تحرک p */}
            <div className="input-group">
              <label>
                ضریب تحرک (p)
                <span
                  className="help-icon"
                  // onClick={() => showTHelpInline('mobility-factor')}
                ></span>
              </label>
              <select id="mobility-factor">
                <option value="1">A – متحرک و مستقل</option>
                <option value="2">B – نیازمند راهنمایی</option>
                <option value="8">C – تحرک محدود</option>
                <option value="20">D – نیازمند کمک فردی</option>
                <option value="6.1">E – گروه مختلط</option>
              </select>
            </div>

            {/* طول و عرض بخش */}
            <div className="input-row">
              <div className="input-group">
                <label>
                  طول بخش (l) - متر
                  <span
                    className="help-icon"
                    // onClick={() => showTHelpInline('section-length')}
                  ></span>
                </label>
                <input
                  type="number"
                  id="section-length-t"
                  min="1"
                  step="0.1"
                  placeholder="بزرگترین بُعد"
                />
              </div>
              <div className="input-group">
                <label>
                  عرض بخش (b) - متر
                  <span
                    className="help-icon"
                    // onClick={() => showTHelpInline('section-width')}
                  ></span>
                </label>
                <input
                  type="number"
                  id="section-width-t"
                  min="1"
                  step="0.1"
                  placeholder="کوچکترین بُعد"
                />
              </div>
            </div>

            {/* ارتفاع‌ها */}
            <div className="input-row">
              <div className="input-group">
                <label>
                  ارتفاع بالای سطح زمین (H+) - متر
                  <span
                    className="help-icon"
                    // onClick={() => showTHelpInline('height-above')}
                  ></span>
                </label>
                <input
                  type="number"
                  id="height-above"
                  min="0"
                  step="0.1"
                  placeholder="ارتفاع طبقه"
                />
              </div>
              <div className="input-group">
                <label>
                  عمق زیر سطح زمین (H-) - متر
                  <span
                    className="help-icon"
                    // onClick={() => showTHelpInline('height-below')}
                  ></span>
                </label>
                <input
                  type="number"
                  id="height-below"
                  min="0"
                  step="0.1"
                  placeholder="عمق زیرزمین"
                />
              </div>
            </div>

            {/* نتایج میانی */}
            <div
              className="intermediate-results"
              id="t-intermediate"
              style={{ display: "none" }}
            >
              <h4>محاسبات میانی:</h4>

              <div className="calc-detail">
                <span className="calc-label">تعداد واحدهای خروج (x):</span>
                <span className="calc-value" id="calc-x"></span>
              </div>

              <div className="calc-detail">
                <span className="calc-label">عرض کل خروج‌ها (K):</span>
                <span className="calc-value" id="calc-K"></span>
                <span className="calc-unit">متر</span>
              </div>

              <div className="calc-detail">
                <span className="calc-label">زمان تخلیه:</span>
                <span className="calc-value" id="calc-time"></span>
                <span className="calc-unit">دقیقه</span>
              </div>

              <div className="calc-detail">
                <span className="calc-label">وضعیت:</span>
                <span className="calc-value" id="calc-status"></span>
              </div>
            </div>

            {/* دکمه محاسبه */}
            <button
              className="btn btn-primary"
              // onClick={() => calculateT()}
            >
              <i className="fas fa-calculator"></i> محاسبه ضریب t
            </button>

            {/* نمایش نتیجه */}
            <div
              className="result-display"
              id="t-result"
              style={{ marginTop: "1rem" }}
            ></div>

            {/* جدول مرجع سریع */}
            <div className="mt-8">
              <h4 className="font-semibold mb-6">جدول مرجع سریع زمان تخلیه</h4>
              <table className="table-auto border-collapse w-full mt-2 text-sm">
                <thead>
                  <tr className="bg-[#f5f5f5] dark:bg-gray-700">
                    <th className="border border-neutral-300 text-right px-2 py-1 md:py-3">
                      زمان تخلیه (دقیقه)
                    </th>
                    <th className="border border-neutral-300 text-right px-2 py-1 md:py-3">
                      ضریب t
                    </th>
                    <th className="border border-neutral-300 text-right px-2 py-1 md:py-3">
                      وضعیت
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      ≤ 1
                    </td>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      0
                    </td>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      عالی
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      1-2
                    </td>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      0.1
                    </td>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      خوب
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      2-3
                    </td>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      0.2
                    </td>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      متوسط
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      3-4
                    </td>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      0.3
                    </td>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      نیاز به بهبود
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      4-5
                    </td>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      0.4
                    </td>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      بحرانی
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      &gt; 5
                    </td>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      0.5
                    </td>
                    <td className="border border-neutral-300 px-2 py-1 md:py-3">
                      غیرقابل قبول
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* tab c */}
        {activeTab === "c-value" && (
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
                  <b>فرمول 2008:</b> برای V سال 2000 بزرگ‌تر از 7.1 میلیون یورو:
                  <pre style={{ direction: "ltr" }}>
                    c₂ = 0.25 × log₁₀(V / 7,100,000)
                  </pre>
                </div>

                <p>
                  <strong>تعریف V:</strong> مجموع ارزش کمپارتمنت + محتویات +
                  ارزش اقتصادی معادل ساکنان.
                </p>

                <p>
                  اگر ارزش را به سالی غیر از 2000 دارید، سال شمسی را وارد کنید
                  تا سیستم به طور خودکار به یورو سال 2000 تبدیل کند.
                </p>
              </div>
            </div>

            {/* c₁ */}
            <div className="input-group">
              <label className="input-label">قابلیت جایگزینی (c₁)</label>
              <select
                id="replaceability"
                // onChange={() => calculateC()}
              >
                <option value="0">به راحتی قابل جایگزینی</option>
                <option value="0.1">جایگزینی با تأخیر کوتاه</option>
                <option value="0.2">غیرقابل جایگزینی</option>
              </select>
            </div>

            {/* V: ارزش + سال */}
            <div className="input-group">
              <label className="input-label">
                ارزش کل ساختمان، محتویات و افراد (ریال ایران)
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="current-value-rial"
                  min="0"
                  step="1000000"
                  // onInput={() => calculateC()}
                />
                <span className="input-unit">﷼</span>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                سال ارزش جاری (شمسی / میلادی)
              </label>
              <select
                id="value-year"
                // onChange={() => calculateC()}
              >
                <option value="">انتخاب کنید</option>
                <option value="2000">
                  1379 <span style={{ color: "#999" }}>(2000)</span>
                </option>
                <option value="2005">
                  1384 <span style={{ color: "#999" }}>(2005)</span>
                </option>
                <option value="2010">
                  1389 <span style={{ color: "#999" }}>(2010)</span>
                </option>
                <option value="2015">
                  1394 <span style={{ color: "#999" }}>(2015)</span>
                </option>
                <option value="2020">
                  1399 <span style={{ color: "#999" }}>(2020)</span>
                </option>
                <option value="2021">
                  1400 <span style={{ color: "#999" }}>(2021)</span>
                </option>
                <option value="2022">
                  1401 <span style={{ color: "#999" }}>(2022)</span>
                </option>
                <option value="2023">
                  1402 <span style={{ color: "#999" }}>(2023)</span>
                </option>
                <option value="2024">
                  1403 <span style={{ color: "#999" }}>(2024)</span>
                </option>
                <option value="2025">
                  1404 <span style={{ color: "#999" }}>(2025)</span>
                </option>
              </select>
            </div>

            <button
              className="btn btn-primary"
              // onClick={() => calculateC()}
            >
              محاسبه ضریب c
            </button>

            <div
              className="result-display"
              id="c-result"
              style={{ marginTop: "1rem" }}
            ></div>

            <button
              type="button"
              onClick={toggleCalcDescription}
              className="border-b border-dotted mt-2.5  cursor-pointer"
            >
              📄 شرح فرآیند محاسبه
            </button>

            <div
              id="calc-description"
              className={`mt-2.5 p-4 border rounded-md bg-[#fafafa] leading-relaxed border-[#ccc] dark:bg-[#0f3460] dark:border-[#263238] dark:text-[#eceff1] ${
                showCalcDescription ? "block" : "hidden"
              }`}
            >
              <p className="font-bold mb-2">
                فرآیند تبدیل و محاسبه c₂ بر پایه FRAME 2008:
              </p>
              <p className="mb-2">1️⃣ ورود مقدار ارزش (ریال ایران) + سال شمسی</p>
              <p className="mb-2">
                2️⃣ تبدیل به یورو همان سال با نرخ بانک مرکزی
              </p>
              <p className="mb-2">
                3️⃣ تعدیل با شاخص ساخت‌وساز ایران → یورو سال 2000
              </p>
              <p className="mb-2">
                4️⃣ مقایسه با آستانه ۷.۱ میلیون یورو و محاسبه c₂ طبق فرمول FRAME
                2008
              </p>
              <p className="mb-2">
                5️⃣ جمع c₁ و c₂ برای استفاده در محاسبه سطح پذیرش (A)
              </p>
              <hr className="my-4 border-[#ccc] dark:border-[#263238]" />
              <p className="font-bold mb-2">
                مثال عددی (ساختمان خدماتی - سال 1404 / 2025):
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>c₁ = 0.10 (جایگزینی با تأخیر کوتاه)</li>
                <li>ارزش کل = 50٬000٬000٬000 ریال</li>
                <li>سال ارزش جاری = 1404 (2025)</li>
              </ul>
              <p className="font-bold mb-2">گام‌های محاسبه:</p>
              <p className="mb-1">🔹 نرخ یورو 2025 = 1٬100٬000 ریال/€</p>
              <p className="mb-1">🔹 شاخص ساخت 2025 = 11٬400.0</p>
              {/* <p className="mb-1">
                🔹{" "}
                <code className="dark:text-[#b0bec5]">
                  ارزش یورو همان سال = 50٬000٬000٬000 ÷ 1٬100٬000 ≈ 45٬454.55 €
                </code>
              </p>
              <p className="mb-1">
                🔹{" "}
                <code className="dark:text-[#b0bec5]">
                  ارزش معادل سال 2000 = 45٬454.55 ÷ (11400.0 ÷ 100) ≈ 398.72 €
                </code>
              </p> */}
              🔹{" "}
              <code className="dark:text-[#b0bec5]">
                ارزش یورو همان سال = 50٬000٬000٬000 ÷ 1٬100٬000 ≈ 45٬454.55 €
              </code>
              <br />
              🔹{" "}
              <code className="dark:text-[#b0bec5]">
                ارزش معادل سال 2000 = 45٬454.55 ÷ (11400.0 ÷ 100) ≈ 398.72 €
              </code>
              <p className="mb-2 mt-2">🔹 چون 398.72 € &lt; 7.1M € → c₂ = 0</p>
              <p className="font-bold mb-2">نتیجه:</p>
              <p className="mb-2">
                <code className="dark:text-[#b0bec5]">c = 0.10 + 0 = 0.10</code>
              </p>
              <p className="mb-4">
                معادل سال 2000 ≈{" "}
                <code className="dark:text-[#b0bec5]">398.72 €</code>
              </p>
              <hr className="my-4 border-[#ccc] dark:border-[#263238]" />
              <i className="text-sm text-[#666] dark:text-[#78909c]">
                (خروجی واقعی کد هنگام وارد کردن همین داده‌ها باید با این محاسبات
                یکی باشد)
              </i>
            </div>
          </div>
        )}

        {/* tab r */}
        {activeTab === "r-environment" && (
          <div id="r-environment" className="tab-content">
            {/* کارت راهنما */}
            <div className="help-card">
              <div className="text-info mb-2 text-base font-semibold">
                ضریب محیطی (r)
              </div>
              <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
                این ضریب شاخص سرعت تولید دود و حرارت است که بر مدت زمان تخلیه
                ایمن (ASET) اثر می‌گذارد. مقدار r بر اساس{" "}
                <b>بار آتش ثابت (Qi)</b> و <b>کلاس گسترش شعله (M)</b> در بدترین
                سناریوی آتش‌سوزی محاسبه می‌شود.
                <br />
                <br />
                <b>یادآوری:</b> هرچه r بزرگ‌تر باشد، آتش سریع‌تر توسعه می‌یابد و
                ASET کوتاه‌تر می‌شود.
              </div>
            </div>

            {/* کارت فرمول */}
            <div className="formula-card">
              <div className="text-info mb-2 text-base font-semibold">
                فرمول محاسبه{" "}
              </div>

              <div className="formula-content">
                <div className="math-formula" dir="ltr">
                  <BlockMath
                    math={`r = 0.1 \\times \\log_{10}(Qi + 1) + \\frac{M}{10}`}
                  />
                </div>

                <ul>
                  <li>
                    <b>Qi</b>: بار آتش ثابت (MJ/m²)
                  </li>
                  <li>
                    <b>M</b>: کلاس گسترش شعله (۰ تا ۵)
                  </li>
                </ul>
              </div>
            </div>

            {/* ورودی‌های محاسبه */}
            <div className="input-group">
              <label className="input-label">بار آتش ثابت Qi (MJ/m²)</label>
              <input
                type="number"
                id="qi-fixed"
                min="0"
                placeholder="مثلاً 300"
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                کلاس گسترش شعله (M)
                <span
                  className="hint-link"
                  // onClick={() => showTab("m-guide")}
                >
                  راهنما
                </span>
              </label>
              <select id="flame-class">
                <option value="0">A1 - غیرقابل احتراق</option>
                <option value="0.5">A2 - تقریباً غیرقابل احتراق</option>
                <option value="1">B - دیرسوز</option>
                <option value="2">C - سوزش کند</option>
                <option value="3">D - قابل احتراق</option>
                <option value="4">E - به راحتی مشتعل</option>
                <option value="5">F - خیلی سریع شعله‌ور</option>
              </select>
            </div>

            {/* دکمه محاسبه */}
            <button
              className="btn btn-primary"
              // onClick={() => calculateR()}
            >
              محاسبه ضریب r
            </button>

            {/* محل نمایش نتیجه */}
            <div className="result-display mt-4" id="r-result"></div>
          </div>
        )}

        {/* tab d */}
        {activeTab === "d-dependency" && (
          <div id="d-dependency" className="tab-content">
            <div className="help-card">
              <div className="text-info mb-2 text-base font-semibold">
                ضریب وابستگی اقتصادی (نسخه 2015 FRAME)
              </div>
              <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
                این ضریب حساسیت فعالیت‌ها به توقف ناشی از آتش‌سوزی را بر اساس
                نسبت ارزش افزوده به گردش مالی برآورد می‌کند.
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">انتخاب گروه فعالیت</label>
              <select id="dependency-category">
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
                id="dependency-manual"
                min="0"
                max="1"
                step="0.01"
                placeholder="مثلاً 0.45"
                disabled
                className="opacity-50"
              />
            </div>

            <button
              className="btn btn-primary"
              // onClick={() => calculateD()}
            >
              محاسبه ضریب d
            </button>

            <div className="result-display mt-4" id="d-result"></div>
          </div>
        )}

        {/* bottom cards */}
        <div className="results-grid" style={{ marginTop: "2rem" }}>
          <div className="result-card">
            <h3>سطح پذیرش ساختمان</h3>
            <div className="result-value" id="total-p">
              -
            </div>
          </div>
          <div className="result-card">
            <h3>سطح پذیرش افراد</h3>
            <div className="result-value" id="total-p1">
              -
            </div>
          </div>
          <div className="result-card">
            <h3>سطح پذیرش فعالیت‌ها</h3>
            <div className="result-value" id="total-p2">
              -
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
