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
  const [heatTransferType, setHeatTransferType] = useState("0");
  const [heatTransferTypeKey, setHeatTransferTypeKey] = useState("E1");
  const [generatorLocation, setGeneratorLocation] = useState("0");
  const [generatorLocationKey, setGeneratorLocationKey] = useState("F0");
  const [energySource, setEnergySource] = useState("0");
  const [energySourceKey, setEnergySourceKey] = useState("G0");
  const [electricalSystem, setElectricalSystem] = useState("0");
  const [flammableLiquids, setFlammableLiquids] = useState("0");
  const [combustibleDust, setCombustibleDust] = useState("0");
  const [combustibleDustKey, setCombustibleDustKey] = useState("K0");
  const [weldingOperations, setWeldingOperations] = useState(false);
  const [additionalCarpentryPlastic, setAdditionalCarpentryPlastic] = useState(false);
  const [paintingSpraying, setPaintingSpraying] = useState("0");
  const [specialRisk, setSpecialRisk] = useState(false);

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
        "0": response.assessment.mainActivityKey || "A1",
        "0.2": "B",
        "0.4": "C",
      };
      setMainActivityKey(keyMap[mainActivityValue] || response.assessment.mainActivityKey || "A1");
      
      const heatTransferTypeValue = response.assessment.heatTransferType?.toString() ?? "0";
      setHeatTransferType(heatTransferTypeValue);
      const heatTransferTypeKeyMap: Record<string, string> = {
        "0": response.assessment.heatTransferTypeKey || "E1",
        "0.05": "E3",
      };
      setHeatTransferTypeKey(heatTransferTypeKeyMap[heatTransferTypeValue] || response.assessment.heatTransferTypeKey || "E1");
      
      const generatorLocationValue = response.assessment.generatorLocation?.toString() ?? "0";
      setGeneratorLocation(generatorLocationValue);
      const generatorLocationKeyMap: Record<string, string> = {
        "0": response.assessment.generatorLocationKey || "F0",
        "0.1": "F2",
      };
      setGeneratorLocationKey(generatorLocationKeyMap[generatorLocationValue] || response.assessment.generatorLocationKey || "F0");
      
      const energySourceValue = response.assessment.energySource?.toString() ?? "0";
      setEnergySource(energySourceValue);
      const energySourceKeyMap: Record<string, string> = {
        "0": response.assessment.energySourceKey || "G0",
        "0.1": "G2",
        "0.15": "G3",
      };
      setEnergySourceKey(energySourceKeyMap[energySourceValue] || response.assessment.energySourceKey || "G0");
      
      setElectricalSystem(
        response.assessment.electricalSystem?.toString() ?? "0"
      );
      
      setFlammableLiquids(
        response.assessment.flammableLiquids?.toString() ?? "0"
      );
      
      const combustibleDustValue = response.assessment.combustibleDust?.toString() ?? "0";
      setCombustibleDust(combustibleDustValue);
      const combustibleDustKeyMap: Record<string, string> = {
        "0": response.assessment.combustibleDustKey || "K0",
        "0.2": "K1",
        "0.1": "K2",
      };
      setCombustibleDustKey(combustibleDustKeyMap[combustibleDustValue] || response.assessment.combustibleDustKey || "K0");
      
      setWeldingOperations(
        (response.assessment.weldingOperations ?? 0) === 0.1
      );
      
      setAdditionalCarpentryPlastic(
        (response.assessment.additionalCarpentryPlastic ?? 0) === 0.1
      );
      
      setPaintingSpraying(
        response.assessment.secondaryActivity?.toString() ?? "0"
      );
      
      setSpecialRisk(
        (response.assessment.specialRisk ?? 0) === 0.1
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
            mainActivityKey: mainActivityKey,
            heatTransferType: parseFloat(heatTransferType) || 0,
            heatTransferTypeKey: heatTransferTypeKey,
            generatorLocation: parseFloat(generatorLocation) || 0,
            generatorLocationKey: generatorLocationKey,
            energySource: parseFloat(energySource) || 0,
            energySourceKey: energySourceKey,
            electricalSystem: parseFloat(electricalSystem) || 0,
            flammableLiquids: parseFloat(flammableLiquids) || 0,
            combustibleDust: parseFloat(combustibleDust) || 0,
            combustibleDustKey: combustibleDustKey,
            weldingOperations: weldingOperations ? 0.1 : 0,
            additionalCarpentryPlastic: additionalCarpentryPlastic ? 0.1 : 0,
            secondaryActivity: parseFloat(paintingSpraying) || 0,
            specialRisk: specialRisk ? 0.1 : 0,
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

      {/* ===== گروه 2: سیستم سرمایشی ===== */}
      <h4 className="group-title">سیستم سرمایشی</h4>

      <div className="input-group">
        <label className="input-label">نوع انتقال حرارت (E)</label>
        <select
          value={heatTransferTypeKey}
          onChange={(e) => {
            const key = e.target.value;
            setHeatTransferTypeKey(key);
            // Map key to actual value for calculation
            const valueMap: Record<string, string> = {
              E1: "0",
              E2: "0",
              E3: "0.05",
            };
            setHeatTransferType(valueMap[key] || "0");
          }}
        >
          <option value="E1">E1 - بدون گرمایش: بدون خطر</option>
          <option value="E2">E2 - آب، بخار یا جامدات</option>
          <option value="E3">E3 - هوای پرفشار یا روغن</option>
        </select>
      </div>

      <div className="input-group">
        <label className="input-label">محل ژنراتور حرارت (F)</label>
        <select
          value={generatorLocationKey}
          onChange={(e) => {
            const key = e.target.value;
            setGeneratorLocationKey(key);
            // Map key to actual value for calculation
            const valueMap: Record<string, string> = {
              F0: "0",
              F1: "0",
              F2: "0.1",
            };
            setGeneratorLocation(valueMap[key] || "0");
          }}
        >
          <option value="F0">F0 - قابل‌اعمال نیست</option>
          <option value="F1">F1 - اتاق جداگانه مقاوم در برابر آتش</option>
          <option value="F2">F2 - داخل همان کمپارتمان</option>
        </select>
      </div>

      <div className="input-group">
        <label className="input-label">منبع انرژی (G)</label>
        <select
          value={energySourceKey}
          onChange={(e) => {
            const key = e.target.value;
            setEnergySourceKey(key);
            // Map key to actual value for calculation
            const valueMap: Record<string, string> = {
              G0: "0",
              G1: "0",
              G2: "0.1",
              G3: "0.15",
            };
            setEnergySource(valueMap[key] || "0");
          }}
        >
          <option value="G0">G0 - قابل‌اعمال نیست</option>
          <option value="G1">G1 - برق، زغال‌سنگ، نفت کوره</option>
          <option value="G2">G2 - گاز</option>
          <option value="G3">G3 - چوب یا ضایعات سوختنی</option>
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

      {/* ===== گروه 4: مایعات و گازهای قابل اشتعال (Z) ===== */}
      <h4 className="group-title">مایعات و گازهای قابل اشتعال (Z)</h4>
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

      {/* ===== گروه 5: گردوغبار قابل اشتعال (K) ===== */}
      <h4 className="group-title">گردوغبار قابل اشتعال (K)</h4>
      <div className="input-group">
        <label className="input-label">گردوغبار قابل اشتعال (K)</label>
        <select
          value={combustibleDustKey}
          onChange={(e) => {
            const key = e.target.value;
            setCombustibleDustKey(key);
            // Map key to actual value for calculation
            const valueMap: Record<string, string> = {
              K0: "0",
              K1: "0.2",
              K2: "0.1",
            };
            setCombustibleDust(valueMap[key] || "0");
          }}
        >
          <option value="K0">K0 - هیچکدام</option>
          <option value="K1">K1 - خطر انفجار گردوغبار (زون 20/21/22)</option>
          <option value="K2">K2 - تولید گردوغبار بدون سیستم مکش</option>
        </select>
      </div>

      {/* ===== گروه 6: فعالیت‌های ثانویه ===== */}
      <h4 className="group-title">فعالیت‌های ثانویه</h4>
      
      <div className="input-group">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={weldingOperations}
            onChange={(e) => setWeldingOperations(e.target.checked)}
            className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
          />
          <span className="input-label mb-0">عملیات جوش کاری (W)</span>
        </label>
      </div>

      <div className="input-group">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={additionalCarpentryPlastic}
            onChange={(e) => setAdditionalCarpentryPlastic(e.target.checked)}
            className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
          />
          <span className="input-label mb-0">نجاری اضافی و یا استفاده از پلاستیک (P)</span>
        </label>
      </div>

      {/* ===== گروه 7: رنگ‌آمیزی / اسپری / پوشش (N) ===== */}
      <h4 className="group-title">رنگ‌آمیزی / اسپری / پوشش (N)</h4>
      <div className="input-group">
        <label className="input-label">رنگ‌آمیزی / اسپری / پوشش (N)</label>
        <select
          value={paintingSpraying}
          onChange={(e) => setPaintingSpraying(e.target.value)}
        >
          <option value="0">N0 - هیچ‌کدام</option>
          <option value="0.05">N1 - در فضای جداشده با تهویه مناسب</option>
          <option value="0.1">N2 - در فضای جداشده بدون تهویه اضافی</option>
          <option value="0.2">N3 - بدون جداسازی</option>
        </select>
        <div className="text-sm text-gray-500 mt-1 dark:text-gray-400">
          توجه: ضریب‌های N در فرمول اعمال نمی‌شود.
        </div>
      </div>

      {/* ===== گروه 8: سایر موارد ===== */}
      <h4 className="group-title">سایر موارد</h4>
      <div className="input-group">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={specialRisk}
            onChange={(e) => setSpecialRisk(e.target.checked)}
            className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
          />
          <span className="input-label mb-0">خطر ویژه (S)</span>
        </label>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => handleCalculateA.mutate()}
      >
        محاسبه ضریب a
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          {assessment?.assessment.factor_a !== null &&
          assessment?.assessment.factor_a !== undefined
            ? "a = " + assessment.assessment.factor_a.toFixed(3)
            : "-"}
        </div>
      </div>
    </div>
  );
}
