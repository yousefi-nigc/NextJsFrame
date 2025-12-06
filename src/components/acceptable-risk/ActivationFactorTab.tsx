"use client";

import { useState } from "react";
import { CalculationResults } from "@/types";

interface ActivationFactorTabProps {
  results: CalculationResults;
  updateResults: (updates: Partial<CalculationResults>) => void;
}

export default function ActivationFactorTab({
  results,
  updateResults,
}: ActivationFactorTabProps) {
  const [mainActivity, setMainActivity] = useState("0");
  const [energySource, setEnergySource] = useState("0");
  const [heatTransferType, setHeatTransferType] = useState("0");
  const [generatorLocation, setGeneratorLocation] = useState("0");
  const [electricalSystem, setElectricalSystem] = useState("0");
  const [flammableLiquids, setFlammableLiquids] = useState("0");
  const [combustibleDust, setCombustibleDust] = useState("0");
  const [paintingSpraying, setPaintingSpraying] = useState("0");

  const calculateA = () => {
    if (!results) return;
    
    const a =
      parseFloat(mainActivity) +
      parseFloat(energySource) +
      parseFloat(heatTransferType) +
      parseFloat(generatorLocation) +
      parseFloat(electricalSystem) +
      parseFloat(flammableLiquids) +
      parseFloat(combustibleDust) +
      parseFloat(paintingSpraying);

    updateResults({ a });

    // Calculate A, A1, A2
    const t = results.t ?? null;
    const c = results.c ?? null;
    const r = results.r ?? null;
    const d = results.d ?? null;

    const A = t !== null && c !== null 
      ? Math.max(0.1, 1.6 - a - t - c) 
      : null;
    const A1 = t !== null && r !== null 
      ? Math.max(0.1, 1.6 - a - t - r) 
      : null;
    const A2 = c !== null && d !== null 
      ? Math.max(0.1, 1.6 - a - c - d) 
      : null;

    updateResults({ A, A1, A2 });
  };

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
          value={mainActivity}
          onChange={(e) => setMainActivity(e.target.value)}
          className=""
        >
          <option value="0">A1 - کاربری غیرصنعتی: اداری، مسکونی، آموزشی</option>
          <option value="0">A2 - صنایع محصولات غیرقابل احتراق (OH1)</option>
          <option value="0.2">B - صنایع عمومی/فروشگاه‌های بزرگ (OH2–OH3)</option>
          <option value="0.4">
            C - صنایع محصولات قابل احتراق (OH4 / HH1–HH4)
          </option>
          <option value="0">D - انبارها و ذخیره‌سازی مشابه (S)</option>
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

      <button className="btn btn-primary" onClick={calculateA}>
        محاسبه ضریب a
      </button>

      {results && results.a !== null && results.a !== undefined && (
        <div className="result-display" style={{ marginTop: "1rem" }}>
          <div className="text-success font-semibold">
            ضریب a = {results.a.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

