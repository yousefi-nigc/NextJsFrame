"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AssessmentGetApiResponse,
  AssessmentUpdateApiResponse,
} from "@/lib/APIResponseInterfaces";

// Helper function to calculate t factor (simplified version)
function calculateTFactor(
  length: number | undefined,
  width: number | undefined,
  area: number | undefined,
  occupantCount: number | undefined,
  occupantFactor: number | undefined,
  exitWidthTotal: number | undefined,
  mobilityFactor: number | undefined,
  heightAbove: number | undefined,
  depthBelow: number | undefined
): { tValue: number | null; timeMinutes: number | null; status: string } {
  let b = width || 0;
  let l = length || 0;
  let area_calc = area || 0;

  if ((!area_calc || area_calc <= 0) && b > 0 && l > 0) {
    area_calc = b * l;
  }

  let X = occupantCount || 0;
  if (
    (!X || X <= 0) &&
    occupantFactor !== undefined &&
    occupantFactor > 0 &&
    area_calc > 0
  ) {
    X = Math.round(area_calc * occupantFactor);
  }

  if (!X || X <= 0) return { tValue: null, timeMinutes: null, status: "" };

  let K = exitWidthTotal || 0;
  if (!K || K <= 0) return { tValue: null, timeMinutes: null, status: "" };
  if (K < 0.6) return { tValue: null, timeMinutes: null, status: "" };

  const x = K / 0.6;
  const p = mobilityFactor || 1;
  const Hplus = heightAbove || 0;
  const Hminus = depthBelow || 0;

  if (b <= 0 || l <= 0) return { tValue: null, timeMinutes: null, status: "" };

  const numerator =
    p * (b + l + X / x + 1.25 * Hplus + 2 * Hminus) * (x * (b + l));
  const denominator = 800 * K * (1.4 * x * (b + l) - 0.44 * X);

  if (denominator <= 0) return { tValue: null, timeMinutes: null, status: "" };

  const tHours = numerator / denominator;
  const timeMinutes = tHours * 60;

  // Convert time to t factor
  let tValue = 0;
  if (timeMinutes <= 1) tValue = 0;
  else if (timeMinutes <= 2) tValue = 0.1;
  else if (timeMinutes <= 3) tValue = 0.2;
  else if (timeMinutes <= 4) tValue = 0.3;
  else if (timeMinutes <= 5) tValue = 0.4;
  else tValue = 0.5;

  let status = "";
  if (timeMinutes <= 1) status = "عالی";
  else if (timeMinutes <= 2) status = "خوب";
  else if (timeMinutes <= 3) status = "متوسط";
  else if (timeMinutes <= 4) status = "نیاز به بهبود";
  else if (timeMinutes <= 5) status = "بحرانی";
  else status = "غیرقابل قبول";

  return { tValue, timeMinutes, status };
}

