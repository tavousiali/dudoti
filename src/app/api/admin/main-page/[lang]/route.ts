import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/main-page/:lang
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  try {
    const { lang } = await params;
    const record = await prisma.mainPage.findUnique({
      where: { Id: Number(lang) },
    });
    if (!record)
      return NextResponse.json({ success: false, message: "یافت نشد" }, { status: 404 });
    return NextResponse.json({ success: true, data: record });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}

// PUT /api/admin/main-page/:lang
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  try {
    const { lang } = await params;
    const body = await req.json();

    const updated = await prisma.mainPage.update({
      where: { Id: Number(lang) },
      data: {
        MainTitle:    body.MainTitle    ?? undefined,
        ShortTitle:   body.ShortTitle   ?? undefined,
        Keywords:     body.Keywords     ?? undefined,
        Description:  body.Description  ?? undefined,
        SloganImage:  body.SloganImage  ?? undefined,
        SloganTitle:  body.SloganTitle  ?? undefined,
        Slogan:       body.Slogan       ?? undefined,
        Footer:       body.Footer       ?? undefined,
        ContactText:  body.ContactText  ?? undefined,
        CR:           body.CR           ?? undefined,
        Tel:          body.Tel          ?? undefined,
        EmailAddress: body.EmailAddress ?? undefined,
        ProductsCount:body.ProductsCount !== undefined ? Number(body.ProductsCount) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
