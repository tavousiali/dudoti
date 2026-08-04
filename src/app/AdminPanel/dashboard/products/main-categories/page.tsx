import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/adminAuth";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "سردسته‌های اصلی - پنل دودوتی",
};

export default async function MainCategoriesPage() {
  await requireAdminSession();

  const categories = await prisma.productCategory.findMany({
    where: { ParentId: 0, Lang: 1, Deleted: false },
    orderBy: [{ Priority: "desc" }, { Id: "asc" }],
  });

  const subCounts = await prisma.productCategory.groupBy({
    by: ["ParentId"],
    where: { Lang: 1, Deleted: false, ParentId: { not: 0 } },
    _count: { Id: true },
  });
  const subCountMap: Record<number, number> = {};
  subCounts.forEach((s) => { subCountMap[s.ParentId] = s._count.Id; });

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
            ویرایش سردسته محصولات
          </h1>
          <p style={{ color: "#aaa", fontSize: "12px", margin: "6px 0 0" }}>
            ویرایش و حذف سردسته اصلی محصولات
          </p>
        </div>
        <Link href="/AdminPanel/dashboard/products/main-categories/new" style={{
          background: "#f90",
          color: "#fff",
          padding: "9px 20px",
          borderRadius: "7px",
          textDecoration: "none",
          fontSize: "13px",
          fontWeight: 600,
        }}>
          + افزودن سردسته
        </Link>
      </div>

      {/* Table */}
      <div style={{
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}>
        {categories.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#aaa" }}>
            هیچ سردسته‌ای ثبت نشده است.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
              textAlign: "right",
            }}>
              <thead>
                <tr style={{ background: "#f8f8f8", borderBottom: "2px solid #eee" }}>
                  {["شناسه", "عنوان", "تصویر", "زیردسته‌ها", "ویرایش", "حذف"].map((h) => (
                    <th key={h} style={{
                      padding: "14px 18px",
                      fontWeight: 600,
                      color: "#666",
                      whiteSpace: "nowrap",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={cat.Id} style={{
                    borderBottom: "1px solid #f0f0f0",
                    background: idx % 2 === 0 ? "#fff" : "#fafafa",
                  }}>
                    {/* شناسه */}
                    <td style={{ padding: "14px 18px", color: "#999", fontWeight: 500, width: "70px" }}>
                      {cat.Id}
                    </td>

                    {/* عنوان */}
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 600, color: "#333", marginBottom: "2px" }}>
                        {cat.Title}
                      </div>
                      {cat.TitleEn && (
                        <div style={{ fontSize: "11px", color: "#aaa", direction: "ltr" }}>
                          {cat.TitleEn}
                        </div>
                      )}
                    </td>

                    {/* تصویر */}
                    <td style={{ padding: "10px 18px", width: "90px" }}>
                      {cat.Pic1 ? (
                        <Image
                          src={cat.Pic1}
                          alt={cat.Title}
                          width={54}
                          height={54}
                          style={{
                            objectFit: "contain",
                            borderRadius: "6px",
                            background: "#f5f5f5",
                            padding: "4px",
                          }}
                        />
                      ) : (
                        <div style={{
                          width: "54px",
                          height: "54px",
                          background: "#f0f0f0",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "22px",
                        }}>
                          📦
                        </div>
                      )}
                    </td>

                    {/* زیردسته‌ها */}
                    <td style={{ padding: "14px 18px", width: "120px" }}>
                      <Link
                        href={`/AdminPanel/dashboard/products/categories?parentId=${cat.Id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          background: "#fff8ee",
                          color: "#f90",
                          border: "1px solid #f90",
                          padding: "5px 12px",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontSize: "12px",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        زیردسته‌ها
                        <span style={{
                          background: "#f90",
                          color: "#fff",
                          borderRadius: "10px",
                          padding: "1px 7px",
                          fontSize: "11px",
                        }}>
                          {subCountMap[cat.Id] ?? 0}
                        </span>
                      </Link>
                    </td>

                    {/* ویرایش */}
                    <td style={{ padding: "14px 18px", width: "90px" }}>
                      <Link
                        href={`/AdminPanel/dashboard/products/main-categories/${cat.Id}/edit`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "#2980b9",
                          textDecoration: "none",
                          fontSize: "13px",
                          fontWeight: 500,
                          background: "#eaf4fb",
                          padding: "5px 12px",
                          borderRadius: "6px",
                        }}
                      >
                        ✏️ ویرایش
                      </Link>
                    </td>

                    {/* حذف */}
                    <td style={{ padding: "14px 18px", width: "80px" }}>
                      <DeleteCategoryButton
                        id={cat.Id}
                        title={cat.Title}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

