import { getSession } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";
import { getFloorService, getAllFloorsService } from "../service/GetFloorService";
import { isValidUUID } from "@/lib/utils";

export async function getFloorController(request: NextRequest, projectId: string, floorId: string) {
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

    const result = await getFloorService(floorId, projectId, session.user.id);

    if (result.success && result.floor) {
        return NextResponse.json(
            {
                success: true,
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
            { error: error.message || "Floor not found" },
            { status: 404 }
        );
    }
}

export async function getAllFloorsController(request: NextRequest, projectId: string) {
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

    const result = await getAllFloorsService(projectId, session.user.id);

    if (result.success && result.floors) {
        return NextResponse.json(
            {
                success: true,
                floors: result.floors.map(floor => ({
                    id: floor.id,
                    name: floor.name,
                    level: floor.level,
                    description: floor.description,
                    projectId: floor.projectId,
                    createdAt: floor.createdAt,
                    updatedAt: floor.updatedAt,
                })),
            },
            { status: 200 }
        );
    } else {
        const error = result.error as Error;
        return NextResponse.json(
            { error: error.message || "Failed to fetch floors" },
            { status: 400 }
        );
    }
}

