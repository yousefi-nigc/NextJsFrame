"use client";

import { useState } from "react";
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
  const [waterStorageType, setWaterStorageType] = useState("auto");
  const [waterCapacity, setWaterCapacity] = useState<number>(0);
  const [distributionNetwork, setDistributionNetwork] = useState<
    "adequate" | "limited" | "none"
  >("adequate");
  const [hydrant25, setHydrant25] = useState<number>(0);
  const [hydrant3, setHydrant3] = useState<number>(0);
  const [hydrant4, setHydrant4] = useState<number>(0);

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
      setDistributionNetwork(
        (response.assessment.distributionNetwork as
          | "adequate"
          | "limited"
          | "none") ?? "adequate"
      );
      setHydrant25(response.assessment.hydrantCount25 ?? 0);
      setHydrant3(response.assessment.hydrantCount3 ?? 0);
      setHydrant4(response.assessment.hydrantCount4 ?? 0);

      return response;
    },
  });

  const handleCalculateW = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          body: JSON.stringify({
            waterStorageType,
            waterCapacity,
            distributionNetwork,
            hydrantCount25: hydrant25,
            hydrantCount3: hydrant3,
            hydrantCount4: hydrant4,
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
          ضریب W کیفیت و کفایت سیستم تأمین آب برای اطفای حریق را می‌سنجد. هر ضعف
          در سیستم بر اساس جداول سند FRAME 2015 جریمه می‌گیرد.
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

      <div className="input-group relative">
        <label className="input-label">
          شبکه توزیع آب
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
          onChange={(e) =>
            setDistributionNetwork(
              e.target.value as "adequate" | "limited" | "none"
            )
          }
        >
          <option value="adequate">کافی (w₃=0)</option>
          <option value="limited">محدود (w₃=2)</option>
          <option value="none">فاقد شبکه (w₃=6)</option>
        </select>
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

      <button
        className="btn btn-primary"
        onClick={() => handleCalculateW.mutate()}
      >
        محاسبه W (FRAME 2015)
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          {assessment?.assessment.factor_W
            ? assessment?.assessment.factor_W.toFixed(3)
            : "-"}
        </div>
      </div>
    </div>
  );
}
