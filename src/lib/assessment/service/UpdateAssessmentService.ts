import { UpdateAssessmentServiceInput, AssessmentServiceResponse } from "../model/Assessment";
import { db } from "@/lib/db";
import { calculateAssessment } from "./AssessmentCalculationService";

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
                floor: true
            }
        });

        if (!existing) {
            return { success: false, error: new Error("Assessment not found or access denied") };
        }

        // Get current values and merge with updates
        const currentInputs = {
            qi: existing.qi ?? undefined,
            qm: existing.qm ?? undefined,
            tempDestruction: existing.tempDestruction ?? undefined,
            avgDimension: existing.avgDimension ?? undefined,
            materialClass: existing.materialClass ?? undefined,
            length: existing.length ?? undefined,
            width: existing.width ?? undefined,
            area: existing.area ?? undefined,
            height: existing.height ?? undefined,
            accessType: existing.accessType ?? undefined,
            windowArea: existing.windowArea ?? undefined,
            staticVentArea: existing.staticVentArea ?? undefined,
            mechVentFlow: existing.mechVentFlow ?? undefined,
            ventingRatio_k: existing.ventingRatio_k ?? undefined,
            accessSides: existing.accessSides ?? undefined,
            heightAbove: existing.heightAbove ?? undefined,
            depthBelow: existing.depthBelow ?? undefined,
            mainActivity: existing.mainActivity ?? undefined,
            occupantCount: existing.occupantCount ?? undefined,
            occupantFactor: existing.occupantFactor ?? undefined,
            exitWidthTotal: existing.exitWidthTotal ?? undefined,
            mobilityFactor: existing.mobilityFactor ?? undefined,
            valueTotal: existing.valueTotal ?? undefined,
            valueYear: existing.valueYear ?? undefined,
            replaceability: existing.replaceability ?? undefined,
            dependencyType: existing.dependencyType ?? undefined,
            dependencyManual: existing.dependencyManual ?? undefined,
            waterStorageType: existing.waterStorageType ?? undefined,
            waterCapacity: existing.waterCapacity ?? undefined,
            hydrantCount25: existing.hydrantCount25 ?? undefined,
            hydrantCount3: existing.hydrantCount3 ?? undefined,
            hydrantCount4: existing.hydrantCount4 ?? undefined,
            detectionType: existing.detectionType ?? undefined,
            sprinklerType: existing.sprinklerType ?? undefined,
            fireStationType: existing.fireStationType ?? undefined,
            structureResist: existing.structureResist ?? undefined,
            facadeResist: existing.facadeResist ?? undefined,
            roofResist: existing.roofResist ?? undefined,
            wallResist: existing.wallResist ?? undefined,
            floorLevel: (existing as any).floorLevel ?? existing.floor.level ?? undefined,
        };

        // Merge with new inputs (only override defined values, not undefined or null)
        // This ensures that if a field is not sent, it won't overwrite existing values
        const mergedInputs: any = { ...currentInputs };
        Object.keys(inputs).forEach(key => {
            const value = inputs[key as keyof typeof inputs];
            // Only update if value is explicitly provided (not undefined and not null)
            // This prevents accidental overwriting of existing values
            if (value !== undefined && value !== null) {
                mergedInputs[key] = value;
            }
        });

        // Recalculate all factors automatically based on merged inputs
        // Users only send raw input data - all calculated fields are recomputed here
        const calculations = calculateAssessment(mergedInputs);

        // Update assessment with new inputs and recalculated values
        // Calculated values are always updated and stored in the database
        // Only update input fields that are explicitly provided (not undefined and not null)
        // This ensures optional fields that aren't sent won't overwrite existing values
        const assessment = await db.assessment.update({
            where: { id: assessmentId },
            data: {
                // Update inputs - only if explicitly provided (not undefined and not null)
                ...(inputs.qi !== undefined && inputs.qi !== null && { qi: inputs.qi }),
                ...(inputs.qm !== undefined && inputs.qm !== null && { qm: inputs.qm }),
                ...(inputs.tempDestruction !== undefined && inputs.tempDestruction !== null && { tempDestruction: inputs.tempDestruction }),
                ...(inputs.avgDimension !== undefined && inputs.avgDimension !== null && { avgDimension: inputs.avgDimension }),
                ...(inputs.materialClass !== undefined && inputs.materialClass !== null && { materialClass: inputs.materialClass }),
                ...(inputs.length !== undefined && inputs.length !== null && { length: inputs.length }),
                ...(inputs.width !== undefined && inputs.width !== null && { width: inputs.width }),
                ...(inputs.area !== undefined && inputs.area !== null && { area: inputs.area }),
                ...(inputs.height !== undefined && inputs.height !== null && { height: inputs.height }),
                ...(inputs.accessType !== undefined && inputs.accessType !== null && { accessType: inputs.accessType }),
                ...(inputs.windowArea !== undefined && inputs.windowArea !== null && { windowArea: inputs.windowArea }),
                ...(inputs.staticVentArea !== undefined && inputs.staticVentArea !== null && { staticVentArea: inputs.staticVentArea }),
                ...(inputs.mechVentFlow !== undefined && inputs.mechVentFlow !== null && { mechVentFlow: inputs.mechVentFlow }),
                ...(inputs.ventingRatio_k !== undefined && inputs.ventingRatio_k !== null && { ventingRatio_k: inputs.ventingRatio_k }),
                ...(inputs.accessSides !== undefined && inputs.accessSides !== null && { accessSides: inputs.accessSides }),
                ...(inputs.heightAbove !== undefined && inputs.heightAbove !== null && { heightAbove: inputs.heightAbove }),
                ...(inputs.depthBelow !== undefined && inputs.depthBelow !== null && { depthBelow: inputs.depthBelow }),
                ...(inputs.mainActivity !== undefined && inputs.mainActivity !== null && { mainActivity: inputs.mainActivity }),
                ...(inputs.occupantCount !== undefined && inputs.occupantCount !== null && { occupantCount: inputs.occupantCount }),
                ...(inputs.occupantFactor !== undefined && inputs.occupantFactor !== null && { occupantFactor: inputs.occupantFactor }),
                ...(inputs.exitWidthTotal !== undefined && inputs.exitWidthTotal !== null && { exitWidthTotal: inputs.exitWidthTotal }),
                ...(inputs.mobilityFactor !== undefined && inputs.mobilityFactor !== null && { mobilityFactor: inputs.mobilityFactor }),
                ...(inputs.valueTotal !== undefined && inputs.valueTotal !== null && { valueTotal: inputs.valueTotal }),
                ...(inputs.valueYear !== undefined && inputs.valueYear !== null && { valueYear: inputs.valueYear }),
                ...(inputs.replaceability !== undefined && inputs.replaceability !== null && { replaceability: inputs.replaceability }),
                ...(inputs.dependencyType !== undefined && inputs.dependencyType !== null && { dependencyType: inputs.dependencyType }),
                ...(inputs.dependencyManual !== undefined && inputs.dependencyManual !== null && { dependencyManual: inputs.dependencyManual }),
                ...(inputs.waterStorageType !== undefined && inputs.waterStorageType !== null && { waterStorageType: inputs.waterStorageType }),
                ...(inputs.waterCapacity !== undefined && inputs.waterCapacity !== null && { waterCapacity: inputs.waterCapacity }),
                ...(inputs.hydrantCount25 !== undefined && inputs.hydrantCount25 !== null && { hydrantCount25: inputs.hydrantCount25 }),
                ...(inputs.hydrantCount3 !== undefined && inputs.hydrantCount3 !== null && { hydrantCount3: inputs.hydrantCount3 }),
                ...(inputs.hydrantCount4 !== undefined && inputs.hydrantCount4 !== null && { hydrantCount4: inputs.hydrantCount4 }),
                ...(inputs.detectionType !== undefined && inputs.detectionType !== null && { detectionType: inputs.detectionType }),
                ...(inputs.sprinklerType !== undefined && inputs.sprinklerType !== null && { sprinklerType: inputs.sprinklerType }),
                ...(inputs.fireStationType !== undefined && inputs.fireStationType !== null && { fireStationType: inputs.fireStationType }),
                ...(inputs.structureResist !== undefined && inputs.structureResist !== null && { structureResist: inputs.structureResist }),
                ...(inputs.facadeResist !== undefined && inputs.facadeResist !== null && { facadeResist: inputs.facadeResist }),
                ...(inputs.roofResist !== undefined && inputs.roofResist !== null && { roofResist: inputs.roofResist }),
                ...(inputs.wallResist !== undefined && inputs.wallResist !== null && { wallResist: inputs.wallResist }),
                ...(inputs.floorLevel !== undefined && inputs.floorLevel !== null && { floorLevel: inputs.floorLevel }),
                // Always update calculated values
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

