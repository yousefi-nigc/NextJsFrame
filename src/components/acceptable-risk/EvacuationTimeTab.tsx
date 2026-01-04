"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
  const [exitUnitsX, setExitUnitsX] = useState<string>("");
  const [separatePathsK, setSeparatePathsK] = useState<string>("");
  const [exitCountToOpenSpace, setExitCountToOpenSpace] = useState<string>("");
  const [mobilityFactor, setMobilityFactor] = useState<string>("1");
  const [showMobilityMulti, setShowMobilityMulti] = useState<boolean>(false);
  const [mobilityWeightedRows, setMobilityWeightedRows] = useState<
    { value: number; label: string; percent: number; checked: boolean }[]
  >([
    { value: 1, label: "A - افراد متحرک مستقل (بزرگسالان، کارگران)", percent: 0, checked: false },
    { value: 2, label: "B - افراد متحرک نیازمند راهنمایی (دانش‌آموزان، بازدیدکنندگان)", percent: 0, checked: false },
    { value: 8, label: "C - افراد با تحرک محدود (بیماران، سالمندان)", percent: 0, checked: false },
    { value: 20, label: "D - افراد نیازمند کمک فردی (بستری، ویلچر)", percent: 0, checked: false },
  ]);
  const [perceptionAwareness, setPerceptionAwareness] = useState<boolean>(true);
  const [evacuationPlanClear, setEvacuationPlanClear] = useState<boolean>(true);
  const [noPanicRisk, setNoPanicRisk] = useState<boolean>(true);
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [heightAbove, setHeightAbove] = useState<string>("");
  const [depthBelow, setDepthBelow] = useState<string>("");

  // Track if we're loading initial data to prevent auto-calculations from overriding
  const isInitialLoad = useRef(true);
  // Track if user has manually entered occupant count
  const occupantCountManuallySet = useRef(false);
  // Track last factor value to detect changes and allow recalculation
  const lastFactorRef = useRef<string>("");

  // Automatic calculations - matching script.js logic
  // Calculate area from length × width (only if area is not already set or if length/width changes)
  useEffect(() => {
    // Don't auto-calculate during initial load
    if (isInitialLoad.current) return;

    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const currentArea = parseFloat(area) || 0;
    
    if (l > 0 && w > 0) {
      const calculatedArea = l * w;
      // Only update if area is not set, or if the calculated value is different
      // This prevents overriding loaded values unnecessarily
      if (!currentArea || Math.abs(currentArea - calculatedArea) > 0.01) {
        setArea(calculatedArea.toFixed(2));
      }
    }
  }, [length, width, area]); // Include area to check current value

  // Calculate occupant count from factor × area (only when factor or area changes, not when user types)
  useEffect(() => {
    // Don't auto-calculate during initial load
    if (isInitialLoad.current) return;

    const factor = parseFloat(occupantFactor) || 0;
    const currentFactor = occupantFactor || "";
    
    // If factor changed, allow recalculation (user wants to recalculate based on new factor)
    const factorChanged = currentFactor !== lastFactorRef.current;
    if (factorChanged) {
      lastFactorRef.current = currentFactor;
      // Reset manual flag when factor changes to allow recalculation
      occupantCountManuallySet.current = false;
    }
    
    // Don't auto-calculate if user has manually set the value (and factor hasn't changed)
    if (!factorChanged && occupantCountManuallySet.current) return;

    let areaVal = parseFloat(area) || 0;
    
    // If area is not set, try to calculate from length × width
    if (!areaVal || areaVal <= 0) {
      const l = parseFloat(length) || 0;
      const w = parseFloat(width) || 0;
      if (l > 0 && w > 0) {
        areaVal = l * w;
      }
    }
    
    // Only auto-calculate if we have factor and area
    if (factor > 0 && areaVal > 0) {
      const calculatedX = Math.ceil(factor * areaVal);
      setOccupantCount(calculatedX.toString());
      // Don't mark as manually set when auto-calculating
      occupantCountManuallySet.current = false;
    }
  }, [occupantFactor, area, length, width]); // Remove occupantCount from dependencies

  // Calculate x (exit units) for display - matching script.js calculateExitUnits
  const calculatedX = useMemo(() => {
    // Manual x takes priority (check if exitUnitsX is not empty and is a valid number)
    if (exitUnitsX && exitUnitsX.trim() !== "") {
      const manualX = parseFloat(exitUnitsX);
      if (!isNaN(manualX)) {
        // Return the value even if 0 (for display), backend will enforce min 1
        console.log("🔵 Manual x entered:", manualX);
        return manualX;
      }
    }

    // If no manual x, calculate from exit widths
    if (!exitWidths || exitWidths.trim() === "") {
      return null;
    }

    // Parse exit widths (in centimeters)
    const widths = exitWidths
      .split(",")
      .map((w) => parseFloat(w.trim()))
      .filter((w) => !isNaN(w) && w > 0);

    if (widths.length === 0) {
      return null;
    }

    // Calculate x for each exit: floor((width_cm - 20) / 60)
    let totalX = 0;
    widths.forEach((width_cm) => {
      const effectiveWidth = width_cm - 20; // Subtract 20cm lost
      const units = effectiveWidth > 0 ? Math.floor(effectiveWidth / 60) : 0;
      totalX += units;
    });

    const result = Math.max(1, totalX); // Minimum x = 1 for calculated values
    console.log("🔵 Calculated x from widths:", result);
    return result;
  }, [exitWidths, exitUnitsX]);

  // Calculate K (separate paths) for display - matching script.js calculateKfromPaths
  const calculatedK = useMemo(() => {
    // Manual K takes priority
    if (separatePathsK && parseFloat(separatePathsK) > 0) {
      return Math.max(1, Math.min(Math.floor(parseFloat(separatePathsK)), 4));
    }

    const O = parseFloat(exitCountToOpenSpace) || 0;
    const x = calculatedX || 0;
    const X = parseFloat(occupantCount) || 0;

    if (x <= 0 || X <= 0 || O <= 0) {
      return 1; // Default to 1 if values are insufficient
    }

    // Calculate K: capacity = x * 120, ratio = capacity / X, theoreticalK = min(ratio, 4), K = min(O, floor(theoreticalK))
    const totalCapacity = x * 120; // people per minute
    const ratio = totalCapacity / X;
    const theoreticalK = Math.min(ratio, 4);
    const K = Math.floor(Math.min(O, theoreticalK));

    return Math.max(1, Math.min(K, 4)); // Clamp between 1 and 4
  }, [exitCountToOpenSpace, calculatedX, occupantCount, separatePathsK]);

  // Mobility factor calculations (base + penalties)
  const mobilityPercentSum = useMemo(
    () =>
      mobilityWeightedRows.reduce(
        (sum, row) => sum + (row.checked ? row.percent : 0),
        0
      ),
    [mobilityWeightedRows]
  );

  const mobilityWeightedValue = useMemo(() => {
    if (mobilityFactor !== "custom") return null;
    const totalPercent = mobilityPercentSum;
    if (!totalPercent || totalPercent <= 0) return null;
    const weightedSum = mobilityWeightedRows.reduce((sum, row) => {
      if (!row.checked || row.percent <= 0) return sum;
      return sum + row.value * row.percent;
    }, 0);
    const val = weightedSum / totalPercent;
    return isFinite(val) ? val : null;
  }, [mobilityFactor, mobilityPercentSum, mobilityWeightedRows]);

  const mobilityBase = useMemo(() => {
    if (mobilityFactor === "custom") return mobilityWeightedValue;
    const parsed = parseFloat(mobilityFactor);
    return !isNaN(parsed) ? parsed : null;
  }, [mobilityFactor, mobilityWeightedValue]);

  const mobilityPenalty = useMemo(() => {
    let penalty = 0;
    if (perceptionAwareness === false) penalty += 2;
    if (evacuationPlanClear === false) penalty += 2;
    if (noPanicRisk === false) penalty += 2;
    return penalty;
  }, [perceptionAwareness, evacuationPlanClear, noPanicRisk]);

  const mobilityFinal = useMemo(() => {
    if (mobilityBase === null) return null;
    const val = mobilityBase + mobilityPenalty;
    return isFinite(val) ? val : null;
  }, [mobilityBase, mobilityPenalty]);

  const mobilitySelectedRows = useMemo(
    () =>
      mobilityWeightedRows
        .filter((row) => row.checked && row.percent > 0)
        .map(({ value, label, percent }) => ({ value, label, percent })),
    [mobilityWeightedRows]
  );

  const mobilityFactorMultiPayload =
    mobilityFactor === "custom" && mobilitySelectedRows.length > 0
      ? JSON.stringify(mobilitySelectedRows)
      : null;

  const handleMobilityRowCheck = (idx: number, checked: boolean) => {
    setMobilityWeightedRows((rows) =>
      rows.map((row, i) => (i === idx ? { ...row, checked } : row))
    );
  };

  const handleMobilityRowPercent = (idx: number, percent: number) => {
    setMobilityWeightedRows((rows) =>
      rows.map((row, i) => (i === idx ? { ...row, percent } : row))
    );
  };

  const { data: assessment, isLoading } = useQuery<AssessmentGetApiResponse>({
    queryKey: ["assessment", floorId],
    enabled: !!floorId,
    queryFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`
      );
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch the assessment");

      return data as AssessmentGetApiResponse;
    },
  });

  // Load data from assessment when it's available
  useEffect(() => {
    if (!assessment?.assessment) return;

    isInitialLoad.current = true;
    const response = assessment.assessment;

    // Load length (l) and width (b) from risk factors (potential risk calculations)
    // These are used in the g factor calculation and should be available here
    if (response.length !== null && response.length !== undefined) {
      setLength(response.length.toString());
    }
    if (response.width !== null && response.width !== undefined) {
      setWidth(response.width.toString());
    }

    // Load area if available (from risk factors or previous calculations)
    // Note: Area will be auto-calculated from length × width if not set
    if (response.area !== null && response.area !== undefined && response.area > 0) {
      setArea(response.area.toString());
    }

    // Load heightAbove (H+) and depthBelow (H-) from risk factors
    const rawHPlus = response.heightAbove ?? 0;
    const rawHMinus = response.depthBelow ?? 0;
    const adjustedHPlus = rawHPlus ? rawHPlus * 1.25 : 0;
    const adjustedHMinus = rawHMinus ? rawHMinus * 1.25 : 0;
    setHeightAbove(adjustedHPlus ? adjustedHPlus.toFixed(2) : "0");
    setDepthBelow(adjustedHMinus ? adjustedHMinus.toFixed(2) : "0");

    // Load evacuation time specific fields
    // Use stored key if available, otherwise fall back to value mapping
    const storedKey = response.occupantFactorKey ?? "";
    const occFactorValue = response.occupantFactor?.toString() ?? "";

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

    // Load occupant count (X) - will be auto-calculated if not set but factor is available
    if (response.occupantCount !== null && response.occupantCount !== undefined && response.occupantCount > 0) {
      setOccupantCount(response.occupantCount.toString());
      occupantCountManuallySet.current = true; // Mark as set from loaded data
    } else {
      occupantCountManuallySet.current = false; // Allow auto-calculation if not loaded
    }
    
    // Initialize last factor ref to track changes
    lastFactorRef.current = response.occupantFactor?.toString() || "";

    // Load exit-related fields
    if (response.exitWidths !== null && response.exitWidths !== undefined) {
      setExitWidths(response.exitWidths);
    }
    if (response.exitWidthTotal !== null && response.exitWidthTotal !== undefined) {
      setExitWidthTotal(response.exitWidthTotal.toString());
    }
    if (response.exitUnitsX !== null && response.exitUnitsX !== undefined) {
      setExitUnitsX(response.exitUnitsX.toString());
    }
    if (response.separatePathsK !== null && response.separatePathsK !== undefined) {
      setSeparatePathsK(response.separatePathsK.toString());
    }
    if (response.mobilityFactorMulti) {
      try {
        const saved = JSON.parse(response.mobilityFactorMulti);
        if (Array.isArray(saved) && saved.length > 0) {
          setMobilityFactor("custom");
          setShowMobilityMulti(true);
          setMobilityWeightedRows((rows) =>
            rows.map((row) => {
              const found = saved.find((s: any) => s.value === row.value || s.p === row.value);
              if (found) {
                return {
                  ...row,
                  checked: true,
                  percent: Number(found.percent) || 0,
                };
              }
              return { ...row, checked: false, percent: 0 };
            })
          );
        } else {
          setMobilityFactor(response.mobilityFactor?.toString() ?? "1");
          setShowMobilityMulti(false);
        }
      } catch (e) {
        setMobilityFactor(response.mobilityFactor?.toString() ?? "1");
        setShowMobilityMulti(false);
      }
    } else {
      setMobilityFactor(response.mobilityFactor?.toString() ?? "1"); // Default to 1 if not set
      setShowMobilityMulti(false);
    }
    setPerceptionAwareness(
      response.perceptionAwareness !== null && response.perceptionAwareness !== undefined
        ? response.perceptionAwareness
        : true
    );
    setEvacuationPlanClear(
      response.evacuationPlanClear !== null && response.evacuationPlanClear !== undefined
        ? response.evacuationPlanClear
        : true
    );
    setNoPanicRisk(
      response.noPanicRisk !== null && response.noPanicRisk !== undefined
        ? response.noPanicRisk
        : true
    );
    if (response.exitCountToOpenSpace !== null && response.exitCountToOpenSpace !== undefined) {
      setExitCountToOpenSpace(response.exitCountToOpenSpace.toString());
    }

    // Mark initial load as complete after a short delay to allow state updates to settle
    setTimeout(() => {
      isInitialLoad.current = false;
    }, 100);
  }, [assessment]);

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

      // Send base mobility (not final with penalties) so penalties aren't compounded on reload
      const mobilityBaseForPayload =
        mobilityFactor === "custom"
          ? mobilityWeightedValue !== null && mobilityWeightedValue !== undefined
            ? mobilityWeightedValue
            : undefined
          : parseNumber(mobilityFactor);

      // Pre-validation: Check if denominator would be negative before sending request
      const lVal = parseNumber(length) || 0;
      const bVal = parseNumber(width) || 0;
      const XVal = parseInteger(occupantCount) || 0;
      
      // Calculate x value for validation
      let xVal = 0;
      const manualX = parseNumber(exitUnitsX);
      if (manualX !== undefined && manualX > 0) {
        xVal = manualX;
      } else if (exitWidths && exitWidths.trim() !== "") {
        const widths = exitWidths
          .split(",")
          .map((w) => parseFloat(w.trim()))
          .filter((w) => !isNaN(w) && w > 0);
        if (widths.length > 0) {
          let totalX = 0;
          widths.forEach((width_cm) => {
            const effectiveWidth = width_cm - 20;
            const units = effectiveWidth > 0 ? Math.floor(effectiveWidth / 60) : 0;
            totalX += units;
          });
          xVal = Math.max(1, totalX);
        }
      }
      
      if (lVal > 0 && bVal > 0 && XVal > 0 && xVal > 0) {
        const denominatorTerm = 1.4 * xVal * (bVal + lVal) - 0.44 * XVal;
        if (denominatorTerm <= 0) {
          const minX = Math.ceil((0.44 * XVal) / (1.4 * (bVal + lVal)));
          const exitCapacity = (1.4 * xVal * (bVal + lVal)).toFixed(2);
          const requiredCapacity = (0.44 * XVal).toFixed(2);
          throw new Error(
            `ظرفیت خروج ناکافی!\n` +
            `• تعداد افراد: ${XVal} نفر\n` +
            `• واحدهای خروج فعلی: ${xVal}\n` +
            `• ظرفیت فعلی: ${exitCapacity}\n` +
            `• ظرفیت مورد نیاز: ${requiredCapacity}\n` +
            `• حداقل واحدهای خروج مورد نیاز: ${minX}`
          );
        }
      }

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
            exitWidths: exitWidths || undefined, // Send as string (in centimeters) or undefined
            exitWidthTotal: parseNumber(exitWidthTotal),
            exitUnitsX: parseNumber(exitUnitsX), // Manual x input (takes priority)
            separatePathsK: parseInteger(separatePathsK), // Manual K input (takes priority)
            mobilityFactor: mobilityBaseForPayload,
            mobilityFactorMulti: mobilityFactorMultiPayload ?? null,
            perceptionAwareness,
            evacuationPlanClear,
            noPanicRisk,
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
      if (data?.assessment?.factor_t !== null && data?.assessment?.factor_t !== undefined) {
        toast.success("t محاسبه شد");
      } else {
        // Check which fields are missing to provide a more specific error message
        const missingFields: string[] = [];
        if (!length || parseFloat(length) <= 0) missingFields.push("طول (l)");
        if (!width || parseFloat(width) <= 0) missingFields.push("عرض (b)");
        if (!occupantCount || parseFloat(occupantCount) <= 0) {
          if (!occupantFactor || parseFloat(occupantFactor) <= 0) {
            missingFields.push("تعداد افراد (X) یا ضریب بار اشغال");
          }
        }
        if (!exitUnitsX || parseFloat(exitUnitsX) <= 0) {
          if (!exitWidths || exitWidths.trim() === "") {
            missingFields.push("واحدهای خروج (x) یا عرض خروجی‌ها");
          }
        }
        if (!exitCountToOpenSpace || parseFloat(exitCountToOpenSpace) <= 0) {
          if (!separatePathsK || parseFloat(separatePathsK) <= 0) {
            missingFields.push("تعداد خروجی‌های منتهی به فضای آزاد (O) یا K دستی");
          }
        }
        
        // Show generic error if calculation failed (detailed validation is done in mutationFn)
        const errorMsg = missingFields.length > 0
          ? `لطفاً فیلدهای زیر را وارد کنید: ${missingFields.join("، ")}`
          : "لطفاً تمام فیلدهای ضروری را وارد کنید (طول، عرض، تعداد افراد، واحدهای خروج x یا عرض خروجی‌ها)";
        
        toast.warning(errorMsg);
      }
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "خطا در محاسبه t";
      // Check if it's a denominator/capacity issue
      if (errorMessage.includes("denominator") || errorMessage.includes("ظرفیت خروج") || errorMessage.includes("ظرفیت")) {
        // Display the detailed error message with line breaks
        toast.error(errorMessage, {
          duration: 10000,
          style: { whiteSpace: 'pre-line' }
        });
      } else {
        toast.error("خطا در محاسبه t");
      }
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
t = \\frac{
  p \\times \\left[(b + l) + \\frac{X}{x} + 1.25\\,H^{+} + 2\\,H^{-} \\right]
  \\times \\left[x \\times (b + l)\\right]
}{
  800 \\times K \\times \\left[1.4\\,x\\,(b + l) - 0.44\\,X \\right]
}
      `}
          />
        </div>

        <div className="formula-description mt-4 space-y-1 text-sm leading-7">
          <p>
            <strong>t:</strong> ضریب زمان تخلیه بر اساس FRAME 2015
          </p>
          <p>
            <strong>b, l:</strong> عرض و طول بخش (متر) – اگر خالی باشد از نتایج
            ضریب g استفاده می‌شود
          </p>
          <p>
            <strong>X:</strong> تعداد کل افراد – از ورودی یا ضریب اشغال
          </p>
          <p>
            <strong>x:</strong> تعداد واحدهای خروج (هر 0.6m = 1 واحد)
          </p>
          <p>
            <strong>K:</strong> عرض مؤثر کل خروج‌ها (متر)
          </p>
          <p>
            <strong>p:</strong> ضریب تحرک افراد
          </p>
          <p>
            <strong>
              H<sup>+</sup> / H<sup>-</sup>:
            </strong>{" "}
            ارتفاع یا عمق نسبت به سطح دسترسی
          </p>
        </div>
      </div>

      {/* Section 1: Space Usage and Dimensions */}
      <div className="calculation-group">
        <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
          🏢 بخش 1: کاربری فضا و ابعاد
        </h3>

        <div className="input-group">
          <label>ضریب تراکم افراد (نفر/m²):</label>
          <select
            value={occupantFactorKey}
            onChange={(e) => {
              const key = e.target.value;
              setOccupantFactorKey(key);
              // Map key to actual value for calculation
              const valueMap: Record<string, string> = {
                "": "",
                waiting: "3",
                "gathering-dense": "1.5",
                "gathering-normal": "0.6",
                school: "0.5",
                kindergarten: "0.3",
                technical: "0.2",
                medical: "0.1",
                residential: "0.05",
                "sales-level": "0.3",
                "sales-upper": "0.2",
                office: "0.1",
                factory: "0.03",
                warehouse: "0.003",
              };
              setOccupantFactor(valueMap[key] || "");
            }}
          >
            <option value="">-- انتخاب کنید --</option>
            <option value="waiting">اماکن انتظار - 3 نفر/m²</option>
            <option value="gathering-dense">سالن تجمع (متراکم) - 1.5 نفر/m²</option>
            <option value="gathering-normal">سالن تجمع (عادی) - 0.6 نفر/m²</option>
            <option value="school">کلاس درس - 0.5 نفر/m²</option>
            <option value="kindergarten">مهدکودک - 0.3 نفر/m²</option>
            <option value="technical">آزمایشگاه - 0.2 نفر/m²</option>
            <option value="medical">مرکز درمانی/زندان - 0.1 نفر/m²</option>
            <option value="residential">مسکونی - 0.05 نفر/m²</option>
            <option value="factory">کارخانه - 0.03 نفر/m²</option>
            <option value="warehouse">انبار - 0.003 نفر/m²</option>
          </select>
        </div>

        <div className="input-group">
          <label>طول بخش (l) - متر:</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            step="0.1"
            min="0"
            placeholder="مثال: 20"
          />
        </div>

        <div className="input-group">
          <label>عرض بخش (b) - متر:</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            step="0.1"
            min="0"
            placeholder="مثال: 16"
          />
        </div>

        <div className="input-group">
          <label>مساحت (خودکار) - m²:</label>
          <input
            type="number"
            value={area}
            readOnly
            style={{ background: "#f0f0f0" }}
            className="dark:bg-gray-700"
          />
        </div>

        <div className="input-group">
          <label>تعداد افراد (X) - نفر:</label>
          <input
            type="number"
            value={occupantCount}
            onChange={(e) => {
              occupantCountManuallySet.current = true;
              setOccupantCount(e.target.value);
            }}
            step="1"
            min="0"
            placeholder="محاسبه خودکار یا دستی"
          />
        </div>
      </div>

      {/* Section 2: Exit Units (x) */}
      <div className="calculation-group">
        <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
          🚪 بخش 2: واحدهای خروج (x)
        </h3>

        <div className="info-box" style={{ background: "#fff3e0", borderColor: "#ff9800", padding: "15px", borderRadius: "8px", marginBottom: "15px", border: "2px solid" }}>
          <p style={{ fontWeight: "bold", marginBottom: "10px" }}>📏 قانون محاسبه x:</p>
          <ol style={{ textAlign: "right", lineHeight: "1.8", paddingRight: "20px" }}>
            <li>عرض مفید = عرض در - 0.2m (20cm از دست رفته)</li>
            <li>تعداد واحد = floor(عرض مفید / 0.6m)</li>
            <li>x = مجموع واحدهای همه درها</li>
          </ol>
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            <strong>مثال:</strong> در 1.6m → عرض مفید 1.4m → floor(1.4/0.6) = floor(2.33) = <strong>2 واحد</strong>
          </p>
        </div>

        <div className="input-group">
          <label>عرض خروجی‌ها (جدا شده با کاما) - سانتی‌متر:</label>
          <input
            type="text"
            value={exitWidths}
            onChange={(e) => setExitWidths(e.target.value)}
            placeholder="مثال: 80, 80, 120 (سانتی‌متر)"
          />
          <small className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            ✨ برای محاسبه خودکار، عرض درها را به سانتی‌متر وارد کنید
          </small>
        </div>

        <div className="input-group" style={{ background: "#fffde7", padding: "10px", borderRadius: "5px", border: "2px dashed #fdd835" }}>
          <label>
            🖊️ ورود دستی x (واحدهای خروج):
            <small style={{ display: "block", color: "#f57c00", marginTop: "4px" }}>
              ⚠️ این فیلد بر محاسبه خودکار ارجحیت دارد
            </small>
          </label>
          <input
            type="number"
            value={exitUnitsX}
            onChange={(e) => setExitUnitsX(e.target.value)}
            step="1"
            min="0"
            placeholder="اختیاری - اگر خالی باشد خودکار محاسبه می‌شود"
          />
        </div>

        {(calculatedX !== null && calculatedX !== undefined) || (exitUnitsX && exitUnitsX.trim() !== "" && !isNaN(parseFloat(exitUnitsX))) ? (
          <div id="x-result" style={{ marginTop: "15px", padding: "10px", background: "#e8f5e9", borderRadius: "5px" }}>
            {calculatedX !== null && calculatedX !== undefined ? (
              <>
                <strong>x = {calculatedX}</strong>
                {exitUnitsX && exitUnitsX.trim() !== "" && !isNaN(parseFloat(exitUnitsX)) ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">(از ورود دستی)</p>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">(محاسبه خودکار از عرض خروجی‌ها)</p>
                )}
              </>
            ) : exitUnitsX && exitUnitsX.trim() !== "" && !isNaN(parseFloat(exitUnitsX)) ? (
              <>
                <strong>x = {parseFloat(exitUnitsX)}</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">(از ورود دستی)</p>
              </>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Section 3: Exit Routes (K) */}
      <div className="calculation-group">
        <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
          🛤️ بخش 3: مسیرهای خروج (K)
        </h3>

        <div className="info-box" style={{ background: "#e8eaf6", borderColor: "#3f51b5", padding: "15px", borderRadius: "8px", marginBottom: "15px", border: "2px solid" }}>
          <p style={{ fontWeight: "bold", marginBottom: "10px" }}>🧮 الگوریتم محاسبه K (FRAME 2015 ص. 19):</p>
          <ol style={{ textAlign: "right", lineHeight: "1.8", paddingRight: "20px" }}>
            <li><strong>گام 1:</strong> تعداد خروجی‌های مستقیم (O)</li>
            <li><strong>گام 2:</strong> ظرفیت کل = x × 120 نفر/دقیقه</li>
            <li><strong>گام 3:</strong> K_نظری = min(ظرفیت / X, 4)</li>
            <li><strong>K نهایی:</strong> K = min(O, floor(K_نظری))</li>
          </ol>
        </div>

        <div className="input-group">
          <label>تعداد خروجی‌های منتهی به فضای آزاد (O):</label>
          <input
            type="number"
            value={exitCountToOpenSpace}
            onChange={(e) => setExitCountToOpenSpace(e.target.value)}
            step="1"
            min="1"
            placeholder="مثال: 2"
          />
          <small className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            🚪 فقط درهای خروجی به فضای باز را حساب کنید (نه نردبان)
          </small>
        </div>

        <div className="input-group" style={{ background: "#e8f5e9", padding: "10px", borderRadius: "5px", border: "2px dashed #4caf50" }}>
          <label>
            🖊️ ورود دستی K (مسیرهای مجزا):
            <small style={{ display: "block", color: "#2e7d32", marginTop: "4px" }}>
              ⚠️ این فیلد بر محاسبه خودکار ارجحیت دارد
            </small>
          </label>
          <input
            type="number"
            value={separatePathsK}
            onChange={(e) => setSeparatePathsK(e.target.value)}
            step="1"
            min="1"
            max="4"
            placeholder="اختیاری - محدوده: 1 تا 4"
          />
        </div>

        {calculatedK !== null && (
          <div id="k-result" style={{ marginTop: "15px", padding: "10px", background: "#e3f2fd", borderRadius: "5px" }}>
            <strong>K = {calculatedK}</strong>
            {separatePathsK && parseFloat(separatePathsK) > 0 ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">(از ورود دستی)</p>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">(محاسبه خودکار از O, x, X)</p>
            )}
          </div>
        )}
      </div>

      {/* Section 4: Mobility Factor (p) */}
      <div className="calculation-group">
        <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
          🚶 بخش 4: ضریب تحرک افراد (p)
        </h3>

        <div className="input-group">
          <label>نوع افراد:</label>
          <select
            value={mobilityFactor}
            onChange={(e) => {
              const value = e.target.value;
              setMobilityFactor(value);
              setShowMobilityMulti(value === "custom");
            }}
          >
            <option value="1">A - افراد متحرک مستقل (بزرگسالان، کارگران) - p = 1</option>
            <option value="2">B - افراد متحرک نیازمند راهنمایی (دانش‌آموزان، بازدیدکنندگان) - p = 2</option>
            <option value="8">C - افراد با تحرک محدود (بیماران، سالمندان) - p = 8</option>
            <option value="20">D - افراد نیازمند کمک فردی (بستری، ویلچر) - p = 20</option>
            <option value="custom">E - محاسبه برای گروه مختلط (انتخاب چندگانه)</option>
          </select>
        </div>

        {showMobilityMulti && (
          <div className="mt-4 overflow-x-auto rounded-lg border border-gray-300 dark:border-slate-700">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-100 dark:bg-gray-800 font-semibold">
                <tr>
                  <th className="p-2 border-b border-gray-200">انتخاب</th>
                  <th className="p-2 border-b border-gray-200">p</th>
                  <th className="p-2 border-b border-gray-200">توضیحات</th>
                  <th className="p-2 border-b border-gray-200">درصد (%)</th>
                </tr>
              </thead>
              <tbody>
                {mobilityWeightedRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="odd:bg-white even:bg-gray-50 dark:even:bg-slate-800 dark:odd:bg-slate-900"
                  >
                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={(e) => handleMobilityRowCheck(idx, e.target.checked)}
                      />
                    </td>
                    <td className="p-2 text-center">{row.value}</td>
                    <td className="p-2">{row.label}</td>
                    <td className="p-2 text-center">
                      <input
                        type="number"
                        value={row.percent}
                        min={0}
                        max={100}
                        disabled={!row.checked}
                        onChange={(e) =>
                          handleMobilityRowPercent(idx, parseFloat(e.target.value) || 0)
                        }
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
                  <td className="p-2 text-center">{mobilityPercentSum} %</td>
                </tr>
                <tr className="font-bold bg-green-50 dark:bg-green-900/20">
                  <td colSpan={3} className="p-2 text-left">
                    p میانگین (بدون جریمه):
                  </td>
                  <td className="p-2 text-center">
                    {mobilityWeightedValue !== null ? mobilityWeightedValue.toFixed(2) : "-"}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="input-group">
            <label>آیا افراد سطح درک مناسب از خطر دارند؟</label>
            <select
              value={perceptionAwareness ? "yes" : "no"}
              onChange={(e) => setPerceptionAwareness(e.target.value === "yes")}
            >
              <option value="yes">بله (0)</option>
              <option value="no">خیر (+2)</option>
            </select>
          </div>
          <div className="input-group">
            <label>آیا برنامه تخلیه شفاف تدوین شده است؟</label>
            <select
              value={evacuationPlanClear ? "yes" : "no"}
              onChange={(e) => setEvacuationPlanClear(e.target.value === "yes")}
            >
              <option value="yes">بله (0)</option>
              <option value="no">خیر (+2)</option>
            </select>
          </div>
          <div className="input-group">
            <label>خطر بروز وحشت (پانیک) وجود ندارد؟</label>
            <select
              value={noPanicRisk ? "yes" : "no"}
              onChange={(e) => setNoPanicRisk(e.target.value === "yes")}
            >
              <option value="yes">بله (0)</option>
              <option value="no">خیر (+2)</option>
            </select>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-sm space-y-1">
          <div>p پایه: {mobilityBase !== null ? mobilityBase.toFixed(2) : "-"}</div>
          <div>مجموع جریمه‌ها: {mobilityPenalty.toFixed(2)}</div>
          <div className="font-semibold">
            p نهایی (ارسال به محاسبه t): {mobilityFinal !== null ? mobilityFinal.toFixed(2) : "-"}
          </div>
          {mobilityFactor === "custom" && mobilityPercentSum !== 100 && (
            <div className="text-yellow-700 dark:text-yellow-300">
              ⚠️ برای دقت بیشتر جمع درصدها را روی 100 تنظیم کنید (فعلی: {mobilityPercentSum}%)
            </div>
          )}
        </div>
      </div>

      {/* Section 5: Evacuation Path Height */}
      <div className="calculation-group">
        <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
          📍 بخش 5: ارتفاع مسیر تخلیه
        </h3>

        <div className="input-group">
          <label>ارتفاع بالای سطح زمین (H⁺) - متر:</label>
          <input
            type="number"
            value={heightAbove}
            step="0.1"
            min="0"
            readOnly
            disabled
            placeholder="خوانده شده از ضریب دسترسی × 1.25"
          />
          <small className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            ⬆️ برای طبقات بالای همکف (مقدار خوانده‌شده از ضریب دسترسی + 25%)
          </small>
        </div>

        <div className="input-group">
          <label>عمق زیر سطح زمین (H⁻) - متر:</label>
          <input
            type="number"
            value={depthBelow}
            step="0.1"
            min="0"
            readOnly
            disabled
            placeholder="خوانده شده از ضریب دسترسی × 1.25"
          />
          <small className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            ⬇️ برای زیرزمین (مقدار خوانده‌شده از ضریب دسترسی + 25%)
          </small>
        </div>
      </div>

      {/* Calculate Button */}
      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <button
          className="btn btn-primary"
          onClick={() => handleCalculate.mutate()}
          disabled={handleCalculate.isPending}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            padding: "15px 40px",
            fontSize: "18px",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
          }}
        >
          {handleCalculate.isPending ? "در حال محاسبه..." : "🧮 محاسبه ضریب زمان تخلیه (t)"}
        </button>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          {assessment?.assessment.factor_t !== null &&
          assessment?.assessment.factor_t !== undefined
            ? "t = " + assessment.assessment.factor_t.toFixed(4)
            : "-"}
        </div>
      </div>

      <div className="quick-reference mt-8">
        <h4 className="text-lg font-semibold mb-4 text-black dark:text-white">
          جدول مرجع سریع زمان تخلیه
        </h4>

        <table className="w-full border-collapse reference-table text-right text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <th className="p-3 border border-gray-300 dark:border-gray-600">
                زمان تخلیه (دقیقه)
              </th>
              <th className="p-3 border border-gray-300 dark:border-gray-600">
                ضریب t
              </th>
              <th className="p-3 border border-gray-300 dark:border-gray-600">
                وضعیت
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-green-100 dark:bg-green-900/40">
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                ≤ 1
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                0
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                عالی
              </td>
            </tr>

            <tr className="bg-emerald-100 dark:bg-emerald-900/40">
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                1-2
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                0.1
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                خوب
              </td>
            </tr>

            <tr className="bg-yellow-100 dark:bg-yellow-900/40">
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                2-3
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                0.2
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                متوسط
              </td>
            </tr>

            <tr className="bg-orange-100 dark:bg-orange-900/40">
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                3-4
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                0.3
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                نیاز به بهبود
              </td>
            </tr>

            <tr className="bg-red-100 dark:bg-red-900/40">
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                4-5
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                0.4
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                بحرانی
              </td>
            </tr>

            <tr className="bg-red-200 dark:bg-red-900/60">
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                &gt; 5
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                0.5
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-700">
                غیرقابل قبول
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
