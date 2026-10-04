import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT /api/admin/characters/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.character.update({
      where: { Id: Number(id) },
      data: {
        Name:     body.Name     !== undefined ? (body.Name     || "")   : undefined,
        Desc:     body.Desc     !== undefined ? (body.Desc     || null) : undefined,
        Img1:     body.Img1     !== undefined ? (body.Img1     || null) : undefined,
        Img2:     body.Img2     !== undefined ? (body.Img2     || null) : undefined,
        BgColor:  body.BgColor  !== undefined ? (body.BgColor  || null) : undefined,
        CSSClass: body.CSSClass !== undefined ? (body.CSSClass || null) : undefined,
        Priority: body.Priority !== undefined ? Number(body.Priority)   : undefined,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}

// DELETE /api/admin/characters/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.character.delete({
      where: { Id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
