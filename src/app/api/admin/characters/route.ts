import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/characters?lang=1
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") ? Number(searchParams.get("lang")) : 1;

    const characters = await prisma.character.findMany({
      where: { Lang: lang },
      orderBy: [{ Priority: "asc" }, { Id: "asc" }],
    });

    return NextResponse.json({ success: true, data: characters });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}

// POST /api/admin/characters — ایجاد کاراکتر جدید
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const last = await prisma.character.findFirst({
      orderBy: { Id: "desc" },
      select: { Id: true },
    });
    const newId = (last?.Id ?? 0) + 1;

    const created = await prisma.character.create({
      data: {
        Id:       newId,
        Lang:     body.Lang     ? Number(body.Lang) : 1,
        Name:     body.Name     ?? "",
        Desc:     body.Desc     ?? null,
        Img1:     body.Img1     ?? null,
        Img2:     body.Img2     ?? null,
        BgColor:  body.BgColor  ?? null,
        CSSClass: body.CSSClass ?? null,
        Priority: body.Priority !== undefined ? Number(body.Priority) : 0,
      },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
