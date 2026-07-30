import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import UserForm from "@/components/admin/UserForm";
import { requireAdminSession } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ویرایش کاربر - پنل دودوتی",
};

type Props = { params: Promise<{ id: string }> };

export default async function EditUserPage({ params }: Props) {
  await requireAdminSession();
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId)) notFound();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      active: true,
      semat: true,
      type: true,
      pic: true,
      branchId: true,
      branchName: true,
    },
  });

  if (!user) notFound();

  const initialData = {
    username: user.username,
    password: "",
    name: user.name,
    email: user.email ?? "",
    active: user.active,
    semat: user.semat ?? "",
    type: user.type,
    pic: user.pic ?? "",
    branchId: user.branchId?.toString() ?? "",
    branchName: user.branchName ?? "",
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "20px", fontSize: "13px", color: "#aaa" }}>
        <Link href="/AdminPanel/dashboard" style={{ color: "#aaa", textDecoration: "none" }}>
          داشبورد
        </Link>
        {" / "}
        <Link href="/AdminPanel/dashboard/users" style={{ color: "#aaa", textDecoration: "none" }}>
          کاربران
        </Link>
        {" / "}
        <span style={{ color: "#f90" }}>ویرایش: {user.name}</span>
      </div>

      <div
        style={{
          borderBottom: "2px solid #f90",
          paddingBottom: "10px",
          marginBottom: "28px",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#333", margin: 0 }}>
          ویرایش کاربر: {user.name}
        </h1>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "8px",
          padding: "28px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        <UserForm mode="edit" userId={user.id} initialData={initialData} />
      </div>
    </div>
  );
}
