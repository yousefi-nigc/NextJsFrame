"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { CalculationResults } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { da } from "zod/v4/locales";
import { AssessmentUpdateApiResponse } from "@/lib/assessment/model/Assessment";

export default function QFactorTab({ projectId, floorId }: { projectId: string, floorId: string }) {
  const queryClient = useQueryClient();
  const [showQiGuide, setShowQiGuide] = useState(false);
  const [showQmGuide, setShowQmGuide] = useState(false);
  const [showQTable, setShowQTable] = useState(false);
  const [qi, setQi] = useState(800);
  const [qm, setQm] = useState(500);
  const [q, setQ] = useState<number | null>(null);


  // Mutation logic
  const handleCalculateQ = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/user/projects/${projectId}/floors/${floorId}/assessment`, {
        method: "PUT",
        body: JSON.stringify({ qi, qm }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("q محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });

      const res = data as AssessmentUpdateApiResponse;

      setQ(res.assessment.factor_q);
    },
    onError: (error) => {
      toast.error("خطا در محاسبه q");
      console.log(error);
    },
  })




  return (
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
            name="qi"
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
            name="qm"
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

      <button className="btn btn-primary" onClick={() => handleCalculateQ.mutate()}>
        محاسبه ضریب q
      </button>

      {/* {results.q !== null && ( */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary">
        <div className="result-value">{q ? q.toFixed(3) : "-"}</div>
        <div className="text-sm text-gray-600 text-center">
          (Q = {q ? q.toLocaleString() : "-"} MJ/m²)
        </div>
      </div>
      {/* )} */}

      {/* Table guide */}
      <div
        id="table-section"
        className={`transition-all duration-300 ${showQTable ? "block" : "hidden"
          }`}
      >
        {showQTable && (
          <div className="card mt-4 p-4 dark:bg-[#0f3460] rounded-lg shadow-md border border-[#35363630] dark:border-[#2196f380] max-w-full overflow-x-auto">
            <b>راهنمای انتخاب سریع:</b>

            <QiTable />
            <QmTable />

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
  );
}

const QmTable = () => {
  return <>
    {/* Qm Table */}
    <table className="table-auto border-collapse w-full mt-4 text-sm" >
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
    </table >
  </>
}

const QiTable = () => {
  return <>
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
  </>
}