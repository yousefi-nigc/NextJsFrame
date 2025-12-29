"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Floor, Project, AssessmentGetApiResponse } from "@/lib/APIResponseInterfaces";
import { toast } from "sonner";
import { exportToExcel } from "@/components/report/ExcelExport";

export default function ReportSection() {
  const { projectId } = useParams();
  const [selectedFloorId, setSelectedFloorId] = useState<string>("");
  const [projectName, setProjectName] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [expertName, setExpertName] = useState("");
  const [floorName, setFloorName] = useState("");

  // Fetch project data
  const { data: project, isLoading: isProjectLoading } = useQuery<Project>({
    queryKey: ["project", projectId],
    enabled: !!projectId,
    queryFn: async () => {
      const res = await fetch(`/api/user/projects/${projectId}`);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch project");
      return data.project;
    },
  });

  // Fetch all floors for the project
  const { data: floors, isLoading: isFloorsLoading } = useQuery<Floor[]>({
    queryKey: ["floors", projectId],
    enabled: !!projectId,
    queryFn: async () => {
      const res = await fetch(`/api/user/projects/${projectId}/floors`);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch floors");
      return data.floors;
    },
  });

  // Fetch assessment for selected floor
  const { data: assessment, isLoading: isAssessmentLoading } = useQuery<AssessmentGetApiResponse>({
    queryKey: ["assessment", selectedFloorId],
    enabled: !!selectedFloorId,
    queryFn: async () => {
      const res = await fetch(
        `/api/user/projects/${projectId}/floors/${selectedFloorId}/assessment`
      );
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch assessment");
      return data as AssessmentGetApiResponse;
    },
  });

  // Populate form fields when data loads
  useEffect(() => {
    if (project) {
      setProjectName(project.name || "");
      setProjectAddress(project.address || "");
    }
  }, [project]);

  useEffect(() => {
    if (selectedFloorId && floors) {
      const floor = floors.find((f) => f.id === selectedFloorId);
      if (floor) {
        setFloorName(floor.name || "");
      }
    }
  }, [selectedFloorId, floors]);

  // Generate report summary JSX
  const renderReportSummary = () => {
    if (!assessment?.assessment) {
      return <p className="text-gray-500">لطفاً ابتدا محاسبات را تکمیل کنید.</p>;
    }

    const ass = assessment.assessment;
    const hasData =
      ass.final_R !== null ||
      ass.final_R1 !== null ||
      ass.final_R2 !== null ||
      ass.risk_P !== null ||
      ass.level_A !== null ||
      ass.level_D !== null;

    if (!hasData) {
      return <p className="text-gray-500">لطفاً ابتدا محاسبات را تکمیل کنید.</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-primary text-white">
              <th className="border border-gray-300 dark:border-gray-600 p-3 text-right">پارامتر</th>
              <th className="border border-gray-300 dark:border-gray-600 p-3 text-center">ساختمان</th>
              <th className="border border-gray-300 dark:border-gray-600 p-3 text-center">افراد</th>
              <th className="border border-gray-300 dark:border-gray-600 p-3 text-center">فعالیت‌ها</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="border border-gray-300 dark:border-gray-600 p-3 font-semibold">ریسک بالقوه (P)</td>
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">{ass.risk_P !== null ? ass.risk_P.toFixed(3) : "-"}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">{ass.risk_P1 !== null ? ass.risk_P1.toFixed(3) : "-"}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">{ass.risk_P2 !== null ? ass.risk_P2.toFixed(3) : "-"}</td>
            </tr>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="border border-gray-300 dark:border-gray-600 p-3 font-semibold">سطح پذیرش (A)</td>
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">{ass.level_A !== null ? ass.level_A.toFixed(3) : "-"}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">{ass.level_A1 !== null ? ass.level_A1.toFixed(3) : "-"}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">{ass.level_A2 !== null ? ass.level_A2.toFixed(3) : "-"}</td>
            </tr>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="border border-gray-300 dark:border-gray-600 p-3 font-semibold">سطح حفاظت (D)</td>
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">{ass.level_D !== null ? ass.level_D.toFixed(3) : "-"}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">{ass.level_D1 !== null ? ass.level_D1.toFixed(3) : "-"}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">{ass.level_D2 !== null ? ass.level_D2.toFixed(3) : "-"}</td>
            </tr>
            <tr className="bg-blue-50 dark:bg-blue-900/20 font-bold">
              <td className="border border-gray-300 dark:border-gray-600 p-3">ریسک نهایی (R)</td>
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-primary">{ass.final_R !== null ? ass.final_R.toFixed(3) : "-"}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-success">{ass.final_R1 !== null ? ass.final_R1.toFixed(3) : "-"}</td>
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-warning">{ass.final_R2 !== null ? ass.final_R2.toFixed(3) : "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  // Generate recommendations JSX
  const renderRecommendations = () => {
    if (!assessment?.assessment) {
      return null;
    }

    const ass = assessment.assessment;
    const recommendations: string[] = [];

    // Check final risk values
    if (ass.final_R !== null && ass.final_R > 1.6) {
      recommendations.push("⚠️ ریسک ساختمان در سطح غیرقابل قبول است. اقدامات فوری مورد نیاز است.");
    }

    if (ass.final_R1 !== null && ass.final_R1 > 1.6) {
      recommendations.push("⚠️ ریسک افراد در سطح غیرقابل قبول است. بهبود سیستم‌های تخلیه ضروری است.");
    }

    if (ass.final_R2 !== null && ass.final_R2 > 1.6) {
      recommendations.push("⚠️ ریسک فعالیت‌ها در سطح غیرقابل قبول است. بازنگری در فرآیندها لازم است.");
    }

    // Check specific factors
    if (ass.factor_q !== null && ass.factor_q > 1.5) {
      recommendations.push("📌 بار آتش بالاست. کاهش مواد قابل احتراق را در نظر بگیرید.");
    }

    if (ass.factor_t !== null && ass.factor_t > 0.3) {
      recommendations.push("📌 زمان تخلیه طولانی است. افزایش خروجی‌ها یا بهبود مسیرها توصیه می‌شود.");
    }

    if (ass.factor_W !== null && ass.factor_W < 0.8) {
      recommendations.push("📌 سیستم‌های آب نیاز به تقویت دارند.");
    }

    if (ass.factor_v !== null && ass.factor_v < 0.5) {
      recommendations.push("📌 تهویه ضعیف است. بهبود سیستم تهویه و افزایش بازشوها توصیه می‌شود.");
    }

    if (ass.factor_U !== null && ass.factor_U < 0.8) {
      recommendations.push("📌 سیستم تخلیه نیاز به بهبود دارد. افزایش خروجی‌ها یا بهبود علائم توصیه می‌شود.");
    }

    if (recommendations.length === 0) {
      return (
        <p className="text-green-600 dark:text-green-400">
          ✅ وضعیت کلی قابل قبول است. به نگهداری و بازرسی‌های دوره‌ای ادامه دهید.
        </p>
      );
    }

    return (
      <ul className="list-disc list-inside space-y-2">
        {recommendations.map((r, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            {r}
          </li>
        ))}
      </ul>
    );
  };

  // Handle generate report
  const handleGenerateReport = () => {
    if (!selectedFloorId) {
      toast.error("لطفاً یک طبقه انتخاب کنید");
      return;
    }

    if (!assessment?.assessment) {
      toast.error("ارزیابی برای این طبقه یافت نشد");
      return;
    }

    toast.success("گزارش تولید شد");
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle Excel export
  const handleExportExcel = async () => {
    if (!selectedFloorId) {
      toast.error("لطفاً یک طبقه انتخاب کنید");
      return;
    }

    // Fetch all floors with assessments
    const allFloorsWithAssessments: Array<{
      id: string;
      name: string;
      level: number;
      assessment: any;
    }> = [];

    try {
      const floorsRes = await fetch(`/api/user/projects/${projectId}/floors`);
      if (floorsRes.ok) {
        const floorsData = await floorsRes.json();
        const floors = floorsData.floors || [];

        // Fetch assessment for each floor
        for (const floor of floors) {
          try {
            const assessmentRes = await fetch(
              `/api/user/projects/${projectId}/floors/${floor.id}/assessment`
            );
            if (assessmentRes.ok) {
              const assessmentData = await assessmentRes.json();
              allFloorsWithAssessments.push({
                id: floor.id,
                name: floor.name,
                level: floor.level,
                assessment: assessmentData,
              });
            }
          } catch (error) {
            // Skip floors without assessments
          }
        }
      }
    } catch (error) {
      console.error("Error fetching floors:", error);
    }

    await exportToExcel({
      assessment: assessment || null,
      projectName,
      projectAddress,
      expertName,
      floorName,
      projectId: projectId?.toString(),
      allFloorsWithAssessments,
    });
  };

  // Handle PDF export (basic implementation)
  const handleExportPDF = () => {
    toast.info("قابلیت دانلود PDF به زودی اضافه خواهد شد");
    // TODO: Implement PDF export using jsPDF or similar library
  };

  return (
    <section id="report" className="section">
      <div className="card">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="card-title">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-xl">
              📄
            </div>
            گزارش نهایی ارزیابی ریسک
          </h2>
        </div>

        {/* Floor Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            انتخاب طبقه
          </label>
          <select
            value={selectedFloorId}
            onChange={(e) => setSelectedFloorId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            disabled={isFloorsLoading}
          >
            <option value="">-- انتخاب طبقه --</option>
            {floors?.map((floor) => (
              <option key={floor.id} value={floor.id}>
                {floor.name} (سطح {floor.level})
              </option>
            ))}
          </select>
        </div>

        {/* بخش اطلاعات پروژه */}
        <div className="bg-[#f0f7ff] dark:bg-gray-800 p-1 sm:p-5 rounded-lg m-5 border border-[#4C84C6]">
          <h3 className="text-primary-dark mb-4 flex items-center gap-2 font-bold">
            <span className="text-[1.3em]">📋</span>
            اطلاعات پروژه و ذخیره‌سازی
          </h3>

          {/* GRID */}
          <div className="grid gap-4 mb-5 grid-cols-1 md:grid-cols-2">
            {/* نام پروژه */}
            <div className="form-group">
              <label
                htmlFor="project-name"
                className="block mb-1 font-bold text-[#333] dark:text-white"
              >
                نام پروژه: <span className="text-red-500">*</span>
              </label>
              <input
                id="project-name"
                type="text"
                placeholder="مثال: ساختمان اداری شرکت گاز"
                className="w-full px-3 py-2 border border-[#ddd] rounded font-vazir dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                disabled={isProjectLoading}
              />
            </div>

            {/* آدرس */}
            <div className="form-group">
              <label
                htmlFor="project-address"
                className="block mb-1 font-bold text-[#333] dark:text-white"
              >
                آدرس محل:
              </label>
              <input
                id="project-address"
                type="text"
                placeholder="آدرس کامل پروژه"
                className="w-full px-3 py-2 border border-[#ddd] rounded font-vazir dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={projectAddress}
                onChange={(e) => setProjectAddress(e.target.value)}
                disabled={isProjectLoading}
              />
            </div>

            {/* کارشناس */}
            <div className="form-group">
              <label
                htmlFor="expert-name"
                className="block mb-1 font-bold text-[#333] dark:text-white"
              >
                نام کارشناس:
              </label>
              <input
                id="expert-name"
                type="text"
                placeholder="نام و نام خانوادگی کارشناس"
                className="w-full px-3 py-2 border border-[#ddd] rounded font-vazir dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={expertName}
                onChange={(e) => setExpertName(e.target.value)}
              />
            </div>

            {/* طبقه */}
            <div className="form-group">
              <label
                htmlFor="floor-name"
                className="block mb-1 font-bold text-[#333] dark:text-white"
              >
                طبقه/بخش ارزیابی شده:
              </label>
              <input
                id="floor-name"
                type="text"
                placeholder="مثال: طبقه دوم - بخش اداری"
                className="w-full px-3 py-2 border border-[#ddd] rounded font-vazir dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={floorName}
                onChange={(e) => setFloorName(e.target.value)}
                disabled={!selectedFloorId}
              />
            </div>
          </div>

          {/* دکمه ذخیره‌سازی */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="bg-[#107C41] text-white py-2.5 px-5 cursor-pointer font-semibold flex items-center gap-2 rounded-lg text-nowrap hover:bg-[#0d6b35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleExportExcel}
              disabled={!selectedFloorId || isAssessmentLoading || !assessment?.assessment}
            >
              <span>📊</span> دانلود گزارش Excel
            </button>
          </div>
        </div>

        {/* بخش نتایج */}
        <div className="report-section mt-6">
          <h3 className="text-xl font-bold mb-3">خلاصه نتایج</h3>
          <div className="report-content p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            {!selectedFloorId && (
              <p className="text-gray-500">لطفاً یک طبقه انتخاب کنید</p>
            )}
            {selectedFloorId && isAssessmentLoading && (
              <p className="text-gray-500">در حال بارگذاری...</p>
            )}
            {selectedFloorId && !isAssessmentLoading && !assessment && (
              <p className="text-gray-500">ارزیابی برای این طبقه یافت نشد</p>
            )}
            {selectedFloorId && !isAssessmentLoading && assessment && renderReportSummary()}
          </div>
        </div>

        <div className="report-section mt-6">
          <h3 className="text-xl font-bold mb-3">توصیه‌های بهبود</h3>
          <div className="report-content p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            {!selectedFloorId && (
              <p className="text-gray-500">لطفاً یک طبقه انتخاب کنید</p>
            )}
            {selectedFloorId && isAssessmentLoading && (
              <p className="text-gray-500">در حال بارگذاری...</p>
            )}
            {selectedFloorId && !isAssessmentLoading && !assessment && (
              <p className="text-gray-500">ارزیابی برای این طبقه یافت نشد</p>
            )}
            {selectedFloorId && !isAssessmentLoading && assessment && renderRecommendations()}
          </div>
        </div>

        {/* BUTTON GROUP */}
        <div className="text-center mt-8 p-5 flex flex-wrap justify-center gap-3">
          <button
            className="btn bg-primary hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-200 text-white"
            onClick={handleGenerateReport}
            disabled={!selectedFloorId || isAssessmentLoading}
          >
            تولید گزارش
          </button>
          <button
            className="btn bg-secondary text-white hover:bg-secondary-dark transition-colors"
            onClick={handlePrint}
          >
            چاپ گزارش
          </button>
          <button
            className="btn bg-neutral-200 text-black hover:bg-neutral-300 transition-colors dark:bg-gray-600 dark:text-white"
            onClick={handleExportPDF}
          >
            دانلود PDF
          </button>
        </div>
      </div>
    </section>
  );
}
