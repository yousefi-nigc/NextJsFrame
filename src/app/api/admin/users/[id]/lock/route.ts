import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-server";
import { isAdmin } from "@/lib/admin";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = (await params).id;
  const session = await getSession();
  const headersList = await headers()

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
      { error: "قفل/بلاک کردن ادمین مجاز نیست" },
      { status: 400 }
    );
  }
  const { reason, banExpiresIn } = await request.json().catch(() => ({}));

  try {

    await auth.api.banUser({
      body: {
        userId,
        banReason: reason || "Locked by admin",
        banExpiresIn: banExpiresIn ?? undefined,
      },
      headers: headersList,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "خطا در قفل کردن کاربر" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = (await params).id;
  const headersList = await headers()
  const session = await getSession();
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
      { error: "باز کردن/قفل‌زدایی برای ادمین اصلی از این مسیر انجام نمی‌شود" },
      { status: 400 }
    );
  }

  try {

    await auth.api.unbanUser({
      body: { userId },
      headers: headersList,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "خطا در باز کردن قفل کاربر" },
      { status: 500 }
    );
  }
}

