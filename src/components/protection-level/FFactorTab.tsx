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

interface FireResistanceTableProps {
  fs: number;
  ff: number;
  fd: number;
  fw: number;
  f: number;
  term1: number;
  term2: number;
  F: number;
}

function FireResistanceTable({
  fs,
  ff,
  fd,
  fw,
  f,
  term1,
  term2,
  F,
}: FireResistanceTableProps) {
  return (
    <div
      dir="rtl"
      className="mt-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 p-6"
    >
      <p className="text-primary mb-4">جزئیات محاسبه:</p>
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-100 dark:dark:bg-[#ffffff11] font-semibold">
            <tr>
              <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                جزء
              </th>
              <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                مقاومت (دقیقه)
              </th>
              <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                ضریب
              </th>
              <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                سهم در میانگین
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="p-3">
                سازه (f<sub>s</sub>)
              </td>
              <td className="p-3">{fs}</td>
              <td className="p-3">1/2</td>
              <td className="p-3">{(0.5 * fs).toFixed(1)}</td>
            </tr>

            <tr>
              <td className="p-3">
                دیوار خارجی (f<sub>f</sub>)
              </td>
              <td className="p-3">{ff}</td>
              <td className="p-3">1/4</td>
              <td className="p-3">{(0.25 * ff).toFixed(1)}</td>
            </tr>

            <tr>
              <td className="p-3">
                سقف/بام (f<sub>d</sub>)
              </td>
              <td className="p-3">{fd}</td>
              <td className="p-3">1/8</td>
              <td className="p-3">{(0.125 * fd).toFixed(1)}</td>
            </tr>

            <tr>
              <td className="p-3">
                دیوار داخلی (f<sub>w</sub>)
              </td>
              <td className="p-3">{fw}</td>
              <td className="p-3">1/8</td>
              <td className="p-3">{(0.125 * fw).toFixed(1)}</td>
            </tr>

            <tr className=" font-bold">
              <td className="p-3" colSpan={3}>
                میانگین وزنی (f)
              </td>
              <td className="p-3">{f.toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 mt-6 rounded-lg border border-blue-200 dark:border-blue-600 text-sm leading-7">
        <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
          مراحل محاسبه F:
        </h5>

        <p>
          1. محاسبه بخش اول:
          <span className="font-mono mx-2">
            [1 + f/100 - f<sup>2.5</sup>/10<sup>6</sup>]
          </span>
          = <span className="font-bold">{term1.toFixed(4)}</span>
        </p>

        <p>
          2. محاسبه بخش دوم:
          <span className="font-mono mx-2">[1 - (S-1)/40]</span>={" "}
          <span className="font-bold">{term2.toFixed(4)}</span>
        </p>

        <p>
          3. ضریب نهایی: F ={" "}
          <span className="font-mono mx-2">
            {term1.toFixed(4)} × {term2.toFixed(4)}
          </span>
          ={" "}
          <span className="font-bold text-blue-700 dark:text-blue-300">
            {F.toFixed(4)}
          </span>
        </p>
      </div>

      {F < 1 && (
        <p className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700 rounded-md text-sm">
          ⚠️ توجه: F &lt; 1 نشان‌دهنده مقاومت آتش ناکافی است!
        </p>
      )}
    </div>
  );
}

export default function FFactorTab({
  projectId,
  floorId,
}: {
  projectId: string;
  floorId: string;
}) {
  const queryClient = useQueryClient();
  const [showFTable, setShowFTable] = useState(false);
  const [fs, setFs] = useState(60);
  const [ff, setFf] = useState(0);
  const [fd, setFd] = useState(0);
  const [fw, setFw] = useState(0);
  const [hasManyWindows, setHasManyWindows] = useState(false);
  const [noInternalSeparation, setNoInternalSeparation] = useState(false);
  const [combustibleInsulation, setCombustibleInsulation] = useState(false);

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

      setFs(response.assessment.structureResist ?? 60);
      setFf(response.assessment.facadeResist ?? 0);
      setFd(response.assessment.roofResist ?? 0);
      setFw(response.assessment.wallResist ?? 0);
      setHasManyWindows(response.assessment.hasManyWindows ?? false);
      setNoInternalSeparation(
        response.assessment.noInternalSeparation ?? false
      );
      setCombustibleInsulation(
        response.assessment.combustibleInsulation ?? false
      );

      return response;
    },
  });

  const handleCalculateF = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${floorId}/assessment`,
        {
          method: "PUT",
          body: JSON.stringify({
            structureResist: fs,
            facadeResist: ff,
            roofResist: fd,
            wallResist: fw,
            hasManyWindows,
            noInternalSeparation,
            combustibleInsulation,
          }),
        }
      );
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("F محاسبه شد");
      queryClient.invalidateQueries({ queryKey: ["assessment", floorId] });
      setShowFTable(true);
    },
    onError: (error) => {
      toast.error("خطا در محاسبه F");
      console.log(error);
    },
  });

  // Calculate values for display table
  const effectiveFf = hasManyWindows ? 0 : ff;
  const effectiveFd = combustibleInsulation ? 0 : fd;
  const effectiveFw = noInternalSeparation ? 0 : fw;
  const clampedFs = Math.min(fs, 120);
  const clampedFf = Math.min(effectiveFf, 120);
  const clampedFd = Math.min(effectiveFd, 120);
  const clampedFw = Math.min(effectiveFw, 120);
  const calculatedF =
    0.5 * clampedFs + 0.25 * clampedFf + 0.125 * clampedFd + 0.125 * clampedFw;
  const calculatedTerm1 =
    1 + calculatedF / 100 - Math.pow(calculatedF, 2.5) / 1000000;
  const S = assessment?.assessment.factor_S ?? 1;
  const calculatedTerm2 = 1 - (S - 1) / 40;
  const calculatedFValue = calculatedTerm1 * calculatedTerm2;

  return (
    <div id="f-resistance" className="tab-content">
      <div className="formula-card">
        <h3 className="text-primary mb-3 text-lg font-semibold text-center">
          فرمول محاسبه F - ضریب مقاومت آتش{" "}
        </h3>
        <div className="formula-content text-center" dir="ltr">
          <p className="mb-2">محاسبه میانگین مقاومت آتش:</p>

          <BlockMath
            math={`f = \\frac{1}{2}f_s + \\frac{1}{4}f_f + \\frac{1}{8}f_d + \\frac{1}{8}f_w`}
          />

          <p className="my-3">محاسبه ضریب F:</p>

          <BlockMath
            math={`F = \\left[1 + \\frac{f}{100} - \\frac{f^{2.5}}{10^6}\\right] \\times \\left[1 - \\frac{(S-1)}{40}\\right]`}
          />
        </div>
        <ul className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          <li>
            f<sub>s</sub>: مقاومت سازه و عناصر جداکننده (REI)
          </li>
          <li>
            f<sub>f</sub>: مقاومت دیوارهای خارجی (E)
          </li>
          <li>
            f<sub>d</sub>: مقاومت سقف یا بام (RE)
          </li>
          <li>
            f<sub>w</sub>: مقاومت دیوارهای داخلی (EI)
          </li>
          <li>حداکثر مقدار مجاز: 120 دقیقه</li>
        </ul>
      </div>

      <Section title="مقاومت آتش اجزای ساختمان">
        <div>
          <label className="input-label">
            fₛ - مقاومت سازه (ستون‌ها، تیرها، دیوارهای باربر)
          </label>
          <Select value={fs} onChange={setFs}>
            <option value={0}>بدون مقاومت (R0)</option>
            <option value={15}>15 دقیقه (R15) - سازه فولادی بدون پوشش</option>
            <option value={30}>30 دقیقه (R30)</option>
            <option value={60}>60 دقیقه (R60) - بنایی/بتن معمولی</option>
            <option value={90}>90 دقیقه (R90)</option>
            <option value={120}>120 دقیقه (R120) - بتن مسلح ضخیم</option>
            <option value={180}>بیش از 120 دقیقه (محاسبه با 120)</option>
          </Select>
          <div className="input-hint">
            <i className="fas fa-info-circle"></i>
            مقاومت سازه مهم‌ترین عامل است (ضریب 1/2)
          </div>
        </div>

        <div>
          <label className="input-label">
            f<sub>f</sub> - مقاومت دیوارهای خارجی
          </label>
          <Select value={ff} onChange={setFf}>
            <option value={0}> شیشه معمولی یا بدون مقاومت</option>
            <option value={15}>15 دقیقه</option>
            <option value={30}>30 دقیقه</option>
            <option value={60}> 60 دقیقه - آجر یا بتن</option>
            <option value={90}>90 دقیقه</option>
            <option value={120}>120 دقیقه</option>
          </Select>
          <div className="input-hint">
            <i className="fas fa-info-circle"></i>
            درصد پنجره‌ها: بیش از 5% = مقاومت صفر
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hasManyWindows}
            onChange={(e) => setHasManyWindows(e.target.checked)}
          />
          دیوار خارجی دارای بیش از 5% پنجره (مقاومت = 0)
        </label>

        <div>
          <label className="input-label">
            f<sub>d</sub> - مقاومت سقف/بام
          </label>
          <Select value={fd} onChange={setFd}>
            <option value={0}>بدون مقاومت یا عایق سوختنی</option>
            <option value={15}>15 دقیقه</option>
            <option value={30}>30 دقیقه</option>
            <option value={60}>60 دقیقه</option>
            <option value={90}>90 دقیقه</option>
            <option value={120}>120 دقیقه</option>
          </Select>
          <div className="input-hint">
            <i className="fas fa-info-circle"></i>
            عایق سوختنی در زیر سقف = مقاومت صفر
          </div>
        </div>

        <div>
          <label className="input-label">
            f<sub>w</sub> - مقاومت دیوارهای داخلی
          </label>
          <Select value={fw} onChange={setFw}>
            <option value={0}>بدون دیوار جداکننده یا مساحت &gt; 1000 m²</option>
            <option value={30}>30 دقیقه</option>
            <option value={60}>60 دقیقه</option>
            <option value={90}>90 دقیقه</option>
            <option value={120}>120 دقیقه</option>
          </Select>
          <div className="input-hint">
            <i className="fas fa-info-circle"></i>
            فقط برای دیوارهایی که فضا را به بخش‌های کمتر از 1000 m² و حداکثر 25%
            کل تقسیم می‌کنند
          </div>
        </div>
      </Section>

      <Section title="شرایط ویژه">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={noInternalSeparation}
            onChange={(e) => setNoInternalSeparation(e.target.checked)}
          />
          فضای باز بدون تقسیم‌بندی داخلی (انبار بزرگ)
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={combustibleInsulation}
            onChange={(e) => setCombustibleInsulation(e.target.checked)}
          />
          عایق سوختنی در زیر سقف
        </label>

        <div>
          <label className="block mb-1 text-sm">
            S - ضریب حفاظت ویژه (از محاسبه S)
          </label>
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {assessment?.assessment.factor_S
              ? assessment.assessment.factor_S.toFixed(3)
              : "محاسبه نشده"}
          </div>
        </div>
      </Section>

      <button
        onClick={() => handleCalculateF.mutate()}
        className="btn btn-primary"
      >
        محاسبه ضریب F
      </button>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-primary dark:border-primary dark:bg-[#2195f321]">
        <div className="result-value">
          {assessment?.assessment.factor_F
            ? assessment?.assessment.factor_F.toFixed(3)
            : "-"}
        </div>
      </div>

      {showFTable &&
        assessment?.assessment.factor_F !== null &&
        assessment?.assessment.factor_F !== undefined && (
          <FireResistanceTable
            fs={clampedFs}
            ff={clampedFf}
            fd={clampedFd}
            fw={clampedFw}
            f={calculatedF}
            term1={calculatedTerm1}
            term2={calculatedTerm2}
            F={assessment.assessment.factor_F}
          />
        )}
    </div>
  );
}
