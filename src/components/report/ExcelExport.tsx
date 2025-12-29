"use client";

import * as XLSX from "xlsx";
import { AssessmentGetApiResponse } from "@/lib/APIResponseInterfaces";
import { toast } from "sonner";

interface FloorWithAssessment {
  id: string;
  name: string;
  level: number;
  assessment: AssessmentGetApiResponse | null;
}

interface ExcelExportProps {
  assessment: AssessmentGetApiResponse | null;
  projectName: string;
  projectAddress: string;
  expertName: string;
  floorName: string;
  projectId?: string;
  allFloorsWithAssessments?: FloorWithAssessment[];
}

export async function exportToExcel({
  assessment,
  projectName,
  projectAddress,
  expertName,
  floorName,
  projectId,
  allFloorsWithAssessments,
}: ExcelExportProps) {
  if (!assessment?.assessment) {
    toast.error("ارزیابی برای این طبقه یافت نشد");
    return;
  }

  const ass = assessment.assessment;

  // Fetch all floors with assessments if not provided
  let floorsWithAssessments: FloorWithAssessment[] = [];
  
  if (allFloorsWithAssessments && allFloorsWithAssessments.length > 0) {
    floorsWithAssessments = allFloorsWithAssessments;
  } else if (projectId) {
    try {
      // Fetch all floors for the project
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
              floorsWithAssessments.push({
                id: floor.id,
                name: floor.name,
                level: floor.level,
                assessment: assessmentData,
              });
            }
          } catch (error) {
            // Skip floors without assessments
            console.log(`No assessment for floor ${floor.id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching floors:", error);
      // Continue with single assessment if fetch fails
      floorsWithAssessments = [{
        id: "current",
        name: floorName,
        level: ass.floorLevel || 0,
        assessment: assessment,
      }];
    }
  } else {
    // Fallback to single assessment
    floorsWithAssessments = [{
      id: "current",
      name: floorName,
      level: ass.floorLevel || 0,
      assessment: assessment,
    }];
  }

  // Filter to only floors with valid assessments
  floorsWithAssessments = floorsWithAssessments.filter(
    (f) => f.assessment?.assessment !== null && f.assessment?.assessment !== undefined
  );

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

  // ========== Sheet 3: Risk Frequency Tables ==========
  const riskFrequencyData: any[][] = [];

  // Helper function to determine floor class from floorLevel
  const getFloorClass = (floorLevel: number | null | undefined): string => {
    if (floorLevel === null || floorLevel === undefined) return "G";
    if (floorLevel <= 0) return "G";
    if (floorLevel === 1) return "1";
    return "2";
  };

  // Helper function to determine protection level category from D value
  // Based on FRAME methodology: categories represent ranges of protection levels
  // The category "1-8" means protection level 1 through 8, etc.
  const getProtectionLevelCategory = (dValue: number | null | undefined): string => {
    if (dValue === null || dValue === undefined || dValue < 0) return "NONE";
    
    // Map D values to protection level categories
    // Categories are based on the protection level (D) value ranges
    // Higher D values indicate better protection
    if (dValue >= 8.0) return "1-8";
    if (dValue >= 7.0) return "1-7";
    if (dValue >= 6.0) return "1-6";
    if (dValue >= 5.0) return "1-5";
    if (dValue >= 4.0) return "1-4";
    if (dValue >= 3.0) return "1-3";
    if (dValue >= 2.0) return "1-2";
    if (dValue >= 1.0) return "1";
    return "NONE";
  };

  // Helper function to calculate reference table value for a given protection level and floor class
  // Reference table shows baseline risk values for different protection levels
  const calculateReferenceValue = (
    protectionCategory: string,
    floorClass: string,
    risk_P: number | null,
    level_A: number | null,
    baseD: number
  ): number => {
    if (risk_P === null || level_A === null || level_A <= 0) return 0;
    
    // Map protection category to D value range
    const categoryToD: { [key: string]: number } = {
      "1-8": 8.0,
      "1-7": 7.0,
      "1-6": 6.0,
      "1-5": 5.0,
      "1-4": 4.0,
      "1-3": 3.0,
      "1-2": 2.0,
      "1": 1.0,
      "NONE": 0.5
    };
    
    const dValue = categoryToD[protectionCategory] || 0.5;
    
    // Calculate R = P / (A * D) for reference
    const referenceR = risk_P / (level_A * dValue);
    
    // Apply floor class multiplier (G has higher risk, upper floors have lower risk)
    const floorMultiplier: { [key: string]: number } = {
      "G": 1.0,
      "1": 0.33, // Approximately 1/3 for first floor
      "2": 0.625 // Approximately 5/8 for second floor
    };
    
    return referenceR * (floorMultiplier[floorClass] || 1.0);
  };

  // Helper function to get risk color category
  const getRiskColorCategory = (risk: number | null | undefined): "green" | "blue" | "red" => {
    if (risk === null || risk === undefined) return "green";
    if (risk < 1.0) return "green";
    if (risk <= 1.6) return "blue";
    return "red";
  };

  // Build tables from actual floor data only

  // Table 1: Baseline/Reference Table (only for floors that exist)
  riskFrequencyData.push([]);
  riskFrequencyData.push(["جدول مرجع"]);
  riskFrequencyData.push([]);
  riskFrequencyData.push(["", "1-8", "1-7", "1-6", "1-5", "1-4", "1-3", "1-2", "1", "NONE", "طبقات"]);
  
  // Get unique floor classes from actual floors
  const actualFloorClasses = new Set<string>();
  floorsWithAssessments.forEach((f) => {
    const fc = getFloorClass(f.level);
    actualFloorClasses.add(fc);
  });
  
  const protectionCategories = ["1-8", "1-7", "1-6", "1-5", "1-4", "1-3", "1-2", "1", "NONE"];
  
  // Calculate reference table only for existing floor classes
  const referenceTable: { [key: string]: { [key: string]: number } } = {};
  
  // Use the first assessment's P and A values for reference calculation
  const firstAss = floorsWithAssessments[0]?.assessment?.assessment;
  
  actualFloorClasses.forEach((fc) => {
    referenceTable[fc] = {};
    if (firstAss && firstAss.risk_P !== null && firstAss.level_A !== null) {
      for (const pc of protectionCategories) {
        referenceTable[fc][pc] = calculateReferenceValue(
          pc,
          fc,
          firstAss.risk_P,
          firstAss.level_A,
          firstAss.level_D || 1.0
        );
      }
    }
  });
  
  // Add reference table rows only for existing floor classes
  Array.from(actualFloorClasses).sort().forEach((fc) => {
    riskFrequencyData.push([
      fc,
      referenceTable[fc]?.["1-8"] ?? 0,
      referenceTable[fc]?.["1-7"] ?? 0,
      referenceTable[fc]?.["1-6"] ?? 0,
      referenceTable[fc]?.["1-5"] ?? 0,
      referenceTable[fc]?.["1-4"] ?? 0,
      referenceTable[fc]?.["1-3"] ?? 0,
      referenceTable[fc]?.["1-2"] ?? 0,
      referenceTable[fc]?.["1"] ?? 0,
      referenceTable[fc]?.["NONE"] ?? 0,
      fc
    ]);
  });

  riskFrequencyData.push([]);
  riskFrequencyData.push([]);

  // Table 2: R1 Frequency (Residents) - Only real data
  riskFrequencyData.push(["فراوانی سطح ریسک R1 (ساکنین) در طبقات"]);
  riskFrequencyData.push([]);
  riskFrequencyData.push(["", "1-8", "1-7", "1-6", "1-5", "1-4", "1-3", "1-2", "1", "NONE", "طبقات"]);
  
  // Initialize R1 table - only for actual floor classes
  const r1Table: { [key: string]: { [key: string]: number | null } } = {};
  actualFloorClasses.forEach((fc) => {
    r1Table[fc] = {};
    protectionCategories.forEach((pc) => {
      r1Table[fc][pc] = null; // null means no data
    });
  });

  // Place actual R1 values from real floors only
  floorsWithAssessments.forEach((floor) => {
    const floorAss = floor.assessment?.assessment;
    if (!floorAss) return;
    
    const fc = getFloorClass(floor.level);
    const pcR1 = getProtectionLevelCategory(floorAss.level_D1);
    const r1Value = floorAss.final_R1;
    
    if (r1Value !== null && r1Value !== undefined && fc && pcR1) {
      if (r1Table[fc] && r1Table[fc][pcR1] !== undefined) {
        r1Table[fc][pcR1] = r1Value;
      }
    }
  });

  // Add R1 rows only for existing floor classes
  Array.from(actualFloorClasses).sort().forEach((fc) => {
    riskFrequencyData.push([
      fc,
      r1Table[fc]?.["1-8"] ?? "",
      r1Table[fc]?.["1-7"] ?? "",
      r1Table[fc]?.["1-6"] ?? "",
      r1Table[fc]?.["1-5"] ?? "",
      r1Table[fc]?.["1-4"] ?? "",
      r1Table[fc]?.["1-3"] ?? "",
      r1Table[fc]?.["1-2"] ?? "",
      r1Table[fc]?.["1"] ?? "",
      r1Table[fc]?.["NONE"] ?? "",
      fc
    ]);
  });

  riskFrequencyData.push([]);
  riskFrequencyData.push([]);

  // Table 3: R2 Frequency (Activities) - Only real data
  riskFrequencyData.push(["فراوانی سطح ریسک R2 (فعالیتها) در طبقات"]);
  riskFrequencyData.push([]);
  riskFrequencyData.push(["", "1-8", "1-7", "1-6", "1-5", "1-4", "1-3", "1-2", "1", "NONE", "طبقات"]);
  
  // Initialize R2 table - only for actual floor classes
  const r2Table: { [key: string]: { [key: string]: number | null } } = {};
  actualFloorClasses.forEach((fc) => {
    r2Table[fc] = {};
    protectionCategories.forEach((pc) => {
      r2Table[fc][pc] = null; // null means no data
    });
  });

  // Place actual R2 values from real floors only
  floorsWithAssessments.forEach((floor) => {
    const floorAss = floor.assessment?.assessment;
    if (!floorAss) return;
    
    const fc = getFloorClass(floor.level);
    const pcR2 = getProtectionLevelCategory(floorAss.level_D2);
    const r2Value = floorAss.final_R2;
    
    if (r2Value !== null && r2Value !== undefined && fc && pcR2) {
      if (r2Table[fc] && r2Table[fc][pcR2] !== undefined) {
        r2Table[fc][pcR2] = r2Value;
      }
    }
  });

  // Add R2 rows only for existing floor classes
  Array.from(actualFloorClasses).sort().forEach((fc) => {
    riskFrequencyData.push([
      fc,
      r2Table[fc]?.["1-8"] ?? "",
      r2Table[fc]?.["1-7"] ?? "",
      r2Table[fc]?.["1-6"] ?? "",
      r2Table[fc]?.["1-5"] ?? "",
      r2Table[fc]?.["1-4"] ?? "",
      r2Table[fc]?.["1-3"] ?? "",
      r2Table[fc]?.["1-2"] ?? "",
      r2Table[fc]?.["1"] ?? "",
      r2Table[fc]?.["NONE"] ?? "",
      fc
    ]);
  });

  // Create risk frequency worksheet
  const wsRiskFrequency = XLSX.utils.aoa_to_sheet(riskFrequencyData);

  // Set column widths
  wsRiskFrequency["!cols"] = [
    { wch: 8 },  // Row labels
    { wch: 10 }, // 1-8
    { wch: 10 }, // 1-7
    { wch: 10 }, // 1-6
    { wch: 10 }, // 1-5
    { wch: 10 }, // 1-4
    { wch: 10 }, // 1-3
    { wch: 10 }, // 1-2
    { wch: 10 }, // 1
    { wch: 10 }, // NONE
    { wch: 10 }, // طبقات
  ];

  // Style risk frequency sheet
  const riskFrequencyRange = XLSX.utils.decode_range(wsRiskFrequency["!ref"] || "A1");
  
  // Calculate table start rows for styling (before the loop)
  const r1TableStartRow = 4 + actualFloorClasses.size + 3; // After table 1 + spacing
  const r2TableStartRow = r1TableStartRow + actualFloorClasses.size + 3; // After table 2 + spacing
  
  // Calculate dynamic title row positions
  const table1TitleRow = 1;
  const table2TitleRow = 4 + actualFloorClasses.size + 3;
  const table3TitleRow = r2TableStartRow;
  
  // Calculate dynamic header row positions
  const table1HeaderRow = 3;
  const table2HeaderRow = table2TitleRow + 2;
  const table3HeaderRow = table3TitleRow + 2;
  
  for (let R = riskFrequencyRange.s.r; R <= riskFrequencyRange.e.r; ++R) {
    for (let C = riskFrequencyRange.s.c; C <= riskFrequencyRange.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ c: C, r: R });
      if (!wsRiskFrequency[cellAddress]) continue;

      const cell = wsRiskFrequency[cellAddress];
      const cellValue = cell.v;

      // Table titles
      if (R === table1TitleRow || R === table2TitleRow || R === table3TitleRow) {
        cell.s = {
          font: { bold: true, sz: 14, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "4472C4" } },
          alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
        };
      }
      // Header rows
      else if (R === table1HeaderRow || R === table2HeaderRow || R === table3HeaderRow) {
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
      // Data rows - Table 1 (all green) - dynamic row count based on actual floors
      else if (R >= 4 && R < 4 + actualFloorClasses.size) {
        const fillColor = "C6EFCE"; // Light green
        cell.s = {
          font: { sz: 10 },
          fill: { fgColor: { rgb: fillColor } },
          alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
      // Data rows - Table 2 (R1) with color coding - dynamic row count
      else if (R >= r1TableStartRow && R < r1TableStartRow + actualFloorClasses.size) {
        let fillColor = "FFFFFF";
        if (typeof cellValue === "number" && cellValue !== null && cellValue !== undefined && !isNaN(cellValue)) {
          if (cellValue < 1.0) {
            fillColor = "C6EFCE"; // Green
          } else if (cellValue <= 1.6) {
            fillColor = "FFC7CE"; // Light red/blue (using light red as blue substitute)
          } else {
            fillColor = "FFC7CE"; // Red
          }
        } else {
          fillColor = "FFFFFF"; // White for empty/no data cells
        }
        cell.s = {
          font: { sz: 10 },
          fill: { fgColor: { rgb: fillColor } },
          alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
      // Data rows - Table 3 (R2) with color coding - dynamic row count
      else if (R >= r2TableStartRow && R < r2TableStartRow + actualFloorClasses.size) {
        let fillColor = "FFFFFF";
        if (typeof cellValue === "number" && cellValue !== null && cellValue !== undefined && !isNaN(cellValue)) {
          if (cellValue < 1.0) {
            fillColor = "C6EFCE"; // Green
          } else if (cellValue <= 1.6) {
            fillColor = "FFC7CE"; // Light red/blue
          } else {
            fillColor = "FFC7CE"; // Red
          }
        } else {
          fillColor = "FFFFFF"; // White for empty/no data cells
        }
        cell.s = {
          font: { sz: 10 },
          fill: { fgColor: { rgb: fillColor } },
          alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
      // Row labels (first column)
      else if (C === 0 && R > 3) {
        cell.s = {
          font: { bold: true, sz: 11 },
          fill: { fgColor: { rgb: "E7E6E6" } },
          alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
      // Last column (طبقات)
      else if (C === 10 && R > 3) {
        cell.s = {
          font: { bold: true, sz: 11 },
          fill: { fgColor: { rgb: "E7E6E6" } },
          alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
      // Default
      else {
        if (!cell.s) {
          cell.s = {
            alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
          };
        }
      }
    }
  }

  // Merge title cells
  wsRiskFrequency["!merges"] = [
    { s: { r: 1, c: 0 }, e: { r: 1, c: 10 } }, // Table 1 title
    { s: { r: 11, c: 0 }, e: { r: 11, c: 10 } }, // Table 2 title
    { s: { r: 20, c: 0 }, e: { r: 20, c: 10 } }, // Table 3 title
  ];

  // Add risk frequency sheet
  XLSX.utils.book_append_sheet(wb, wsRiskFrequency, "فراوانی ریسک");

  // Generate filename
  const fileName = `گزارش_ریسک_${projectName || "پروژه"}_${floorName || "طبقه"}_${new Date().toISOString().split("T")[0]}.xlsx`;

  // Write file
  XLSX.writeFile(wb, fileName);

  toast.success("گزارش Excel با موفقیت دانلود شد");
}

