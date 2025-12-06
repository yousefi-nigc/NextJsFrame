import { z } from "zod";

/**
 * Validation schema for assessment inputs
 * 
 * IMPORTANT: This schema ONLY accepts raw input data.
 * All calculated fields (factor_*, risk_*, level_*, final_*, status_*) are automatically
 * calculated by the service and stored in the database. Users should NOT send calculated values.
 * 
 * Calculated fields that are auto-generated:
 * - factor_q, factor_i, factor_g, factor_e, factor_v, factor_z
 * - factor_a, factor_t, factor_c, factor_r, factor_d
 * - factor_W, factor_N, factor_S, factor_F, factor_U, factor_Y
 * - risk_P, risk_P1, risk_P2
 * - level_A, level_A1, level_A2
 * - level_D, level_D1, level_D2
 * - factor_Fo, risk_Ro
 * - final_R, final_R1, final_R2
 * - status_R, status_R1, status_R2
 */
export const createAssessmentValidationSchema = z.object({
    // Potential Risk Inputs
    qi: z.number().min(0).optional(),
    qm: z.number().min(0).optional(),
    tempDestruction: z.number().min(20).max(800).optional(),
    avgDimension: z.number().min(0.001).max(10).optional(),
    materialClass: z.number().min(0).max(5).optional(),
    
    // Geometry
    length: z.number().min(0).optional(),
    width: z.number().min(0).optional(),
    area: z.number().min(0).optional(),
    height: z.number().min(2).max(15).optional(),
    accessType: z.enum(["wide", "narrow"]).optional(),
    
    // Venting
    windowArea: z.number().min(0).optional(),
    staticVentArea: z.number().min(0).optional(),
    mechVentFlow: z.number().min(0).optional(),
    ventingRatio_k: z.number().min(0.001).max(1).optional(),
    
    // Access Factors
    accessSides: z.number().int().min(1).max(4).optional(),
    heightAbove: z.number().min(0).optional(),
    depthBelow: z.number().min(0).optional(),
    
    // Acceptable Risk Inputs
    mainActivity: z.string().optional(),
    occupantCount: z.number().int().min(0).optional(),
    occupantFactor: z.number().min(0).optional(),
    exitWidthTotal: z.number().min(0.6).optional(),
    mobilityFactor: z.number().min(0).optional(),
    
    // Economic / C-Factor Inputs
    valueTotal: z.number().min(0).optional(),
    valueYear: z.number().int().min(2000).max(2100).optional(),
    replaceability: z.number().min(0).optional(),
    dependencyType: z.string().optional(),
    dependencyManual: z.number().min(0).max(1).optional(),
    
    // Protection Inputs
    waterStorageType: z.string().optional(),
    waterCapacity: z.number().min(0).optional(),
    hydrantCount25: z.number().int().min(0).optional(),
    hydrantCount3: z.number().int().min(0).optional(),
    hydrantCount4: z.number().int().min(0).optional(),
    
    detectionType: z.number().optional(),
    sprinklerType: z.number().optional(),
    fireStationType: z.number().optional(),
    
    structureResist: z.number().min(0).max(120).optional(),
    facadeResist: z.number().min(0).max(120).optional(),
    roofResist: z.number().min(0).max(120).optional(),
    wallResist: z.number().min(0).max(120).optional(),
    
    // Floor level for e calculation
    floorLevel: z.number().min(-4).max(150).optional(),
}).strict(); // Reject any unknown fields (including calculated fields)

export type CreateAssessmentValidationSchema = z.infer<typeof createAssessmentValidationSchema>;

/**
 * Update validation schema - same as create but all fields are optional
 * Still rejects calculated fields - only raw input data is accepted
 */
export const updateAssessmentValidationSchema = createAssessmentValidationSchema.partial().strict();

export type UpdateAssessmentValidationSchema = z.infer<typeof updateAssessmentValidationSchema>;

export type AssessmentCalculationResult = {
    // Risk Factors
    factor_q: number | null;
    factor_i: number | null;
    factor_g: number | null;
    factor_e: number | null;
    factor_v: number | null;
    factor_z: number | null;
    
    // Acceptance Factors
    factor_a: number | null;
    factor_t: number | null;
    factor_c: number | null;
    factor_r: number | null;
    factor_d: number | null;
    
    // Protection Factors
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
};

export type CreateAssessmentServiceInput = {
    floorId: string;
    userId: string;
    inputs: CreateAssessmentValidationSchema;
};

export type UpdateAssessmentServiceInput = {
    assessmentId: string;
    floorId: string;
    userId: string;
    inputs: UpdateAssessmentValidationSchema;
};

export type AssessmentServiceResponse = {
    success: boolean;
    assessment?: any;
    error?: Error;
};

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
    mainActivity: string | null;
    occupantCount: number | null;
    occupantFactor: number | null;
    exitWidthTotal: number | null;
    mobilityFactor: number | null;
    
    // Economic / C-Factor Inputs
    valueTotal: number | null;
    valueYear: number | null;
    replaceability: number | null;
    dependencyType: string | null;
    dependencyManual: number | null;
    
    // Protection Inputs
    waterStorageType: string | null;
    waterCapacity: number | null;
    hydrantCount25: number | null;
    hydrantCount3: number | null;
    hydrantCount4: number | null;
    detectionType: number | null;
    sprinklerType: number | null;
    fireStationType: number | null;
    structureResist: number | null;
    facadeResist: number | null;
    roofResist: number | null;
    wallResist: number | null;
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
 * Assessment API Response Wrapper
 * This is the complete response structure returned by the API endpoints
 */
export interface AssessmentUpdateApiResponse {
    success: boolean;
    message: string;
    assessment: AssessmentResponse;
}

