"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AssessmentGetApiResponse,
  AssessmentUpdateApiResponse,
} from "@/lib/APIResponseInterfaces";

export default function ZFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [showZGuide, setShowZGuide] = useState(false);
  const [sectionWidth, setSectionWidth] = useState(20);
  const [accessDirections, setAccessDirections] = useState(1);
  const [heightAbove, setHeightAbove] = useState<number>(0);
  const [heightBelow, setHeightBelow] = useState<number>(0);

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

      setSectionWidth(response.assessment.width ?? 20);
      setAccessDirections(response.assessment.accessSides ?? 1);
      setHeightAbove(response.assessment.heightAbove ?? 0);
      setHeightBelow(response.assessment.depthBelow ?? 0);

      return response;
    },
  });

  const handleCalculateZ = useMutation({
    mutationFn: async () => {
      // Validate that width is available (should be set from G section)
      if (!sectionWidth || sectionWidth <= 0) {
        throw new Error("لطفاً ابتدا عرض ساختمان (b) را در بخش محاسبه ضریب g وارد کنید");
      }

      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            width: sectionWidth,
            accessSides: accessDirections,
            heightAbove: heightAbove,
            depthBelow: heightBelow,
          }),
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("z محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "خطا در محاسبه z";
      toast.error(errorMessage);
      console.log(error);
    },
  });

  return (
    <div id="z-factor" className="tab-content mt-6">
      <div className="formula-card">
        <div className="mb-3 flex items-center justify-center">
          <h3 className="text-primary text-lg font-semibold">فرمول محاسبه z</h3>
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
                <b>H⁺</b> = ارتفاعی که باید از سطح دسترسی تا محل حریق به بالا
                رفت (متر).
              </li>
              <li>
                <b>H⁻</b> = عمقی که باید به پایین رفت تا به محل حریق رسید (متر).
              </li>
            </ul>

            <p>
              <b>مقسوم‌علیه ثابت‌ها:</b>
            </p>
            <ul>
              <li>
                ۲۰ متر = طول استاندارد یک شلنگ آتش‌نشانی در بسیاری از کشورها.
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
                هر چه Z بیشتر باشد (دسترسی از چند سمت)، این عدد کوچک‌تر و دسترسی
                آسان‌تر می‌شود.
              </li>
            </ul>

            <h4 className="font-semibold flex items-center justify-center gap-1">
              ب) قسمت دوم:
              <div className="flex items-center justify-center gap-1" dir="ltr">
                <BlockMath math={"\\frac{H^+}{25}"} />
                <span className="my-1 inline-block">یا</span>
                <BlockMath math={"\\frac{H^-}{3}"} />
              </div>
            </h4>

            <p>
              <span className="font-semibold">بالا رفتن (H⁺):</span> ارتفاع از
              محل توقف ماشین آتش‌نشانی تا طبقه محل حریق تقسیم بر ۲۵ متر.
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
                ۳ متر: ارتفاع معمولی یک طبقه زیرزمین؛ این عمق با دود/حرارت جهت
                بالا کار را سخت‌تر می‌کند.
              </li>
            </ul>

            <h4 className="font-semibold">پ) قسمت سوم: INT[…]</h4>
            <p>INT یعنی فقط قسمت صحیح عدد محاسبه‌شده بدون گرد کردن اعشار.</p>

            <p>
              <b>محدوده z:</b> از 1.00 (دسترسی عالی) تا حدود 1.20 (محدود) یا
              بیشتر در شرایط خاص.
            </p>
          </div>
        )}
      </div>

      <div className="help-card">
        <div className="text-primary mb-3 font-semibold">توضیحات</div>
        <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
          ضریب دسترسی میزان سهولت دسترسی آتش‌نشانان به محل را نشان می‌دهد. INT
          بخش صحیح عدد است. برای طبقات بالا از H+ و برای زیرزمین از H- استفاده
          کنید. <br />
          <b>Z:</b> تعداد جبهه‌های دسترسی مستقل آتش‌نشانی (عدد صحیح: 1 تا 4)
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">عرض مؤثر ساختمان (b)</label>
        {!assessment?.assessment.width && (
          <div className="mb-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ <strong>توجه:</strong> لطفاً ابتدا عرض ساختمان را در بخش <strong>محاسبه ضریب g</strong> وارد کرده و محاسبه کنید.
            </p>
          </div>
        )}
        <div className="input-wrapper">
          <input
            type="number"
            id="section-width-z"
            min="1"
            step="0.1"
            value={sectionWidth}
            readOnly
            disabled
            className="opacity-70 cursor-not-allowed bg-gray-100 dark:bg-gray-800"
          />
          <span className="input-unit">متر</span>
        </div>
        {assessment?.assessment.width ? (
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            ✓ مقدار از بخش g بارگذاری شد: {assessment.assessment.width} متر (فقط خواندنی)
          </p>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            این مقدار باید از بخش g وارد شود
          </p>
        )}
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
            value={accessDirections}
            onChange={(e) => setAccessDirections(parseInt(e.target.value) || 1)}
          />
          <span className="input-unit">عدد</span>
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">ارتفاع بالای سطح دسترسی (H+)</label>
        <div className="input-wrapper">
          <input
            type="number"
            id="height-above-z"
            min="0"
            step="1"
            value={heightAbove}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0;
              setHeightAbove(value);
              // Clear heightBelow when H+ is entered
              if (value > 0) {
                setHeightBelow(0);
              }
            }}
            disabled={heightBelow > 0}
          />
          <span className="input-unit">متر</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {heightBelow > 0 ? "⚠️ ابتدا مقدار H- را صفر کنید" : "برای طبقات بالای سطح دسترسی"}
        </p>
      </div>

      <div className="input-group">
        <label className="input-label">عمق زیر سطح دسترسی (H-)</label>
        <div className="input-wrapper">
          <input
            type="number"
            id="height-below-z"
            min="0"
            step="1"
            value={heightBelow}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0;
              setHeightBelow(value);
              // Clear heightAbove when H- is entered
              if (value > 0) {
                setHeightAbove(0);
              }
            }}
            disabled={heightAbove > 0}
          />
          <span className="input-unit">متر</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {heightAbove > 0 ? "⚠️ ابتدا مقدار H+ را صفر کنید" : "برای زیرزمین‌ها و طبقات زیر سطح دسترسی"}
        </p>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => handleCalculateZ.mutate()}
      >
        محاسبه ضریب z
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          <span>z = </span>
          {assessment?.assessment.factor_z
            ? assessment?.assessment.factor_z.toFixed(3)
            : "-"}
        </div>
      </div>
    </div>
  );
}
