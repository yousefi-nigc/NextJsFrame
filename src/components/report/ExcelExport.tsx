"use client";

import * as XLSX from "xlsx";
import { AssessmentGetApiResponse } from "@/lib/APIResponseInterfaces";
import { toast } from "sonner";

interface ExcelExportProps {
  assessment: AssessmentGetApiResponse | null;
  projectName: string;
  projectAddress: string;
  expertName: string;
  floorName: string;
}

export function exportToExcel({
  assessment,
  projectName,
  projectAddress,
  expertName,
  floorName,
}: ExcelExportProps) {
  if (!assessment?.assessment) {
    toast.error("ارزیابی برای این طبقه یافت نشد");
    return;
  }

  const ass = assessment.assessment;

  // Create workbook
  const wb = XLSX.utils.book_new();

  // ========== Sheet 1: Summary Report ==========
  const summaryData: any[][] = [];

  // Title row (merged)
  summaryData.push(["گزارش نهایی ارزیابی ریسک آتش"]);
  summaryData.push([]);
  summaryData.push([]);

  // Project Information Section
  summaryData.push(["اطلاعات پروژه"]);
  summaryData.push(["نام پروژه:", projectName || "-"]);
  summaryData.push(["آدرس:", projectAddress || "-"]);
  summaryData.push(["نام کارشناس:", expertName || "-"]);
  summaryData.push(["طبقه/بخش:", floorName || "-"]);
  summaryData.push(["تاریخ گزارش:", new Date().toLocaleDateString("fa-IR")]);
  summaryData.push([]);

  // Summary Results Section
  summaryData.push(["خلاصه نتایج"]);
  summaryData.push(["پارامتر", "ساختمان", "افراد", "فعالیت‌ها"]);
  summaryData.push([
    "ریسک بالقوه (P)",
    ass.risk_P !== null ? ass.risk_P.toFixed(3) : "-",
    ass.risk_P1 !== null ? ass.risk_P1.toFixed(3) : "-",
    ass.risk_P2 !== null ? ass.risk_P2.toFixed(3) : "-",
  ]);
  summaryData.push([
    "سطح پذیرش (A)",
    ass.level_A !== null ? ass.level_A.toFixed(3) : "-",
    ass.level_A1 !== null ? ass.level_A1.toFixed(3) : "-",
    ass.level_A2 !== null ? ass.level_A2.toFixed(3) : "-",
  ]);
  summaryData.push([
    "سطح حفاظت (D)",
    ass.level_D !== null ? ass.level_D.toFixed(3) : "-",
    ass.level_D1 !== null ? ass.level_D1.toFixed(3) : "-",
    ass.level_D2 !== null ? ass.level_D2.toFixed(3) : "-",
  ]);
  summaryData.push([
    "ریسک نهایی (R)",
    ass.final_R !== null ? ass.final_R.toFixed(3) : "-",
    ass.final_R1 !== null ? ass.final_R1.toFixed(3) : "-",
    ass.final_R2 !== null ? ass.final_R2.toFixed(3) : "-",
  ]);
  summaryData.push([]);

  // Recommendations Section
  summaryData.push(["توصیه‌های بهبود"]);
  const recommendations: string[] = [];
  if (ass.final_R !== null && ass.final_R > 1.6) {
    recommendations.push("⚠️ ریسک ساختمان در سطح غیرقابل قبول است. اقدامات فوری مورد نیاز است.");
  }
  if (ass.final_R1 !== null && ass.final_R1 > 1.6) {
    recommendations.push("⚠️ ریسک افراد در سطح غیرقابل قبول است. بهبود سیستم‌های تخلیه ضروری است.");
  }
  if (ass.final_R2 !== null && ass.final_R2 > 1.6) {
    recommendations.push("⚠️ ریسک فعالیت‌ها در سطح غیرقابل قبول است. بازنگری در فرآیندها لازم است.");
  }
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
    summaryData.push(["✅ وضعیت کلی قابل قبول است. به نگهداری و بازرسی‌های دوره‌ای ادامه دهید."]);
  } else {
    recommendations.forEach((rec) => {
      summaryData.push([rec]);
    });
  }

  // Create summary worksheet
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);

  // Apply styling to summary sheet
  const range = XLSX.utils.decode_range(wsSummary["!ref"] || "A1");

  // Set column widths
  wsSummary["!cols"] = [
    { wch: 35 }, // Column A
    { wch: 18 }, // Column B
    { wch: 18 }, // Column C
    { wch: 18 }, // Column D
  ];

  // Style cells
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ c: C, r: R });
      if (!wsSummary[cellAddress]) continue;

      const cell = wsSummary[cellAddress];

      // Title row (row 0)
      if (R === 0) {
        cell.s = {
          font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "4472C4" } },
          alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
        };
      }
      // Section headers
      else if (
        (R === 3 && C === 0) || // "اطلاعات پروژه"
        (R === 10 && C === 0) || // "خلاصه نتایج"
        (R === 17 && C === 0) || // "توصیه‌های بهبود"
        (R === 11 && C === 0) // Table header row
      ) {
        cell.s = {
          font: { bold: true, sz: 12, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "5B9BD5" } },
          alignment: { horizontal: "right", vertical: "center", readingOrder: 2 },
        };
      }
      // Table header row
      else if (R === 11) {
        cell.s = {
          font: { bold: true, sz: 11 },
          fill: { fgColor: { rgb: "D9E1F2" } },
          alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
      // Final Risk row (highlighted)
      else if (R === 15 && C === 0) {
        cell.s = {
          font: { bold: true, sz: 11, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "70AD47" } },
          alignment: { horizontal: "right", vertical: "center", readingOrder: 2 },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
      // Final Risk values
      else if (R === 15 && C > 0) {
        cell.s = {
          font: { bold: true, sz: 11, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "70AD47" } },
          alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
      // Data rows in table
      else if (R >= 12 && R <= 15 && C >= 0 && C <= 3) {
        cell.s = {
          alignment: { horizontal: C === 0 ? "right" : "center", vertical: "center", readingOrder: 2 },
          border: {
            top: { style: "thin", color: { rgb: "CCCCCC" } },
            bottom: { style: "thin", color: { rgb: "CCCCCC" } },
            left: { style: "thin", color: { rgb: "CCCCCC" } },
            right: { style: "thin", color: { rgb: "CCCCCC" } },
          },
        };
      }
      // Project info labels
      else if (R >= 4 && R <= 9 && C === 0) {
        cell.s = {
          font: { bold: true },
          alignment: { horizontal: "right", vertical: "center", readingOrder: 2 },
        };
      }
      // Default RTL for all other cells
      else {
        if (!cell.s) {
          cell.s = {
            alignment: { horizontal: "right", vertical: "center", readingOrder: 2 },
          };
        } else {
          cell.s.alignment = { ...cell.s.alignment, readingOrder: 2 };
        }
      }
    }
  }

  // Merge title cell
  wsSummary["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];

  // Add summary sheet
  XLSX.utils.book_append_sheet(wb, wsSummary, "خلاصه گزارش");

  // ========== Sheet 2: Detailed Factors ==========
  const factorsData: any[][] = [];

  factorsData.push(["ضرایب محاسبه شده"]);
  factorsData.push([]);
  factorsData.push(["گروه", "ضریب", "مقدار", "توضیحات"]);

  // Potential Risk Factors
  factorsData.push(["ریسک بالقوه", "", "", ""]);
  factorsData.push(["", "q (بار آتش)", ass.factor_q !== null ? ass.factor_q.toFixed(3) : "-", "بار آتش بر حسب MJ/m²"]);
  factorsData.push(["", "i (گسترش)", ass.factor_i !== null ? ass.factor_i.toFixed(3) : "-", "ضریب گسترش آتش"]);
  factorsData.push(["", "g (جرم)", ass.factor_g !== null ? ass.factor_g.toFixed(3) : "-", "ضریب جرم"]);
  factorsData.push(["", "e (طبقه)", ass.factor_e !== null ? ass.factor_e.toFixed(3) : "-", "ضریب طبقه"]);
  factorsData.push(["", "v (تهویه)", ass.factor_v !== null ? ass.factor_v.toFixed(3) : "-", "ضریب تهویه"]);
  factorsData.push(["", "z (دسترسی)", ass.factor_z !== null ? ass.factor_z.toFixed(3) : "-", "ضریب دسترسی"]);
  factorsData.push([]);

  // Acceptable Risk Factors
  factorsData.push(["سطح پذیرش", "", "", ""]);
  factorsData.push(["", "a (فعالیت)", ass.factor_a !== null ? ass.factor_a.toFixed(3) : "-", "ضریب فعالیت"]);
  factorsData.push(["", "t (زمان تخلیه)", ass.factor_t !== null ? ass.factor_t.toFixed(3) : "-", "زمان تخلیه (دقیقه)"]);
  factorsData.push(["", "c (ارزش)", ass.factor_c !== null ? ass.factor_c.toFixed(3) : "-", "ضریب ارزش"]);
  factorsData.push(["", "r (محیط)", ass.factor_r !== null ? ass.factor_r.toFixed(3) : "-", "ضریب محیط"]);
  factorsData.push(["", "d (وابستگی)", ass.factor_d !== null ? ass.factor_d.toFixed(3) : "-", "ضریب وابستگی"]);
  factorsData.push([]);

  // Protection Level Factors
  factorsData.push(["سطح حفاظت", "", "", ""]);
  factorsData.push(["", "W (آب)", ass.factor_W !== null ? ass.factor_W.toFixed(3) : "-", "ضریب سیستم آب"]);
  factorsData.push(["", "N (تشخیص)", ass.factor_N !== null ? ass.factor_N.toFixed(3) : "-", "ضریب تشخیص"]);
  factorsData.push(["", "S (اسپرینکلر)", ass.factor_S !== null ? ass.factor_S.toFixed(3) : "-", "ضریب اسپرینکلر"]);
  factorsData.push(["", "F (مقاومت)", ass.factor_F !== null ? ass.factor_F.toFixed(3) : "-", "ضریب مقاومت آتش"]);
  factorsData.push(["", "U (تخلیه)", ass.factor_U !== null ? ass.factor_U.toFixed(3) : "-", "ضریب تخلیه"]);
  factorsData.push(["", "Y (سایر)", ass.factor_Y !== null ? ass.factor_Y.toFixed(3) : "-", "سایر عوامل حفاظتی"]);

  // Create factors worksheet
  const wsFactors = XLSX.utils.aoa_to_sheet(factorsData);

  // Set column widths for factors sheet
  wsFactors["!cols"] = [
    { wch: 20 }, // Column A - Group
    { wch: 25 }, // Column B - Factor
    { wch: 15 }, // Column C - Value
    { wch: 30 }, // Column D - Description
  ];

  // Style factors sheet
  const factorsRange = XLSX.utils.decode_range(wsFactors["!ref"] || "A1");
  for (let R = factorsRange.s.r; R <= factorsRange.e.r; ++R) {
    for (let C = factorsRange.s.c; C <= factorsRange.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ c: C, r: R });
      if (!wsFactors[cellAddress]) continue;

      const cell = wsFactors[cellAddress];

      // Title row
      if (R === 0) {
        cell.s = {
          font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "4472C4" } },
          alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
        };
      }
      // Header row
      else if (R === 2) {
        cell.s = {
          font: { bold: true, sz: 11 },
          fill: { fgColor: { rgb: "D9E1F2" } },
          alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
      // Group headers (Potential Risk, Acceptable Risk, Protection Level)
      else if (
        (R === 3 && C === 0) ||
        (R === 10 && C === 0) ||
        (R === 17 && C === 0)
      ) {
        cell.s = {
          font: { bold: true, sz: 12, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "5B9BD5" } },
          alignment: { horizontal: "right", vertical: "center", readingOrder: 2 },
        };
      }
      // Data rows
      else if (R > 2) {
        cell.s = {
          alignment: {
            horizontal: C === 0 || C === 1 ? "right" : C === 2 ? "center" : "right",
            vertical: "center",
            readingOrder: 2,
          },
          border: {
            top: { style: "thin", color: { rgb: "CCCCCC" } },
            bottom: { style: "thin", color: { rgb: "CCCCCC" } },
            left: { style: "thin", color: { rgb: "CCCCCC" } },
            right: { style: "thin", color: { rgb: "CCCCCC" } },
          },
        };
        // Factor name column (bold)
        if (C === 1 && R > 2) {
          cell.s = { ...cell.s, font: { bold: true } };
        }
      }
      // Default RTL for all other cells
      else {
        if (!cell.s) {
          cell.s = {
            alignment: { horizontal: "right", vertical: "center", readingOrder: 2 },
          };
        } else {
          cell.s.alignment = { ...cell.s.alignment, readingOrder: 2 };
        }
      }
    }
  }

  // Merge title cell
  wsFactors["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];

  // Add factors sheet
  XLSX.utils.book_append_sheet(wb, wsFactors, "ضرایب تفصیلی");

  // Generate filename
  const fileName = `گزارش_ریسک_${projectName || "پروژه"}_${floorName || "طبقه"}_${new Date().toISOString().split("T")[0]}.xlsx`;

  // Write file
  XLSX.writeFile(wb, fileName);

  toast.success("گزارش Excel با موفقیت دانلود شد");
}

