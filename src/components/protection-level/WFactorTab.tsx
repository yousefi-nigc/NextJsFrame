"use client";

import { useState, useMemo } from "react";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AssessmentGetApiResponse,
  AssessmentUpdateApiResponse,
} from "@/lib/APIResponseInterfaces";

export default function WFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [showW1Guide, setShowW1Guide] = useState(false);
  const [showW2Guide, setShowW2Guide] = useState(false);
  const [showW3Guide, setShowW3Guide] = useState(false);
  const [showW4Guide, setShowW4Guide] = useState(false);
  const [showW5Guide, setShowW5Guide] = useState(false);
  const [waterStorageType, setWaterStorageType] = useState("auto");
  const [waterCapacity, setWaterCapacity] = useState<number>(0);
  const [pipeDiameter, setPipeDiameter] = useState<string>("none");
  const [isRingNetwork, setIsRingNetwork] = useState<boolean>(false);
  const [hydrant25, setHydrant25] = useState<number>(0);
  const [hydrant3, setHydrant3] = useState<number>(0);
  const [hydrant4, setHydrant4] = useState<number>(0);
  const [staticPressureAvailable, setStaticPressureAvailable] = useState<number>(0);

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
      console.log(response.assessment);

      setWaterStorageType(response.assessment.waterStorageType ?? "auto");
      setWaterCapacity(response.assessment.waterCapacity ?? 0);
      setPipeDiameter(response.assessment.pipeDiameter ?? "none");
      setIsRingNetwork(response.assessment.isRingNetwork ?? false);
      setHydrant25(response.assessment.hydrantCount25 ?? 0);
      setHydrant3(response.assessment.hydrantCount3 ?? 0);
      setHydrant4(response.assessment.hydrantCount4 ?? 0);
      setStaticPressureAvailable(response.assessment.staticPressureAvailable ?? 0);

      return response;
    },
  });

  // Calculate required water capacity
  const requiredWaterCapacity = useMemo(() => {
    const qi = assessment?.assessment.qi;
    const qm = assessment?.assessment.qm;
    if (qi === undefined || qi === null || qm === undefined || qm === null) return 0;
    return (qi + qm) / 4;
  }, [assessment]);

  // Calculate W2 penalty
  const w2Penalty = useMemo(() => {
    if (waterStorageType === "none") return 0;
    if (requiredWaterCapacity === 0 || requiredWaterCapacity === null || !isFinite(requiredWaterCapacity)) return 4;
    if (waterCapacity === undefined || waterCapacity === null || waterCapacity === 0) return 4;
    const ratio = (waterCapacity / requiredWaterCapacity) * 100;
    if (ratio >= 100) return 0;
    if (ratio >= 90) return 1;
    if (ratio >= 80) return 2;
    if (ratio >= 70) return 3;
    return 4;
  }, [waterStorageType, waterCapacity, requiredWaterCapacity]);

  // Calculate water flow capacity
  const waterFlowCapacity = useMemo(() => {
    const diameterValues: Record<string, number> = {
      "none": 0,
      "DIA80": 34.3,
      "DIA100": 59.2,
      "DIA150": 134.3,
      "DIA200": 232.3,
      "DIA250": 366.8,
      "DIA300": 526.1,
      "DIA350": 676.9,
    };
    const baseValue = diameterValues[pipeDiameter] || 0;
    return baseValue * (isRingNetwork ? 2 : 1);
  }, [pipeDiameter, isRingNetwork]);

  // Determine distribution network adequacy
  const distributionNetworkAdequacy = useMemo(() => {
    if (waterFlowCapacity >= 200) return "adequate";
    if (waterFlowCapacity >= 50) return "limited";
    return "none";
  }, [waterFlowCapacity]);

  // Calculate building perimeter
  const buildingPerimeter = useMemo(() => {
    const length = assessment?.assessment.length ?? 0;
    const width = assessment?.assessment.width ?? 0;
    return 2 * (length + width);
  }, [assessment]);

  // Calculate equivalent hydrant 25
  const equivalentHydrant25 = useMemo(() => {
    return hydrant25 * 1 + hydrant3 * 2 + hydrant4 * 3;
  }, [hydrant25, hydrant3, hydrant4]);

  // Calculate average hydrant distance
  const averageHydrantDistance = useMemo(() => {
    if (buildingPerimeter === 0 || equivalentHydrant25 === 0) return null;
    if (!isFinite(buildingPerimeter) || !isFinite(equivalentHydrant25)) return null;
    return buildingPerimeter / equivalentHydrant25;
  }, [buildingPerimeter, equivalentHydrant25]);

  // Calculate W4 score
  const w4Score = useMemo(() => {
    if (averageHydrantDistance === null || averageHydrantDistance === undefined || !isFinite(averageHydrantDistance)) return 3;
    if (averageHydrantDistance <= 50) return 0;
    if (averageHydrantDistance <= 100) return 1;
    return 3;
  }, [averageHydrantDistance]);

  // Calculate static pressure required
  // Formula: (height + 35) / 10 where height = H+ (or H-) + ceiling height
  const staticPressureRequired = useMemo(() => {
    const heightAbove = assessment?.assessment.heightAbove ?? null;
    const depthBelow = assessment?.assessment.depthBelow ?? null;
    const height = assessment?.assessment.height ?? null;
    
    // Use heightAbove if available, otherwise use depthBelow, otherwise 0
    const hValue = heightAbove !== null ? heightAbove : (depthBelow !== null ? depthBelow : 0);
    const ceilingHeight = height ?? 0;
    const totalHeight = hValue + ceilingHeight;
    
    // Only calculate if we have valid height data
    if (height === null && heightAbove === null && depthBelow === null) return null;
    return (totalHeight + 35) / 10;
  }, [assessment]);

  // Calculate W5 score
  const w5Score = useMemo(() => {
    if (staticPressureRequired === null || staticPressureRequired === undefined || !isFinite(staticPressureRequired)) return null;
    if (staticPressureAvailable === undefined || staticPressureAvailable === null || !isFinite(staticPressureAvailable)) return null;
    if (staticPressureRequired > staticPressureAvailable) return 3;
    return 0;
  }, [staticPressureRequired, staticPressureAvailable]);

  const handleCalculateW = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          body: JSON.stringify({
            waterStorageType,
            waterCapacity,
            pipeDiameter,
            isRingNetwork,
            hydrantCount25: hydrant25,
            hydrantCount3: hydrant3,
            hydrantCount4: hydrant4,
            staticPressureAvailable,
          }),
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("W محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error("خطا در محاسبه W");
      console.log(error);
    },
  });

  return (
    <div id="w-water" className="tab-content space-y-6">
      <div className="formula-card">
        <div className="text-primary mb-3 text-lg font-semibold">
          فرمول محاسبه W
        </div>
        <div className="formula-content" dir="ltr">
          <BlockMath
            math={"W = 0.95^{w} \\quad , \\quad w = \\sum_{i=1}^{5} w_i"}
          />
        </div>
      </div>

      <div className="help-card">
        <div className="mb-2 font-semibold text-primary">
          راهنمای FRAME 2015 - ضریب تأمین آب (W)
        </div>
        <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
          ضریب W کیفیت و کفایت سیستم تأمین آب برای اطفای حریق را می‌سنجد. هر ضعف
          در سیستم بر اساس جداول سند FRAME 2015 جریمه می‌گیرد.
        </div>
      </div>

      {/* Section: Water Storage */}
      <div className="bg-[#f8f9fa] dark:bg-slate-800 p-5 rounded-xl space-y-4 border border-gray-200 dark:border-slate-700">
        <h3 className="text-primary font-semibold text-lg mb-4 border-r-4 border-primary pr-3">
          W₁ - نوع و ظرفیت ذخیره آب
        </h3>

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
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              ظرفیت ذخیره آب مورد نیاز
              <span className="text-xs text-green-600 dark:text-green-400 mr-2">(محاسبه شده)</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                readOnly
                value={requiredWaterCapacity > 0 && isFinite(requiredWaterCapacity) ? requiredWaterCapacity.toFixed(2) : "0.00"}
                className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
              />
              <span className="input-unit">m³</span>
            </div>
            <div className="input-hint">
              <i className="fas fa-info-circle"></i>
              (Qi + Qm) ÷ 4
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-group">
            <label className="input-label">
              جریمه W₂
              <span className="text-xs text-blue-600 dark:text-blue-400 mr-2">(محاسبه شده)</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                readOnly
                value={w2Penalty}
                className={`bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ${
                  w2Penalty === 0 ? "text-green-600 dark:text-green-400 font-semibold" : 
                  w2Penalty <= 2 ? "text-yellow-600 dark:text-yellow-400" : 
                  "text-red-600 dark:text-red-400"
                }`}
              />
            </div>
            <div className="input-hint">
              <i className="fas fa-info-circle"></i>
              بر اساس درصد ظرفیت موجود به مورد نیاز
            </div>
          </div>
        </div>
      </div>

      {/* Section: Distribution Network */}
      <div className="bg-[#f8f9fa] dark:bg-slate-800 p-5 rounded-xl space-y-4 border border-gray-200 dark:border-slate-700">
        <h3 className="text-primary font-semibold text-lg mb-4 border-r-4 border-primary pr-3">
          W₃ - شبکه توزیع آب
          <button
            type="button"
            onClick={() => setShowW3Guide((prev) => !prev)}
            className="text-xs font-semibold py-1 px-2 mr-2 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
          >
            راهنما
          </button>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-group">
            <label className="input-label">قطر اسمی لوله اصلی آب</label>
            <select
              id="pipe-diameter"
              value={pipeDiameter}
              onChange={(e) => setPipeDiameter(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            >
              <option value="none">None or &lt; DIA80 (0)</option>
              <option value="DIA80">DIA80 (3&quot;) - 34.3</option>
              <option value="DIA100">DIA100 (4&quot;) - 59.2</option>
              <option value="DIA150">DIA150 (6&quot;) - 134.3</option>
              <option value="DIA200">DIA200 (8&quot;) - 232.3</option>
              <option value="DIA250">DIA250 (10&quot;) - 366.8</option>
              <option value="DIA300">DIA300 (12&quot;) - 526.1</option>
              <option value="DIA350">DIA350 (14&quot;) - 676.9</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">شبکه حلقوی</label>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
              <label className="flex items-center gap-2 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={isRingNetwork}
                  onChange={(e) => setIsRingNetwork(e.target.checked)}
                  className="w-5 h-5 text-primary"
                />
                <span className="font-medium">فعال</span>
              </label>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <i className="fas fa-info-circle"></i>
                ضرب در 2
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-group">
            <label className="input-label">
              ظرفیت دبی آب
              <span className="text-xs text-blue-600 dark:text-blue-400 mr-2">(محاسبه شده)</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                readOnly
                value={waterFlowCapacity.toFixed(2)}
                className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
              />
              <span className="input-unit">L/min</span>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">
              3w – کفایت ظرفیت تأمین شبکه توزیع
              <span className="text-xs text-purple-600 dark:text-purple-400 mr-2">(خودکار)</span>
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                readOnly
                value={
                  distributionNetworkAdequacy === "adequate"
                    ? "✅ ADEQUATE (کافی)"
                    : distributionNetworkAdequacy === "limited"
                    ? "⚠️ LIMITED (محدود)"
                    : "❌ NONE (نامناسب)"
                }
                className={`${
                  distributionNetworkAdequacy === "adequate"
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                    : distributionNetworkAdequacy === "limited"
                    ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400"
                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
                } font-semibold`}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              امتیاز: {distributionNetworkAdequacy === "adequate" ? "0" : distributionNetworkAdequacy === "limited" ? "2" : "6"}
            </div>
          </div>
        </div>

        {showW3Guide && (
          <ul className="relative text-gray-600 dark:text-gray-300 left-0 mt-2 p-4 bg-[#e0f7fa] dark:bg-[#0f3460] text-sm rounded-lg shadow-md border border-[#00bfae30] dark:border-[#2196f380] w-full z-20">
            <li>
              <p className="font-semibold mb-3"> راهنمای W3 </p>
            </li>
            <li className="mb-1.5">
              <b>شبکه توزیع آب (w₃)</b>
            </li>
            <li>کافی: شبکه توزیع مناسب و قابل اعتماد — جریمه 0</li>
            <li>محدود: شبکه توزیع محدود یا ناکافی — جریمه 2</li>
            <li>فاقد شبکه: بدون شبکه توزیع مناسب — جریمه 6</li>
          </ul>
        )}
      </div>

      {/* Section: Hydrant Connections */}
      <div className="bg-[#f8f9fa] dark:bg-slate-800 p-5 rounded-xl space-y-4 border border-gray-200 dark:border-slate-700">
        <h3 className="text-primary font-semibold text-lg mb-4 border-r-4 border-primary pr-3">
          W₄ - اتصالات هیدرانت
          <button
            type="button"
            onClick={() => setShowW4Guide((prev) => !prev)}
            className="text-xs font-semibold py-1 px-2 mr-2 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
          >
            راهنما
          </button>
        </h3>

        <div className="input-group">
          <label className="input-label">محیط ساختمان</label>
          <div className="input-wrapper">
            <input
              type="text"
              readOnly
              value={`Building perimeter = 2 × (b + l) = ${buildingPerimeter.toFixed(2)} m`}
              className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="input-group">
            <label className="input-label">
              تعداد 2.5&quot; (70)
              <span className="text-xs text-gray-500 mr-1">ضریب: 1</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                id="hydrant-25"
                placeholder="0"
                value={hydrant25}
                onChange={(e) => setHydrant25(parseFloat(e.target.value) || 0)}
                min="0"
              />
              <span className="input-unit">عدد</span>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">
              تعداد 3&quot;
              <span className="text-xs text-gray-500 mr-1">ضریب: 2</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                id="hydrant-3"
                placeholder="0"
                value={hydrant3}
                onChange={(e) => setHydrant3(parseFloat(e.target.value) || 0)}
                min="0"
              />
              <span className="input-unit">عدد</span>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">
              تعداد 4&quot; (100)
              <span className="text-xs text-gray-500 mr-1">ضریب: 3</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                id="hydrant-4"
                placeholder="0"
                value={hydrant4}
                onChange={(e) => setHydrant4(parseFloat(e.target.value) || 0)}
                min="0"
              />
              <span className="input-unit">عدد</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="input-group">
            <label className="input-label">
              تعداد معادل 2.5&quot; (70)
              <span className="text-xs text-blue-600 dark:text-blue-400 mr-2">(محاسبه شده)</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                readOnly
                value={equivalentHydrant25}
                className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
              />
              <span className="input-unit">عدد</span>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">
              میانگین فاصله بین اتصالات
              <span className="text-xs text-blue-600 dark:text-blue-400 mr-2">(محاسبه شده)</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                readOnly
                value={averageHydrantDistance?.toFixed(2) ?? "-"}
                className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
              />
              <span className="input-unit">m</span>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">
              امتیاز W₄
              <span className="text-xs text-purple-600 dark:text-purple-400 mr-2">(خودکار)</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                readOnly
                value={w4Score}
                className={`${
                  w4Score === 0 ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400" :
                  w4Score === 1 ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400" :
                  "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
                } font-semibold`}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ≤50m → 0, 50-100m → 1, &gt;100m → 3
            </div>
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

      {/* Section: Static Pressure */}
      <div className="bg-[#f8f9fa] dark:bg-slate-800 p-5 rounded-xl space-y-4 border border-gray-200 dark:border-slate-700">
        <h3 className="text-primary font-semibold text-lg mb-4 border-r-4 border-primary pr-3">
          W₅ - فشار استاتیکی
          <button
            type="button"
            onClick={() => setShowW5Guide((prev) => !prev)}
            className="text-xs font-semibold py-1 px-2 mr-2 bg-[#e3f2fd] rounded-sm text-primary-dark border border-[#1e88e530] hover:text-white hover:bg-[#90caf9] hover:border-primary-light transition-all duration-200 cursor-pointer"
          >
            راهنما
          </button>
        </h3>

        <div className="input-group">
          <label className="input-label">ارتفاع (H+ یا H- + ارتفاع سقف)</label>
          <div className="input-wrapper">
            <input
              type="text"
              readOnly
              value={`H+ = ${assessment?.assessment.heightAbove ?? 0} m, H- = ${assessment?.assessment.depthBelow ?? 0} m, ارتفاع سقف = ${assessment?.assessment.height ?? 0} m`}
              className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="input-group">
            <label className="input-label">
              فشار استاتیک مورد نیاز
              <span className="text-xs text-blue-600 dark:text-blue-400 mr-2">(محاسبه شده)</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                readOnly
                value={staticPressureRequired !== null ? staticPressureRequired.toFixed(2) : "-"}
                className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
              />
              <span className="input-unit">bar</span>
            </div>
            <div className="input-hint">
              <i className="fas fa-info-circle"></i>
              (ارتفاع + 35) ÷ 10
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">فشار استاتیک موجود</label>
            <div className="input-wrapper">
              <input
                type="number"
                min="0"
                step="0.1"
                value={staticPressureAvailable}
                onChange={(e) => setStaticPressureAvailable(parseFloat(e.target.value) || 0)}
              />
              <span className="input-unit">bar</span>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">
              ضریب W₅
              <span className="text-xs text-purple-600 dark:text-purple-400 mr-2">(خودکار)</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                readOnly
                value={w5Score !== null ? w5Score : "-"}
                className={`${
                  w5Score === 0 ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400" :
                  w5Score === 3 ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400" :
                  "bg-gray-50 dark:bg-gray-800"
                } font-semibold`}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              مورد نیاز &gt; موجود → 3, مورد نیاز ≤ موجود → 0
            </div>
          </div>
        </div>

        {showW5Guide && (
          <ul className="relative text-gray-600 dark:text-gray-300 left-0 mt-2 p-4 bg-[#e0f7fa] dark:bg-[#0f3460] text-sm rounded-lg shadow-md border border-[#00bfae30] dark:border-[#2196f380] w-full z-20">
            <li>
              <p className="font-semibold mb-3"> راهنمای W5 </p>
            </li>
            <li className="mb-1.5">
              <b>فشار استاتیکی (w₅)</b>
            </li>
            <li>فشار استاتیک مورد نیاز = (ارتفاع + 35) ÷ 10</li>
            <li>اگر فشار مورد نیاز &gt; فشار موجود → جریمه 3</li>
            <li>اگر فشار مورد نیاز ≤ فشار موجود → جریمه 0</li>
          </ul>
        )}
      </div>

      {/* Calculate Button */}
      <div className="flex justify-center">
        <button
          className="btn btn-primary px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => handleCalculateW.mutate()}
          disabled={handleCalculateW.isPending}
        >
          {handleCalculateW.isPending ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              در حال محاسبه...
            </>
          ) : (
            <>
              <i className="fas fa-calculator mr-2"></i>
              محاسبه W (FRAME 2015)
            </>
          )}
        </button>
      </div>

      {/* Result Display */}
      <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-primary shadow-lg">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            نتیجه محاسبه ضریب W
          </div>
          <div className="text-4xl font-bold text-primary dark:text-primary-light">
            {assessment?.assessment.factor_W
              ? assessment?.assessment.factor_W.toFixed(3)
              : "-"}
          </div>
          {assessment?.assessment.factor_W && (
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              W = 0.95<sup>w</sup> where w = w₁ + w₂ + w₃ + w₄ + w₅
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
