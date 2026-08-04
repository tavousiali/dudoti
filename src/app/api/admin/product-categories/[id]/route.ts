import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/product-categories/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cat = await prisma.productCategory.findUnique({
      where: { Id: Number(id) },
    });
    if (!cat) {
      return NextResponse.json({ success: false, message: "یافت نشد" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: cat });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}

// PUT /api/admin/product-categories/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.productCategory.update({
      where: { Id: Number(id) },
      data: {
        Title:       body.Title       ?? undefined,
        TitleEn:     body.TitleEn     ?? undefined,
        SeoTitle:    body.SeoTitle    ?? undefined,
        SeoLead:     body.SeoLead     ?? undefined,
        urlTitle:    body.urlTitle    ?? undefined,
        Lead:        body.Lead        ?? undefined,
        Description: body.Description ?? undefined,
        Priority:    body.Priority    !== undefined ? Number(body.Priority) : undefined,
        ShowMenu:    body.ShowMenu    !== undefined ? Boolean(body.ShowMenu) : undefined,
        Actice:      body.Actice      !== undefined ? Boolean(body.Actice)  : undefined,
        Pic1:        body.Pic1        ?? undefined,
        Pic2:        body.Pic2        ?? undefined,
        Video:       body.Video       ?? undefined,
        VideoPic:    body.VideoPic    ?? undefined,
        CSSClass:    body.CSSClass    ?? undefined,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
