import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT /api/admin/socials/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.social.update({
      where: { Id: Number(id) },
      data: {
        Title:    body.Title    ?? undefined,
        Link:     body.Link     !== undefined ? (body.Link || null) : undefined,
        Priority: body.Priority !== undefined ? Number(body.Priority) : undefined,
        Icon:     body.Icon     ?? undefined,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
