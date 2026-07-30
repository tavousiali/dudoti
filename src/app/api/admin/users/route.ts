import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET /api/admin/users — list all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        active: true,
        lastLogFa: true,
        lastLog: true,
        semat: true,
        type: true,
        pic: true,
        branchId: true,
        branchName: true,
        hashedId: true,
        createdAt: true,
        updatedAt: true,
        // password و hashCode رو در لیست برنمی‌گردونیم
      },
    });
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("[GET /api/admin/users]", error);
    return NextResponse.json(
      { success: false, message: "خطا در دریافت کاربران" },
      { status: 500 }
    );
  }
}

// POST /api/admin/users — create new user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      username,
      password,
      name,
      email,
      active,
      semat,
      type,
      pic,
      branchId,
      branchName,
    } = body;

    if (!username || !password || !name) {
      return NextResponse.json(
        { success: false, message: "نام کاربری، کلمه عبور و نام الزامی هستند" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "این نام کاربری قبلاً ثبت شده است" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        email: email || null,
        active: active ?? true,
        semat: semat || null,
        type: type ?? 1,
        pic: pic || null,
        branchId: branchId ? Number(branchId) : null,
        branchName: branchName || null,
      },
    });

    return NextResponse.json(
      { success: true, data: { id: user.id, username: user.username, name: user.name } },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/admin/users]", error);
    return NextResponse.json(
      { success: false, message: "خطا در ایجاد کاربر" },
      { status: 500 }
    );
  }
}
