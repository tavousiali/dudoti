import { requireAdminSession } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import ProductsTable from "@/components/admin/ProductsTable";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "محصولات - پنل دودوتی",
};

interface Props {
  searchParams: Promise<{ catId?: string }>;
}

export default async function ProductsListPage({ searchParams }: Props) {
  await requireAdminSession();

  const { catId } = await searchParams;
  const initialCatId = catId ? Number(catId) : null;

  // همه دسته‌بندی‌ها برای dropdown (Lang=1, غیر سردسته)
  const allCats = await prisma.productCategory.findMany({
    where: { Lang: 1, Deleted: false, ParentId: { not: 0 } },
    orderBy: [{ Priority: "desc" }, { Id: "asc" }],
    select: { Id: true, Title: true, ParentName: true },
  });

  // داده اولیه
  const initialProducts = await prisma.product.findMany({
    where: {
      Deleted: false,
      Lang: 1,
      ...(initialCatId ? { CatId: initialCatId } : {}),
    },
    orderBy: [{ Priority: "desc" }, { Id: "asc" }],
    take: 50,
  });

  const initialTotal = await prisma.product.count({
    where: {
      Deleted: false,
      Lang: 1,
      ...(initialCatId ? { CatId: initialCatId } : {}),
    },
  });

  return (
    <div style={{ direction: "rtl" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 100%)",
        borderRadius: "10px",
        padding: "20px 24px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <h1 style={{ color: "#f90", fontSize: "18px", fontWeight: 700, margin: 0 }}>
            مدیریت محصولات
          </h1>
          <p style={{ color: "#aaa", fontSize: "12px", margin: "6px 0 0" }}>
            افزودن، ویرایش و حذف محصولات
          </p>
        </div>
        <Link
          href={`/AdminPanel/dashboard/products/list/new${initialCatId ? `?catId=${initialCatId}` : ""}`}
          style={{
            background: "#f90",
            color: "#fff",
            padding: "9px 20px",
            borderRadius: "7px",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          + افزودن محصول
        </Link>
      </div>

      <ProductsTable
        initialProducts={initialProducts}
        initialCatId={initialCatId}
        initialTotal={initialTotal}
        allCats={allCats}
      />
    </div>
  );
}
