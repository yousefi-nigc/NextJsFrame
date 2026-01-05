import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-server";
import { createUser, isAdmin } from "@/lib/admin";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
    }

    // Check if user is admin
    const admin = await isAdmin(session.user.id);
    if (!admin) {
      return NextResponse.json(
        { error: "ممنوع: دسترسی ادمین مورد نیاز است" },
        { status: 403 }
      );
    }

    // Parse request body with error handling
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: "JSON نامعتبر در بدنه درخواست" },
        { status: 400 }
      );
    }

    const { email, password, name } = body;

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "ایمیل، رمز عبور و نام الزامی است" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "فرمت ایمیل نامعتبر است" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: "رمز عبور باید حداقل ۶ کاراکتر باشد" },
        { status: 400 }
      );
    }

    const result = await createUser(email, password, name);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: "کاربر با موفقیت ایجاد شد",
          user: {
            id: result.user?.id,
            email: result.user?.email,
            name: result.user?.name,
          },
        },
        { status: 201 }
      );
    } else {
      // Translate common errors
      let translatedError = result.error;
      if (result.error === "User with this email already exists") {
        translatedError = "کاربری با این ایمیل از قبل وجود دارد";
      }
      return NextResponse.json({ error: translatedError }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: error.message || "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
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

  const { searchParams } = new URL(request.url);
  const searchValue = searchParams.get("search") || undefined;
  const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);
  const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);
  const sortBy = searchParams.get("sortBy") || "name";
  const sortDirection = searchParams.get("sortDirection") === "asc" ? "asc" : "desc";
  const searchField = searchParams.get("searchField") || "name";
  const searchOperator = searchParams.get("searchOperator") || "contains";

  try {
    const headerStore = await headers();
    const cookieHeader = headerStore.get("cookie");

    const data = await auth.api.listUsers({
      query: {
        searchValue,
        searchField: searchField as "email" | "name",
        searchOperator: searchOperator as "contains" | "starts_with" | "ends_with",
        limit,
        offset,
        sortBy,
        sortDirection: sortDirection as "asc" | "desc",
        filterField: "role",
        filterValue: "admin",
        filterOperator: "ne",
      },
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("listUsers error:", error);
    return NextResponse.json(
      { error: error.message || "خطا در دریافت کاربران" },
      { status: 500 }
    );
  }
}
