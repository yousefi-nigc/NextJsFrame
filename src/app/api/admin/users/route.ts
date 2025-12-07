import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-server";
import { createUser, isAdmin } from "@/lib/admin";

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
