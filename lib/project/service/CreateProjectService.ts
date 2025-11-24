import { CreateProjectServiceInput, CreateProjectServiceResponse } from "../model/Project";
import { db } from "@/lib/db";

export async function createProjectService({ name, description, address, userId }: CreateProjectServiceInput): Promise<CreateProjectServiceResponse> {
    try {
        const project = await db.project.create({
            data: { 
                name, 
                description: description || null, 
                address: address || null, 
                userId 
            },
        });
        return { success: true, project };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}