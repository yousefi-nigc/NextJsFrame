"use client";

import { useState, useMemo } from "react";
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

export default function NFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [n1ContinuousPresence, setN1ContinuousPresence] = useState(false);
  const [n1ManualWarning, setN1ManualWarning] = useState(false);
  const [n1FireDeptNotification, setN1FireDeptNotification] = useState(false);
  const [n1ResidentAlarm, setN1ResidentAlarm] = useState(false);
  const [n2, setN2] = useState(0);
  const [n3, setN3] = useState(0);
  const [n4, setN4] = useState(0);
  const [n5, setN5] = useState(0);

  // Calculate n1 from checkboxes
  const n1 = useMemo(() => {
    let uncheckedCount = 0;
    if (!n1ContinuousPresence) uncheckedCount++;
    if (!n1ManualWarning) uncheckedCount++;
    if (!n1FireDeptNotification) uncheckedCount++;
    if (!n1ResidentAlarm) uncheckedCount++;
    return uncheckedCount * 2;
  }, [n1ContinuousPresence, n1ManualWarning, n1FireDeptNotification, n1ResidentAlarm]);

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

      // Load n1 checkboxes if available, otherwise infer from n1 value
      if (response.assessment.n1ContinuousPresence !== null || 
          response.assessment.n1ManualWarning !== null || 
          response.assessment.n1FireDeptNotification !== null || 
          response.assessment.n1ResidentAlarm !== null) {
        setN1ContinuousPresence(response.assessment.n1ContinuousPresence ?? false);
        setN1ManualWarning(response.assessment.n1ManualWarning ?? false);
        setN1FireDeptNotification(response.assessment.n1FireDeptNotification ?? false);
        setN1ResidentAlarm(response.assessment.n1ResidentAlarm ?? false);
      } else {
        // Legacy: if n1 is provided but checkboxes are not, we can't infer the checkboxes
        // So we'll just leave them as false (default)
      }
      
      setN2(response.assessment.n2 ?? 0);
      setN3(response.assessment.n3 ?? 0);
      setN4(response.assessment.n4 ?? 0);
      setN5(response.assessment.n5 ?? 0);

      return response;
    },
  });

  const handleCalculateN = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
        method: "PUT",
        body: JSON.stringify({
          n1ContinuousPresence,
          n1ManualWarning,
          n1FireDeptNotification,
          n1ResidentAlarm,
          n2,
          n3,
          n4,
          n5,
        }),
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("N محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error("خطا در محاسبه N");
      console.log(error);
    },
  });

  return (
    <div id="n-normal" className="tab-content">
      <div className="formula-card">
        <div className="text-primary mb-3 text-lg font-semibold text-center">
          فرمول محاسبه N - ضریب حفاظت عادی
        </div>

        <div className="formula-content text-center text-base mt-3" dir="ltr">
          <BlockMath
            math={`N = 0.95^{n} \\quad \\text{که} \\quad n = n_1 + n_2 + n_3 + n_4 + n_5`}
          />
        </div>
      </div>

      <Section title="n₁ - کشف و هشدار">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start space-x-reverse p-4 rounded-lg border-2 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10"
                 style={{
                   borderColor: n1ContinuousPresence ? 'rgb(59 130 246)' : 'rgb(229 231 235)',
                   backgroundColor: n1ContinuousPresence ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
                 }}>
              <div className="flex-shrink-0 mt-0.5 ml-4">
                <input
                  type="checkbox"
                  id="n1-continuous-presence"
                  checked={n1ContinuousPresence}
                  onChange={(e) => setN1ContinuousPresence(e.target.checked)}
                  className="w-6 h-6 text-primary bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer transition-all duration-200 checked:bg-primary checked:border-primary"
                />
              </div>
              <label 
                htmlFor="n1-continuous-presence" 
                className="flex-1 text-base cursor-pointer select-none leading-relaxed text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                حضور مداوم نیروی انسانی / خدمات نگهبانی
              </label>
            </div>
            
            <div className="flex items-start space-x-reverse p-4 rounded-lg border-2 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10"
                 style={{
                   borderColor: n1ManualWarning ? 'rgb(59 130 246)' : 'rgb(229 231 235)',
                   backgroundColor: n1ManualWarning ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
                 }}>
              <div className="flex-shrink-0 mt-0.5 ml-4">
                <input
                  type="checkbox"
                  id="n1-manual-warning"
                  checked={n1ManualWarning}
                  onChange={(e) => setN1ManualWarning(e.target.checked)}
                  className="w-6 h-6 text-primary bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer transition-all duration-200 checked:bg-primary checked:border-primary"
                />
              </div>
              <label 
                htmlFor="n1-manual-warning" 
                className="flex-1 text-base cursor-pointer select-none leading-relaxed text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                همچنین یک سیستم هشداردهی دستی وجود دارد
              </label>
            </div>
            
            <div className="flex items-start space-x-reverse p-4 rounded-lg border-2 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10"
                 style={{
                   borderColor: n1FireDeptNotification ? 'rgb(59 130 246)' : 'rgb(229 231 235)',
                   backgroundColor: n1FireDeptNotification ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
                 }}>
              <div className="flex-shrink-0 mt-0.5 ml-4">
                <input
                  type="checkbox"
                  id="n1-fire-dept-notification"
                  checked={n1FireDeptNotification}
                  onChange={(e) => setN1FireDeptNotification(e.target.checked)}
                  className="w-6 h-6 text-primary bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer transition-all duration-200 checked:bg-primary checked:border-primary"
                />
              </div>
              <label 
                htmlFor="n1-fire-dept-notification" 
                className="flex-1 text-base cursor-pointer select-none leading-relaxed text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                ارسال/اطلاع‌رسانی تضمین‌شده به سازمان آتش‌نشانی
              </label>
            </div>
            
            <div className="flex items-start space-x-reverse p-4 rounded-lg border-2 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10"
                 style={{
                   borderColor: n1ResidentAlarm ? 'rgb(59 130 246)' : 'rgb(229 231 235)',
                   backgroundColor: n1ResidentAlarm ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
                 }}>
              <div className="flex-shrink-0 mt-0.5 ml-4">
                <input
                  type="checkbox"
                  id="n1-resident-alarm"
                  checked={n1ResidentAlarm}
                  onChange={(e) => setN1ResidentAlarm(e.target.checked)}
                  className="w-6 h-6 text-primary bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer transition-all duration-200 checked:bg-primary checked:border-primary"
                />
              </div>
              <label 
                htmlFor="n1-resident-alarm" 
                className="flex-1 text-base cursor-pointer select-none leading-relaxed text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                همچنین آلارم هشدار برای ساکنان / افراد حاضر وجود دارد
              </label>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  مقدار محاسبه شده n₁:
                </div>
                <div className="text-2xl font-bold text-primary">
                  {n1}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {n1 === 0 ? (
                    <span className="text-green-600 dark:text-green-400 font-semibold">✓ همه موارد انتخاب شده (بهینه)</span>
                  ) : (
                    <span>{4 - (n1 / 2)} از 4 مورد انتخاب شده</span>
                  )}
                </div>
              </div>
              <div className="ml-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                  n1 === 0 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                    : n1 <= 2 
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                }`}>
                  {n1}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="n₂ - خاموش‌کن دستی">
        <Select value={n2} onChange={setN2}>
          <option value={0}>خاموش‌کن‌ها کافی و درست</option>
          <option value={2}>خاموش‌کن ناکافی</option>
          <option value={4}>بدون خاموش‌کن</option>
        </Select>
      </Section>

      <Section title="n₃ - جعبه/هوزریل آتش‌نشانی">
        <Select value={n3} onChange={setN3}>
          <option value={0}>پوشش کامل جعبه آتش‌نشانی</option>
          <option value={2}>تعداد یا مکان ناکافی</option>
          <option value={4}>فاقد جعبه آتش‌نشانی</option>
        </Select>
      </Section>

      <Section title="n₄ - زمان رسیدن آتش‌نشانی">
        <Select value={n4} onChange={setN4}>
          <option value={0}>کمتر از 10 دقیقه</option>
          <option value={2}>10 تا 15 دقیقه</option>
          <option value={5}>15 تا 30 دقیقه</option>
          <option value={10}>بیش از 30 دقیقه</option>
        </Select>
      </Section>

      <Section title="n₅ - آموزش ساکنان">
        <Select value={n5} onChange={setN5}>
          <option value={0}>همه آموزش دیده‌اند</option>
          <option value={2}>برخی آموزش دیده‌اند</option>
          <option value={4}>هیچ آموزش ندیده‌اند</option>
        </Select>
      </Section>

      <button
        className="btn btn-primary"
        onClick={() => handleCalculateN.mutate()}
      >
        محاسبه ضریب N
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          {assessment?.assessment.factor_N
            ? assessment?.assessment.factor_N.toFixed(3)
            : "-"}
        </div>
      </div>
    </div>
  );
}
