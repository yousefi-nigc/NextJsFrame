import { getSession } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";
import { updateAssessmentValidationSchema } from "../model/Assessment";
import { updateAssessmentService } from "../service/UpdateAssessmentService";
import { isValidUUID } from "@/lib/utils";

export async function updateAssessmentController(request: NextRequest, assessmentId: string, floorId: string) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // Validate UUID formats
    if (!isValidUUID(assessmentId)) {
        return NextResponse.json(
            { error: "Invalid assessment ID format" },
            { status: 400 }
        );
    }

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

    // Call the service
    const result = await updateAssessmentService({
        assessmentId,
        floorId,
        userId: session.user.id,
        inputs: validation.data
    });

    // If result was successful
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
            { status: result.error?.message === "Assessment not found or access denied" ? 404 : 400 }
        );
    }
}

