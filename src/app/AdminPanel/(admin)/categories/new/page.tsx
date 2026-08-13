import { requireAdminSession } from "@/lib/adminAuth";
import { Metadata } from "next";
import AddCategoryForm from "@/components/admin/AddCategoryForm";
import LangAwarePageWrapper from "@/components/admin/LangAwarePageWrapper";

export const metadata: Metadata = { title: "افزودن دسته‌بندی - پنل دودوتی" };

export default async function NewCategoryPage() {
  await requireAdminSession();

  return (
    <LangAwarePageWrapper>
      <div style={{ direction: "rtl" }}>
        <div style={{
          background: "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 100%)",
          borderRadius: "10px", padding: "20px 24px", marginBottom: "28px",
        }}>
          <h1 style={{ color: "#f90", fontSize: "18px", fontWeight: 700, margin: 0 }}>
            افزودن دسته‌بندی محصول
          </h1>
          <p style={{ color: "#aaa", fontSize: "12px", margin: "6px 0 0" }}>
            افزودن یک دسته‌بندی جدید برای محصولات
          </p>
        </div>
        <AddCategoryForm />
      </div>
    </LangAwarePageWrapper>
  );
}