export default function EvacuationTimeTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [occupantFactor, setOccupantFactor] = useState<string>("");
  const [occupantCount, setOccupantCount] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [exitWidths, setExitWidths] = useState<string>("");
  const [exitWidthTotal, setExitWidthTotal] = useState<string>("");
  const [exitCountToOpenSpace, setExitCountToOpenSpace] = useState<string>("");
  const [mobilityFactor, setMobilityFactor] = useState<string>("1");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [heightAbove, setHeightAbove] = useState<string>("");
  const [depthBelow, setDepthBelow] = useState<string>("");
  const [showIntermediate, setShowIntermediate] = useState(false);
  const [calcResult, setCalcResult] = useState<{
    tValue: number | null;
    timeMinutes: number | null;
    status: string;
  } | null>(null);

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

      setOccupantFactor(response.assessment.occupantFactor?.toString() ?? "");
      setOccupantCount(response.assessment.occupantCount?.toString() ?? "");
      setArea(response.assessment.area?.toString() ?? "");
      setExitWidthTotal(response.assessment.exitWidthTotal?.toString() ?? "");
      setMobilityFactor(response.assessment.mobilityFactor?.toString() ?? "1");
      setLength(response.assessment.length?.toString() ?? "");
      setWidth(response.assessment.width?.toString() ?? "");
      setHeightAbove(response.assessment.heightAbove?.toString() ?? "");
      setDepthBelow(response.assessment.depthBelow?.toString() ?? "");

      return response;
    },
  });

  const handleCalculate = useMutation({
    mutationFn: async () => {
      const exitWidthsArray = exitWidths
        .split(",")
        .map((w) => parseFloat(w.trim()))
        .filter((w) => !isNaN(w) && w > 0);

      const calculatedK =
        exitWidthTotal && parseFloat(exitWidthTotal) > 0
          ? parseFloat(exitWidthTotal)
          : exitWidthsArray.reduce((sum, w) => sum + w, 0);

      const result = calculateTFactor(
        length ? parseFloat(length) : undefined,
        width ? parseFloat(width) : undefined,
        area ? parseFloat(area) : undefined,
        occupantCount ? parseFloat(occupantCount) : undefined,
        occupantFactor ? parseFloat(occupantFactor) : undefined,
        calculatedK > 0 ? calculatedK : undefined,
        mobilityFactor ? parseFloat(mobilityFactor) : undefined,
        heightAbove ? parseFloat(heightAbove) : undefined,
        depthBelow ? parseFloat(depthBelow) : undefined
      );

      setCalcResult(result);
      setShowIntermediate(true);

      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          body: JSON.stringify({
            length: length ? parseFloat(length) : undefined,
            width: width ? parseFloat(width) : undefined,
            area: area ? parseFloat(area) : undefined,
            occupantCount: occupantCount ? parseInt(occupantCount) : undefined,
            occupantFactor: occupantFactor
              ? parseFloat(occupantFactor)
              : undefined,
            exitWidthTotal: calculatedK > 0 ? calculatedK : undefined,
            mobilityFactor: mobilityFactor
              ? parseFloat(mobilityFactor)
              : undefined,
            heightAbove: heightAbove ? parseFloat(heightAbove) : undefined,
            depthBelow: depthBelow ? parseFloat(depthBelow) : undefined,
          }),
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("t محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error("خطا در محاسبه t");
      console.log(error);
    },
  });

  return (
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
      </div>

      <div className="input-group">
        <label>کاربری و ضریب بار اشغال</label>
        <select
          value={occupantFactor}
          onChange={(e) => setOccupantFactor(e.target.value)}
        >
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

      <div className="input-group">
        <label>تعداد افراد (X)</label>
        <input
          type="number"
          value={occupantCount}
          onChange={(e) => setOccupantCount(e.target.value)}
          min="0"
          step="1"
          placeholder="در صورت خالی گذاشتن، از ضریب بار اشغال محاسبه می‌شود"
        />
      </div>

      <div className="input-group">
        <label>مساحت بخش (m²)</label>
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          min="1"
          step="1"
          placeholder="یا از طول × عرض محاسبه می‌شود"
        />
      </div>

      <div className="input-group">
        <label>عرض مؤثر مسیرهای خروج (متر) – جدا با کاما</label>
        <input
          type="text"
          value={exitWidths}
          onChange={(e) => setExitWidths(e.target.value)}
          placeholder="مثلاً 1.2, 0.9, 2.0"
        />
      </div>

      <div className="input-group">
        <label>عرض مؤثر کل (K) - دستی</label>
        <input
          type="number"
          value={exitWidthTotal}
          onChange={(e) => setExitWidthTotal(e.target.value)}
          step="0.1"
          min="0.6"
          max="10"
          placeholder="محاسبه خودکار"
        />
        <span className="unit">متر</span>
      </div>

      <div className="input-group">
        <label>تعداد خروج‌های منتهی به فضای آزاد </label>
        <input
          type="number"
          value={exitCountToOpenSpace}
          onChange={(e) => setExitCountToOpenSpace(e.target.value)}
          min="1"
          placeholder="خروجی مستقیم به بیرون"
        />
      </div>

      <div className="input-group">
        <label>ضریب تحرک (p)</label>
        <select
          value={mobilityFactor}
          onChange={(e) => setMobilityFactor(e.target.value)}
        >
          <option value="1">A – متحرک و مستقل</option>
          <option value="2">B – نیازمند راهنمایی</option>
          <option value="8">C – تحرک محدود</option>
          <option value="20">D – نیازمند کمک فردی</option>
          <option value="6.1">E – گروه مختلط</option>
        </select>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label>طول بخش (l) - متر</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min="1"
            step="0.1"
            placeholder="بزرگترین بُعد"
          />
        </div>
        <div className="input-group">
          <label>عرض بخش (b) - متر</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            min="1"
            step="0.1"
            placeholder="کوچکترین بُعد"
          />
        </div>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label>ارتفاع بالای سطح زمین (H+) - متر</label>
          <input
            type="number"
            value={heightAbove}
            onChange={(e) => setHeightAbove(e.target.value)}
            min="0"
            step="0.1"
            placeholder="ارتفاع طبقه"
          />
        </div>
        <div className="input-group">
          <label>عمق زیر سطح زمین (H-) - متر</label>
          <input
            type="number"
            value={depthBelow}
            onChange={(e) => setDepthBelow(e.target.value)}
            min="0"
            step="0.1"
            placeholder="عمق زیرزمین"
          />
        </div>
      </div>

      {showIntermediate && calcResult && (
        <div className="intermediate-results">
          <h4>محاسبات میانی:</h4>
          <div className="calc-detail">
            <span className="calc-label">زمان تخلیه:</span>
            <span className="calc-value">
              {calcResult.timeMinutes?.toFixed(2)} دقیقه
            </span>
          </div>
          <div className="calc-detail">
            <span className="calc-label">وضعیت:</span>
            <span className="calc-value">{calcResult.status}</span>
          </div>
        </div>
      )}

      <button
        className="btn btn-primary"
        onClick={() => handleCalculate.mutate()}
      >
        محاسبه ضریب t
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          {assessment?.assessment.factor_t
            ? assessment?.assessment.factor_t.toFixed(3)
            : "-"}
        </div>
      </div>
    </div>
  );
}
