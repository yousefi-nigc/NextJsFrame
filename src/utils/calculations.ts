import { CalculationResults } from "@/types";

// Initialize calculation results
export const initialCalculationResults: CalculationResults = {
  q: null,
  i: null,
  g: null,
  e: null,
  v: null,
  z: null,
  a: null,
  t: null,
  c: null,
  r: null,
  d: null,
  W: null,
  N: null,
  S: null,
  F: null,
  U: null,
  Y: null,
  P: null,
  P1: null,
  P2: null,
  A: null,
  A1: null,
  A2: null,
  D: null,
  D1: null,
  D2: null,
  R: null,
  R1: null,
  R2: null,
};

// Calculate q - Fire load factor
export function calculateQ(qi: number, qm: number): number | null {
  if (qi < 0 || qm < 0) return null;

  const Q = qi + qm;
  if (Q <= 0) return null;

  let q = (2 / 3) * Math.log10(Q) - 0.55;
  q = Math.max(0.0, Math.min(q, 2.3));

  return q;
}

// Calculate i - Spread factor
export function calculateI(T: number, m: number, M: number): number | null {
  const T_clamped = Math.max(20, Math.min(T, 800));
  const m_clamped = Math.max(0.001, Math.min(m, 10));
  const M_clamped = Math.max(0, Math.min(M, 5));

  let i = 1 - T_clamped / 1000 - 0.1 * Math.log10(m_clamped) + M_clamped / 10;
  i = Math.max(0.4, Math.min(i, 1.8));

  return i;
}

// Calculate HRR from i
export function calculateHRR(i: number): number {
  return 25 * Math.pow(10, i);
}

// Calculate g - Surface factor
export function calculateG(
  l: number,
  b: number,
  accessType: "wide" | "narrow"
): number | null {
  if (l <= 0 || b <= 0) return null;

  // Swap if narrow access
  if (accessType === "narrow") {
    const temp = l;
    l = b;
    b = temp;
  }

  const innerCalc = b * b * l;
  const cubeRoot = Math.cbrt(innerCalc);
  const g = (b + 5 * cubeRoot) / 200;

  return g;
}

// Calculate e - Floor factor
export function calculateE(floorNumber: number): number {
  const absE = Math.abs(floorNumber);
  if (absE < -4 || absE > 150) return 1.0;

  let e = Math.pow((absE + 3) / (absE + 2), 0.7 * absE);
  e = Math.max(1.0, Math.min(e, 3.0));

  return e;
}

// Calculate v - Ventilation factor
export function calculateV(
  qm: number,
  k: number,
  h: number,
  windowArea: number = 0,
  staticVentArea: number = 0,
  mechanicalVent: number = 0,
  sectionArea: number = 1
): number {
  // Calculate k from areas if not provided
  if (k === 0 && sectionArea > 0) {
    const totalVentArea = windowArea + staticVentArea;
    k = totalVentArea / sectionArea;
  }

  // Add mechanical ventilation effect
  const mechanicalEffect =
    mechanicalVent > 0 ? mechanicalVent / (sectionArea * 3600) : 0;

  let v =
    0.84 +
    0.1 * Math.log10(Math.max(1, qm)) -
    Math.sqrt(k * Math.sqrt(Math.max(0.1, h)));
  v = v - mechanicalEffect * 0.1; // Reduce v with mechanical ventilation
  v = Math.max(0.1, Math.min(v, 1.5));

  return v;
}

// Calculate z - Access factor
export function calculateZ(
  accessDistance: number,
  accessWidth: number,
  obstacles: number,
  height: number
): number {
  let z =
    1 + accessDistance / 100 + obstacles / 10 - accessWidth / 20 - height / 50;
  z = Math.max(0.5, Math.min(z, 2.0));

  return z;
}

// Calculate total P values
export function calculateTotalP(results: CalculationResults): {
  P: number | null;
  P1: number | null;
  P2: number | null;
} {
  if (
    !results.q ||
    !results.i ||
    !results.g ||
    !results.e ||
    !results.v ||
    !results.z
  ) {
    return { P: null, P1: null, P2: null };
  }

  const P =
    results.q * results.i * results.g * results.e * results.v * results.z;
  const P1 = results.q * results.i * results.e * results.v * results.z;
  const P2 = results.i * results.g * results.e * results.v * results.z;

  return { P, P1, P2 };
}

// Calculate t - Evacuation time
export function calculateT(
  area: number,
  length: number,
  width: number,
  occupants: number,
  exitWidths: number[],
  mobilityFactor: number,
  heightAbove: number,
  heightBelow: number
): number | null {
  if (length <= 0 || width <= 0 || occupants <= 0) return null;

  const K = exitWidths.reduce((sum, w) => sum + Math.max(0.6, w), 0);
  if (K < 0.6) return null;

  const x = K / 0.6;
  const p = mobilityFactor || 1;
  const Hplus = heightAbove || 0;
  const Hminus = heightBelow || 0;

  const numerator =
    p *
    (width + length + occupants / x + 1.25 * Hplus + 2 * Hminus) *
    (x * (width + length));
  const denominator = 800 * K * (1.4 * x * (width + length) - 0.44 * occupants);

  if (denominator <= 0) return null;

  const tHours = numerator / denominator;
  return tHours * 60; // Convert to minutes
}

