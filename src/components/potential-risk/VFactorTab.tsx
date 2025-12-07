"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AssessmentGetApiResponse,
  AssessmentUpdateApiResponse,
} from "@/lib/APIResponseInterfaces";

export default function VFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [windowArea, setWindowArea] = useState<number | "">(0);
  const [staticVentArea, setStaticVentArea] = useState<number | "">(0);
  const [ventMode, setVentMode] = useState<"manual" | "advanced">("manual");
  const [mechanicalVentFlow, setMechanicalVentFlow] = useState<number | "">(0);
  const [qvAdvanced, setQvAdvanced] = useState<number | "">("");
  const [cdAdvanced, setCdAdvanced] = useState<number | "">(0.65);
  const [deltaPAdvanced, setDeltaPAdvanced] = useState<number | "">(25);
  const [rhoAdvanced, setRhoAdvanced] = useState<number | "">(1.2);
  const [compartmentArea, setCompartmentArea] = useState<number | "">(100);
  const [ventingRatio, setVentingRatio] = useState<number | "">(0.01);
  const [qmVentilation, setQmVentilation] = useState<number | "">(500);
  const [ceilingHeight, setCeilingHeight] = useState<number | "">(3);

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

      setWindowArea(response.assessment.windowArea ?? 0);
      setStaticVentArea(response.assessment.staticVentArea ?? 0);
      setMechanicalVentFlow(response.assessment.mechVentFlow ?? 0);
      setVentingRatio(response.assessment.ventingRatio_k ?? 0.01);
      setCompartmentArea(response.assessment.area ?? 100);
      setQmVentilation(response.assessment.qm ?? 500);
      setCeilingHeight(response.assessment.height ?? 3);

      return response;
    },
  });

  const calculateAutoK = () => {
    const window = typeof windowArea === "number" ? windowArea : 0;
    const staticVent = typeof staticVentArea === "number" ? staticVentArea : 0;
    const area = typeof compartmentArea === "number" ? compartmentArea : 100;

    if (area > 0) {
      const k = (window + staticVent) / area;
      setVentingRatio(k);
    }
  };

  const handleCalculateV = useMutation({
    mutationFn: async () => {
      const qm = typeof qmVentilation === "number" ? qmVentilation : 500;
      const k = typeof ventingRatio === "number" ? ventingRatio : 0.01;
      const h = typeof ceilingHeight === "number" ? ceilingHeight : 3;

      if (qm <= 0) {
        throw new Error("Qm باید بزرگتر از صفر باشد");
      }

      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          body: JSON.stringify({
            windowArea: typeof windowArea === "number" ? windowArea : 0,
            staticVentArea:
              typeof staticVentArea === "number" ? staticVentArea : 0,
            mechVentFlow:
              typeof mechanicalVentFlow === "number" ? mechanicalVentFlow : 0,
            ventingRatio_k: k,
            height: h,
            qm: qm,
          }),
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("v محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "خطا در محاسبه v");
      console.log(error);
    },
  });

  return (
    <div id="v-factor" className="tab-content">
      <div className="formula-card" dir="ltr">
        <div className="text-primary mb-3 text-lg font-semibold">
          فرمول محاسبه v
        </div>
        <div className="formula-content">
          <BlockMath
            math={`v = 0.84 + 0.1 \\times \\log(Q_m) - \\sqrt{k \\times \\sqrt{h}}`}
          />
        </div>
      </div>

      <div className="help-card">
        <div className="text-primary mb-3 font-semibold">توضیحات</div>
        <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
          ضریب تهویه تأثیر دود و حرارت داخل ساختمان را نشان می‌دهد. <br />
          <b>
            k = نسبت مساحت بازشوهای تخلیه دود به مساحت کف (معمولاً 0.01 تا 0.02)
          </b>
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">
          مساحت کل پنجره‌ها و نورگیرها (A<sub>w</sub>)
        </label>
        <div className="input-wrapper">
          <input
            type="number"
            id="windowArea"
            min="0"
            step="0.01"
            value={windowArea}
            onChange={(e) =>
              setWindowArea(
                e.target.value === "" ? "" : parseFloat(e.target.value)
              )
            }
            className="w-full"
          />
          <span className="input-unit">m²</span>
        </div>
        <div className="input-hint">
          جمع مساحت پنجره‌ها و نورگیرهای قابل باز شدن به بیرون
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">
          مساحت دریچه‌های ثابت (A<sub>s</sub>)
        </label>
        <div className="input-wrapper">
          <input
            type="number"
            id="staticVentArea"
            min="0"
            step="0.01"
            value={staticVentArea}
            onChange={(e) =>
              setStaticVentArea(
                e.target.value === "" ? "" : parseFloat(e.target.value)
              )
            }
            className="w-full"
          />
          <span className="input-unit">m²</span>
        </div>
        <div className="input-hint">جمع مساحت دریچه‌های ثابت تخلیه دود</div>
      </div>

      <div className="input-group">
        <label className="input-label">دبی تهویه مکانیکی</label>

        <div style={{ margin: "0.25rem 0" }}>
          <label className="mr-3">
            <input
              type="radio"
              name="ventMode"
              value="manual"
              checked={ventMode === "manual"}
              onChange={() => setVentMode("manual")}
            />{" "}
            حالت دستی
          </label>
          <label>
            <input
              type="radio"
              name="ventMode"
              value="advanced"
              checked={ventMode === "advanced"}
              onChange={() => setVentMode("advanced")}
            />{" "}
            حالت پیشرفته
          </label>
        </div>

        {ventMode === "manual" && (
          <div id="manual-vent">
            <div className="input-wrapper">
              <input
                type="number"
                id="mechanicalVentFlow"
                min="0"
                step="1"
                value={mechanicalVentFlow}
                onChange={(e) =>
                  setMechanicalVentFlow(
                    e.target.value === "" ? "" : parseFloat(e.target.value)
                  )
                }
                className="w-full"
              />
              <span className="input-unit">Nm³/h</span>
            </div>
            <div className="input-hint">اگر وجود ندارد صفر وارد کنید</div>
          </div>
        )}

        {ventMode === "advanced" && (
          <div
            id="advanced-vent"
            className="mt-2 p-3 rounded-md border border-dashed bg-[#f9f9f9] border-[#ccc] dark:bg-(--bg-secondary)"
          >
            <div className="text-sm mb-3 leading-relaxed p-2.5 border-l-4 rounded bg-[#eef6fb] border-l-[#2196F3] dark:bg-card-bg">
              <b>فرمول محاسبه طبق NFPA 204 و EN TR 12101-4:</b>
              <br />
              <code>Qv = Cd × A × √(2 × ΔP / ρ)</code>
              <br />
              که Qv بر حسب m³/s است و پس از محاسبه، به Nm³/h تبدیل می‌شود.
              <br />
              <span style={{ color: "#555" }}>
                Cd: ضریب تخلیه — ΔP: اختلاف فشار (Pa) — ρ: چگالی هوا (kg/m³)
              </span>
            </div>

            <div className="input-group">
              <label>Qv (m³/s)</label>
              <input
                type="number"
                id="qv-advanced"
                step="0.001"
                value={qvAdvanced}
                onChange={(e) =>
                  setQvAdvanced(
                    e.target.value === "" ? "" : parseFloat(e.target.value)
                  )
                }
                className="w-full"
              />
            </div>
            <div className="input-group">
              <label>Cd</label>
              <input
                type="number"
                id="cd-advanced"
                step="0.01"
                value={cdAdvanced}
                onChange={(e) =>
                  setCdAdvanced(parseFloat(e.target.value || "0"))
                }
                className="w-full"
              />
            </div>
            <div className="input-group">
              <label>ΔP (Pa)</label>
              <input
                type="number"
                id="deltaP-advanced"
                step="1"
                value={deltaPAdvanced}
                onChange={(e) =>
                  setDeltaPAdvanced(parseFloat(e.target.value || "0"))
                }
                className="w-full"
              />
            </div>
            <div className="input-group">
              <label>ρ (kg/m³)</label>
              <input
                type="number"
                id="rho-advanced"
                step="0.01"
                value={rhoAdvanced}
                onChange={(e) =>
                  setRhoAdvanced(parseFloat(e.target.value || "0"))
                }
                className="w-full"
              />
            </div>
            <button className="bg-primary text-sm cursor-pointer px-3 py-2 rounded text-white hover:bg-primary-dark transition-all duration-200">
              محاسبه از فرمول پیشرفته
            </button>
          </div>
        )}
      </div>

      <div className="input-group">
        <label className="input-label">مساحت کل کف (A)</label>
        <div className="input-wrapper">
          <input
            type="number"
            id="compartmentArea"
            min="1"
            step="0.01"
            value={compartmentArea}
            onChange={(e) =>
              setCompartmentArea(
                e.target.value === "" ? "" : parseFloat(e.target.value)
              )
            }
            className="w-full"
          />
          <span className="input-unit">m²</span>
        </div>
        <div className="input-hint">کل مساحت فضای مورد نظر</div>
      </div>

      <button
        className="btn btn-secondary mb-6"
        type="button"
        onClick={calculateAutoK}
      >
        محاسبه خودکار k بر اساس بازشوها
      </button>

      <div className="input-group">
        <label className="input-label">نسبت تهویه (k)</label>
        <div className="input-wrapper">
          <input
            type="number"
            id="venting-ratio"
            readOnly
            step="0.001"
            value={ventingRatio}
            className="w-full"
          />
        </div>
        <div className="input-hint" id="k-details">
          نسبت مساحت بازشوهای مؤثر به مساحت کف (بر اساس داده‌های بالا)
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">بار آتش متحرک (Qm)</label>
        <div className="input-wrapper">
          <input
            type="number"
            id="qm-ventilation"
            min="0"
            step="100"
            value={qmVentilation}
            onChange={(e) =>
              setQmVentilation(
                e.target.value === "" ? "" : parseFloat(e.target.value)
              )
            }
            className="w-full"
          />
          <span className="input-unit">MJ/m²</span>
        </div>
        <div className="input-hint">همان مقدار استفاده شده در محاسبه q</div>
      </div>

      <div className="input-group">
        <label className="input-label">ارتفاع سقف (h)</label>
        <div className="input-wrapper">
          <input
            type="number"
            id="ceiling-height"
            min="2"
            max="15"
            step="0.5"
            value={ceilingHeight}
            onChange={(e) =>
              setCeilingHeight(
                e.target.value === "" ? "" : parseFloat(e.target.value)
              )
            }
            className="w-full"
          />
          <span className="input-unit">متر</span>
        </div>
        <div className="input-hint">ارتفاع از کف تا سقف (حداکثر 15 متر)</div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => handleCalculateV.mutate()}
      >
        محاسبه ضریب v
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          <span>v = </span>
          {assessment?.assessment.factor_v
            ? assessment?.assessment.factor_v.toFixed(3)
            : "-"}
        </div>
      </div>
    </div>
  );
}
