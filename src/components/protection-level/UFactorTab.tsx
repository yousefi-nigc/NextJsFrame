"use client";

import { useState, useMemo, useEffect } from "react";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AssessmentGetApiResponse,
  AssessmentUpdateApiResponse,
} from "@/lib/APIResponseInterfaces";

export default function UFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [subcompartment, setSubcompartment] = useState(0);
  const [stairways, setStairways] = useState(0);
  const [stairwaysIndex, setStairwaysIndex] = useState(0); // Track which option index is selected
  const [horizontalExit, setHorizontalExit] = useState(0);
  const [sprinklers, setSprinklers] = useState(0);
  const [u1PartialDetection, setU1PartialDetection] = useState(false);
  const [u2Max300Occupants, setU2Max300Occupants] = useState(false);
  const [u3VoiceEvacuation, setU3VoiceEvacuation] = useState(false);
  const [u4MarkedExits, setU4MarkedExits] = useState(false);
  const [u5SmokeEvacuation, setU5SmokeEvacuation] = useState(false);

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

      setSubcompartment(response.assessment.subcompartment ?? 0);
      const savedStairways = response.assessment.stairways ?? 0;
      setStairways(savedStairways);
      // Use saved index if available, otherwise map value to index
      const savedIndex = response.assessment.stairwaysIndex;
      if (savedIndex !== null && savedIndex !== undefined) {
        setStairwaysIndex(savedIndex);
      } else {
        // Map value to index: 0->0, 1->1, 2->2, 3->3, 4->4, 6->5, 8->6
        // For value 2, default to index 2 (third option)
        const valueToIndex: Record<number, number> = {
          0: 0,
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          6: 5,
          8: 6,
        };
        setStairwaysIndex(valueToIndex[savedStairways] ?? 0);
      }
      setHorizontalExit(response.assessment.horizontalExit ?? 0);
      setSprinklers(response.assessment.sprinklers ?? 0);
      setU1PartialDetection(response.assessment.u1PartialDetection ?? false);
      setU2Max300Occupants(response.assessment.u2Max300Occupants ?? false);
      setU3VoiceEvacuation(response.assessment.u3VoiceEvacuation ?? false);
      setU4MarkedExits(response.assessment.u4MarkedExits ?? false);
      setU5SmokeEvacuation(response.assessment.u5SmokeEvacuation ?? false);

      return response;
    },
  });

  // Get S factor values for read-only display
  const s1 = assessment?.assessment.detectionType ?? 0;
  const s1ElectronicSystem = assessment?.assessment.s1ElectronicSystem ?? false;
  const s1ZoneIdentification = assessment?.assessment.s1ZoneIdentification ?? false;
  const s6 = assessment?.assessment.s6OtherSuppression ?? 0;
  const s4 = assessment?.assessment.fireStationType ?? 0;
  const s5 = assessment?.assessment.industrialBrigade ?? 0;
  const s5Label = assessment?.assessment.industrialBrigadeLabel;

  // Conditional disabling for u1 and u5
  const u1Disabled = useMemo(() => {
    return s1 === 0; // Disabled when s1 is "ندارد" (0)
  }, [s1]);

  const u5Disabled = useMemo(() => {
    return s1 === 0; // Disabled when s1 is "ندارد" (0)
  }, [s1]);

  // Auto-uncheck when disabled
  useEffect(() => {
    if (u1Disabled) {
      setU1PartialDetection(false);
    }
  }, [u1Disabled]);

  useEffect(() => {
    if (u5Disabled) {
      setU5SmokeEvacuation(false);
    }
  }, [u5Disabled]);

  // Get S factor display labels
  const getS1Label = (value: number) => {
    const labels: Record<number, string> = {
      0: "ندارد",
      1: "توسط سیستم تشخیص خودکار حریق",
      2: "توسط آلارم دود مستقل",
    };
    return labels[value] || "نامشخص";
  };

  const getS6Label = (value: number) => {
    if (value === 0) return "هیچ سیستم اطفای حریق خودکار دیگری وجود ندارد";
    if (value === 11) return "همراه با حفاظت بخش (کمپارتمان) با فوم، واترمیست (مه‌آب)، پودر، 2CO یا گاز بی‌اثر";
    return "نامشخص";
  };

  const getS4Label = (value: number) => {
    const labels: Record<number, string> = {
      0: "بدون ایستگاه آتش‌نشانی",
      2: "ایستگاه آتش‌نشانی در فاصله بیش از 5 کیلومتر",
      4: "ایستگاه آتش‌نشانی در فاصله 2-5 کیلومتر",
      6: "ایستگاه آتش‌نشانی در فاصله کمتر از 2 کیلومتر",
      8: "ایستگاه آتش‌نشانی در فاصله کمتر از 1 کیلومتر",
    };
    return labels[value] || "نامشخص";
  };

  const getS5Label = (value: number) => {
    const labels: Record<number, string> = {
      0: "ندارد",
      6: "تیم پاره‌وقت (ساعات کاری)",
      14: "تیم تمام‌وقت ۲۴ساعته",
    };
    return labels[value] || "نامشخص";
  };

  const handleCalculateU = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          body: JSON.stringify({
            subcompartment,
            stairways,
            stairwaysIndex,
            horizontalExit,
            sprinklers,
            u1PartialDetection: u1Disabled ? false : u1PartialDetection,
            u2Max300Occupants,
            u3VoiceEvacuation,
            u4MarkedExits,
            u5SmokeEvacuation: u5Disabled ? false : u5SmokeEvacuation,
          }),
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("U محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error("خطا در محاسبه U");
      console.log(error);
    },
  });

  // Calculate u value for display
  const calculatedU = useMemo(() => {
    const s1_base = s1 ?? 0;
    let s1_checkboxes = 0;
    if (s1ElectronicSystem === true) s1_checkboxes += 2;
    if (s1ZoneIdentification === true) s1_checkboxes += 2;
    const s1_total = s1_base + s1_checkboxes;

    let u = 0;
    u += subcompartment ?? 0;
    u += stairways ?? 0;
    u += horizontalExit ?? 0;
    u += sprinklers ?? 0;
    u += s1_total;
    u += s6 ?? 0;
    u += s4 ?? 0;
    u += s5 ?? 0;
    
    // U factor checkboxes
    if (!u1Disabled && u1PartialDetection) u += 2;
    if (u2Max300Occupants) u += 2;
    if (u3VoiceEvacuation) u += 6;
    if (u4MarkedExits) u += 4;
    if (!u5Disabled && u5SmokeEvacuation) u += 3;

    return u;
  }, [subcompartment, stairways, horizontalExit, sprinklers, s1, s1ElectronicSystem, s1ZoneIdentification, s6, s4, s5, u1PartialDetection, u2Max300Occupants, u3VoiceEvacuation, u4MarkedExits, u5SmokeEvacuation, u1Disabled, u5Disabled]);

  return (
    <div id="u-escape" className="tab-content">
      <div className="formula-card">
        <h3 className="text-primary mb-3 text-lg font-semibold text-center">
          فرمول محاسبه U
        </h3>
        <div className="formula-content text-center" dir="ltr">
          <BlockMath
            math={`U = 1.05^{u} \\quad \\text{که} \\quad u = \\sum u_i + s_1 + s_4 + s_5 + s_6`}
          />
        </div>
      </div>

      <div className="help-card">
        <div className="mb-2 font-semibold text-primary">توضیحات کاربردی</div>
        <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
          ضریب U بیانگر اثربخشی شرایط فرار و نجات در ساختمان است و از مجموع
          امتیازهای بخش‌های مختلف محاسبه می‌شود:
          <b> بخش‌بندی فرعی، نوع پله‌های تخلیه، خروج افقی، حفاظت اسپرینکلر، سیستم‌های تشخیص حریق، و سایر عوامل </b>.
          هر گزینه در این بخش‌ها بسته به سطح حفاظت و تسهیل مسیر فرار، امتیاز
          مثبت می‌گیرد. مجموع امتیازها (u) در فرمول
          <code className="mx-1 font-mono">U = 1.05ᵘ</code>
          قرار می‌گیرد؛ هرچه U بزرگ‌تر باشد، شرایط تخلیه مناسب‌تر است.
        </div>
      </div>

      {/* S Factor Display Section (Read-only) */}
      <div className="text-primary font-semibold mt-6 mb-2 border-r-4 border-primary pr-2">
        مقادیر S (فقط نمایش - از بخش S)
      </div>

      <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg mb-4 space-y-3">
        <div>
          <label className="block mb-1 font-medium text-gray-600 dark:text-gray-300">
            s₁ - سیستم‌های تشخیص خودکار حریق
          </label>
          <div className="bg-white dark:bg-slate-900 p-3 rounded border border-gray-300 dark:border-gray-600">
            <div className="font-semibold mb-2">{getS1Label(s1)}</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={s1ElectronicSystem}
                  disabled
                  className="cursor-not-allowed opacity-50"
                />
                <span className={s1ElectronicSystem ? "text-green-600 dark:text-green-400" : "text-gray-400"}>
                  سیستم الکترونیکی تحت نظارت – پایش و نظارت بر خطاها
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={s1ZoneIdentification}
                  disabled
                  className="cursor-not-allowed opacity-50"
                />
                <span className={s1ZoneIdentification ? "text-green-600 dark:text-green-400" : "text-gray-400"}>
                  شناسایی مجزای زون‌های کوچک حریق (دیتکتور، اتاق)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600 dark:text-gray-300">
            S6 - سایر سیستم‌های اطفای اتوماتیک (گاز، فوم، پودر)
          </label>
          <div className="bg-white dark:bg-slate-900 p-3 rounded border border-gray-300 dark:border-gray-600">
            <div className="font-semibold">{getS6Label(s6)}</div>
            {s6 !== null && s6 !== undefined && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                مقدار: {s6}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600 dark:text-gray-300">
            s₄ - ایستگاه آتش‌نشانی
          </label>
          <div className="bg-white dark:bg-slate-900 p-3 rounded border border-gray-300 dark:border-gray-600">
            <div className="font-semibold">{getS4Label(s4)}</div>
            {s4 !== null && s4 !== undefined && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                مقدار: {s4}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600 dark:text-gray-300">
            s₅ - آتش‌نشانی صنعتی خصوصی
          </label>
          <div className="bg-white dark:bg-slate-900 p-3 rounded border border-gray-300 dark:border-gray-600">
            <div className="font-semibold">{s5Label || getS5Label(s5 !== null && s5 !== undefined ? s5 : 0)}</div>
            {s5 !== null && s5 !== undefined && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                مقدار: {s5}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-primary font-semibold mt-6 mb-2 border-r-4 border-primary pr-2">
        بخش‌بندی فرعی (Subcompartments)
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">نوع بخش‌بندی</label>
        <select
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          value={subcompartment}
          onChange={(e) => setSubcompartment(parseFloat(e.target.value))}
        >
          <option value={0}>بدون بخش‌بندی</option>
          <option value={2}>EI30 – حداکثر 1000 m²</option>
          <option value={4}>EI60 – حداکثر 1000 m²</option>
        </select>
      </div>

      <div
        className="
            p-3 rounded-md text-[0.92em] leading-6 mt-2
            bg-[#fff8e1] text-black border border-[#f57c00]                    
            dark:bg-[#f57b001c]   
            dark:text-white"
      >
        <b className="text-[#f57c00] dark:text-warning">راهنما:</b>
        <br />
        <b>EI 30</b> یعنی دیوار/جداکننده‌ها ۳۰ دقیقه مقاومت حریق دارند (<i>E</i>{" "}
        = یکپارچگی، <i>I</i> = عایق حرارتی).
        <br />
        <b>EI 60</b> یعنی مقاومت حریق این جداکننده‌ها ۶۰ دقیقه است؛ حفاظت بیشتر
        و زمان تخلیه امن‌تر.
      </div>

      <div className="text-primary font-semibold mt-6 mb-2 border-r-4 border-primary pr-2">
        نوع پله‌های تخلیه
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">نوع راه‌پله</label>
        <select
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          value={stairwaysIndex}
          onChange={(e) => {
            const selectedIndex = parseInt(e.target.value);
            setStairwaysIndex(selectedIndex);
            // Map index to value: 0->0, 1->1, 2->2, 3->3, 4->4, 5->6, 6->8, 7->2
            const indexToValue: Record<number, number> = {
              0: 0,
              1: 1,
              2: 2,
              3: 3,
              4: 4,
              5: 6,
              6: 8,
              7: 2, // Last option with value 2
            };
            setStairways(indexToValue[selectedIndex] ?? 0);
          }}
        >
          <option value={0}>بدون پله یا پله باز داخلی</option>
          <option value={1}>یک پله محصور داخلی</option>
          <option value={2}>چند پله محصور داخلی</option>
          <option value={3}>حداقل یک پله محصور ضد دود</option>
          <option value={4}>چند پله محصور ضد دود</option>
          <option value={5}>پله داخلی + یک پله خارجی</option>
          <option value={6}>پله داخلی + چند پله خارجی</option>
          <option value={7}>پله داخلی + سرسره/نردبان (طبقه 1 و 2)</option>
        </select>
      </div>

      <div className="text-primary font-semibold mt-6 mb-2 border-r-4 border-primary pr-2">
        خروج افقی
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">نوع خروج افقی</label>
        <select
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          value={horizontalExit}
          onChange={(e) => setHorizontalExit(parseFloat(e.target.value))}
        >
          <option value={0}>بدون خروج افقی</option>
          <option value={2}>تا ۵۰٪ ظرفیت موردنیاز</option>
          <option value={8}>۱۰۰٪ ظرفیت موردنیاز</option>
        </select>
      </div>

      <div className="text-primary font-semibold mt-6 mb-2 border-r-4 border-primary pr-2">
        حفاظت اسپرینکلر
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">نوع حفاظت</label>
        <select
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          value={sprinklers}
          onChange={(e) => setSprinklers(parseFloat(e.target.value))}
        >
          <option value={0}>بدون اسپرینکلر</option>
          <option value={5}>اسپرینکلر فقط در نواحی پُرخطر</option>
          <option value={10}>کل بخش مجهز به اسپرینکلر</option>
        </select>
      </div>

      {/* New Checkboxes Section */}
      <div className="text-primary font-semibold mt-6 mb-2 border-r-4 border-primary pr-2">
        سایر عوامل تخلیه و نجات
      </div>

      <div className="space-y-4 mb-4">
        {/* u1 */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-300 dark:border-gray-600">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={u1PartialDetection}
              onChange={(e) => setU1PartialDetection(e.target.checked)}
              disabled={u1Disabled}
              className="mt-1 w-4 h-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className="flex-1">
              <span className={`font-medium ${u1Disabled ? "text-gray-400" : ""}`}>
                سامانه تشخیص حریق جزئی (موضعی)، فقط در نواحی بحرانی مرتبط با ایمنی افراد
              </span>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                امتیاز: {u1PartialDetection && !u1Disabled ? "2" : "0"}
                {u1Disabled && " (غیرفعال: s₁ = ندارد)"}
              </div>
            </div>
          </label>
        </div>

        {/* u2 */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-300 dark:border-gray-600">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={u2Max300Occupants}
              onChange={(e) => setU2Max300Occupants(e.target.checked)}
              className="mt-1 w-4 h-4 cursor-pointer"
            />
            <div className="flex-1">
              <span className="font-medium">
                حداکثر ۳۰۰ نفر می‌توانند به‌طور هم‌زمان هشدار دریافت کنند
              </span>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                امتیاز: {u2Max300Occupants ? "2" : "0"}
              </div>
            </div>
          </label>
        </div>

        {/* u3 */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-300 dark:border-gray-600">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={u3VoiceEvacuation}
              onChange={(e) => setU3VoiceEvacuation(e.target.checked)}
              className="mt-1 w-4 h-4 cursor-pointer"
            />
            <div className="flex-1">
              <span className="font-medium">
                هشدار تخلیه با پیام‌های گفتاری از طریق سامانه ارتباط صوتی
              </span>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                امتیاز: {u3VoiceEvacuation ? "6" : "0"}
              </div>
            </div>
          </label>
        </div>

        {/* u4 */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-300 dark:border-gray-600">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={u4MarkedExits}
              onChange={(e) => setU4MarkedExits(e.target.checked)}
              className="mt-1 w-4 h-4 cursor-pointer"
            />
            <div className="flex-1">
              <span className="font-medium">
                مسیرهای خروج به‌طور کامل علامت‌گذاری شده و دارای روشنایی هستند
              </span>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                امتیاز: {u4MarkedExits ? "4" : "0"}
              </div>
            </div>
          </label>
        </div>

        {/* u5 */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-300 dark:border-gray-600">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={u5SmokeEvacuation}
              onChange={(e) => setU5SmokeEvacuation(e.target.checked)}
              disabled={u5Disabled}
              className="mt-1 w-4 h-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className="flex-1">
              <span className={`font-medium ${u5Disabled ? "text-gray-400" : ""}`}>
                تخلیه دود که توسط سامانه تشخیص خودکار فعال می‌شود
              </span>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                امتیاز: {u5SmokeEvacuation && !u5Disabled ? "3" : "0"}
                {u5Disabled && " (غیرفعال: s₁ = ندارد)"}
              </div>
            </div>
          </label>
        </div>
      </div>

      <button
        className="btn btn-primary mt-4"
        onClick={() => handleCalculateU.mutate()}
      >
        محاسبه ضریب U
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          {assessment?.assessment.factor_U !== null &&
          assessment?.assessment.factor_U !== undefined ? (
            <>
              <div
                style={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  marginBottom: "0.5em",
                }}
              >
                U = {assessment.assessment.factor_U.toFixed(3)}
              </div>
              <div
                style={{
                  fontSize: "0.95em",
                  color: "#2196F3",
                  fontWeight: "bold",
                  lineHeight: "1.8",
                }}
              >
                u = {calculatedU.toFixed(1)}
              </div>
            </>
          ) : (
            "-"
          )}
        </div>
      </div>
    </div>
  );
}