// Calculate a - Activity factor
export function calculateA(activityType: string): number {
  const activityMap: Record<string, number> = {
    residential: 0.5,
    office: 0.7,
    commercial: 1.0,
    industrial: 1.5,
    storage: 2.0,
  };

  return activityMap[activityType] || 1.0;
}

// Calculate c - Value factor
export function calculateC(
  replaceability: number,
  valueEUR2000: number
): number {
  const c1 = replaceability;
  let c2 = 0;

  if (valueEUR2000 > 7100000) {
    c2 = 0.25 * Math.log10(valueEUR2000 / 7100000);
  }

  return c1 + c2;
}

// Calculate r - Environment factor
export function calculateR(environmentType: string): number {
  const envMap: Record<string, number> = {
    isolated: 0.5,
    normal: 1.0,
    dense: 1.5,
  };

  return envMap[environmentType] || 1.0;
}

// Calculate d - Dependency factor
export function calculateD(dependencyLevel: number): number {
  return Math.max(0, Math.min(dependencyLevel / 10, 1.0));
}

// Calculate total A values
export function calculateTotalA(results: CalculationResults): {
  A: number | null;
  A1: number | null;
  A2: number | null;
} {
  if (!results.a || !results.t || !results.c || !results.r || !results.d) {
    return { A: null, A1: null, A2: null };
  }

  const A = results.a * results.t * results.c * results.r * results.d;
  const A1 = results.a * results.t * results.c * results.r;
  const A2 = results.t * results.c * results.r * results.d;

  return { A, A1, A2 };
}

// Calculate S - Smoke control factor
export function calculateS(
  smokeDetection: boolean,
  smokeExtraction: boolean,
  smokeCompartmentation: boolean,
  smokeBarriers: number
): number {
  let s = 1.0;

  if (smokeDetection) s *= 0.9;
  if (smokeExtraction) s *= 0.85;
  if (smokeCompartmentation) s *= 0.8;
  s *= 1 - smokeBarriers * 0.05;

  return Math.max(0.5, Math.min(s, 1.0));
}

// Calculate F - Fire resistance factor
export function calculateF(
  fs: number,
  ff: number,
  fd: number,
  fw: number,
  S: number,
  hasWindows: boolean = false,
  noSeparation: boolean = false,
  combustibleInsulation: boolean = false
): number {
  // Apply special conditions
  if (hasWindows) ff = 0;
  if (noSeparation) fw = 0;
  if (combustibleInsulation) fd = 0;

  // Clamp to 120 minutes
  fs = Math.min(fs, 120);
  ff = Math.min(ff, 120);
  fd = Math.min(fd, 120);
  fw = Math.min(fw, 120);

  // No component can exceed structural resistance
  ff = Math.min(ff, fs);
  fd = Math.min(fd, fs);
  fw = Math.min(fw, fs);

  // Weighted average
  const f = (1 / 2) * fs + (1 / 4) * ff + (1 / 8) * fd + (1 / 8) * fw;

  // Full formula
  const term1 = 1 + f / 100 - Math.pow(f, 2.5) / 1000000;
  const term2 = 1 - (S - 1) / 40;

  let F = term1 * term2;
  F = Math.max(0.1, F);

  return F;
}

// Calculate total D values
export function calculateTotalD(results: CalculationResults): {
  D: number | null;
  D1: number | null;
  D2: number | null;
} {
  if (
    !results.W ||
    !results.N ||
    !results.S ||
    !results.F ||
    !results.U ||
    !results.Y
  ) {
    return { D: null, D1: null, D2: null };
  }

  const D =
    results.W * results.N * results.S * results.F * results.U * results.Y;
  const D1 = results.W * results.N * results.S * results.F * results.U;
  const D2 = results.N * results.S * results.F * results.U * results.Y;

  return { D, D1, D2 };
}

// Calculate final R values
export function calculateFinalR(results: CalculationResults): {
  R: number | null;
  R1: number | null;
  R2: number | null;
} {
  if (!results.P || !results.A || !results.D) {
    return { R: null, R1: null, R2: null };
  }

  const R = results.P / (results.A * results.D);
  const R1 =
    results.P1 && results.A1 && results.D1
      ? results.P1 / (results.A1 * results.D1)
      : null;
  const R2 =
    results.P2 && results.A2 && results.D2
      ? results.P2 / (results.A2 * results.D2)
      : null;

  return { R, R1, R2 };
}

// Compute m from dimensions (geometric mean)
export function computeMFromDims(dims: number[]): number {
  const validDims = dims.filter((d) => d > 0);
  if (validDims.length === 0) return 0.3;

  const product = validDims.reduce((acc, val) => acc * val, 1);
  const m = Math.pow(product, 1 / validDims.length);

  return Math.max(0.001, Math.min(m, 2));
}
