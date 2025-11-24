import { getSession } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";
import { updateFloorValidationSchema } from "../model/Floor";
import { updateFloorService } from "../service/UpdateFloorService";
import { isValidUUID } from "@/lib/utils";

export async function updateFloorController(request: NextRequest, projectId: string, floorId: string) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // Validate UUID formats
    if (!isValidUUID(projectId)) {
        return NextResponse.json(
            { error: "Invalid project ID format" },
            { status: 400 }
        );
    }

    if (!isValidUUID(floorId)) {
        return NextResponse.json(
            { error: "Invalid floor ID format" },
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

    const validation = updateFloorValidationSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(
            { error: validation.error.message },
            { status: 400 }
        );
    }

    // Call the service
    const result = await updateFloorService({
        floorId,
        projectId,
        userId: session.user.id,
        name: validation.data.name,
        level: validation.data.level,
        description: validation.data.description,
    });

    // If result was successful
    if (result.success && result.floor) {
        return NextResponse.json(
            {
                success: true,
                message: "Floor updated successfully",
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
            { status: 200 }
        );
    } else {
        const error = result.error as Error;
        return NextResponse.json(
            { error: error.message || "Failed to update floor" },
            { status: result.error?.message === "Floor not found" ? 404 : 400 }
        );
    }
}

