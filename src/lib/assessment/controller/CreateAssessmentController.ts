import { getSession } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";
import { createAssessmentValidationSchema } from "../model/Assessment";
import { createAssessmentService } from "../service/CreateAssessmentService";
import { isValidUUID } from "@/lib/utils";

export async function createAssessmentController(request: NextRequest, floorId: string) {
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

    const validation = createAssessmentValidationSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(
            { error: validation.error.message },
            { status: 400 }
        );
    }

    // Call the service
    const result = await createAssessmentService({
        floorId,
        userId: session.user.id,
        inputs: validation.data
    });

    // If result was successful
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

