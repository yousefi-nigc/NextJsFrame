import { AssessmentResponse } from "@/lib/APIResponseInterfaces";

/**
 * Type for assessment with all relations included
 * Using 'any' type since Prisma client may not be regenerated yet after schema changes
 */
type AssessmentWithRelations = any;

/**
 * Flattens an assessment with relations into the flat AssessmentResponse structure
 * This maintains backward compatibility with the API
 */
export function flattenAssessment(assessment: AssessmentWithRelations | null): AssessmentResponse | null {
    if (!assessment) {
        return null;
    }

    return {
        id: assessment.id,
        floorId: assessment.floorId,
        
        // Input fields from riskFactors
        qi: assessment.riskFactors?.qi ?? null,
        qm: assessment.riskFactors?.qm ?? null,
        tempDestruction: assessment.riskFactors?.tempDestruction ?? null,
        tempDestructionMulti: assessment.riskFactors?.tempDestructionMulti ?? null,
        avgDimension: assessment.riskFactors?.avgDimension ?? null,
        materialClass: assessment.riskFactors?.materialClass ?? null,
        materialClassMulti: assessment.riskFactors?.materialClassMulti ?? null,
        length: assessment.riskFactors?.length ?? null,
        width: assessment.riskFactors?.width ?? null,
        area: assessment.riskFactors?.area ?? null,
        height: assessment.riskFactors?.height ?? null,
        accessType: (assessment.riskFactors?.accessType as "wide" | "narrow" | null) ?? null,
        windowArea: assessment.riskFactors?.windowArea ?? null,
        staticVentArea: assessment.riskFactors?.staticVentArea ?? null,
        mechVentFlow: assessment.riskFactors?.mechVentFlow ?? null,
        ventingRatio_k: assessment.riskFactors?.ventingRatio_k ?? null,
        accessSides: assessment.riskFactors?.accessSides ?? null,
        heightAbove: assessment.riskFactors?.heightAbove ?? null,
        depthBelow: assessment.riskFactors?.depthBelow ?? null,
        floorLevel: assessment.riskFactors?.floorLevel ?? null,
        
        // Input fields from acceptanceFactors
        mainActivity: assessment.acceptanceFactors?.mainActivity ?? null,
        secondaryActivity: assessment.acceptanceFactors?.secondaryActivity ?? null,
        heatTransferType: assessment.acceptanceFactors?.heatTransferType ?? null,
        generatorLocation: assessment.acceptanceFactors?.generatorLocation ?? null,
        energySource: assessment.acceptanceFactors?.energySource ?? null,
        energySourceKey: assessment.acceptanceFactors?.energySourceKey ?? null,
        electricalSystem: assessment.acceptanceFactors?.electricalSystem ?? null,
        flammableLiquids: assessment.acceptanceFactors?.flammableLiquids ?? null,
        combustibleDust: assessment.acceptanceFactors?.combustibleDust ?? null,
        occupantCount: assessment.acceptanceFactors?.occupantCount ?? null,
        occupantFactor: assessment.acceptanceFactors?.occupantFactor ?? null,
        occupantFactorKey: assessment.acceptanceFactors?.occupantFactorKey ?? null,
        exitWidths: assessment.acceptanceFactors?.exitWidths ?? null,
        exitWidthTotal: assessment.acceptanceFactors?.exitWidthTotal ?? null,
        mobilityFactor: assessment.acceptanceFactors?.mobilityFactor ?? null,
        exitCountToOpenSpace: assessment.acceptanceFactors?.exitCountToOpenSpace ?? null,
        valueTotal: assessment.acceptanceFactors?.valueTotal ?? null,
        valueYear: assessment.acceptanceFactors?.valueYear ?? null,
        replaceability: assessment.acceptanceFactors?.replaceability ?? null,
        dependencyType: assessment.acceptanceFactors?.dependencyType ?? null,
        dependencyManual: assessment.acceptanceFactors?.dependencyManual ?? null,
        
        // Input fields from protectionFactors
        waterStorageType: assessment.protectionFactors?.waterStorageType ?? null,
        waterCapacity: assessment.protectionFactors?.waterCapacity ?? null,
        distributionNetwork: assessment.protectionFactors?.distributionNetwork ?? null,
        hydrantCount25: assessment.protectionFactors?.hydrantCount25 ?? null,
        hydrantCount3: assessment.protectionFactors?.hydrantCount3 ?? null,
        hydrantCount4: assessment.protectionFactors?.hydrantCount4 ?? null,
        detectionType: assessment.protectionFactors?.detectionType ?? null,
        sprinklerType: assessment.protectionFactors?.sprinklerType ?? null,
        fireStationType: assessment.protectionFactors?.fireStationType ?? null,
        waterSupplyType: assessment.protectionFactors?.waterSupplyType ?? null,
        industrialBrigade: assessment.protectionFactors?.industrialBrigade ?? null,
        structureResist: assessment.protectionFactors?.structureResist ?? null,
        facadeResist: assessment.protectionFactors?.facadeResist ?? null,
        roofResist: assessment.protectionFactors?.roofResist ?? null,
        wallResist: assessment.protectionFactors?.wallResist ?? null,
        hasManyWindows: assessment.protectionFactors?.hasManyWindows ?? null,
        noInternalSeparation: assessment.protectionFactors?.noInternalSeparation ?? null,
        combustibleInsulation: assessment.protectionFactors?.combustibleInsulation ?? null,
        n1: assessment.protectionFactors?.n1 ?? null,
        n2: assessment.protectionFactors?.n2 ?? null,
        n3: assessment.protectionFactors?.n3 ?? null,
        n4: assessment.protectionFactors?.n4 ?? null,
        n5: assessment.protectionFactors?.n5 ?? null,
        subcompartment: assessment.protectionFactors?.subcompartment ?? null,
        stairways: assessment.protectionFactors?.stairways ?? null,
        horizontalExit: assessment.protectionFactors?.horizontalExit ?? null,
        sprinklers: assessment.protectionFactors?.sprinklers ?? null,
        subCompartmentEI30: assessment.protectionFactors?.subCompartmentEI30 ?? null,
        subCompartmentEI60: assessment.protectionFactors?.subCompartmentEI60 ?? null,
        partialDetection: assessment.protectionFactors?.partialDetection ?? null,
        partialSprinkler: assessment.protectionFactors?.partialSprinkler ?? null,
        otherAutoExtinguish: assessment.protectionFactors?.otherAutoExtinguish ?? null,
        financialDataBackup: assessment.protectionFactors?.financialDataBackup ?? null,
        sparePartsAccess: assessment.protectionFactors?.sparePartsAccess ?? null,
        selfRepairCapability: assessment.protectionFactors?.selfRepairCapability ?? null,
        relocationAgreements: assessment.protectionFactors?.relocationAgreements ?? null,
        multipleProduction: assessment.protectionFactors?.multipleProduction ?? null,
        
        // Calculated values from riskFactors
        factor_q: assessment.riskFactors?.factor_q ?? null,
        factor_i: assessment.riskFactors?.factor_i ?? null,
        factor_g: assessment.riskFactors?.factor_g ?? null,
        factor_e: assessment.riskFactors?.factor_e ?? null,
        factor_v: assessment.riskFactors?.factor_v ?? null,
        factor_z: assessment.riskFactors?.factor_z ?? null,
        risk_P: assessment.riskFactors?.risk_P ?? null,
        risk_P1: assessment.riskFactors?.risk_P1 ?? null,
        risk_P2: assessment.riskFactors?.risk_P2 ?? null,
        
        // Calculated values from acceptanceFactors
        factor_a: assessment.acceptanceFactors?.factor_a ?? null,
        factor_t: assessment.acceptanceFactors?.factor_t ?? null,
        factor_c: assessment.acceptanceFactors?.factor_c ?? null,
        factor_r: assessment.acceptanceFactors?.factor_r ?? null,
        factor_d: assessment.acceptanceFactors?.factor_d ?? null,
        level_A: assessment.acceptanceFactors?.level_A ?? null,
        level_A1: assessment.acceptanceFactors?.level_A1 ?? null,
        level_A2: assessment.acceptanceFactors?.level_A2 ?? null,
        
        // Calculated values from protectionFactors
        factor_W: assessment.protectionFactors?.factor_W ?? null,
        factor_N: assessment.protectionFactors?.factor_N ?? null,
        factor_S: assessment.protectionFactors?.factor_S ?? null,
        factor_F: assessment.protectionFactors?.factor_F ?? null,
        factor_U: assessment.protectionFactors?.factor_U ?? null,
        factor_Y: assessment.protectionFactors?.factor_Y ?? null,
        level_D: assessment.protectionFactors?.level_D ?? null,
        level_D1: assessment.protectionFactors?.level_D1 ?? null,
        level_D2: assessment.protectionFactors?.level_D2 ?? null,
        
        // Calculated values from finalRisks
        factor_Fo: assessment.finalRisks?.factor_Fo ?? null,
        risk_Ro: assessment.finalRisks?.risk_Ro ?? null,
        final_R: assessment.finalRisks?.final_R ?? null,
        final_R1: assessment.finalRisks?.final_R1 ?? null,
        final_R2: assessment.finalRisks?.final_R2 ?? null,
        status_R: assessment.finalRisks?.status_R ?? null,
        status_R1: assessment.finalRisks?.status_R1 ?? null,
        status_R2: assessment.finalRisks?.status_R2 ?? null,
        
        // Metadata
        updatedAt: assessment.updatedAt.toISOString(),
    };
}

