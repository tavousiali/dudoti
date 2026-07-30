import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/users/[id] — get single user
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
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
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("[GET /api/admin/users/[id]]", error);
    return NextResponse.json(
      { success: false, message: "خطا در دریافت کاربر" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id] — update user
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
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

    const existing = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 }
      );
    }

    // اگر username عوض شده، بررسی تکراری بودن
    if (username && username !== existing.username) {
      const duplicate = await prisma.user.findUnique({ where: { username } });
      if (duplicate) {
        return NextResponse.json(
          { success: false, message: "این نام کاربری قبلاً ثبت شده است" },
          { status: 409 }
        );
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: Record<string, any> = {
      username: username ?? existing.username,
      name: name ?? existing.name,
      email: email !== undefined ? email : existing.email,
      active: active !== undefined ? active : existing.active,
      semat: semat !== undefined ? semat : existing.semat,
      type: type !== undefined ? Number(type) : existing.type,
      pic: pic !== undefined ? pic : existing.pic,
      branchId: branchId !== undefined ? (branchId ? Number(branchId) : null) : existing.branchId,
      branchName: branchName !== undefined ? branchName : existing.branchName,
    };

    // تنها در صورت ارسال پسورد جدید، هش می‌کنیم
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        active: true,
        semat: true,
        type: true,
        branchId: true,
        branchName: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[PUT /api/admin/users/[id]]", error);
    return NextResponse.json(
      { success: false, message: "خطا در ویرایش کاربر" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] — delete user
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const existing = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 }
      );
    }

    await prisma.user.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true, message: "کاربر با موفقیت حذف شد" });
  } catch (error) {
    console.error("[DELETE /api/admin/users/[id]]", error);
    return NextResponse.json(
      { success: false, message: "خطا در حذف کاربر" },
      { status: 500 }
    );
  }
}
