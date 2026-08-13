import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/adminAuth";
import { Metadata } from "next";
import EditCategoryLangWrapper from "@/components/admin/EditCategoryLangWrapper";
import LangAwarePageWrapper from "@/components/admin/LangAwarePageWrapper";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "ویرایش دسته محصول - پنل دودوتی" };

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;
  const cat = await prisma.productCategory.findUnique({ where: { Id: Number(id) } });
  if (!cat || cat.Deleted) notFound();

  return (
    <LangAwarePageWrapper>
      <div style={{ direction: "rtl" }}>
        <div style={{
          background: "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 100%)",
          borderRadius: "10px", padding: "20px 24px", marginBottom: "28px",
        }}>
          <h1 style={{ color: "#f90", fontSize: "18px", fontWeight: 700, margin: 0 }}>
            ویرایش سردسته محصول
          </h1>
          <p style={{ color: "#aaa", fontSize: "12px", margin: "6px 0 0" }}>
            ویرایش سردسته محصول
          </p>
        </div>
        <EditCategoryLangWrapper initialCategory={cat} />
      </div>
    </LangAwarePageWrapper>
  );
}
