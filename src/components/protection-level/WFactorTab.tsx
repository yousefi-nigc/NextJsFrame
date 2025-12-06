"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { CalculationResults } from "@/types";

interface WFactorTabProps {
  results: CalculationResults;
  updateResults: (updates: Partial<CalculationResults>) => void;
}

export default function WFactorTab({
  results,
  updateResults,
}: WFactorTabProps) {
  const [showW1Guide, setShowW1Guide] = useState(false);
  const [showW2Guide, setShowW2Guide] = useState(false);
  const [showW3Guide, setShowW3Guide] = useState(false);
  const [showW4Guide, setShowW4Guide] = useState(false);
  const [waterStorageType, setWaterStorageType] = useState("auto");
  const [waterCapacity, setWaterCapacity] = useState(0);
  const [distributionNetwork, setDistributionNetwork] = useState("adequate");
  const [hydrant25, setHydrant25] = useState(0);
  const [hydrant3, setHydrant3] = useState(0);
  const [hydrant4, setHydrant4] = useState(0);

  const calculateW = () => {
    // Calculate w1
    let w1 = 0;
    if (waterStorageType === "manual") w1 = 4;
    else if (waterStorageType === "none") w1 = 10;

    // Calculate w2 (simplified - would need fire load to calculate properly)
    // For now, assuming 100% capacity = 0 penalty
    const w2 = 0; // This should be calculated based on required vs available

    // Calculate w3
    let w3 = 0;
    if (distributionNetwork === "limited") w3 = 2;
    else if (distributionNetwork === "none") w3 = 6;

    // Calculate w4 (simplified - would need perimeter to calculate properly)
    const equivalentConnections = hydrant25 + hydrant3 * 2 + hydrant4 * 3;
    const w4 = equivalentConnections > 0 ? 0 : 4; // Simplified

    const w = w1 + w2 + w3 + w4;
    const W = Math.pow(0.95, w);
    updateResults({ W });

    // Recalculate D, D1, D2 if other factors are available
    const { N, S, F, U, Y } = results;
    if (N !== null && S !== null && F !== null) {
      const D = W * N * S * F;
      updateResults({ D });
    }
    if (N !== null && U !== null) {
      const D1 = N * U;
      updateResults({ D1 });
    }
    if (W !== null && N !== null && S !== null && Y !== null) {
      const D2 = W * N * S * Y;
      updateResults({ D2 });
    }
  };

  return (
    <div id="w-water" className="tab-content">
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
        <select
          id="water-storage-type"
          value={waterStorageType}
          onChange={(e) => setWaterStorageType(e.target.value)}
        >
          <option value="auto">ذخیره اتوماتیک (w₁=0)</option>
          <option value="manual">ذخیره دستی (w₁=4)</option>
          <option value="none">بدون ذخیره (≤300m) (w₁=10)</option>
        </select>
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
            value={waterCapacity}
            onChange={(e) => setWaterCapacity(parseFloat(e.target.value) || 0)}
          />
          <span className="input-unit">m³</span>
          <div className="input-hint">
            <i className="fas fa-info-circle"></i>
            آب مورد نیاز = مجموع بار آتش (MJ/m²) ÷ 4 جریمه w₂: 0%&rarr;4,
            70%&rarr;3, 80%&rarr;2, 90%&rarr;1, 100%&rarr;0
          </div>
        </div>
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
        <select
          id="distribution-network"
          value={distributionNetwork}
          onChange={(e) => setDistributionNetwork(e.target.value)}
        >
          <option value="adequate">شبکه مناسب (w₃=0)</option>
          <option value="limited">محدود (w₃=2)</option>
          <option value="none">بدون شبکه (w₃=6)</option>
        </select>
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
            value={hydrant25}
            onChange={(e) => setHydrant25(parseFloat(e.target.value) || 0)}
            min="0"
          />
          <span className="input-unit">عدد</span>
        </div>

        <div className="input-wrapper">
          <input
            type="number"
            id="hydrant-3"
            placeholder='تعداد 3"'
            value={hydrant3}
            onChange={(e) => setHydrant3(parseFloat(e.target.value) || 0)}
            min="0"
          />
          <span className="input-unit">عدد</span>
        </div>

        <div className="input-wrapper">
          <input
            type="number"
            id="hydrant-4"
            placeholder='تعداد 4"(100)'
            value={hydrant4}
            onChange={(e) => setHydrant4(parseFloat(e.target.value) || 0)}
            min="0"
          />
          <span className="input-unit">عدد</span>
          <div className="input-hint">
            <i className="fas fa-info-circle"></i>
            نیاز: ≥ 1 اتصال 2.5&quot; به ازای هر 50m محیط 3&quot; معادل
            2&times;اتصال 2.5&quot; | 4&quot; معادل 3&times;اتصال 2.5&quot;
          </div>
        </div>
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

      <button className="btn btn-primary" onClick={calculateW}>
        محاسبه W (FRAME 2015)
      </button>

      {results.W !== null && (
        <div id="W-result" className="result-display mt-4">
          <div className="result-value">{results.W.toFixed(3)}</div>
        </div>
      )}
    </div>
  );
}

