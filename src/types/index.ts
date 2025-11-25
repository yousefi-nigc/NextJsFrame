export interface CalculationResults {
  // Potential risk factors
  q: number | null;
  i: number | null;
  g: number | null;
  e: number | null;
  v: number | null;
  z: number | null;

  // Acceptable risk factors
  a: number | null;
  t: number | null;
  c: number | null;
  r: number | null;
  d: number | null;

  // Protection level factors
  W: number | null;
  N: number | null;
  S: number | null;
  F: number | null;
  U: number | null;
  Y: number | null;

  // Results
  P: number | null;
  P1: number | null;
  P2: number | null;
  A: number | null;
  A1: number | null;
  A2: number | null;
  D: number | null;
  D1: number | null;
  D2: number | null;
  R: number | null;
  R1: number | null;
  R2: number | null;
}

export type MessageType = "success" | "error" | "warning" | "info";

export interface Message {
  type: MessageType;
  text: string;
}
