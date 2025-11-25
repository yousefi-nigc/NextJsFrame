import { z } from "zod";

export const createFloorValidationSchema = z.object({
    name: z.string().min(1, "Name is required").trim(),
    level: z.number().min(-100).max(1000), // Floor level can be negative (basement) or positive
    description: z.string().optional(),
    projectId: z.string().uuid("Invalid project ID format"),
});

export type CreateFloorValidationSchema = z.infer<typeof createFloorValidationSchema>;

export type CreateFloorServiceInput = {
    name: string;
    level: number;
    description: string | undefined;
    projectId: string;
}

export type CreateFloorServiceResponse = {
    success: boolean;
    floor?: {
        id: string;
        name: string;
        level: number;
        description: string | null;
        projectId: string;
        createdAt: Date;
        updatedAt: Date;
    };
    error?: Error;
}

export const updateFloorValidationSchema = z.object({
    name: z.string().min(1, "Name cannot be empty").trim().optional(),
    level: z.number().min(-100).max(1000).optional(),
    description: z.string().optional(),
}).refine(
    (data) => data.name !== undefined || data.level !== undefined || data.description !== undefined,
    {
        message: "At least one field must be provided for update",
    }
);

export type UpdateFloorValidationSchema = z.infer<typeof updateFloorValidationSchema>;

export type UpdateFloorServiceInput = {
    floorId: string;
    projectId: string;
    userId: string;
    name?: string;
    level?: number;
    description?: string | null;
}

export type GetFloorServiceResponse = {
    success: boolean;
    floor?: {
        id: string;
        name: string;
        level: number;
        description: string | null;
        projectId: string;
        createdAt: Date;
        updatedAt: Date;
    };
    floors?: Array<{
        id: string;
        name: string;
        level: number;
        description: string | null;
        projectId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    error?: Error;
}

export type DeleteFloorServiceResponse = {
    success: boolean;
    error?: Error;
}

