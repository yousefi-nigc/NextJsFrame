import { UpdateFloorServiceInput, GetFloorServiceResponse } from "../model/Floor";
import { db } from "@/lib/db";

export async function updateFloorService({ floorId, projectId, userId, name, level, description }: UpdateFloorServiceInput): Promise<GetFloorServiceResponse> {
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

        // Build update data object with only provided fields
        const updateData: {
            name?: string;
            level?: number;
            description?: string | null;
        } = {};

        if (name !== undefined) updateData.name = name;
        if (level !== undefined) updateData.level = level;
        if (description !== undefined) updateData.description = description || null;

        // Check if there are any fields to update
        if (Object.keys(updateData).length === 0) {
            return { success: false, error: new Error("No fields provided for update") };
        }

        const floor = await db.floor.update({
            where: {
                id: floorId,
            },
            data: updateData,
        });

        return { success: true, floor };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

