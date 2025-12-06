import { NextRequest, NextResponse } from "next/server";
import { getAssessmentController } from "@/lib/assessment/controller/GetAssessmentController";
import { updateAssessmentController } from "@/lib/assessment/controller/UpdateAssessmentController";
import { deleteAssessmentController } from "@/lib/assessment/controller/DeleteAssessmentController";
import { db } from "@/lib/db";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ projectId: string; floorId: string }> }
) {
    try {
        return await getAssessmentController(request, (await params).floorId);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ projectId: string; floorId: string }>}
) {
    try {
        // Update or create assessment (upsert)
        return await updateAssessmentController(request, (await params).floorId);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ projectId: string; floorId: string }> }
) {
    try {
        // Get assessmentId from floorId (one-to-one relationship)
        const assessment = await db.assessment.findUnique({
            where: { floorId: (await params).floorId },
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

