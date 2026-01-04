import { calculateA } from "@/utils/calculations";
import { AssessmentCalculationResult, CreateAssessmentValidationSchema } from "../model/Assessment";

/**
 * Assessment Calculation Service
 * All formulas extracted from the original JavaScript file (script.js)
 * 100% accurate implementation
 */

// Construction index and exchange rate data (from script.js)
const iranConstructionIndex: Record<number, number> = {
  2000: 100,
  2005: 212.5,
  2010: 540.3,
  2015: 1150.7,
  2020: 4200.5,
  2021: 5980.2,
  2022: 7450.1,
  2023: 8800.0,
  2024: 10150.0,
  2025: 11400.0,
};

const eurExchangeRate: Record<number, number> = {
  2000: 9500,
  2005: 11500,
  2010: 13500,
  2015: 33000,
  2020: 175000,
  2021: 285000,
  2022: 310000,
  2023: 430000,
  2024: 500000,
  2025: 1100000,
};

function forecastValue(
  lastValue: number,
  growthPercent: number,
  yearsAhead: number
): number {
  return lastValue * Math.pow(1 + growthPercent / 100, yearsAhead);
}

function getDataOrForecast(
  dataObj: Record<number, number>,
  year: number,
  growth: number
): { value: number; forecast: boolean } | null {
  const years = Object.keys(dataObj)
    .map((y) => parseInt(y.toString()))
    .sort((a, b) => a - b);
  const lastYear = years[years.length - 1];

  if (dataObj[year]) return { value: dataObj[year], forecast: false };

  if (year > lastYear) {
    const forecastVal = forecastValue(
      dataObj[lastYear],
      growth,
      year - lastYear
    );
    return { value: forecastVal, forecast: true };
  }
  return null;
}

function convertIranValueTo2000EUR(
  valueRial: number,
  year: number
): {
  eur2000: number;
  eurThisYear: number;
  idxInfo: { value: number; forecast: boolean };
  rateInfo: { value: number; forecast: boolean };
} | null {
  const idxInfo = getDataOrForecast(iranConstructionIndex, year, 15);
  const rateInfo = getDataOrForecast(eurExchangeRate, year, 12);
  if (!idxInfo || !rateInfo) return null;

  const eurThisYear = valueRial / rateInfo.value;
  return {
    eur2000: eurThisYear / (idxInfo.value / 100),
    eurThisYear,
    idxInfo,
    rateInfo,
  };
}

/**
 * Calculate factor q (Fire Load Factor)
 * Formula: q = (2/3) * log10(Q) - 0.55, where Q = qi + qm
 * Clamped to [0, 2.3]
 */
function calculateQ(
  qi: number | undefined,
  qm: number | undefined
): number | null {
  if (qi === undefined || qm === undefined) return null;
  if (qi < 0 || qm < 0) return null;

  const Q = qi + qm;
  if (Q <= 0) {
    //    showMessage('error', 'مجموع بار آتش باید بزرگتر از صفر باشد');
    return null;
  }

  let q = (2 / 3) * Math.log10(Q) - 0.55;
  q = Math.max(0.0, Math.min(q, 2.3));

  return q;

  //    // نمایش هشدار اگر Q خیلی زیاد باشد (اثر کم بر q)
  //         let msg = '';
  //         if (Q > 8000) msg = '<span style="color:#d35400">توجه: افزایش Q بالاتر از 8000، تأثیر کم بر q خواهد داشت.</span>';
  //         if (Q <= 30) msg = '<span style="color:#c0392b">بار آتش بسیار پایین و مقدار q تقریباً صفر است. (کم‌ترین ریسک طبق نمودار)</span>';

  //         // نمایش عدد q و راهنمای مقایسه
  //         updateDisplay('q-result', 'q', calculationResults.q, `
  //             <div style="margin:0.7em 0 0 0;font-size:.93em">
  //                 <span style="color:#607d8b;">(Q = ${Q} MJ/m²)</span>
  //             </div>`);

  //         showMessage('success', 'ضریب بار آتش محاسبه شد');
  //         checkAndCalculateP();
}

/**
 * Calculate factor i (Spread Factor)
 * Formula: i = 1 - (T/1000) - (0.1 * log10(m)) + (M/10)
 * Clamped: T [20, 800], m [0.001, 10], M [0, 5], i [0.4, 1.8]
 */
function calculateI(
  tempDestruction: number | undefined,
  avgDimension: number | undefined,
  materialClass: number | undefined
): number | null {
  //  const T = parseFloat(document.getElementById('temp-destruction').value) || 250;
  //   const M = parseFloat(document.getElementById('fire-class').value) || 3;
  if (
    tempDestruction === undefined ||
    avgDimension === undefined ||
    materialClass === undefined
  ) {
    return null;
  }

  //   in js w ehave smth like: if m is invalid or ≤ 0 → try to compute m from a table:

  const T_clamped = Math.max(20, Math.min(tempDestruction, 800));
  const m_clamped = Math.max(0.001, Math.min(avgDimension, 10));
  const M_clamped = Math.max(0, Math.min(materialClass, 5));

  let i = 1 - T_clamped / 1000 - 0.1 * Math.log10(m_clamped) + M_clamped / 10;
  i = Math.max(0.4, Math.min(i, 1.8));

  return i;

  //    calculationResults.i = i;
  //     const HRR = 25 * Math.pow(10, i);
  //     updateDisplay('i-result', 'i', i, `<br><b>HRR:</b> ${HRR.toLocaleString(undefined,{maximumFractionDigits:0})} kW/m²<br>`);
  //     showMessage('success', 'ضریب گسترش (i) و HRR محاسبه شدند');
  //     checkAndCalculateP();
}

/**
 * Calculate factor g (Surface Factor)
 * Formula: g = (b + 5 * ∛(b² * l)) / 200
 * Note: If accessType is "narrow", swap l and b
 */
function calculateG(
  length: number | undefined,
  width: number | undefined,
  area: number | undefined,
  accessType: string | undefined
): number | null {
  let l = length || 0;
  let b = width || 0;

  // Swap if narrow access
  if (accessType === "narrow") {
    const temp = l;
    l = b;
    b = temp;
  }

  // Calculate missing dimension from area if needed
  if (area && area > 0 && (l === 0 || b === 0)) {
    if (l === 0 && b !== 0) l = area / b;
    if (b === 0 && l !== 0) b = area / l;
  }

  if (l <= 0 || b <= 0) return null;

  const innerCalc = b * b * l; // b² * l
  const cubeRoot = Math.cbrt(innerCalc); // ∛(b² * l)
  const g = (b + 5 * cubeRoot) / 200;

  return g;

  //   let html = "";
  // if(g !== null) {
  //     html = `
  //         <span class="result-value">${g.toFixed(2)}</span>
  //         <span class="badge-iClass" style="background:#b3e5fc;color:#0d47a1;">ضریب g</span>
  //         <div style="margin-top:10px">${warning ? "<span class='input-hint' style='display:block'>" + warning + "</span>" : ""}</div>
  //         <div style="color:#888; font-size:0.95em; margin-top:8px;">
  //           مساحت: ${(l*b).toLocaleString()} مترمربع&nbsp;&bull;&nbsp;طول: ${l} متر&nbsp;&nbsp;عرض: ${b} متر
  //         </div>
  //     `;
  // } else {
  //     html = "<span style='color:#c00'>خطای ورودی: لطفاً تمام داده‌ها را وارد کنید.</span>";
  // }
}

/**
 * Calculate factor e (Floor Factor)
 * Formula: e = ((|E| + 3) / (|E| + 2))^(0.7 * |E|)
 * Clamped to [1.0, 3.0]
 */
