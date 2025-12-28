import { AssessmentServiceResponse } from "../model/Assessment";
import { db } from "@/lib/db";
import { flattenAssessment } from "../utils/flattenAssessment";

export async function getAssessmentService(floorId: string, userId: string): Promise<AssessmentServiceResponse> {
    try {
        // Verify floor belongs to user's project
        const floor = await db.floor.findFirst({
            where: {
                id: floorId,
                project: {
                    userId: userId
                }
            }
        });

        if (!floor) {
            return { success: false, error: new Error("Floor not found or access denied") };
        }

        const assessment = await db.assessment.findUnique({
            where: { floorId },
            include: {
                riskFactors: true,
                acceptanceFactors: true,
                protectionFactors: true,
                potentialRisks: true,
                acceptableLevels: true,
                protectionLevels: true,
                finalRisks: true,
            }
        });

        if (!assessment) {
            return { success: false, error: new Error("Assessment not found") };
        }

        // Flatten the assessment for API response
        const flattenedAssessment = flattenAssessment(assessment);
        return { success: true, assessment: flattenedAssessment };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

