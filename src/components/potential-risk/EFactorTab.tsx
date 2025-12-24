"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AssessmentGetApiResponse,
  AssessmentUpdateApiResponse,
} from "@/lib/APIResponseInterfaces";
import mezzIntExit from "../../../public/assets/mezz_int_exit.png";
import mezzDirExit from "../../../public/assets/mezz_dir_exit.png";
import atriumLevels from "../../../public/assets/atrium_levels.png";
import loftDuplex from "../../../public/assets/loft_duplex.png";

export default function EFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [showAteruimodal, setShowAteruimodal] = useState(false);
  const [floorNumber, setFloorNumber] = useState<number>(0);
  const [floorNumberInput, setFloorNumberInput] = useState<string>("0");

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

      const loadedLevel = response.assessment.floorLevel ?? 0;
      setFloorNumber(loadedLevel);
      setFloorNumberInput(loadedLevel.toString());

      return response;
    },
  });

  const handleCalculateE = useMutation({
    mutationFn: async () => {
      console.log("Calculating E with floorLevel:", floorNumber, "type:", typeof floorNumber);
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            floorLevel: floorNumber,
          }),
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("e محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error("خطا در محاسبه e");
      console.log(error);
    },
  });

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
        <div className="text-primary mb-3 font-semibold">توضیحات مهندسی</div>
        <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
          ضریب طبقه، اثر ارتفاع یا عمق طبقه نسبت به سطح زمین را لحاظ می‌کند.
          <br />
          هرچه طبقه موردنظر بالاتر یا پایین‌تر باشد، <b>e</b> بیشتر شده و ریسک
          افزایش می‌یابد.
          <br />
          <span className="text-[#7986cb]">
            برای طبقات با گالری/نیم‌طبقه (مثل سالن‌های چندسطحی)، مقدار اعشاری
            وارد کنید.
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
          showAteruimodal ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
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
            در روش FRAME 2015، فضاهای معماری ویژه مانند <strong>آتریوم</strong>،
            نیم‌طبقه یا <em>mezzanine</em>، و همچنین واحدهای دوبلکس یا لوفت،
            شرایط خاصی در محاسبات ضرایب <strong>e</strong>، <strong>z</strong> و
            گاهی <strong>g</strong> به‌وجود می‌آورند. عدم توجه به این موارد
            می‌تواند منجر به برآورد نادرست ریسک حریق شود.
          </p>

          {/* ----------------------------- 1. Mezzanine ----------------------------- */}
          <h3 className="text-lg font-semibold mb-2">
            ۱. Mezzanine (نیم‌طبقه)
          </h3>
          <p className="mb-2">
            نیم‌طبقه بخشی است که مساحت آن کمتر از طبقه کامل بوده و معمولاً درون
            طبقه اصلی ساخته می‌شود. در FRAME، اثر mezzanine بیشتر بر ضریب e و z
            دیده می‌شود:
          </p>

          <ul className="list-disc pr-6 mb-4 text-[15px] leading-7">
            <li>
              اگر نیم‌طبقه به‌صورت داخلی به فضای اصلی متصل باشد (خروج داخلی)،
              تخلیه و تهویه سخت‌تر است و در محاسبه <strong>e</strong> باید
              به‌صورت <strong>اعشار</strong> به طبقه کامل اضافه شود.
              <br />
              <code className="text-sm opacity-80">
                مثال: طبقه اول با ۴۰٪ مساحت نیم‌طبقه → E = 1.4
              </code>
            </li>
            <li>
              اگر نیم‌طبقه خروج مستقیم به بیرون داشته باشد، ممکن است دسترسی
              امداد بهبود پیدا کند و مقدار <strong>z</strong> کاهش یابد.
            </li>
          </ul>

          <div className="space-y-4 mb-4">
            <figure className="space-y-2">
              <Image
                src={mezzIntExit}
                alt="Mezzanine internal exit"
                className="w-fit rounded-lg"
              />
              <figcaption className="text-xs opacity-70">
                نیم‌طبقه با خروج داخلی — نیازمند محاسبه e اعشاری و بررسی تأثیر
                بر z
              </figcaption>
            </figure>

            <figure className="space-y-2">
              <Image
                src={mezzDirExit}
                alt="Mezzanine direct exit"
                className="w-fit rounded-lg"
              />
              <figcaption className="text-xs opacity-70">
                نیم‌طبقه با خروج مستقیم — بهبود تخلیه و کاهش بار روی ضریب t
              </figcaption>
            </figure>
          </div>

          {/* ----------------------------- 2. Atrium ----------------------------- */}
          <h3 className="text-lg font-semibold mb-2">۲. آتریوم</h3>
          <p className="mb-2">
            آتریوم فضایی باز و چندسطحی است که معمولاً طبقات را در بر می‌گیرد و
            باعث ارتباط مستقیم بین بخش‌های مختلف ساختمان می‌شود.
          </p>

          <ul className="list-disc pr-6 mb-4 text-[15px] leading-7">
            <li>
              در محاسبه <strong>e</strong>، باید ارتفاع مؤثر طبقه را بر اساس
              بالاترین نقطه قابل‌استفاده محاسبه کرد.
            </li>
            <li>
              آتریوم بر تخلیه دود و مسیرهای دسترسی امداد اثر دارد و می‌تواند{" "}
              <strong>k</strong> (نسبت تهویه) و <strong>v</strong> (ضریب تهویه)
              را تغییر دهد.
            </li>
          </ul>

          <figure className="space-y-2 mb-4">
            <Image
              src={atriumLevels}
              className="w-fit rounded-lg"
              alt="Atrium levels"
            />
            <figcaption className="text-xs opacity-70">
              چیدمان طبقات و نحوه محاسبه e در یک آتریوم
            </figcaption>
          </figure>

          {/* ----------------------------- 3. Loft & Duplex ----------------------------- */}
          <h3 className="text-lg font-semibold mb-2">۳. لوفت و دوبلکس</h3>

          <p className="mb-2">
            در واحدهای دوبلکس یا لوفت، طبقه بالایی بدون جداسازی کامل به طبقه
            پایین متصل است. این موضوع باعث می‌شود:
          </p>

          <ul className="list-disc pr-6 mb-4 text-[15px] leading-7">
            <li>
              در محاسبه <strong>e</strong>، شماره طبقه به‌صورت اعشاری در نظر
              گرفته شود (مشابه mezzanine).
            </li>
            <li>
              برای <strong>z</strong>، باید دسترسی آتش‌نشانی به هر دو سطح بررسی
              شود، حتی اگر فقط یک ورودی مشترک وجود داشته باشد.
            </li>
          </ul>

          <figure className="space-y-2 mb-4">
            <Image
              src={loftDuplex}
              className="w-fit rounded-lg"
              alt="Loft duplex"
            />
            <figcaption className="text-xs opacity-70">
              دسترسی امداد به طبقات لوفت و دوبلکس و تأثیر بر z
            </figcaption>
          </figure>

          {/* ----------------------------- 4. Effect on Other Coefficients ----------------------------- */}
          <h3 className="text-lg font-semibold mb-2">۴. اثر بر سایر ضرایب</h3>
          <p className="mb-4">
            این فضاهای خاص ممکن است ضریب <strong>g</strong> را نیز تغییر دهند،
            خصوصاً اگر به افزایش ابعاد مؤثر پلان منجر شوند یا دسترسی از ضلع
            باریک/عریض تغییر کند.
          </p>

          <p className="text-xs opacity-70 border-t pt-3">
            این راهنما بر اساس نسخه 2015 FRAME تهیه شده است. در نسخه 2008 ممکن
            است پارامترها و ضرایب کمی تفاوت داشته باشند.
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
          value={floorNumberInput}
          onChange={(e) => {
            const value = e.target.value;
            setFloorNumberInput(value);
            // Update the actual number value only if it's valid (including 0)
            if (value === "" || value === "-") {
              // Keep previous value when input is empty or just a minus sign
              return;
            }
            const numValue = parseFloat(value);
            if (!isNaN(numValue)) {
              setFloorNumber(numValue);
            }
          }}
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
              const numValue = parseFloat(e.target.value);
              setFloorNumber(numValue);
              setFloorNumberInput(e.target.value);
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

      <button
        className="btn btn-primary"
        onClick={() => handleCalculateE.mutate()}
      >
        محاسبه ضریب e
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        {assessment?.assessment.factor_e ? (
          <>
            <div
              className="result-value text-2xl font-bold mb-2"
              style={{
                color:
                  assessment.assessment.factor_e <= 1.1
                    ? "#43a047"
                    : assessment.assessment.factor_e <= 1.4
                    ? "#fbc02d"
                    : assessment.assessment.factor_e <= 1.7
                    ? "#f57c00"
                    : assessment.assessment.factor_e <= 2
                    ? "#d32f2f"
                    : "#880e4f",
              }}
            >
              e = {assessment.assessment.factor_e.toFixed(3)}
            </div>
            <div
              className="mb-2"
              style={{
                color:
                  assessment.assessment.factor_e <= 1.1
                    ? "#43a047"
                    : assessment.assessment.factor_e <= 1.4
                    ? "#fbc02d"
                    : assessment.assessment.factor_e <= 1.7
                    ? "#f57c00"
                    : assessment.assessment.factor_e <= 2
                    ? "#d32f2f"
                    : "#880e4f",
              }}
            >
              {assessment.assessment.factor_e <= 1.1
                ? "همکف/طبقات نزدیک زمین - ریسک معمولی"
                : assessment.assessment.factor_e <= 1.4
                ? "طبقات پایین (تا دوم) - ریسک کمی بیشتر"
                : assessment.assessment.factor_e <= 1.7
                ? "طبقات متوسط (۳ تا ۵ یا گالری بزرگ) - ریسک بالا"
                : assessment.assessment.factor_e <= 2
                ? "طبقات بسیار بلند/زیرزمین‌های عمیق - ریسک ویژه!"
                : "عدد خیلی بالا! بررسی مدل لازم است."}
            </div>
            <div className="text-gray-600 text-sm dark:text-gray-400">
              مقدار واردشده: E = {floorNumber}{" "}
              {typeof floorNumber === "number" && floorNumber % 1 !== 0
                ? "(اعشاری/گالری یا نیم‌طبقه)"
                : "(شماره‌طبقه معمولی)"}
            </div>
          </>
        ) : (
          <div className="result-value">-</div>
        )}
      </div>
    </div>
  );
}
