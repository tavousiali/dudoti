import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/main-page?lang=1
// Returns SloganTitle and Slogan for the given language (langId = 1 | 2 | 3)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = Number(searchParams.get("lang") ?? "1");

    const record = await prisma.mainPage.findFirst({
      where: { Lang: lang },
      select: { SloganTitle: true, Slogan: true },
    });

    if (!record) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: record });
  } catch (e) {
    console.error("[GET /api/main-page]", e);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
