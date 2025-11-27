import { getSession } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";
import { deleteAssessmentService } from "../service/DeleteAssessmentService";
import { isValidUUID } from "@/lib/utils";

export async function deleteAssessmentController(request: NextRequest, assessmentId: string) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // Validate UUID format
    if (!isValidUUID(assessmentId)) {
        return NextResponse.json(
            { error: "Invalid assessment ID format" },
            { status: 400 }
        );
    }

    // Call the service
    const result = await deleteAssessmentService(assessmentId, session.user.id);

    // If result was successful
    if (result.success) {
        return NextResponse.json(
            {
                success: true,
                message: "Assessment deleted successfully"
            },
            { status: 200 }
        );
    } else {
        const error = result.error as Error;
        return NextResponse.json(
            { error: error.message || "Failed to delete assessment" },
            { status: error.message === "Assessment not found or access denied" ? 404 : 400 }
        );
    }
}

