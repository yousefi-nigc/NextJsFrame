import { getSession } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";
import { updateProjectValidationSchema } from "../model/Project";
import { updateProjectService } from "../service/UpdateProjectService";
import { isValidUUID } from "@/lib/utils";

export async function updateProjectController(request: NextRequest, projectId: string) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // Validate UUID format
    if (!isValidUUID(projectId)) {
        return NextResponse.json(
            { error: "Invalid project ID format" },
            { status: 400 }
        );
    }

    // Validate the request
    let body;
    try {
        body = await request.json();
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid JSON in request body" },
            { status: 400 }
        );
    }

    const validation = updateProjectValidationSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(
            { error: validation.error.message },
            { status: 400 }
        );
    }

    // Call the service
    const result = await updateProjectService({
        projectId,
        userId: session.user.id,
        name: validation.data.name,
        description: validation.data.description,
        address: validation.data.address,
    });

    // If result was successful
    if (result.success && result.project) {
        return NextResponse.json(
            {
                success: true,
                message: "Project updated successfully",
                project: {
                    id: result.project.id,
                    name: result.project.name,
                    address: result.project.address,
                    description: result.project.description,
                    createdAt: result.project.createdAt,
                    updatedAt: result.project.updatedAt,
                },
            },
            { status: 200 }
        );
    } else {
        const error = result.error as Error;
        return NextResponse.json(
            { error: error.message || "Failed to update project" },
            { status: result.error?.message === "Project not found" ? 404 : 400 }
        );
    }
}

