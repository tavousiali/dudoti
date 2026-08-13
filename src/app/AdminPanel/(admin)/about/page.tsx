import { requireAdminSession } from "@/lib/adminAuth";
import { Metadata } from "next";
import LangAwarePageWrapper from "@/components/admin/LangAwarePageWrapper";
import AboutPageWrapper from "@/components/admin/AboutPageWrapper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ویرایش متن درباره - پنل دودوتی",
};

export default async function AboutEditPage() {
  await requireAdminSession();

  return (
    <LangAwarePageWrapper>
      <div style={{ direction: "rtl" }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 100%)",
          borderRadius: "10px",
          padding: "20px 24px",
          marginBottom: "28px",
        }}>
          <h1 style={{ color: "#f90", fontSize: "18px", fontWeight: 700, margin: 0 }}>
            ویرایش متن درباره
          </h1>
          <p style={{ color: "#aaa", fontSize: "12px", margin: "6px 0 0" }}>
            ویرایش عنوان‌ها و متن صفحه معرفی دودوتی
          </p>
        </div>

        <AboutPageWrapper />
      </div>
    </LangAwarePageWrapper>
  );
}
