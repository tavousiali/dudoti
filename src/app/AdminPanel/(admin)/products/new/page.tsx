import { requireAdminSession } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "افزودن محصول - پنل دودوتی" };

interface Props {
  searchParams: Promise<{ catId?: string }>;
}

export default async function NewProductPage({ searchParams }: Props) {
  await requireAdminSession();
  const { catId } = await searchParams;

  const cats = await prisma.productCategory.findMany({
    where: { Lang: 1, Deleted: false, ParentId: { not: 0 } },
    orderBy: [{ Priority: "desc" }, { Id: "asc" }],
    select: { Id: true, Title: true, ParentName: true, urlTitle: true, ParentId: true },
  });

  const mainCats = await prisma.productCategory.findMany({
    where: { Lang: 1, Deleted: false, ParentId: 0 },
    orderBy: [{ Priority: "desc" }, { Id: "asc" }],
    select: { Id: true, Title: true, urlTitle: true },
  });

  return (
    <div style={{ direction: "rtl" }}>
      <div style={{
        background: "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 100%)",
        borderRadius: "10px", padding: "20px 24px", marginBottom: "28px",
      }}>
        <h1 style={{ color: "#f90", fontSize: "18px", fontWeight: 700, margin: 0 }}>افزودن محصول</h1>
        <p style={{ color: "#aaa", fontSize: "12px", margin: "6px 0 0" }}>افزودن یک محصول جدید</p>
      </div>
      <ProductForm
        mode="add"
        cats={cats}
        mainCats={mainCats}
        defaultCatId={catId ? Number(catId) : undefined}
      />
    </div>
  );
}
