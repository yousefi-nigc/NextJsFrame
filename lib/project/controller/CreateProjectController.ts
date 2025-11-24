import { getSession } from "@/lib/auth-server";
import { NextRequest, NextResponse } from "next/server";
import { createProjectValidationSchema } from "../model/Project";
import { createProjectService } from "../service/CreateProjectService";

export async function createProjectController(request: NextRequest) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    //Validate the request
    let body;
    try {
        body = await request.json();
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid JSON in request body" },
            { status: 400 }
        );
    }

    const validation = createProjectValidationSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(
            { error: validation.error.message },
            { status: 400 }
        );
    }

    // Call the service here.
    const result = await createProjectService({
        name: validation.data.name,
        description: validation.data.description,
        address: validation.data.address,
        userId: session.user.id
    });

    // If result was successfull
    if (result.success) {
        return NextResponse.json(
            {
                success: true,
                message: "Project created successfully",
                project: {
                    id: result.project?.id,
                    name: result.project?.name,
                    address: result.project?.address,
                    description: result.project?.description,
                    createdAt: result.project?.createdAt,
                },
            },
            { status: 201 }
        );
        // if the request was not successfull, return the error
    } else {
        const error = result.error as Error;
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}