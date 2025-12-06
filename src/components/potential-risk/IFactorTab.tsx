"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { CalculationResults } from "@/types";

interface IFactorTabProps {
  results: CalculationResults;
  updateResults: (updates: Partial<CalculationResults>) => void;
}

export default function IFactorTab({
  results,
  updateResults,
}: IFactorTabProps) {
  const [showTWeightedTable, setShowTWeightedTable] = useState(false);
  const [showDimsModal, setShowDimsModal] = useState(false);
  const [showITable, setShowITable] = useState(false);
  const [tempDestruction, setTempDestruction] = useState("250");
  const [avgDimension, setAvgDimension] = useState("0.3");
  const [fireClass, setFireClass] = useState("5");

  const calculateI = () => {
    const T = parseFloat(tempDestruction);
    const m = parseFloat(avgDimension) || 0.3;
    const M = parseFloat(fireClass);

    const i = 1 - T / 1000 - 0.1 * Math.log10(m) + M / 10;
    updateResults({ i });

    // Recalculate P, P1, P2 if other factors are available
    const { q, g, e, v, z } = results;
    if (q !== null && g !== null && e !== null && v !== null && z !== null) {
      const P = q * i * g * e * v * z;
      const P1 = q * i * e * v * z;
      const P2 = i * g * e * v * z;
      updateResults({ P, P1, P2 });
    }
  };

  return (
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
          value={tempDestruction}
          onChange={(e) => {
            setTempDestruction(e.target.value);
            if (e.target.value === "multi") {
              setShowTWeightedTable(true);
            } else {
              setShowTWeightedTable(false);
            }
          }}
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
          <option value="250">
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

      {/* weighted T table */}
      {showTWeightedTable && (
        <div
          id="t-weighted-table"
          style={{
            display: "block",
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
                      <input type="checkbox" />
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
      )}

      <div style={{ marginBottom: 10 }}>
        <label>
          <b>ابعاد متوسط محتویات m (متر):</b>
        </label>

        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2 mt-2">
            <input
              type="number"
              id="avg-dimension"
              step="0.001"
              min="0.001"
              max="2"
              placeholder="m"
              value={avgDimension}
              onChange={(e) => setAvgDimension(e.target.value)}
              style={{ flex: 1 }}
              className="p-2 border rounded"
            />
          </div>

          <div
            id="m-ref-guide"
            style={{
              display: "block",
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
          value={fireClass}
          onChange={(e) => setFireClass(e.target.value)}
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
          <option value="5">
            F - طبق EN12845 Cat. IV : سطوح بسیار قابل‌اشتعال (M=5)
          </option>
        </select>

        {/* i table */}
        {showITable && (
          <div className="transition-all duration-300 block">
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
      </div>

      <div className="mt-4">
        <button className="btn btn-primary" onClick={calculateI}>
          محاسبه ضریب i
        </button>
      </div>

      {results.i !== null && (
        <div className="result-display mt-4">
          <div className="result-value">{results.i.toFixed(3)}</div>
        </div>
      )}
    </div>
  );
}

