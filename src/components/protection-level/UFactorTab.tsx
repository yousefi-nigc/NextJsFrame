"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AssessmentGetApiResponse, AssessmentUpdateApiResponse } from "@/lib/APIResponseInterfaces";

export default function UFactorTab({ projectId, floorId }: { projectId: string, floorId: string }) {
  const queryClient = useQueryClient();
  const [subcompartment, setSubcompartment] = useState(0);
  const [stairways, setStairways] = useState(0);
  const [horizontalExit, setHorizontalExit] = useState(0);
  const [sprinklers, setSprinklers] = useState(0);

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
      setStairways(response.assessment.stairways ?? 0);
      setHorizontalExit(response.assessment.horizontalExit ?? 0);
      setSprinklers(response.assessment.sprinklers ?? 0);

      return response;
    },
  });

  const handleCalculateU = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/user/projects/${projectId}/floors/${floorId}/assessment`, {
        method: "PUT",
        body: JSON.stringify({
          subcompartment,
          stairways,
          horizontalExit,
          sprinklers,
        }),
      });
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

  return (
    <div id="u-escape" className="tab-content">
      <div className="formula-card">
        <h3 className="text-primary mb-3 text-lg font-semibold text-center">
          فرمول محاسبه U
        </h3>
        <div className="formula-content text-center" dir="ltr">
          <BlockMath
            math={`U = 1.05^{u} \\quad \\text{که} \\quad u = \\sum u_i`}
          />
        </div>
      </div>

      <div className="help-card">
        <div className="mb-2 font-semibold text-primary">
          توضیحات کاربردی
        </div>
        <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
          ضریب U بیانگر اثربخشی شرایط فرار و نجات در ساختمان است و از مجموع
          امتیازهای چهار بخش اصلی محاسبه می‌شود:
          <b>
            {" "}
            بخش‌بندی فرعی، نوع پله‌های تخلیه، خروج افقی، حفاظت اسپرینکلر{" "}
          </b>
          . هر گزینه در این بخش‌ها بسته به سطح حفاظت و تسهیل مسیر فرار،
          امتیاز مثبت می‌گیرد. مجموع امتیازها (u) در فرمول
          <code className="mx-1 font-mono">U = 1.05ᵘ</code>
          قرار می‌گیرد؛ هرچه U بزرگ‌تر باشد، شرایط تخلیه مناسب‌تر است.
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
        <b>EI 30</b> یعنی دیوار/جداکننده‌ها ۳۰ دقیقه مقاومت حریق دارند (
        <i>E</i> = یکپارچگی، <i>I</i> = عایق حرارتی).
        <br />
        <b>EI 60</b> یعنی مقاومت حریق این جداکننده‌ها ۶۰ دقیقه است؛ حفاظت
        بیشتر و زمان تخلیه امن‌تر.
      </div>

      <div className="text-primary font-semibold mt-6 mb-2 border-r-4 border-primary pr-2">
        نوع پله‌های تخلیه
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">نوع راه‌پله</label>
        <select
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          value={stairways}
          onChange={(e) => setStairways(parseFloat(e.target.value))}
        >
          <option value={0}>بدون پله یا پله باز داخلی</option>
          <option value={1}>یک پله محصور داخلی</option>
          <option value={2}>چند پله محصور داخلی</option>
          <option value={3}>حداقل یک پله محصور ضد دود</option>
          <option value={4}>چند پله محصور ضد دود</option>
          <option value={6}>پله داخلی + یک پله خارجی</option>
          <option value={8}>پله داخلی + چند پله خارجی</option>
          <option value={2}>پله داخلی + سرسره/نردبان (طبقه 1 و 2)</option>
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

      <button className="btn btn-primary mt-4" onClick={() => handleCalculateU.mutate()}>
        محاسبه ضریب U
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value" style={{ direction: "ltr", textAlign: "center" }}>
          {assessment?.assessment.factor_U !== null && assessment?.assessment.factor_U !== undefined ? (
            <>
              <div style={{ fontSize: "1.2em", fontWeight: "bold", marginBottom: "0.5em" }}>
                U = {assessment.assessment.factor_U.toFixed(3)}
              </div>
              {(() => {
                // Calculate u value for display (matching old script.js)
                const u = (subcompartment ?? 0) + (stairways ?? 0) + (horizontalExit ?? 0) + (sprinklers ?? 0);
                return (
                  <div style={{ fontSize: "0.95em", color: "#2196F3", fontWeight: "bold", lineHeight: "1.8" }}>
                    u = {u.toFixed(1)}
                  </div>
                );
              })()}
            </>
          ) : (
            "-"
          )}
        </div>
      </div>
    </div>
  );
}