function calculateE(floorLevel: number | undefined): number | null {
  if (floorLevel === undefined) return null;
  //  if (isNaN(E)) {
  //     showMessage('error', 'شماره طبقه را وارد کنید. می‌توانید اعشاری وارد کنید (مثلاً 1.4)');
  //     return;
  // }

  if (floorLevel < -4 || floorLevel > 150) return null;

  //   if (E < -4 || E > 150) {
  //     showMessage('error', 'عدد طبقه باید بین -4 تا 150 باشد');
  //     return;
  // }

  const absE = Math.abs(floorLevel);
  let e = Math.pow((absE + 3) / (absE + 2), 0.7 * absE);
  e = Math.max(1.0, Math.min(e, 3.0));

  return e;

  //   document.getElementById('e-result').innerHTML =
  //     `<div style="font-size:1.6em;direction:ltr;color:${color};font-weight:bold;">
  //         e = ${e.toFixed(3)}
  //     </div>
  //     <div style="color:${color};margin-top:.5em;">${interp}</div>
  //     <div style="color:#777;font-size:.95em;margin-top:.5em;">
  //         مقدار واردشده: E = ${E} (${(E % 1 !== 0 ? 'اعشاری/گالری یا نیم‌طبقه' : 'شماره‌طبقه معمولی')})
  //     </div>`;

  // showMessage('success', 'ضریب طبقه با دقت اعشاری محاسبه شد');
  // checkAndCalculateP();
}

// export function calculateE(floorLevel: number | undefined): {
//   value: number | null;
//   error?: string;
// } {
//   if (floorLevel === undefined) {
//     return {
//       value: null,
//       error: "شماره طبقه را وارد کنید. می‌توانید اعشاری وارد کنید (مثلاً 1.4)",
//     };
//   }

//   if (floorLevel < -4 || floorLevel > 150) {
//     return {
//       value: null,
//       error: "عدد طبقه باید بین -4 تا 150 باشد",
//     };
//   }

//   const absE = Math.abs(floorLevel);
//   let e = Math.pow((absE + 3) / (absE + 2), 0.7 * absE);
//   e = Math.max(1.0, Math.min(e, 3.0));

//   return { value: e };
// }

/**
 * Calculate factor v (Ventilation Factor)
 * Formula: v = 0.84 + 0.1 * log10(qm) - sqrt(k * sqrt(h))
 */
function calculateV(
  qm: number | undefined,
  ventingRatio_k: number | undefined,
  height: number | undefined
): number | null {
  if (
    qm === undefined ||
    ventingRatio_k === undefined ||
    height === undefined
  ) {
    return null;
  }

  if (qm <= 0) return null;
  if (ventingRatio_k < 0.001 || ventingRatio_k > 1) return null;
  if (height < 2 || height > 15) return null;

  const logQm = Math.log10(qm);
  const sqrtH = Math.sqrt(height);
  const sqrtKSqrtH = Math.sqrt(ventingRatio_k * sqrtH);

  let v = 0.84 + 0.1 * logQm - sqrtKSqrtH;

  return v;
}

// export function calculateV(
//   qm: number | undefined,
//   ventingRatio_k: number | undefined,
//   height: number | undefined
// ): { value: number | null; error?: string } {
//   // ⛔ Missing input or NaN
//   if (
//     qm === undefined ||
//     isNaN(qm) ||
//     ventingRatio_k === undefined ||
//     isNaN(ventingRatio_k) ||
//     height === undefined ||
//     isNaN(height)
//   ) {
//     return {
//       value: null,
//       error: "همه مقادیر مورد نیاز را وارد کنید.",
//     };
//   }

//   // ⛔ Validation rules
//   if (qm <= 0) {
//     return {
//       value: null,
//       error: "بار آتش متحرک باید بزرگتر از صفر باشد",
//     };
//   }

//   if (ventingRatio_k < 0.001 || ventingRatio_k > 1) {
//     return {
//       value: null,
//       error:
//         'نسبت تهویه باید بین 0.001 و 1 باشد. لطفاً ابتدا دکمه "محاسبه خودکار k" را بزنید.',
//     };
//   }

//   if (height < 2 || height > 15) {
//     return {
//       value: null,
//       error: "ارتفاع سقف باید بین 2 تا 15 متر باشد",
//     };
//   }

//   // ✅ Formula
//   const logQm = Math.log10(qm);
//   const sqrtH = Math.sqrt(height);
//   const sqrtKSqrtH = Math.sqrt(ventingRatio_k * sqrtH);

//   let v = 0.84 + 0.1 * logQm - sqrtKSqrtH;

//   // Return value (original logic does not clamp)
//   return { value: v };

//   //    calculationResults.v = vClamped;
//   //  if (v < 0.5) showMessage('warning', 'v کمتر از 0.5 است — تهویه بسیار ضعیف!');
//   // // نمایش نتیجه با جزئیات فنی
//   // updateDisplay( 'v-result',  'v', vClamped,
//   //     `جزئیات: (k=${k.toFixed(3)}، h=${h}، √(k×√h)=${sqrtKSqrtH.toFixed(3)})`
//   // );

//   // showMessage('success', 'ضریب تهویه (v) با موفقیت محاسبه شد');
// }

/**
 * Calculate factor z (Access Factor)
 * Formula: z = 1 + 0.05 * floor((b/(20*Z)) + (H+/25 or H-/3))
 * Clamped to [1, 2]
 */
function calculateZ(
  width: number | undefined,
  accessSides: number | undefined,
  heightAbove: number | undefined,
  depthBelow: number | undefined
): number | null {
  if (width === undefined || accessSides === undefined) return null;
  if (width <= 0) return null;
  if (accessSides < 1 || accessSides > 4) return null;

  let termH = 0;
  if (depthBelow !== undefined && depthBelow > 0) {
    termH = depthBelow / 3;
  } else if (heightAbove !== undefined && heightAbove > 0) {
    termH = heightAbove / 25;
  }

  const inner = width / (20 * accessSides) + termH;
  let z = 1 + 0.05 * Math.floor(inner);
  z = Math.max(1, Math.min(z, 2));

  return z;
}

// export function calculateZ(
//   width: number | undefined,
//   accessSides: number | undefined,
//   heightAbove: number | undefined,
//   depthBelow: number | undefined
// ): { value: number | null; error?: string } {
//   // ⛔ Missing inputs
//   if (width === undefined || accessSides === undefined) {
//     return { value: null, error: "عرض ساختمان و تعداد جبهه دسترسی الزامی است." };
//   }

//   // ⛔ Validation rules
//   if (width <= 0) {
//     return { value: null, error: "عرض ساختمان باید عددی مثبت باشد." };
//   }

//   if (accessSides < 1 || accessSides > 4) {
//     return { value: null, error: "تعداد جبهه دسترسی باید بین 1 تا 4 باشد." };
//   }

//   // ✅ Determine height term
//   let termH = 0;
//   if (depthBelow !== undefined && depthBelow > 0) {
//     termH = depthBelow / 3;
//   } else if (heightAbove !== undefined && heightAbove > 0) {
//     termH = heightAbove / 25;
//   }

//   // ✅ Core formula
//   const inner = width / (20 * accessSides) + termH;
//   let z = 1 + 0.05 * Math.floor(inner);

//   // ✅ Clamp between 1 and 2
//   z = Math.max(1, Math.min(z, 2));

//   return { value: z };
// }

/**
 * Calculate x (exit units) from exit widths in centimeters
 * Formula: x = floor((width_cm - 20) / 60) for each exit, then sum
 * Matching script.js calculateExitUnits() function
 */
function calculateExitUnitsX(
  exitWidths: string | undefined,
  manualX: number | undefined
): number | null {
  // Manual x input takes priority (even if 0, but we'll enforce min 1 for calculation)
  if (manualX !== undefined && manualX !== null && !isNaN(manualX)) {
    // If user explicitly entered 0, we should still use it but enforce minimum 1 for calculation
    // However, if it's a valid number >= 0, use it
    if (manualX >= 0) {
      return Math.max(1, manualX); // Enforce minimum 1 for calculation
    }
  }

  if (!exitWidths || exitWidths.trim() === "") {
    return null;
  }

  // Parse exit widths (in centimeters)
  const widths = exitWidths
    .split(",")
    .map((w) => parseFloat(w.trim()))
    .filter((w) => !isNaN(w) && w > 0);

  if (widths.length === 0) {
    return null;
  }

  // Calculate x for each exit: floor((width_cm - 20) / 60)
  let totalX = 0;
  widths.forEach((width_cm) => {
    const effectiveWidth = width_cm - 20; // Subtract 20cm lost
    const units = effectiveWidth > 0 ? Math.floor(effectiveWidth / 60) : 0;
    totalX += units;
  });

  return Math.max(1, totalX); // Minimum x = 1
}

