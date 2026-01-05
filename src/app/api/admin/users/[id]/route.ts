import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-server";
import { isAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const userId = (await params).id;
    const session = await getSession();
    const headersList = await headers();

    if (!session) {
        return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const admin = await isAdmin(session.user.id);
    if (!admin) {
        return NextResponse.json(
            { error: "ممنوع: دسترسی ادمین مورد نیاز است" },
            { status: 403 }
        );
    }

    const target = await db.user.findUnique({
        where: { id: userId },
        select: { role: true },
    });

    if (target?.role === "admin" || userId === session.user.id) {
        return NextResponse.json(
            { error: "حذف ادمین اصلی مجاز نیست" },
            { status: 400 }
        );
    }

    try {
        await auth.api.removeUser({
            body: { userId },
            headers: headersList,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "خطای حذف کاربر" },
            { status: 500 }
        );
    }
}

