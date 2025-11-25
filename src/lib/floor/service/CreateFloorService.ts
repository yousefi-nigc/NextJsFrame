import { CreateFloorServiceInput, CreateFloorServiceResponse } from "../model/Floor";
import { db } from "@/lib/db";

export async function createFloorService({ name, level, description, projectId }: CreateFloorServiceInput): Promise<CreateFloorServiceResponse> {
    try {
        // Verify project exists
        const project = await db.project.findUnique({
            where: { id: projectId },
        });

        if (!project) {
            return { success: false, error: new Error("Project not found") };
        }

        const floor = await db.floor.create({
            data: {
                name,
                level,
                description: description || null,
                projectId,
            },
        });

        return { success: true, floor };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