/**
 * Calculate K (separate paths) from external exits, x, and X
 * Formula: capacity = x * 120, ratio = capacity / X, theoreticalK = min(ratio, 4), K = min(O, floor(theoreticalK))
 * Matching script.js calculateKfromPaths() function
 */
function calculateSeparatePathsK(
  exitCountToOpenSpace: number | undefined, // O
  exitUnitsX: number | undefined, // x
  occupantCount: number | undefined, // X
  manualK: number | undefined
): number | null {
  // Manual K input takes priority
  if (manualK !== undefined && manualK > 0) {
    return Math.max(1, Math.min(Math.floor(manualK), 4));
  }

  const O = exitCountToOpenSpace || 0;
  const x = exitUnitsX || 0;
  const X = occupantCount || 0;

  if (x <= 0 || X <= 0 || O <= 0) {
    return 1; // Default to 1 if values are insufficient
  }

  // Calculate K: capacity = x * 120, ratio = capacity / X, theoreticalK = min(ratio, 4), K = min(O, floor(theoreticalK))
  const totalCapacity = x * 120; // people per minute
  const ratio = totalCapacity / X;
  const theoreticalK = Math.min(ratio, 4);
  const K = Math.floor(Math.min(O, theoreticalK));

  return Math.max(1, Math.min(K, 4)); // Clamp between 1 and 4
}

/**
 * Calculate mobility factor (p) with optional weighted selections and penalties
 * mobilityFactorMulti is a JSON string of objects: { value|p: number, percent: number }
 */
function calculateMobilityWithPenalties(
  mobilityFactor: number | undefined,
  mobilityFactorMulti: string | undefined | null,
  perceptionAwareness: boolean | undefined,
  evacuationPlanClear: boolean | undefined,
  noPanicRisk: boolean | undefined
): number | null {
  let base: number | null = null;

  if (mobilityFactorMulti) {
    try {
      const rows = JSON.parse(mobilityFactorMulti);
      if (Array.isArray(rows) && rows.length > 0) {
        const totalPercent = rows.reduce((sum: number, row: any) => {
          const percent = Number(row?.percent) || 0;
          return sum + percent;
        }, 0);
        const weighted = rows.reduce((sum: number, row: any) => {
          const value = Number(row?.value ?? row?.p ?? 0);
          const percent = Number(row?.percent) || 0;
          return sum + value * percent;
        }, 0);
        if (totalPercent > 0) {
          const avg = weighted / totalPercent;
          if (isFinite(avg)) {
            base = avg;
          }
        }
      }
    } catch (e) {
      console.warn("Failed to parse mobilityFactorMulti", e);
    }
  }

  if (base === null && mobilityFactor !== undefined && mobilityFactor !== null) {
    base = mobilityFactor;
  }

  if (base === null) return null;

  let penalty = 0;
  if (perceptionAwareness === false) penalty += 2;
  if (evacuationPlanClear === false) penalty += 2;
  if (noPanicRisk === false) penalty += 2;

  const finalP = base + penalty;
  return isFinite(finalP) ? Math.max(0, finalP) : null;
}

/**
 * Calculate factor t (Evacuation Time)
 * Updated formula matching script.js line 1252-1261:
 * numerator = p * ((b + l) + (X / x) + 1.25 * Hplus + 2 * Hminus)
 * denominator = 800 * K * (1.4 * x * (b + l) - 0.44 * X)
 * t = (numerator * x * (b + l)) / denominator
 * Returns dimensionless factor t (RSET = t * 720 seconds)
 */
function calculateT(
  length: number | undefined,
  width: number | undefined,
  area: number | undefined,
  occupantCount: number | undefined,
  occupantFactor: number | undefined,
  exitWidths: string | undefined,
  exitWidthTotal: number | undefined,
  exitUnitsX: number | undefined, // Manual x input
  separatePathsK: number | undefined, // Manual K input
  mobilityFactor: number | undefined,
  heightAbove: number | undefined,
  depthBelow: number | undefined,
  exitCountToOpenSpace: number | undefined // O - external exits
): number | null {
  let b = width || 0;
  let l = length || 0;
  let area_calc = area || 0;

  // Calculate area if not provided
  if ((!area_calc || area_calc <= 0) && b > 0 && l > 0) {
    area_calc = b * l;
  }

  // Calculate X (occupant count) if not provided
  let X = occupantCount || 0;
  if (
    (!X || X <= 0) &&
    occupantFactor !== undefined &&
    occupantFactor > 0 &&
    area_calc > 0
  ) {
    X = Math.round(area_calc * occupantFactor);
  }

  if (!X || X <= 0) {
    return null;
  }

  // Calculate x (exit units) - manual input takes priority
  const x = calculateExitUnitsX(exitWidths, exitUnitsX);
  if (!x || x <= 0) {
    console.log("❌ calculateT: x is missing or invalid", { exitWidths, exitUnitsX, calculatedX: x });
    return null;
  }

  // Calculate K (separate paths) - manual input takes priority
  const K = calculateSeparatePathsK(exitCountToOpenSpace, x, X, separatePathsK);
  if (!K || K <= 0) {
    console.log("❌ calculateT: K is missing or invalid", { exitCountToOpenSpace, x, X, separatePathsK, calculatedK: K });
    return null;
  }

  const p = mobilityFactor || 1;
  const Hplus = heightAbove || 0;
  const Hminus = depthBelow || 0;

  if (b <= 0 || l <= 0) {
    console.log("❌ calculateT: length or width is missing", { length: l, width: b });
    return null;
  }
  
  console.log("✅ calculateT inputs:", { b, l, X, x, K, p, Hplus, Hminus });

  // Updated FRAME formula (matching script.js line 1252-1261)
  const numerator = p * ((b + l) + (X / x) + 1.25 * Hplus + 2 * Hminus);
  const denominatorTerm = 1.4 * x * (b + l) - 0.44 * X;
  const denominator = 800 * K * denominatorTerm;

  console.log("🔍 calculateT calculation:", {
    numerator,
    denominatorTerm,
    denominator,
    formula: `t = (${numerator} * ${x} * ${b + l}) / (${denominator})`,
    exitCapacity: x * (b + l),
    requiredCapacity: 0.314 * X,
    check: `1.4 * ${x} * ${(b + l)} = ${(1.4 * x * (b + l)).toFixed(2)} vs 0.44 * ${X} = ${(0.44 * X).toFixed(2)}`
  });

  if (denominator <= 0) {
    const exitCapacity = 1.4 * x * (b + l);
    const requiredCapacity = 0.44 * X;
    console.log("❌ calculateT: denominator is <= 0", {
      denominator,
      denominatorTerm,
      reason: denominatorTerm <= 0 
        ? `ظرفیت خروج ناکافی: 1.4 * x * (b + l) = ${exitCapacity.toFixed(2)} باید بیشتر از 0.44 * X = ${requiredCapacity.toFixed(2)} باشد`
        : "K is zero or negative",
      suggestion: denominatorTerm <= 0
        ? "لطفاً تعداد واحدهای خروج (x) را افزایش دهید یا تعداد افراد (X) را کاهش دهید"
        : "لطفاً تعداد خروجی‌های منتهی به فضای آزاد (O) یا K را بررسی کنید"
    });
    return null;
  }

  // Formula: t = (numerator * x * (b + l)) / denominator
  // t is a dimensionless factor (not in hours or minutes)
  // RSET = t * 720 seconds (as per FRAME formula)
  const t = (numerator * x * (b + l)) / denominator;

  console.log("✅ calculateT result:", { t, RSET_seconds: t * 720 });

  return t;
}

/**
 * Calculate factor c (Value Factor)
 * Formula: c = c1 + c2
 * c2 = 0.25 * log10(eur2000 / 7100000) if eur2000 > 7100000
 */
