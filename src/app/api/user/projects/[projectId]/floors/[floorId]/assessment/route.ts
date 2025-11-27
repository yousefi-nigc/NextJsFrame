import { NextRequest, NextResponse } from "next/server";
import { getAssessmentController } from "@/lib/assessment/controller/GetAssessmentController";
import { createAssessmentController } from "@/lib/assessment/controller/CreateAssessmentController";
import { updateAssessmentController } from "@/lib/assessment/controller/UpdateAssessmentController";
import { deleteAssessmentController } from "@/lib/assessment/controller/DeleteAssessmentController";
import { db } from "@/lib/db";

export async function GET(
    request: NextRequest,
    { params }: { params: { projectId: string; floorId: string } }
) {
    try {
        return await getAssessmentController(request, params.floorId);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { projectId: string; floorId: string } }
) {
    try {
        return await createAssessmentController(request, params.floorId);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { projectId: string; floorId: string } }
) {
    try {
        // Get assessmentId from floorId (one-to-one relationship)
        const assessment = await db.assessment.findUnique({
            where: { floorId: params.floorId },
            select: { id: true }
        });

        if (!assessment) {
            return NextResponse.json(
                { error: "Assessment not found for this floor" },
                { status: 404 }
            );
        }

        return await updateAssessmentController(request, assessment.id, params.floorId);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { projectId: string; floorId: string } }
) {
    try {
        // Get assessmentId from floorId (one-to-one relationship)
        const assessment = await db.assessment.findUnique({
            where: { floorId: params.floorId },
            select: { id: true }
        });

        if (!assessment) {
            return NextResponse.json(
                { error: "Assessment not found for this floor" },
                { status: 404 }
            );
        }

        return await deleteAssessmentController(request, assessment.id);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

