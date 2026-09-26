import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/characters?lang=1
// Returns all characters for the given language, ordered by Priority
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") ? Number(searchParams.get("lang")) : 1;

    const characters = await prisma.character.findMany({
      where: { Lang: lang },
      orderBy: [{ Priority: "asc" }, { Id: "asc" }],
      select: {
        Id: true,
        Name: true,
        Desc: true,
        Img1: true,
        Img2: true,
        BgColor: true,
        CSSClass: true,
      },
    });

    return NextResponse.json({ success: true, data: characters });
  } catch (error) {
    console.error("[GET /api/characters]", error);
    return NextResponse.json(
      { success: false, message: "خطا در دریافت شخصیت‌ها" },
      { status: 500 }
    );
  }
}
