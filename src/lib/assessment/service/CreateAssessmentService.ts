import { CreateAssessmentServiceInput, AssessmentServiceResponse } from "../model/Assessment";
import { db } from "@/lib/db";
import { calculateAssessment } from "./AssessmentCalculationService";

export async function createAssessmentService({
    floorId,
    userId,
    inputs
}: CreateAssessmentServiceInput): Promise<AssessmentServiceResponse> {
    try {
        // Verify floor exists and belongs to user's project
        const floor = await db.floor.findFirst({
            where: { id: floorId },
            include: {
                project: {
                    select: { userId: true }
                }
            }
        });

        if (!floor) {
            return { success: false, error: new Error("Floor not found") };
        }

        if (floor.project.userId !== userId) {
            return { success: false, error: new Error("Access denied") };
        }

        // Calculate all factors and results automatically
        // Users only send raw input data - all calculated fields are computed here
        const calculations = calculateAssessment(inputs);

        // Create assessment with all inputs and calculated values
        // Calculated values are stored in the database for reading
        const assessment = await db.assessment.create({
            data: {
                floorId,
                // Inputs
                qi: inputs.qi,
                qm: inputs.qm,
                tempDestruction: inputs.tempDestruction,
                tempDestructionMulti: inputs.tempDestructionMulti ?? null,
                avgDimension: inputs.avgDimension,
                materialClass: inputs.materialClass,
                materialClassMulti: inputs.materialClassMulti ?? null,
                length: inputs.length,
                width: inputs.width,
                area: inputs.area,
                height: inputs.height,
                accessType: inputs.accessType,
                windowArea: inputs.windowArea,
                staticVentArea: inputs.staticVentArea,
                mechVentFlow: inputs.mechVentFlow,
                ventingRatio_k: inputs.ventingRatio_k,
                accessSides: inputs.accessSides,
                heightAbove: inputs.heightAbove,
                depthBelow: inputs.depthBelow,
                mainActivity: inputs.mainActivity,
                secondaryActivity: inputs.secondaryActivity,
                heatTransferType: inputs.heatTransferType,
                generatorLocation: inputs.generatorLocation,
                energySource: inputs.energySource,
                electricalSystem: inputs.electricalSystem,
                flammableLiquids: inputs.flammableLiquids,
                combustibleDust: inputs.combustibleDust,
                occupantCount: inputs.occupantCount,
                occupantFactor: inputs.occupantFactor,
                exitWidthTotal: inputs.exitWidthTotal,
                mobilityFactor: inputs.mobilityFactor,
                valueTotal: inputs.valueTotal,
                valueYear: inputs.valueYear,
                replaceability: inputs.replaceability,
                dependencyType: inputs.dependencyType,
                dependencyManual: inputs.dependencyManual,
                waterStorageType: inputs.waterStorageType,
                waterCapacity: inputs.waterCapacity,
                distributionNetwork: inputs.distributionNetwork,
                hydrantCount25: inputs.hydrantCount25,
                hydrantCount3: inputs.hydrantCount3,
                hydrantCount4: inputs.hydrantCount4,
                detectionType: inputs.detectionType,
                sprinklerType: inputs.sprinklerType,
                fireStationType: inputs.fireStationType,
                waterSupplyType: inputs.waterSupplyType,
                industrialBrigade: inputs.industrialBrigade,
                structureResist: inputs.structureResist,
                facadeResist: inputs.facadeResist,
                roofResist: inputs.roofResist,
                wallResist: inputs.wallResist,
                hasManyWindows: inputs.hasManyWindows,
                noInternalSeparation: inputs.noInternalSeparation,
                combustibleInsulation: inputs.combustibleInsulation,
                n1: inputs.n1,
                n2: inputs.n2,
                n3: inputs.n3,
                n4: inputs.n4,
                n5: inputs.n5,
                subcompartment: inputs.subcompartment,
                stairways: inputs.stairways,
                horizontalExit: inputs.horizontalExit,
                sprinklers: inputs.sprinklers,
                subCompartmentEI30: inputs.subCompartmentEI30,
                subCompartmentEI60: inputs.subCompartmentEI60,
                partialDetection: inputs.partialDetection,
                partialSprinkler: inputs.partialSprinkler,
                otherAutoExtinguish: inputs.otherAutoExtinguish,
                financialDataBackup: inputs.financialDataBackup,
                sparePartsAccess: inputs.sparePartsAccess,
                selfRepairCapability: inputs.selfRepairCapability,
                relocationAgreements: inputs.relocationAgreements,
                multipleProduction: inputs.multipleProduction,
                floorLevel: inputs.floorLevel,
                // Calculated factors
                factor_q: calculations.factor_q,
                factor_i: calculations.factor_i,
                factor_g: calculations.factor_g,
                factor_e: calculations.factor_e,
                factor_v: calculations.factor_v,
                factor_z: calculations.factor_z,
                factor_a: calculations.factor_a,
                factor_t: calculations.factor_t,
                factor_c: calculations.factor_c,
                factor_r: calculations.factor_r,
                factor_d: calculations.factor_d,
                factor_W: calculations.factor_W,
                factor_N: calculations.factor_N,
                factor_S: calculations.factor_S,
                factor_F: calculations.factor_F,
                factor_U: calculations.factor_U,
                factor_Y: calculations.factor_Y,
                // Final scores
                risk_P: calculations.risk_P,
                risk_P1: calculations.risk_P1,
                risk_P2: calculations.risk_P2,
                level_A: calculations.level_A,
                level_A1: calculations.level_A1,
                level_A2: calculations.level_A2,
                level_D: calculations.level_D,
                level_D1: calculations.level_D1,
                level_D2: calculations.level_D2,
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

        return { success: true, assessment };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

