"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AssessmentGetApiResponse,
  AssessmentUpdateApiResponse,
} from "@/lib/APIResponseInterfaces";

export default function EvacuationTimeTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [occupantFactorKey, setOccupantFactorKey] = useState<string>("");
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

      // Use stored key if available, otherwise fall back to value mapping
      const storedKey = response.assessment.occupantFactorKey ?? "";
      const occFactorValue = response.assessment.occupantFactor?.toString() ?? "";
      
      if (storedKey) {
        // Use the stored key directly (this preserves the exact selection)
        setOccupantFactorKey(storedKey);
        setOccupantFactor(occFactorValue);
      } else if (occFactorValue) {
        // Fallback: map value to key (for backward compatibility with old data)
        const valueToKeyMap: Record<string, string> = {
          "3": "waiting",
          "1.5": "gathering-dense",
          "0.6": "gathering-normal",
          "0.5": "school",
          "0.3": "kindergarten", // Default to first 0.3 (kindergarten)
          "0.2": "technical", // Default to first 0.2 (technical)
          "0.1": "medical", // Default to first 0.1 (medical)
          "0.05": "residential",
          "0.03": "factory",
          "0.003": "warehouse",
        };
        const foundKey = valueToKeyMap[occFactorValue] || "";
        setOccupantFactorKey(foundKey);
        setOccupantFactor(occFactorValue);
      } else {
        setOccupantFactorKey("");
        setOccupantFactor("");
      }
      setOccupantCount(response.assessment.occupantCount?.toString() ?? "");
      setArea(response.assessment.area?.toString() ?? "");
      setExitWidths(response.assessment.exitWidths ?? "");
      setExitWidthTotal(response.assessment.exitWidthTotal?.toString() ?? "");
      setMobilityFactor(response.assessment.mobilityFactor?.toString() ?? "1");
      setLength(response.assessment.length?.toString() ?? "");
      setWidth(response.assessment.width?.toString() ?? "");
      setHeightAbove(response.assessment.heightAbove?.toString() ?? "");
      setDepthBelow(response.assessment.depthBelow?.toString() ?? "");
      setExitCountToOpenSpace(
        response.assessment.exitCountToOpenSpace?.toString() ?? ""
      );

      return response;
    },
  });

  const handleCalculate = useMutation({
    mutationFn: async () => {
      // Helper to parse number, allowing 0 as valid value
      const parseNumber = (val: string | undefined): number | undefined => {
        if (val === undefined || val === null || val === "") return undefined;
        const parsed = parseFloat(val);
        return isNaN(parsed) ? undefined : parsed;
      };

      const parseInteger = (val: string | undefined): number | undefined => {
        if (val === undefined || val === null || val === "") return undefined;
        const parsed = parseInt(val);
        return isNaN(parsed) ? undefined : parsed;
      };

      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          body: JSON.stringify({
            length: parseNumber(length),
            width: parseNumber(width),
            area: parseNumber(area),
            occupantCount: parseInteger(occupantCount),
            occupantFactor: parseNumber(occupantFactor),
            exitWidths: exitWidths || undefined, // Send as string or undefined
            exitWidthTotal: parseNumber(exitWidthTotal),
            mobilityFactor: parseNumber(mobilityFactor),
            heightAbove: parseNumber(heightAbove),
            depthBelow: parseNumber(depthBelow),
            occupantFactorKey: occupantFactorKey || undefined,
            exitCountToOpenSpace: parseInteger(exitCountToOpenSpace),
          }),
        }
      );
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to calculate t factor");
      }
      
      return res.json();
    },
    onSuccess: (data) => {
      toast.success("t محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error("خطا در محاسبه t");
      console.error(error);
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
          value={occupantFactorKey}
          onChange={(e) => {
            const key = e.target.value;
            setOccupantFactorKey(key);
            // Map key to actual value for calculation
            const valueMap: Record<string, string> = {
              "": "",
              "waiting": "3",
              "gathering-dense": "1.5",
              "gathering-normal": "0.6",
              "school": "0.5",
              "kindergarten": "0.3",
              "technical": "0.2",
              "medical": "0.1",
              "residential": "0.05",
              "sales-level": "0.3",
              "sales-upper": "0.2",
              "office": "0.1",
              "factory": "0.03",
              "warehouse": "0.003",
            };
            setOccupantFactor(valueMap[key] || "");
          }}
        >
          <option value="">-- انتخاب کنید --</option>
          <option value="waiting">فضاهای انتظار</option>
          <option value="gathering-dense">محل تجمع – فشرده</option>
          <option value="gathering-normal">محل تجمع – معمولی</option>
          <option value="school">کلاس مدارس</option>
          <option value="kindergarten">مهدکودک</option>
          <option value="technical">آموزش فنی/کارگاه</option>
          <option value="medical">مرکز درمانی/زندان</option>
          <option value="residential">ساختمان مسکونی/هتل</option>
          <option value="sales-level">فضای فروش (هم‌سطح)</option>
          <option value="sales-upper">فضای فروش (بالا)</option>
          <option value="office">دفتر اداری</option>
          <option value="factory">کارخانه</option>
          <option value="warehouse">انبار</option>
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
          min="0"
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

      <button
        className="btn btn-primary"
        onClick={() => handleCalculate.mutate()}
        disabled={handleCalculate.isPending}
      >
        {handleCalculate.isPending ? "در حال محاسبه..." : "محاسبه ضریب t"}
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