function calculateC(
  replaceability: number | undefined,
  valueTotal: number | undefined,
  valueYear: number | undefined
): number {
  // Matching old script.js exactly:
  // const c1 = parseFloat(document.getElementById('replaceability').value) || 0;
  // This means: if replaceability is 0, use 0; if undefined/NaN, use 0
  const c1 = (replaceability !== undefined && !isNaN(replaceability)) ? replaceability : 0;
  let c2 = 0;

  // Matching old script.js exactly:
  // const valRial = parseFloat(document.getElementById('current-value-rial').value) || 0;
  // const year = parseInt(document.getElementById('value-year').value);
  // if (valRial && year) { ... }
  // This means: only calculate c2 if valRial > 0 (truthy) AND year is truthy (not 0, not NaN)
  const valRial = (valueTotal !== undefined && !isNaN(valueTotal)) ? valueTotal : 0;
  const year = (valueYear !== undefined && !isNaN(valueYear)) ? valueYear : NaN;

  if (valRial && year) {
    const calcData = convertIranValueTo2000EUR(valRial, year);
    if (calcData && calcData.eur2000 > 7100000) {
      c2 = 0.25 * Math.log10(calcData.eur2000 / 7100000);
    }
  }

  // Matching old script.js: calculationResults.c = c1 + c2;
  return c1 + c2;
}

// export function calculateC(
//   replaceability: number | undefined,
//   valueTotal: number | undefined,
//   valueYear: number | undefined
// ): {
//   value: number | null;
//   error?: string;
//   intermediate?: {
//     c1: number;
//     c2: number;
//     calcData?: ReturnType<typeof convertIranValueTo2000EUR>;
//   };
// } {
//   // ⛔ Missing input
//   if (replaceability === undefined || isNaN(replaceability)) {
//     return { value: null, error: "مقدار قابلیت جایگزینی (replaceability) وارد نشده است." };
//   }

//   if (valueTotal === undefined || isNaN(valueTotal) || valueYear === undefined || isNaN(valueYear)) {
//     return { value: null, error: "ارزش ساختمان و سال وارد نشده است." };
//   }

//   const c1 = replaceability || 0;
//   let c2 = 0;
//   let calcData;

//   if (valueTotal > 0 && valueYear > 0) {
//     calcData = convertIranValueTo2000EUR(valueTotal, valueYear);
//     if (calcData && calcData.eur2000 > 7_100_000) {
//       c2 = 0.25 * Math.log10(calcData.eur2000 / 7_100_000);
//     }
//   }

//   return {
//     value: c1 + c2,
//     intermediate: {
//       c1,
//       c2,
//       calcData,
//     },
//   };
// }

/**
 * Calculate factor r (Environmental Factor)
 * Formula: r = 0.1 * log10(qi + 1) + (M/10)
 * Clamped to [0, 2]
 */
function calculateR(
  qi: number | undefined,
  materialClass: number | undefined
): number | null {
  if (qi === undefined || materialClass === undefined) return null;

  const qi_clamped = Math.max(0, Math.min(qi, 20000));
  const M_clamped = Math.max(0, Math.min(materialClass, 5));

  //   if (qi < 0) {
  //     showMessage("error", "مقدار Qi نمی‌تواند منفی باشد");
  //     return;
  //   }

  let rValue = 0.1 * Math.log10(qi_clamped + 1) + M_clamped / 10;
  rValue = Math.max(0, Math.min(rValue, 2));

  return rValue;
}

/**
 * Calculate factor d (Dependency Factor)
 * Can be from category or manual input
 */
function calculateD(
  dependencyType: string | undefined,
  dependencyManual: number | undefined
): number | null {
  // Matching old script.js exactly:
  // if (categoryValue && categoryValue !== 'manual') {
  //     d = parseFloat(categoryValue);
  // } 
  // else if (categoryValue === 'manual') {
  //     if (manualValue === null || isNaN(manualValue)) return null;
  //     if (manualValue < 0 || manualValue > 1) return null;
  //     d = manualValue;
  // } 
  // else {
  //     return null; // No category selected
  // }

  if (!dependencyType) {
    return null; // No category selected
  }

  if (dependencyType !== "manual") {
    // Predefined category - parse the value
    const d = parseFloat(dependencyType);
    if (isNaN(d)) return null;
    return d;
  }

  // Manual mode - require dependencyManual
  if (dependencyManual === undefined || dependencyManual === null || isNaN(dependencyManual)) {
    return null; // Manual value not provided or invalid
  }

  if (dependencyManual < 0 || dependencyManual > 1) {
    return null; // Out of valid range
  }

  return dependencyManual;

  //   // ✅ Manual value
  //   if (dependencyType === "manual") {
  //     if (dependencyManual === undefined || isNaN(dependencyManual)) {
  //       return { value: null, error: "لطفاً مقدار دستی d را وارد کنید" };
  //     }
  //     if (dependencyManual < 0 || dependencyManual > 1) {
  //       return { value: null, error: "مقدار دستی d باید بین 0 و 1 باشد" };
  //     }
  //     return { value: dependencyManual };
  //   }

  return null;
}

/**
 * Calculate required water capacity: (Qi + Qm) / 4
 */
function calculateRequiredWaterCapacity(
  qi: number | undefined,
  qm: number | undefined
): number | null {
  if (qi === undefined || qi === null || qm === undefined || qm === null) return null;
  if (!isFinite(qi) || !isFinite(qm)) return null;
  const result = (qi + qm) / 4;
  return isFinite(result) ? result : null;
}

/**
 * Calculate W2 penalty based on water capacity ratio
 */
function calculateW2Penalty(
  waterCapacity: number | undefined,
  requiredWaterCapacity: number | undefined
): number {
  if (waterCapacity === undefined || waterCapacity === null || waterCapacity === 0) {
    return 4; // Default penalty if data is missing
  }
  if (requiredWaterCapacity === undefined || requiredWaterCapacity === null || requiredWaterCapacity === 0 || !isFinite(requiredWaterCapacity)) {
    return 4; // Default penalty if data is missing
  }
  
  const ratio = (waterCapacity / requiredWaterCapacity) * 100;
  if (!isFinite(ratio)) return 4;
  
  if (ratio >= 100) return 0;
  if (ratio >= 90) return 1;
  if (ratio >= 80) return 2;
  if (ratio >= 70) return 3;
  return 4;
}

/**
 * Calculate water flow capacity from pipe diameter and ring network
 */
function calculateWaterFlowCapacity(
  pipeDiameter: string | undefined,
  isRingNetwork: boolean | undefined
): number | null {
  if (!pipeDiameter || pipeDiameter === "none" || pipeDiameter === "") return 0;
  
  const diameterValues: Record<string, number> = {
    "DIA80": 34.3,
    "DIA100": 59.2,
    "DIA150": 134.3,
    "DIA200": 232.3,
    "DIA250": 366.8,
    "DIA300": 526.1,
    "DIA350": 676.9,
  };
  
  const baseValue = diameterValues[pipeDiameter] || 0;
  const multiplier = isRingNetwork ? 2 : 1;
  
  return baseValue * multiplier;
}

/**
 * Determine distribution network adequacy based on water flow capacity
 * Note: This logic needs to be confirmed - using a simple threshold for now
 */
function determineDistributionNetworkAdequacy(
  waterFlowCapacity: number | null
): "adequate" | "limited" | "none" {
  if (waterFlowCapacity === null || waterFlowCapacity === 0) return "none";
  // Thresholds need to be confirmed - using placeholder values
  if (waterFlowCapacity >= 200) return "adequate";
  if (waterFlowCapacity >= 50) return "limited";
  return "none";
}

/**
 * Calculate equivalent 2.5" hydrant connections
 */
function calculateEquivalentHydrant25(
  hydrantCount25: number | undefined,
  hydrantCount3: number | undefined,
  hydrantCount4: number | undefined
): number {
  const h25 = hydrantCount25 || 0;
  const h3 = hydrantCount3 || 0;
  const h4 = hydrantCount4 || 0;
  
  return h25 * 1 + h3 * 2 + h4 * 3;
}

