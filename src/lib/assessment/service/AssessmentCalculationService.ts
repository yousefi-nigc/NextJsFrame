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
 * Calculate factor t (Evacuation Time)
 * Formula: t = [p * ((b + l) + (X/x) + (1.25*H+) + (2*H-)) * (x*(b+l))] / [800 * K * ((1.4*x*(b+l)) - (0.44*X))]
 * Returns time in minutes
 */
function calculateT(
  length: number | undefined,
  width: number | undefined,
  area: number | undefined,
  occupantCount: number | undefined,
  occupantFactor: number | undefined,
  exitWidthTotal: number | undefined,
  mobilityFactor: number | undefined,
  heightAbove: number | undefined,
  depthBelow: number | undefined,
  exitCountToOpenSpace: number | undefined
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
    //  return { value: null, error: "تعداد افراد (X) صفر است یا وارد نشده" };
  }

  // Calculate K (total exit width)
  let K = exitWidthTotal || 0;
  if (!K || K <= 0) {
    return null;
    // return { value: null, error: "عرض کل خروج‌ها نامعتبر است" };
  }
  if (K < 0.6) {
    return null;
    // return { value: null, warning: "عرض کل خروج‌ها کمتر از حداقل 0.6 متر است", intermediate: { X, K, x: K / 0.6 } };
  }

  // Calculate x (exit units)
  const x = K / 0.6;

  const p = mobilityFactor || 1;
  const Hplus = heightAbove || 0;
  const Hminus = depthBelow || 0;

  if (b <= 0 || l <= 0) {
    return null;
    //   return { value: null, error: "طول یا عرض بخش صفر است" };
  }

  // FRAME 2015 formula (matching old script.js exactly)
  const numerator =
    p * ((b + l) + (X / x) + (1.25 * Hplus) + (2 * Hminus)) * (x * (b + l));
  const denominator = 800 * K * ((1.4 * x * (b + l)) - (0.44 * X));

  if (denominator <= 0) {
    return null;
    // return { value: null, error: "مخرج فرمول منفی یا صفر است - بررسی کنید" };
  }

  const tHours = numerator / denominator;
  const tValue = tHours * 60; // Convert to minutes (matching old script.js line 1023)

  // Note: exitCountToOpenSpace is stored but not used in calculation
  // (old script.js has 'external-exits' in tInputs but doesn't use it in calculateT)

  return tValue;
  //     return {
  //     value: tValue,
  //     intermediate: { X, K, x },
  //   };
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
 * Calculate factor W (Water Resources Factor)
 * Formula: W = 0.95^w, where w = w1 + w2 + w3 + w4
 */
