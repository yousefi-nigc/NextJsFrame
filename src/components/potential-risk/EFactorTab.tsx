"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import Image from "next/image";
import mezzIntExit from "../../../public/assets/mezz_int_exit.png";
import mezzDirExit from "../../../public/assets/mezz_dir_exit.png";
import atriumLevels from "../../../public/assets/atrium_levels.png";
import loftDuplex from "../../../public/assets/loft_duplex.png";
import { CalculationResults } from "@/types";

interface EFactorTabProps {
  results: CalculationResults;
  updateResults: (updates: Partial<CalculationResults>) => void;
}

export default function EFactorTab({
  results,
  updateResults,
}: EFactorTabProps) {
  const [showAteruimodal, setShowAteruimodal] = useState(false);
  const [floorNumber, setFloorNumber] = useState<number | "">(0);

  const calculateE = () => {
    const E = typeof floorNumber === "number" ? floorNumber : 0;
    const absE = Math.abs(E);

    if (absE === 0) {
      updateResults({ e: 1 });
      return;
    }

    const e = Math.pow((absE + 3) / (absE + 2), 0.7 * absE);
    updateResults({ e });

    // Recalculate P, P1, P2 if other factors are available
    const { q, i, g, v, z } = results;
    if (q !== null && i !== null && g !== null && v !== null && z !== null) {
      const P = q * i * g * e * v * z;
      const P1 = q * i * e * v * z;
      const P2 = i * g * e * v * z;
      updateResults({ P, P1, P2 });
    }
  };

  return (
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
        className="px-3 py-2 md:px-7 md:py-3.5 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer bg-primary-dark text-white text-sm mb-3 sm:text-nowrap"
        onClick={() => setShowAteruimodal((prev) => !prev)}
      >
        📖 راهنمای آتریوم ، نیم‌طبقه ، لوفت و دوبلکس
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden mb-8 ${
          showAteruimodal
            ? "max-h-[5000px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="p-6 rounded-lg border"
          dir="rtl"
          style={{
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
            borderColor: "var(--color-border-color)",
          }}
        >
          <h2 className="text-xl font-bold mb-4">
            راهنمای ویژه FRAME 2015 - آتریوم، Mezzanine، لوفت و دوبلکس
          </h2>

          <p className="mb-4">
            در روش FRAME 2015، فضاهای معماری ویژه مانند{" "}
            <strong>آتریوم</strong>، نیم‌طبقه یا <em>mezzanine</em>، و
            همچنین واحدهای دوبلکس یا لوفت، شرایط خاصی در محاسبات ضرایب{" "}
            <strong>e</strong>، <strong>z</strong> و گاهی{" "}
            <strong>g</strong> ایجاد می‌کنند.
          </p>

          <h3 className="text-lg font-semibold mb-2">
            ۱. Mezzanine (نیم‌طبقه)
          </h3>
          <p className="mb-2">
            نیم‌طبقه بخشی است که مساحت آن کمتر از طبقه کامل بوده و درون
            همان فضا ساخته می‌شود.
          </p>
          <ul className="list-disc pr-6 mb-4 text-[15px] leading-7">
            <li>
              اگر نیم‌طبقه خروج داخلی داشته باشد → در محاسبه{" "}
              <strong>e</strong> به صورت <strong>اعشار</strong> اضافه
              می‌شود.
            </li>
            <li>
              اگر نیم‌طبقه خروج مستقیم داشته باشد → دسترسی امداد بهتر و
              مقدار <strong>z</strong> کمتر می‌شود.
            </li>
          </ul>

          <div className="space-y-4 mb-4">
            <Image
              src={mezzIntExit}
              alt="Mezzanine internal exit"
              className="w-fit rounded-lg"
            />

            <Image
              src={mezzDirExit}
              alt="Mezzanine direct exit"
              className="w-fit rounded-lg"
            />
          </div>

          <h3 className="text-lg font-semibold mb-2">۲. آتریوم</h3>
          <p className="mb-2">
            آتریوم فضایی چندسطحی است که طبقات را به‌طور مستقیم به هم متصل
            می‌کند.
          </p>

          <ul className="list-disc pr-6 mb-4 text-[15px] leading-7">
            <li>
              ارتفاع مؤثر طبقه در آتریوم بر ضریب <strong>e</strong> تأثیر
              دارد.
            </li>
            <li>
              تهویه طبیعی و مسیر دود خروجی می‌تواند <strong>k</strong> و{" "}
              <strong>v</strong> را تغییر دهد.
            </li>
          </ul>

          <Image
            src={atriumLevels}
            className="w-fit rounded-lg mb-4"
            alt="Atrium levels"
          />

          <h3 className="text-lg font-semibold mb-2">۳. لوفت و دوبلکس</h3>

          <p className="mb-2">
            طبقه دوم در این واحدها معمولاً بدون جداسازی کامل است،
            بنابراین:
          </p>

          <ul className="list-disc pr-6 mb-4 text-[15px] leading-7">
            <li>
              مقدار <strong>e</strong> برای طبقه دوم به صورت اعشاری محاسبه
              می‌شود.
            </li>
            <li>
              ضریب <strong>z</strong> باید دسترسی امداد به هر دو سطح را
              بررسی کند.
            </li>
          </ul>

          <Image
            src={loftDuplex}
            className="w-fit rounded-lg mb-4"
            alt="Loft duplex"
          />

          <p className="text-xs opacity-70 border-t pt-3">
            این راهنما بر اساس نسخه 2015 FRAME تهیه شده است.
          </p>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="floor-E" className="input-label">
          شماره طبقه (E)
        </label>

        <input
          type="number"
          step="0.01"
          id="floor-E"
          value={floorNumber}
          onChange={(e) =>
            setFloorNumber(
              e.target.value === "" ? "" : parseFloat(e.target.value)
            )
          }
          className="inline-block w-[140] ml-3 md:ml-6 md:w-[200px]"
          min="-4"
          max="150"
          placeholder="مثلاً 0, 2, 1.4"
        />

        <select
          id="preset-floor-E"
          className="inline-block w-[140px] md:w-[200px]"
          onChange={(e) => {
            if (e.target.value) {
              setFloorNumber(parseFloat(e.target.value));
            }
          }}
        >
          <option value="">انتخاب سریع</option>
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

      <button className="btn btn-primary" onClick={calculateE}>
        محاسبه ضریب e
      </button>

      {results.e !== null && (
        <div id="e-result" className="result-display mt-[1.2em]">
          <div className="result-value">{results.e.toFixed(3)}</div>
        </div>
      )}
    </div>
  );
}

