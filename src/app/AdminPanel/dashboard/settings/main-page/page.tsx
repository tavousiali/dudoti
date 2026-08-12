import { requireAdminSession } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import MainPageForm from "@/components/admin/MainPageForm";

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

  const record = await prisma.mainPage.findUnique({
    where: { Id: langId },
  });

  return (
    <div style={{ direction: "rtl" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 100%)",
        borderRadius: "10px",
        padding: "20px 24px",
        marginBottom: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <h1 style={{ color: "#f90", fontSize: "18px", fontWeight: 700, margin: 0 }}>
            تغییر ثوابت سایت
          </h1>
          <p style={{ color: "#aaa", fontSize: "12px", margin: "6px 0 0" }}>
            تنظیمات اصلی و صفحه اول سایت
          </p>
        </div>

        {/* Language tabs */}
        <div style={{ display: "flex", gap: "8px" }}>
          {[
            { id: 1, label: "فارسی" },
            { id: 2, label: "انگلیسی" },
            { id: 3, label: "فرانسه" },
          ].map((l) => (
            <a
              key={l.id}
              href={`/AdminPanel/dashboard/settings/main-page?lang=${l.id}`}
              style={{
                padding: "6px 16px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                background: langId === l.id ? "#f90" : "rgba(255,255,255,0.1)",
                color: langId === l.id ? "#fff" : "#ccc",
                border: langId === l.id ? "none" : "1px solid #555",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
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
  );
}
