import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/pages?lang=1&urlTitle=contact
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang     = searchParams.get("lang")     ? Number(searchParams.get("lang")) : 1;
    const urlTitle = searchParams.get("urlTitle") ?? undefined;

    const where: Record<string, unknown> = { Lang: lang };
    if (urlTitle) where.urlTitle = urlTitle;

    const pages = await prisma.page.findMany({
      where,
      orderBy: { Priority: "desc" },
    });

    return NextResponse.json({ success: true, data: pages });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
