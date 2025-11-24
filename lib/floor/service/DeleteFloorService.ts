import { DeleteFloorServiceResponse } from "../model/Floor";
import { db } from "@/lib/db";

export async function deleteFloorService(floorId: string, projectId: string, userId: string): Promise<DeleteFloorServiceResponse> {
    try {
        // First verify the project belongs to the user
        const project = await db.project.findFirst({
            where: {
                id: projectId,
                userId: userId,
            },
        });

        if (!project) {
            return { success: false, error: new Error("Project not found or access denied") };
        }

        // Verify the floor exists and belongs to the project
        const existingFloor = await db.floor.findFirst({
            where: {
                id: floorId,
                projectId: projectId,
            },
        });

        if (!existingFloor) {
            return { success: false, error: new Error("Floor not found") };
        }

        await db.floor.delete({
            where: {
                id: floorId,
            },
        });

        return { success: true };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

