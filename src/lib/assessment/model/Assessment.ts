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
    mainActivity: z.number().min(0).optional(),
    secondaryActivity: z.number().min(0).optional(),
    heatTransferType: z.number().min(0).optional(),
    generatorLocation: z.number().min(0).optional(),
    energySource: z.number().min(0).optional(),
    electricalSystem: z.number().min(0).optional(),
    flammableLiquids: z.number().min(0).optional(),
    combustibleDust: z.number().min(0).optional(),
    occupantCount: z.number().int().min(0).optional(),
    occupantFactor: z.number().min(0).optional(),
    occupantFactorKey: z.string().optional(), // Key for select display to handle duplicate values
    exitWidths: z.string().optional(), // Comma-separated exit widths (e.g., "1.2, 0.9, 2.0")
    exitWidthTotal: z.number().min(0.6).optional(),
    mobilityFactor: z.number().min(0).optional(),
    exitCountToOpenSpace: z.number().int().min(0).optional(),
    
    // Economic / C-Factor Inputs
    valueTotal: z.number().min(0).optional(),
    valueYear: z.number().int().min(2000).max(2100).optional(),
    replaceability: z.number().min(0).optional(),
    dependencyType: z.string().optional(),
    dependencyManual: z.number().min(0).max(1).optional(),
    
    // Protection Inputs
    waterStorageType: z.string().optional(),
    waterCapacity: z.number().min(0).optional(),
    distributionNetwork: z.enum(["adequate", "limited", "none"]).optional(),
    hydrantCount25: z.number().int().min(0).optional(),
    hydrantCount3: z.number().int().min(0).optional(),
    hydrantCount4: z.number().int().min(0).optional(),
    
    detectionType: z.number().optional(),
    sprinklerType: z.number().optional(),
    fireStationType: z.number().optional(),
    waterSupplyType: z.number().optional(),
    industrialBrigade: z.number().optional(),
    
    structureResist: z.number().min(0).max(120).optional(),
    facadeResist: z.number().min(0).max(120).optional(),
    roofResist: z.number().min(0).max(120).optional(),
    wallResist: z.number().min(0).max(120).optional(),
    hasManyWindows: z.boolean().optional(),
    noInternalSeparation: z.boolean().optional(),
    combustibleInsulation: z.boolean().optional(),
    
    // N factor inputs
    n1: z.number().min(0).optional(),
    n2: z.number().min(0).optional(),
    n3: z.number().min(0).optional(),
    n4: z.number().min(0).optional(),
    n5: z.number().min(0).optional(),
    
    // U factor inputs
    subcompartment: z.number().min(0).optional(),
    stairways: z.number().min(0).optional(),
    horizontalExit: z.number().min(0).optional(),
    sprinklers: z.number().min(0).optional(),
    
    // Y factor inputs
    subCompartmentEI30: z.boolean().optional(),
    subCompartmentEI60: z.boolean().optional(),
    partialDetection: z.boolean().optional(),
    partialSprinkler: z.boolean().optional(),
    otherAutoExtinguish: z.boolean().optional(),
    financialDataBackup: z.boolean().optional(),
    sparePartsAccess: z.boolean().optional(),
    selfRepairCapability: z.boolean().optional(),
    relocationAgreements: z.boolean().optional(),
    multipleProduction: z.boolean().optional(),
    
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
