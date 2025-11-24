import { NextRequest, NextResponse } from "next/server";
import { createFloorController } from "@/lib/floor/controller/CreateFloorController";
import { getAllFloorsController } from "@/lib/floor/controller/GetFloorController";

export async function POST(
    request: NextRequest,
    { params }: { params: { projectId: string } }
) {
    try {
        return await createFloorController(request, params.projectId);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: { projectId: string } }
) {
    try {
        return await getAllFloorsController(request, params.projectId);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

