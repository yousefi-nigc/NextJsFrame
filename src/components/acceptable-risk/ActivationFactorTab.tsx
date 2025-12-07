"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AssessmentGetApiResponse,
  AssessmentUpdateApiResponse,
} from "@/lib/APIResponseInterfaces";

export default function ActivationFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [mainActivity, setMainActivity] = useState("0");
  const [mainActivityKey, setMainActivityKey] = useState("A1");
  const [energySource, setEnergySource] = useState("0");
  const [heatTransferType, setHeatTransferType] = useState("0");
  const [generatorLocation, setGeneratorLocation] = useState("0");
  const [electricalSystem, setElectricalSystem] = useState("0");
  const [flammableLiquids, setFlammableLiquids] = useState("0");
  const [combustibleDust, setCombustibleDust] = useState("0");
  const [paintingSpraying, setPaintingSpraying] = useState("0");

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

      const mainActivityValue = response.assessment.mainActivity?.toString() ?? "0";
      setMainActivity(mainActivityValue);
      // Map value back to key for display
      const keyMap: Record<string, string> = {
        "0": "A1", // Default to A1 when value is 0 (can't distinguish A1/A2/D from value alone)
        "0.2": "B",
        "0.4": "C",
      };
      setMainActivityKey(keyMap[mainActivityValue] || "A1");
      setEnergySource(response.assessment.energySource?.toString() ?? "0");
      setHeatTransferType(
        response.assessment.heatTransferType?.toString() ?? "0"
      );
      setGeneratorLocation(
        response.assessment.generatorLocation?.toString() ?? "0"
      );
      setElectricalSystem(
        response.assessment.electricalSystem?.toString() ?? "0"
      );
      setFlammableLiquids(
        response.assessment.flammableLiquids?.toString() ?? "0"
      );
      setCombustibleDust(
        response.assessment.combustibleDust?.toString() ?? "0"
      );
      setPaintingSpraying(
        response.assessment.secondaryActivity?.toString() ?? "0"
      );

      return response;
    },
  });

  const handleCalculateA = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          body: JSON.stringify({
            mainActivity: parseFloat(mainActivity) || 0,
            energySource: parseFloat(energySource) || 0,
            heatTransferType: parseFloat(heatTransferType) || 0,
            generatorLocation: parseFloat(generatorLocation) || 0,
            electricalSystem: parseFloat(electricalSystem) || 0,
            flammableLiquids: parseFloat(flammableLiquids) || 0,
            combustibleDust: parseFloat(combustibleDust) || 0,
            secondaryActivity: parseFloat(paintingSpraying) || 0,
          }),
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("a محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error("خطا در محاسبه a");
      console.log(error);
    },
  });

  return (
    <div id="a-activation" className="tab-content active">
      <div className="help-card">
        <div className="text-info mb-2 text-base font-semibold">
          ضریب فعال‌سازی (a)
        </div>
        <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
          این ضریب بر اساس منابع احتمالی آتش‌سوزی و فعالیت‌های خطرناک محاسبه
          می‌شود. مقادیر هر گزینه دقیقاً مطابق با جداول سند FRAME است.
        </div>
      </div>

      {/* ===== گروه 1: فعالیت‌های اصلی ===== */}
      <h4 className="group-title">فعالیت‌های اصلی</h4>
      <div className="input-group">
        <label className="input-label">فعالیت اصلی</label>
        <select
          value={mainActivityKey}
          onChange={(e) => {
            const key = e.target.value;
            setMainActivityKey(key);
            // Map key to actual value for calculation
            const valueMap: Record<string, string> = {
              A1: "0",
              A2: "0",
              B: "0.2",
              C: "0.4",
              D: "0",
            };
            setMainActivity(valueMap[key] || "0");
          }}
          className=""
        >
          <option value="A1">A1 - کاربری غیرصنعتی: اداری، مسکونی، آموزشی</option>
          <option value="A2">A2 - صنایع محصولات غیرقابل احتراق (OH1)</option>
          <option value="B">B - صنایع عمومی/فروشگاه‌های بزرگ (OH2–OH3)</option>
          <option value="C">C - صنایع محصولات قابل احتراق (OH4 / HH1–HH4)</option>
          <option value="D">D - انبارها و ذخیره‌سازی مشابه (S)</option>
        </select>
      </div>

      {/* ===== گروه 2: سیستم‌های گرمایشی ===== */}
      <h4 className="group-title">سیستم‌های گرمایشی</h4>

      <div className="input-group">
        <label className="input-label">منبع انرژی (G)</label>
        <select
          value={energySource}
          onChange={(e) => setEnergySource(e.target.value)}
        >
          <option value="0">G0 - قابل‌اعمال نیست</option>
          <option value="0">G1 - برق، زغال‌سنگ، نفت کوره</option>
          <option value="0.1">G2 - گاز</option>
          <option value="0.15">G3 - چوب یا ضایعات سوختنی</option>
        </select>
      </div>

      <div className="input-group">
        <label className="input-label">نوع انتقال حرارت (E)</label>
        <select
          value={heatTransferType}
          onChange={(e) => setHeatTransferType(e.target.value)}
        >
          <option value="0">E1 -بدون گرمایش: بدون خطر</option>
          <option value="0">E2 - آب، بخار یا جامدات</option>
          <option value="0.05">E3 - هوای پرفشار یا روغن</option>
        </select>
      </div>

      <div className="input-group">
        <label className="input-label">محل ژنراتور حرارت (F)</label>
        <select
          value={generatorLocation}
          onChange={(e) => setGeneratorLocation(e.target.value)}
        >
          <option value="0">F0 - قابل‌اعمال نیست</option>
          <option value="0">F1 - اتاق جداگانه مقاوم در برابر آتش</option>
          <option value="0.1">F2 - داخل همان کمپارتمان</option>
        </select>
      </div>

      {/* ===== گروه 3: تأسیسات الکتریکی ===== */}
      <h4 className="group-title">تأسیسات الکتریکی</h4>
      <div className="input-group">
        <label className="input-label">تأسیسات برق (I)</label>
        <select
          value={electricalSystem}
          onChange={(e) => setElectricalSystem(e.target.value)}
        >
          <option value="0">I1 - منطبق و بازرسی منظم</option>
          <option value="0.1">I2 - منطبق ولی بدون بازرسی منظم</option>
          <option value="0.2">I3 - غیرمنطبق با مقررات</option>
        </select>
      </div>

      {/* ===== گروه 4: خطرات انفجار ===== */}
      <h4 className="group-title">خطرات انفجار</h4>

      <div className="input-group">
        <label className="input-label">مایعات و گازهای قابل اشتعال (Z)</label>
        <select
          value={flammableLiquids}
          onChange={(e) => setFlammableLiquids(e.target.value)}
        >
          <option value="0">Z - هیچکدام</option>
          <option value="0.3">Z0 - خطر انفجار دائمی</option>
          <option value="0.2">Z1 - خطر در شرایط عادی</option>
          <option value="0.1">Z2 - خطر گاه‌به‌گاه</option>
        </select>
      </div>

      <div className="input-group">
        <label className="input-label">گردوغبار قابل اشتعال (K)</label>
        <select
          value={combustibleDust}
          onChange={(e) => setCombustibleDust(e.target.value)}
        >
          <option value="0">K0 - هیچکدام</option>
          <option value="0.2">K1 - خطر انفجار گردوغبار (زون 20/21/22)</option>
          <option value="0.1">K2 - تولید گردوغبار بدون سیستم مکش</option>
        </select>
      </div>

      <div className="input-group">
        <label className="input-label">رنگ‌آمیزی / اسپری / پوشش</label>
        <select
          value={paintingSpraying}
          onChange={(e) => setPaintingSpraying(e.target.value)}
        >
          <option value="0">NONE - هیچ‌کدام</option>
          <option value="0.05">N1 - در فضای جداشده با تهویه مناسب</option>
          <option value="0.1">N2 - در فضای جداشده بدون تهویه اضافی</option>
          <option value="0.2">N3 - بدون جداسازی</option>
        </select>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => handleCalculateA.mutate()}
      >
        محاسبه ضریب a
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          {assessment?.assessment.factor_a
            ? "a = " + assessment?.assessment.factor_a.toFixed(3)
            : "-"}
        </div>
      </div>
    </div>
  );
}
