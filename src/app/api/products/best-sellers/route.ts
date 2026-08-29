import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products/best-sellers?lang=1&limit=8
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang  = searchParams.get("lang")  ? Number(searchParams.get("lang"))  : 1;
    const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : 20;

    const products = await prisma.product.findMany({
      where: {
        Deleted: false,
        Lang: lang,
      },
      orderBy: [{ Priority: "desc" }, { Id: "asc" }],
      take: limit,
      select: {
        Id:           true,
        Title:        true,
        SubTitle:     true,
        Pic1:         true,
        urlTitle:     true,
        CurrentPrice: true,
        CurrentOffPrice: true,
        Priority:     true,
      },
    });

    return NextResponse.json({ success: true, data: products });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: "خطای سرور" }, { status: 500 });
  }
}
