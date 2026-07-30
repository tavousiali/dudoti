import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "نام کاربری و کلمه عبور الزامی هستند" },
        { status: 400 }
      );
    }

    // پیدا کردن کاربر
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "نام کاربری یا کلمه عبور اشتباه است" },
        { status: 401 }
      );
    }

    if (!user.active) {
      return NextResponse.json(
        { success: false, message: "حساب کاربری شما غیرفعال است" },
        { status: 403 }
      );
    }

    // بررسی رمز عبور
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "نام کاربری یا کلمه عبور اشتباه است" },
        { status: 401 }
      );
    }

    // آپدیت آخرین ورود
    const now = new Date();
    const persianDate = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLog: now,
        lastLogFa: persianDate,
      },
    });

    // ساخت session payload
    const sessionData = JSON.stringify({
      id: user.id,
      username: user.username,
      name: user.name,
      type: user.type,
      exp: Date.now() + 1000 * 60 * 60 * 8, // 8 ساعت
    });

    // encode به base64
    const sessionToken = Buffer.from(sessionData).toString("base64");

    // ست کردن cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 ساعت
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "خوش آمدید",
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        type: user.type,
      },
    });
  } catch (error) {
    console.error("[POST /api/admin/auth/login]", error);
    return NextResponse.json(
      { success: false, message: "خطای سرور، لطفاً دوباره تلاش کنید" },
      { status: 500 }
    );
  }
}
