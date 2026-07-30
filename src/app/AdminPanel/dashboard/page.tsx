import { Metadata } from "next";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { requireAdminSession } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "داشبورد - پنل مدیریت دودوتی",
};

export default async function DashboardPage() {
  await requireAdminSession();
  const userCount = await prisma.user.count();

  return (
    <div>
      <h1
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#333",
          marginBottom: "24px",
          borderBottom: "2px solid #f90",
          paddingBottom: "10px",
        }}
      >
        داشبورد مدیریت
      </h1>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <Link href="/AdminPanel/dashboard/users" style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              borderTop: "4px solid #f90",
              cursor: "pointer",
              transition: "box-shadow 0.2s",
            }}
          >
            <p style={{ margin: "0 0 8px", color: "#888", fontSize: "13px" }}>
              کاربران
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: 700,
                color: "#333",
              }}
            >
              {userCount}
            </p>
          </div>
        </Link>
      </div>

      <p style={{ color: "#888", fontSize: "13px" }}>
        از منوی سمت راست، بخش مورد نظر را انتخاب کنید.
      </p>
    </div>
  );
}
