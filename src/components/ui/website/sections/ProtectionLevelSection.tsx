"use client";

import { useState } from "react";
import { CalculationResults } from "@/types";
import { BlockMath } from "react-katex";

interface ProtectionLevelSectionProps {
  results: CalculationResults;
  updateResults: (updates: Partial<CalculationResults>) => void;
}

export default function ProtectionLevelSection({
  results,
  updateResults,
}: ProtectionLevelSectionProps) {
  const [activeTab, setActiveTab] = useState("w-water");
  const [showFTable, setShowFTable] = useState(false);

  const [showW1Guide, setShowW1Guide] = useState(false);
  const [showW2Guide, setShowW2Guide] = useState(false);
  const [showW3Guide, setShowW3Guide] = useState(false);
  const [showW4Guide, setShowW4Guide] = useState(false);

  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);
  const [n3, setN3] = useState(0);
  const [n4, setN4] = useState(0);
  const [n5, setN5] = useState(0);

  const [s1, setS1] = useState(0);
  const [s2, setS2] = useState(0);
  const [s3, setS3] = useState(0);
  const [s4, setS4] = useState(8);
  const [s5, setS5] = useState(0);

  const [fs, setFs] = useState(60);
  const [ff, setFf] = useState(0);
  const [fd, setFd] = useState(0);
  const [fw, setFw] = useState(0);

  const [hasManyWindows, setHasManyWindows] = useState(false);
  const [noInternalSeparation, setNoInternalSeparation] = useState(false);
  const [combustibleInsulation, setCombustibleInsulation] = useState(false);

  const [sValue, setSValue] = useState(1);

  const [result, setResult] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  function calculateF() {
    const fsVal = Math.min(fs, 120);
    const ffVal = hasManyWindows ? 0 : Math.min(ff, 120);
    const fdVal = combustibleInsulation ? 0 : Math.min(fd, 120);
    const fwVal = noInternalSeparation ? 0 : Math.min(fw, 120);

    const f = 0.5 * fsVal + 0.25 * ffVal + 0.125 * fdVal + 0.125 * fwVal;

    const F =
      (1 + f / 100 - Math.pow(f, 2.5) / 1_000_000) * (1 - (sValue - 1) / 40);

    setResult(`ضریب F = ${F.toFixed(4)}`);

    setDetails(`
f = (1/2)(${fsVal}) + (1/4)(${ffVal}) + (1/8)(${fdVal}) + (1/8)(${fwVal}) = ${f.toFixed(
      2
    )}
F = [1 + f/100 - f^2.5 / 1,000,000] × [1 - (S - 1)/40]
F = ${F.toFixed(4)}
    `);
  }

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
            <div className="w-10 h-10 bg-linear-to-br from-warning to-danger rounded-lg flex items-center justify-center text-white text-xl">
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

        {/* DYNAMIC TABS */}
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

        {/* W tab */}
        <div
          id="w-water"
          className={activeTab === "w-water" ? "tab-content" : "hidden"}
        >
          <div className="formula-card">
            <div className="text-primary mb-3 text-lg font-semibold">
              فرمول محاسبه W
            </div>
            <div className="formula-content" dir="ltr">
              <BlockMath
                math={"W = 0.95^{w} \\quad , \\quad w = \\sum_{i=1}^{4} w_i"}
              />
            </div>
          </div>

          <div className="help-card">
            <div className="mb-2 font-semibold text-primary">
              راهنمای FRAME 2015 - ضریب تأمین آب (W)
            </div>
            <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
              ضریب W کیفیت و کفایت سیستم تأمین آب برای اطفای حریق را می‌سنجد. هر
              ضعف در سیستم بر اساس جداول سند FRAME 2015 جریمه می‌گیرد.
            </div>
          </div>

          {/* w1 */}
          <div className="input-group relative">
            <label className="input-label">
              نوع ذخیره آب
              <button
                type="button"
                onClick={() => setShowW1Guide((prev) => !prev)}
                className="text-[10px] font-semibold py-0.5 px-1 mr-1.5 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
              >
                راهنما
              </button>
            </label>
            <select id="water-storage-type">
              <option value="auto">ذخیره اتوماتیک (w₁=0)</option>
              <option value="manual">ذخیره دستی (w₁=4)</option>
              <option value="none">بدون ذخیره (≤300m) (w₁=10)</option>
            </select>
            {/* Guide card */}
            {showW1Guide && (
              <ul className="relative text-gray-600 dark:text-gray-300 left-0 mt-2 p-4 bg-[#e0f7fa] dark:bg-[#0f3460] text-sm rounded-lg shadow-md border border-[#00bfae30] dark:border-[#2196f380] w-full z-20">
                <li>
                  <p className="font-semibold mb-3"> راهنمای W1 </p>
                </li>
                <li className="mb-1.5">
                  <b>نوع ذخیره آب (w₁)</b>
                </li>
                <li>ذخیره اتوماتیک: مخزن با پر شدن خودکار — جریمه 0</li>
                <li>ذخیره دستی: نیاز به پر کردن دستی — جریمه 4</li>
                <li>بدون ذخیره (≤ 300 متر): جریمه 10</li>
              </ul>
            )}
          </div>

          {/* w2 */}
          <div className="input-group">
            <label className="input-label">
              ظرفیت ذخیره آب موجود
              <button
                type="button"
                onClick={() => setShowW2Guide((prev) => !prev)}
                className="text-[10px] font-semibold py-0.5 px-1 mr-1.5 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
              >
                راهنما
              </button>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                id="water-capacity"
                min="0"
                step="10"
                defaultValue={0}
              />
              <span className="input-unit">m³</span>
              <div className="input-hint">
                <i className="fas fa-info-circle"></i>
                آب مورد نیاز = مجموع بار آتش (MJ/m²) ÷ 4 جریمه w₂: 0%&rarr;4,
                70%&rarr;3, 80%&rarr;2, 90%&rarr;1, 100%&rarr;0
              </div>
            </div>

            {/* <div className="input-hint">
              آب مورد نیاز = مجموع بار آتش (MJ/m²) ÷ 4 جریمه w₂: 0%→4, 70%→3,
              80%→2, 90%→1, 100%→0
            </div> */}
            {/* Guide card */}
            {showW2Guide && (
              <ul className="relative text-gray-600 dark:text-gray-300 left-0 mt-2 p-4 bg-[#e0f7fa] dark:bg-[#0f3460] text-sm rounded-lg shadow-md border border-[#00bfae30] dark:border-[#2196f380] w-full z-20">
                <li>
                  <p className="font-semibold mb-3"> راهنمای W2 </p>
                </li>
                <li className="mb-1.5">
                  <b>ظرفیت ذخیره آب موجود (w₂)</b>
                </li>
                <li>آب مورد نیاز (m³) = مجموع بار آتش (MJ/m²) ÷ 4</li>
                <li>100% → جریمه 0</li>
                <li>90% → جریمه 1</li>
                <li>80% → جریمه 2</li>
                <li>70% → جریمه 3</li>
                <li>کمتر از 70% → جریمه 4</li>
              </ul>
            )}
          </div>

          {/* w3 */}
          <div className="input-group">
            <label className="input-label">
              ظرفیت شبکه توزیع آب
              <button
                type="button"
                onClick={() => setShowW3Guide((prev) => !prev)}
                className="text-[10px] font-semibold py-0.5 px-1 mr-1.5 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
              >
                راهنما
              </button>
            </label>
            <select id="distribution-network">
              <option value="adequate">شبکه مناسب (w₃=0)</option>
              <option value="limited">محدود (w₃=2)</option>
              <option value="none">بدون شبکه (w₃=6)</option>
            </select>
            {/* w3 Guide */}
            {showW3Guide && (
              <ul className="relative text-gray-600 dark:text-gray-300 left-0 mt-2 p-4 bg-[#e0f7fa] dark:bg-[#0f3460] text-sm rounded-lg shadow-md border border-[#00bfae30] dark:border-[#2196f380] w-full z-20">
                <li>
                  <p className="font-semibold mb-3"> راهنمای W3 </p>
                </li>
                <li className="mb-1.5">
                  <b>شبکه توزیع آب (w₃)</b>
                </li>
                <li>شبکه مناسب: جریمه 0</li>
                <li>محدود: جریمه 2</li>
                <li>بدون شبکه: جریمه 6</li>
                <li>ملاک: توان تأمین آب به مدت ۲ ساعت بدون افت فشار</li>
              </ul>
            )}
          </div>

          {/* w4 */}
          <div className="input-group">
            <label className="input-label">
              تعداد اتصالات هیدرانت
              <button
                type="button"
                onClick={() => setShowW4Guide((prev) => !prev)}
                className="text-[10px] font-semibold py-0.5 px-1 mr-1.5 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
              >
                راهنما
              </button>
            </label>

            <div className="input-wrapper">
              <input
                type="number"
                id="hydrant-25"
                placeholder='تعداد 2.5"(70)'
                defaultValue={0}
                min="0"
              />
              <span className="input-unit">عدد</span>
            </div>

            <div className="input-wrapper">
              <input
                type="number"
                id="hydrant-3"
                placeholder='تعداد 3"'
                defaultValue={0}
                min="0"
              />
              <span className="input-unit">عدد</span>
            </div>

            <div className="input-wrapper">
              <input
                type="number"
                id="hydrant-4"
                placeholder='تعداد 4"(100)'
                defaultValue={0}
                min="0"
              />
              <span className="input-unit">عدد</span>
              <div className="input-hint">
                <i className="fas fa-info-circle"></i>
                نیاز: ≥ 1 اتصال 2.5&quot; به ازای هر 50m محیط 3&quot; معادل
                2&times;اتصال 2.5&quot; | 4&quot; معادل 3&times;اتصال 2.5&quot;
              </div>
            </div>
            {/* 
            <div className="input-hint">
              نیاز: ≥ 1 اتصال 2.5&quot; به ازای هر 50m محیط 3&quot; معادل
              2×اتصال 2.5&quot; | 4&quot; معادل 3×اتصال 2.5&quot;
            </div> */}
            {/* w4 Guide */}
            {showW4Guide && (
              <ul className="relative text-gray-600 dark:text-gray-300 left-0 mt-2 p-4 bg-[#e0f7fa] dark:bg-[#0f3460] text-sm rounded-lg shadow-md border border-[#00bfae30] dark:border-[#2196f380] w-full z-20">
                <li>
                  <p className="font-semibold mb-3"> راهنمای W4 </p>
                </li>
                <li className="mb-1.5">
                  <b>اتصالات هیدرانت (w₄)</b>
                </li>
                <li>نیاز حداقل: ۱ اتصال 2.5&quot; برای هر ۵۰ متر محیط</li>
                <li>هر اتصال 3&quot; معادل ۲ اتصال 2.5&quot;</li>
                <li>هر اتصال 4&quot; معادل ۳ اتصال 2.5&quot;</li>
                <li>کمتر از مقدار موردنیاز &rarr; جریمه اعمال می‌شود</li>
              </ul>
            )}
          </div>

          <button className="btn btn-primary">محاسبه W (FRAME 2015)</button>

          <div id="W-result" className="result-display mt-4"></div>
        </div>

        {/* N tab */}
        <div
          id="n-normal"
          className={activeTab === "n-normal" ? "tab-content" : "hidden"}
        >
          {/* Formula Card */}
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

          {/* n1 */}
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

          {/* n2 */}
          <Section title="n₂ - خاموش‌کن دستی">
            <Select value={n2} onChange={setN2}>
              <option value={0}>خاموش‌کن‌ها کافی و درست</option>
              <option value={2}>خاموش‌کن ناکافی</option>
              <option value={4}>بدون خاموش‌کن</option>
            </Select>
          </Section>

          {/* n3 */}
          <Section title="n₃ - جعبه/هوزریل آتش‌نشانی">
            <Select value={n3} onChange={setN3}>
              <option value={0}>پوشش کامل جعبه آتش‌نشانی</option>
              <option value={2}>تعداد یا مکان ناکافی</option>
              <option value={4}>فاقد جعبه آتش‌نشانی</option>
            </Select>
          </Section>

          {/* n4 */}
          <Section title="n₄ - زمان رسیدن آتش‌نشانی">
            <Select value={n4} onChange={setN4}>
              <option value={0}>کمتر از 10 دقیقه</option>
              <option value={2}>10 تا 15 دقیقه</option>
              <option value={5}>15 تا 30 دقیقه</option>
              <option value={10}>بیش از 30 دقیقه</option>
            </Select>
          </Section>

          {/* n5 */}
          <Section title="n₅ - آموزش ساکنان">
            <Select value={n5} onChange={setN5}>
              <option value={0}>همه آموزش دیده‌اند</option>
              <option value={2}>برخی آموزش دیده‌اند</option>
              <option value={4}>هیچ آموزش ندیده‌اند</option>
            </Select>
          </Section>

          {/* Output */}
          <div
            className="mt-4 text-primary font-semibold text-lg"
            id="n-result"
          ></div>

          {/* Calculation Details */}
          <div
            id="n-calculation-details"
            className="mt-3 p-4 rounded-lg bg-slate-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hidden"
          >
            <h4 className="font-semibold mb-2">جزئیات محاسبه:</h4>
            <div id="n-details-content"></div>
          </div>
        </div>

        {/* S tab */}
        <div
          id="s-special"
          className={activeTab === "s-special" ? "w-full space-y-6" : "hidden"}
        >
          {/* Formula Card */}
          <div className="formula-card">
            <h3 className="text-primary mb-3 text-lg font-semibold text-center">
              فرمول محاسبه S - ضریب حفاظت ویژه
            </h3>

            <div className="formula-content" dir="ltr">
              <BlockMath
                math={`S = 1.05^{s} \\quad \\text{که} \\quad s = s_1 + s_2 + s_3 + s_4 + s_5`}
              />
            </div>
          </div>

          {/* s1 */}
          <Section title="s₁ - سیستم‌های تشخیص خودکار حریق">
            <p className="text-sm">نوع سیستم تشخیص</p>
            <Select value={s1} onChange={setS1}>
              <option value="0">ندارد</option>
              <option value="4">
                تشخیص خودکار توسط اسپرینکلر + سوئیچ فشار/جریان
              </option>
              <option value="5">توسط حسگر حرارتی</option>
              <option value="8">توسط حسگر دود یا شعله</option>
              <option value="2">توسط آلارم دود مستقل</option>
            </Select>
          </Section>

          {/* s2 */}
          <Section title="s₂ - منابع آب بهبود یافته">
            <p className="text-sm">وضعیت منابع آب</p>
            <Select value={s2} onChange={setS2}>
              <option value="0">منبع تک جریان/فشار</option>
              <option value="5">
                قابل اطمینان بالا: یک مخزن + دو جریان/فشار
              </option>
              <option value="12">دو مخزن مستقل هر کدام با جریان/فشار</option>
            </Select>
          </Section>

          {/* s3 */}
          <Section title="s₃ - سیستم‌های اطفاء خودکار">
            <p className="text-sm">سیستم اسپرینکلر</p>
            <Select value={s3} onChange={setS3}>
              <option value="0">ندارد</option>
              <option value="11">اسپرینکلر با یک منبع آب شهری</option>
              <option value="14">اسپرینکلر با یک منبع مستقل</option>
              <option value="20">اسپرینکلر با دو منبع مستقل</option>
            </Select>
          </Section>

          {/* s4 */}
          <Section title="s₄ - ایستگاه آتش‌نشانی">
            <p className="text-sm">نوع ایستگاه آتش‌نشانی</p>
            <Select value={s4} onChange={setS4}>
              <option value="8">ایستگاه تمام‌وقت ۲۴ساعته در ۷ روز هفته</option>
              <option value="6">
                ایستگاه نیمه‌وقت (روز تمام‌وقت، شب آنکال)
              </option>
              <option value="4">ایستگاه با پرسنل پاره‌وقت</option>
              <option value="2">ایستگاه داوطلب</option>
            </Select>
          </Section>

          {/* s5 */}
          <Section title="s₅ - آتش‌نشانی صنعتی خصوصی">
            <p className="text-sm">وضعیت تیم آتش‌نشانی صنعتی</p>
            <Select value={s5} onChange={setS5}>
              <option value="0">ندارد</option>
              <option value="6">تیم پاره‌وقت (ساعات کاری)</option>
              <option value="14">تیم تمام‌وقت ۲۴ساعته</option>
            </Select>
          </Section>

          <div>
            <button className="btn btn-primary">محاسبه ضریب S</button>
          </div>

          <div className="result-display mt-4" id="s-result"></div>
          <div
            id="s-calculation-details"
            className="calculation-details hidden"
          >
            <h4>جزئیات محاسبه:</h4>
            <div id="s-details-content"></div>
          </div>
        </div>

        {/* F tab */}
        <div
          id="f-resistance"
          className={activeTab === "f-resistance" ? "tab-content" : "hidden"}
        >
          <div className="formula-card">
            {" "}
            <h3 className="text-primary mb-3 text-lg font-semibold text-center">
              فرمول محاسبه F - ضریب مقاومت آتش{" "}
            </h3>
            <div className="formula-content text-center" dir="ltr">
              <p className="mb-2">محاسبه میانگین مقاومت آتش:</p>

              <BlockMath
                math={`f = \\frac{1}{2}f_s + \\frac{1}{4}f_f + \\frac{1}{8}f_d + \\frac{1}{8}f_w`}
              />

              <p className="my-3">محاسبه ضریب F:</p>

              <BlockMath
                math={`F = \\left[1 + \\frac{f}{100} - \\frac{f^{2.5}}{10^6}\\right] \\times \\left[1 - \\frac{(S-1)}{40}\\right]`}
              />
            </div>
            <ul className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              <li>
                f<sub>s</sub>: مقاومت سازه و عناصر جداکننده (REI)
              </li>
              <li>
                f<sub>f</sub>: مقاومت دیوارهای خارجی (E)
              </li>
              <li>
                f<sub>d</sub>: مقاومت سقف یا بام (RE)
              </li>
              <li>
                f<sub>w</sub>: مقاومت دیوارهای داخلی (EI)
              </li>
              <li>حداکثر مقدار مجاز: 120 دقیقه</li>
            </ul>
          </div>

          {/* Structural Resistance */}
          <Section title="مقاومت آتش اجزای ساختمان">
            <div>
              <label className="input-label">
                fₛ - مقاومت سازه (ستون‌ها، تیرها، دیوارهای باربر)
              </label>
              <Select value={fs} onChange={setFs}>
                <option value={0}>بدون مقاومت (R0)</option>
                <option value={15}>
                  15 دقیقه (R15) - سازه فولادی بدون پوشش
                </option>
                <option value={30}>30 دقیقه (R30)</option>
                <option value={60} selected>
                  60 دقیقه (R60) - بنایی/بتن معمولی
                </option>
                <option value={90}>90 دقیقه (R90)</option>
                <option value={120}>120 دقیقه (R120) - بتن مسلح ضخیم</option>
                <option value={180}>بیش از 120 دقیقه (محاسبه با 120)</option>
              </Select>
              <div className="input-hint">
                <i className="fas fa-info-circle"></i>
                مقاومت سازه مهم‌ترین عامل است (ضریب 1/2)
              </div>
            </div>

            <div>
              <label className="input-label">
                f<sub>f</sub> - مقاومت دیوارهای خارجی
              </label>
              <Select value={ff} onChange={setFf}>
                <option value={0}> شیشه معمولی یا بدون مقاومت</option>
                <option value={15}>15 دقیقه</option>
                <option value={30}>30 دقیقه</option>
                <option value={60}> 60 دقیقه - آجر یا بتن</option>
                <option value={90}>90 دقیقه</option>
                <option value={120}>120 دقیقه</option>
              </Select>
              <div className="input-hint">
                <i className="fas fa-info-circle"></i>
                درصد پنجره‌ها: بیش از 5% = مقاومت صفر
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={hasManyWindows}
                onChange={(e) => setHasManyWindows(e.target.checked)}
              />
              دیوار خارجی دارای بیش از 5% پنجره (مقاومت = 0)
            </label>

            <div>
              <label className="input-label">
                f<sub>d</sub> - مقاومت سقف/بام
              </label>
              <Select value={fd} onChange={setFd}>
                <option value={0}>بدون مقاومت یا عایق سوختنی</option>
                <option value={15}>15 دقیقه</option>
                <option value={30}>30 دقیقه</option>
                <option value={60}>60 دقیقه</option>
                <option value={90}>90 دقیقه</option>
                <option value={120}>120 دقیقه</option>
              </Select>
              <div className="input-hint">
                <i className="fas fa-info-circle"></i>
                عایق سوختنی در زیر سقف = مقاومت صفر
              </div>
            </div>

            <div>
              <label className="input-label">
                f<sub>w</sub> - مقاومت دیوارهای داخلی
              </label>
              <Select value={fw} onChange={setFw}>
                <option value={0}>
                  بدون دیوار جداکننده یا مساحت &gt; 1000 m²
                </option>

                <option value={30}>30 دقیقه</option>
                <option value={60}>60 دقیقه</option>
                <option value={90}>90 دقیقه</option>
                <option value={120}>120 دقیقه</option>
              </Select>
              <div className="input-hint">
                <i className="fas fa-info-circle"></i>
                فقط برای دیوارهایی که فضا را به بخش‌های کمتر از 1000 m² و حداکثر
                25% کل تقسیم می‌کنند
              </div>
            </div>
          </Section>

          {/* Special conditions */}
          <Section title="شرایط ویژه">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={noInternalSeparation}
                onChange={(e) => setNoInternalSeparation(e.target.checked)}
              />
              فضای باز بدون تقسیم‌بندی داخلی (انبار بزرگ)
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={combustibleInsulation}
                onChange={(e) => setCombustibleInsulation(e.target.checked)}
              />
              عایق سوختنی در زیر سقف
            </label>

            <div>
              <label className="block mb-1 text-sm">
                S - ضریب حفاظت ویژه (محاسبه شده قبلی)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="w-full border rounded-lg p-2 dark:bg-slate-900 dark:border-slate-600"
                  value={sValue}
                  readOnly
                />
                <button
                  onClick={() => setSValue(1)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-nowrap cursor-pointer"
                >
                  بروزرسانی از محاسبه S
                </button>
              </div>
            </div>
          </Section>

          <button
            onClick={() => {
              // calculateF();
              setShowFTable(true);
            }}
            className="btn btn-primary"
          >
            محاسبه ضریب F
          </button>

          {showFTable && (
            <FireResistanceTable
              fs={120}
              ff={90}
              fd={60}
              fw={45}
              f={78.5}
              term1={0.9234}
              term2={0.9856}
              F={0.9112}
            />
          )}
        </div>

        {/* U tab */}
        <div
          id="u-escape"
          className={activeTab === "u-escape" ? "tab-content" : "hidden"}
        >
          <div className="formula-card">
            <h3 className="text-primary mb-3 text-lg font-semibold text-center">
              فرمول محاسبه U
            </h3>
            <div className="formula-content text-center" dir="ltr">
              <BlockMath
                math={`U = 1.05^{u} \\quad \\text{که} \\quad u = \\sum u_i`}
              />
            </div>
          </div>

          {/* Practical Explanation */}
          <div className="help-card">
            <div className="mb-2 font-semibold text-primary">
              توضیحات کاربردی
            </div>
            <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
              ضریب U بیانگر اثربخشی شرایط فرار و نجات در ساختمان است و از مجموع
              امتیازهای چهار بخش اصلی محاسبه می‌شود:
              <b>
                {" "}
                بخش‌بندی فرعی، نوع پله‌های تخلیه، خروج افقی، حفاظت اسپرینکلر{" "}
              </b>
              . هر گزینه در این بخش‌ها بسته به سطح حفاظت و تسهیل مسیر فرار،
              امتیاز مثبت می‌گیرد. مجموع امتیازها (u) در فرمول
              <code className="mx-1 font-mono">U = 1.05ᵘ</code>
              قرار می‌گیرد؛ هرچه U بزرگ‌تر باشد، شرایط تخلیه مناسب‌تر است.
            </div>
          </div>

          {/* Subcompartments */}
          <div className="text-primary font-semibold mt-6 mb-2 border-r-4 border-primary pr-2">
            بخش‌بندی فرعی (Subcompartments)
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">نوع بخش‌بندی</label>
            <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
              <option value="0">بدون بخش‌بندی</option>
              <option value="2">EI30 – حداکثر 1000 m²</option>
              <option value="4">EI60 – حداکثر 1000 m²</option>
            </select>
          </div>

          {/* EI30 / EI60 explanation */}
          <div
            className="
            p-3 rounded-md text-[0.92em] leading-6 mt-2
            bg-[#fff8e1] text-black border border-[#f57c00]                    
            dark:bg-[#f57b001c]   
            dark:text-white"
          >
            <b className="text-[#f57c00] dark:text-warning">راهنما:</b>
            <br />
            <b>EI 30</b> یعنی دیوار/جداکننده‌ها ۳۰ دقیقه مقاومت حریق دارند (
            <i>E</i> = یکپارچگی، <i>I</i> = عایق حرارتی).
            <br />
            <b>EI 60</b> یعنی مقاومت حریق این جداکننده‌ها ۶۰ دقیقه است؛ حفاظت
            بیشتر و زمان تخلیه امن‌تر.
          </div>

          {/* Stairways */}
          <div className="text-primary font-semibold mt-6 mb-2 border-r-4 border-primary pr-2">
            نوع پله‌های تخلیه
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">نوع راه‌پله</label>
            <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
              <option value="0">بدون پله یا پله باز داخلی</option>
              <option value="1">یک پله محصور داخلی</option>
              <option value="2">چند پله محصور داخلی</option>
              <option value="3">حداقل یک پله محصور ضد دود</option>
              <option value="4">چند پله محصور ضد دود</option>
              <option value="6">پله داخلی + یک پله خارجی</option>
              <option value="8">پله داخلی + چند پله خارجی</option>
              <option value="2">پله داخلی + سرسره/نردبان (طبقه 1 و 2)</option>
            </select>
          </div>

          {/* Horizontal exit */}
          <div className="text-primary font-semibold mt-6 mb-2 border-r-4 border-primary pr-2">
            خروج افقی
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">نوع خروج افقی</label>
            <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
              <option value="0">بدون خروج افقی</option>
              <option value="2">تا ۵۰٪ ظرفیت موردنیاز</option>
              <option value="8">۱۰۰٪ ظرفیت موردنیاز</option>
            </select>
          </div>

          {/* Sprinklers */}
          <div className="text-primary font-semibold mt-6 mb-2 border-r-4 border-primary pr-2">
            حفاظت اسپرینکلر
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">نوع حفاظت</label>
            <select className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
              <option value="0">بدون اسپرینکلر</option>
              <option value="5">اسپرینکلر فقط در نواحی پُرخطر</option>
              <option value="10">کل بخش مجهز به اسپرینکلر</option>
            </select>
          </div>

          {/* Button */}
          <button className="btn btn-primary mt-4">محاسبه ضریب U</button>

          {/* Result */}
          <div id="u-result" className="result-display mt-4"></div>

          {/* Help Table Placeholder */}
          <div className="mt-8">
            <p className="font-semibold mb-3">
              جدول امتیازات فاکتور U بر اساس FRAME 2015
            </p>
          </div>
        </div>

        {/* Y tab */}
        <div
          id="y-salvage"
          className={activeTab === "y-salvage" ? "tab-content" : "hidden"}
        >
          {/* Formula Card */}
          <div className="formula-card">
            <div className="formula-title">فرمول محاسبه Y</div>
            <div className="formula-content" dir="ltr">
              <BlockMath
                math={`Y = 1.05^{y} \\quad \\text{که} \\quad y = \\sum y_i`}
              />
            </div>
          </div>

          {/* Help Card */}
          <div className="help-card">
            <div className="mb-2 font-semibold text-primary">
              توضیح فاکتور Y
            </div>
            <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
              فاکتور Y میزان آمادگی برای نجات و حفظ فعالیت‌ها را پس از وقوع حریق
              نشان می‌دهد. این شامل حفاظت از داده‌ها، تامین قطعات یدکی، امکان
              تعمیر سریع، انتقال فعالیت‌ها به مکان دیگر و ظرفیت تولید چندمحلی
              است. هر چه این اقدامات بیشتر رعایت شود، مقدار Y بیشتر شده و حفاظت
              بهبود می‌یابد.
            </div>
          </div>

          {/* Physical Protection */}
          <div className="section-divider mb-4">حفاظت فیزیکی مناطق حساس</div>

          <div className="help-card">
            <div className="mb-2 font-semibold text-primary">توجه مهم</div>
            <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
              امتیازات حفاظت موضعی فقط زمانی داده می‌شود که حفاظت کلی از همان
              نوع در کل ساختمان وجود نداشته باشد. برای مثال، اگر کل ساختمان
              اسپرینکلر دارد، امتیاز اسپرینکلر موضعی داده نمی‌شود.
            </div>
          </div>

          {/* Sensitive Zone Division */}
          <div className="input-group">
            <label className="input-label">تقسیم‌بندی مناطق حساس</label>
            <div className="checkbox-group flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" id="sub-compartment-ei30" value="2" />
                تقسیم به زون‌های حداکثر 1000m² با جداسازی EI30
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" id="sub-compartment-ei60" value="4" />
                تقسیم به زون‌های حداکثر 1000m² با جداسازی EI60
              </label>
            </div>
          </div>

          {/* Local Fire Protection */}
          <div className="input-group">
            <label className="input-label">سیستم‌های حفاظتی موضعی</label>
            <div className="checkbox-group flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="partial-detection-critical"
                  value="3"
                />
                سیستم اعلام حریق اتوماتیک موضعی
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="partial-sprinkler-critical"
                  value="5"
                />
                اسپرینکلر موضعی در مناطق حیاتی
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" id="other-auto-extinguish" value="4" />
                سایر سیستم‌های اطفای اتوماتیک (گاز، فوم، پودر)
              </label>
            </div>
          </div>

          {/* Crisis Planning */}
          <div className="section-divider mb-2">برنامه‌ریزی مدیریت بحران</div>

          <div className="input-group">
            <label className="input-label">اقدامات سازمانی</label>
            <div className="checkbox-group flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" id="financial-data-backup" value="2" />
                پشتیبان‌گیری از داده‌های مالی و اقتصادی در مکان امن
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" id="spare-parts-access" value="4" />
                دسترسی آسان به قطعات یدکی و تجهیزات جایگزین
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" id="self-repair-capability" value="2" />
                توانایی تعمیر با حداقل کمک خارجی
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" id="relocation-agreements" value="3" />
                قرارداد جابجایی موقت فعالیت‌ها
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" id="multiple-production" value="4" />
                ظرفیت تولید در بیش از یک مکان
              </label>
            </div>
          </div>

          {/* Button */}
          <button className="btn btn-primary mt-4">محاسبه ضریب Y</button>

          <div id="y-result" className="result-display mt-4"></div>

          {/* Summary Table */}
          <div className="summary-table mt-8">
            <h4>خلاصه امتیازات بر اساس FRAME 2015</h4>

            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300 dark:border-gray-600 mt-4">
              <table className="w-full text-sm text-right">
                <thead className="bg-gray-100 dark:bg-[#ffffff11] font-semibold">
                  <tr>
                    <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                      عامل
                    </th>
                    <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                      امتیاز (y<sub>i</sub>)
                    </th>
                    <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                      شرط
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="p-3">تقسیم‌بندی EI30</td>
                    <td className="p-3">2</td>
                    <td className="p-3">زون‌های کمتر از 1000m²</td>
                  </tr>

                  <tr>
                    <td className="p-3">تقسیم‌بندی EI60</td>
                    <td className="p-3">4</td>
                    <td className="p-3">زون‌های کمتر از 1000m²</td>
                  </tr>

                  <tr>
                    <td className="p-3">اعلام حریق موضعی</td>
                    <td className="p-3">3</td>
                    <td className="p-3">در مناطق حیاتی</td>
                  </tr>

                  <tr>
                    <td className="p-3">اسپرینکلر موضعی</td>
                    <td className="p-3">5</td>
                    <td className="p-3">در مناطق حیاتی</td>
                  </tr>

                  <tr>
                    <td className="p-3">سایر سیستم‌های اطفا</td>
                    <td className="p-3">4</td>
                    <td className="p-3">گاز، فوم یا پودر</td>
                  </tr>

                  <tr className="bg-gray-50 dark:dark:bg-[#ffffff11] font-bold">
                    <td className="p-3 text-center" colSpan={3}>
                      برنامه‌ریزی بحران
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">پشتیبان داده‌ها</td>
                    <td className="p-3">2</td>
                    <td className="p-3">در مکان امن</td>
                  </tr>

                  <tr>
                    <td className="p-3">قطعات یدکی</td>
                    <td className="p-3">4</td>
                    <td className="p-3">دسترسی آسان</td>
                  </tr>

                  <tr>
                    <td className="p-3">توانایی تعمیر</td>
                    <td className="p-3">2</td>
                    <td className="p-3">با حداقل کمک</td>
                  </tr>

                  <tr>
                    <td className="p-3">توافقات جابجایی</td>
                    <td className="p-3">3</td>
                    <td className="p-3">مکان جایگزین</td>
                  </tr>

                  <tr>
                    <td className="p-3">تولید چندگانه</td>
                    <td className="p-3">4</td>
                    <td className="p-3">چند مرکز تولید</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* res */}
        <div className="results-grid mt-8">
          <div className="result-card">
            <h3>حفاظت ساختمان</h3>
            <div className="result-value" id="total-d">
              -
            </div>
          </div>
          <div className="result-card">
            <h3>حفاظت افراد</h3>
            <div className="result-value" id="total-d1">
              -
            </div>
          </div>
          <div className="result-card">
            <h3>حفاظت فعالیت‌ها</h3>
            <div className="result-value" id="total-d2">
              -
            </div>
          </div>
        </div>
      </div>
    </section>
  );
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

interface Props {
  fs: number;
  ff: number;
  fd: number;
  fw: number;
  f: number;
  term1: number;
  term2: number;
  F: number;
}

function FireResistanceTable({ fs, ff, fd, fw, f, term1, term2, F }: Props) {
  return (
    <div
      dir="rtl"
      className="mt-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 p-6"
    >
      <p className="text-primary mb-4">جزئیات محاسبه:</p>
      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-100 dark:dark:bg-[#ffffff11] font-semibold">
            <tr>
              <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                جزء
              </th>
              <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                مقاومت (دقیقه)
              </th>
              <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                ضریب
              </th>
              <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                سهم در میانگین
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="p-3">
                سازه (f<sub>s</sub>)
              </td>
              <td className="p-3">{fs}</td>
              <td className="p-3">1/2</td>
              <td className="p-3">{(0.5 * fs).toFixed(1)}</td>
            </tr>

            <tr>
              <td className="p-3">
                دیوار خارجی (f<sub>f</sub>)
              </td>
              <td className="p-3">{ff}</td>
              <td className="p-3">1/4</td>
              <td className="p-3">{(0.25 * ff).toFixed(1)}</td>
            </tr>

            <tr>
              <td className="p-3">
                سقف/بام (f<sub>d</sub>)
              </td>
              <td className="p-3">{fd}</td>
              <td className="p-3">1/8</td>
              <td className="p-3">{(0.125 * fd).toFixed(1)}</td>
            </tr>

            <tr>
              <td className="p-3">
                دیوار داخلی (f<sub>w</sub>)
              </td>
              <td className="p-3">{fw}</td>
              <td className="p-3">1/8</td>
              <td className="p-3">{(0.125 * fw).toFixed(1)}</td>
            </tr>

            <tr className=" font-bold">
              <td className="p-3" colSpan={3}>
                میانگین وزنی (f)
              </td>
              <td className="p-3">{f.toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CALCULATION STEPS */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 mt-6 rounded-lg border border-blue-200 dark:border-blue-600 text-sm leading-7">
        <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
          مراحل محاسبه F:
        </h5>

        <p>
          1. محاسبه بخش اول:
          <span className="font-mono mx-2">
            [1 + f/100 - f<sup>2.5</sup>/10<sup>6</sup>]
          </span>
          = <span className="font-bold">{term1.toFixed(4)}</span>
        </p>

        <p>
          2. محاسبه بخش دوم:
          <span className="font-mono mx-2">[1 - (S-1)/40]</span>={" "}
          <span className="font-bold">{term2.toFixed(4)}</span>
        </p>

        <p>
          3. ضریب نهایی: F ={" "}
          <span className="font-mono mx-2">
            {term1.toFixed(4)} × {term2.toFixed(4)}
          </span>
          ={" "}
          <span className="font-bold text-blue-700 dark:text-blue-300">
            {F.toFixed(4)}
          </span>
        </p>
      </div>

      {/* WARNING */}
      {F < 1 && (
        <p className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700 rounded-md text-sm">
          ⚠️ توجه: F &lt; 1 نشان‌دهنده مقاومت آتش ناکافی است!
        </p>
      )}
    </div>
  );
}
