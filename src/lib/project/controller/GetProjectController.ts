import { getSession } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";
import { getProjectService, getAllProjectsService } from "../service/GetProjectService";
import { isValidUUID } from "@/lib/utils";

export async function getProjectController(request: NextRequest, projectId: string) {
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

    const result = await getProjectService(projectId, session.user.id);

    if (result.success && result.project) {
        return NextResponse.json(
            {
                success: true,
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
            { error: error.message || "Project not found" },
            { status: 404 }
        );
    }
}

export async function getAllProjectsController(request: NextRequest) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const result = await getAllProjectsService(session.user.id);

    if (result.success && result.projects) {
        return NextResponse.json(
            {
                success: true,
                projects: result.projects.map(project => ({
                    id: project.id,
                    name: project.name,
                    address: project.address,
                    description: project.description,
                    createdAt: project.createdAt,
                    updatedAt: project.updatedAt,
                })),
            },
            { status: 200 }
        );
    } else {
        const error = result.error as Error;
        return NextResponse.json(
            { error: error.message || "Failed to fetch projects" },
            { status: 400 }
        );
    }
}

