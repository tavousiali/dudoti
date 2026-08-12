import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/products/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { Id: Number(id) } });
    if (!product) return NextResponse.json({ success: false, message: "یافت نشد" }, { status: 404 });
    return NextResponse.json({ success: true, data: product });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}

// PUT /api/admin/products/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.product.update({
      where: { Id: Number(id) },
      data: {
        Title:          body.Title          ?? undefined,
        TitleEn:        body.TitleEn        ?? undefined,
        Pic1:           body.Pic1           ?? undefined,
        Pic2:           body.Pic1           ?? undefined,
        Av:             body.Av             !== undefined ? Number(body.Av)  : undefined,
        CatId:          body.CatId          !== undefined ? Number(body.CatId) : undefined,
        CatName:        body.CatName        ?? undefined,
        IsNew:          body.IsNew          !== undefined ? Boolean(body.IsNew) : undefined,
        urlTitle:       body.urlTitle       ?? undefined,
        Video:          body.Video          ?? undefined,
        VideoPic:       body.VideoPic       ?? undefined,
        Priority:       body.Priority       !== undefined ? Number(body.Priority) : undefined,
        SEOTitle:       body.SEOTitle       ?? undefined,
        CurrentPrice:   body.CurrentPrice   !== undefined ? Number(body.CurrentPrice)    : undefined,
        CurrentOffPrice:body.CurrentOffPrice!== undefined ? Number(body.CurrentOffPrice) : undefined,
        Weight:         body.Weight         !== undefined ? Number(body.Weight) : undefined,
        SubTitle:       body.SubTitle       ?? undefined,
        Title2:         body.Title2         ?? undefined,
        SeoLead:        body.SeoLead        ?? undefined,
        Description:    body.Description    ?? undefined,
        Lead:           body.Lead           ?? undefined,
        Description2:   body.Description2   ?? undefined,
        ListImageMain:  body.ListImageMain  ?? undefined,
        ListImageOver:  body.ListImageOver  ?? undefined,
        Icon:           body.Icon           ?? undefined,
        OverClass:      body.OverClass      ?? undefined,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}

// DELETE /api/admin/products/:id  (soft delete)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.product.update({ where: { Id: Number(id) }, data: { Deleted: true } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
