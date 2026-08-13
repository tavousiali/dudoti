import { requireAdminSession } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import SocialsTable from "@/components/admin/SocialsTable";
import LangAwarePageWrapper from "@/components/admin/LangAwarePageWrapper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "شبکه‌های اجتماعی - پنل دودوتی",
};

interface Props {
  searchParams: Promise<{ lang?: string }>;
}

export default async function SocialsPage({ searchParams }: Props) {
  await requireAdminSession();

  const { lang } = await searchParams;
  const langId = lang ? Number(lang) : 1;

  const socials = await prisma.social.findMany({
    where: { Lang: langId },
    orderBy: { Priority: "asc" },
  });

  const langLabel = langId === 1 ? "فارسی" : langId === 2 ? "انگلیسی" : "فرانسه";

  return (
    <LangAwarePageWrapper>
      <div style={{ direction: "rtl" }}>
        <div style={{
          background: "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 100%)",
          borderRadius: "10px",
          padding: "20px 24px",
          marginBottom: "24px",
        }}>
          <h1 style={{ color: "#f90", fontSize: "18px", fontWeight: 700, margin: 0 }}>
            شبکه‌های اجتماعی
          </h1>
          <p style={{ color: "#aaa", fontSize: "12px", margin: "6px 0 0" }}>
            ویرایش اطلاعات شبکه‌های اجتماعی — {langLabel}
          </p>
        </div>

        <SocialsTable initialSocials={socials} />
      </div>
    </LangAwarePageWrapper>
  );
}
