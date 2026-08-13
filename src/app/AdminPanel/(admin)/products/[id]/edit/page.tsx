import { requireAdminSession } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import EditProductLangWrapper from "@/components/admin/EditProductLangWrapper";
import LangAwarePageWrapper from "@/components/admin/LangAwarePageWrapper";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "ویرایش محصول - پنل دودوتی" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;

  const [product, cats, mainCats] = await Promise.all([
    prisma.product.findUnique({ where: { Id: Number(id) } }),
    prisma.productCategory.findMany({
      where: { Lang: 1, Deleted: false, ParentId: { not: 0 } },
      orderBy: [{ Priority: "desc" }, { Id: "asc" }],
      select: { Id: true, Title: true, ParentName: true, urlTitle: true, ParentId: true },
    }),
    prisma.productCategory.findMany({
      where: { Lang: 1, Deleted: false, ParentId: 0 },
      orderBy: [{ Priority: "desc" }, { Id: "asc" }],
      select: { Id: true, Title: true, urlTitle: true },
    }),
  ]);

  if (!product || product.Deleted) notFound();

  return (
    <LangAwarePageWrapper>
      <div style={{ direction: "rtl" }}>
        <div style={{
          background: "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 100%)",
          borderRadius: "10px", padding: "20px 24px", marginBottom: "28px",
        }}>
          <h1 style={{ color: "#f90", fontSize: "18px", fontWeight: 700, margin: 0 }}>
            ویرایش محصول: {product.Title}
          </h1>
          <p style={{ color: "#aaa", fontSize: "12px", margin: "6px 0 0" }}>ویرایش اطلاعات محصول</p>
        </div>
        <EditProductLangWrapper
          initialProduct={product}
          cats={cats}
          mainCats={mainCats}
        />
      </div>
    </LangAwarePageWrapper>
  );
}
