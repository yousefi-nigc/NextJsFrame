import { UpdateProjectServiceInput, GetProjectServiceResponse } from "../model/Project";
import { db } from "@/lib/db";

export async function updateProjectService({ projectId, userId, name, description, address }: UpdateProjectServiceInput): Promise<GetProjectServiceResponse> {
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

        // Build update data object with only provided fields
        const updateData: {
            name?: string;
            description?: string | null;
            address?: string | null;
        } = {};

        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description || null;
        if (address !== undefined) updateData.address = address || null;

        // Check if there are any fields to update
        if (Object.keys(updateData).length === 0) {
            return { success: false, error: new Error("No fields provided for update") };
        }

        const project = await db.project.update({
            where: {
                id: projectId,
            },
            data: updateData,
        });

        return { success: true, project };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

