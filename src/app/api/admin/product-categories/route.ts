import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/product-categories?lang=1&parentId=0
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") ? Number(searchParams.get("lang")) : 1;
    const parentIdParam = searchParams.get("parentId");
    const parentId = parentIdParam !== null ? Number(parentIdParam) : undefined;

    const where: Record<string, unknown> = { Lang: lang, Deleted: false };
    if (parentId !== undefined) where.ParentId = parentId;

    const categories = await prisma.productCategory.findMany({
      where,
      orderBy: [{ Priority: "desc" }, { Id: "asc" }],
    });

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("[GET /api/admin/product-categories]", error);
    return NextResponse.json(
      { success: false, message: "خطا در دریافت دسته‌بندی‌ها" },
      { status: 500 }
    );
  }
}
