export interface Project {
  id: string;
  name: string;
  address: string;
  description: string;
  createdAt: string;
}

export interface Floor {
  id?: string;
  name: string;
  level: number;
  description: string;
  projectId?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Assessment API Response Interface
 * This represents the full assessment object returned from the API
 */
export interface AssessmentResponse {
  id: string;
  floorId: string;
  
  // Potential Risk Inputs
  qi: number | null;
  qm: number | null;
  tempDestruction: number | null;
  avgDimension: number | null;
  materialClass: number | null;
  
  // Geometry
  length: number | null;
  width: number | null;
  area: number | null;
  height: number | null;
  accessType: "wide" | "narrow" | null;
  
  // Venting
  windowArea: number | null;
  staticVentArea: number | null;
  mechVentFlow: number | null;
  ventingRatio_k: number | null;
  
  // Access Factors
  accessSides: number | null;
  heightAbove: number | null;
  depthBelow: number | null;
  
  // Acceptable Risk Inputs
  mainActivity: number | null;
  secondaryActivity: number | null;
  heatTransferType: number | null;
  generatorLocation: number | null;
  energySource: number | null;
  electricalSystem: number | null;
  flammableLiquids: number | null;
  combustibleDust: number | null;
  occupantCount: number | null;
  occupantFactor: number | null;
  occupantFactorKey: string | null;
  exitWidths: string | null;
  exitWidthTotal: number | null;
  mobilityFactor: number | null;
  exitCountToOpenSpace: number | null;
  
  // Economic / C-Factor Inputs
  valueTotal: number | null;
  valueYear: number | null;
  replaceability: number | null;
  dependencyType: string | null;
  dependencyManual: number | null;
  
  // Protection Inputs
  waterStorageType: string | null;
  waterCapacity: number | null;
  distributionNetwork: string | null;
  hydrantCount25: number | null;
  hydrantCount3: number | null;
  hydrantCount4: number | null;
  detectionType: number | null;
  sprinklerType: number | null;
  fireStationType: number | null;
  waterSupplyType: number | null;
  industrialBrigade: number | null;
  structureResist: number | null;
  facadeResist: number | null;
  roofResist: number | null;
  wallResist: number | null;
  hasManyWindows: boolean | null;
  noInternalSeparation: boolean | null;
  combustibleInsulation: boolean | null;
  n1: number | null;
  n2: number | null;
  n3: number | null;
  n4: number | null;
  n5: number | null;
  subcompartment: number | null;
  stairways: number | null;
  horizontalExit: number | null;
  sprinklers: number | null;
  subCompartmentEI30: boolean | null;
  subCompartmentEI60: boolean | null;
  partialDetection: boolean | null;
  partialSprinkler: boolean | null;
  otherAutoExtinguish: boolean | null;
  financialDataBackup: boolean | null;
  sparePartsAccess: boolean | null;
  selfRepairCapability: boolean | null;
  relocationAgreements: boolean | null;
  multipleProduction: boolean | null;
  floorLevel: number | null;
  
  // Calculated Risk Factors
  factor_q: number | null;
  factor_i: number | null;
  factor_g: number | null;
  factor_e: number | null;
  factor_v: number | null;
  factor_z: number | null;
  
  // Calculated Acceptance Factors
  factor_a: number | null;
  factor_t: number | null;
  factor_c: number | null;
  factor_r: number | null;
  factor_d: number | null;
  
  // Calculated Protection Factors
  factor_W: number | null;
  factor_N: number | null;
  factor_S: number | null;
  factor_F: number | null;
  factor_U: number | null;
  factor_Y: number | null;
  
  // Potential Risks
  risk_P: number | null;
  risk_P1: number | null;
  risk_P2: number | null;
  
  // Acceptable Levels
  level_A: number | null;
  level_A1: number | null;
  level_A2: number | null;
  
  // Protection Levels
  level_D: number | null;
  level_D1: number | null;
  level_D2: number | null;
  
  // Initial Risk
  factor_Fo: number | null;
  risk_Ro: number | null;
  
  // Final Risks
  final_R: number | null;
  final_R1: number | null;
  final_R2: number | null;
  
  // Status
  status_R: string | null;
  status_R1: string | null;
  status_R2: string | null;
  
  // Metadata
  updatedAt: string;
}

/**
* Assessment API Response Wrapper for PUT/POST requests
* This is the complete response structure returned by the API endpoints when creating/updating
*/
export interface AssessmentUpdateApiResponse {
  success: boolean;
  message: string;
  assessment: AssessmentResponse;
}

/**
* Assessment API Response Wrapper for GET requests
* This is the response structure returned when fetching an assessment
*/
export interface AssessmentGetApiResponse {
  success: boolean;
  assessment: AssessmentResponse;
}

/**
* Assessment API Error Response
* This is the response structure returned when there's an error
*/
export interface AssessmentErrorResponse {
  success: false;
  error: string;
}

/**
* Assessment API Response (Union type for all possible responses)
*/
export type AssessmentApiResponse = 
  | AssessmentUpdateApiResponse 
  | AssessmentGetApiResponse 
  | AssessmentErrorResponse;