function calculateW(
  qi: number | undefined,
  qm: number | undefined,
  waterStorageType: string | undefined,
  waterCapacity: number | undefined,
  distributionNetwork: string | undefined,
  hydrantCount25: number | undefined,
  hydrantCount3: number | undefined,
  hydrantCount4: number | undefined,
  length: number | undefined,
  width: number | undefined
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

  // w2 - Capacity
  if (qi !== undefined && qm !== undefined && waterCapacity !== undefined) {
    const requiredWater = (qi + qm) / 4; // m³
    const ratio = waterCapacity / requiredWater;

    if (ratio >= 1) w += 0;
    else if (ratio >= 0.9) w += 1;
    else if (ratio >= 0.8) w += 2;
    else if (ratio >= 0.7) w += 3;
    else w += 4;
  }

  // w3 - Distribution network
  if (distributionNetwork === "adequate") {
    w += 0;
  } else if (distributionNetwork === "limited") {
    w += 2;
  } else if (distributionNetwork === "none") {
    w += 6;
  }
  // If not specified, default to 0 (adequate)

  // w4 - Hydrants (only calculate if length and width are available)
  if (length !== undefined && width !== undefined && length > 0 && width > 0) {
    const perimeter = 2 * (length + width);
    const hydr25 = hydrantCount25 || 0;
    const hydr3 = hydrantCount3 || 0;
    const hydr4 = hydrantCount4 || 0;

    const totalHydr25Eq = hydr25 + hydr3 * 2 + hydr4 * 3;
    const requiredHydrants = Math.ceil(perimeter / 50);

    if (requiredHydrants > 0) {
      if (totalHydr25Eq >= requiredHydrants) w += 0;
      else if (totalHydr25Eq >= requiredHydrants * 0.75) w += 1;
      else if (totalHydr25Eq >= requiredHydrants * 0.5) w += 2;
      else w += 3;
    } else {
      // Small perimeter → no hydrants needed
      w += 0;
    }
  }
  // If length/width are not available, w4 is skipped (w += 0 implicitly)

  return Math.pow(0.95, w);
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
 * Formula: S = 1.05^s, where s = s1 + s2 + s3 + s4 + s5
 */
function calculateS(
  detectionType: number | undefined,
  waterSupplyType: number | undefined,
  sprinklerType: number | undefined,
  fireStationType: number | undefined,
  industrialBrigade: number | undefined
): number | null {
  if (detectionType === undefined && waterSupplyType === undefined && sprinklerType === undefined && fireStationType === undefined && industrialBrigade === undefined) {
    return null;
  }

  const s1 = detectionType ?? 0;
  const s2 = waterSupplyType ?? 0;
  const s3 = sprinklerType ?? 0;
  const s4 = fireStationType ?? 0;
  const s5 = industrialBrigade ?? 0;

  const s = s1 + s2 + s3 + s4 + s5;
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
 * Formula: U = 1.05^u, where u = subcompartment + stairways + horizontalExit + sprinklers
 * Matching old script.js exactly (lines 1902-1925)
 */
function calculateU(
  subcompartment: number | undefined,
  stairways: number | undefined,
  horizontalExit: number | undefined,
  sprinklers: number | undefined
): number | null {
  // Matching old script.js: if all undefined, return null (no calculation)
  if (subcompartment === undefined && stairways === undefined && horizontalExit === undefined && sprinklers === undefined) {
    return null;
  }

  // جمع امتیازها بر اساس انتخاب کاربر (matching old script.js)
  // parseFloat(...) || 0 for each value
  let u = 0;
  u += subcompartment ?? 0;
  u += stairways ?? 0;
  u += horizontalExit ?? 0;
  u += sprinklers ?? 0;

  // فرمول نهایی U (matching old script.js)
  const U = Math.pow(1.05, u);
  
  return U;
}

/**
 * Calculate factor Y (Property Rescue Factor)
 * Formula: Y = 1.05^y, where y is sum of boolean flags
 */
function calculateY(
  subCompartmentEI30: boolean | undefined,
  subCompartmentEI60: boolean | undefined,
  partialDetection: boolean | undefined,
  partialSprinkler: boolean | undefined,
  otherAutoExtinguish: boolean | undefined,
  financialDataBackup: boolean | undefined,
  sparePartsAccess: boolean | undefined,
  selfRepairCapability: boolean | undefined,
  relocationAgreements: boolean | undefined,
  multipleProduction: boolean | undefined
): number | null {
  if (subCompartmentEI30 === undefined && subCompartmentEI60 === undefined && partialDetection === undefined &&
    partialSprinkler === undefined && otherAutoExtinguish === undefined && financialDataBackup === undefined &&
    sparePartsAccess === undefined && selfRepairCapability === undefined && relocationAgreements === undefined &&
    multipleProduction === undefined) {
    return null;
  }

  let y = 0;

  // Physical protection
  if (subCompartmentEI30) y += 2;
  if (subCompartmentEI60) y += 4;
  if (partialDetection) y += 3;
  if (partialSprinkler) y += 5;
  if (otherAutoExtinguish) y += 4;

  // Crisis planning
  if (financialDataBackup) y += 2;
  if (sparePartsAccess) y += 4;
  if (selfRepairCapability) y += 2;
  if (relocationAgreements) y += 3;
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
  if (inputs.mainActivity !== undefined && inputs.secondaryActivity !== undefined && inputs.heatTransferType !== undefined && inputs.generatorLocation !== undefined && inputs.energySource !== undefined && inputs.electricalSystem !== undefined && inputs.flammableLiquids !== undefined && inputs.combustibleDust !== undefined) {
    factor_a = calculateA(inputs.mainActivity, inputs.secondaryActivity, inputs.heatTransferType, inputs.generatorLocation, inputs.energySource, inputs.electricalSystem, inputs.flammableLiquids, inputs.combustibleDust);
  }
  // Calculate T - matching old script logic
  // K can come from exitWidthTotal (manual) or calculated from exitWidths (comma-separated)
  // Optional with defaults: mobilityFactor (p, defaults to 1), heightAbove (H+, defaults to 0), depthBelow (H-, defaults to 0)
  // Optional but needed for calculation: length/width (b/l) OR area, occupantCount (X) OR occupantFactor
  // The function itself will return null if required values (b, l, X, K) are missing or invalid
  
  // Calculate K from exitWidths if exitWidthTotal is not provided
  let calculatedK: number | undefined = inputs.exitWidthTotal;
  if (!calculatedK && inputs.exitWidths) {
    // Matching old script.js: filter widths >= 0.6 (minimum exit width)
    const exitWidthsArray = inputs.exitWidths
      .split(",")
      .map((w) => parseFloat(w.trim()))
      .filter((w) => !isNaN(w) && w >= 0.6);
    calculatedK = exitWidthsArray.reduce((sum, w) => sum + w, 0);
  }
  
  if (calculatedK !== undefined && calculatedK > 0) {
    factor_t = calculateT(
      inputs.length,
      inputs.width,
      inputs.area,
      inputs.occupantCount,
      inputs.occupantFactor,
      calculatedK,
      inputs.mobilityFactor,
      inputs.heightAbove,
      inputs.depthBelow,
      inputs.exitCountToOpenSpace
    );
  }
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
  // W can be calculated with just w1, w2, w3 (w4 requires length/width which may not be available yet)
  if (inputs.waterStorageType) {
    factor_W = calculateW(inputs.qi, inputs.qm, inputs.waterStorageType, inputs.waterCapacity, inputs.distributionNetwork, inputs.hydrantCount25, inputs.hydrantCount3, inputs.hydrantCount4, inputs.length, inputs.width);
  }
  if (inputs.detectionType !== undefined || inputs.waterSupplyType !== undefined || inputs.sprinklerType !== undefined || inputs.fireStationType !== undefined || inputs.industrialBrigade !== undefined) {
    factor_S = calculateS(inputs.detectionType, inputs.waterSupplyType, inputs.sprinklerType, inputs.fireStationType, inputs.industrialBrigade);
  }
  if (inputs.structureResist && factor_S !== null) {
    factor_F = calculateF(inputs.structureResist, inputs.facadeResist, inputs.roofResist, inputs.wallResist, factor_S, inputs.hasManyWindows, inputs.noInternalSeparation, inputs.combustibleInsulation);
  }
  if (inputs.n1 !== undefined || inputs.n2 !== undefined || inputs.n3 !== undefined || inputs.n4 !== undefined || inputs.n5 !== undefined) {
    factor_N = calculateN(inputs.n1, inputs.n2, inputs.n3, inputs.n4, inputs.n5);
  }
  if (inputs.subcompartment !== undefined || inputs.stairways !== undefined || inputs.horizontalExit !== undefined || inputs.sprinklers !== undefined) {
    factor_U = calculateU(inputs.subcompartment, inputs.stairways, inputs.horizontalExit, inputs.sprinklers);
  }
  if (inputs.subCompartmentEI30 !== undefined || inputs.subCompartmentEI60 !== undefined || inputs.partialDetection !== undefined || inputs.partialSprinkler !== undefined || inputs.otherAutoExtinguish !== undefined || inputs.financialDataBackup !== undefined || inputs.sparePartsAccess !== undefined || inputs.selfRepairCapability !== undefined || inputs.relocationAgreements !== undefined || inputs.multipleProduction !== undefined) {
    factor_Y = calculateY(inputs.subCompartmentEI30, inputs.subCompartmentEI60, inputs.partialDetection, inputs.partialSprinkler, inputs.otherAutoExtinguish, inputs.financialDataBackup, inputs.sparePartsAccess, inputs.selfRepairCapability, inputs.relocationAgreements, inputs.multipleProduction);
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
