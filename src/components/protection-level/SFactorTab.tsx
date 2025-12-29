"use client";

import { useState, useMemo, useEffect } from "react";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AssessmentGetApiResponse,
  AssessmentUpdateApiResponse,
} from "@/lib/APIResponseInterfaces";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="bg-[#f8f9fa] dark:bg-slate-800 p-4 pb-8 rounded-xl space-y-2 mb-5">
      <h4 className="font-semibold">{title}</h4>
      <div className="border-b border-primary mb-4"></div>
      {children}
    </div>
  );
}

interface SelectProps {
  value: number;
  onChange: (value: number) => void;
  children: React.ReactNode;
}

function Select({ value, onChange, children }: SelectProps) {
  return (
    <select
      className="w-full border rounded-lg p-2 dark:bg-slate-900 dark:border-slate-600"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {children}
    </select>
  );
}

export default function SFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [s1, setS1] = useState(0);
  const [s1ElectronicSystem, setS1ElectronicSystem] = useState(false);
  const [s1ZoneIdentification, setS1ZoneIdentification] = useState(false);
  const [s2, setS2] = useState(0);
  const [s3, setS3] = useState(0);
  const [s4, setS4] = useState(8);
  const [s5, setS5] = useState(0);
  const [s6, setS6] = useState(0);
  const [s7, setS7] = useState(false);
  const [s8, setS8] = useState(false);
  const [s9, setS9] = useState(false);

  // Conditional logic for s1 checkboxes
  const s1ElectronicSystemDisabled = s1 === 2 || s1 === 0; // Disable if "توسط آلارم دود مستقل" (2) or "ندارد" (0)
  const s1ZoneIdentificationDisabled = s1 === 0; // Disable if "ندارد" (0)

  // Auto-uncheck and disable when conditions change
  useEffect(() => {
    if (s1 === 2 || s1 === 0) {
      setS1ElectronicSystem(false);
    }
    if (s1 === 0) {
      setS1ZoneIdentification(false);
    }
  }, [s1]);

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

      setS1(response.assessment.detectionType ?? 0);
      setS1ElectronicSystem(response.assessment.s1ElectronicSystem ?? false);
      setS1ZoneIdentification(response.assessment.s1ZoneIdentification ?? false);
      setS2(response.assessment.waterSupplyType ?? 0);
      setS3(response.assessment.sprinklerType ?? 0);
      setS4(response.assessment.fireStationType ?? 8);
      setS5(response.assessment.industrialBrigade ?? 0);
      setS6(response.assessment.s6OtherSuppression ?? 0);
      setS7(response.assessment.s7UnlimitedWater ?? false);
      setS8(response.assessment.s8DedicatedWater ?? false);
      setS9(response.assessment.s9WaterControl ?? false);

      return response;
    },
  });

  const handleCalculateS = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
        method: "PUT",
        body: JSON.stringify({
          detectionType: s1,
          s1ElectronicSystem: s1ElectronicSystem,
          s1ZoneIdentification: s1ZoneIdentification,
          waterSupplyType: s2,
          sprinklerType: s3,
          fireStationType: s4,
          industrialBrigade: s5,
          industrialBrigadeLabel: s5 === 0 ? "ندارد" : s5 === 6 ? "تیم پاره‌وقت (ساعات کاری)" : s5 === 14 ? "تیم تمام‌وقت ۲۴ساعته" : null,
          s6OtherSuppression: s6,
          s7UnlimitedWater: s7,
          s8DedicatedWater: s8,
          s9WaterControl: s9,
        }),
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("S محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error("خطا در محاسبه S");
      console.log(error);
    },
  });

  return (
    <div id="s-special" className="w-full space-y-6">
      <div className="formula-card">
        <h3 className="text-primary mb-3 text-lg font-semibold text-center">
          فرمول محاسبه S - ضریب حفاظت ویژه
        </h3>

        <div className="formula-content" dir="ltr">
          <BlockMath
            math={`S = 1.05^{s} \\quad \\text{که} \\quad s = s_1 + s_2 + s_3 + s_4 + s_5 + s_6 + s_7 + s_8 + s_9`}
          />
        </div>
      </div>

      <Section title="s₁ - سیستم‌های تشخیص خودکار حریق">
        <p className="text-sm mb-3">نوع سیستم تشخیص</p>
        <Select value={s1} onChange={setS1}>
          <option value={0}>ندارد</option>
          <option value={4}>
            تشخیص خودکار توسط اسپرینکلر + سوئیچ فشار/جریان
          </option>
          <option value={5}>توسط حسگر حرارتی</option>
          <option value={8}>توسط حسگر دود یا شعله</option>
          <option value={2}>توسط آلارم دود مستقل</option>
        </Select>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-start space-x-reverse p-3 rounded-lg border-2 transition-all duration-200"
               style={{
                 borderColor: s1ElectronicSystem && !s1ElectronicSystemDisabled ? 'rgb(59 130 246)' : 'rgb(229 231 235)',
                 backgroundColor: s1ElectronicSystem && !s1ElectronicSystemDisabled ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                 opacity: s1ElectronicSystemDisabled ? 0.5 : 1
               }}>
            <div className="flex-shrink-0 mt-0.5 ml-4">
              <input
                type="checkbox"
                id="s1-electronic-system"
                checked={s1ElectronicSystem}
                onChange={(e) => setS1ElectronicSystem(e.target.checked)}
                disabled={s1ElectronicSystemDisabled}
                className="w-6 h-6 text-primary bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer transition-all duration-200 checked:bg-primary checked:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <label 
              htmlFor="s1-electronic-system" 
              className={`flex-1 text-base cursor-pointer select-none leading-relaxed text-gray-700 dark:text-gray-300 transition-colors ${
                s1ElectronicSystemDisabled ? 'cursor-not-allowed opacity-50' : 'hover:text-primary dark:hover:text-primary'
              }`}
            >
              سیستم الکترونیکی تحت نظارت – پایش و نظارت بر خطاها
            </label>
          </div>
          
          <div className="flex items-start space-x-reverse p-3 rounded-lg border-2 transition-all duration-200"
               style={{
                 borderColor: s1ZoneIdentification && !s1ZoneIdentificationDisabled ? 'rgb(59 130 246)' : 'rgb(229 231 235)',
                 backgroundColor: s1ZoneIdentification && !s1ZoneIdentificationDisabled ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                 opacity: s1ZoneIdentificationDisabled ? 0.5 : 1
               }}>
            <div className="flex-shrink-0 mt-0.5 ml-4">
              <input
                type="checkbox"
                id="s1-zone-identification"
                checked={s1ZoneIdentification}
                onChange={(e) => setS1ZoneIdentification(e.target.checked)}
                disabled={s1ZoneIdentificationDisabled}
                className="w-6 h-6 text-primary bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer transition-all duration-200 checked:bg-primary checked:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <label 
              htmlFor="s1-zone-identification" 
              className={`flex-1 text-base cursor-pointer select-none leading-relaxed text-gray-700 dark:text-gray-300 transition-colors ${
                s1ZoneIdentificationDisabled ? 'cursor-not-allowed opacity-50' : 'hover:text-primary dark:hover:text-primary'
              }`}
            >
              شناسایی مجزای زون‌های کوچک حریق (دیتکتور، اتاق)
            </label>
          </div>
        </div>
      </Section>

      <Section title="s₂ - منابع آب بهبود یافته">
        <p className="text-sm">وضعیت منابع آب</p>
        <Select value={s2} onChange={setS2}>
          <option value={0}>منبع تک جریان/فشار</option>
          <option value={5}>قابل اطمینان بالا: یک مخزن + دو جریان/فشار</option>
          <option value={12}>دو مخزن مستقل هر کدام با جریان/فشار</option>
        </Select>
      </Section>

      <Section title="s₃ - سیستم‌های اطفاء خودکار">
        <p className="text-sm">سیستم اسپرینکلر</p>
        <Select value={s3} onChange={setS3}>
          <option value={0}>ندارد</option>
          <option value={11}>اسپرینکلر با یک منبع آب شهری</option>
          <option value={14}>اسپرینکلر با یک منبع مستقل</option>
          <option value={20}>اسپرینکلر با دو منبع مستقل</option>
        </Select>
      </Section>

      <Section title="s₄ - ایستگاه آتش‌نشانی">
        <p className="text-sm">نوع ایستگاه آتش‌نشانی</p>
        <Select value={s4} onChange={setS4}>
          <option value={8}>ایستگاه تمام‌وقت ۲۴ساعته در ۷ روز هفته</option>
          <option value={6}>ایستگاه نیمه‌وقت (روز تمام‌وقت، شب آنکال)</option>
          <option value={4}>ایستگاه با پرسنل پاره‌وقت</option>
          <option value={2}>ایستگاه داوطلب</option>
        </Select>
      </Section>

      <Section title="s₅ - آتش‌نشانی صنعتی خصوصی">
        <p className="text-sm">وضعیت تیم آتش‌نشانی صنعتی</p>
        <Select value={s5} onChange={setS5}>
          <option value={0}>ندارد</option>
          <option value={6}>تیم پاره‌وقت (ساعات کاری)</option>
          <option value={14}>تیم تمام‌وقت ۲۴ساعته</option>
        </Select>
      </Section>

      <Section title="s₆ - سایر سیستم‌های اطفای اتوماتیک">
        <p className="text-sm">سایر سیستم‌های اطفای اتوماتیک (گاز، فوم، پودر)</p>
        <Select value={s6} onChange={setS6}>
          <option value={0}>هیچ سیستم اطفای حریق خودکار دیگری وجود ندارد</option>
          <option value={11}>همراه با حفاظت بخش (کمپارتمان) با فوم، واترمیست (مه‌آب)، پودر، CO₂ یا گاز بی‌اثر</option>
        </Select>
      </Section>

      <Section title="s₇ - منابع آب پایان‌ناپذیر">
        <div className="flex items-start space-x-reverse p-3 rounded-lg border-2 transition-all duration-200"
             style={{
               borderColor: s7 ? 'rgb(59 130 246)' : 'rgb(229 231 235)',
               backgroundColor: s7 ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
             }}>
          <div className="flex-shrink-0 mt-0.5 ml-4">
            <input
              type="checkbox"
              id="s7-unlimited-water"
              checked={s7}
              onChange={(e) => setS7(e.target.checked)}
              className="w-6 h-6 text-primary bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer transition-all duration-200 checked:bg-primary checked:border-primary"
            />
          </div>
          <label 
            htmlFor="s7-unlimited-water" 
            className="flex-1 text-base cursor-pointer select-none leading-relaxed text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            منابع آب پایان‌ناپذیر (با ظرفیت حداقل ۴ برابر مقدار موردنیاز)
          </label>
        </div>
      </Section>

      <Section title="s₈ - منبع آب اختصاص‌یافته">
        <div className="flex items-start space-x-reverse p-3 rounded-lg border-2 transition-all duration-200"
             style={{
               borderColor: s8 ? 'rgb(59 130 246)' : 'rgb(229 231 235)',
               backgroundColor: s8 ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
             }}>
          <div className="flex-shrink-0 mt-0.5 ml-4">
            <input
              type="checkbox"
              id="s8-dedicated-water"
              checked={s8}
              onChange={(e) => setS8(e.target.checked)}
              className="w-6 h-6 text-primary bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer transition-all duration-200 checked:bg-primary checked:border-primary"
            />
          </div>
          <label 
            htmlFor="s8-dedicated-water" 
            className="flex-1 text-base cursor-pointer select-none leading-relaxed text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            منبع آب اختصاص‌یافته فقط برای اطفای حریق
          </label>
        </div>
      </Section>

      <Section title="s₉ - کنترل منبع آب">
        <div className="flex items-start space-x-reverse p-3 rounded-lg border-2 transition-all duration-200"
             style={{
               borderColor: s9 ? 'rgb(59 130 246)' : 'rgb(229 231 235)',
               backgroundColor: s9 ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
             }}>
          <div className="flex-shrink-0 mt-0.5 ml-4">
            <input
              type="checkbox"
              id="s9-water-control"
              checked={s9}
              onChange={(e) => setS9(e.target.checked)}
              className="w-6 h-6 text-primary bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer transition-all duration-200 checked:bg-primary checked:border-primary"
            />
          </div>
          <label 
            htmlFor="s9-water-control" 
            className="flex-1 text-base cursor-pointer select-none leading-relaxed text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            کنترل منبع آب - تحت کنترل بهره‌بردار/استفاده‌کننده ساختمان (مستقل)
          </label>
        </div>
      </Section>

      <div>
        <button
          className="btn btn-primary"
          onClick={() => handleCalculateS.mutate()}
        >
          محاسبه ضریب S
        </button>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          {assessment?.assessment.factor_S
            ? assessment?.assessment.factor_S.toFixed(3)
            : "-"}
        </div>
      </div>
    </div>
  );
}
