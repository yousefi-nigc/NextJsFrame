import { UpdateAssessmentServiceInput, AssessmentServiceResponse } from "../model/Assessment";
import { db } from "@/lib/db";
import { calculateAssessment } from "./AssessmentCalculationService";
import { flattenAssessment } from "../utils/flattenAssessment";

export async function updateAssessmentService({
    assessmentId,
    floorId,
    userId,
    inputs
}: UpdateAssessmentServiceInput): Promise<AssessmentServiceResponse> {
    try {
        // Verify assessment exists and belongs to user
        const existing = await db.assessment.findFirst({
            where: {
                id: assessmentId,
                floor: {
                    project: {
                        userId: userId
                    }
                }
            },
            include: {
                floor: true,
                riskFactors: true,
                acceptanceFactors: true,
                protectionFactors: true,
            }
        });

        if (!existing) {
            return { success: false, error: new Error("Assessment not found or access denied") };
        }

        // Get current values from domain tables and merge with updates
        const currentInputs = {
            // Risk factors inputs
            qi: existing.riskFactors?.qi ?? undefined,
            qm: existing.riskFactors?.qm ?? undefined,
            tempDestruction: existing.riskFactors?.tempDestruction ?? undefined,
            tempDestructionMulti: existing.riskFactors?.tempDestructionMulti ?? undefined,
            avgDimension: existing.riskFactors?.avgDimension ?? undefined,
            materialClass: existing.riskFactors?.materialClass ?? undefined,
            materialClassMulti: existing.riskFactors?.materialClassMulti ?? undefined,
            length: existing.riskFactors?.length ?? undefined,
            width: existing.riskFactors?.width ?? undefined,
            area: existing.riskFactors?.area ?? undefined,
            height: existing.riskFactors?.height ?? undefined,
            accessType: existing.riskFactors?.accessType ?? undefined,
            windowArea: existing.riskFactors?.windowArea ?? undefined,
            staticVentArea: existing.riskFactors?.staticVentArea ?? undefined,
            mechVentFlow: existing.riskFactors?.mechVentFlow ?? undefined,
            ventingRatio_k: existing.riskFactors?.ventingRatio_k ?? undefined,
            accessSides: existing.riskFactors?.accessSides ?? undefined,
            heightAbove: existing.riskFactors?.heightAbove ?? undefined,
            depthBelow: existing.riskFactors?.depthBelow ?? undefined,
            floorLevel: existing.riskFactors?.floorLevel ?? existing.floor.level ?? undefined,
            
            // Acceptance factors inputs
            mainActivity: existing.acceptanceFactors?.mainActivity ?? undefined,
            mainActivityKey: existing.acceptanceFactors?.mainActivityKey ?? undefined,
            secondaryActivity: existing.acceptanceFactors?.secondaryActivity ?? undefined,
            heatTransferType: existing.acceptanceFactors?.heatTransferType ?? undefined,
            heatTransferTypeKey: existing.acceptanceFactors?.heatTransferTypeKey ?? undefined,
            generatorLocation: existing.acceptanceFactors?.generatorLocation ?? undefined,
            generatorLocationKey: existing.acceptanceFactors?.generatorLocationKey ?? undefined,
            energySource: existing.acceptanceFactors?.energySource ?? undefined,
            energySourceKey: existing.acceptanceFactors?.energySourceKey ?? undefined,
            electricalSystem: existing.acceptanceFactors?.electricalSystem ?? undefined,
            flammableLiquids: existing.acceptanceFactors?.flammableLiquids ?? undefined,
            combustibleDust: existing.acceptanceFactors?.combustibleDust ?? undefined,
            combustibleDustKey: existing.acceptanceFactors?.combustibleDustKey ?? undefined,
            occupantCount: existing.acceptanceFactors?.occupantCount ?? undefined,
            occupantFactor: existing.acceptanceFactors?.occupantFactor ?? undefined,
            occupantFactorKey: existing.acceptanceFactors?.occupantFactorKey ?? undefined,
            exitWidths: existing.acceptanceFactors?.exitWidths ?? undefined,
            exitWidthTotal: existing.acceptanceFactors?.exitWidthTotal ?? undefined,
            mobilityFactor: existing.acceptanceFactors?.mobilityFactor ?? undefined,
            exitCountToOpenSpace: existing.acceptanceFactors?.exitCountToOpenSpace ?? undefined,
            valueTotal: existing.acceptanceFactors?.valueTotal ?? undefined,
            valueYear: existing.acceptanceFactors?.valueYear ?? undefined,
            replaceability: existing.acceptanceFactors?.replaceability ?? undefined,
            dependencyType: existing.acceptanceFactors?.dependencyType ?? undefined,
            dependencyManual: existing.acceptanceFactors?.dependencyManual ?? undefined,
            
            // Protection factors inputs
            waterStorageType: existing.protectionFactors?.waterStorageType ?? undefined,
            waterCapacity: existing.protectionFactors?.waterCapacity ?? undefined,
            distributionNetwork: existing.protectionFactors?.distributionNetwork ?? undefined,
            hydrantCount25: existing.protectionFactors?.hydrantCount25 ?? undefined,
            hydrantCount3: existing.protectionFactors?.hydrantCount3 ?? undefined,
            hydrantCount4: existing.protectionFactors?.hydrantCount4 ?? undefined,
            detectionType: existing.protectionFactors?.detectionType ?? undefined,
            sprinklerType: existing.protectionFactors?.sprinklerType ?? undefined,
            fireStationType: existing.protectionFactors?.fireStationType ?? undefined,
            waterSupplyType: existing.protectionFactors?.waterSupplyType ?? undefined,
            industrialBrigade: existing.protectionFactors?.industrialBrigade ?? undefined,
            structureResist: existing.protectionFactors?.structureResist ?? undefined,
            facadeResist: existing.protectionFactors?.facadeResist ?? undefined,
            roofResist: existing.protectionFactors?.roofResist ?? undefined,
            wallResist: existing.protectionFactors?.wallResist ?? undefined,
            hasManyWindows: existing.protectionFactors?.hasManyWindows ?? undefined,
            noInternalSeparation: existing.protectionFactors?.noInternalSeparation ?? undefined,
            combustibleInsulation: existing.protectionFactors?.combustibleInsulation ?? undefined,
            n1: existing.protectionFactors?.n1 ?? undefined,
            n2: existing.protectionFactors?.n2 ?? undefined,
            n3: existing.protectionFactors?.n3 ?? undefined,
            n4: existing.protectionFactors?.n4 ?? undefined,
            n5: existing.protectionFactors?.n5 ?? undefined,
            subcompartment: existing.protectionFactors?.subcompartment ?? undefined,
            stairways: existing.protectionFactors?.stairways ?? undefined,
            horizontalExit: existing.protectionFactors?.horizontalExit ?? undefined,
            sprinklers: existing.protectionFactors?.sprinklers ?? undefined,
            subCompartmentEI30: existing.protectionFactors?.subCompartmentEI30 ?? undefined,
            subCompartmentEI60: existing.protectionFactors?.subCompartmentEI60 ?? undefined,
            partialDetection: existing.protectionFactors?.partialDetection ?? undefined,
            partialSprinkler: existing.protectionFactors?.partialSprinkler ?? undefined,
            otherAutoExtinguish: existing.protectionFactors?.otherAutoExtinguish ?? undefined,
            financialDataBackup: existing.protectionFactors?.financialDataBackup ?? undefined,
            sparePartsAccess: existing.protectionFactors?.sparePartsAccess ?? undefined,
            selfRepairCapability: existing.protectionFactors?.selfRepairCapability ?? undefined,
            relocationAgreements: existing.protectionFactors?.relocationAgreements ?? undefined,
            multipleProduction: existing.protectionFactors?.multipleProduction ?? undefined,
        };

        // Merge with new inputs (only override defined values, not undefined or null)
        // This ensures that if a field is not sent, it won't overwrite existing values
        const mergedInputs: any = { ...currentInputs };
        Object.keys(inputs).forEach(key => {
            const value = inputs[key as keyof typeof inputs];
            // For most fields, ignore undefined/null to avoid accidental overwrite
            // For tempDestructionMulti/materialClassMulti we allow null to clear previous values
            const allowNullClear = key === "tempDestructionMulti" || key === "materialClassMulti";
            if (value !== undefined && (allowNullClear || value !== null)) {
                mergedInputs[key] = value;
            }
        });
        
        // Special handling for dependencyManual: clear it when dependencyType is not "manual"
        if (inputs.dependencyType !== undefined && inputs.dependencyType !== "manual") {
            mergedInputs.dependencyManual = null;
        }

        // Recalculate all factors automatically based on merged inputs
        // Users only send raw input data - all calculated fields are recomputed here
        const calculations = calculateAssessment(mergedInputs);

        // Update domain tables with new inputs and recalculated values using transaction
        // Calculated values are always updated and stored in domain tables
        // Only update input fields that are explicitly provided (not undefined and not null)
        // This ensures optional fields that aren't sent won't overwrite existing values
        const assessment = await db.$transaction(async (tx) => {
            // Helper function to build update data for inputs
            const buildUpdateData = (field: string, value: any, allowNull = false) => {
                if (value === undefined) return {};
                if (!allowNull && value === null) return {};
                return { [field]: value };
            };

            // Upsert risk factors table with inputs and calculations
            await tx.assessmentRiskFactors.upsert({
                where: { assessmentId },
                create: {
                    assessmentId,
                    // Input fields
                    qi: mergedInputs.qi ?? null,
                    qm: mergedInputs.qm ?? null,
                    tempDestruction: mergedInputs.tempDestruction ?? null,
                    tempDestructionMulti: mergedInputs.tempDestructionMulti ?? null,
                    avgDimension: mergedInputs.avgDimension ?? null,
                    materialClass: mergedInputs.materialClass ?? null,
                    materialClassMulti: mergedInputs.materialClassMulti ?? null,
                    length: mergedInputs.length ?? null,
                    width: mergedInputs.width ?? null,
                    area: mergedInputs.area ?? null,
                    height: mergedInputs.height ?? null,
                    accessType: mergedInputs.accessType ?? null,
                    windowArea: mergedInputs.windowArea ?? null,
                    staticVentArea: mergedInputs.staticVentArea ?? null,
                    mechVentFlow: mergedInputs.mechVentFlow ?? null,
                    ventingRatio_k: mergedInputs.ventingRatio_k ?? null,
                    accessSides: mergedInputs.accessSides ?? null,
                    heightAbove: mergedInputs.heightAbove ?? null,
                    depthBelow: mergedInputs.depthBelow ?? null,
                    floorLevel: mergedInputs.floorLevel ?? null,
                    // Calculated factors
                    factor_q: calculations.factor_q,
                    factor_i: calculations.factor_i,
                    factor_g: calculations.factor_g,
                    factor_e: calculations.factor_e,
                    factor_v: calculations.factor_v,
                    factor_z: calculations.factor_z,
                    // Calculated risks
                    risk_P: calculations.risk_P,
                    risk_P1: calculations.risk_P1,
                    risk_P2: calculations.risk_P2,
                },
                update: {
                    // Update inputs only if provided
                    ...buildUpdateData("qi", inputs.qi),
                    ...buildUpdateData("qm", inputs.qm),
                    ...buildUpdateData("tempDestruction", inputs.tempDestruction),
                    ...buildUpdateData("tempDestructionMulti", inputs.tempDestructionMulti, true),
                    ...buildUpdateData("avgDimension", inputs.avgDimension),
                    ...buildUpdateData("materialClass", inputs.materialClass),
                    ...buildUpdateData("materialClassMulti", inputs.materialClassMulti, true),
                    ...buildUpdateData("length", inputs.length),
                    ...buildUpdateData("width", inputs.width),
                    ...buildUpdateData("area", inputs.area),
                    ...buildUpdateData("height", inputs.height),
                    ...buildUpdateData("accessType", inputs.accessType),
                    ...buildUpdateData("windowArea", inputs.windowArea),
                    ...buildUpdateData("staticVentArea", inputs.staticVentArea),
                    ...buildUpdateData("mechVentFlow", inputs.mechVentFlow),
                    ...buildUpdateData("ventingRatio_k", inputs.ventingRatio_k),
                    ...buildUpdateData("accessSides", inputs.accessSides),
                    ...buildUpdateData("heightAbove", inputs.heightAbove),
                    ...buildUpdateData("depthBelow", inputs.depthBelow),
                    ...buildUpdateData("floorLevel", inputs.floorLevel),
                    // Always update calculated values
                    factor_q: calculations.factor_q,
                    factor_i: calculations.factor_i,
                    factor_g: calculations.factor_g,
                    factor_e: calculations.factor_e,
                    factor_v: calculations.factor_v,
                    factor_z: calculations.factor_z,
                    risk_P: calculations.risk_P,
                    risk_P1: calculations.risk_P1,
                    risk_P2: calculations.risk_P2,
                }
            });

            // Upsert acceptance factors table with inputs and calculations
            await tx.assessmentAcceptanceFactors.upsert({
                where: { assessmentId },
                create: {
                    assessmentId,
                    // Input fields
                    mainActivity: mergedInputs.mainActivity ?? null,
                    mainActivityKey: mergedInputs.mainActivityKey ?? null,
                    secondaryActivity: mergedInputs.secondaryActivity ?? null,
                    heatTransferType: mergedInputs.heatTransferType ?? null,
                    heatTransferTypeKey: mergedInputs.heatTransferTypeKey ?? null,
                    generatorLocation: mergedInputs.generatorLocation ?? null,
                    generatorLocationKey: mergedInputs.generatorLocationKey ?? null,
                    energySource: mergedInputs.energySource ?? null,
                    energySourceKey: mergedInputs.energySourceKey ?? null,
                    electricalSystem: mergedInputs.electricalSystem ?? null,
                    flammableLiquids: mergedInputs.flammableLiquids ?? null,
                    combustibleDust: mergedInputs.combustibleDust ?? null,
                    combustibleDustKey: mergedInputs.combustibleDustKey ?? null,
                    weldingOperations: mergedInputs.weldingOperations ?? null,
                    additionalCarpentryPlastic: mergedInputs.additionalCarpentryPlastic ?? null,
                    specialRisk: mergedInputs.specialRisk ?? null,
                    occupantCount: mergedInputs.occupantCount ?? null,
                    occupantFactor: mergedInputs.occupantFactor ?? null,
                    occupantFactorKey: mergedInputs.occupantFactorKey ?? null,
                    exitWidths: mergedInputs.exitWidths ?? null,
                    exitWidthTotal: mergedInputs.exitWidthTotal ?? null,
                    exitUnitsX: mergedInputs.exitUnitsX ?? null,
                    separatePathsK: mergedInputs.separatePathsK ?? null,
                    mobilityFactor: mergedInputs.mobilityFactor ?? null,
                    exitCountToOpenSpace: mergedInputs.exitCountToOpenSpace ?? null,
                    valueTotal: mergedInputs.valueTotal ?? null,
                    valueYear: mergedInputs.valueYear ?? null,
                    replaceability: mergedInputs.replaceability ?? null,
                    dependencyType: mergedInputs.dependencyType ?? null,
                    dependencyManual: mergedInputs.dependencyManual ?? null,
                    // Calculated factors
                    factor_a: calculations.factor_a,
                    factor_t: calculations.factor_t,
                    factor_c: calculations.factor_c,
                    factor_r: calculations.factor_r,
                    factor_d: calculations.factor_d,
                    // Calculated levels
                    level_A: calculations.level_A,
                    level_A1: calculations.level_A1,
                    level_A2: calculations.level_A2,
                },
                update: {
                    // Update inputs only if provided
                    ...buildUpdateData("mainActivity", inputs.mainActivity),
                    ...buildUpdateData("mainActivityKey", inputs.mainActivityKey),
                    ...buildUpdateData("secondaryActivity", inputs.secondaryActivity),
                    ...buildUpdateData("heatTransferType", inputs.heatTransferType),
                    ...buildUpdateData("heatTransferTypeKey", inputs.heatTransferTypeKey),
                    ...buildUpdateData("generatorLocation", inputs.generatorLocation),
                    ...buildUpdateData("generatorLocationKey", inputs.generatorLocationKey),
                    ...buildUpdateData("energySource", inputs.energySource),
                    ...buildUpdateData("energySourceKey", inputs.energySourceKey),
                    ...buildUpdateData("electricalSystem", inputs.electricalSystem),
                    ...buildUpdateData("flammableLiquids", inputs.flammableLiquids),
                    ...buildUpdateData("combustibleDust", inputs.combustibleDust),
                    ...buildUpdateData("combustibleDustKey", inputs.combustibleDustKey),
                    ...buildUpdateData("weldingOperations", inputs.weldingOperations),
                    ...buildUpdateData("additionalCarpentryPlastic", inputs.additionalCarpentryPlastic),
                    ...buildUpdateData("specialRisk", inputs.specialRisk),
                    ...buildUpdateData("occupantCount", inputs.occupantCount),
                    ...buildUpdateData("occupantFactor", inputs.occupantFactor),
                    ...buildUpdateData("occupantFactorKey", inputs.occupantFactorKey),
                    ...buildUpdateData("exitWidths", inputs.exitWidths),
                    ...buildUpdateData("exitWidthTotal", inputs.exitWidthTotal),
                    ...buildUpdateData("exitUnitsX", inputs.exitUnitsX),
                    ...buildUpdateData("separatePathsK", inputs.separatePathsK),
                    ...buildUpdateData("mobilityFactor", inputs.mobilityFactor),
                    ...buildUpdateData("exitCountToOpenSpace", inputs.exitCountToOpenSpace),
                    ...buildUpdateData("valueTotal", inputs.valueTotal),
                    ...buildUpdateData("valueYear", inputs.valueYear),
                    ...buildUpdateData("replaceability", inputs.replaceability),
                    ...buildUpdateData("dependencyType", inputs.dependencyType),
                    // Handle dependencyManual: clear it when dependencyType is not "manual"
                    // Use mergedInputs to check the final state after special handling
                    ...buildUpdateData("dependencyManual", mergedInputs.dependencyManual, true), // allowNull to clear when switching from manual to category
                    // Always update calculated values
                    factor_a: calculations.factor_a,
                    factor_t: calculations.factor_t,
                    factor_c: calculations.factor_c,
                    factor_r: calculations.factor_r,
                    factor_d: calculations.factor_d,
                    level_A: calculations.level_A,
                    level_A1: calculations.level_A1,
                    level_A2: calculations.level_A2,
                }
            });

            // Upsert protection factors table with inputs and calculations
            await tx.assessmentProtectionFactors.upsert({
                where: { assessmentId },
                create: {
                    assessmentId,
                    // Input fields
                    waterStorageType: mergedInputs.waterStorageType ?? null,
                    waterCapacity: mergedInputs.waterCapacity ?? null,
                    distributionNetwork: mergedInputs.distributionNetwork ?? null,
                    hydrantCount25: mergedInputs.hydrantCount25 ?? null,
                    hydrantCount3: mergedInputs.hydrantCount3 ?? null,
                    hydrantCount4: mergedInputs.hydrantCount4 ?? null,
                    detectionType: mergedInputs.detectionType ?? null,
                    sprinklerType: mergedInputs.sprinklerType ?? null,
                    fireStationType: mergedInputs.fireStationType ?? null,
                    waterSupplyType: mergedInputs.waterSupplyType ?? null,
                    industrialBrigade: mergedInputs.industrialBrigade ?? null,
                    structureResist: mergedInputs.structureResist ?? null,
                    facadeResist: mergedInputs.facadeResist ?? null,
                    roofResist: mergedInputs.roofResist ?? null,
                    wallResist: mergedInputs.wallResist ?? null,
                    hasManyWindows: mergedInputs.hasManyWindows ?? null,
                    noInternalSeparation: mergedInputs.noInternalSeparation ?? null,
                    combustibleInsulation: mergedInputs.combustibleInsulation ?? null,
                    n1: mergedInputs.n1 ?? null,
                    n2: mergedInputs.n2 ?? null,
                    n3: mergedInputs.n3 ?? null,
                    n4: mergedInputs.n4 ?? null,
                    n5: mergedInputs.n5 ?? null,
                    subcompartment: mergedInputs.subcompartment ?? null,
                    stairways: mergedInputs.stairways ?? null,
                    horizontalExit: mergedInputs.horizontalExit ?? null,
                    sprinklers: mergedInputs.sprinklers ?? null,
                    subCompartmentEI30: mergedInputs.subCompartmentEI30 ?? null,
                    subCompartmentEI60: mergedInputs.subCompartmentEI60 ?? null,
                    partialDetection: mergedInputs.partialDetection ?? null,
                    partialSprinkler: mergedInputs.partialSprinkler ?? null,
                    otherAutoExtinguish: mergedInputs.otherAutoExtinguish ?? null,
                    financialDataBackup: mergedInputs.financialDataBackup ?? null,
                    sparePartsAccess: mergedInputs.sparePartsAccess ?? null,
                    selfRepairCapability: mergedInputs.selfRepairCapability ?? null,
                    relocationAgreements: mergedInputs.relocationAgreements ?? null,
                    multipleProduction: mergedInputs.multipleProduction ?? null,
                    // Calculated factors
                    factor_W: calculations.factor_W,
                    factor_N: calculations.factor_N,
                    factor_S: calculations.factor_S,
                    factor_F: calculations.factor_F,
                    factor_U: calculations.factor_U,
                    factor_Y: calculations.factor_Y,
                    // Calculated levels
                    level_D: calculations.level_D,
                    level_D1: calculations.level_D1,
                    level_D2: calculations.level_D2,
                },
                update: {
                    // Update inputs only if provided
                    ...buildUpdateData("waterStorageType", inputs.waterStorageType),
                    ...buildUpdateData("waterCapacity", inputs.waterCapacity),
                    ...buildUpdateData("distributionNetwork", inputs.distributionNetwork),
                    ...buildUpdateData("hydrantCount25", inputs.hydrantCount25),
                    ...buildUpdateData("hydrantCount3", inputs.hydrantCount3),
                    ...buildUpdateData("hydrantCount4", inputs.hydrantCount4),
                    ...buildUpdateData("detectionType", inputs.detectionType),
                    ...buildUpdateData("sprinklerType", inputs.sprinklerType),
                    ...buildUpdateData("fireStationType", inputs.fireStationType),
                    ...buildUpdateData("waterSupplyType", inputs.waterSupplyType),
                    ...buildUpdateData("industrialBrigade", inputs.industrialBrigade),
                    ...buildUpdateData("structureResist", inputs.structureResist),
                    ...buildUpdateData("facadeResist", inputs.facadeResist),
                    ...buildUpdateData("roofResist", inputs.roofResist),
                    ...buildUpdateData("wallResist", inputs.wallResist),
                    ...buildUpdateData("hasManyWindows", inputs.hasManyWindows),
                    ...buildUpdateData("noInternalSeparation", inputs.noInternalSeparation),
                    ...buildUpdateData("combustibleInsulation", inputs.combustibleInsulation),
                    ...buildUpdateData("n1", inputs.n1),
                    ...buildUpdateData("n2", inputs.n2),
                    ...buildUpdateData("n3", inputs.n3),
                    ...buildUpdateData("n4", inputs.n4),
                    ...buildUpdateData("n5", inputs.n5),
                    ...buildUpdateData("subcompartment", inputs.subcompartment),
                    ...buildUpdateData("stairways", inputs.stairways),
                    ...buildUpdateData("horizontalExit", inputs.horizontalExit),
                    ...buildUpdateData("sprinklers", inputs.sprinklers),
                    ...buildUpdateData("subCompartmentEI30", inputs.subCompartmentEI30),
                    ...buildUpdateData("subCompartmentEI60", inputs.subCompartmentEI60),
                    ...buildUpdateData("partialDetection", inputs.partialDetection),
                    ...buildUpdateData("partialSprinkler", inputs.partialSprinkler),
                    ...buildUpdateData("otherAutoExtinguish", inputs.otherAutoExtinguish),
                    ...buildUpdateData("financialDataBackup", inputs.financialDataBackup),
                    ...buildUpdateData("sparePartsAccess", inputs.sparePartsAccess),
                    ...buildUpdateData("selfRepairCapability", inputs.selfRepairCapability),
                    ...buildUpdateData("relocationAgreements", inputs.relocationAgreements),
                    ...buildUpdateData("multipleProduction", inputs.multipleProduction),
                    // Always update calculated values
                    factor_W: calculations.factor_W,
                    factor_N: calculations.factor_N,
                    factor_S: calculations.factor_S,
                    factor_F: calculations.factor_F,
                    factor_U: calculations.factor_U,
                    factor_Y: calculations.factor_Y,
                    level_D: calculations.level_D,
                    level_D1: calculations.level_D1,
                    level_D2: calculations.level_D2,
                }
            });

            await tx.assessmentFinalRisks.upsert({
                where: { assessmentId },
                create: {
                    assessmentId,
                    factor_Fo: calculations.factor_Fo,
                    risk_Ro: calculations.risk_Ro,
                    final_R: calculations.final_R,
                    final_R1: calculations.final_R1,
                    final_R2: calculations.final_R2,
                    status_R: calculations.status_R,
                    status_R1: calculations.status_R1,
                    status_R2: calculations.status_R2,
                },
                update: {
                    factor_Fo: calculations.factor_Fo,
                    risk_Ro: calculations.risk_Ro,
                    final_R: calculations.final_R,
                    final_R1: calculations.final_R1,
                    final_R2: calculations.final_R2,
                    status_R: calculations.status_R,
                    status_R1: calculations.status_R1,
                    status_R2: calculations.status_R2,
                }
            });

            // Return assessment with all relations
            return await tx.assessment.findUnique({
                where: { id: assessmentId },
                include: {
                    riskFactors: true,
                    acceptanceFactors: true,
                    protectionFactors: true,
                    finalRisks: true,
                }
            });
        });

        // Flatten the assessment for API response
        const flattenedAssessment = flattenAssessment(assessment);
        return { success: true, assessment: flattenedAssessment };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