/**
 * Calculate average distance between hydrant connections
 */
function calculateAverageHydrantDistance(
  perimeter: number | undefined,
  equivalentHydrant25: number | undefined
): number | null {
  if (perimeter === undefined || perimeter === null || perimeter === 0) {
    return null;
  }
  if (equivalentHydrant25 === undefined || equivalentHydrant25 === null || equivalentHydrant25 === 0) {
    return null;
  }
  if (!isFinite(perimeter) || !isFinite(equivalentHydrant25)) {
    return null;
  }
  const distance = perimeter / equivalentHydrant25;
  return isFinite(distance) ? distance : null;
}

/**
 * Calculate static pressure required: (height + 35) / 10
 * Note: height = H+ (or H-) + ceiling height
 * Uses heightAbove if available, otherwise depthBelow, otherwise 0
 */
function calculateStaticPressureRequired(
  heightAbove: number | undefined,
  depthBelow: number | undefined,
  height: number | undefined
): number | null {
  // Use heightAbove if available, otherwise use depthBelow, otherwise 0
  const hValue = heightAbove !== undefined && heightAbove !== null 
    ? heightAbove 
    : (depthBelow !== undefined && depthBelow !== null ? depthBelow : 0);
  const ceilingHeight = height !== undefined && height !== null ? height : 0;
  const totalHeight = hValue + ceilingHeight;
  
  // Only calculate if we have at least height data
  if (height === undefined && heightAbove === undefined && depthBelow === undefined) return null;
  return (totalHeight + 35) / 10;
}

/**
 * Calculate W4 score based on average hydrant distance
 */
function calculateW4Score(averageDistance: number | undefined | null): number {
  if (averageDistance === undefined || averageDistance === null || !isFinite(averageDistance) || averageDistance <= 0) {
    return 3; // Default penalty if data is missing or invalid
  }
  
  if (averageDistance <= 50) return 0;
  if (averageDistance <= 100) return 1;
  return 3;
}

/**
 * Calculate W5 score based on static pressure
 */
function calculateW5Score(
  staticPressureRequired: number | undefined,
  staticPressureAvailable: number | undefined
): number {
  if (staticPressureRequired === undefined || staticPressureRequired === null || !isFinite(staticPressureRequired)) {
    return 3; // Default penalty if data is missing
  }
  if (staticPressureAvailable === undefined || staticPressureAvailable === null || !isFinite(staticPressureAvailable)) {
    return 3; // Default penalty if data is missing
  }
  
  if (staticPressureRequired > staticPressureAvailable) return 3;
  return 0;
}

/**
 * Calculate factor W (Water Resources Factor)
 * Formula: W = 0.95^w, where w = w1 + w2 + w3 + w4 + w5
 */
function calculateW(
  qi: number | undefined,
  qm: number | undefined,
  waterStorageType: string | undefined,
  waterCapacity: number | undefined,
  distributionNetworkAdequacy: string | undefined,
  w4Score: number | undefined,
  w5Score: number | undefined,
  requiredWaterCapacity: number | undefined
): number | null {
  let w = 0;

  // w1 - Storage type
  if (waterStorageType === "auto") {
    w += 0;
  } else if (waterStorageType === "manual") {
    w += 4;
  } else {
    w += 10;
  }

  // w2 - Capacity (use calculated w2Penalty if available, otherwise calculate)
  if (waterCapacity !== undefined && requiredWaterCapacity !== undefined) {
    w += calculateW2Penalty(waterCapacity, requiredWaterCapacity);
  }

  // w3 - Distribution network adequacy
  if (distributionNetworkAdequacy === "adequate") {
    w += 0;
  } else if (distributionNetworkAdequacy === "limited") {
    w += 2;
  } else if (distributionNetworkAdequacy === "none") {
    w += 6;
  }
  // If not specified, default to 0 (adequate)

  // w4 - Hydrants (always calculated, returns default penalty of 3 if data is missing)
  if (w4Score !== undefined) {
    w += w4Score;
  }

  // w5 - Static pressure (always calculated, returns default penalty of 3 if data is missing)
  if (w5Score !== undefined) {
    w += w5Score;
  }

  return Math.pow(0.95, w);
}

/**
 * Calculate n1 from checkboxes
 * Formula: n1 = 2 × (number of unchecked checkboxes)
 * If all 4 checkboxes are checked: n1 = 0
 * Each unchecked checkbox adds 2 to n1
 */
export function calculateN1(
  continuousPresence: boolean | undefined,
  manualWarning: boolean | undefined,
  fireDeptNotification: boolean | undefined,
  residentAlarm: boolean | undefined
): number {
  let uncheckedCount = 0;
  
  if (!continuousPresence) uncheckedCount++;
  if (!manualWarning) uncheckedCount++;
  if (!fireDeptNotification) uncheckedCount++;
  if (!residentAlarm) uncheckedCount++;
  
  return uncheckedCount * 2;
}

/**
 * Calculate factor N (Normal Protection Factor)
 * Formula: N = 0.95^n, where n = n1 + n2 + n3 + n4 + n5
 */
function calculateN(
  n1: number | undefined,
  n2: number | undefined,
  n3: number | undefined,
  n4: number | undefined,
  n5: number | undefined
): number | null {
  if (n1 === undefined && n2 === undefined && n3 === undefined && n4 === undefined && n5 === undefined) {
    return null;
  }

  const n = (n1 ?? 0) + (n2 ?? 0) + (n3 ?? 0) + (n4 ?? 0) + (n5 ?? 0);
  return Math.pow(0.95, n);
}

/**
 * Calculate factor S (Special Protection Factor)
 * Formula: S = 1.05^s, where s = s1 + s1_checkboxes + s2 + s3 + s4 + s5 + s6 + s7 + s8 + s9
 * s1_checkboxes: each checked adds 2
 * s6: dropdown value (0 or 11)
 * s7: checkbox (3 if checked, 0 if not)
 * s8: checkbox (2 if checked, 0 if not)
 * s9: checkbox (2 if checked, 0 if not)
 */
function calculateS(
  detectionType: number | undefined,
  waterSupplyType: number | undefined,
  sprinklerType: number | undefined,
  fireStationType: number | undefined,
  industrialBrigade: number | undefined,
  s1ElectronicSystem: boolean | undefined,
  s1ZoneIdentification: boolean | undefined,
  s6OtherSuppression: number | undefined,
  s7UnlimitedWater: boolean | undefined,
  s8DedicatedWater: boolean | undefined,
  s9WaterControl: boolean | undefined
): number | null {
  if (detectionType === undefined && waterSupplyType === undefined && sprinklerType === undefined && fireStationType === undefined && industrialBrigade === undefined &&
      s1ElectronicSystem === undefined && s1ZoneIdentification === undefined && s6OtherSuppression === undefined &&
      s7UnlimitedWater === undefined && s8DedicatedWater === undefined && s9WaterControl === undefined) {
    return null;
  }

  const s1_base = detectionType ?? 0;
  // Add s1 checkboxes: each checked adds 2
  let s1_checkboxes = 0;
  if (s1ElectronicSystem === true) s1_checkboxes += 2;
  if (s1ZoneIdentification === true) s1_checkboxes += 2;
  const s1 = s1_base + s1_checkboxes;
  
  const s2 = waterSupplyType ?? 0;
  const s3 = sprinklerType ?? 0;
  const s4 = fireStationType ?? 0;
  const s5 = industrialBrigade ?? 0;
  const s6 = s6OtherSuppression ?? 0;
  const s7 = s7UnlimitedWater === true ? 3 : 0;
  const s8 = s8DedicatedWater === true ? 2 : 0;
  const s9 = s9WaterControl === true ? 2 : 0;

  const s = s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + s9;
  return Math.pow(1.05, s);
}

/**
 * Calculate factor F (Fire Resistance Factor)
 * Formula: F = [1 + f/100 - f^2.5/10^6] * [1 - (S-1)/40]
 * where f = (1/2)*fs + (1/4)*ff + (1/8)*fd + (1/8)*fw
 * Matching old script.js exactly (lines 1761-1810)
 */
