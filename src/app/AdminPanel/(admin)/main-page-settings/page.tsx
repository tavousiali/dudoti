import { requireAdminSession } from "@/lib/adminAuth";
import { Metadata } from "next";
import MainPageWrapper from "@/components/admin/MainPageWrapper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "اطلاعات صفحه اول - پنل دودوتی",
};

export default async function MainPageSettingsPage() {
  await requireAdminSession();

  return (
    <div style={{ direction: "rtl" }}>
      <div style={{
        background: "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 100%)",
        borderRadius: "10px",
        padding: "20px 24px",
        marginBottom: "28px",
      }}>
        <h1 style={{ color: "#f90", fontSize: "18px", fontWeight: 700, margin: 0 }}>
          تغییر ثوابت سایت
        </h1>
        <p style={{ color: "#aaa", fontSize: "12px", margin: "6px 0 0" }}>
          تنظیمات اصلی و صفحه اول سایت
        </p>
      </div>

      <MainPageWrapper />
    </div>
  );
}
