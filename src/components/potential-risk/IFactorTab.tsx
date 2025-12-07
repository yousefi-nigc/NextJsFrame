"use client";

import { useState, useEffect } from "react";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AssessmentGetApiResponse } from "@/lib/APIResponseInterfaces";

interface TWeightedRow {
  t: number;
  desc: string;
  checked: boolean;
  percent: number;
}

interface MWeightedRow {
  m: number;
  desc: string;
  checked: boolean;
  percent: number;
}

export default function IFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [showTWeightedTable, setShowTWeightedTable] = useState(false);
  const [showDimsModal, setShowDimsModal] = useState(false);
  const [showITable, setShowITable] = useState(false);
  const [showMMultiSelect, setShowMMultiSelect] = useState(false);
  const [mMode, setMMode] = useState<"formula" | "reference">("reference");
  
  const [tempDestruction, setTempDestruction] = useState("250");
  const [avgDimension, setAvgDimension] = useState("0.3");
  const [fireClass, setFireClass] = useState("5");
  
  // Weighted T state
  const [tWeightedRows, setTWeightedRows] = useState<TWeightedRow[]>([
    { t: 20, desc: "a. مایعات قابل‌اشتعال — 21°C تا 70°F (≈20°C میانگین)", checked: false, percent: 0 },
    { t: 100, desc: "b. پلاستیک / لوازم الکترونیکی / انسان — 100°C (212°F)", checked: false, percent: 0 },
    { t: 200, desc: "c. منسوجات، چوب، کاغذ، غذا — 200°C (400°F)", checked: false, percent: 0 },
    { t: 250, desc: "d. متوسط محتویات ساختمان مسکونی — 250°C (482°F)", checked: false, percent: 0 },
    { t: 300, desc: "e. ماشین‌آلات، لوازم خانگی — 300°C (572°F)", checked: false, percent: 0 },
    { t: 400, desc: "f. اجسام فلزی — 400°C (752°F)", checked: false, percent: 0 },
    { t: 500, desc: "g. مواد غیرقابل‌احتراق (مصالح ساختمانی) — 500°C (932°F)", checked: false, percent: 0 },
  ]);
  
  // Weighted M state
  const [mWeightedRows, setMWeightedRows] = useState<MWeightedRow[]>([
    { m: 0, desc: "A1 (M=0) : طبق EN13501-1 | غیرقابل‌احتراق", checked: false, percent: 0 },
    { m: 0.5, desc: "A2 (M=0.5) : تقریباً غیرقابل‌احتراق | EN13501-1", checked: false, percent: 0 },
    { m: 1, desc: "B (M=1) : سخت برای اشتعال (خودخاموش‌شونده) | EN12845 Cat. I", checked: false, percent: 0 },
    { m: 2, desc: "C (M=2) : مواد کندسوز | EN13501-1", checked: false, percent: 0 },
    { m: 3, desc: "D (M=3) : سطوح قابل‌احتراق | EN12845 Cat. II", checked: false, percent: 0 },
    { m: 4, desc: "E (M=4) : سطوح قابل‌اشتعال | EN12845 Cat. III", checked: false, percent: 0 },
    { m: 5, desc: "F (M=5) : سطوح بسیار قابل‌اشتعال | EN12845 Cat. IV", checked: false, percent: 0 },
  ]);
  
  // Dimensions for geometric mean calculation
  const [dimensions, setDimensions] = useState<string[]>(Array(10).fill(""));

  const { data: assessment, isLoading } = useQuery<AssessmentGetApiResponse>({
    queryKey: ["assessment", floorId],
    enabled: !!floorId,
    queryFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`
      );
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch the assessment");

      const response = data as AssessmentGetApiResponse;

      setTempDestruction(
        response.assessment.tempDestruction?.toString() ?? "250"
      );
      setAvgDimension(response.assessment.avgDimension?.toString() ?? "0.3");
      setFireClass(response.assessment.materialClass?.toString() ?? "5");

      return response;
    },
  });

  // Calculate weighted T
  const calculateWeightedT = () => {
    let weightedSum = 0;
    let totalPercent = 0;

    tWeightedRows.forEach((row) => {
      if (row.checked && row.percent > 0) {
        weightedSum += row.t * (row.percent / 100);
        totalPercent += row.percent;
      }
    });

    if (totalPercent > 0) {
      return weightedSum;
    }
    return 250; // default
  };

  // Calculate weighted M
  const calculateWeightedM = () => {
    let weightedSum = 0;
    let totalPercent = 0;

    mWeightedRows.forEach((row) => {
      if (row.checked && row.percent > 0) {
        weightedSum += row.m * (row.percent / 100);
        totalPercent += row.percent;
      }
    });

    if (totalPercent > 0) {
      return weightedSum;
    }
    return 5; // default
  };

  // Calculate m from dimensions (geometric mean)
  const calculateMFromDims = (dims: number[]): number => {
    const validDims = dims.filter((d) => d > 0);
    if (validDims.length === 0) return 0.3;

    const product = validDims.reduce((acc, val) => acc * val, 1);
    const m = Math.pow(product, 1 / validDims.length);

    return Math.max(0.001, Math.min(m, 2));
  };

  const handleTWeightedChange = (index: number, checked: boolean) => {
    const newRows = [...tWeightedRows];
    newRows[index].checked = checked;
    if (!checked) {
      newRows[index].percent = 0;
    }
    setTWeightedRows(newRows);
  };

  const handleTPercentChange = (index: number, percent: number) => {
    const newRows = [...tWeightedRows];
    newRows[index].percent = Math.max(0, Math.min(100, percent));
    setTWeightedRows(newRows);
  };

  const handleMWeightedChange = (index: number, checked: boolean) => {
    const newRows = [...mWeightedRows];
    newRows[index].checked = checked;
    if (!checked) {
      newRows[index].percent = 0;
    }
    setMWeightedRows(newRows);
  };

  const handleMPercentChange = (index: number, percent: number) => {
    const newRows = [...mWeightedRows];
    newRows[index].percent = Math.max(0, Math.min(100, percent));
    setMWeightedRows(newRows);
  };

  const handleCalculateI = useMutation({
    mutationFn: async () => {
      // Get T value
      let finalT = parseFloat(tempDestruction);
      if (tempDestruction === "multi") {
        finalT = calculateWeightedT();
      }

      // Get m value
      let finalM = parseFloat(avgDimension);
      if (mMode === "formula") {
        const dims = dimensions.map((d) => parseFloat(d)).filter((d) => !isNaN(d) && d > 0);
        if (dims.length > 0) {
          finalM = calculateMFromDims(dims);
        } else {
          finalM = 0.3;
        }
      }
      if (isNaN(finalM) || finalM <= 0) {
        finalM = 0.3;
      }

      // Get M value
      let finalMaterialClass = parseFloat(fireClass);
      if (fireClass === "multi") {
        finalMaterialClass = calculateWeightedM();
      }

      const res = await fetch(`/api/user/projects/${projectId}/floors/${floorId}/assessment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tempDestruction: finalT,
          avgDimension: finalM,
          materialClass: finalMaterialClass,
        }),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to calculate");
      }
      
      return res.json();
    },
    onSuccess: () => {
      toast.success("ضریب i محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "خطا در محاسبه i");
    },
  });

  const tPercentSum = tWeightedRows.reduce((sum, row) => sum + (row.checked ? row.percent : 0), 0);
  const weightedT = calculateWeightedT();
  const weightedM = calculateWeightedM();

  const handleCalcMFromModal = () => {
    const dims = dimensions.map((d) => parseFloat(d)).filter((d) => !isNaN(d) && d > 0);
    if (dims.length > 0) {
      const calculatedM = calculateMFromDims(dims);
      setAvgDimension(calculatedM.toFixed(3));
      setShowDimsModal(false);
      toast.success(`m محاسبه شد: ${calculatedM.toFixed(3)}`);
    } else {
      toast.error("لطفاً حداقل یک بعد معتبر وارد کنید");
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
              <b>i</b> بیانگر سرعت و نرخ رشد آتش است. هر چه مقدار بالاتر باشد،
              رشد آتش سریع‌تر است.
            </li>
            <li className="mb-1.5">
              مقدار <b>i</b> معمولاً بین <b>0.5 تا 1.65</b> (سقف تجربی: 0.4 تا
              1.8) قرار می‌گیرد.
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
              <b>فلزات (بتن):</b> i=0.5 → HRR=<b>80</b> kW/m² |{" "}
              <b>اداری (رزیدنشیال):</b> i=1.0 → HRR=250 kW/m² |{" "}
              <b>پلی‌استایرن:</b> i=1.65 → HRR=1120 kW/m²
            </li>
          </ul>
        </div>
      </div>

      {/* Temperature Selection */}
      <div className="input-group">
        <label className="input-label">دمای تخریب T (درجه سانتیگراد)</label>
        <select
          id="temp-destruction"
          value={tempDestruction}
          onChange={(e) => {
            setTempDestruction(e.target.value);
            setShowTWeightedTable(e.target.value === "multi");
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

      {/* Weighted T Table */}
      {showTWeightedTable && (
        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-300 dark:border-slate-700">
          <table className="w-full text-sm text-right">
            <thead className="bg-gray-100 dark:bg-gray-800 font-semibold">
              <tr>
                <th className="p-2 border-b border-gray-200">انتخاب</th>
                <th className="p-2 border-b border-gray-200">دمای T (°C)</th>
                <th className="p-2 border-b border-gray-200">توضیحات</th>
                <th className="p-2 border-b border-gray-200">درصد (%)</th>
              </tr>
            </thead>
            <tbody>
              {tWeightedRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="odd:bg-white even:bg-gray-50 dark:even:bg-slate-800 dark:odd:bg-slate-900"
                >
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      checked={row.checked}
                      onChange={(e) => handleTWeightedChange(idx, e.target.checked)}
                    />
                  </td>
                  <td className="p-2 text-center">{row.t}</td>
                  <td className="p-2">{row.desc}</td>
                  <td className="p-2 text-center">
                    <input
                      type="number"
                      value={row.percent}
                      min={0}
                      max={100}
                      disabled={!row.checked}
                      onChange={(e) => handleTPercentChange(idx, parseFloat(e.target.value) || 0)}
                      className="w-20 p-1 border rounded dark:bg-slate-700 dark:text-white"
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
                <td className="p-2 text-center">{tPercentSum} %</td>
              </tr>
              <tr className="font-bold bg-green-50 dark:bg-green-900/20">
                <td colSpan={3} className="p-2 text-left">
                  دمای وزنی (Weighted T):
                </td>
                <td className="p-2 text-center">{weightedT.toFixed(2)} °C</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Average Dimension (m) */}
      <div className="input-group mt-4">
        <label>
          <b>ابعاد متوسط محتویات m (متر):</b>
        </label>

        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="m-mode"
                value="formula"
                checked={mMode === "formula"}
                onChange={() => setMMode("formula")}
              />
              فرمول محاسباتی میانگین هندسی ابعاد
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="m-mode"
                value="reference"
                checked={mMode === "reference"}
                onChange={() => setMMode("reference")}
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
              value={avgDimension}
              onChange={(e) => setAvgDimension(e.target.value)}
              className="flex-1 p-2 border rounded dark:bg-slate-700 dark:text-white"
            />
            {mMode === "formula" && (
              <button
                type="button"
                onClick={() => setShowDimsModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                🧮 ورود ابعاد
              </button>
            )}
          </div>

          {mMode === "reference" && (
            <div
              className="text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mt-2"
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
          )}
        </div>
      </div>

      {/* Dimensions Modal */}
      {showDimsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">ورود ابعاد اشیاء (متر)</h3>
              <button
                onClick={() => setShowDimsModal(false)}
                className="text-2xl hover:text-red-500"
              >
                ✖
              </button>
            </div>
            <table className="w-full border-collapse text-center mb-4">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border p-2">بُعد</th>
                  <th className="border p-2">مقدار (متر)</th>
                </tr>
              </thead>
              <tbody>
                {dimensions.map((dim, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{idx + 1}</td>
                    <td className="border p-2">
                      <input
                        type="number"
                        step="0.001"
                        min="0.001"
                        value={dim}
                        onChange={(e) => {
                          const newDims = [...dimensions];
                          newDims[idx] = e.target.value;
                          setDimensions(newDims);
                        }}
                        className="w-full p-1 border rounded dark:bg-slate-700 dark:text-white"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-2">
              <button
                onClick={handleCalcMFromModal}
                className="flex-1 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              >
                محاسبه m
              </button>
              <button
                onClick={() => setShowDimsModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Material Class (M) */}
      <div className="input-group mt-4">
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
          onChange={(e) => {
            setFireClass(e.target.value);
            setShowMMultiSelect(e.target.value === "multi");
          }}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-[#2c3e50] dark:text-white"
        >
          <option value="0">A1 - طبق EN13501-1 یا غیرقابل‌احتراق (M=0)</option>
          <option value="0.5">
            A2 - طبق EN13501-1 یا تقریباً غیرقابل‌احتراق (M=0.5)
          </option>
          <option value="1">
            B - طبق EN13501 یا EN12845 Cat. I : سخت برای اشتعال (خودخاموش‌شونده)
            (M=1)
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
          <option value="multi">📊 انتخاب چندکلاسی (میانگین وزنی)</option>
        </select>

        {/* M Reference Table */}
        {showITable && (
          <div className="mt-2 overflow-x-auto rounded-lg border border-gray-300 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f5f5f5] dark:bg-gray-700">
                  <th className="border border-neutral-300 text-right px-2 py-2">
                    EN13501-1
                  </th>
                  <th className="border border-neutral-300 text-right px-2 py-2">
                    M
                  </th>
                  <th className="border border-neutral-300 text-right px-2 py-2">
                    مثال
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { class: "A1", m: 0, example: "بتن، سنگ، فولاد" },
                  { class: "A2", m: 0.5, example: "شیشه، آجر نسوز" },
                  { class: "B", m: 1, example: "گچ، پانل دیرسوز" },
                  { class: "C", m: 2, example: "چوب طبیعی، کفپوش پارکت" },
                  { class: "D", m: 3, example: "فرش پلاستیکی، پلیمرها" },
                  { class: "E", m: 4, example: "فوم‌های قابل اشتعال" },
                  { class: "F", m: 5, example: "پلی‌استایرن منبسط" },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="border border-neutral-300 px-2 py-2">
                      {row.class}
                    </td>
                    <td className="border border-neutral-300 px-2 py-2">
                      {row.m}
                    </td>
                    <td className="border border-neutral-300 px-2 py-2">
                      {row.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Weighted M Table */}
        {showMMultiSelect && (
          <div className="mt-4 overflow-x-auto rounded-lg border border-gray-300 dark:border-slate-700">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-100 dark:bg-gray-800 font-semibold">
                <tr>
                  <th className="p-2 border-b border-gray-200">انتخاب</th>
                  <th className="p-2 border-b border-gray-200">کلاس + توضیحات</th>
                  <th className="p-2 border-b border-gray-200">درصد</th>
                </tr>
              </thead>
              <tbody>
                {mWeightedRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="odd:bg-white even:bg-gray-50 dark:even:bg-slate-800 dark:odd:bg-slate-900"
                  >
                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={(e) => handleMWeightedChange(idx, e.target.checked)}
                      />
                    </td>
                    <td className="p-2">{row.desc}</td>
                    <td className="p-2 text-center">
                      <input
                        type="number"
                        value={row.percent}
                        min={0}
                        max={100}
                        disabled={!row.checked}
                        onChange={(e) => handleMPercentChange(idx, parseFloat(e.target.value) || 0)}
                        className="w-20 p-1 border rounded dark:bg-slate-700 dark:text-white"
                      />
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold bg-gray-100 dark:bg-gray-800">
                  <td colSpan={2} className="p-2 text-left">
                    M میانگین وزنی:
                  </td>
                  <td className="p-2 text-center">{weightedM.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          className="btn btn-primary"
          onClick={() => handleCalculateI.mutate()}
          disabled={handleCalculateI.isPending}
        >
          {handleCalculateI.isPending ? "در حال محاسبه..." : "محاسبه ضریب i"}
        </button>
      </div>

      {assessment?.assessment.factor_i !== null && assessment?.assessment.factor_i !== undefined && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-primary">
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">نتیجه محاسبه:</div>
          <div className="text-2xl font-bold text-primary">
            i = {assessment.assessment.factor_i.toFixed(3)}
          </div>
          {assessment.assessment.factor_i !== null && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              HRR = {Math.round(25 * Math.pow(10, assessment.assessment.factor_i)).toLocaleString()} kW/m²
            </div>
          )}
        </div>
      )}
    </div>
  );
}
