import { NextRequest, NextResponse } from "next/server";
import { getProjectController } from "@/lib/project/controller/GetProjectController";
import { updateProjectController } from "@/lib/project/controller/UpdateProjectController";
import { deleteProjectController } from "@/lib/project/controller/DeleteProjectController";

export async function GET(
    request: NextRequest,
    { params }: { params: { projectId: string } }
) {
    try {
        return await getProjectController(request, params.projectId);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { projectId: string } }
) {
    try {
        return await updateProjectController(request, params.projectId);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { projectId: string } }
) {
    try {
        return await deleteProjectController(request, params.projectId);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}


