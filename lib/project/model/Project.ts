import { z } from "zod";

export const createProjectValidationSchema = z.object({
    name: z.string().min(1, "Name is required").trim(),
    description: z.string().optional(),
    address: z.string().optional(),
});

export type CreateProjectValidationSchema = z.infer<typeof createProjectValidationSchema>;

export type CreateProjectServiceInput = {
    name: string;
    description: string | undefined;
    address: string | undefined;
    userId: string;
}

export type CreateProjectServiceResponse = {
    success: boolean;
    project?: {
        id: string;
        name: string;
        address: string | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    error?: Error;
}

export const updateProjectValidationSchema = z.object({
    name: z.string().min(1, "Name cannot be empty").trim().optional(),
    description: z.string().optional(),
    address: z.string().optional(),
}).refine(
    (data) => data.name !== undefined || data.description !== undefined || data.address !== undefined,
    {
        message: "At least one field must be provided for update",
    }
);

export type UpdateProjectValidationSchema = z.infer<typeof updateProjectValidationSchema>;

export type UpdateProjectServiceInput = {
    projectId: string;
    userId: string;
    name?: string;
    description?: string | null;
    address?: string | null;
}

export type GetProjectServiceResponse = {
    success: boolean;
    project?: {
        id: string;
        name: string;
        address: string | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    };
    projects?: Array<{
        id: string;
        name: string;
        address: string | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    error?: Error;
}

export type DeleteProjectServiceResponse = {
    success: boolean;
    error?: Error;
}