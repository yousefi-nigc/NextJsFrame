import { getSession } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";
import { getAssessmentService } from "../service/GetAssessmentService";
import { isValidUUID } from "@/lib/utils";

export async function getAssessmentController(request: NextRequest, floorId: string) {
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

    const result = await getAssessmentService(floorId, session.user.id);

    if (result.success && result.assessment) {
        return NextResponse.json(
            {
                success: true,
                assessment: result.assessment
            },
            { status: 200 }
        );
    } else {
        const error = result.error as Error;
        return NextResponse.json(
            { error: error.message || "Assessment not found" },
            { status: 404 }
        );
    }
}

