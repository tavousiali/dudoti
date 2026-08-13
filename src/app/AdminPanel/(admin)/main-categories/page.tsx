import { requireAdminSession } from "@/lib/adminAuth";
import { Metadata } from "next";
import Link from "next/link";
import MainCategoriesClient from "@/components/admin/MainCategoriesClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "سردسته‌های اصلی - پنل دودوتی",
};

export default async function MainCategoriesPage() {
  await requireAdminSession();

  return (
    <div style={{ direction: "rtl" }}>
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
        <Link href="/AdminPanel/main-categories/new" style={{
          background: "#f90", color: "#fff", padding: "9px 20px",
          borderRadius: "7px", textDecoration: "none", fontSize: "13px", fontWeight: 600,
        }}>
          + افزودن سردسته
        </Link>
      </div>

      <MainCategoriesClient />
    </div>
  );
}
