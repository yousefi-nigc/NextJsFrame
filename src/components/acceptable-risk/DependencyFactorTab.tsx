"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AssessmentGetApiResponse, AssessmentUpdateApiResponse } from "@/lib/APIResponseInterfaces";

function calculateD(
  dependencyType: string,
  dependencyManual: number | null
): number | null {
  if (dependencyType && dependencyType !== "manual") {
    const d = parseFloat(dependencyType);
    if (!isNaN(d)) return d;
  }

  if (dependencyType === "manual" && dependencyManual !== null) {
    if (dependencyManual < 0 || dependencyManual > 1) return null;
    return dependencyManual;
  }

  return null;
}

export default function DependencyFactorTab({ projectId, floorId }: { projectId: string, floorId: string }) {
  const queryClient = useQueryClient();
  const [dependencyType, setDependencyType] = useState<string>("");
  const [dependencyManual, setDependencyManual] = useState<string>("");

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

      setDependencyType(response.assessment.dependencyType ?? "");
      setDependencyManual(response.assessment.dependencyManual?.toString() ?? "");

      return response;
    },
  });

  const handleCalculate = useMutation({
    mutationFn: async () => {
      const d = calculateD(
        dependencyType,
        dependencyManual ? parseFloat(dependencyManual) : null
      );

      if (d === null) {
        throw new Error("لطفاً مقدار d را وارد کنید");
      }

      const res = await fetch(`/api/user/projects/${projectId}/floors/${floorId}/assessment`, {
        method: "PUT",
        body: JSON.stringify({
          dependencyType: dependencyType !== "manual" ? dependencyType : undefined,
          dependencyManual: dependencyType === "manual" ? d : undefined,
        }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("d محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "خطا در محاسبه d");
      console.log(error);
    },
  });

  return (
    <div id="d-dependency" className="tab-content">
      <div className="help-card">
        <div className="text-info mb-2 text-base font-semibold">
          ضریب وابستگی اقتصادی (نسخه 2015 FRAME)
        </div>
        <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
          این ضریب حساسیت فعالیت‌ها به توقف ناشی از آتش‌سوزی را بر اساس نسبت
          ارزش افزوده به گردش مالی برآورد می‌کند.
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">انتخاب گروه فعالیت</label>
        <select
          value={dependencyType}
          onChange={(e) => {
            setDependencyType(e.target.value);
            if (e.target.value !== "manual") {
              setDependencyManual("");
            }
          }}
        >
          <option value="">-- انتخاب کنید --</option>
          <option value="0.8">
            صنایع فناوری پیشرفته (مثلاً هوافضا) - 0.7 تا 0.9 (میانگین 0.8)
          </option>
          <option value="0.6">
            صنایع دقیق (مثلاً الکترونیک) - 0.45 تا 0.7 (میانگین 0.6)
          </option>
          <option value="0.35">
            صنایع تولیدی - 0.25 تا 0.45 (میانگین 0.35)
          </option>
          <option value="0.1">
            شرکت‌های تجاری و انبارها - 0.05 تا 0.15 (میانگین 0.1)
          </option>
          <option value="0.8">خدمات اداری - 0.8</option>
          <option value="0.3">میانگین کسب‌وکارها - 0.3</option>
          <option value="manual">-- ورود دستی --</option>
        </select>
      </div>

      <div className="input-group">
        <label className="input-label">ورود دستی مقدار d (0 تا 1)</label>
        <input
          type="number"
          value={dependencyManual}
          onChange={(e) => setDependencyManual(e.target.value)}
          min="0"
          max="1"
          step="0.01"
          placeholder="مثلاً 0.45"
          disabled={dependencyType !== "manual"}
          className={dependencyType !== "manual" ? "opacity-50" : ""}
        />
      </div>

      <button className="btn btn-primary" onClick={() => handleCalculate.mutate()}>
        محاسبه ضریب d
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary">
        <div className="result-value">{assessment?.assessment.factor_d ? assessment?.assessment.factor_d.toFixed(3) : "-"}</div>
      </div>
    </div>
  );
}