function calculateF(
  structureResist: number | undefined,
  facadeResist: number | undefined,
  roofResist: number | undefined,
  wallResist: number | undefined,
  factor_S: number | undefined,
  hasManyWindows: boolean | undefined,
  noInternalSeparation: boolean | undefined,
  combustibleInsulation: boolean | undefined
): number | null {
  if (structureResist === undefined) return null;

  // Matching old script.js exactly (lines 1763-1794):
  // دریافت مقادیر مقاومت آتش
  let fs = structureResist || 0;
  let ff = facadeResist || 0;
  let fd = roofResist || 0;
  let fw = wallResist || 0;

  // بررسی شرایط خاص (matching old script.js order - BEFORE clamping)
  // اگر پنجره بیش از 5% باشد
  if (hasManyWindows) ff = 0;
  
  // اگر فضای باز بدون تقسیم‌بندی باشد
  if (noInternalSeparation) fw = 0;
  
  // اگر عایق سوختنی داشته باشد
  if (combustibleInsulation) fd = 0;

  // محدود کردن به 120 دقیقه (matching old script.js - AFTER special conditions)
  fs = Math.min(fs, 120);
  ff = Math.min(ff, 120);
  fd = Math.min(fd, 120);
  fw = Math.min(fw, 120);

  // هیچ بخشی نمی‌تواند از مقاومت سازه بیشتر باشد (matching old script.js)
  ff = Math.min(ff, fs);
  fd = Math.min(fd, fs);
  fw = Math.min(fw, fs);

  // محاسبه میانگین وزنی مقاومت آتش (matching old script.js)
  const f = (1 / 2) * fs + (1 / 4) * ff + (1 / 8) * fd + (1 / 8) * fw;

  // دریافت مقدار S (matching old script.js: parseFloat(...) || 1)
  const S = factor_S || 1;

  // محاسبه F با فرمول کامل (matching old script.js)
  const term1 = 1 + (f / 100) - (Math.pow(f, 2.5) / 1000000);
  const term2 = 1 - ((S - 1) / 40);

  let F = term1 * term2;

  // محدود کردن مقدار نهایی (matching old script.js)
  F = Math.max(0.1, F);

  return F;
}

/**
 * Calculate factor U (Escape and Rescue Factor)
 * Formula: U = 1.05^u, where u = subcompartment + stairways + horizontalExit + sprinklers + s1_total + s6 + s4 + s5 + u1 + u2 + u3 + u4 + u5
 * s1_total = detectionType + (s1ElectronicSystem ? 2 : 0) + (s1ZoneIdentification ? 2 : 0)
 * u1: 2 if checked, 0 if not (disabled when s1 = 0)
 * u2: 2 if checked, 0 if not
 * u3: 6 if checked, 0 if not
 * u4: 4 if checked, 0 if not
 * u5: 3 if checked, 0 if not (disabled when s1 = 0)
 */
function calculateU(
  subcompartment: number | undefined,
  stairways: number | undefined,
  horizontalExit: number | undefined,
  sprinklers: number | undefined,
  // S factor values
  detectionType: number | undefined,
  s1ElectronicSystem: boolean | undefined,
  s1ZoneIdentification: boolean | undefined,
  s6OtherSuppression: number | undefined,
  fireStationType: number | undefined,
  industrialBrigade: number | undefined,
  // U factor checkboxes
  u1PartialDetection: boolean | undefined,
  u2Max300Occupants: boolean | undefined,
  u3VoiceEvacuation: boolean | undefined,
  u4MarkedExits: boolean | undefined,
  u5SmokeEvacuation: boolean | undefined
): number | null {
  // Check if any U factor inputs are provided
  if (subcompartment === undefined && stairways === undefined && horizontalExit === undefined && sprinklers === undefined &&
      u1PartialDetection === undefined && u2Max300Occupants === undefined && u3VoiceEvacuation === undefined &&
      u4MarkedExits === undefined && u5SmokeEvacuation === undefined) {
    return null;
  }

  // جمع امتیازها بر اساس انتخاب کاربر
  let u = 0;
  u += subcompartment ?? 0;
  u += stairways ?? 0;
  u += horizontalExit ?? 0;
  u += sprinklers ?? 0;

  // Add S factor values
  const s1_base = detectionType ?? 0;
  let s1_checkboxes = 0;
  if (s1ElectronicSystem === true) s1_checkboxes += 2;
  if (s1ZoneIdentification === true) s1_checkboxes += 2;
  const s1_total = s1_base + s1_checkboxes;
  u += s1_total;
  u += s6OtherSuppression ?? 0;
  u += fireStationType ?? 0; // s4
  u += industrialBrigade ?? 0; // s5

  // Add U factor checkboxes
  // u1: only active when s1 != 0, value 2 if checked
  if (detectionType !== undefined && detectionType !== 0 && u1PartialDetection === true) {
    u += 2;
  }
  // u2: value 2 if checked
  if (u2Max300Occupants === true) {
    u += 2;
  }
  // u3: value 6 if checked
  if (u3VoiceEvacuation === true) {
    u += 6;
  }
  // u4: value 4 if checked
  if (u4MarkedExits === true) {
    u += 4;
  }
  // u5: only active when s1 != 0, value 3 if checked
  if (detectionType !== undefined && detectionType !== 0 && u5SmokeEvacuation === true) {
    u += 3;
  }

  // فرمول نهایی U
  const U = Math.pow(1.05, u);
  
  return U;
}

/**
 * Calculate factor Y (Property Rescue Factor)
 * Formula: Y = 1.05^y, where y is sum of boolean flags
 */
function calculateY(
  subcompartment: number | undefined, // Shared with U section (0, 2, 4)
  partialDetection: boolean | undefined,
  partialSprinkler: boolean | undefined,
  otherAutoExtinguish: boolean | undefined,
  financialDataBackup: boolean | undefined,
  sparePartsAccess: boolean | undefined,
  selfRepairCapability: boolean | undefined,
  relocationAgreements: boolean | undefined,
  immediateActivityTransfer: boolean | undefined,
  multipleProduction: boolean | undefined,
  // S factor values for conditional logic
  sprinklerType: number | undefined, // s3 - if selected, disable partialSprinkler
  s6OtherSuppression: number | undefined // s6 - if selected, disable otherAutoExtinguish
): number | null {
  if (subcompartment === undefined && partialDetection === undefined &&
    partialSprinkler === undefined && otherAutoExtinguish === undefined && financialDataBackup === undefined &&
    sparePartsAccess === undefined && selfRepairCapability === undefined && relocationAgreements === undefined &&
    immediateActivityTransfer === undefined && multipleProduction === undefined) {
    return null;
  }

  let y = 0;

  // Physical protection - subcompartment (shared with U section)
  // 0 = no compartmentation, 2 = EI30, 4 = EI60
  if (subcompartment !== undefined) {
    y += subcompartment;
  }

  // Local protection systems (only if no overall protection of same type)
  // partialDetection: value changed from 3 to 2
  if (partialDetection) y += 2;
  
  // partialSprinkler: only if s3 (sprinklerType) is not selected
  if (partialSprinkler && (sprinklerType === undefined || sprinklerType === 0)) {
    y += 5;
  }
  
  // otherAutoExtinguish: only if s6 (s6OtherSuppression) is not selected
  if (otherAutoExtinguish && (s6OtherSuppression === undefined || s6OtherSuppression === 0)) {
    y += 4;
  }

  // Crisis planning
  if (financialDataBackup) y += 2;
  if (sparePartsAccess) y += 4;
  if (selfRepairCapability) y += 2;
  if (relocationAgreements) y += 3;
  if (immediateActivityTransfer) y += 4; // New checkbox
  if (multipleProduction) y += 4;

  return Math.pow(1.05, y);
}

/**
 * Calculate factor Fo (Initial Fire Resistance Factor)
 * Formula: Fo = 1 + fs/100 - fs^2.5/10^6
 */
