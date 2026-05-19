"use client";

import { useState, useEffect } from "react";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AssessmentGetApiResponse,
  AssessmentUpdateApiResponse,
} from "@/lib/APIResponseInterfaces";

export default function GFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [showG1Guide, setShowG1Guide] = useState(false);
  const [showG2Guide, setShowG2Guide] = useState(false);
  const [showG3Guide, setShowG3Guide] = useState(false);
  const [showG4Guide, setShowG4Guide] = useState(false);
  const [showgGuide, setShowgGuide] = useState(false);
  const [accessType, setAccessType] = useState<"wide" | "narrow">("wide");
  const [sectionLength, setSectionLength] = useState<number>(0);
  const [sectionWidth, setSectionWidth] = useState<number>(0);
  const [sectionArea, setSectionArea] = useState<number | "">(600);
  const [isAreaManuallySet, setIsAreaManuallySet] = useState(false);
  const [derivedSide, setDerivedSide] = useState<"length" | "width" | null>(
    null,
  ); // which side is auto-updated from area

  function handleAreaChange(raw: string) {
    const newValue = raw === "" ? "" : parseFloat(raw);
    const numericArea =
      newValue === "" || isNaN(newValue as number) ? 0 : (newValue as number);
    setIsAreaManuallySet(numericArea > 0);
    setSectionArea(numericArea);
    if (numericArea > 0) {
      if (sectionLength > 0 && sectionWidth === 0) {
        const computedWidth = numericArea / sectionLength;
        setSectionWidth(parseFloat(computedWidth.toFixed(3)));
        setDerivedSide("width");
      } else if (sectionWidth > 0 && sectionLength === 0) {
        const computedLength = numericArea / sectionWidth;
        setSectionLength(parseFloat(computedLength.toFixed(3)));
        setDerivedSide("length");
      }
    } else {
      setDerivedSide(null);
    }
  }

  function handleLengthChange(raw: string) {
    const val = parseFloat(raw);
    const newLength = !isNaN(val) && val > 0 ? val : 0;
    setSectionLength(newLength);

    // If both dimensions are present, lock area and compute it
    if (newLength > 0 && sectionWidth > 0) {
      const computedArea = newLength * sectionWidth;
      setSectionArea(parseFloat(computedArea.toFixed(3)));
      setIsAreaManuallySet(false);
      setDerivedSide(null);
      return;
    }

    if (newLength > 0) {
      if (sectionWidth === 0) {
        setDerivedSide("width");
      } else if (derivedSide === "length") {
        setDerivedSide(null);
      }
    } else if (derivedSide === "length") {
      setDerivedSide(null);
    }
  }

  function handleWidthChange(raw: string) {
    const val = parseFloat(raw);
    const newWidth = !isNaN(val) && val > 0 ? val : 0;
    setSectionWidth(newWidth);

    // If both dimensions are present, lock area and compute it
    if (newWidth > 0 && sectionLength > 0) {
      const computedArea = sectionLength * newWidth;
      setSectionArea(parseFloat(computedArea.toFixed(3)));
      setIsAreaManuallySet(false);
      setDerivedSide(null);
      return;
    }

    if (newWidth > 0) {
      if (sectionLength === 0) {
        setDerivedSide("length");
      } else if (derivedSide === "width") {
        setDerivedSide(null);
      }
    } else if (derivedSide === "width") {
      setDerivedSide(null);
    }
  }

  function recomputeDerivedDimension() {
    const hasArea = typeof sectionArea === "number" && sectionArea > 0;
    if (!isAreaManuallySet || !hasArea || !derivedSide) return;

    const lengthReady = sectionLength > 0;
    const widthReady = sectionWidth > 0;
    if (derivedSide === "width" && !lengthReady) return;
    if (derivedSide === "length" && !widthReady) return;

    if (derivedSide === "width") {
      const computedWidth = (sectionArea as number) / sectionLength;
      setSectionWidth(parseFloat(computedWidth.toFixed(3)));
    } else if (derivedSide === "length") {
      const computedLength = (sectionArea as number) / sectionWidth;
      setSectionLength(parseFloat(computedLength.toFixed(3)));
    }
  }

  // Auto-calculate area when length or width changes
  useEffect(() => {
    if (!isAreaManuallySet && sectionLength > 0 && sectionWidth > 0) {
      const calculatedArea = sectionLength * sectionWidth;
      setSectionArea(calculatedArea);
    }
  }, [sectionLength, sectionWidth, isAreaManuallySet]);

  // Recalculate derived dimension immediately; keep 5s timer to continue tracking area changes
  useEffect(() => {
    const hasArea = typeof sectionArea === "number" && sectionArea > 0;
    if (!isAreaManuallySet || !hasArea || !derivedSide) return;

    const lengthReady = sectionLength > 0;
    const widthReady = sectionWidth > 0;
    if (derivedSide === "width" && !lengthReady) return;
    if (derivedSide === "length" && !widthReady) return;

    // Run instantly
    recomputeDerivedDimension();

    // Also schedule a run after 5s to keep in sync during continuous edits
    const timer = setTimeout(recomputeDerivedDimension, 5000);

    return () => clearTimeout(timer);
  }, [
    sectionArea,
    sectionLength,
    sectionWidth,
    isAreaManuallySet,
    derivedSide,
  ]);

  const { data: assessment, isLoading } = useQuery<AssessmentGetApiResponse>({
    queryKey: ["assessment", floorId],
    enabled: !!floorId,
    queryFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
      );
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch the assessment");

      const response = data as AssessmentGetApiResponse;

      setAccessType(
        (response.assessment.accessType as "wide" | "narrow") ?? "wide",
      );
      const loadedLength = response.assessment.length ?? 30;
      const loadedWidth = response.assessment.width ?? 20;
      const loadedArea = response.assessment.area;

      setSectionLength(loadedLength);
      setSectionWidth(loadedWidth);

      // If area is provided and doesn't match calculated area, mark as manually set
      if (loadedArea && loadedArea !== loadedLength * loadedWidth) {
        setIsAreaManuallySet(true);
        setSectionArea(loadedArea);
      } else {
        setIsAreaManuallySet(false);
        setSectionArea(loadedArea ?? "");
      }

      return response;
    },
  });

  const handleCalculateG = useMutation({
    mutationFn: async () => {
      const lengthVal =
        typeof sectionLength === "number" && sectionLength > 0
          ? sectionLength
          : undefined;
      const widthVal =
        typeof sectionWidth === "number" && sectionWidth > 0
          ? sectionWidth
          : undefined;
      const areaVal =
        typeof sectionArea === "number" && sectionArea > 0
          ? sectionArea
          : undefined;

      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          body: JSON.stringify({
            length: lengthVal,
            width: widthVal,
            area: areaVal,
            accessType,
          }),
        },
      );
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("g محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error("خطا در محاسبه g");
      console.log(error);
    },
  });

  return (
    <div id="g-factor" className="tab-content">
      <div className="formula-card">
        <div className="text-primary mb-3 text-lg font-semibold">
          فرمول محاسبه <b>g</b>
        </div>

        <div className="formula-content" dir="ltr">
          <BlockMath
            math={`g = \\frac{b + 5 \\times \\sqrt[3]{b^2 \\times l}}{200}`}
          />
        </div>
      </div>

      <div className="help-card">
        <div>
          <b>توضیح:</b>
          <span className="mr-1 text-gray-500 leading-relaxed text-sm dark:text-white">
            ضریب سطح، مقدار گسترش افقی آتش را بسته به ابعاد بخش و نوع پلان نشان
            می‌دهد. هرچه مساحت و شکل ساختمان به مربع نزدیک‌تر باشد (l ≈ b) و
            راهرو دسترسی به دلیل طول زیاد باریک‌تر باشد، g بزرگ‌تر خواهد شد.
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
              <li>عرض (b) را اندازه بگیرید یا مساحت کل (A) را داشته باشید.</li>
              <li>نوع دسترسی را مشخص کنید (wide یا narrow).</li>
              <li>اگر narrow انتخاب شد، طول و عرض جابجا می‌شوند.</li>
              <li>
                مقادیر را وارد کنید تا مطابق فرمول محاسبه شود:
                <code className="mr-2">g = (b + 5 × ∛(b² × l)) / 200</code>
              </li>
            </ol>
          </div>
        )}
      </div>

      <div className="input-group">
        <label className="input-label">
          نوع دسترسی به ساختمان
          <button
            type="button"
            onClick={() => setShowG1Guide((prev) => !prev)}
            className="text-[10px] font-semibold py-0.5 px-1 mr-1.5 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
          >
            راهنما
          </button>
        </label>
        <select
          id="access-type"
          value={accessType}
          onChange={(e) => setAccessType(e.target.value as "wide" | "narrow")}
          className="border p-2 rounded w-full"
        >
          <option value="wide">دسترسی از ضلع عریض (wide)</option>
          <option value="narrow">دسترسی از ضلع باریک (narrow)</option>
        </select>

        {showG1Guide && (
          <div className="relative text-gray-600 dark:text-gray-300 left-0 mt-2 p-4 bg-[#e0f7fa] dark:bg-[#0f3460] text-sm rounded-lg shadow-md border border-[#00bfae30] dark:border-[#2196f380] w-full z-20">
            <p className="font-bold">نوع دسترسی به ساختمان</p>
            <br />
            <p className="mb-2">
              نوع ضلع دسترسی آتش‌نشانان بر سرعت و اثربخشی عملیات کنترل آتش تاثیر
              زیادی دارد.
            </p>
            <p className="mb-1">
              - <b>دسترسی از ضلع عریض (Wide)</b> یعنی دسترسی به ساختمان از ضلع
              بزرگ‌تر پلان است و آتش‌نشانی می‌تواند به بخش زیادی از محیط سریع
              دسترسی داشته باشد.
            </p>
            <p className="mb-1">
              - <b>دسترسی از ضلع باریک (Narrow)</b> یعنی فقط ضلع کوچک‌تر در معرض
              دسترسی آتش‌نشانان است. در این حالت گسترش آتش کنترل سخت‌تری دارد و
              طول و عرض برای محاسبه ضریب g جابجا در نظر گرفته می‌شوند (
              <b>مطابق بخش 4.5.2 سند FRAME</b>).
            </p>
            <p>
              انتخاب درست نوع دسترسی بسیار مهم است، زیرا روی برآورد ایمنی اثر
              مستقیم می‌گذارد.
            </p>
          </div>
        )}
      </div>

      <div className="input-group">
        <label className="input-label">
          طول بخش (l)
          <button
            type="button"
            onClick={() => setShowG2Guide((prev) => !prev)}
            className="text-[10px] font-semibold py-0.5 px-1 mr-1.5 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
          >
            راهنما
          </button>
        </label>
        <div className="input-wrapper">
          <input
            type="number"
            id="section-length"
            min="1"
            step="1"
            value={sectionLength}
            onChange={(e) => handleLengthChange(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <span className="input-unit">متر</span>
        </div>

        {showG2Guide && (
          <div className="relative text-gray-600 dark:text-gray-300 left-0 mt-2 p-4 bg-[#e0f7fa] dark:bg-[#0f3460] text-sm rounded-lg shadow-md border border-[#00bfae30] dark:border-[#2196f380] w-full z-20">
            <p>
              <b>طول بخش (l)</b>
            </p>
            <br />
            <span className="text-[#666] dark:text-gray-300">
              <b>l</b> برابر با بیشترین فاصله بین مرکز دو ضلع روبروی هم در
              محدوده پلان طبقه است.
              <br />
              اگر شکل پلان مستطیل است، همان طول واقعی بزرگ‌تر را وارد کنید.
              <br />
              <b>در پلان‌های نامنظم</b>، از طول فرضی (طبق راهنمای سند: مساحت
              تقسیم بر عرض معادل) استفاده کنید.
              <br />
              <i>مثال:</i> در یک پلان مربعی، طول برابر با عرض خواهد بود. اگر
              پلان باریک است، طول همان ضلع بلند خواهد شد.
            </span>
          </div>
        )}
      </div>

      <div className="input-group">
        <label className="input-label">
          عرض بخش (b)
          <button
            type="button"
            onClick={() => setShowG3Guide((prev) => !prev)}
            className="text-[10px] font-semibold py-0.5 px-1 mr-1.5 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
          >
            راهنما
          </button>
        </label>
        <div className="input-wrapper">
          <input
            type="number"
            id="section-width"
            min="1"
            step="1"
            value={sectionWidth}
            onChange={(e) => handleWidthChange(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <span className="input-unit">متر</span>
        </div>

        {showG3Guide && (
          <div className="relative text-gray-600 dark:text-gray-300 left-0 mt-2 p-4 bg-[#e0f7fa] dark:bg-[#0f3460] text-sm rounded-lg shadow-md border border-[#00bfae30] dark:border-[#2196f380] w-full z-20">
            <p>
              <b>عرض بخش (b)</b>
            </p>
            <br />
            <span className="text-[#666] dark:text-gray-300">
              <b>b</b> معادل عرض موثر پلان در نقطه ورودی یا &quot;عرض
              معادل&quot; است (بدست آمده از تقسیم مساحت بخش به طول l).
              <br />
              ورود مقدار دقیق عرض زمانی ضروری است که پلان نامتقارن یا کشیده
              باشد.
              <br />
              در صورت عدم قطعیت، از تقسیم مساحت به طول برای محاسبه استفاده کنید.
              <br />
              <i>یادآوری:</i> اگر فقط مساحت و طول را می‌دانید، می‌توانید مقدار
              عرض را خالی بگذارید تا سیستم خودش محاسبه کند.
            </span>
          </div>
        )}
      </div>

      <div className="input-group">
        <label className="input-label">
          مساحت
          <button
            type="button"
            onClick={() => setShowG4Guide((prev) => !prev)}
            className="text-[10px] font-semibold py-0.5 px-1 mr-1.5 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
          >
            راهنما
          </button>
        </label>
        <div className="input-wrapper">
          <input
            type="number"
            id="section-area"
            min="1"
            step="1"
            placeholder="اختیاری"
            value={sectionArea}
            onChange={(e) => handleAreaChange(e.target.value)}
            disabled={
              !isAreaManuallySet && sectionLength > 0 && sectionWidth > 0
            }
            title={
              !isAreaManuallySet && sectionLength > 0 && sectionWidth > 0
                ? "مساحت از طول و عرض محاسبه شده است؛ برای ویرایش، یکی از ابعاد را پاک کنید"
                : ""
            }
            className={`border p-2 rounded w-full ${!isAreaManuallySet && sectionLength > 0 && sectionWidth > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          />
          <span className="input-unit">متر مربع</span>
        </div>

        {showG4Guide && (
          <div className="relative text-gray-600 dark:text-gray-300 left-0 mt-2 p-4 bg-[#e0f7fa] dark:bg-[#0f3460] text-sm rounded-lg shadow-md border border-[#00bfae30] dark:border-[#2196f380] w-full z-20">
            <p>
              <b>مساحت</b>
            </p>
            <br />
            <span className="text-[#666] dark:text-gray-300">
              اگر فقط مساحت پلان را دارید و یکی از ابعاد l یا b را می‌دانید،
              وارد کردن مقدار مساحت کافی است.
              <br />
              <b>مساحت معادل = طول × عرض</b>
              <br />
              در محاسبه ضریب گسترش (g)، این مقدار به تعیین دقیق ابعاد موثر
              خصوصاً در پلان‌های نامنظم و راهروها کمک می‌کند.
              <br />
              <i>توصیه:</i> همیشه از مقدار دقیق و مهندسی‌شده مساحت طبق نقشه
              تأیید شده استفاده کنید.
            </span>
          </div>
        )}
      </div>

      <button
        className="btn btn-primary"
        onClick={() => handleCalculateG.mutate()}
      >
        محاسبه ضریب g
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          {assessment?.assessment.factor_g
            ? assessment?.assessment.factor_g.toFixed(3)
            : "-"}
        </div>
      </div>
    </div>
  );
}
