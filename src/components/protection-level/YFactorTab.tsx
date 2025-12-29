"use client";

import { useState, useMemo, useEffect } from "react";
import { BlockMath } from "react-katex";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AssessmentGetApiResponse,
  AssessmentUpdateApiResponse,
} from "@/lib/APIResponseInterfaces";

export default function YFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  // Use subcompartment from U section (shared field)
  const [subcompartment, setSubcompartment] = useState(0);
  const [partialDetection, setPartialDetection] = useState(false);
  const [partialSprinkler, setPartialSprinkler] = useState(false);
  const [otherAutoExtinguish, setOtherAutoExtinguish] = useState(false);
  const [financialDataBackup, setFinancialDataBackup] = useState(false);
  const [sparePartsAccess, setSparePartsAccess] = useState(false);
  const [selfRepairCapability, setSelfRepairCapability] = useState(false);
  const [relocationAgreements, setRelocationAgreements] = useState(false);
  const [immediateActivityTransfer, setImmediateActivityTransfer] = useState(false);
  const [multipleProduction, setMultipleProduction] = useState(false);

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

      // Get subcompartment from U section (shared field)
      setSubcompartment(response.assessment.subcompartment ?? 0);
      setPartialDetection(response.assessment.partialDetection ?? false);
      setPartialSprinkler(response.assessment.partialSprinkler ?? false);
      setOtherAutoExtinguish(response.assessment.otherAutoExtinguish ?? false);
      setFinancialDataBackup(response.assessment.financialDataBackup ?? false);
      setSparePartsAccess(response.assessment.sparePartsAccess ?? false);
      setSelfRepairCapability(
        response.assessment.selfRepairCapability ?? false
      );
      setRelocationAgreements(
        response.assessment.relocationAgreements ?? false
      );
      setImmediateActivityTransfer(
        response.assessment.immediateActivityTransfer ?? false
      );
      setMultipleProduction(response.assessment.multipleProduction ?? false);

      return response;
    },
  });

  // Get S factor values for conditional disabling
  const s3 = assessment?.assessment.sprinklerType ?? 0; // s3 - sprinkler type
  const s6 = assessment?.assessment.s6OtherSuppression ?? 0; // s6 - other suppression systems

  // Conditional disabling logic
  const partialSprinklerDisabled = useMemo(() => {
    return s3 !== undefined && s3 !== 0; // Disable if s3 is selected (not 0)
  }, [s3]);

  const otherAutoExtinguishDisabled = useMemo(() => {
    return s6 !== undefined && s6 !== 0; // Disable if s6 is selected (not 0)
  }, [s6]);

  // Auto-uncheck when disabled
  useEffect(() => {
    if (partialSprinklerDisabled) {
      setPartialSprinkler(false);
    }
  }, [partialSprinklerDisabled]);

  useEffect(() => {
    if (otherAutoExtinguishDisabled) {
      setOtherAutoExtinguish(false);
    }
  }, [otherAutoExtinguishDisabled]);

  const handleCalculateY = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          body: JSON.stringify({
            subcompartment, // Shared with U section
            partialDetection,
            partialSprinkler: partialSprinklerDisabled ? false : partialSprinkler,
            otherAutoExtinguish: otherAutoExtinguishDisabled ? false : otherAutoExtinguish,
            financialDataBackup,
            sparePartsAccess,
            selfRepairCapability,
            relocationAgreements,
            immediateActivityTransfer,
            multipleProduction,
          }),
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Y محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
    },
    onError: (error) => {
      toast.error("خطا در محاسبه Y");
      console.log(error);
    },
  });

  return (
    <div id="y-salvage" className="tab-content">
      <div className="formula-card">
        <div className="formula-title">فرمول محاسبه Y</div>
        <div className="formula-content" dir="ltr">
          <BlockMath
            math={`Y = 1.05^{y} \\quad \\text{که} \\quad y = \\sum y_i`}
          />
        </div>
      </div>

      <div className="help-card">
        <div className="mb-2 font-semibold text-primary">توضیح فاکتور Y</div>
        <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
          فاکتور Y میزان آمادگی برای نجات و حفظ فعالیت‌ها را پس از وقوع حریق
          نشان می‌دهد. این شامل حفاظت از داده‌ها، تامین قطعات یدکی، امکان تعمیر
          سریع، انتقال فعالیت‌ها به مکان دیگر و ظرفیت تولید چندمحلی است. هر چه
          این اقدامات بیشتر رعایت شود، مقدار Y بیشتر شده و حفاظت بهبود می‌یابد.
        </div>
      </div>

      <div className="section-divider mb-4">حفاظت فیزیکی مناطق حساس</div>

      <div className="help-card">
        <div className="mb-2 font-semibold text-primary">توجه مهم</div>
        <div className="text-gray-500 leading-relaxed text-sm dark:text-white">
          امتیازات حفاظت موضعی فقط زمانی داده می‌شود که حفاظت کلی از همان نوع در
          کل ساختمان وجود نداشته باشد. برای مثال، اگر کل ساختمان اسپرینکلر دارد،
          امتیاز اسپرینکلر موضعی داده نمی‌شود.
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">تقسیم‌بندی مناطق حساس</label>
        <select
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          value={subcompartment}
          onChange={(e) => setSubcompartment(parseFloat(e.target.value))}
        >
          <option value={0}>بدون بخش‌بندی</option>
          <option value={2}>EI30 – حداکثر 1000 m²</option>
          <option value={4}>EI60 – حداکثر 1000 m²</option>
        </select>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          این فیلد با بخش U مشترک است
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">سیستم‌های حفاظتی موضعی</label>
        <div className="checkbox-group flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={partialDetection}
              onChange={(e) => setPartialDetection(e.target.checked)}
            />
            <span>سیستم اعلام حریق اتوماتیک موضعی</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">(امتیاز: 2)</span>
          </label>

          <label className={`flex items-center gap-2 ${partialSprinklerDisabled ? "opacity-50" : ""}`}>
            <input
              type="checkbox"
              checked={partialSprinkler}
              onChange={(e) => setPartialSprinkler(e.target.checked)}
              disabled={partialSprinklerDisabled}
              className={partialSprinklerDisabled ? "cursor-not-allowed" : ""}
            />
            <span className={partialSprinklerDisabled ? "text-gray-400" : ""}>
              اسپرینکلر موضعی در مناطق حیاتی
            </span>
            {partialSprinklerDisabled && (
              <span className="text-xs text-red-500">(غیرفعال: s₃ انتخاب شده است)</span>
            )}
            {!partialSprinklerDisabled && (
              <span className="text-xs text-gray-500 dark:text-gray-400">(امتیاز: 5)</span>
            )}
          </label>

          <label className={`flex items-center gap-2 ${otherAutoExtinguishDisabled ? "opacity-50" : ""}`}>
            <input
              type="checkbox"
              checked={otherAutoExtinguish}
              onChange={(e) => setOtherAutoExtinguish(e.target.checked)}
              disabled={otherAutoExtinguishDisabled}
              className={otherAutoExtinguishDisabled ? "cursor-not-allowed" : ""}
            />
            <span className={otherAutoExtinguishDisabled ? "text-gray-400" : ""}>
              سایر سیستم‌های اطفای اتوماتیک (گاز، فوم، پودر)
            </span>
            {otherAutoExtinguishDisabled && (
              <span className="text-xs text-red-500">(غیرفعال: s₆ انتخاب شده است)</span>
            )}
            {!otherAutoExtinguishDisabled && (
              <span className="text-xs text-gray-500 dark:text-gray-400">(امتیاز: 4)</span>
            )}
          </label>
        </div>
      </div>

      <div className="section-divider mb-2">برنامه‌ریزی مدیریت بحران</div>

      <div className="input-group">
        <label className="input-label">اقدامات سازمانی</label>
        <div className="checkbox-group flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={financialDataBackup}
              onChange={(e) => setFinancialDataBackup(e.target.checked)}
            />
            <span>پشتیبان‌گیری از داده‌های مالی و اقتصادی در مکان امن</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">(امتیاز: 2)</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={sparePartsAccess}
              onChange={(e) => setSparePartsAccess(e.target.checked)}
            />
            <span>دسترسی آسان به قطعات یدکی و تجهیزات جایگزین</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">(امتیاز: 4)</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selfRepairCapability}
              onChange={(e) => setSelfRepairCapability(e.target.checked)}
            />
            <span>توانایی تعمیر با حداقل کمک خارجی</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">(امتیاز: 2)</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={relocationAgreements}
              onChange={(e) => setRelocationAgreements(e.target.checked)}
            />
            <span>قرارداد جابجایی موقت فعالیت‌ها</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">(امتیاز: 3)</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={immediateActivityTransfer}
              onChange={(e) => setImmediateActivityTransfer(e.target.checked)}
            />
            <span>امکان انتقال فوری فعالیت‌ها</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">(امتیاز: 4)</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={multipleProduction}
              onChange={(e) => setMultipleProduction(e.target.checked)}
            />
            <span>ظرفیت تولید در بیش از یک مکان</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">(امتیاز: 4)</span>
          </label>
        </div>
      </div>

      <button
        className="btn btn-primary mt-4"
        onClick={() => handleCalculateY.mutate()}
      >
        محاسبه ضریب Y
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          {assessment?.assessment.factor_Y
            ? assessment?.assessment.factor_Y.toFixed(3)
            : "-"}
        </div>
      </div>

      <div className="summary-table mt-8">
        <h4>خلاصه امتیازات بر اساس FRAME 2015</h4>

        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300 dark:border-gray-600 mt-4">
          <table className="w-full text-sm text-right">
            <thead className="bg-gray-100 dark:bg-[#ffffff11] font-semibold">
              <tr>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                  عامل
                </th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                  امتیاز (y<sub>i</sub>)
                </th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                  شرط
                </th>
              </tr>
            </thead>

            <tbody className="p-3 border-b border-gray-300 dark:border-gray-700">
              <tr>
                <td className="p-3">تقسیم‌بندی EI30</td>
                <td className="p-3">2</td>
                <td className="p-3">زون‌های کمتر از 1000m²</td>
              </tr>

              <tr>
                <td className="p-3">تقسیم‌بندی EI60</td>
                <td className="p-3">4</td>
                <td className="p-3">زون‌های کمتر از 1000m²</td>
              </tr>

              <tr>
                <td className="p-3">اعلام حریق موضعی</td>
                <td className="p-3">2</td>
                <td className="p-3">در مناطق حیاتی</td>
              </tr>

              <tr>
                <td className="p-3">اسپرینکلر موضعی</td>
                <td className="p-3">5</td>
                <td className="p-3">در مناطق حیاتی (فقط اگر s₃ انتخاب نشده باشد)</td>
              </tr>

              <tr>
                <td className="p-3">سایر سیستم‌های اطفا</td>
                <td className="p-3">4</td>
                <td className="p-3">گاز، فوم یا پودر (فقط اگر s₆ انتخاب نشده باشد)</td>
              </tr>

              <tr className="bg-gray-50 dark:dark:bg-[#ffffff11] font-bold">
                <td className="p-3 text-center" colSpan={3}>
                  برنامه‌ریزی بحران
                </td>
              </tr>

              <tr>
                <td className="p-3">پشتیبان داده‌ها</td>
                <td className="p-3">2</td>
                <td className="p-3">در مکان امن</td>
              </tr>

              <tr>
                <td className="p-3">قطعات یدکی</td>
                <td className="p-3">4</td>
                <td className="p-3">دسترسی آسان</td>
              </tr>

              <tr>
                <td className="p-3">توانایی تعمیر</td>
                <td className="p-3">2</td>
                <td className="p-3">با حداقل کمک</td>
              </tr>

              <tr>
                <td className="p-3">توافقات جابجایی</td>
                <td className="p-3">3</td>
                <td className="p-3">مکان جایگزین</td>
              </tr>

              <tr>
                <td className="p-3">انتقال فوری فعالیت‌ها</td>
                <td className="p-3">4</td>
                <td className="p-3">امکان انتقال فوری</td>
              </tr>

              <tr>
                <td className="p-3">تولید چندگانه</td>
                <td className="p-3">4</td>
                <td className="p-3">چند مرکز تولید</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
