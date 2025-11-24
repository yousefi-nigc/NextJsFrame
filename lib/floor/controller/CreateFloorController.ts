import { getSession } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";
import { createFloorValidationSchema } from "../model/Floor";
import { createFloorService } from "../service/CreateFloorService";
import { isValidUUID } from "@/lib/utils";
import { db } from "@/lib/db";

export async function createFloorController(request: NextRequest, projectId: string) {
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

    // Override projectId from URL parameter
    body.projectId = projectId;

    const validation = createFloorValidationSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(
            { error: validation.error.message },
            { status: 400 }
        );
    }

    // Verify project belongs to user before creating floor
    const project = await db.project.findFirst({
        where: {
            id: projectId,
            userId: session.user.id,
        },
    });

    if (!project) {
        return NextResponse.json(
            { error: "Project not found or access denied" },
            { status: 404 }
        );
    }

    // Call the service
    const result = await createFloorService({
        name: validation.data.name,
        level: validation.data.level,
        description: validation.data.description,
        projectId: validation.data.projectId,
    });

    // If result was successful
    if (result.success && result.floor) {
        return NextResponse.json(
            {
                success: true,
                message: "Floor created successfully",
                floor: {
                    id: result.floor.id,
                    name: result.floor.name,
                    level: result.floor.level,
                    description: result.floor.description,
                    projectId: result.floor.projectId,
                    createdAt: result.floor.createdAt,
                    updatedAt: result.floor.updatedAt,
                },
            },
            { status: 201 }
        );
    } else {
        const error = result.error as Error;
        return NextResponse.json(
            { error: error.message || "Failed to create floor" },
            { status: 400 }
        );
    }
}

