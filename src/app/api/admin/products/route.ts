import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/products?lang=1&catId=4&page=1&limit=20
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang   = searchParams.get("lang")  ? Number(searchParams.get("lang"))  : 1;
    const catId  = searchParams.get("catId") ? Number(searchParams.get("catId")) : undefined;
    const page   = searchParams.get("page")  ? Number(searchParams.get("page"))  : 1;
    const limit  = searchParams.get("limit") ? Number(searchParams.get("limit")) : 20;
    const search = searchParams.get("search") ?? "";

    const where: Record<string, unknown> = { Deleted: false, Lang: lang };
    if (catId !== undefined) where.CatId = catId;
    if (search) where.Title = { contains: search };

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy: [{ Priority: "desc" }, { Id: "asc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({ success: true, data: products, total, page, limit });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}

// POST /api/admin/products
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.Title?.trim()) {
      return NextResponse.json({ success: false, message: "عنوان الزامی است" }, { status: 400 });
    }

    const last = await prisma.product.findFirst({ orderBy: { Id: "desc" }, select: { Id: true } });
    const newId = (last?.Id ?? 0) + 1;

    const product = await prisma.product.create({
      data: {
        Id:             newId,
        Title:          body.Title?.trim()   || null,
        TitleEn:        body.TitleEn         || null,
        Pic1:           body.Pic1            || null,
        Pic2:           body.Pic1            || null,
        Av:             body.Av              !== undefined ? Number(body.Av) : 1,
        CatId:          body.CatId           !== undefined ? Number(body.CatId) : null,
        CatName:        body.CatName         || null,
        Lang:           body.Lang            !== undefined ? Number(body.Lang) : 1,
        Deleted:        false,
        IsNew:          body.IsNew           !== undefined ? Boolean(body.IsNew) : false,
        MainId:         body.MainId          !== undefined ? Number(body.MainId) : null,
        urlTitle:       body.urlTitle        || null,
        Video:          body.Video           || null,
        VideoPic:       body.VideoPic        || null,
        Priority:       body.Priority        !== undefined ? Number(body.Priority) : 0,
        urlTitlteCat:   body.urlTitlteCat    || null,
        SEOTitle:       body.SEOTitle        || null,
        CurrentPrice:   body.CurrentPrice    !== undefined ? Number(body.CurrentPrice) : null,
        CurrentOffPrice:body.CurrentOffPrice !== undefined ? Number(body.CurrentOffPrice) : null,
        Weight:         body.Weight          !== undefined ? Number(body.Weight) : null,
        MainName:       body.MainName        || null,
        MainUrlTitle:   body.MainUrlTitle    || null,
        SubTitle:       body.SubTitle        || null,
        Title2:         body.Title2          || null,
        Icon:           body.Icon            || null,
        ListImageMain:  body.ListImageMain   || null,
        ListImageOver:  body.ListImageOver   || null,
        OverClass:      body.OverClass       || null,
        SeoLead:        body.SeoLead         || null,
        Description:    body.Description     || null,
        Lead:           body.Lead            || null,
        Description2:   body.Description2    || null,
      },
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
