import { requireAdminSession } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import MainPageForm from "@/components/admin/MainPageForm";
import LangAwarePageWrapper from "@/components/admin/LangAwarePageWrapper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "اطلاعات صفحه اول - پنل دودوتی",
};

interface Props {
  searchParams: Promise<{ lang?: string }>;
}

export default async function MainPageSettingsPage({ searchParams }: Props) {
  await requireAdminSession();

  const { lang } = await searchParams;
  const langId = lang ? Number(lang) : 1;
  const langLabel = langId === 1 ? "فارسی" : langId === 2 ? "انگلیسی" : "فرانسه";

  const record = await prisma.mainPage.findUnique({
    where: { Id: langId },
  });

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
            تغییر ثوابت سایت
          </h1>
          <p style={{ color: "#aaa", fontSize: "12px", margin: "6px 0 0" }}>
            تنظیمات اصلی و صفحه اول سایت — {langLabel}
          </p>
        </div>

        {record ? (
          <MainPageForm record={record} langId={langId} />
        ) : (
          <div style={{
            background: "#fff", borderRadius: "10px",
            padding: "40px", textAlign: "center", color: "#aaa",
          }}>
            رکوردی برای این زبان یافت نشد.
          </div>
        )}
      </div>
    </LangAwarePageWrapper>
  );
}
