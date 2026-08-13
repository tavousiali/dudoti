import { requireAdminSession } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import CategoriesTable from "@/components/admin/CategoriesTable";
import LangAwarePageWrapper from "@/components/admin/LangAwarePageWrapper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "دسته‌بندی محصولات - پنل دودوتی" };

interface Props {
  searchParams: Promise<{ parentId?: string; lang?: string }>;
}

export default async function CategoriesPage({ searchParams }: Props) {
  await requireAdminSession();

  const { parentId, lang } = await searchParams;
  const langId = lang ? Number(lang) : 1;
  const initialParentId = parentId ? Number(parentId) : null;
  const langLabel = langId === 1 ? "فارسی" : langId === 2 ? "انگلیسی" : "فرانسه";

  const mainCats = await prisma.productCategory.findMany({
    where: { ParentId: 0, Lang: langId, Deleted: false },
    orderBy: [{ Priority: "desc" }, { Id: "asc" }],
    select: { Id: true, Title: true },
  });

  const initialCategories = await prisma.productCategory.findMany({
    where: {
      Lang: langId,
      Deleted: false,
      ...(initialParentId !== null
        ? { ParentId: initialParentId }
        : { ParentId: { not: 0 } }),
    },
    orderBy: [{ Priority: "desc" }, { Id: "asc" }],
  });

  const productCounts = await prisma.product.groupBy({
    by: ["CatId"],
    where: { Deleted: false, Lang: langId },
    _count: { Id: true },
  });
  const productCountMap: Record<number, number> = {};
  productCounts.forEach((p) => {
    if (p.CatId) productCountMap[p.CatId] = p._count.Id;
  });

  return (
    <LangAwarePageWrapper>
      <div style={{ direction: "rtl" }}>
        <div style={{
          background: "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 100%)",
          borderRadius: "10px", padding: "20px 24px", marginBottom: "24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <h1 style={{ color: "#f90", fontSize: "18px", fontWeight: 700, margin: 0 }}>
              {initialParentId
                ? `دسته‌بندی‌های ${mainCats.find((c) => c.Id === initialParentId)?.Title ?? ""}`
                : "دسته‌بندی محصولات"}
            </h1>
            <p style={{ color: "#aaa", fontSize: "12px", margin: "6px 0 0" }}>
              ویرایش و حذف دسته‌بندی محصولات — {langLabel}
            </p>
          </div>
          <a
            href={`/AdminPanel/categories/new${initialParentId ? `?parentId=${initialParentId}` : ""}`}
            style={{
              background: "#f90", color: "#fff", padding: "9px 20px",
              borderRadius: "7px", textDecoration: "none", fontSize: "13px", fontWeight: 600,
            }}
          >
            + افزودن دسته‌بندی
          </a>
        </div>

        <CategoriesTable
          initialCategories={initialCategories}
          initialParentId={initialParentId}
          mainCats={mainCats}
          productCountMap={productCountMap}
        />
      </div>
    </LangAwarePageWrapper>
  );
}
