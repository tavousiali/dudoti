import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/pages/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const page = await prisma.page.findUnique({ where: { Id: Number(id) } });
    if (!page) return NextResponse.json({ success: false, message: "یافت نشد" }, { status: 404 });
    return NextResponse.json({ success: true, data: page });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}

// PUT /api/admin/pages/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.page.update({
      where: { Id: Number(id) },
      data: {
        Title:    body.Title    ?? undefined,
        Text:     body.Text     ?? undefined,
        Lead:     body.Lead     ?? undefined,
        SubTitle: body.SubTitle ?? undefined,
        PreTitle: body.PreTitle ?? undefined,
        SeoTitle: body.SeoTitle ?? undefined,
        SeoLead:  body.SeoLead  ?? undefined,
        Pic:      body.Pic      ?? undefined,
        Priority: body.Priority !== undefined ? Number(body.Priority) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
