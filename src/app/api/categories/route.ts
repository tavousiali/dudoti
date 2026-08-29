import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/categories?lang=1
// Returns top-level (ParentId=0) active categories with ShowMenu=true
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") ? Number(searchParams.get("lang")) : 1;

    const categories = await prisma.productCategory.findMany({
      where: {
        Lang: lang,
        ParentId: 0,
        Deleted: false,
        ShowMenu: true,
        Actice: true,
      },
      orderBy: [{ Priority: "asc" }, { Id: "asc" }],
      select: {
        Id: true,
        Title: true,
        Pic1: true,
        urlTitle: true,
        CSSClass: true,
      },
    });

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("[GET /api/categories]", error);
    return NextResponse.json(
      { success: false, message: "خطا در دریافت دسته‌بندی‌ها" },
      { status: 500 }
    );
  }
}
