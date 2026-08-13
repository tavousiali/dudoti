import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT /api/admin/big-images/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.bigImage.update({
      where: { Id: Number(id) },
      data: {
        Title:    body.Title    !== undefined ? (body.Title    || null) : undefined,
        Pic1:     body.Pic1     !== undefined ? (body.Pic1     || null) : undefined,
        Pic2:     body.Pic2     !== undefined ? (body.Pic2     || null) : undefined,
        Text2:    body.Text2    !== undefined ? (body.Text2    || null) : undefined,
        Link:     body.Link     !== undefined ? (body.Link     || null) : undefined,
        Priority: body.Priority !== undefined ? Number(body.Priority)  : undefined,
        Type:     body.Type     !== undefined ? Number(body.Type)      : undefined,
        Class:    body.Class    !== undefined ? (body.Class    || null) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}

// DELETE /api/admin/big-images/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.bigImage.delete({
      where: { Id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
