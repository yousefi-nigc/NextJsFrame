import { NextRequest, NextResponse } from "next/server";
import { getFloorController } from "@/lib/floor/controller/GetFloorController";
import { updateFloorController } from "@/lib/floor/controller/UpdateFloorController";
import { deleteFloorController } from "@/lib/floor/controller/DeleteFloorController";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; floorId: string }> }
) {
  try {
    return await getFloorController(
      request,
      (
        await params
      ).projectId,
      (
        await params
      ).floorId
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; floorId: string }> }
) {
  try {
    return await updateFloorController(
      request,
      (
        await params
      ).projectId,
      (
        await params
      ).floorId
    );
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
    return await deleteFloorController(
      request,
      (
        await params
      ).projectId,
      (
        await params
      ).floorId
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
