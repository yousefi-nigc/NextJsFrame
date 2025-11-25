import { NextRequest, NextResponse } from "next/server";
import { createFloorController } from "@/lib/floor/controller/CreateFloorController";
import { getAllFloorsController } from "@/lib/floor/controller/GetFloorController";
import { getProjectController } from "@/lib/project/controller/GetProjectController";
import { updateProjectController } from "@/lib/project/controller/UpdateProjectController";
import { deleteProjectController } from "@/lib/project/controller/DeleteProjectController";

// ----- Project Routes -----
export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    return await getProjectController(request, params.projectId);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    return await updateProjectController(request, params.projectId);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    return await deleteProjectController(request, params.projectId);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// ----- Floor Routes -----
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

export async function GET_FLOORS(
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
