import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/big-images?lang=1
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") ? Number(searchParams.get("lang")) : 1;

    const images = await prisma.bigImage.findMany({
      where: { Lang: lang },
      orderBy: { Priority: "asc" },
    });

    return NextResponse.json({ success: true, data: images });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}

// POST /api/admin/big-images  — ایجاد ردیف جدید
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // پیدا کردن بزرگ‌ترین Id موجود
    const last = await prisma.bigImage.findFirst({
      orderBy: { Id: "desc" },
      select: { Id: true },
    });
    const newId = (last?.Id ?? 0) + 1;

    const created = await prisma.bigImage.create({
      data: {
        Id:       newId,
        Title:    body.Title    ?? null,
        Pic1:     body.Pic1     ?? null,
        Pic2:     body.Pic2     ?? null,
        Text2:    body.Text2    ?? null,
        Link:     body.Link     ?? null,
        Priority: body.Priority !== undefined ? Number(body.Priority) : 0,
        Type:     body.Type     !== undefined ? Number(body.Type)     : 1,
        Class:    body.Class    ?? null,
        Lang:     body.Lang     ? Number(body.Lang) : 1,
      },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
