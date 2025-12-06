import { getSession } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";
import { updateAssessmentValidationSchema } from "../model/Assessment";
import { updateAssessmentService } from "../service/UpdateAssessmentService";
import { createAssessmentService } from "../service/CreateAssessmentService";
import { isValidUUID } from "@/lib/utils";
import { db } from "@/lib/db";

export async function updateAssessmentController(request: NextRequest, floorId: string) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // Validate UUID format
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

    const validation = updateAssessmentValidationSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(
            { error: validation.error.message },
            { status: 400 }
        );
    }

    // Check if assessment exists for this floor
    const existingAssessment = await db.assessment.findUnique({
        where: { floorId },
        select: { id: true }
    });

    if (existingAssessment) {
        // Assessment exists - update it
        const result = await updateAssessmentService({
            assessmentId: existingAssessment.id,
            floorId,
            userId: session.user.id,
            inputs: validation.data
        });

        if (result.success && result.assessment) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Assessment updated successfully",
                    assessment: result.assessment
                },
                { status: 200 }
            );
        } else {
            const error = result.error as Error;
            return NextResponse.json(
                { error: error.message || "Failed to update assessment" },
                { status: 400 }
            );
        }
    } else {
        // Assessment doesn't exist - create it
        // For creation, we need to provide all fields (even if they're undefined)
        // The create service will handle undefined values
        const result = await createAssessmentService({
            floorId,
            userId: session.user.id,
            inputs: validation.data
        });

        if (result.success && result.assessment) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Assessment created successfully",
                    assessment: result.assessment
                },
                { status: 201 }
            );
        } else {
            const error = result.error as Error;
            return NextResponse.json(
                { error: error.message || "Failed to create assessment" },
                { status: 400 }
            );
        }
    }
}

