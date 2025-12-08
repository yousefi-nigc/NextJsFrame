"use client";

import { useState } from "react";
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
  const [s2, setS2] = useState(0);
  const [s3, setS3] = useState(0);
  const [s4, setS4] = useState(8);
  const [s5, setS5] = useState(0);

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
      setS2(response.assessment.waterSupplyType ?? 0);
      setS3(response.assessment.sprinklerType ?? 0);
      setS4(response.assessment.fireStationType ?? 8);
      setS5(response.assessment.industrialBrigade ?? 0);

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
            waterSupplyType: s2,
            sprinklerType: s3,
            fireStationType: s4,
            industrialBrigade: s5,
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
            math={`S = 1.05^{s} \\quad \\text{که} \\quad s = s_1 + s_2 + s_3 + s_4 + s_5`}
          />
        </div>
      </div>

      <Section title="s₁ - سیستم‌های تشخیص خودکار حریق">
        <p className="text-sm">نوع سیستم تشخیص</p>
        <Select value={s1} onChange={setS1}>
          <option value={0}>ندارد</option>
          <option value={4}>
            تشخیص خودکار توسط اسپرینکلر + سوئیچ فشار/جریان
          </option>
          <option value={5}>توسط حسگر حرارتی</option>
          <option value={8}>توسط حسگر دود یا شعله</option>
          <option value={2}>توسط آلارم دود مستقل</option>
        </Select>
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
