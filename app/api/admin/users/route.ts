import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-server";
import { createUser, isAdmin } from "@/lib/admin";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user is admin
    const admin = await isAdmin(session.user.id);
    if (!admin) {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    const result = await createUser(email, password, name);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: "User created successfully",
          user: {
            id: result.user?.id,
            email: result.user?.email,
            name: result.user?.name,
          },
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

