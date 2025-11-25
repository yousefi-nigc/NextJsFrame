import { getSession } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";
import { deleteFloorService } from "../service/DeleteFloorService";
import { isValidUUID } from "@/lib/utils";

export async function deleteFloorController(request: NextRequest, projectId: string, floorId: string) {
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

    // Call the service
    const result = await deleteFloorService(floorId, projectId, session.user.id);

    // If result was successful
    if (result.success) {
        return NextResponse.json(
            {
                success: true,
                message: "Floor deleted successfully",
            },
            { status: 200 }
        );
    } else {
        const error = result.error as Error;
        return NextResponse.json(
            { error: error.message || "Failed to delete floor" },
            { status: error.message === "Floor not found" ? 404 : 400 }
        );
    }
}

