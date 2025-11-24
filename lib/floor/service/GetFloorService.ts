import { GetFloorServiceResponse } from "../model/Floor";
import { db } from "@/lib/db";

export async function getFloorService(floorId: string, projectId: string, userId: string): Promise<GetFloorServiceResponse> {
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

        const floor = await db.floor.findFirst({
            where: {
                id: floorId,
                projectId: projectId,
            },
        });

        if (!floor) {
            return { success: false, error: new Error("Floor not found") };
        }

        return { success: true, floor };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

export async function getAllFloorsService(projectId: string, userId: string): Promise<GetFloorServiceResponse> {
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

        const floors = await db.floor.findMany({
            where: {
                projectId: projectId,
            },
            orderBy: {
                level: "asc", // Order by floor level
            },
        });

        return { success: true, floors };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

