import { getSession } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";
import { deleteProjectService } from "../service/DeleteProjectService";
import { isValidUUID } from "@/lib/utils";

export async function deleteProjectController(request: NextRequest, projectId: string) {
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

    // Call the service
    const result = await deleteProjectService(projectId, session.user.id);

    // If result was successful
    if (result.success) {
        return NextResponse.json(
            {
                success: true,
                message: "Project deleted successfully",
            },
            { status: 200 }
        );
    } else {
        const error = result.error as Error;
        return NextResponse.json(
            { error: error.message || "Failed to delete project" },
            { status: error.message === "Project not found" ? 404 : 400 }
        );
    }
}

