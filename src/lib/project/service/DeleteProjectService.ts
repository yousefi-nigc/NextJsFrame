import { DeleteProjectServiceResponse } from "../model/Project";
import { db } from "@/lib/db";

export async function deleteProjectService(projectId: string, userId: string): Promise<DeleteProjectServiceResponse> {
    try {
        // First verify the project exists and belongs to the user
        const existingProject = await db.project.findFirst({
            where: {
                id: projectId,
                userId: userId,
            },
        });

        if (!existingProject) {
            return { success: false, error: new Error("Project not found") };
        }

        await db.project.delete({
            where: {
                id: projectId,
            },
        });

        return { success: true };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

