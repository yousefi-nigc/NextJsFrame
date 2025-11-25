import { GetProjectServiceResponse } from "../model/Project";
import { db } from "@/lib/db";

export async function getProjectService(projectId: string, userId: string): Promise<GetProjectServiceResponse> {
    try {
        const project = await db.project.findFirst({
            where: {
                id: projectId,
                userId: userId, // Ensure user owns the project
            },
        });

        if (!project) {
            return { success: false, error: new Error("Project not found") };
        }

        return { success: true, project };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

export async function getAllProjectsService(userId: string): Promise<GetProjectServiceResponse> {
    try {
        const projects = await db.project.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return { success: true, projects };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