function calculateFo(structureResist: number | undefined): number | null {
  if (structureResist === undefined) return null;

  const fsClamped = Math.max(0, Math.min(structureResist, 120));
  const term1 = fsClamped / 100;
  const term2 = Math.pow(fsClamped, 2.5) / 1_000_000;
  let Fo = 1 + term1 - term2;

  if (!isFinite(Fo)) Fo = 1;
  return Math.max(0.5, Math.min(Fo, 2.0));
}

/**
 * Get risk status string
 */
function getRiskStatus(risk: number | null): string | null {
  if (risk === null) return null;
  if (risk <= 1) return "Acceptable";
  if (risk <= 1.6) return "Needs Improvement";
  return "Unacceptable";
}

/**
 * Main calculation function - calculates all factors and final results
 */
export function calculateAssessment(inputs: CreateAssessmentValidationSchema): AssessmentCalculationResult {

  // Potential Risk Factors
  let factor_q: number | null = null;
  let factor_i: number | null = null;
  let factor_g: number | null = null;
  let factor_e: number | null = null;
  let factor_v: number | null = null;
  let factor_z: number | null = null;

  // Acceptance Factors
  let factor_a: number | null = null;
  let factor_t: number | null = null;
  let factor_c: number | null = null;
  let factor_r: number | null = null;
  let factor_d: number | null = null;

  // Protection Factors
  let factor_W: number | null = null;
  let factor_N: number | null = null;
  let factor_S: number | null = null;
  let factor_F: number | null = null;
  let factor_U: number | null = null;
  let factor_Y: number | null = null;

  // Potential Risks
  let risk_P: number | null = null;
  let risk_P1: number | null = null;
  let risk_P2: number | null = null;

  // Acceptable Levels
  let level_A: number | null = null;
  let level_A1: number | null = null;
  let level_A2: number | null = null;

  // Protection Levels
  let level_D: number | null = null;
  let level_D1: number | null = null;
  let level_D2: number | null = null;

  // Initial Risk
  let factor_Fo: number | null = null;
  let risk_Ro: number | null = null;
  let final_R: number | null = null;
  let final_R1: number | null = null;
  let final_R2: number | null = null;
  let status_R: string | null = null;
  let status_R1: string | null = null;
  let status_R2: string | null = null;

  // Calculate Potential Risk Factors

  if (inputs.qi && inputs.qm) {
    factor_q = calculateQ(inputs.qi, inputs.qm);
  }
  if (inputs.tempDestruction && inputs.avgDimension && inputs.materialClass) {
    factor_i = calculateI(inputs.tempDestruction, inputs.avgDimension, inputs.materialClass);
  }
  if (inputs.length && inputs.width && inputs.area && inputs.accessType) {
    factor_g = calculateG(inputs.length, inputs.width, inputs.area, inputs.accessType);
  }
  if (inputs.floorLevel !== undefined && inputs.floorLevel !== null) {
    factor_e = calculateE(inputs.floorLevel);
  }
  if (inputs.qm && inputs.ventingRatio_k && inputs.height) {
    factor_v = calculateV(inputs.qm, inputs.ventingRatio_k, inputs.height);
  }
  if (inputs.width && inputs.accessSides !== undefined && inputs.accessSides !== null) {
    // Calculate z if we have width and accessSides, heightAbove/depthBelow are optional (only one needed)
    factor_z = calculateZ(inputs.width, inputs.accessSides, inputs.heightAbove, inputs.depthBelow);
  }

  // Calculate Acceptance Factors
  // Always calculate factor_a - if nothing is selected, it will be 0
  // calculateA handles null/undefined values by treating them as 0
  // Note: secondaryActivity (N) is passed but NOT included in the sum per feedback
  factor_a = calculateA(
    inputs.mainActivity ?? null, 
    inputs.secondaryActivity ?? null, // N - kept for storage but NOT included in sum
    inputs.heatTransferType ?? null, 
    inputs.generatorLocation ?? null, 
    inputs.energySource ?? null, 
    inputs.electricalSystem ?? null, 
    inputs.flammableLiquids ?? null, 
    inputs.combustibleDust ?? null,
    inputs.weldingOperations ?? null, // W
    inputs.additionalCarpentryPlastic ?? null, // P
    inputs.specialRisk ?? null // S
  );

  // Determine mobility factor with optional penalties
  const mobilityWithPenalties = calculateMobilityWithPenalties(
    inputs.mobilityFactor,
    inputs.mobilityFactorMulti,
    inputs.perceptionAwareness,
    inputs.evacuationPlanClear,
    inputs.noPanicRisk
  );

  // Calculate T - updated to match script.js
  // Manual x/K inputs take priority over calculated values
  // x is calculated from exit widths in cm: floor((width_cm - 20) / 60)
  // K is calculated from O (external exits), x, X: capacity = x * 120, ratio = capacity / X, K = min(O, floor(min(ratio, 4)))
  // Formula: numerator = p * ((b + l) + (X / x) + 1.25 * Hplus + 2 * Hminus)
  //          denominator = 800 * K * (1.4 * x * (b + l) - 0.44 * X)
  //          t = (numerator * x * (b + l)) / denominator
  
  // Always attempt to calculate T (will return null if required values are missing)
  factor_t = calculateT(
    inputs.length,
    inputs.width,
    inputs.area,
    inputs.occupantCount,
    inputs.occupantFactor,
    inputs.exitWidths, // Exit widths in centimeters
    inputs.exitWidthTotal, // Legacy field, not used in new calculation
    inputs.exitUnitsX, // Manual x input (takes priority)
    inputs.separatePathsK, // Manual K input (takes priority)
    mobilityWithPenalties ?? inputs.mobilityFactor,
    inputs.heightAbove,
    inputs.depthBelow,
    inputs.exitCountToOpenSpace // O - external exits count
  );
  // Calculate C - replaceability is required (can be 0), valueTotal and valueYear are optional (only needed for c2)
  // Matching old script: c1 is always calculated from replaceability, c2 is optional based on value
  if (inputs.replaceability !== undefined) {
    factor_c = calculateC(inputs.replaceability, inputs.valueTotal, inputs.valueYear);
  }
  // Calculate R - qi is required (can be 0), materialClass is required (can be 0 for A1)
  // Matching old script: both qi and M are required, but can be 0
  if (inputs.qi !== undefined && inputs.materialClass !== undefined) {
    factor_r = calculateR(inputs.qi, inputs.materialClass);
  }
  // Calculate D - dependencyType is required, dependencyManual is only needed if dependencyType === "manual"
  // Matching old script: if categoryValue exists, use it; if it's "manual", require manualValue
  if (inputs.dependencyType !== undefined) {
    factor_d = calculateD(inputs.dependencyType, inputs.dependencyManual);
  }

  // Calculate Protection Factors
  // Calculate W-related values first
  const requiredWaterCapacity = calculateRequiredWaterCapacity(inputs.qi, inputs.qm);
  const w2Penalty = calculateW2Penalty(inputs.waterCapacity, requiredWaterCapacity ?? undefined);
  const waterFlowCapacity = calculateWaterFlowCapacity(inputs.pipeDiameter, inputs.isRingNetwork);
  const distributionNetworkAdequacy = inputs.distributionNetwork || 
    (waterFlowCapacity !== null ? determineDistributionNetworkAdequacy(waterFlowCapacity) : "adequate");
  
  // Calculate hydrant-related values
  const buildingPerimeter = inputs.length && inputs.width ? 2 * (inputs.length + inputs.width) : undefined;
  const equivalentHydrant25 = calculateEquivalentHydrant25(inputs.hydrantCount25, inputs.hydrantCount3, inputs.hydrantCount4);
  const averageHydrantDistance = calculateAverageHydrantDistance(buildingPerimeter, equivalentHydrant25);
  // Always calculate w4Score - function handles null/undefined and returns default penalty of 3
  const w4Score = calculateW4Score(averageHydrantDistance ?? undefined);
  
  // Calculate static pressure values
  const staticPressureRequired = calculateStaticPressureRequired(inputs.heightAbove, inputs.depthBelow, inputs.height);
  // Always calculate w5Score - function handles null/undefined and returns default penalty of 3
  const w5Score = calculateW5Score(
    staticPressureRequired ?? undefined,
    inputs.staticPressureAvailable
  );
  
  // Calculate W factor
  if (inputs.waterStorageType) {
    factor_W = calculateW(
      inputs.qi,
      inputs.qm,
      inputs.waterStorageType,
      inputs.waterCapacity,
      distributionNetworkAdequacy,
      w4Score,
      w5Score,
      requiredWaterCapacity ?? undefined
    );
  }
  if (inputs.detectionType !== undefined || inputs.waterSupplyType !== undefined || inputs.sprinklerType !== undefined || inputs.fireStationType !== undefined || inputs.industrialBrigade !== undefined ||
      inputs.s1ElectronicSystem !== undefined || inputs.s1ZoneIdentification !== undefined || inputs.s6OtherSuppression !== undefined ||
      inputs.s7UnlimitedWater !== undefined || inputs.s8DedicatedWater !== undefined || inputs.s9WaterControl !== undefined) {
    factor_S = calculateS(
      inputs.detectionType,
      inputs.waterSupplyType,
      inputs.sprinklerType,
      inputs.fireStationType,
      inputs.industrialBrigade,
      inputs.s1ElectronicSystem,
      inputs.s1ZoneIdentification,
      inputs.s6OtherSuppression,
      inputs.s7UnlimitedWater,
      inputs.s8DedicatedWater,
      inputs.s9WaterControl
    );
  }
  if (inputs.structureResist !== undefined) {
    const sForF = factor_S ?? 1; // اگر S محاسبه نشده باشد، مقدار 1 در نظر بگیر
    factor_F = calculateF(
      inputs.structureResist,
      inputs.facadeResist,
      inputs.roofResist,
      inputs.wallResist,
      sForF,
      inputs.hasManyWindows,
      inputs.noInternalSeparation,
      inputs.combustibleInsulation
    );
  }
  // Calculate n1 from checkboxes if provided, otherwise use manual n1 value
  const calculatedN1 = (inputs.n1ContinuousPresence !== undefined || 
                        inputs.n1ManualWarning !== undefined || 
                        inputs.n1FireDeptNotification !== undefined || 
                        inputs.n1ResidentAlarm !== undefined)
    ? calculateN1(
        inputs.n1ContinuousPresence,
        inputs.n1ManualWarning,
        inputs.n1FireDeptNotification,
        inputs.n1ResidentAlarm
      )
    : inputs.n1;
  
  if (calculatedN1 !== undefined || inputs.n2 !== undefined || inputs.n3 !== undefined || inputs.n4 !== undefined || inputs.n5 !== undefined) {
    factor_N = calculateN(calculatedN1, inputs.n2, inputs.n3, inputs.n4, inputs.n5);
  }
  if (inputs.subcompartment !== undefined || inputs.stairways !== undefined || inputs.horizontalExit !== undefined || inputs.sprinklers !== undefined ||
      inputs.u1PartialDetection !== undefined || inputs.u2Max300Occupants !== undefined || inputs.u3VoiceEvacuation !== undefined ||
      inputs.u4MarkedExits !== undefined || inputs.u5SmokeEvacuation !== undefined ||
      inputs.detectionType !== undefined || inputs.s1ElectronicSystem !== undefined || inputs.s1ZoneIdentification !== undefined ||
      inputs.s6OtherSuppression !== undefined || inputs.fireStationType !== undefined || inputs.industrialBrigade !== undefined) {
    factor_U = calculateU(
      inputs.subcompartment,
      inputs.stairways,
      inputs.horizontalExit,
      inputs.sprinklers,
      // S factor values
      inputs.detectionType,
      inputs.s1ElectronicSystem,
      inputs.s1ZoneIdentification,
      inputs.s6OtherSuppression,
      inputs.fireStationType,
      inputs.industrialBrigade,
      // U factor checkboxes
      inputs.u1PartialDetection,
      inputs.u2Max300Occupants,
      inputs.u3VoiceEvacuation,
      inputs.u4MarkedExits,
      inputs.u5SmokeEvacuation
    );
  }
  if (inputs.subcompartment !== undefined || inputs.partialDetection !== undefined || inputs.partialSprinkler !== undefined || inputs.otherAutoExtinguish !== undefined || inputs.financialDataBackup !== undefined || inputs.sparePartsAccess !== undefined || inputs.selfRepairCapability !== undefined || inputs.relocationAgreements !== undefined || inputs.immediateActivityTransfer !== undefined || inputs.multipleProduction !== undefined) {
    factor_Y = calculateY(
      inputs.subcompartment, // Shared with U section
      inputs.partialDetection,
      inputs.partialSprinkler,
      inputs.otherAutoExtinguish,
      inputs.financialDataBackup,
      inputs.sparePartsAccess,
      inputs.selfRepairCapability,
      inputs.relocationAgreements,
      inputs.immediateActivityTransfer,
      inputs.multipleProduction,
      // S factor values for conditional logic
      inputs.sprinklerType, // s3
      inputs.s6OtherSuppression // s6
    );
  }

  // Calculate Potential Risks (P, P1, P2)
  if (factor_q !== null && factor_i !== null && factor_g !== null && factor_e !== null && factor_v !== null && factor_z !== null) {
    risk_P = factor_q * factor_i * factor_g * factor_e * factor_v * factor_z;
    risk_P1 = factor_q * factor_i * factor_e * factor_v * factor_z;
    risk_P2 = factor_i * factor_g * factor_e * factor_v * factor_z;
  }

  // Calculate Acceptable Levels (A, A1, A2)
  if (factor_a !== null && factor_t !== null && factor_c !== null && factor_r !== null && factor_d !== null) {
    level_A = Math.max(0.1, 1.6 - factor_a - factor_t - factor_c);
    level_A1 = Math.max(0.1, 1.6 - factor_a - factor_t - factor_r);
    level_A2 = Math.max(0.1, 1.6 - factor_a - factor_c - factor_d);
  }

  // Calculate Protection Levels (D, D1, D2)
  if (factor_W !== null && factor_N !== null && factor_S !== null && factor_F !== null) {
    level_D = factor_W * factor_N * factor_S * factor_F;
  }
  if (factor_N !== null && factor_U !== null) {
    level_D1 = factor_N * factor_U;
  }
  if (factor_W !== null && factor_N !== null && factor_S !== null && factor_Y !== null) {
    level_D2 = factor_W * factor_N * factor_S * factor_Y;
  }

  // Calculate Initial Risk (Ro) and Fo
  if (inputs.structureResist) {
    factor_Fo = calculateFo(inputs.structureResist);
  }
  if (risk_P !== null && level_A !== null && factor_Fo !== null) {
    risk_Ro = risk_P / (level_A * factor_Fo);
  }

  // Calculate Final Risks (R, R1, R2)
  if (risk_P !== null && level_A !== null && level_D !== null) {
    final_R = risk_P / (level_A * level_D);
  }
  if (risk_P1 !== null && level_A1 !== null && level_D1 !== null) {
    final_R1 = risk_P1 / (level_A1 * level_D1);
  }
  if (risk_P2 !== null && level_A2 !== null && level_D2 !== null) {
    final_R2 = risk_P2 / (level_A2 * level_D2);
  }

  // Calculate Status
  status_R = getRiskStatus(final_R);
  status_R1 = getRiskStatus(final_R1);
  status_R2 = getRiskStatus(final_R2);

  return {
    factor_q,
    factor_i,
    factor_g,
    factor_e,
    factor_v,
    factor_z,
    factor_a,
    factor_t,
    factor_c,
    factor_r,
    factor_d,
    factor_W,
    factor_N,
    factor_S,
    factor_F,
    factor_U,
    factor_Y,
    risk_P,
    risk_P1,
    risk_P2,
    level_A,
    level_A1,
    level_A2,
    level_D,
    level_D1,
    level_D2,
    factor_Fo,
    risk_Ro,
    final_R,
    final_R1,
    final_R2,
    status_R,
    status_R1,
    status_R2,
  };
}
