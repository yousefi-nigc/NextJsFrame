import { AssessmentServiceResponse } from "../model/Assessment";
import { db } from "@/lib/db";

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
            where: { floorId }
        });

        if (!assessment) {
            return { success: false, error: new Error("Assessment not found") };
        }

        return { success: true, assessment };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

