import { NextRequest, NextResponse } from "next/server";
import { createProjectController } from "@/lib/project/controller/CreateProjectController";
import { getAllProjectsController } from "@/lib/project/controller/GetProjectController";

export async function POST(request: NextRequest) {
    try {
        return await createProjectController(request);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        return await getAllProjectsController(request);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

