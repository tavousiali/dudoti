import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/product-categories?lang=1&parentId=0
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") ? Number(searchParams.get("lang")) : 1;
    const parentIdParam = searchParams.get("parentId");
    const parentId = parentIdParam !== null ? Number(parentIdParam) : undefined;
    const urlTitle = searchParams.get("urlTitle") ?? undefined;

    const where: Record<string, unknown> = { Lang: lang, Deleted: false };
    if (parentId !== undefined) where.ParentId = parentId;
    if (urlTitle) where.urlTitle = urlTitle;

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

// POST /api/admin/product-categories
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.Title || body.Title.trim() === "") {
      return NextResponse.json(
        { success: false, message: "عنوان فارسی الزامی است" },
        { status: 400 }
      );
    }

    // پیدا کردن بزرگترین Id موجود و +1 کردن
    const last = await prisma.productCategory.findFirst({
      orderBy: { Id: "desc" },
      select: { Id: true },
    });
    const newId = (last?.Id ?? 0) + 1;

    const cat = await prisma.productCategory.create({
      data: {
        Id:          newId,
        Title:       body.Title.trim(),
        TitleEn:     body.TitleEn     || null,
        SeoTitle:    body.SeoTitle    || null,
        SeoLead:     body.SeoLead     || null,
        urlTitle:    body.urlTitle    || null,
        Lead:        body.Lead        || null,
        Description: body.Description || null,
        Priority:    body.Priority    !== undefined ? Number(body.Priority) : 0,
        ShowMenu:    body.ShowMenu    !== undefined ? Boolean(body.ShowMenu) : false,
        Actice:      body.Actice      !== undefined ? Boolean(body.Actice)  : true,
        CSSClass:    body.CSSClass    || null,
        Pic1:        body.Pic1        || null,
        Pic2:        body.Pic1        || null,
        Video:       body.Video       || null,
        VideoPic:    body.VideoPic    || null,
        Lang:        body.Lang        !== undefined ? Number(body.Lang) : 1,
        ParentId:    body.ParentId    !== undefined ? Number(body.ParentId) : 0,
        ParentName:  body.ParentName  || null,
        Deleted:     false,
      },
    });

    return NextResponse.json({ success: true, data: cat }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/admin/product-categories]", error);
    return NextResponse.json(
      { success: false, message: "خطا در ایجاد دسته‌بندی" },
      { status: 500 }
    );
  }
}
