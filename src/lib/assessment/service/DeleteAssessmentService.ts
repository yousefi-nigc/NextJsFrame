import { AssessmentServiceResponse } from "../model/Assessment";
import { db } from "@/lib/db";

export async function deleteAssessmentService(assessmentId: string, userId: string): Promise<AssessmentServiceResponse> {
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
            }
        });

        if (!existing) {
            return { success: false, error: new Error("Assessment not found or access denied") };
        }

        await db.assessment.delete({
            where: { id: assessmentId }
        });

        return { success: true };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

